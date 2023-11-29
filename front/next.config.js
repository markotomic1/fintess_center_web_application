const { config } = require("process");
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // webpack: (config, _) => ({
  //   ...config,
  //   watchOptions: {
  //     ...config.watchOptions,
  //     poll: 800,
  //     aggregateTimeout: 300,
  //   },
  // }),
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/redux": path.resolve(__dirname, "./src/redux/"),
      "@/components": path.resolve(__dirname, "./src/components/"),
      "@/utils": path.resolve(__dirname, "./src/utils/"),
      "@/hooks": path.resolve(__dirname, "./src/hooks/"),
    };

    return config;
  },
};
//const withBundleAnaylizer = require("@next/bundle-analyzer")({ enabled: true });

module.exports = nextConfig;
