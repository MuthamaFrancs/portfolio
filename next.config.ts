/**
 * GitHub Pages–compatible static hosting:
 * - `output: "export"` — no Node server; deploy the `out/` directory only.
 * - Avoid `getServerSideProps`, Route Handlers, `dynamic = "force-dynamic"`,
 *   and other features that need a runtime (see Next static export docs).
 * - Images: `unoptimized: true` so `next/image` emits plain <img> for static hosts.
 * - Project pages at `/<repo>/`: set `NEXT_PUBLIC_BASE_PATH=/<repo>` when building
 *   (see GitHub Actions workflow and README).
 */
import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: path.join(__dirname),
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/devicons/devicon/**",
      },
    ],
  },
};

export default nextConfig;
