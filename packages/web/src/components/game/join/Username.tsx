"use client"

import { STATUS } from "@eduarena/common/types/game/status"
import Button from "@eduarena/web/components/Button"
import Form from "@eduarena/web/components/Form"
import Input from "@eduarena/web/components/Input"
import { useEvent, useSocket } from "@eduarena/web/contexts/socketProvider"
import { usePlayerStore } from "@eduarena/web/stores/player"

import { useRouter } from "next/navigation"
import { KeyboardEvent, useState } from "react"

const Username = () => {
  const { socket } = useSocket()
  const { gameId, login, setStatus } = usePlayerStore()
  const router = useRouter()
  const [username, setUsername] = useState("")

  const handleLogin = () => {
    if (!gameId) {
      return
    }

    socket?.emit("player:login", { gameId, data: { username } })
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin()
    }
  }

  useEvent("game:successJoin", (gameId) => {
    setStatus(STATUS.WAIT, { text: "O'yin boshlanishi kutilmoqda..." })
    login(username)

    router.replace(`/game/${gameId}`)
  })

  return (
    <Form>
      <Input
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="O'zingiz uchun username yozing"
      />
      <Button onClick={handleLogin}>Tasdiqlash</Button>
    </Form>
  )
}

export default Username
