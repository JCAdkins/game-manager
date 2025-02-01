import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "media.istockphoto.com" },
      { hostname: "cdn.imweb.me" },
      { hostname: "media.cnn.com" },
    ], // Add the hostname here
  },
};

export default nextConfig;
