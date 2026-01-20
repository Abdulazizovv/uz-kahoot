"use client"

import { User } from "@/services/auth"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isHydrated: false,
  })

  // localStorage'dan ma'lumotlarni yuklash (faqat client-side)
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const userStr = localStorage.getItem("user")
      const accessToken = localStorage.getItem("access_token")
      const refreshToken = localStorage.getItem("refresh_token")

      if (userStr && accessToken && refreshToken) {
        const user = JSON.parse(userStr)
        setState({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          isHydrated: true,
        })
      } else {
        setState((prev) => ({ ...prev, isHydrated: true }))
      }
    } catch (error) {
      console.error("Auth hydration error:", error)
      setState((prev) => ({ ...prev, isHydrated: true }))
    }
  }, [])

  const login = (tokens: { access: string; refresh: string }, user: User) => {
    // State'ni yangilash
    setState({
      user,
      accessToken: tokens.access,
      refreshToken: tokens.refresh,
      isAuthenticated: true,
      isLoading: false,
      error: null,
      isHydrated: true,
    })

    // localStorage'ga saqlash
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("access_token", tokens.access)
      localStorage.setItem("refresh_token", tokens.refresh)
    }
  }

  const logout = () => {
    // State'ni tozalash
    setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isHydrated: true,
    })

    // localStorage'dan o'chirish
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
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

export function useAuthStore() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthStore must be used within AuthProvider")
  }
  return context
}
