import { User } from "@eduarena/web/services/auth"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  setTokens: (access: string, refresh: string) => void
  setUser: (user: User) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  login: (tokens: { access: string; refresh: string }, user: User) => void
  logout: () => void
  refreshAccessToken: (newAccessToken: string) => void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setTokens: (access: string, refresh: string) => {
        set({ accessToken: access, refreshToken: refresh })
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      setError: (error: string | null) => {
        set({ error })
      },

      login: (tokens, user) => {
        // Zustand store'ga saqlash
        set({
          user,
          accessToken: tokens.access,
          refreshToken: tokens.refresh,
          isAuthenticated: true,
          error: null,
        })

        // localStorage'ga ham saqlash (fallback uchun)
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", tokens.access)
          localStorage.setItem("refresh_token", tokens.refresh)
        }
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        })

        // localStorage'dan ham o'chirish
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
        }
      },

      refreshAccessToken: (newAccessToken: string) => {
        set({ accessToken: newAccessToken })
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
