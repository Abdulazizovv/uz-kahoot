import { createEnv } from "@t3-oss/env-core"
import { z } from "zod/v4"

const env = createEnv({
  server: {
    WEB_ORIGIN: z.string().optional().default("http://localhost:3000"),
    SOCKET_PORT: z.coerce.number().int().positive().optional().default(3001),
    API_ORIGIN: z.string().optional().default("http://localhost:8088"),
  },

  runtimeEnv: {
    WEB_ORIGIN: process.env.WEB_ORIGIN,
    SOCKET_PORT: process.env.SOCKET_PORT ?? process.env.SOCKER_PORT,
    API_ORIGIN: process.env.API_ORIGIN ?? process.env.NEXT_PUBLIC_API_URL,
  },
})

export default env
