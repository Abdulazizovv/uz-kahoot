import { QuizAttemptSummary, QuizKind, QuizTestStats, GroupQuizStats } from "@eduarena/common/types/stats"
import {
  getKahootSessionResult,
  listKahootSessionIds,
} from "@/server/async/kahoot-results-store"
import {
  getResults as getTrueFalseResults,
  getTest as getTrueFalseTest,
  listTests as listTrueFalseTests,
} from "@/server/async/truefalse-store"
import {
  getMatchingResults,
  getMatchingTest,
  listMatchingTests,
} from "@/server/async/matching-store"

const clampPct = (value: number) => Math.max(0, Math.min(100, value))
const round1 = (n: number) => Math.round(n * 10) / 10

const studentKey = (a: { studentUserId?: string; studentName: string }) =>
  a.studentUserId ? `id:${a.studentUserId}` : `name:${a.studentName}`

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

const withinRange = (
  iso: string,
  fromMs: number | null,
  toMs: number | null,
) => {
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

export const computeGroupStats = (payload: {
  groupId: string
  from?: string
  to?: string
}): GroupQuizStats => {
  const { groupId, from, to } = payload
  const { fromMs, toMs } = parseRange(from, to)

  const byKind: GroupQuizStats["byKind"] = {
    truefalse: { attempts: 0, avgScorePct: 0 },
    matching: { attempts: 0, avgScorePct: 0 },
    kahoot: { attempts: 0, avgScorePct: 0 },
  }

  const summaries: QuizAttemptSummary[] = []

  const tfIndex = new Map(listTrueFalseTests().map((t) => [t.id, t.title]))
  for (const [testId, title] of tfIndex.entries()) {
    const attempts = getTrueFalseResults(testId)
      .filter((a) => a.groupId === groupId)
      .filter((a) => withinRange(a.submittedAt, fromMs, toMs))
      .map((a) => attemptToSummary("truefalse", title, a))
    summaries.push(...attempts)
  }

  const matchIndex = new Map(listMatchingTests().map((t) => [t.id, t.title]))
  for (const [testId, title] of matchIndex.entries()) {
    const attempts = getMatchingResults(testId)
      .filter((a) => a.groupId === groupId)
      .filter((a) => withinRange(a.submittedAt, fromMs, toMs))
      .map((a) => attemptToSummary("matching", title, a))
    summaries.push(...attempts)
  }

  for (const sessionId of listKahootSessionIds()) {
    const session = getKahootSessionResult(sessionId)
    if (!session) continue
    if (!withinRange(session.finishedAt, fromMs, toMs)) continue

    const maxPoints = Math.max(
      1,
      ...session.players.map((p) => (Number.isFinite(p.points) ? p.points : 0)),
    )

    for (const p of session.players) {
      if (!p.groupId || p.groupId !== groupId) continue
      summaries.push(
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
  }

  const attempts = summaries.length
  const studentSet = new Set(summaries.map((s) => studentKey(s)))
  const avgScorePct =
    attempts === 0
      ? 0
      : clampPct(
          summaries.reduce(
            (acc, s) => acc + (s.total ? (s.score / s.total) * 100 : 0),
            0,
          ) / attempts,
        )

  for (const kind of ["truefalse", "matching", "kahoot"] as const) {
    const list = summaries.filter((s) => s.kind === kind)
    byKind[kind] = {
      attempts: list.length,
      avgScorePct:
        list.length === 0
          ? 0
          : clampPct(
              list.reduce(
                (acc, s) => acc + (s.total ? (s.score / s.total) * 100 : 0),
                0,
              ) / list.length,
            ),
    }
  }

  const testsMap = new Map<
    string,
    GroupQuizStats["tests"][number] & { studentKeys: Set<string> }
  >()
  for (const s of summaries) {
    const key = `${s.kind}:${s.testId}`
    const existing = testsMap.get(key) ?? {
      kind: s.kind,
      testId: s.testId,
      title: s.title,
      attempts: 0,
      uniqueStudents: 0,
      avgScorePct: 0,
      studentKeys: new Set<string>(),
    }
    existing.attempts += 1
    existing.studentKeys.add(studentKey(s))
    existing.avgScorePct += s.total ? (s.score / s.total) * 100 : 0
    testsMap.set(key, existing)
  }

  const tests = [...testsMap.values()]
    .map(({ studentKeys, ...t }) => ({
      ...t,
      uniqueStudents: studentKeys.size,
      avgScorePct: t.attempts ? clampPct(t.avgScorePct / t.attempts) : 0,
    }))
    .sort((a, b) => b.attempts - a.attempts)

  const studentsMap = new Map<
    string,
    {
      studentUserId?: string
      studentName: string
      attempts: number
      sumPct: number
      bestPct: number
    }
  >()

  for (const s of summaries) {
    const key = studentKey(s)
    const pct = s.total ? (s.score / s.total) * 100 : 0
    const existing = studentsMap.get(key) ?? {
      studentUserId: s.studentUserId,
      studentName: s.studentName,
      attempts: 0,
      sumPct: 0,
      bestPct: 0,
    }
    existing.attempts += 1
    existing.sumPct += pct
    existing.bestPct = Math.max(existing.bestPct, pct)
    studentsMap.set(key, existing)
  }

  const topStudents = [...studentsMap.values()]
    .map((s) => ({
      studentUserId: s.studentUserId,
      studentName: s.studentName,
      attempts: s.attempts,
      avgScorePct: s.attempts ? clampPct(s.sumPct / s.attempts) : 0,
      bestScorePct: clampPct(s.bestPct),
    }))
    .sort((a, b) => b.avgScorePct - a.avgScorePct || b.attempts - a.attempts)
    .slice(0, 10)

  const recentAttempts = [...summaries]
    .sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
    )
    .slice(0, 20)

  return {
    groupId,
    from,
    to,
    attempts,
    uniqueStudents: studentSet.size,
    avgScorePct: round1(avgScorePct),
    byKind: {
      truefalse: {
        attempts: byKind.truefalse.attempts,
        avgScorePct: round1(byKind.truefalse.avgScorePct),
      },
      matching: {
        attempts: byKind.matching.attempts,
        avgScorePct: round1(byKind.matching.avgScorePct),
      },
      kahoot: {
        attempts: byKind.kahoot.attempts,
        avgScorePct: round1(byKind.kahoot.avgScorePct),
      },
    },
    tests: tests.map((t) => ({ ...t, avgScorePct: round1(t.avgScorePct) })),
    topStudents: topStudents.map((s) => ({
      ...s,
      avgScorePct: round1(s.avgScorePct),
      bestScorePct: round1(s.bestScorePct),
    })),
    recentAttempts,
  }
}

export const computeTestStats = (payload: {
  kind: QuizKind
  testId: string
}): QuizTestStats | null => {
  const { kind, testId } = payload

  if (kind === "truefalse") {
    const test = getTrueFalseTest(testId)
    if (!test) return null
    const attempts = getTrueFalseResults(testId)
    const summaries = attempts.map((a) => attemptToSummary("truefalse", test.title, a))

    const itemStats = test.questions.map((q) => {
      let correct = 0
      let total = 0
      for (const a of attempts) {
        const found = a.answers.find((x) => x.questionId === q.id)
        if (!found) continue
        total += 1
        if (found.answer === q.correct) correct += 1
      }
      return {
        id: q.id,
        label: q.statement,
        correctPct: total ? clampPct((correct / total) * 100) : 0,
      }
    })

    const pcts = attempts.map((a) => (a.total ? (a.score / a.total) * 100 : 0))
    const avg = pcts.length ? clampPct(pcts.reduce((acc, x) => acc + x, 0) / pcts.length) : 0
    const best = pcts.length ? Math.max(...pcts) : 0
    const worst = pcts.length ? Math.min(...pcts) : 0

    const recentAttempts = summaries
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      .slice(0, 20)

    return {
      kind,
      testId,
      title: test.title,
      attempts: attempts.length,
      uniqueStudents: new Set(summaries.map((s) => studentKey(s))).size,
      avgScorePct: round1(avg),
      bestScorePct: round1(clampPct(best)),
      worstScorePct: round1(clampPct(worst)),
      recentAttempts,
      itemStats: itemStats.map((i) => ({ ...i, correctPct: round1(i.correctPct) })),
    }
  }

  if (kind === "matching") {
    const test = getMatchingTest(testId)
    if (!test) return null
    const attempts = getMatchingResults(testId)
    const summaries = attempts.map((a) => attemptToSummary("matching", test.title, a))

    const mapping = new Map(test.pairs.map((p) => [p.left.id, p.right.id]))
    const itemStats = test.pairs.map((p) => {
      let correct = 0
      let total = 0
      for (const a of attempts) {
        const found = a.answers.find((x) => x.leftId === p.left.id)
        if (!found) continue
        total += 1
        if (found.rightId && found.rightId === mapping.get(p.left.id)) correct += 1
      }
      return {
        id: p.left.id,
        label: p.left.text || p.left.image || "Item",
        correctPct: total ? clampPct((correct / total) * 100) : 0,
      }
    })

    const pcts = attempts.map((a) => (a.total ? (a.score / a.total) * 100 : 0))
    const avg = pcts.length ? clampPct(pcts.reduce((acc, x) => acc + x, 0) / pcts.length) : 0
    const best = pcts.length ? Math.max(...pcts) : 0
    const worst = pcts.length ? Math.min(...pcts) : 0

    const recentAttempts = summaries
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      .slice(0, 20)

    return {
      kind,
      testId,
      title: test.title,
      attempts: attempts.length,
      uniqueStudents: new Set(summaries.map((s) => studentKey(s))).size,
      avgScorePct: round1(avg),
      bestScorePct: round1(clampPct(best)),
      worstScorePct: round1(clampPct(worst)),
      recentAttempts,
      itemStats: itemStats.map((i) => ({ ...i, correctPct: round1(i.correctPct) })),
    }
  }

  if (kind === "kahoot") {
    const session = getKahootSessionResult(testId)
    if (!session) return null

    const maxPoints = Math.max(
      1,
      ...session.players.map((p) => (Number.isFinite(p.points) ? p.points : 0)),
    )

    const summaries = session.players.map((p) =>
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

    const pcts = summaries.map((s) => (s.total ? (s.score / s.total) * 100 : 0))
    const avg = pcts.length ? clampPct(pcts.reduce((acc, x) => acc + x, 0) / pcts.length) : 0
    const best = pcts.length ? Math.max(...pcts) : 0
    const worst = pcts.length ? Math.min(...pcts) : 0

    return {
      kind,
      testId: session.sessionId,
      title: `${session.subject} (Kahoot)`,
      attempts: summaries.length,
      uniqueStudents: new Set(summaries.map((s) => studentKey(s))).size,
      avgScorePct: round1(avg),
      bestScorePct: round1(clampPct(best)),
      worstScorePct: round1(clampPct(worst)),
      recentAttempts: summaries.slice(0, 20),
    }
  }

  return null
}
