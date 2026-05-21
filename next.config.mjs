// Hostinger's TLS config is incompatible with Node.js 18+ undici for server-to-server fetches.
// Browsers handle it fine, but Node.js rejects the handshake with ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "panel.searchenginebasics.io" },
      { protocol: "https", hostname: "searchenginebasics.io" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },
};

export default nextConfig;
