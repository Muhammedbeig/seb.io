# Hostinger Frontend Deployment

This repo deploys to Hostinger through `.github/workflows/deploy-hostinger.yml`.

The workflow runs on `main` pushes and manual `workflow_dispatch`. If SSH secrets are not configured, it exits successfully without deploying.

## GitHub Secrets

Required:

- `HOSTINGER_SSH_HOST`: `147.93.93.168`
- `HOSTINGER_SSH_PORT`: `65002`
- `HOSTINGER_SSH_USER`: Hostinger SSH user
- One of:
  - `HOSTINGER_SSH_PRIVATE_KEY`: private key that can SSH into Hostinger
  - `HOSTINGER_SSH_PASSWORD`: Hostinger SSH password

Optional:

- `FRONTEND_APP_DIR`: defaults to `~/apps/seb.io`
- `FRONTEND_NODE_BIN`: defaults to `/opt/alt/alt-nodejs22/root/bin/node`
- `FRONTEND_NPM_BIN`: defaults to `/opt/alt/alt-nodejs22/root/bin/npm`
- `FRONTEND_RESTART_MODE`: defaults to `passenger`
- `FRONTEND_PASSENGER_RESTART_FILE`: defaults to `$APP_DIR/current/tmp/restart.txt`
- `FRONTEND_PM2_APP_NAME`: only needed if `FRONTEND_RESTART_MODE=pm2`
- `FRONTEND_HEALTH_URL`: example `https://searchenginebasics.io`
- `FRONTEND_RESTART_COMMAND`: fallback restart command if `pm2` is not available

## Hostinger One-Time Setup

Create shared folders:

```bash
mkdir -p ~/apps/seb.io/shared
```

Put the production env file here:

```bash
~/apps/seb.io/shared/.env.production
```

The current Hostinger frontend uses Passenger. Update `~/domains/searchenginebasics.io/public_html/.htaccess` so Passenger serves from the release symlink:

```apache
PassengerAppRoot /home/u680035976/apps/seb.io/current
PassengerAppType node
PassengerNodejs /opt/alt/alt-nodejs22/root/bin/node
PassengerStartupFile server.js
PassengerBaseURI /
PassengerRestartDir /home/u680035976/apps/seb.io/current/tmp
```

Keep the existing `SetEnv` and rewrite/security lines already present in `.htaccess`.

The deploy script creates a new release under `~/apps/seb.io/releases`, builds it, switches `current` only after the build succeeds, then restarts Passenger by touching `current/tmp/restart.txt`.

Rollback is automatic when `FRONTEND_HEALTH_URL` is set and the health check fails.
