"use client"

import { useAuthStore } from "@/stores/auth"

export default function StudentHeader() {
  const { user } = useAuthStore()

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {user?.firstName || "Talaba"} {user?.lastName || ""}
          </h2>
          <p className="text-xs text-gray-500">ID: {user?.id || "000000"}</p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 rounded-md border border-gray-200 bg-gray-50 px-4 py-2">
            <div className="text-center">
              <div className="text-xs text-gray-500">Tajriba</div>
              <div className="text-lg font-semibold text-gray-900">1250</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Daraja</div>
              <div className="text-lg font-semibold text-gray-900">5</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Reyting</div>
              <div className="text-lg font-semibold text-gray-900">#12</div>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white transition-colors hover:bg-gray-50">
            <svg
              className="h-5 w-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
              2
            </span>
          </button>

          {/* Profile */}
          <button className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 transition-colors hover:bg-gray-50">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700">
              {user?.firstName?.[0] || "S"}
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
