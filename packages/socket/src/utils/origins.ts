type OriginCallback = (_err: Error | null, _allow?: boolean) => void
type OriginFn = (_origin: string | undefined, _callback: OriginCallback) => void

const normalizeOrigin = (origin: string) => origin.replace(/\/$/u, "").trim()

const hostKey = (origin: string) => {
  try {
    const u = new URL(origin)
    const port = u.port ? `:${u.port}` : ""

    return `${u.hostname}${port}`.toLowerCase()
  } catch {
    return null
  }
}

export const parseOrigins = (
  raw: string | undefined,
): "*" | string[] | OriginFn => {
  const value = (raw ?? "").trim()

  // Allow all if not configured; avoids production breakage when env isn't wired.
  // Use a function (instead of "*") so CORS can reflect the request origin when credentials are enabled.
  if (!value || value === "*") {
    return (_origin: string | undefined, callback: OriginCallback) => {
      callback(null, true)
    }
  }

  const allowList = value
    .split(",")
    .map((p) => normalizeOrigin(p))
    .filter(Boolean)

  if (!allowList.length) {
    return "*"
  }

  const allowHosts = new Set<string>(
    allowList
      .map((o) => hostKey(o))
      .filter(Boolean) as string[],
  )

  // Socket.io uses the `cors` package; accept both exact origin matches and same host across http/https.
  return (origin: string | undefined, callback: OriginCallback) => {
    if (!origin) {
      callback(null, true)

      return
    }

    const o = normalizeOrigin(origin)

    if (allowList.includes(o)) {
      callback(null, true)

      return
    }

    const hk = hostKey(o)

    if (hk && allowHosts.has(hk)) {
      callback(null, true)

      return
    }

    callback(new Error("Not allowed by CORS"), false)
  }
}
