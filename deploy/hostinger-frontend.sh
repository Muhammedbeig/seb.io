#!/usr/bin/env bash
set -Eeuo pipefail

APP_NAME="${APP_NAME:-seb.io}"
REPO_URL="${REPO_URL:-https://github.com/Muhammedbeig/seb.io.git}"
BRANCH="${BRANCH:-main}"
APP_DIR="${APP_DIR:-$HOME/apps/seb.io}"
NODE_BIN="${NODE_BIN:-/opt/alt/alt-nodejs22/root/bin/node}"
NPM_BIN="${NPM_BIN:-/opt/alt/alt-nodejs22/root/bin/npm}"
RESTART_MODE="${RESTART_MODE:-passenger}"
PM2_APP_NAME="${PM2_APP_NAME:-}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
NEXT_BUILD_CPUS="${NEXT_BUILD_CPUS:-1}"
ARTIFACT_PATH="${ARTIFACT_PATH:-}"

RELEASES_DIR="$APP_DIR/releases"
SHARED_DIR="$APP_DIR/shared"
CURRENT_LINK="$APP_DIR/current"
PUBLIC_HTML_DIR="${PUBLIC_HTML_DIR:-$HOME/domains/searchenginebasics.io/public_html}"
PASSENGER_RESTART_FILE="${PASSENGER_RESTART_FILE:-$PUBLIC_HTML_DIR/tmp/restart.txt}"
RELEASE_ID="$(date +%Y%m%d%H%M%S)"

if [ -n "${GITHUB_SHA:-}" ]; then
  RELEASE_ID="$RELEASE_ID-$(printf '%s' "$GITHUB_SHA" | cut -c1-12)"
fi

RELEASE_DIR="$RELEASES_DIR/$RELEASE_ID"
PREVIOUS_RELEASE=""

log() {
  printf '[%s] %s\n' "$(date '+%F %T')" "$*"
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf 'Missing required command: %s\n' "$1" >&2
    exit 1
  fi
}

