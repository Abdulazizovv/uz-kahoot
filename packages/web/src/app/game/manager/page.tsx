"use client"

import { QuizzWithId } from "@eduarena/common/types/game"
import { STATUS } from "@eduarena/common/types/game/status"
import ManagerPassword from "@/components/game/create/ManagerPassword"
import SelectQuizz from "@/components/game/create/SelectQuizz"
import Loader from "@/components/Loader"
import { useEvent, useSocket } from "@/contexts/socketProvider"
import { useManagerStore } from "@/stores/manager"
import { useQuestionStore } from "@/stores/question"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const CreateGame = () => {
  const router = useRouter()
  const { socket } = useSocket()
  const { setGameId, setStatus, setPlayers, reset } = useManagerStore()
  const { setQuestionStates } = useQuestionStore()
  const [quizzList, setQuizzList] = useState<QuizzWithId[]>([])
  const [selectedQuizz, setSelectedQuizz] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Oldingi o'yin ma'lumotlarini tozalash
    reset()
  }, [reset])

  useEvent("manager:quizzList", (quizzList: QuizzWithId[]) => {
    setQuizzList(quizzList)
    setIsLoading(false)
    setIsAuthenticated(true)
  })

  useEvent(
    "manager:gameCreated",
    ({ gameId, inviteCode }: { gameId: string; inviteCode: string }) => {
      setGameId(gameId)
      setStatus(STATUS.SHOW_ROOM, { text: "Kutish xonasi", inviteCode })
      setPlayers([])
      setQuestionStates({
        current: 1,
        total:
          quizzList.find((q) => q.id === selectedQuizz)?.questions?.length || 0,
      })
      router.push(`/game/manager/${gameId}`)
    },
  )

  const handleAuthSubmit = (password: string) => {
    socket?.emit("manager:auth", password)
  }

  const handleSelectQuizz = (quizzId: string) => {
    setSelectedQuizz(quizzId)
  }

  const handleCreateGame = () => {
    if (!selectedQuizz) {
      return
    }

    socket?.emit("game:create", selectedQuizz)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 px-4">
      {/* Educational pattern background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        }}
      ></div>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 h-40 w-40 animate-pulse rounded-full bg-amber-300 blur-3xl"></div>
        <div className="animation-delay-2000 absolute top-32 right-10 h-48 w-48 animate-bounce rounded-full bg-emerald-300 blur-3xl"></div>
        <div className="animation-delay-3000 absolute bottom-16 left-1/3 h-36 w-36 animate-pulse rounded-full bg-rose-300 blur-3xl"></div>
        <div className="animation-delay-1000 absolute right-1/3 bottom-32 h-32 w-32 animate-bounce rounded-full bg-sky-300 blur-3xl"></div>
      </div>

      {/* Floating education icons */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-float absolute top-1/4 left-16">
          <svg
            className="h-16 w-16 text-white/15"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
          </svg>
        </div>
        <div className="animate-float animation-delay-3000 absolute top-1/3 right-20">
          <svg
            className="h-12 w-12 text-white/15"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <div className="animate-float animation-delay-1000 absolute bottom-20 left-20">
          <svg
            className="h-14 w-14 text-white/15"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
          </svg>
        </div>
        <div className="animate-float animation-delay-2000 absolute right-12 bottom-1/3">
          <svg
            className="h-10 w-10 text-white/15"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
        </div>
      </div>

      {/* Main content card */}
      <div className="animate-fade-in-up relative z-10 w-full max-w-md">
        <div className="rounded-3xl bg-white/10 p-8 shadow-2xl ring-1 ring-white/20 backdrop-blur-xl">
          {/* Header with graduation cap icon */}
          <div className="mb-8 flex flex-col items-center">
            <div className="animate-bounce-slow mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-4 shadow-lg">
              <svg
                className="h-12 w-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              </svg>
            </div>
            <h1 className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-center text-4xl font-extrabold text-transparent">
              Test Yaratish
            </h1>
            <p className="mt-2 text-center text-sm text-white/80">
              Talabalar uchun interaktiv test
            </p>
          </div>

          {/* Content container */}
          <div className="animate-fade-in">
            {!isAuthenticated ? (
              <ManagerPassword onSubmit={handleAuthSubmit} />
            ) : isLoading ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : !selectedQuizz ? (
              <SelectQuizz quizzList={quizzList} onSelect={handleSelectQuizz} />
            ) : (
              <div className="flex flex-col gap-4">
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-center text-white">✅ Test tanlandi</p>
                  <p className="mt-2 text-center text-sm text-white/70">
                    O'yin yaratish uchun tugmani bosing
                  </p>
                </div>
                <button
                  onClick={handleCreateGame}
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  <span className="relative z-10">🎓 O'yin yaratish</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-pink-500 to-purple-500 transition-transform group-hover:translate-x-0"></div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateGame
