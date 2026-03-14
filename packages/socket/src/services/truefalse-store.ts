import {
  TrueFalseAttempt,
  TrueFalseResultsFile,
  TrueFalseTest,
  TrueFalseTestForStudent,
  TrueFalseTestSummary,
} from "@eduarena/common/types/truefalse"
import dayjs from "dayjs"
import fs from "fs"
import { resolve } from "path"
import { v7 as uuid } from "uuid"

const inContainerPath = process.env.CONFIG_PATH

const getPath = (path: string = "") =>
  inContainerPath ? resolve(inContainerPath, path) : resolve(process.cwd(), "../../config", path)

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

const writeJsonAtomic = (filePath: string, data: unknown) => {
  const tmpPath = `${filePath}.tmp`
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2))
  fs.renameSync(tmpPath, filePath)
}

const testsDir = () => getPath("truefalse/tests")
const resultsDir = () => getPath("truefalse/results")
const telegramFile = () => getPath("truefalse/telegram.json")

export const initTrueFalseStore = () => {
  ensureDir(getPath("truefalse"))
  ensureDir(testsDir())
  ensureDir(resultsDir())

  if (!fs.existsSync(telegramFile())) {
    writeJsonAtomic(telegramFile(), {
      groups: {},
      students: {},
    })
  }
}

const testFile = (id: string) => resolve(testsDir(), `${id}.json`)
const resultsFile = (testId: string) => resolve(resultsDir(), `${testId}.json`)

const toSummary = (test: TrueFalseTest): TrueFalseTestSummary => ({
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

export const listTests = (): TrueFalseTestSummary[] => {
  initTrueFalseStore()
  const files = fs.readdirSync(testsDir()).filter((f) => f.endsWith(".json"))

  const tests = files
    .map((file) => {
      try {
        const data = fs.readFileSync(resolve(testsDir(), file), "utf-8")
        const parsed = JSON.parse(data) as TrueFalseTest

        
return toSummary(parsed)
      } catch {
        return null
      }
    })
    .filter(Boolean) as TrueFalseTestSummary[]

  return tests.sort((a, b) => dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf())
}

export const getTest = (id: string): TrueFalseTest | null => {
  initTrueFalseStore()
  const path = testFile(id)

  if (!fs.existsSync(path)) {
    return null
  }

  try {
    const data = fs.readFileSync(path, "utf-8")

    
return JSON.parse(data) as TrueFalseTest
  } catch {
    return null
  }
}

export const getTestForStudent = (id: string): TrueFalseTestForStudent | null => {
  const test = getTest(id)

  if (!test) {
    return null
  }

  return {
    ...test,
    questions: test.questions.map(({ correct: _correct, ...q }) => q),
  }
}

export const createTest = (
  input: Omit<TrueFalseTest, "id" | "createdAt" | "updatedAt">,
): TrueFalseTest => {
  initTrueFalseStore()
  const now = dayjs().toISOString()
  const id = uuid()
  const test: TrueFalseTest = {
    ...input,
    id,
    createdAt: now,
    updatedAt: now,
  }
  writeJsonAtomic(testFile(id), test)

  
return test
}

export const updateTest = (test: TrueFalseTest): TrueFalseTest => {
  initTrueFalseStore()
  const now = dayjs().toISOString()
  const updated: TrueFalseTest = { ...test, updatedAt: now }
  writeJsonAtomic(testFile(test.id), updated)

  
return updated
}

export const deleteTest = (id: string): boolean => {
  initTrueFalseStore()
  const path = testFile(id)

  if (!fs.existsSync(path)) {return false}

  fs.unlinkSync(path)

  
return true
}

export const listAvailableTestsForStudent = (groupId?: string): TrueFalseTestSummary[] => {
  const now = dayjs()

  
return listTests().filter((t) => {
    const within = now.isAfter(dayjs(t.startAt)) && now.isBefore(dayjs(t.endAt))

    if (!within) {return false}

    if (!groupId) {return true}
    
return t.groupIds.includes(groupId)
  })
}

export const getResults = (testId: string): TrueFalseAttempt[] => {
  initTrueFalseStore()
  const path = resultsFile(testId)

  if (!fs.existsSync(path)) {return []}

  try {
    const data = fs.readFileSync(path, "utf-8")
    const parsed = JSON.parse(data) as TrueFalseResultsFile

    
return parsed.attempts ?? []
  } catch {
    return []
  }
}

export const appendResult = (attempt: TrueFalseAttempt): TrueFalseAttempt => {
  initTrueFalseStore()
  const path = resultsFile(attempt.testId)
  const now = dayjs().toISOString()

  const current: TrueFalseResultsFile = fs.existsSync(path)
    ? (() => {
        try {
          return JSON.parse(fs.readFileSync(path, "utf-8")) as TrueFalseResultsFile
        } catch {
          return { testId: attempt.testId, updatedAt: now, attempts: [] }
        }
      })()
    : { testId: attempt.testId, updatedAt: now, attempts: [] }

  const next: TrueFalseResultsFile = {
    testId: attempt.testId,
    updatedAt: now,
    attempts: [attempt, ...(current.attempts ?? [])],
  }

  writeJsonAtomic(path, next)

  
return attempt
}

export const gradeAttempt = (test: TrueFalseTest, answers: Array<{ questionId: string; answer: boolean }>) => {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.answer]))
  let score = 0
  for (const q of test.questions) {
    const a = answerMap.get(q.id)

    if (a === q.correct) {score += 1}
  }

  
return { score, total: test.questions.length }
}

export const readTelegramMap = (): { groups: Record<string, string>; students: Record<string, string> } => {
  initTrueFalseStore()

  try {
    const data = fs.readFileSync(telegramFile(), "utf-8")
    const parsed = JSON.parse(data) as { groups?: Record<string, string>; students?: Record<string, string> }

    
return { groups: parsed.groups ?? {}, students: parsed.students ?? {} }
  } catch {
    return { groups: {}, students: {} }
  }
}
