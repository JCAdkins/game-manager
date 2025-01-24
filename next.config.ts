import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "media.istockphoto.com",
      },
    ], // Add the hostname here
  },
};

export default nextConfig;
