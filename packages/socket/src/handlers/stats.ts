import { Socket } from "@eduarena/common/types/game/socket"
import { computeGroupStats, computeTestStats } from "@eduarena/socket/services/stats"

export const registerStatsHandlers = (socket: Socket) => {
  socket.on("stats:group", ({ groupId, from, to }) => {
    try {
      if (!socket.data.isManagerAuthed) {
        socket.emit("stats:error", "Ruxsat yo'q. Avval parol bilan kiring.")

        
return
      }

      socket.emit("stats:group", computeGroupStats({ groupId, from, to }))
    } catch (e) {
      console.error("stats:group error", e)
      socket.emit("stats:error", "Statistikani olishda xatolik.")
    }
  })

  socket.on("stats:test", ({ kind, testId }) => {
    try {
      if (!socket.data.isManagerAuthed) {
        socket.emit("stats:error", "Ruxsat yo'q. Avval parol bilan kiring.")

        
return
      }

      const stats = computeTestStats({ kind, testId })

      if (!stats) {
        socket.emit("stats:error", "Statistika topilmadi.")

        
return
      }

      socket.emit("stats:test", stats)
    } catch (e) {
      console.error("stats:test error", e)
      socket.emit("stats:error", "Statistikani olishda xatolik.")
    }
  })
}

