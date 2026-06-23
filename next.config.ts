import type { NextConfig } from "next";

// On GitHub Pages the app is served from /end-portal-finder/, but locally
// (`next dev`) it should stay at the root so `npm run dev` just works.
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages.
  output: "export",
  basePath: isProd ? "/end-portal-finder" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
