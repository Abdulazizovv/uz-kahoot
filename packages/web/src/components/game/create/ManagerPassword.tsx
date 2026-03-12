import Button from "@/components/Button"
import Form from "@/components/Form"
import Input from "@/components/Input"
import { useEvent, useSocket } from "@/contexts/socketProvider"
import { KeyboardEvent, useState } from "react"
import toast from "react-hot-toast"

type Props = {
  onSubmit: (_password: string) => void
}

const ManagerPassword = ({ onSubmit }: Props) => {
  const { isConnected, connect } = useSocket()
  const [password, setPassword] = useState("")
  const [pending, setPending] = useState(false)

  const handleSubmit = () => {
    if (!isConnected) {
      setPending(true)
      connect()
      toast.error("Socket ulanmagan. Ulanmoqda, qayta urinib ko'ring.")
      return
    }
    onSubmit(password)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmit()
    }
  }

  useEvent("manager:errorMessage", (message) => {
    toast.error(message)
  })

  useEvent("connect", () => {
    if (!pending) return
    setPending(false)
    if (!password) return
    onSubmit(password)
  })

  return (
    <Form>
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Boshqaruvchi parolini kiriting"
      />
      <Button onClick={handleSubmit}>
        {pending ? "Ulanmoqda..." : "Kirish"}
      </Button>
    </Form>
  )
}

export default ManagerPassword
