"use client"

import { STATUS } from "@eduarena/common/types/game/status"
import Button from "@/components/Button"
import Form from "@/components/Form"
import Input from "@/components/Input"
import { useEvent, useSocket } from "@/contexts/socketProvider"
import { usePlayerStore } from "@/stores/player"
import { useAuthStore } from "@/stores/auth"
import { studentsService } from "@/services/api/students.service"

import { useRouter } from "next/navigation"
import { KeyboardEvent, useEffect, useState } from "react"
import toast from "react-hot-toast"

const Username = () => {
  const { socket } = useSocket()
  const { gameId, login, setStatus } = usePlayerStore()
  const { user, isAuthenticated, isHydrated } = useAuthStore()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [groupId, setGroupId] = useState<string | undefined>(undefined)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!isHydrated || !isAuthenticated || user?.user_type !== "student") return
      try {
        const me = await studentsService.getMe()
        if (mounted) setGroupId(me.group.id)
      } catch (e) {
        console.error(e)
        toast.error("Guruh ma'lumotini olishda xatolik")
      }
    })()
    return () => {
      mounted = false
    }
  }, [isAuthenticated, isHydrated, user?.user_type])

  const handleLogin = () => {
    if (!gameId) {
      return
    }

    socket?.emit("player:login", {
      gameId,
      data: {
        username,
        studentUserId: user?.user_type === "student" ? user.id : undefined,
        groupId: user?.user_type === "student" ? groupId : undefined,
      },
    })
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
