"use client"

import { CommonStatusDataMap } from "@eduarena/common/types/game/status"
import CricleCheck from "@eduarena/web/components/icons/CricleCheck"
import CricleXmark from "@eduarena/web/components/icons/CricleXmark"
import { usePlayerStore } from "@eduarena/web/stores/player"
import { SFX_RESULTS_SOUND } from "@eduarena/web/utils/constants"
import { useEffect } from "react"
import useSound from "use-sound"

type Props = {
  data: CommonStatusDataMap["SHOW_RESULT"]
}

const Result = ({
  data: { correct, message, points, myPoints, rank, aheadOfMe },
}: Props) => {
  const player = usePlayerStore()

  const [sfxResults] = useSound(SFX_RESULTS_SOUND, {
    volume: 0.2,
  })

  useEffect(() => {
    player.updatePoints(myPoints)

    sfxResults()
  }, [sfxResults])

  return (
    <section className="anim-show relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4">
      {/* Result Icon with animated background */}
      <div className="relative mb-6">
        {correct ? (
          <>
            <div className="absolute inset-0 animate-ping rounded-full bg-green-400/30"></div>
            <CricleCheck className="relative aspect-square max-h-60 w-full drop-shadow-2xl" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 animate-pulse rounded-full bg-red-400/30"></div>
            <CricleXmark className="relative aspect-square max-h-60 w-full drop-shadow-2xl" />
          </>
        )}
      </div>

      {/* Message Card */}
      <div className="mb-4 rounded-2xl bg-white/95 px-8 py-4 shadow-2xl ring-2 ring-amber-400/50 backdrop-blur-sm">
        <h2 className="text-4xl font-bold text-gray-800">{message}</h2>
      </div>

      {/* Rank Info */}
      <div className="mb-4 flex items-center gap-3 rounded-full bg-white/90 px-6 py-3 shadow-lg backdrop-blur-sm">
        <svg
          className="h-8 w-8 text-amber-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">
            {`Top ${rank}`}
            {aheadOfMe && (
              <span className="ml-2 text-lg text-gray-600">(-{aheadOfMe})</span>
            )}
          </p>
        </div>
      </div>

      {/* Points Badge */}
      {correct && (
        <div className="animate-bounce-slow rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 shadow-2xl">
          <span className="text-3xl font-bold text-white drop-shadow-lg">
            +{points} ball
          </span>
        </div>
      )}
    </section>
  )
}

export default Result
