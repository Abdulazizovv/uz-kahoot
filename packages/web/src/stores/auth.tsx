"use client"

import { User } from "@/services/auth"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

/**
 * Auth state interface
 * @property isHydrated - Tracks if client-side hydration is complete
 */
interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  isHydrated: boolean
}

interface AuthContextType extends AuthState {
  login: (tokens: { access: string; refresh: string }, user: User) => void
  logout: () => void
  setError: (error: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
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
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          isHydrated: true,
        })

        // Also update cookie for middleware
        document.cookie = `auth-storage=${encodeURIComponent(JSON.stringify({ state: { isAuthenticated: true, user } }))}; path=/; max-age=2592000; SameSite=Lax`
      } else {
        setState((prev) => ({ ...prev, isHydrated: true }))
      }
    } catch (error) {
      console.error("Auth hydration error:", error)
      setState((prev) => ({
        ...prev,
        isHydrated: true,
        error: "Failed to load authentication state",
      }))
    }
  }, [])

  /**
   * Login user and persist to localStorage and cookies
   */
  const login = (tokens: { access: string; refresh: string }, user: User) => {
    // Update state
    setState({
      user,
      accessToken: tokens.access,
      refreshToken: tokens.refresh,
      isAuthenticated: true,
      isLoading: false,
      error: null,
      isHydrated: true,
    })

    // Persist to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("access_token", tokens.access)
      localStorage.setItem("refresh_token", tokens.refresh)

      // Set cookie for middleware (30 days expiry)
      document.cookie = `auth-storage=${encodeURIComponent(JSON.stringify({ state: { isAuthenticated: true, user } }))}; path=/; max-age=2592000; SameSite=Lax`
    }
  }

  /**
   * Logout user and clear all auth data
   */
  const logout = () => {
    // Clear state
    setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isHydrated: true,
    })

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")

      // Clear cookie
      document.cookie =
        "auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
  }

  const setError = (error: string | null) => {
    setState((prev) => ({ ...prev, error }))
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, setError }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to access auth context
 * @throws Error if used outside AuthProvider
 */
export function useAuthStore() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthStore must be used within AuthProvider")
  }
  return context
}
