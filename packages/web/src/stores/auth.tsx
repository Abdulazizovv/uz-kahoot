"use client"

import { User } from "@/services/auth"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

/**
 * Auth state interface
 * @property isHydrated - Tracks if client-side hydration is complete
 */
type AuthState = {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  isHydrated: boolean
}

type AuthStore = AuthState & {
  login: (user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setHydrated: (hydrated: boolean) => void
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isHydrated: false,
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),

      login: (user) => {
        set({
          user,
          accessToken: `local-${user.id}`,
          refreshToken: null,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })

        if (typeof window !== "undefined") {
          document.cookie = `auth-storage=${encodeURIComponent(
            JSON.stringify({ state: { isAuthenticated: true, user } }),
          )}; path=/; max-age=2592000; SameSite=Lax`
        }
      },

      logout: () => {
        set({
          ...initialState,
          isHydrated: true,
        })

        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-storage")

          document.cookie =
            "auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Auth store rehydration error:", error)
        }
        state?.setHydrated(true)
      },
    },
  ),
)
