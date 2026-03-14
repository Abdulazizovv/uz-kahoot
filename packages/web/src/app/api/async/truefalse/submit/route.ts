import { NextRequest, NextResponse } from "next/server"
import { v7 as uuid } from "uuid"
import {
  appendResult,
  getTest,
  gradeAttempt,
  readTelegramMap,
} from "@/server/async/truefalse-store"
import { escapeHtml } from "@/server/async/html"
import { sendTelegramMessage } from "@/server/async/telegram"

export const runtime = "nodejs"

export const POST = async (req: NextRequest) => {
  const payload = (await req.json()) as {
    testId: string
    studentUserId: string
    studentName: string
    groupId?: string
    answers: Array<{ questionId: string; answer: boolean }>
    startedAt?: string
  }

  const test = getTest(payload.testId)
  if (!test) return NextResponse.json({ error: "Test topilmadi" }, { status: 404 })

  const nowMs = Date.now()
  if (nowMs < new Date(test.startAt).getTime() || nowMs > new Date(test.endAt).getTime()) {
    return NextResponse.json({ error: "Test vaqti tugagan yoki hali boshlanmagan" }, { status: 400 })
  }
  const nowIso = new Date().toISOString()

  const { score, total } = gradeAttempt(test, payload.answers)
  const attempt = appendResult({
    id: uuid(),
    testId: payload.testId,
    studentUserId: payload.studentUserId,
    studentName: payload.studentName,
    groupId: payload.groupId,
    startedAt: payload.startedAt || nowIso,
    submittedAt: nowIso,
    score,
    total,
    answers: payload.answers,
  })

  const token = process.env.TELEGRAM_BOT_TOKEN
  if (token) {
    try {
      const map = readTelegramMap()
      const studentChatId = map.students[payload.studentUserId]
      const groupChatId =
        test.telegramChatId || (payload.groupId ? map.groups[payload.groupId] : undefined)

      const text =
        `<b>True/False natija</b>\n` +
        `<b>Test:</b> ${escapeHtml(test.title)}\n` +
        `<b>O'quvchi:</b> ${escapeHtml(payload.studentName)}\n` +
        `<b>Ball:</b> ${attempt.score}/${attempt.total}\n` +
        `<b>Vaqt:</b> ${escapeHtml(new Date(attempt.submittedAt).toLocaleString())}`

      if (studentChatId) {
        await sendTelegramMessage(token, studentChatId, text, {
          parseMode: "HTML",
          disableWebPagePreview: true,
        })
      }
      if (groupChatId) {
        await sendTelegramMessage(token, groupChatId, text, {
          parseMode: "HTML",
          disableWebPagePreview: true,
        })
      }
    } catch (e) {
      console.error("Telegram notify failed:", e)
    }
  }

  return NextResponse.json(attempt, { status: 201 })
}
