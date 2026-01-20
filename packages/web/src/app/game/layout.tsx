"use client"

import { useSocket } from "@/contexts/socketProvider"
import { PropsWithChildren, useEffect } from "react"

const GameLayout = ({ children }: PropsWithChildren) => {
  const { isConnected, connect } = useSocket()
  useEffect(() => {
    if (!isConnected) {
      connect()
    }
  }, [connect, isConnected])

  return children
}

export default GameLayout
