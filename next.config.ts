import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  // 恢复默认 HMR 和文件监控
  webpack: (config) => config,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