restart_app() {
  if [ -n "${RESTART_COMMAND:-}" ]; then
    cd "$CURRENT_LINK"
    bash -lc "$RESTART_COMMAND"
    return
  fi

  if [ "$RESTART_MODE" = "pm2" ] && [ -n "$PM2_APP_NAME" ] && command -v pm2 >/dev/null 2>&1; then
    cd "$CURRENT_LINK"
    # Delete and re-start so PM2 loads from the new release directory.
    # pm2 reload keeps the old resolved path in memory; delete+start forces a clean launch.
    pm2 delete "$PM2_APP_NAME" >/dev/null 2>&1 || true
    pm2 start "$NPM_BIN" --name "$PM2_APP_NAME" -- start
    pm2 save >/dev/null 2>&1 || true
    return
  fi

  if command -v passenger-config >/dev/null 2>&1; then
    if passenger-config restart-app "$APP_DIR"; then
      log "Restarted Passenger application through passenger-config"
    elif passenger-config restart-app "$PUBLIC_HTML_DIR"; then
      log "Restarted Hostinger Passenger application through passenger-config"
    fi
  fi

  SIGNALLED_RELEASES=0
  for release_dir in "$RELEASES_DIR"/*; do
    if [ -d "$release_dir/tmp" ]; then
      touch "$release_dir/tmp/restart.txt"
      SIGNALLED_RELEASES=$((SIGNALLED_RELEASES + 1))
    fi
  done
  log "Signalled Passenger restart across $SIGNALLED_RELEASES release path(s)"

  mkdir -p "$(dirname "$PASSENGER_RESTART_FILE")"
  touch "$PASSENGER_RESTART_FILE"
  log "Signalled Hostinger Passenger restart marker"
}

switch_current() {
  ln -sfn "$1" "$CURRENT_LINK.next"
  mv -Tf "$CURRENT_LINK.next" "$CURRENT_LINK"
}

rollback() {
  if [ -n "$PREVIOUS_RELEASE" ] && [ -d "$PREVIOUS_RELEASE" ]; then
    log "Rolling back $APP_NAME to $PREVIOUS_RELEASE"
    switch_current "$PREVIOUS_RELEASE"
    restart_app || true
  fi
}

cleanup_failed_release() {
  if [ -d "$RELEASE_DIR" ] && [ ! -f "$RELEASE_DIR/.deploy-complete" ]; then
    rm -rf "$RELEASE_DIR"
  fi
}

trap cleanup_failed_release ERR

require_command "$NODE_BIN"

if [ -n "$ARTIFACT_PATH" ]; then
  require_command tar
else
  require_command git
  require_command "$NPM_BIN"
fi

export PATH="$(dirname "$NODE_BIN"):$PATH"
export NEXT_BUILD_CPUS

mkdir -p "$RELEASES_DIR" "$SHARED_DIR"

if [ -L "$CURRENT_LINK" ]; then
  PREVIOUS_RELEASE="$(readlink "$CURRENT_LINK" || true)"
fi

if [ -n "$ARTIFACT_PATH" ]; then
  if [ ! -f "$ARTIFACT_PATH" ]; then
    printf 'Missing frontend artifact: %s\n' "$ARTIFACT_PATH" >&2
    exit 1
  fi

  log "Deploying $APP_NAME artifact into $RELEASE_DIR"
  mkdir -p "$RELEASE_DIR"
  tar -xzf "$ARTIFACT_PATH" -C "$RELEASE_DIR"
else
  log "Deploying $APP_NAME from $REPO_URL#$BRANCH into $RELEASE_DIR"
  git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$RELEASE_DIR"
fi

cd "$RELEASE_DIR"

if [ -f "$SHARED_DIR/.env.production" ]; then
  ln -sfn "$SHARED_DIR/.env.production" .env.production
fi

if [ -f "$SHARED_DIR/.env.local" ]; then
  ln -sfn "$SHARED_DIR/.env.local" .env.local
fi

if [ -z "$ARTIFACT_PATH" ]; then
  "$NPM_BIN" ci
  "$NPM_BIN" run build
fi

if [ ! -f "$RELEASE_DIR/server.js" ] || [ ! -d "$RELEASE_DIR/.next" ] || [ ! -d "$RELEASE_DIR/node_modules" ]; then
  printf 'Frontend release artifact is incomplete.\n' >&2
  exit 1
fi

mkdir -p tmp
touch "$RELEASE_DIR/.deploy-complete"

log "Switching $APP_NAME current release"
switch_current "$RELEASE_DIR"
restart_app

if [ -n "${HEALTH_URL:-}" ]; then
  log "Checking $HEALTH_URL"
  HEALTH_CHECK_URL="$HEALTH_URL"

  if [ -n "${GITHUB_SHA:-}" ]; then
    HEALTH_ORIGIN="$(printf '%s\n' "$HEALTH_URL" | sed -E 's#^(https?://[^/]+).*$#\1#')"
    HEALTH_CHECK_URL="${HEALTH_ORIGIN%/}/release.txt?sha=$GITHUB_SHA"
  fi

  for attempt in {1..20}; do
    HEALTH_RESPONSE="$(curl -fsS --max-time 10 "$HEALTH_CHECK_URL" 2>/dev/null || true)"

    if [ -n "${GITHUB_SHA:-}" ]; then
      if [ "$HEALTH_RESPONSE" = "$GITHUB_SHA" ]; then
        log "Health check passed for $GITHUB_SHA"
        break
      fi
    elif [ -n "$HEALTH_RESPONSE" ]; then
      log "Health check passed"
      break
    fi

    if [ "$attempt" = "20" ]; then
      log "Health check failed"
      rollback
      exit 1
    fi

    sleep 3
  done
fi

find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d | sort -r | tail -n +"$((KEEP_RELEASES + 1))" | xargs -r rm -rf
log "$APP_NAME deploy complete: $RELEASE_ID"
