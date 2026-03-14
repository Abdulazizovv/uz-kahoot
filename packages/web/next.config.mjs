import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig = {
  output: "standalone",
  productionBrowserSourceMaps: false,
  typescript: {
    // Next's build worker sometimes exits without printing errors in this monorepo.
    // We run `tsc --noEmit` separately in CI/deploy scripts instead.
    ignoreBuildErrors: true,
  },
  experimental: {
    cpus: 1,
  },
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
  transpilePackages: ["@eduarena/common", "@t3-oss/env-nextjs"],
}

export default nextConfig
