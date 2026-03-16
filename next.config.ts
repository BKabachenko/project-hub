import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  serverExternalPackages: ["@prisma/client", "pg", "prisma"],

  turbopack: {
    resolveAlias: {
      "@prisma/client": "./src/generated/prisma",
    },
  },

  allowedDevOrigins: process.env.MY_LOCAL_DEV_IP ? [process.env.MY_LOCAL_DEV_IP] : undefined,
};

export default nextConfig;
