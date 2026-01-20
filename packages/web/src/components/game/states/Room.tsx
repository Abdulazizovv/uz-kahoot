"use client"

import { Player } from "@eduarena/common/types/game"
import { ManagerStatusDataMap } from "@eduarena/common/types/game/status"
import { useEvent, useSocket } from "@/contexts/socketProvider"
import { useManagerStore } from "@/stores/manager"
import { useState } from "react"

type Props = {
  data: ManagerStatusDataMap["SHOW_ROOM"]
}

const Room = ({ data: { text, inviteCode } }: Props) => {
  const { gameId } = useManagerStore()
  const { socket } = useSocket()
  const { players } = useManagerStore()
  const [playerList, setPlayerList] = useState<Player[]>(players)
  const [totalPlayers, setTotalPlayers] = useState(0)

  useEvent("manager:newPlayer", (player) => {
    setPlayerList([...playerList, player])
  })

  useEvent("manager:removePlayer", (playerId) => {
    setPlayerList(playerList.filter((p) => p.id !== playerId))
  })

  useEvent("manager:playerKicked", (playerId) => {
    setPlayerList(playerList.filter((p) => p.id !== playerId))
  })

  useEvent("game:totalPlayers", (total) => {
    setTotalPlayers(total)
  })

  const handleKick = (playerId: string) => () => {
    if (!gameId) {
      return
    }

    socket?.emit("manager:kickPlayer", {
      gameId,
      playerId,
    })
  }

  return (
    <section className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-2">
      {/* PIN Code Display */}
      <div className="animate-bounce-slow mb-10">
        <div className="relative rounded-2xl bg-white p-8 shadow-2xl ring-4 ring-amber-400/50">
          <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
          </div>
          <div className="text-7xl font-extrabold tracking-wider text-gray-800">
            {inviteCode}
          </div>
        </div>
      </div>

      <h2 className="mb-6 text-4xl font-bold text-white drop-shadow-lg">
        {text}
      </h2>

      {/* Student Counter */}
      <div className="mb-8 flex items-center justify-center gap-3 rounded-full bg-white/90 px-8 py-4 shadow-lg backdrop-blur-sm">
        <svg
          className="h-8 w-8 text-amber-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
        <span className="text-3xl font-bold text-gray-800">{totalPlayers}</span>
        <span className="text-lg font-medium text-gray-600">talaba</span>
      </div>

      {/* Students Grid */}
      <div className="flex max-w-5xl flex-wrap justify-center gap-3">
        {playerList.map((player, index) => (
          <div
            key={player.id}
            className="group animate-fade-in relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 p-4 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            onClick={handleKick(player.id)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/30">
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white drop-shadow-md group-hover:line-through">
                {player.username}
              </span>
            </div>
            <div className="absolute inset-0 -translate-x-full bg-red-500 transition-transform group-hover:translate-x-0"></div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Room
