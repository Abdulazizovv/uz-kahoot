import { Server } from "@eduarena/common/types/game/socket"
import { inviteCodeValidator } from "@eduarena/common/validators/auth"
import env from "@eduarena/socket/env"
import Config from "@eduarena/socket/services/config"
import Game from "@eduarena/socket/services/game"
import Registry from "@eduarena/socket/services/registry"
import {
  appendResult,
  createTest,
  deleteTest,
  getResults,
  getTest,
  getTestForStudent,
  gradeAttempt,
  initTrueFalseStore,
  listAvailableTestsForStudent,
  listTests,
  readTelegramMap,
  updateTest,
} from "@eduarena/socket/services/truefalse-store"
import { sendTelegramMessage } from "@eduarena/socket/services/telegram"
import { withGame } from "@eduarena/socket/utils/game"
import { Server as ServerIO } from "socket.io"
import dayjs from "dayjs"
import { v7 as uuid } from "uuid"

const parseOrigins = (raw: string | undefined): "*" | string[] => {
  const value = (raw ?? "").trim()
  if (!value || value === "*") return "*"
  const parts = value
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
  return parts.length ? parts : "*"
}

const io: Server = new ServerIO({
  cors: {
    origin: parseOrigins(env.WEB_ORIGIN),
    credentials: true,
    methods: ["GET", "POST"],
  },
})
Config.init()
initTrueFalseStore()

const registry = Registry.getInstance()
const port = env.SOCKET_PORT

console.log(`Socket server running on port ${port}`)
io.listen(port)

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")

