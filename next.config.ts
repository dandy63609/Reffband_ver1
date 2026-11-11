import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Allows offline & local asset testing without external loader
  },
};

export default nextConfig;
