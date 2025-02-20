import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    dirs: ['login', 'users', 'components', 'features']
  },
  ignorePatterns: ["api/**/*", "features/**/*Saga.ts"],
  reactStrictMode: true,
};

export default nextConfig;
