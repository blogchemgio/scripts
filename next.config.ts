import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Ép Next.js tạo ra thư mục HTML tĩnh
  images: {
    unoptimized: true, 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;