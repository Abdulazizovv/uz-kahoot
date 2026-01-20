"use client"

import { CommonStatusDataMap } from "@eduarena/common/types/game/status"
import { SFX_SHOW_SOUND } from "@/utils/constants"
import { useEffect } from "react"
import useSound from "use-sound"

type Props = {
  data: CommonStatusDataMap["SHOW_QUESTION"]
}

const Question = ({ data: { question, image, cooldown } }: Props) => {
  const [sfxShow] = useSound(SFX_SHOW_SOUND, { volume: 0.5 })

  useEffect(() => {
    sfxShow()
  }, [sfxShow])

  return (
    <section className="relative mx-auto flex h-full w-full max-w-7xl flex-1 flex-col items-center px-4">
      <div className="flex flex-1 flex-col items-center justify-center gap-5">
        {/* Question Card */}
        <div className="anim-show rounded-3xl bg-white/95 p-8 shadow-2xl ring-2 ring-amber-400/50 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-center">
            <div className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 p-3">
              <svg
                className="h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
              </svg>
            </div>
          </div>
          <h2 className="text-center text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
            {question}
          </h2>
        </div>

        {Boolean(image) && (
          <img
            alt={question}
            src={image}
            className="m-4 h-full max-h-[400px] min-h-[200px] w-auto rounded-2xl shadow-2xl ring-4 ring-white/50"
          />
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-20 w-full max-w-4xl">
        <div className="h-3 overflow-hidden rounded-full bg-white/30 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 shadow-lg"
            style={{ animation: `progressBar ${cooldown}s linear forwards` }}
          ></div>
        </div>
      </div>
    </section>
  )
}

export default Question
