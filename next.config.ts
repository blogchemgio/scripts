import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Cấu hình bắt buộc cho Cloudflare Pages */
  images: {
    unoptimized: true, 
  },
  /* Nếu bạn sử dụng các biến môi trường trong quá trình build */
  env: {
    BLOGGER_API_KEY: process.env.BLOGGER_API_KEY,
    BLOG_ID: process.env.BLOG_ID,
  },
};

export default nextConfig;