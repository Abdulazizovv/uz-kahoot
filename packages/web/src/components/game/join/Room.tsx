import Button from "@eduarena/web/components/Button"
import Form from "@eduarena/web/components/Form"
import Input from "@eduarena/web/components/Input"
import { useEvent, useSocket } from "@eduarena/web/contexts/socketProvider"
import { usePlayerStore } from "@eduarena/web/stores/player"
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
