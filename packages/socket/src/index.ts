import { Server } from "@eduarena/common/types/game/socket"
import { inviteCodeValidator } from "@eduarena/common/validators/auth"
import env from "@eduarena/socket/env"
import { registerMatchingHandlers } from "@eduarena/socket/handlers/matching"
import { registerStatsHandlers } from "@eduarena/socket/handlers/stats"
import { registerTrueFalseHandlers } from "@eduarena/socket/handlers/truefalse"
import Config from "@eduarena/socket/services/config"
import Game from "@eduarena/socket/services/game"
import { initKahootResultsStore } from "@eduarena/socket/services/kahoot-results-store"
import Registry from "@eduarena/socket/services/registry"
import { initMatchingStore } from "@eduarena/socket/services/matching-store"
import { initTrueFalseStore } from "@eduarena/socket/services/truefalse-store"
import { withGame } from "@eduarena/socket/utils/game"
import { escapeHtml } from "@eduarena/socket/utils/html"
import { parseOrigins } from "@eduarena/socket/utils/origins"
import { Server as ServerIO } from "socket.io"

const io: Server = new ServerIO({
  cors: {
    origin: parseOrigins(env.WEB_ORIGIN),
    credentials: true,
    methods: ["GET", "POST"],
  },
})

Config.init()
initTrueFalseStore()
initMatchingStore()
initKahootResultsStore()

const registry = Registry.getInstance()
const port = env.SOCKET_PORT

console.log(`Socket server running on port ${port}`)
io.listen(port)

io.on("connection", (socket) => {
  console.log(
    `A user connected: socketId: ${socket.id}, clientId: ${socket.handshake.auth.clientId}`,
  )

  socket.data.isManagerAuthed = false

  socket.on("player:reconnect", ({ gameId }) => {
    const game = registry.getPlayerGame(gameId, socket.handshake.auth.clientId)

    if (game) {
      game.reconnect(socket)

      
return
    }

    socket.emit("game:reset", "Game not found")
  })

  socket.on("manager:reconnect", ({ gameId }) => {
    const game = registry.getManagerGame(gameId, socket.handshake.auth.clientId)

    if (game) {
      game.reconnect(socket)

      
return
    }

    socket.emit("game:reset", "Test tugagan")
  })

  socket.on("manager:auth", (payload) => {
    try {
      const config = Config.game()

      // No backend-socket validation in this deployment:
      // Trust app storage info for teacher (client sends userType + accessToken).
      if (
        typeof payload === "object" &&
        payload?.userType === "teacher" &&
        Boolean(payload.accessToken)
      ) {
        socket.data.isManagerAuthed = true
        socket.emit("manager:quizzList", Config.quizz())

        
return
      }

      const password = String(payload ?? "")

      if (password !== config.managerPassword) {
        socket.emit("manager:errorMessage", "Xato parol")

        
return
      }

      socket.data.isManagerAuthed = true
      socket.emit("manager:quizzList", Config.quizz())
    } catch (error) {
      console.error("Failed to read game config:", error)
      socket.emit("manager:errorMessage", "Sozlamalarda xatolik bor")
    }
  })

  registerTrueFalseHandlers(socket, { escapeHtml })
  registerMatchingHandlers(socket)
  registerStatsHandlers(socket)

  socket.on("game:create", (quizzId) => {
    const quizzList = Config.quizz()
    const quizz = quizzList.find((q) => q.id === quizzId)

    if (!quizz) {
      socket.emit("game:errorMessage", "Test savollari topilmadi")

      
return
    }

    const game = new Game(io, socket, quizz, quizzId)
    registry.addGame(game)
  })

  socket.on("player:join", (inviteCode) => {
    const result = inviteCodeValidator.safeParse(inviteCode)

    if (result.error) {
      socket.emit("game:errorMessage", result.error.issues[0].message)

      
return
    }

    const game = registry.getGameByInviteCode(inviteCode)

    if (!game) {
      socket.emit("game:errorMessage", "O`yin topilmadi")

      
return
    }

    socket.emit("game:successRoom", game.gameId)
  })

  socket.on("player:login", ({ gameId, data }) =>
    withGame(gameId, socket, (game) => game.join(socket, data)),
  )

  socket.on("manager:kickPlayer", ({ gameId, playerId }) =>
    withGame(gameId, socket, (game) => game.kickPlayer(socket, playerId)),
  )

  socket.on("manager:startGame", ({ gameId }) =>
    withGame(gameId, socket, (game) => game.start(socket)),
  )

  socket.on("player:selectedAnswer", ({ gameId, data }) =>
    withGame(gameId, socket, (game) => game.selectAnswer(socket, data.answerKey)),
  )

  socket.on("manager:abortQuiz", ({ gameId }) =>
    withGame(gameId, socket, (game) => game.abortRound(socket)),
  )

  socket.on("manager:nextQuestion", ({ gameId }) =>
    withGame(gameId, socket, (game) => game.nextRound(socket)),
  )

  socket.on("manager:showLeaderboard", ({ gameId }) =>
    withGame(gameId, socket, (game) => game.showLeaderboard()),
  )

  socket.on("disconnect", () => {
    console.log(`A user disconnected : ${socket.id}`)

    const managerGame = registry.getGameByManagerSocketId(socket.id)

    if (managerGame) {
      managerGame.manager.connected = false
      registry.markGameAsEmpty(managerGame)

      if (!managerGame.started) {
        managerGame.abortCooldown()
        console.log(`Manager disconnected (room kept): ${managerGame.gameId}`)

        
return
      }
    }

    const game = registry.getGameByPlayerSocketId(socket.id)

    if (!game) {return}

    const player = game.players.find((p) => p.id === socket.id)

    if (!player) {return}

    if (!game.started) {
      game.players = game.players.filter((p) => p.id !== socket.id)
      io.to(game.manager.id).emit("manager:removePlayer", player.id)
      io.to(game.gameId).emit("game:totalPlayers", game.players.length)
      console.log(`Removed player ${player.username} from game ${game.gameId}`)

      
return
    }

    player.connected = false
    io.to(game.gameId).emit("game:totalPlayers", game.players.length)
  })
})

process.on("SIGINT", () => {
  Registry.getInstance().cleanup()
  process.exit(0)
})

process.on("SIGTERM", () => {
  Registry.getInstance().cleanup()
  process.exit(0)
})

