import { Player } from "@eduarena/common/types/game"
import { Server, Socket } from "@eduarena/common/types/game/socket"
import { Status, StatusDataMap } from "@eduarena/common/types/game/status"

export const disconnectSocketFromGame = (
  io: Server,
  gameId: string,
  socketId: string
) => {
  io.in(socketId).socketsLeave(gameId)

  const anyIo = io as any
  const existing = anyIo?.sockets?.sockets?.get?.(socketId)
  existing?.disconnect?.(true)
}

export const takeoverPlayerSocket = (
  params: {
    io: Server
    gameId: string
    managerId: string
    playersLength: number
    playerStatus: Map<string, { name: Status; data: StatusDataMap[Status] }>
  },
  socket: Socket,
  player: Player,
  updates?: { username?: string; studentUserId?: string; groupId?: string }
) => {
  const { io, gameId, managerId, playersLength, playerStatus } = params

  const oldSocketId = player.id
  const didChangeSocketId = oldSocketId !== socket.id

  if (updates?.username?.trim()) {
    player.username = updates.username.trim()
  }

  if (typeof updates?.studentUserId !== "undefined") {
    player.studentUserId = updates.studentUserId || undefined
  }

  if (typeof updates?.groupId !== "undefined") {
    player.groupId = updates.groupId || undefined
  }

  if (didChangeSocketId) {
    io.to(oldSocketId).emit("game:reset", "Siz boshqa qurilmada qayta ulandingiz")
    disconnectSocketFromGame(io, gameId, oldSocketId)

    if (playerStatus.has(oldSocketId)) {
      const oldStatus = playerStatus.get(oldSocketId)!
      playerStatus.delete(oldSocketId)
      playerStatus.set(socket.id, oldStatus)
    }

    io.to(managerId).emit("manager:removePlayer", oldSocketId)
  }

  socket.join(gameId)
  player.id = socket.id
  player.connected = true

  if (didChangeSocketId) {
    io.to(managerId).emit("manager:newPlayer", { ...player })
  }

  io.to(gameId).emit("game:totalPlayers", playersLength)
}

