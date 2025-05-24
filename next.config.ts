import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "geekup.vn",
      },
      {
        protocol: "https",
        hostname: "dummyjson.com",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
