import { Socket } from "@eduarena/common/types/game/socket"
import env from "@eduarena/socket/env"
import {
  appendResult,
  createTest,
  deleteTest,
  getResults,
  getTest,
  getTestForStudent,
  gradeAttempt,
  listAvailableTestsForStudent,
  listTests,
  readTelegramMap,
  updateTest,
} from "@eduarena/socket/services/truefalse-store"
import { sendTelegramMessage } from "@eduarena/socket/services/telegram"
import dayjs from "dayjs"
import { v7 as uuid } from "uuid"

export const registerTrueFalseHandlers = (
  socket: Socket,
  deps: { escapeHtml: (_value: string) => string },
) => {
  const { escapeHtml } = deps

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

  socket.on(
    "tf:submit",
    ({ testId, studentUserId, studentName, groupId, answers, startedAt }) => {
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

        const token = env.TELEGRAM_BOT_TOKEN

        if (!token) {
          return
        }

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
                `Telegram student chatId missing for userId=${studentUserId} (config/truefalse/telegram.json students map)`,
              )
            }

            if (groupChatId) {
              await sendTelegramMessage(token, groupChatId, text, {
                parseMode: "HTML",
                disableWebPagePreview: true,
              })
            } else if (test.telegramChatId) {
              console.log(`Telegram group chatId configured but empty for testId=${testId}`)
            } else if (groupId) {
              console.log(
                `Telegram group chatId missing for groupId=${groupId} (config/truefalse/telegram.json groups map)`,
              )
            }
          })
          .catch((e) => console.error("Telegram notify failed:", e))
      } catch (e) {
        console.error("tf:submit error", e)
        socket.emit("tf:error", "Javoblarni yuborishda xatolik.")
      }
    },
  )
}
