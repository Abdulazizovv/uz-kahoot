"use client"

import { Status } from "@eduarena/common/types/game/status"
import background from "@/assets/background.webp"
import Button from "@/components/Button"
import Loader from "@/components/Loader"
import { useEvent, useSocket } from "@/contexts/socketProvider"
import { usePlayerStore } from "@/stores/player"
import { useQuestionStore } from "@/stores/question"
import { MANAGER_SKIP_BTN } from "@/utils/constants"
import clsx from "clsx"
import Image from "next/image"
import { PropsWithChildren, useEffect, useState } from "react"

type Props = PropsWithChildren & {
  statusName: Status | undefined
  onNext?: () => void
  manager?: boolean
}

const GameWrapper = ({ children, statusName, onNext, manager }: Props) => {
  const { isConnected } = useSocket()
  const { player } = usePlayerStore()
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

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between">
      {/* Classroom background with overlay */}
      <div className="fixed top-0 left-0 -z-10 h-full w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 via-amber-800/80 to-orange-700/80"></div>
        <Image
          className="pointer-events-none h-full w-full object-cover opacity-40"
          src={background}
          alt="classroom background"
        />
        {/* Educational pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        ></div>
      </div>

      {!isConnected && !statusName ? (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
          <Loader />
          <h1 className="text-4xl font-bold text-white">Ulanmoqda...</h1>
        </div>
      ) : (
        <>
          <div className="flex w-full justify-between p-4">
            {questionStates && (
              <div className="shadow-inset flex items-center rounded-md bg-white p-2 px-4 text-lg font-bold text-black">
                {`${questionStates.current} / ${questionStates.total}`}
              </div>
            )}

            {manager && next && (
              <Button
                className={clsx("self-end bg-white px-4 text-black!", {
                  "pointer-events-none": isDisabled,
                })}
                onClick={handleNext}
              >
                {next}
              </Button>
            )}
          </div>

          {children}

          {!manager && (
            <div className="z-50 flex items-center justify-between bg-white px-4 py-2 text-lg font-bold text-white">
              <p className="text-gray-800">{player?.username}</p>
              <div className="rounded-sm bg-gray-800 px-3 py-1 text-lg">
                {player?.points}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default GameWrapper
