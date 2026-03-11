import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://apieduarena.mendeleyev.uz"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean }

const DEBUG_API = process.env.NEXT_PUBLIC_DEBUG_API === "true"

const getAuthStorageState = () => {
  const raw = localStorage.getItem("auth-storage")
  if (!raw) return null
  try {
    return JSON.parse(raw)?.state ?? null
  } catch {
    return null
  }
}

const getAccessToken = () => getAuthStorageState()?.accessToken ?? localStorage.getItem("access_token")
const getRefreshToken = () => getAuthStorageState()?.refreshToken ?? localStorage.getItem("refresh_token")

const setAccessToken = (accessToken: string) => {
  const raw = localStorage.getItem("auth-storage")
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      parsed.state = parsed.state ?? {}
      parsed.state.accessToken = accessToken
      localStorage.setItem("auth-storage", JSON.stringify(parsed))
    } catch {
      // ignore corrupted storage
    }
  }
  localStorage.setItem("access_token", accessToken)
}

const clearAuth = () => {
  localStorage.removeItem("auth-storage")
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
}

let refreshPromise: Promise<string> | null = null
const refreshAccessToken = async (refreshToken: string) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/token/refresh/`, { refresh: refreshToken })
  const access = response.data?.access
  if (typeof access !== "string" || !access) {
    throw new Error("Invalid refresh response: missing access token")
  }
  return access
}

// Request interceptor - JWT token qo'shish
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = getAccessToken()
      if (token) {
        config.headers = config.headers ?? {}
        ;(config.headers as Record<string, string>).Authorization = `Bearer ${token}`
      } else if (DEBUG_API) {
        console.warn("API request without access token:", config.url)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor - token yangilash
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const axiosError = error as AxiosError
    const originalRequest = axiosError.config as RetriableRequestConfig | undefined
    if (!originalRequest) return Promise.reject(error)

    // Token expired - refresh token bilan yangilash
    if (axiosError.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (typeof window !== "undefined") {
        const refreshToken = getRefreshToken()

        if (refreshToken) {
          try {
            refreshPromise =
              refreshPromise ??
              refreshAccessToken(refreshToken).finally(() => {
                refreshPromise = null
              })

            const access = await refreshPromise
            setAccessToken(access)

            originalRequest.headers = originalRequest.headers ?? {}
            ;(originalRequest.headers as Record<string, string>).Authorization = `Bearer ${access}`
            return apiClient(originalRequest)
          } catch (refreshError) {
            // Refresh token ham expired - logout
            clearAuth()
            window.location.href = "/auth"
            return Promise.reject(refreshError)
          }
        } else {
          // Refresh token yo'q - login sahifasiga yo'naltirish
          clearAuth()
          window.location.href = "/auth"
        }
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
