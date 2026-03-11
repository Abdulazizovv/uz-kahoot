"use client"

import { useStudentNav } from "@/contexts/student-nav"
import { useAuthStore } from "@/stores/auth"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

interface MenuItemProps {
  href: string
  icon: string
  label: string
  badge?: number
}

const MenuItem = ({ href, icon, label, badge }: MenuItemProps) => {
  const pathname = usePathname()
  const { closeSidebar } = useStudentNav()
  const isActive = pathname === href || pathname?.startsWith(href + "/")

  return (
    <Link
      href={href}
      onClick={closeSidebar}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
        isActive
          ? "bg-slate-900 text-white"
          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <span className="text-sm">{icon}</span>
      <span className="flex-1">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-semibold ${isActive ? "bg-white/15 text-white" : "bg-slate-200 text-slate-700"}`}>
          {badge}
        </span>
      )}
    </Link>
  )
}

export default function StudentSidebar() {
  const router = useRouter()
  const { logout } = useAuthStore()
  const { isSidebarOpen, closeSidebar } = useStudentNav()

  const handleLogout = () => {
    logout()
    router.push("/auth")
  }

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-lg transition-transform duration-300 lg:static lg:translate-x-0 lg:shadow-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Student navigation"
      >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:h-20 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 shadow-sm">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-slate-900">
              EduArena
            </h1>
            <p className="text-xs text-slate-500">Talaba</p>
          </div>
        </div>
        <button
          onClick={closeSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
          aria-label="Close menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto p-3 lg:p-4">
        <div className="mb-2 px-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Asosiy
        </div>
        <MenuItem href="/student/dashboard" icon="📊" label="Dashboard" />
        <MenuItem
          href="/student/labs"
          icon="⚗️"
          label="Laboratoriyalar"
          badge={14}
        />
        <MenuItem href="/game/join" icon="🎮" label="Testga qatnashish" />
        <MenuItem href="/student/quizzes/true-false" icon="🧩" label="True/False testlar" />
        <MenuItem href="/student/attendance" icon="📅" label="Davomat" />
        <MenuItem href="/student/results" icon="📈" label="Natijalarim" />
        <MenuItem
          href="/student/achievements"
          icon="🎓"
          label="Yutuqlar"
          badge={3}
        />
        <div className="my-4 h-px bg-slate-200"></div>
        <div className="mb-2 px-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Hisob
        </div>
        <MenuItem href="/student/profile" icon="👤" label="Profil" />
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-3 lg:p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Chiqish</span>
        </button>
      </div>
      </div>
    </>
  )
}
