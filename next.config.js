const path = require("path");

// Use real Vercel packages if installed locally, otherwise dev stubs.
const resolveAlias = {};
try {
  require.resolve("@vercel/analytics/next", { paths: [__dirname] });
} catch {
  resolveAlias["@vercel/analytics/next"] = path.join(
    __dirname,
    "src/vercel-stubs/analytics.tsx"
  );
}
try {
  require.resolve("@vercel/speed-insights/next", { paths: [__dirname] });
} catch {
  resolveAlias["@vercel/speed-insights/next"] = path.join(
    __dirname,
    "src/vercel-stubs/speed-insights.tsx"
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    if (Object.keys(resolveAlias).length > 0) {
      config.resolve.alias = { ...config.resolve.alias, ...resolveAlias };
    }
    return config;
  },
  // Browsers request /favicon.ico by default — without this, the [app] catch-all
  // treats "favicon.ico" as an app id and returns HTML instead of an image.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/favicon.ico", destination: "/profile.jpg" }],
    };
  },
  // Pin the tracing root to this project (silences the multi-lockfile warning).
  outputFileTracingRoot: __dirname,
  // The app reads public/screens/<key>/ from disk at request time to discover
  // local screenshots. Trace those files into the server functions so the
  // reads work on Vercel, not just at build.
  outputFileTracingIncludes: {
    "/": ["./public/screens/**/*", "./public/profile.jpg"],
    // Dynamic app routes resolve metadata (incl. apple-touch-icon) at request
    // time — apple-icon.tsx and [app]/icon.tsx read profile.jpg from disk.
    "/[app]": ["./public/screens/**/*", "./public/profile.jpg"],
    "/[app]/privacy-policy": ["./public/screens/**/*", "./public/profile.jpg"],
    "/privacy-policy/[app]": ["./public/screens/**/*", "./public/profile.jpg"],
    "/apple-icon": ["./public/profile.jpg"],
  },
};

module.exports = nextConfig;