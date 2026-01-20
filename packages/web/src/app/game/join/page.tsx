"use client"

import Room from "@/components/game/join/Room"
import Username from "@/components/game/join/Username"
import { usePlayerStore } from "@/stores/player"
import { useEffect } from "react"

const JoinGame = () => {
  const { gameId, reset } = usePlayerStore()

  useEffect(() => {
    // Yangi o'yinga qo'shilish uchun oldingi ma'lumotlarni tozalash
    reset()
  }, [])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700 px-4">
      {/* Educational pattern background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        }}
      ></div>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 h-32 w-32 animate-bounce rounded-full bg-yellow-300 blur-3xl"></div>
        <div className="absolute top-40 right-20 h-40 w-40 animate-pulse rounded-full bg-pink-300 blur-3xl"></div>
        <div className="animation-delay-2000 absolute bottom-20 left-1/4 h-36 w-36 animate-bounce rounded-full bg-purple-300 blur-3xl"></div>
        <div className="animation-delay-4000 absolute right-1/4 bottom-40 h-28 w-28 animate-pulse rounded-full bg-blue-300 blur-3xl"></div>
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-float absolute top-1/4 left-10">
          <svg
            className="h-12 w-12 text-white/20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
          </svg>
        </div>
        <div className="animate-float animation-delay-2000 absolute top-1/3 right-16">
          <svg
            className="h-10 w-10 text-white/20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
          </svg>
        </div>
        <div className="animate-float animation-delay-4000 absolute right-10 bottom-1/4">
          <svg
            className="h-14 w-14 text-white/20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
          </svg>
        </div>
      </div>

      {/* Main content card */}
      <div className="animate-fade-in-up relative z-10 w-full max-w-md">
        <div className="rounded-3xl bg-white/10 p-8 shadow-2xl ring-1 ring-white/20 backdrop-blur-xl">
          {/* Header with book icon */}
          <div className="mb-8 flex flex-col items-center">
            <div className="animate-bounce-slow mb-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 p-4 shadow-lg">
              <svg
                className="h-12 w-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
              </svg>
            </div>
            <h1 className="bg-gradient-to-r from-yellow-200 via-white to-blue-200 bg-clip-text text-center text-4xl font-extrabold text-transparent">
              O'yinga Qo'shilish
            </h1>
            <p className="mt-2 text-center text-sm text-white/80">
              Bilimingizni sinab ko'ring
            </p>
          </div>

          {/* Form container */}
          <div className="animate-fade-in">
            {!gameId ? <Room /> : <Username />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinGame
