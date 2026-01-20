"use client"

import { useAuthStore } from "@/stores/auth"
import { useState } from "react"

const Header = () => {
  const { user, logout } = useAuthStore()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const currentTime = new Date()

  // O'zbek oylarining nomlari
  const months = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentabr",
    "oktabr",
    "noyabr",
    "dekabr",
  ]

  const formatDate = (date: Date) => {
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day}-${month}, ${year}`
  }

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    return `${hours}:${minutes}`
  }

  return (
    <header className="sticky top-0 z-30 border-b-2 border-gray-300 bg-white shadow-sm">
      <div className="flex h-24 items-center justify-between px-8">
        {/* Welcome Section */}
        <div>
          <div className="mb-1 flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {user?.first_name} {user?.last_name}
            </h1>
            <span className="rounded-md bg-blue-900 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
              O'qituvchi
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
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
              <span className="font-medium">{formatDate(currentTime)}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1.5">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">{formatTime(currentTime)}</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Quick Stats */}
          <div className="flex items-center gap-6 rounded-lg border border-gray-200 bg-slate-50 px-6 py-3">
            <div className="text-center">
              <div className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                Faol
              </div>
              <div className="text-xl font-bold text-blue-900">0</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                Labs
              </div>
              <div className="text-xl font-bold text-green-700">14</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                Testlar
              </div>
              <div className="text-xl font-bold text-purple-700">2</div>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-700 transition-all hover:border-blue-600 hover:bg-blue-50">
            <svg
              className="h-6 w-6"
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
            <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 rounded-lg border-2 border-blue-900 bg-gradient-to-br from-blue-900 to-indigo-900 px-5 py-3 text-white shadow-md transition-all hover:shadow-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-blue-500 bg-blue-700 text-lg font-bold">
                {user?.first_name?.[0]}
                {user?.last_name?.[0]}
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold">
                  {user?.first_name} {user?.last_name}
                </div>
                <div className="text-xs text-blue-200">O'qituvchi</div>
              </div>
              <svg
                className={`h-5 w-5 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl">
                <div className="border-b border-gray-100 p-4">
                  <p className="font-semibold text-gray-800">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-gray-700 transition-all hover:bg-gray-100">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profil
                  </button>
                  <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-gray-700 transition-all hover:bg-gray-100">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Sozlamalar
                  </button>
                </div>
                <div className="border-t border-gray-100 p-2">
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-red-600 transition-all hover:bg-red-50"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Chiqish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
