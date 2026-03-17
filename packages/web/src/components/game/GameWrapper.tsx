"use client"

import { Status } from "@eduarena/common/types/game/status"
import Button from "@/components/Button"
import Loader from "@/components/Loader"
import { useEvent, useSocket } from "@/contexts/socketProvider"
import { useManagerStore } from "@/stores/manager"
import { usePlayerStore } from "@/stores/player"
import { useQuestionStore } from "@/stores/question"
import { MANAGER_SKIP_BTN } from "@/utils/constants"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PropsWithChildren, useEffect, useMemo, useState } from "react"

type Props = PropsWithChildren & {
  statusName: Status | undefined
  onNext?: () => void
  manager?: boolean
}

const MANAGER_PATTERN_BG =
  "url('data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
const PLAYER_PATTERN_BG =
  "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"

const GameWrapper = ({ children, statusName, onNext, manager }: Props) => {
  const router = useRouter()
  const { isConnected, lastError, serverUrl, reconnect } = useSocket()
  const { player, reset: resetPlayer } = usePlayerStore()
  const { reset: resetManager } = useManagerStore()
  const { questionStates, setQuestionStates } = useQuestionStore()
  const [isDisabled, setIsDisabled] = useState(false)
  const next = statusName ? MANAGER_SKIP_BTN[statusName] : null

  useEvent("game:updateQuestion", ({ current, total }) => {
    setQuestionStates({
      current,
      total,
    })
  })

  useEffect(() => {
    setIsDisabled(false)
  }, [statusName])

  const handleNext = () => {
    setIsDisabled(true)
    onNext?.()
  }

  const title = useMemo(() => (manager ? "O'qituvchi" : "O'yinchi"), [manager])

  const handleExit = () => {
    setQuestionStates(null)
    if (manager) {
      resetManager()
      router.replace("/game/manager")
    } else {
      resetPlayer()
      router.replace("/game/join")
    }
  }

  return (
    <section
      className={clsx(
        "relative flex min-h-screen w-full flex-col overflow-hidden",
        manager
          ? "bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900"
          : "bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700",
      )}
    >
      {/* Background (keep it colorful / themed) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: manager ? MANAGER_PATTERN_BG : PLAYER_PATTERN_BG,
          }}
        />
        <div className="absolute inset-0 opacity-20">
          {manager ? (
            <>
              <div className="absolute top-10 left-20 h-40 w-40 animate-pulse rounded-full bg-amber-300 blur-3xl" />
              <div className="animation-delay-2000 absolute top-32 right-10 h-48 w-48 animate-bounce rounded-full bg-emerald-300 blur-3xl" />
              <div className="animation-delay-3000 absolute bottom-16 left-1/3 h-36 w-36 animate-pulse rounded-full bg-rose-300 blur-3xl" />
              <div className="animation-delay-1000 absolute right-1/3 bottom-32 h-32 w-32 animate-bounce rounded-full bg-sky-300 blur-3xl" />
            </>
          ) : (
            <>
              <div className="absolute top-20 left-10 h-32 w-32 animate-bounce rounded-full bg-yellow-300 blur-3xl" />
              <div className="absolute top-40 right-20 h-40 w-40 animate-pulse rounded-full bg-pink-300 blur-3xl" />
              <div className="animation-delay-2000 absolute bottom-20 left-1/4 h-36 w-36 animate-bounce rounded-full bg-purple-300 blur-3xl" />
              <div className="animation-delay-4000 absolute right-1/4 bottom-40 h-28 w-28 animate-pulse rounded-full bg-blue-300 blur-3xl" />
            </>
          )}
        </div>
      </div>

      {!isConnected && !statusName ? (
        <div className="relative z-10 flex h-full w-full flex-1 flex-col items-center justify-center px-4 text-center">
          <Loader />
          <h1 className="text-4xl font-bold text-white">Ulanmoqda...</h1>
          {lastError && (
            <p className="mt-3 max-w-xl text-sm font-semibold text-white/80">
              Socket xatosi: {lastError}
            </p>
          )}
          {serverUrl && (
            <p className="mt-2 max-w-xl text-xs text-white/70">
              Socket server: <span className="font-mono">{serverUrl}</span>
            </p>
          )}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={reconnect}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              Qayta ulanish
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              Bosh sahifa
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-xs text-white/60">
            Agar lokalda ishlayotgan bo&apos;lsangiz `pnpm dev:socket` (yoki
            `pnpm dev`) ni ishga tushiring va `.env` dagi `SOCKET_URL` ni tekshiring.
          </p>
        </div>
      ) : (
        <>
          <header className="sticky top-0 z-20 border-b border-white/10 bg-white/5 backdrop-blur">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExit}
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  Chiqish
                </button>
                <Link
                  href="/"
                  className="hidden items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10 sm:inline-flex"
                >
                  Bosh sahifa
                </Link>
              </div>

              <div className="flex min-w-0 items-center gap-3">
                <span className="hidden text-sm font-semibold text-white/80 sm:inline">
                  {title}
                </span>
                {questionStates && (
                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                    {questionStates.current} / {questionStates.total}
                  </div>
                )}
                {!questionStates && (
                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90">
                    <span
                      className={clsx("h-2 w-2 rounded-full", isConnected ? "bg-emerald-400" : "bg-amber-400")}
                      aria-hidden="true"
                    />
                    {isConnected ? "Ulangan" : "Ulanmoqda"}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {manager && next && (
                  <Button
                    className={clsx("w-auto !bg-white !text-slate-900 hover:!bg-slate-100", {
                      "pointer-events-none": isDisabled,
                    })}
                    onClick={handleNext}
                  >
                    {next}
                  </Button>
                )}
              </div>
            </div>
          </header>

          <main className="relative z-10 flex flex-1 flex-col">{children}</main>

          {!manager && (
            <footer className="sticky bottom-0 z-20 border-t border-white/10 bg-white/5 backdrop-blur">
              <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3">
                <p className="truncate text-sm font-semibold text-white/90">
                  {player?.username}
                </p>
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90">
                  {player?.points ?? 0} ball
                </div>
              </div>
            </footer>
          )}
        </>
      )}
    </section>
  )
}

export default GameWrapper