io.on("connection", (socket) => {
  console.log(
    `A user connected: socketId: ${socket.id}, clientId: ${socket.handshake.auth.clientId}`
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
    const game = registry.getManagerGame(
      gameId,
      socket.handshake.auth.clientId
    )

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
      // trust app storage info for teacher (client sends userType + accessToken).
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

  // True/False tests (JSON-based)
  socket.on("tf:list", (payload) => {
    try {
      if (payload.mode === "teacher") {
        if (!socket.data.isManagerAuthed) {
          socket.emit("tf:error", "Ruxsat yo'q. Avval parol bilan kiring.")
          return
        }
        socket.emit("tf:tests", listTests())
        return
      }

      socket.emit("tf:tests", listAvailableTestsForStudent(payload.groupId))
    } catch (e) {
      console.error("tf:list error", e)
      socket.emit("tf:error", "Testlar ro'yxatini olishda xatolik.")
    }
  })

  socket.on("tf:get", ({ id, mode }) => {
    try {
      if (mode === "teacher") {
        if (!socket.data.isManagerAuthed) {
          socket.emit("tf:error", "Ruxsat yo'q. Avval parol bilan kiring.")
          return
        }
        const test = getTest(id)
        if (!test) {
          socket.emit("tf:error", "Test topilmadi.")
          return
        }
        socket.emit("tf:test", test)
        return
      }

      const test = getTestForStudent(id)
      if (!test) {
        socket.emit("tf:error", "Test topilmadi.")
        return
      }
      const now = dayjs()
      if (!(now.isAfter(dayjs(test.startAt)) && now.isBefore(dayjs(test.endAt)))) {
        socket.emit("tf:error", "Test vaqti tugagan yoki hali boshlanmagan.")
        return
      }
      socket.emit("tf:test", test)
    } catch (e) {
      console.error("tf:get error", e)
      socket.emit("tf:error", "Testni olishda xatolik.")
    }
  })

  socket.on("tf:create", (input) => {
    try {
      if (!socket.data.isManagerAuthed) {
        socket.emit("tf:error", "Ruxsat yo'q. Avval parol bilan kiring.")
        return
      }
      const test = createTest({
        ...input,
        questions: input.questions.map((q) => ({
          ...q,
          id: q.id || uuid(),
        })),
      })
      socket.emit("tf:created", {
        id: test.id,
        title: test.title,
        description: test.description,
        groupIds: test.groupIds,
        telegramChatId: test.telegramChatId,
        startAt: test.startAt,
        endAt: test.endAt,
        createdAt: test.createdAt,
        updatedAt: test.updatedAt,
        questionsCount: test.questions.length,
      })
      socket.emit("tf:tests", listTests())
    } catch (e) {
      console.error("tf:create error", e)
      socket.emit("tf:error", "Test yaratishda xatolik.")
    }
  })

  socket.on("tf:update", (test) => {
    try {
      if (!socket.data.isManagerAuthed) {
        socket.emit("tf:error", "Ruxsat yo'q. Avval parol bilan kiring.")
        return
      }
      const updated = updateTest(test)
      socket.emit("tf:updated", {
        id: updated.id,
        title: updated.title,
        description: updated.description,
        groupIds: updated.groupIds,
        telegramChatId: updated.telegramChatId,
        startAt: updated.startAt,
        endAt: updated.endAt,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
        questionsCount: updated.questions.length,
      })
      socket.emit("tf:tests", listTests())
    } catch (e) {
      console.error("tf:update error", e)
      socket.emit("tf:error", "Testni yangilashda xatolik.")
    }
  })

  socket.on("tf:delete", ({ id }) => {
    try {
      if (!socket.data.isManagerAuthed) {
        socket.emit("tf:error", "Ruxsat yo'q. Avval parol bilan kiring.")
        return
      }
      const ok = deleteTest(id)
      if (!ok) {
        socket.emit("tf:error", "Test topilmadi.")
        return
      }
      socket.emit("tf:deleted", id)
      socket.emit("tf:tests", listTests())
    } catch (e) {
      console.error("tf:delete error", e)
      socket.emit("tf:error", "Testni o'chirishda xatolik.")
    }
  })

  socket.on("tf:results", ({ testId }) => {
    try {
      if (!socket.data.isManagerAuthed) {
        socket.emit("tf:error", "Ruxsat yo'q. Avval parol bilan kiring.")
        return
      }
      socket.emit("tf:results", getResults(testId))
    } catch (e) {
      console.error("tf:results error", e)
      socket.emit("tf:error", "Natijalarni olishda xatolik.")
    }
  })

  socket.on("tf:submit", ({ testId, studentUserId, studentName, groupId, answers, startedAt }) => {
    try {
      const test = getTest(testId)
      if (!test) {
        socket.emit("tf:error", "Test topilmadi.")
        return
      }

      const now = dayjs()
      if (!(now.isAfter(dayjs(test.startAt)) && now.isBefore(dayjs(test.endAt)))) {
        socket.emit("tf:error", "Test vaqti tugagan yoki hali boshlanmagan.")
        return
      }

      const { score, total } = gradeAttempt(test, answers)
      const attempt = appendResult({
        id: uuid(),
        testId,
        studentUserId,
        studentName,
        groupId,
        startedAt: startedAt || now.toISOString(),
        submittedAt: now.toISOString(),
        score,
        total,
        answers,
      })
      socket.emit("tf:submitted", attempt)

      // Telegram notifications (optional)
      const token = env.TELEGRAM_BOT_TOKEN
      if (token) {
        const map = readTelegramMap()
        const studentChatId = map.students[studentUserId]
        const groupChatId = test.telegramChatId || (groupId ? map.groups[groupId] : undefined)

        const text =
          `<b>True/False natija</b>\n` +
          `<b>Test:</b> ${escapeHtml(test.title)}\n` +
          `<b>O'quvchi:</b> ${escapeHtml(studentName)}\n` +
          `<b>Ball:</b> ${attempt.score}/${attempt.total}\n` +
          `<b>Vaqt:</b> ${escapeHtml(dayjs(attempt.submittedAt).format("DD.MM.YYYY HH:mm"))}`

        Promise.resolve()
          .then(async () => {
            if (studentChatId) {
              await sendTelegramMessage(token, studentChatId, text, {
                parseMode: "HTML",
                disableWebPagePreview: true,
              })
            } else {
              console.log(
                `Telegram student chatId missing for userId=${studentUserId} (config/truefalse/telegram.json students map)`
              )
            }
            if (groupChatId) {
              await sendTelegramMessage(token, groupChatId, text, {
                parseMode: "HTML",
                disableWebPagePreview: true,
              })
            } else if (test.telegramChatId) {
              console.log(
                `Telegram group chatId configured but empty for testId=${testId}`
              )
            } else if (groupId) {
              console.log(
                `Telegram group chatId missing for groupId=${groupId} (config/truefalse/telegram.json groups map)`
              )
            }
          })
          .catch((e) => console.error("Telegram notify failed:", e))
      }
    } catch (e) {
      console.error("tf:submit error", e)
      socket.emit("tf:error", "Javoblarni yuborishda xatolik.")
    }
  })

  socket.on("game:create", (quizzId) => {
    const quizzList = Config.quizz()
    const quizz = quizzList.find((q) => q.id === quizzId)

    if (!quizz) {
      socket.emit("game:errorMessage", "Test savollari topilmadi")

      return
    }

    const game = new Game(io, socket, quizz)
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
    withGame(gameId, socket, (game) => game.join(socket, data.username))
  )

  socket.on("manager:kickPlayer", ({ gameId, playerId }) =>
    withGame(gameId, socket, (game) => game.kickPlayer(socket, playerId))
  )

  socket.on("manager:startGame", ({ gameId }) =>
    withGame(gameId, socket, (game) => game.start(socket))
  )

  socket.on("player:selectedAnswer", ({ gameId, data }) =>
    withGame(gameId, socket, (game) =>
      game.selectAnswer(socket, data.answerKey)
    )
  )

  socket.on("manager:abortQuiz", ({ gameId }) =>
    withGame(gameId, socket, (game) => game.abortRound(socket))
  )

  socket.on("manager:nextQuestion", ({ gameId }) =>
    withGame(gameId, socket, (game) => game.nextRound(socket))
  )

  socket.on("manager:showLeaderboard", ({ gameId }) =>
    withGame(gameId, socket, (game) => game.showLeaderboard())
  )

  socket.on("disconnect", () => {
    console.log(`A user disconnected : ${socket.id}`)

    const managerGame = registry.getGameByManagerSocketId(socket.id)

    if (managerGame) {
      managerGame.manager.connected = false
      registry.markGameAsEmpty(managerGame)

      if (!managerGame.started) {
        // Allow the manager to refresh/reconnect without killing the room.
        // The cleanup task will remove abandoned games after a timeout.
        managerGame.abortCooldown()
        console.log(`Manager disconnected (room kept): ${managerGame.gameId}`)
        return
      }
    }

    const game = registry.getGameByPlayerSocketId(socket.id)

    if (!game) {
      return
    }

    const player = game.players.find((p) => p.id === socket.id)

    if (!player) {
      return
    }

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
