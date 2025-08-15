import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable pages directory scanning
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Serve static files from public directory
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/index.html',
      },
    ];
  },
  // Disable PostCSS processing
  webpack: (config) => {
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOfRule) => {
          if (oneOfRule.sideEffects === false) {
            oneOfRule.sideEffects = true;
          }
        });
      }
    });
    return config;
  },
};

export default nextConfig;
