import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Bắt buộc để ra thư mục 'out'
  images: {
    unoptimized: true, 
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;