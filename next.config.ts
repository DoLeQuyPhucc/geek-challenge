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
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
