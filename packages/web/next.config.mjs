import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig = {
  output: "standalone",
  productionBrowserSourceMaps: false,
  experimental: {
    cpus: 1,
  },
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
  transpilePackages: ["@eduarena/common", "@eduarena/socket", "@t3-oss/env-nextjs"],
}

export default nextConfig
