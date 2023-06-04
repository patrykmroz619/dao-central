// eslint-disable-next-line @typescript-eslint/no-var-requires
const initializePWAConfig = require("next-pwa");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const initializeBundleAnalyzer = require("@next/bundle-analyzer");

const withPWA = initializePWAConfig({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  sw: "service-worker.js",
});

const withBundleAnalyzer = initializeBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/panel",
        permanent: true,
      },
    ];
  },
};

module.exports = withPWA(withBundleAnalyzer(nextConfig));
