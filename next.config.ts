import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ab-landing-system",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
