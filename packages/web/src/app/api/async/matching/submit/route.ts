import { NextRequest, NextResponse } from "next/server"
import { v7 as uuid } from "uuid"
import {
  appendMatchingResult,
  getMatchingTest,
  gradeMatchingAttempt,
} from "@/server/async/matching-store"

export const runtime = "nodejs"

export const POST = async (req: NextRequest) => {
  const payload = (await req.json()) as {
    testId: string
    studentUserId: string
    studentName: string
    groupId?: string
    answers: Array<{ leftId: string; rightId: string | null }>
    startedAt?: string
  }

  const test = getMatchingTest(payload.testId)
  if (!test) return NextResponse.json({ error: "Test topilmadi" }, { status: 404 })

  const nowMs = Date.now()
  if (nowMs < new Date(test.startAt).getTime() || nowMs > new Date(test.endAt).getTime()) {
    return NextResponse.json({ error: "Test vaqti tugagan yoki hali boshlanmagan" }, { status: 400 })
  }
  const nowIso = new Date().toISOString()

  const { score, total } = gradeMatchingAttempt(test, payload.answers)
  const attempt = appendMatchingResult({
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

  return NextResponse.json(attempt, { status: 201 })
}
