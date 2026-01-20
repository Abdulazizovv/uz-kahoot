import Button from "@/components/Button"
import Form from "@/components/Form"
import Input from "@/components/Input"
import { useEvent } from "@/contexts/socketProvider"
import { KeyboardEvent, useState } from "react"
import toast from "react-hot-toast"

type Props = {
  onSubmit: (_password: string) => void
}

const ManagerPassword = ({ onSubmit }: Props) => {
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
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

  return (
    <Form>
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Boshqaruvchi parolini kiriting"
      />
      <Button onClick={handleSubmit}>Kirish</Button>
    </Form>
  )
}

export default ManagerPassword
