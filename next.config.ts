import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, 
  },
  env: {
    BLOGGER_API_KEY: process.env.BLOGGER_API_KEY,
    BLOG_ID: process.env.BLOG_ID,
  },
};

export default nextConfig;