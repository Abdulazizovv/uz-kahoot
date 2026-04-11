"use client"

import clsx from "clsx"
import Link from "next/link"
import { useEffect, useState } from "react"

const AuthNav = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", isScrolled ? "pt-3" : "pt-5")}>
        <div
          className={clsx(
            "glow-ring flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 backdrop-blur",
            isScrolled ? "bg-slate-950/70" : "bg-slate-950/45",
          )}
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5">
              <span className="font-mono text-sm font-bold text-white">EA</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">EduArena</div>
              <div className="text-xs text-white/60">Auth</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            <Link
              href="/"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Landing
            </Link>
            <a
              href="/#features"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Imkoniyatlar
            </a>
            <a
              href="/#research"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Dissertatsiya
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/student/it-posts"
              className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 sm:inline-flex"
            >
              IT markazi
            </Link>
            <Link
              href="/"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:from-cyan-400 hover:to-fuchsia-400"
            >
              Bosh sahifa
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AuthNav

