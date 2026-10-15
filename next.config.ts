import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  env: {
    // Inlined into server and client bundles alike, so date-based UI (the "New" badge)
    // renders the same during static export and hydration. Refreshed on every deploy.
    BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
