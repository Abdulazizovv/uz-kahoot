export type QuizKind = "truefalse" | "matching" | "kahoot"

export type QuizAttemptSummary = {
  kind: QuizKind
  testId: string
  title: string
  studentUserId?: string
  studentName: string
  groupId?: string
  score: number
  total: number
  startedAt: string
  submittedAt: string
}

export type GroupQuizStats = {
  groupId: string
  // ISO date (inclusive)
  from?: string
  // ISO date (inclusive)
  to?: string
  attempts: number
  uniqueStudents: number
  avgScorePct: number
  byKind: Record<QuizKind, { attempts: number; avgScorePct: number }>
  tests: Array<{
    kind: QuizKind
    testId: string
    title: string
    attempts: number
    uniqueStudents: number
    avgScorePct: number
  }>
  topStudents: Array<{
    studentUserId?: string
    studentName: string
    attempts: number
    avgScorePct: number
    bestScorePct: number
  }>
  recentAttempts: QuizAttemptSummary[]
}

export type QuizTestStats = {
  kind: QuizKind
  testId: string
  title: string
  attempts: number
  uniqueStudents: number
  avgScorePct: number
  bestScorePct: number
  worstScorePct: number
  recentAttempts: QuizAttemptSummary[]
  // Optional, for question/pair-level correctness
  itemStats?: Array<{
    id: string
    label: string
    correctPct: number
  }>
}
