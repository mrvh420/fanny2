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
};

export default nextConfig;
