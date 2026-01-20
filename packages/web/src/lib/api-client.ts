import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor - JWT token qo'shish
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // Zustand store'dan yoki localStorage'dan token olish
      const authStorage = localStorage.getItem("auth-storage")
      let token = null

      if (authStorage) {
        try {
          const parsedStorage = JSON.parse(authStorage)
          token = parsedStorage.state?.accessToken
        } catch (e) {
          console.error("Auth storage parse error:", e)
        }
      }

      // Fallback - to'g'ridan-to'g'ri localStorage'dan
      if (!token) {
        token = localStorage.getItem("access_token")
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
        console.log("🔑 Token qo'shildi:", config.url, "Token mavjud:", !!token)
      } else {
        console.warn("⚠️ Token topilmadi:", config.url)
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
    const originalRequest = error.config

    // Token expired - refresh token bilan yangilash
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (typeof window !== "undefined") {
        // Zustand store'dan refresh token olish
        const authStorage = localStorage.getItem("auth-storage")
        let refreshToken = null

        if (authStorage) {
          try {
            const parsedStorage = JSON.parse(authStorage)
            refreshToken = parsedStorage.state?.refreshToken
          } catch (e) {
            console.error("Auth storage parse error:", e)
          }
        }

        // Fallback
        if (!refreshToken) {
          refreshToken = localStorage.getItem("refresh_token")
        }

        if (refreshToken) {
          try {
            const response = await axios.post(
              `${API_BASE_URL}/api/auth/token/refresh/`,
              {
                refresh: refreshToken,
              },
            )

            const { access } = response.data

            // Zustand store'ni yangilash
            const authStorage = localStorage.getItem("auth-storage")
            if (authStorage) {
              try {
                const parsedStorage = JSON.parse(authStorage)
                parsedStorage.state.accessToken = access
                localStorage.setItem(
                  "auth-storage",
                  JSON.stringify(parsedStorage),
                )
              } catch (e) {
                console.error("Failed to update auth storage:", e)
              }
            }

            // Fallback - to'g'ridan-to'g'ri localStorage
            localStorage.setItem("access_token", access)

            originalRequest.headers.Authorization = `Bearer ${access}`
            return apiClient(originalRequest)
          } catch (refreshError) {
            // Refresh token ham expired - logout
            localStorage.removeItem("auth-storage")
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            window.location.href = "/auth"
            return Promise.reject(refreshError)
          }
        } else {
          // Refresh token yo'q - login sahifasiga yo'naltirish
          localStorage.removeItem("auth-storage")
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
          window.location.href = "/auth"
        }
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
