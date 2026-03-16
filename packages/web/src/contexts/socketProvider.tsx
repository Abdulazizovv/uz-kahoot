/* eslint-disable no-empty-function */
"use client"

import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@eduarena/common/types/game/socket"
import ky from "ky"
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { io, Socket } from "socket.io-client"
import { v7 as uuid } from "uuid"

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>

interface SocketContextValue {
  socket: TypedSocket | null
  isConnected: boolean
  lastError: string | null
  serverUrl: string | null
  clientId: string
  connect: () => void
  disconnect: () => void
  reconnect: () => void
}

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  isConnected: false,
  lastError: null,
  serverUrl: null,
  clientId: "",
  connect: () => {},
  disconnect: () => {},
  reconnect: () => {},
})

const getSocketServer = async () => {
  const res = await ky.get("/socket").json<{ url: string }>()

  return res.url
}

const getClientId = (): string => {
  try {
    const stored = localStorage.getItem("client_id")

    if (stored) {
      return stored
    }

    const newId = uuid()
    localStorage.setItem("client_id", newId)

    return newId
  } catch {
    return uuid()
  }
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<TypedSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [lastError, setLastError] = useState<string | null>(null)
  const [serverUrl, setServerUrl] = useState<string | null>(null)
  const [clientId] = useState<string>(() => getClientId())
  const connectRequestedRef = React.useRef(false)

  useEffect(() => {
    if (socket) {
      return
    }

    let s: TypedSocket | null = null

    const initSocket = async () => {
      try {
        const socketUrl = await getSocketServer()
        let normalizedUrl = socketUrl.trim()

        // socket.io prefers http(s) URL; ws(s) may break polling/fallback.
        normalizedUrl = normalizedUrl.replace(/^ws:\/\//, "http://")
        normalizedUrl = normalizedUrl.replace(/^wss:\/\//, "https://")

        if (
          typeof window !== "undefined" &&
          window.location.protocol === "https:"
        ) {
          normalizedUrl = normalizedUrl.replace(/^http:\/\//, "https://")
        }

        // Support reverse-proxy setups where socket is mounted under a base path.
        // Accept both:
        // - https://example.com/ws            -> path: /ws/socket.io
        // - https://example.com/ws/socket.io  -> path: /ws/socket.io (do not double-append)
        let baseUrl = normalizedUrl
        let path = "/socket.io"
        try {
          const u = new URL(normalizedUrl)
          baseUrl = u.origin
          const basePath = (u.pathname || "/").replace(/\/$/, "")
          if (!basePath || basePath === "/") {
            path = "/socket.io"
          } else if (basePath.endsWith("/socket.io")) {
            path = basePath
          } else {
            path = `${basePath}/socket.io`.replace(/\/{2,}/g, "/")
          }
        } catch {
          // If URL parsing fails, fall back to default behavior
        }

        setServerUrl(`${baseUrl}${path}`)
        s = io(baseUrl, {
          // Keep default transport order (polling -> websocket upgrade).
          // Some reverse-proxy setups block direct websocket, but polling still works.
          transports: ["polling", "websocket"],
          autoConnect: false,
          timeout: 8000,
          path,
          auth: {
            clientId,
          },
        })

        setSocket(s)

        s.on("connect", () => {
          setIsConnected(true)
          setLastError(null)
        })

        s.on("disconnect", () => {
          setIsConnected(false)
        })

        s.on("connect_error", (err) => {
          const message = err?.message || "Socket connection error"
          setLastError(message)
          console.error("Connection error:", message)
        })

        if (connectRequestedRef.current) {
          connectRequestedRef.current = false
          s.connect()
        }
      } catch (error) {
        setLastError("Failed to initialize socket")
        console.error("Failed to initialize socket:", error)
      }
    }

    initSocket()

    // eslint-disable-next-line consistent-return
    return () => {
      s?.disconnect()
    }
  }, [clientId])

  const connect = useCallback(() => {
    if (!socket) {
      connectRequestedRef.current = true
      return
    }

    if (!socket.connected) socket.connect()
  }, [socket])

  const disconnect = useCallback(() => {
    if (socket && socket.connected) {
      socket.disconnect()
    }
  }, [socket])

  const reconnect = useCallback(() => {
    if (!socket) {
      connectRequestedRef.current = true
      return
    }

    socket.disconnect()
    socket.connect()
  }, [socket])

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        lastError,
        serverUrl,
        clientId,
        connect,
        disconnect,
        reconnect,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)

export const useEvent = <E extends keyof ServerToClientEvents>(
  event: E,
  callback: ServerToClientEvents[E],
) => {
  const { socket } = useSocket()

  useEffect(() => {
    if (!socket) {
      return
    }

    socket.on(event, callback as any)

    // eslint-disable-next-line consistent-return
    return () => {
      socket.off(event, callback as any)
    }
  }, [socket, event, callback])
}
