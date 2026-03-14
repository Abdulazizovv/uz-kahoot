export type MatchingSide = {
  id: string
  text?: string
  image?: string
}

export type MatchingPair = {
  id: string
  left: MatchingSide
  right: MatchingSide
}

export type MatchingTest = {
  id: string
  title: string
  description?: string
  groupIds: string[]
  // ISO datetime
  startAt: string
  // ISO datetime
  endAt: string
  // ISO datetime
  createdAt: string
  // ISO datetime
  updatedAt: string
  pairs: MatchingPair[]
}

export type MatchingTestSummary = Pick<
  MatchingTest,
  "id" | "title" | "description" | "groupIds" | "startAt" | "endAt" | "createdAt" | "updatedAt"
> & {
  pairsCount: number
}

export type MatchingTestForStudent = Omit<MatchingTest, "pairs"> & {
  leftItems: MatchingSide[]
  rightOptions: MatchingSide[]
}

export type MatchingAttemptAnswer = {
  leftId: string
  rightId: string | null
}

export type MatchingAttempt = {
  id: string
  testId: string
  studentUserId: string
  studentName: string
  groupId?: string
  // ISO datetime
  startedAt: string
  // ISO datetime
  submittedAt: string
  score: number
  total: number
  answers: MatchingAttemptAnswer[]
}

export type MatchingResultsFile = {
  testId: string
  // ISO datetime
  updatedAt: string
  attempts: MatchingAttempt[]
}
