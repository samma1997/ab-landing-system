import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/ab-landing-system" : "",
  assetPrefix: isProd ? "/ab-landing-system/" : "",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/ab-landing-system" : "",
  },
};

export default nextConfig;
