"use client"

import { useAuthStore } from "@/stores/auth"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

interface MenuItemProps {
  href: string
  icon: string
  label: string
  badge?: number
}

const MenuItem = ({ href, icon, label, badge }: MenuItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === href || pathname?.startsWith(href + "/")

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
        isActive
          ? "bg-blue-50 text-blue-700"
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <span className="text-sm">{icon}</span>
      <span className="flex-1">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700">
          {badge}
        </span>
      )}
    </Link>
  )
}

export default function StudentSidebar() {
  const router = useRouter()
  const { logout } = useAuthStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/auth")
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg lg:hidden"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-gray-200 bg-gray-50 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600">
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
              <h1 className="text-lg font-semibold text-gray-900">EduArena</h1>
              <p className="text-xs text-gray-500">Talaba Portali</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          <div className="mb-4 px-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
            Navigation
          </div>
          <MenuItem href="/student/dashboard" icon="📊" label="Dashboard" />
          <MenuItem href="/game/join" icon="🎮" label="Testga qatnashish" />
          <MenuItem href="/student/results" icon="📈" label="Natijalarim" />
          <MenuItem href="/student/profile" icon="👤" label="Profil" />
          <div className="my-4 h-px bg-gray-200"></div>
          <div className="mb-4 px-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
            Coming Soon
          </div>
          <MenuItem href="/student/attendance" icon="📅" label="Davomat" />
          <MenuItem href="/student/achievements" icon="🎓" label="Yutuqlar" />
          <div className="my-4 h-px bg-gray-200"></div>
          <div className="mb-4 px-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
            Account
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
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
