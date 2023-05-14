// eslint-disable-next-line @typescript-eslint/no-var-requires
const initializePWAConfig = require("next-pwa");

const withPWA = initializePWAConfig({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  sw: "service-worker.js",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = withPWA(nextConfig);
