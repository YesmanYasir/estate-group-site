import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  experimental: { optimizePackageImports: ["@react-three/drei", "three"] },
};

if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

export default nextConfig;
