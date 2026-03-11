"use client"

import { useStudentNav } from "@/contexts/student-nav"
import { useAuthStore } from "@/stores/auth"

export default function StudentHeader() {
  const { user } = useAuthStore()
  const { toggleSidebar } = useStudentNav()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
                {user?.first_name || "Talaba"} {user?.last_name || ""}
              </h2>
              <span className="hidden rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white sm:inline-flex">
                Talaba
              </span>
            </div>
            <p className="mt-0.5 hidden text-xs text-slate-600 sm:block">
              ID: {user?.id || "000000"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              2
            </span>
          </button>

          <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm transition hover:bg-slate-50">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
              {user?.first_name?.[0] || "S"}
            </div>
            <div className="hidden text-left sm:block">
              <div className="text-sm font-semibold text-slate-900">
                {user?.first_name} {user?.last_name}
              </div>
              <div className="text-xs text-slate-500">Profil</div>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
