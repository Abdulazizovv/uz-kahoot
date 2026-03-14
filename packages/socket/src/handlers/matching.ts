import { Socket } from "@eduarena/common/types/game/socket"
import {
  appendMatchingResult,
  createMatchingTest,
  deleteMatchingTest,
  getMatchingResults,
  getMatchingTest,
  getMatchingTestForStudent,
  gradeMatchingAttempt,
  listAvailableMatchingTestsForStudent,
  listMatchingTests,
  updateMatchingTest,
} from "@eduarena/socket/services/matching-store"
import dayjs from "dayjs"
import { v7 as uuid } from "uuid"

export const registerMatchingHandlers = (socket: Socket) => {
  socket.on("match:list", (payload) => {
    try {
      if (payload.mode === "teacher") {
        if (!socket.data.isManagerAuthed) {
          socket.emit("match:error", "Ruxsat yo'q. Avval parol bilan kiring.")

          
return
        }

        socket.emit("match:tests", listMatchingTests())

        
return
      }

      socket.emit("match:tests", listAvailableMatchingTestsForStudent(payload.groupId))
    } catch (e) {
      console.error("match:list error", e)
      socket.emit("match:error", "Testlar ro'yxatini olishda xatolik.")
    }
  })

  socket.on("match:get", ({ id, mode }) => {
    try {
      if (mode === "teacher") {
        if (!socket.data.isManagerAuthed) {
          socket.emit("match:error", "Ruxsat yo'q. Avval parol bilan kiring.")

          
return
        }

        const test = getMatchingTest(id)

        if (!test) {
          socket.emit("match:error", "Test topilmadi.")

          
return
        }

        socket.emit("match:test", test)

        
return
      }

      const test = getMatchingTestForStudent(id)

      if (!test) {
        socket.emit("match:error", "Test topilmadi.")

        
return
      }

      const now = dayjs()

      if (!(now.isAfter(dayjs(test.startAt)) && now.isBefore(dayjs(test.endAt)))) {
        socket.emit("match:error", "Test vaqti tugagan yoki hali boshlanmagan.")

        
return
      }

      socket.emit("match:test", test)
    } catch (e) {
      console.error("match:get error", e)
      socket.emit("match:error", "Testni olishda xatolik.")
    }
  })

  socket.on("match:create", (input) => {
    try {
      if (!socket.data.isManagerAuthed) {
        socket.emit("match:error", "Ruxsat yo'q. Avval parol bilan kiring.")

        
return
      }

      const pairs = (input.pairs ?? [])
        .map((p) => ({
          id: p.id || uuid(),
          left: {
            id: p.left?.id || uuid(),
            text: p.left?.text?.trim() || undefined,
            image: p.left?.image?.trim() || undefined,
          },
          right: {
            id: p.right?.id || uuid(),
            text: p.right?.text?.trim() || undefined,
            image: p.right?.image?.trim() || undefined,
          },
        }))
        .filter((p) => Boolean(p.left.text || p.left.image) && Boolean(p.right.text || p.right.image))

      if (!input.title?.trim()) {
        socket.emit("match:error", "Sarlavha kiriting.")

        
return
      }

      if (!input.startAt || !input.endAt) {
        socket.emit("match:error", "Boshlanish va tugash vaqtini belgilang.")

        
return
      }

      if (!Array.isArray(input.groupIds) || input.groupIds.length === 0) {
        socket.emit("match:error", "Kamida bitta guruh tanlang.")

        
return
      }

      if (pairs.length === 0) {
        socket.emit("match:error", "Kamida bitta moslashtirish juftligini kiriting.")

        
return
      }

      const test = createMatchingTest({
        title: input.title.trim(),
        description: input.description?.trim() || undefined,
        groupIds: input.groupIds,
        startAt: input.startAt,
        endAt: input.endAt,
        pairs,
      })

      socket.emit("match:created", {
        id: test.id,
        title: test.title,
        description: test.description,
        groupIds: test.groupIds,
        startAt: test.startAt,
        endAt: test.endAt,
        createdAt: test.createdAt,
        updatedAt: test.updatedAt,
        pairsCount: test.pairs.length,
      })
      socket.emit("match:tests", listMatchingTests())
    } catch (e) {
      console.error("match:create error", e)
      socket.emit("match:error", "Test yaratishda xatolik.")
    }
  })

  socket.on("match:update", (test) => {
    try {
      if (!socket.data.isManagerAuthed) {
        socket.emit("match:error", "Ruxsat yo'q. Avval parol bilan kiring.")

        
return
      }

      const updated = updateMatchingTest(test)
      socket.emit("match:updated", {
        id: updated.id,
        title: updated.title,
        description: updated.description,
        groupIds: updated.groupIds,
        startAt: updated.startAt,
        endAt: updated.endAt,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
        pairsCount: updated.pairs.length,
      })
      socket.emit("match:tests", listMatchingTests())
    } catch (e) {
      console.error("match:update error", e)
      socket.emit("match:error", "Testni yangilashda xatolik.")
    }
  })

  socket.on("match:delete", ({ id }) => {
    try {
      if (!socket.data.isManagerAuthed) {
        socket.emit("match:error", "Ruxsat yo'q. Avval parol bilan kiring.")

        
return
      }

      const ok = deleteMatchingTest(id)

      if (!ok) {
        socket.emit("match:error", "Test topilmadi.")

        
return
      }

      socket.emit("match:deleted", id)
      socket.emit("match:tests", listMatchingTests())
    } catch (e) {
      console.error("match:delete error", e)
      socket.emit("match:error", "Testni o'chirishda xatolik.")
    }
  })

  socket.on("match:results", ({ testId }) => {
    try {
      if (!socket.data.isManagerAuthed) {
        socket.emit("match:error", "Ruxsat yo'q. Avval parol bilan kiring.")

        
return
      }

      socket.emit("match:results", getMatchingResults(testId))
    } catch (e) {
      console.error("match:results error", e)
      socket.emit("match:error", "Natijalarni olishda xatolik.")
    }
  })

  socket.on("match:submit", ({ testId, studentUserId, studentName, groupId, answers, startedAt }) => {
    try {
      const test = getMatchingTest(testId)

      if (!test) {
        socket.emit("match:error", "Test topilmadi.")

        
return
      }

      const now = dayjs()

      if (!(now.isAfter(dayjs(test.startAt)) && now.isBefore(dayjs(test.endAt)))) {
        socket.emit("match:error", "Test vaqti tugagan yoki hali boshlanmagan.")

        
return
      }

      const { score, total } = gradeMatchingAttempt(test, answers)
      const attempt = appendMatchingResult({
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
      socket.emit("match:submitted", attempt)
    } catch (e) {
      console.error("match:submit error", e)
      socket.emit("match:error", "Javoblarni yuborishda xatolik.")
    }
  })
}

