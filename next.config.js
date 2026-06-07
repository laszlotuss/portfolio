/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the tracing root to this project (silences the multi-lockfile warning).
  outputFileTracingRoot: __dirname,
  // The app reads public/screens/<key>/ from disk at request time to discover
  // local screenshots. Trace those files into the server functions so the
  // reads work on Vercel, not just at build.
  outputFileTracingIncludes: {
    "/": ["./public/screens/**/*", "./public/profile.jpg"],
    // Dynamic app routes resolve metadata (incl. apple-touch-icon) at request
    // time — icon.tsx / apple-icon.tsx read profile.jpg from disk.
    "/[app]": ["./public/screens/**/*", "./public/profile.jpg"],
    "/[app]/privacy-policy": ["./public/screens/**/*", "./public/profile.jpg"],
    "/privacy-policy/[app]": ["./public/screens/**/*", "./public/profile.jpg"],
    "/icon": ["./public/profile.jpg"],
    "/apple-icon": ["./public/profile.jpg"],
  },
  // Temporary enabled for debugging
  productionBrowserSourceMaps: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
