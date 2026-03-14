import { SocketProvider } from "@/contexts/socketProvider"
import { PropsWithChildren } from "react"

export default function GameLayout({ children }: PropsWithChildren) {
  return <SocketProvider>{children}</SocketProvider>
}

