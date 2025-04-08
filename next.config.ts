import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "x-forwarded-host", value: process.env.NEXT_PUBLIC_URL || "localhost:3000" },
        ],
      },
    ];
  },
};

export default nextConfig;
