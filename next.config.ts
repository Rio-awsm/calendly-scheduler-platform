import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "avatar.vercel.sh", port: "", protocol: "https" },
      { hostname: "utfs.io", port: "", protocol: "https" },
      {
        hostname: "avatars.githubusercontent.com",
        port: "",
        protocol: "https",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "fy92q71fya.ufs.sh"
      }
    ],
  },
};

export default nextConfig;
