export type TrueFalseQuestion = {
  id: string
  statement: string
  image?: string
  correct: boolean
}

export type TrueFalseTest = {
  id: string
  title: string
  description?: string
  groupIds: string[]
  // Optional: Pre-configured group chat to notify
  telegramChatId?: string
  // ISO datetime
  startAt: string
  // ISO datetime
  endAt: string
  // ISO datetime
  createdAt: string
  // ISO datetime
  updatedAt: string
  questions: TrueFalseQuestion[]
}

export type TrueFalseTestSummary = Pick<
  TrueFalseTest,
  | "id"
  | "title"
  | "description"
  | "groupIds"
  | "telegramChatId"
  | "startAt"
  | "endAt"
  | "createdAt"
  | "updatedAt"
> & {
  questionsCount: number
}

export type TrueFalseTestForStudent = Omit<TrueFalseTest, "questions"> & {
  questions: Array<Omit<TrueFalseQuestion, "correct">>
}

export type TrueFalseAttemptAnswer = {
  questionId: string
  answer: boolean
}

export type TrueFalseAttempt = {
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
  answers: TrueFalseAttemptAnswer[]
}

export type TrueFalseResultsFile = {
  testId: string
  // ISO datetime
  updatedAt: string
  attempts: TrueFalseAttempt[]
}
