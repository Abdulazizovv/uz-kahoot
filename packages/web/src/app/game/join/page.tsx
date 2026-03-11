"use client"

import Room from "@/components/game/join/Room"
import Username from "@/components/game/join/Username"
import { usePlayerStore } from "@/stores/player"
import Link from "next/link"
import { useEffect } from "react"

const JoinGame = () => {
  const { gameId, reset } = usePlayerStore()

  useEffect(() => {
    // Yangi o'yinga qo'shilish uchun oldingi ma'lumotlarni tozalash
    reset()
  }, [reset])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700 px-4">
      {/* Educational pattern background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        }}
      />
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 h-32 w-32 animate-bounce rounded-full bg-yellow-300 blur-3xl" />
        <div className="absolute top-40 right-20 h-40 w-40 animate-pulse rounded-full bg-pink-300 blur-3xl" />
        <div className="animation-delay-2000 absolute bottom-20 left-1/4 h-36 w-36 animate-bounce rounded-full bg-purple-300 blur-3xl" />
        <div className="animation-delay-4000 absolute right-1/4 bottom-40 h-28 w-28 animate-pulse rounded-full bg-blue-300 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            <span aria-hidden="true">←</span> Bosh sahifa
          </Link>
          <Link
            href="/game/manager"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            O&apos;yin yaratish <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              O&apos;yinga qo&apos;shilish
            </h1>
            <p className="mt-1 text-sm text-white/70">
              PIN kodni kiriting va ismingizni tanlang.
            </p>
          </div>

          {!gameId ? <Room /> : <Username />}
        </div>
      </div>
    </div>
  )
}

export default JoinGame
