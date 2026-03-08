import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // BỎ DẤU // Ở ĐÂY ĐỂ KÍCH HOẠT XUẤT FILE TĨNH
  images: {
    unoptimized: true, 
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;