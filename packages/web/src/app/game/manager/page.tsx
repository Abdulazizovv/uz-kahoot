"use client"

import { QuizzWithId } from "@eduarena/common/types/game"
import { STATUS } from "@eduarena/common/types/game/status"
import ManagerPassword from "@/components/game/create/ManagerPassword"
import SelectQuizz from "@/components/game/create/SelectQuizz"
import Loader from "@/components/Loader"
import { useEvent, useSocket } from "@/contexts/socketProvider"
import { useAuthStore } from "@/stores/auth"
import { useManagerStore } from "@/stores/manager"
import { useQuestionStore } from "@/stores/question"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import toast from "react-hot-toast"

const CreateGame = () => {
  const router = useRouter()
  const { socket, isConnected, connect, lastError, serverUrl } = useSocket()
  const { user, accessToken, isHydrated } = useAuthStore()
  const { setGameId, setStatus, setPlayers, reset } = useManagerStore()
  const { setQuestionStates } = useQuestionStore()
  const [quizzList, setQuizzList] = useState<QuizzWithId[]>([])
  const [selectedQuizz, setSelectedQuizz] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [forcePassword, setForcePassword] = useState(false)
  const hasRequestedAuthRef = useRef(false)

  const isTeacher = useMemo(
    () => Boolean(user && user.user_type === "teacher"),
    [user],
  )

  useEffect(() => {
    // Oldingi o'yin ma'lumotlarini tozalash
    reset()
  }, [reset])

  useEffect(() => {
    if (!isConnected) connect()
  }, [connect, isConnected])

  useEvent("manager:quizzList", (quizzList: QuizzWithId[]) => {
    setQuizzList(quizzList)
    setIsLoading(false)
    setIsAuthenticated(true)
  })

  useEvent("manager:errorMessage", (message) => {
    toast.error(message)
    if (isTeacher && !isAuthenticated) {
      setForcePassword(true)
      setIsLoading(false)
    }
  })

  useEffect(() => {
    if (!socket || !isHydrated || !isTeacher || !accessToken || forcePassword) {
      return
    }
    if (hasRequestedAuthRef.current) return
    hasRequestedAuthRef.current = true
    setIsLoading(true)
    socket.emit("manager:auth", { accessToken, userType: user?.user_type })
  }, [socket, isHydrated, isTeacher, accessToken, forcePassword])

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
      />
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 h-40 w-40 animate-pulse rounded-full bg-amber-300 blur-3xl" />
        <div className="animation-delay-2000 absolute top-32 right-10 h-48 w-48 animate-bounce rounded-full bg-emerald-300 blur-3xl" />
        <div className="animation-delay-3000 absolute bottom-16 left-1/3 h-36 w-36 animate-pulse rounded-full bg-rose-300 blur-3xl" />
        <div className="animation-delay-1000 absolute right-1/3 bottom-32 h-32 w-32 animate-bounce rounded-full bg-sky-300 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/teacher/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            <span aria-hidden="true">←</span> Panel
          </Link>
          <Link
            href="/game/join"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            O&apos;yinga qo&apos;shilish <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              O&apos;yin yaratish
            </h1>
            <p className="mt-1 text-sm text-white/70">
              Test tanlang va sessiyani boshlang.
            </p>
          </div>

          {!isAuthenticated ? (
            !isHydrated ? (
              <div className="flex flex-col items-center justify-center gap-4 py-10 text-white/90">
                <Loader />
                <p className="text-sm font-semibold text-white/80">
                  Yuklanmoqda...
                </p>
              </div>
            ) : isTeacher && !forcePassword ? (
              <div className="flex flex-col items-center justify-center gap-4 py-10 text-white/90">
                <Loader />
                <p className="text-sm font-semibold text-white/80">
                  O&apos;qituvchi sifatida tekshirilmoqda...
                </p>
                {!isConnected && (
                  <div className="max-w-md text-center text-xs text-white/70">
                    <p>Socket ulanmagan.</p>
                    {lastError && <p className="mt-1">Xato: {lastError}</p>}
                    {serverUrl && (
                      <p className="mt-1">
                        Server: <span className="font-mono">{serverUrl}</span>
                      </p>
                    )}
                    <p className="mt-2">
                      `pnpm dev:socket` ni ishga tushiring. Agar telefon/emulatorda
                      ochayotgan bo&apos;lsangiz, `.env` dagi `SOCKET_URL` da
                      `localhost` emas, kompyuter IP manzilini yozing.
                    </p>
                    <button
                      onClick={() => setForcePassword(true)}
                      className="mt-3 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/10"
                    >
                      Parol bilan kirish
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <ManagerPassword onSubmit={handleAuthSubmit} />
            )
          ) : isLoading ? (
            <div className="flex justify-center py-10">
              <Loader />
            </div>
          ) : !selectedQuizz ? (
            <SelectQuizz quizzList={quizzList} onSelect={handleSelectQuizz} />
          ) : (
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  Test tanlandi
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  O&apos;yinni yaratish uchun davom eting.
                </p>
              </div>
              <button
                onClick={handleCreateGame}
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
              >
                O&apos;yinni yaratish
              </button>
              <button
                onClick={() => setSelectedQuizz(null)}
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/5"
              >
                Testni qayta tanlash
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateGame
