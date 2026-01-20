import Button from "@/components/Button"
import Form from "@/components/Form"
import Input from "@/components/Input"
import { useEvent, useSocket } from "@/contexts/socketProvider"
import { usePlayerStore } from "@/stores/player"
import { KeyboardEvent, useState } from "react"

const Room = () => {
  const { socket } = useSocket()
  const { join } = usePlayerStore()
  const [invitation, setInvitation] = useState("")

  const handleJoin = () => {
    socket?.emit("player:join", invitation)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleJoin()
    }
  }

  useEvent("game:successRoom", (gameId) => {
    join(gameId)
  })

  return (
    <Form>
      <Input
        onChange={(e) => setInvitation(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="PIN kodni kiriting"
      />
      <Button onClick={handleJoin}>Tasdiqlash</Button>
    </Form>
  )
}

export default Room
