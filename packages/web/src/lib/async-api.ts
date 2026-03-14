export const apiGet = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(url, {
    ...init,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.error || `Request failed (${res.status})`)
  }
  return (await res.json()) as T
}

export const apiSend = async <T>(
  url: string,
  method: "POST" | "PUT" | "DELETE",
  body?: unknown,
  init?: RequestInit,
): Promise<T> => {
  const res = await fetch(url, {
    ...init,
    method,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data?.error || `Request failed (${res.status})`)
  }
  return (await res.json()) as T
}

