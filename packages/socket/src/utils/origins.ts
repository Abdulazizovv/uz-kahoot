export const parseOrigins = (raw: string | undefined): "*" | string[] => {
  const value = (raw ?? "").trim()

  if (!value || value === "*") {
    return "*"
  }

  const parts = value
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)

  return parts.length ? parts : "*"
}

