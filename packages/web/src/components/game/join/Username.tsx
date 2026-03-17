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
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react"
import toast from "react-hot-toast"

const Username = () => {
  const { socket, isConnected, connect } = useSocket()
  const { gameId, login, setStatus } = usePlayerStore()
  const { user, isAuthenticated, isHydrated } = useAuthStore()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [groupId, setGroupId] = useState<string | undefined>(undefined)
  const [autoNameReady, setAutoNameReady] = useState(false)
  const autoLoginRef = useRef(false)

  useEffect(() => {
    if (!isConnected) {
      connect()
    }
  }, [connect, isConnected])

  const makeUsername = useMemo(() => {
    return (payload: {
      first_name?: string
      last_name?: string
      phone_number?: string
    }) => {
      const name = [payload.first_name, payload.last_name]
        .filter(Boolean)
        .join(" ")
        .trim()
      if (name) return name
      if (payload.phone_number) return payload.phone_number
      return "Student"
    }
  }, [])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!isHydrated || !isAuthenticated || user?.user_type !== "student") return
      try {
        const me = await studentsService.getMe()
        if (!mounted) return
        setGroupId(me.group?.id)
        const suggested = makeUsername({
          first_name: me.user?.first_name,
          last_name: me.user?.last_name,
          phone_number: me.user?.phone_number,
        })
        setUsername((prev) => prev.trim() || suggested)
        setAutoNameReady(true)
      } catch (e) {
        console.error(e)
        toast.error("Profil ma'lumotini olishda xatolik")
      }
    })()
    return () => {
      mounted = false
    }
  }, [isAuthenticated, isHydrated, user?.user_type, makeUsername])

  const handleLogin = () => {
    if (!gameId) {
      return
    }

    if (!username.trim()) {
      toast.error("Username kiriting")
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

  useEffect(() => {
    if (!autoNameReady) return
    if (!gameId) return
    if (!socket || !isConnected) return
    if (!username.trim()) return
    if (autoLoginRef.current) return
    autoLoginRef.current = true
    handleLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoNameReady, gameId, socket, isConnected, username])

  return (
    <Form>
      {autoNameReady ? (
        <div className="w-full text-center">
          <p className="text-sm font-semibold text-white/80">
            Username avtomatik tanlandi:
          </p>
          <p className="mt-1 truncate text-lg font-bold text-white">
            {username}
          </p>
          <p className="mt-2 text-xs text-white/60">
            Ulanish avtomatik davom etmoqda...
          </p>
        </div>
      ) : (
        <>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="O'zingiz uchun username yozing"
          />
          <Button onClick={handleLogin} disabled={!username.trim()}>
            Tasdiqlash
          </Button>
        </>
      )}
    </Form>
  )
}

export default Username
