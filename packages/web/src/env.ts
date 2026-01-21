import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

const env = createEnv({
  server: {
    SOCKET_URL: z.string().default("http://localhost:3001"),
  },

  client: {
    NEXT_PUBLIC_API_URL: z
      .string()
      .default("https://apieduarena.mendeleyev.uz"),
  },

  runtimeEnv: {
    SOCKET_URL: process.env.SOCKET_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
})

export default env
