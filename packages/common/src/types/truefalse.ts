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
  telegramChatId?: string // optional: pre-configured group chat to notify
  startAt: string // ISO datetime
  endAt: string // ISO datetime
  createdAt: string // ISO datetime
  updatedAt: string // ISO datetime
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
  startedAt: string // ISO datetime
  submittedAt: string // ISO datetime
  score: number
  total: number
  answers: TrueFalseAttemptAnswer[]
}

export type TrueFalseResultsFile = {
  testId: string
  updatedAt: string // ISO datetime
  attempts: TrueFalseAttempt[]
}
