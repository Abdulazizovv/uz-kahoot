"use client"

import { CommonStatusDataMap } from "@eduarena/common/types/game/status"
import AnswerButton from "@/components/AnswerButton"
import { useEvent, useSocket } from "@/contexts/socketProvider"
import { usePlayerStore } from "@/stores/player"
import {
  ANSWERS_COLORS,
  ANSWERS_ICONS,
  SFX_ANSWERS_MUSIC,
  SFX_ANSWERS_SOUND,
} from "@/utils/constants"
import clsx from "clsx"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import useSound from "use-sound"

type Props = {
  data: CommonStatusDataMap["SELECT_ANSWER"]
}

const Answers = ({
  data: { question, answers, image, time, totalPlayer },
}: Props) => {
  const { gameId }: { gameId?: string } = useParams()
  const { socket } = useSocket()
  const { player } = usePlayerStore()

  const [cooldown, setCooldown] = useState(time)
  const [totalAnswer, setTotalAnswer] = useState(0)

  const [sfxPop] = useSound(SFX_ANSWERS_SOUND, {
    volume: 0.1,
  })

  const [playMusic, { stop: stopMusic }] = useSound(SFX_ANSWERS_MUSIC, {
    volume: 0.2,
    interrupt: true,
    loop: true,
  })

  const handleAnswer = (answerKey: number) => () => {
    if (!player) {
      return
    }

    socket?.emit("player:selectedAnswer", {
      gameId,
      data: {
        answerKey,
      },
    })
    sfxPop()
  }

  useEffect(() => {
    playMusic()

    return () => {
      stopMusic()
    }
  }, [playMusic])

  useEvent("game:cooldown", (sec) => {
    setCooldown(sec)
  })

  useEvent("game:playerAnswer", (count) => {
    setTotalAnswer(count)
    sfxPop()
  })

  return (
    <div className="flex h-full flex-1 flex-col justify-between">
      <div className="mx-auto inline-flex h-full w-full max-w-7xl flex-1 flex-col items-center justify-center gap-5 px-4">
        {/* Question Card */}
        <div className="rounded-2xl bg-white/95 p-6 shadow-xl ring-2 ring-amber-400/50 backdrop-blur-sm">
          <h2 className="text-center text-2xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
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

      <div>
        {/* Stats Bar */}
        <div className="mx-auto mb-4 flex w-full max-w-7xl justify-between gap-2 px-2">
          <div className="flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 shadow-lg backdrop-blur-sm">
            <svg
              className="h-6 w-6 text-amber-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            <span className="text-2xl font-bold text-gray-800">{cooldown}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 shadow-lg backdrop-blur-sm">
            <svg
              className="h-6 w-6 text-amber-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
            </svg>
            <span className="text-2xl font-bold text-gray-800">
              {totalAnswer}/{totalPlayer}
            </span>
          </div>
        </div>

        {/* Answer Buttons */}
        <div className="mx-auto mb-4 grid w-full max-w-7xl grid-cols-2 gap-2 px-2">
          {answers.map((answer, key) => (
            <AnswerButton
              key={key}
              className={clsx(ANSWERS_COLORS[key])}
              icon={ANSWERS_ICONS[key]}
              onClick={handleAnswer(key)}
            >
              {answer}
            </AnswerButton>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Answers
