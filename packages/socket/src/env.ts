import { createEnv } from "@t3-oss/env-core"
import { z } from "zod/v4"

const env = createEnv({
  server: {
    WEB_ORIGIN: z.string().optional().default("*"),
    SOCKET_PORT: z.coerce.number().int().positive().optional().default(3001),
    TELEGRAM_BOT_TOKEN: z.string().optional(),
  },

  runtimeEnv: {
    WEB_ORIGIN: process.env.WEB_ORIGIN,
    SOCKET_PORT: process.env.SOCKET_PORT ?? process.env.SOCKER_PORT,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  },
})

export default env
