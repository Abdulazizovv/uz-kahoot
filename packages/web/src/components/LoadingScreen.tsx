/**
 * LoadingScreen Component
 * Consistent loading UI for auth states and page transitions
 */
export interface LoadingScreenProps {
  /** Optional message to display below spinner */
  message?: string
  /** Whether to show full screen or inline */
  fullScreen?: boolean
}

export function LoadingScreen({
  message = "Yuklanmoqda...",
  fullScreen = true,
}: LoadingScreenProps) {
  const containerClass = fullScreen
    ? "flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    : "flex items-center justify-center p-8"

  return (
    <div className={containerClass}>
      <div className="text-center">
        {/* Animated spinner */}
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 shadow-lg"></div>

        {/* Loading message */}
        {message && (
          <p className="mt-4 text-lg font-semibold text-gray-700">{message}</p>
        )}
      </div>
    </div>
  )
}
