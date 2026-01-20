"use client"

import { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * AuthErrorBoundary Component
 * Catches and handles authentication-related errors gracefully
 * Provides user-friendly error messages and recovery options
 */
export class AuthErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error("Auth Error Boundary caught an error:", error, errorInfo)

    // Check for specific error types
    const isHydrationError =
      error.message?.includes("Hydration") ||
      error.message?.includes("hydration") ||
      errorInfo.componentStack?.includes("Hydration")

    const isAuthError =
      error.message?.includes("auth") ||
      error.message?.includes("Auth") ||
      error.message?.includes("token") ||
      error.message?.includes("unauthorized")

    this.setState({
      error,
      errorInfo,
      hasError: true,
    })

    // You can integrate error reporting service here
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
  }

  handleRetry = () => {
    // Clear error state and retry
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  handleLogout = () => {
    // Clear all auth data and redirect to auth page
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      document.cookie =
        "auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      window.location.href = "/auth"
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI from props
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 px-4">
          <div className="max-w-md rounded-lg bg-white p-8 shadow-xl">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Xatolik yuz berdi
              </h2>
              <p className="mt-2 text-gray-600">
                Autentifikatsiya jarayonida muammo yuz berdi
              </p>
            </div>

            {/* Error details (only in development) */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mb-4 rounded-md bg-gray-100 p-4">
                <p className="font-mono text-sm text-red-600">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* Recovery actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleRetry}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Qayta urinish
              </button>
              <button
                onClick={this.handleLogout}
                className="rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Tizimdan chiqish
              </button>
            </div>

            {/* Help text */}
            <p className="mt-4 text-center text-sm text-gray-500">
              Muammo davom etsa, sahifani yangilang yoki administrator bilan
              bog'laning
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
