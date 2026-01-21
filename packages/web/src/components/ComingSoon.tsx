"use client"

interface ComingSoonProps {
  title: string
  description: string
  features?: string[]
  icon?: string
  estimatedDate?: string
}

export default function ComingSoon({
  title,
  description,
  features = [],
  icon = "🚧",
  estimatedDate,
}: ComingSoonProps) {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 sm:h-24 sm:w-24">
              <span className="text-4xl sm:text-5xl">{icon}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            {title}
          </h1>

          {/* Description */}
          <p className="mb-6 text-center text-base text-gray-600 sm:text-lg">
            {description}
          </p>

          {/* Estimated Date */}
          {estimatedDate && (
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Taxminiy: {estimatedDate}</span>
              </div>
            </div>
          )}

          {/* Features */}
          {features.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-center text-xl font-semibold text-gray-800">
                Rejalashtirilgan imkoniyatlar:
              </h2>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4"
                  >
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="flex-1 text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">
                Ishlab chiqish jarayoni
              </span>
              <span className="text-gray-500">Davom etmoqda...</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-3/5 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>
          </div>

          {/* Footer Message */}
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 text-center">
            <p className="text-sm text-gray-700">
              💡 Bu sahifa ustida aktiv ishlab chiqish davom etmoqda. Tez orada
              yangi imkoniyatlar bilan tanishishingiz mumkin bo'ladi!
            </p>
          </div>
        </div>

        {/* Animation */}
        <style jsx>{`
          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>
      </div>
    </div>
  )
}
