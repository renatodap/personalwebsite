import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "renatodap.me", pathname: "/s3/personalwebsite-media/**" },
    ],
  },
};

export default nextConfig;
