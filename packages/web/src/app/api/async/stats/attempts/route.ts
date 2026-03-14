import { NextRequest, NextResponse } from "next/server"
import { requireTeacher } from "@/app/api/async/_auth"
import {
  getResults as getTrueFalseResults,
  getTest as getTrueFalseTest,
} from "@/server/async/truefalse-store"
import { getMatchingResults, getMatchingTest } from "@/server/async/matching-store"
import { getKahootSessionResult } from "@/server/async/kahoot-results-store"
import { QuizAttemptSummary, QuizKind } from "@eduarena/common/types/stats"

export const runtime = "nodejs"

const parseRange = (from?: string, to?: string) => {
  const fromD = from ? new Date(from) : null
  const toD = to ? new Date(to) : null
  if (fromD) fromD.setHours(0, 0, 0, 0)
  if (toD) toD.setHours(23, 59, 59, 999)
  return {
    fromMs: fromD ? fromD.getTime() : null,
    toMs: toD ? toD.getTime() : null,
  }
}

const withinRange = (iso: string, fromMs: number | null, toMs: number | null) => {
  const ms = new Date(iso).getTime()
  if (fromMs !== null && ms < fromMs) return false
  if (toMs !== null && ms > toMs) return false
  return true
}

const attemptToSummary = (
  kind: QuizKind,
  title: string,
  a: {
    testId: string
    studentUserId?: string
    studentName: string
    groupId?: string
    score: number
    total: number
    startedAt: string
    submittedAt: string
  },
): QuizAttemptSummary => ({
  kind,
  testId: a.testId,
  title,
  studentUserId: a.studentUserId,
  studentName: a.studentName,
  groupId: a.groupId,
  score: a.score,
  total: a.total,
  startedAt: a.startedAt,
  submittedAt: a.submittedAt,
})

export const GET = (req: NextRequest) => {
  const auth = requireTeacher(req)
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const kind = searchParams.get("kind") as QuizKind | null
  const testId = searchParams.get("testId")
  const groupId = searchParams.get("groupId") ?? undefined
  const from = searchParams.get("from") ?? undefined
  const to = searchParams.get("to") ?? undefined
  const limitRaw = searchParams.get("limit")
  const offsetRaw = searchParams.get("offset")

  if (!kind || !testId) {
    return NextResponse.json({ error: "kind va testId kerak" }, { status: 400 })
  }

  const limit = Math.max(1, Math.min(500, Number(limitRaw ?? 100) || 100))
  const offset = Math.max(0, Number(offsetRaw ?? 0) || 0)
  const { fromMs, toMs } = parseRange(from, to)

  let items: QuizAttemptSummary[] = []

  if (kind === "truefalse") {
    const test = getTrueFalseTest(testId)
    if (!test) return NextResponse.json({ error: "Test topilmadi" }, { status: 404 })
    items = getTrueFalseResults(testId)
      .filter((a) => (groupId ? a.groupId === groupId : true))
      .filter((a) => withinRange(a.submittedAt, fromMs, toMs))
      .map((a) => attemptToSummary("truefalse", test.title, a))
  } else if (kind === "matching") {
    const test = getMatchingTest(testId)
    if (!test) return NextResponse.json({ error: "Test topilmadi" }, { status: 404 })
    items = getMatchingResults(testId)
      .filter((a) => (groupId ? a.groupId === groupId : true))
      .filter((a) => withinRange(a.submittedAt, fromMs, toMs))
      .map((a) => attemptToSummary("matching", test.title, a))
  } else if (kind === "kahoot") {
    const session = getKahootSessionResult(testId)
    if (!session) return NextResponse.json({ error: "Sessiya topilmadi" }, { status: 404 })
    if (!withinRange(session.finishedAt, fromMs, toMs)) {
      items = []
    } else {
      const maxPoints = Math.max(
        1,
        ...session.players.map((p) => (Number.isFinite(p.points) ? p.points : 0)),
      )
      items = session.players
        .filter((p) => (groupId ? p.groupId === groupId : true))
        .map((p) =>
          attemptToSummary("kahoot", `${session.subject} (Kahoot)`, {
            testId: session.sessionId,
            studentUserId: p.studentUserId,
            studentName: p.studentName,
            groupId: p.groupId,
            score: p.points,
            total: maxPoints,
            startedAt: session.createdAt,
            submittedAt: session.finishedAt,
          }),
        )
    }
  } else {
    return NextResponse.json({ error: "kind noto'g'ri" }, { status: 400 })
  }

  items.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  )

  const total = items.length
  const paged = items.slice(offset, offset + limit)

  return NextResponse.json({
    kind,
    testId,
    groupId,
    from,
    to,
    total,
    offset,
    limit,
    items: paged,
  })
}

