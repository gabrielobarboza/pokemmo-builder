import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js', // Tells Turbopack to treat the output as a JS module
      },
    },
  },
};

export default nextConfig;
