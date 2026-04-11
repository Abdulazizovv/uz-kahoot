"use client"

import { useAuthStore } from "@/stores/auth"
import clsx from "clsx"
import Link from "next/link"
import { useEffect, useState } from "react"

type NavLink = { label: string; href: string }

const links: NavLink[] = [
  { label: "Imkoniyatlar", href: "#features" },
  { label: "Rollar", href: "#roles" },
  { label: "Dissertatsiya", href: "#research" },
]

const LandingNav = () => {
  const { isAuthenticated, user, isHydrated } = useAuthStore()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const dashboardHref =
    user?.user_type === "teacher" ? "/teacher/dashboard" : "/student/dashboard"

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={clsx(
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          isScrolled ? "pt-3" : "pt-5",
        )}
      >
        <div
          className={clsx(
            "glow-ring flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 backdrop-blur",
            isScrolled ? "bg-slate-950/70" : "bg-slate-950/45",
          )}
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-white/5">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/20 via-fuchsia-400/10 to-emerald-400/10" />
              <span className="relative font-mono text-sm font-bold text-white">
                EA
              </span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">EduArena</div>
              <div className="text-xs text-white/60">IT ta'lim platformasi</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/70 transition hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/auth"
              className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 sm:inline-flex"
            >
              Kirish
            </Link>
            <Link
              href={isHydrated && isAuthenticated ? dashboardHref : "/auth"}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:from-cyan-400 hover:to-fuchsia-400"
            >
              {isHydrated && isAuthenticated ? "Dashboard" : "Boshlash"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default LandingNav

