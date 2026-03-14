import {
  MatchingAttempt,
  MatchingResultsFile,
  MatchingTest,
  MatchingTestForStudent,
  MatchingTestSummary,
} from "@eduarena/common/types/matching"
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

const testsDir = () => getPath("matching/tests")
const resultsDir = () => getPath("matching/results")

export const initMatchingStore = () => {
  ensureDir(getPath("matching"))
  ensureDir(testsDir())
  ensureDir(resultsDir())
}

const testFile = (id: string) => resolve(testsDir(), `${id}.json`)
const resultsFile = (testId: string) => resolve(resultsDir(), `${testId}.json`)

const toSummary = (test: MatchingTest): MatchingTestSummary => ({
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

export const listMatchingTests = (): MatchingTestSummary[] => {
  initMatchingStore()
  const files = fs.readdirSync(testsDir()).filter((f) => f.endsWith(".json"))

  const tests = files
    .map((file) => {
      try {
        const data = fs.readFileSync(resolve(testsDir(), file), "utf-8")
        const parsed = JSON.parse(data) as MatchingTest

        
return toSummary(parsed)
      } catch {
        return null
      }
    })
    .filter(Boolean) as MatchingTestSummary[]

  return tests.sort((a, b) => dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf())
}

export const getMatchingTest = (id: string): MatchingTest | null => {
  initMatchingStore()
  const path = testFile(id)

  if (!fs.existsSync(path)) {return null}

  try {
    const data = fs.readFileSync(path, "utf-8")

    
return JSON.parse(data) as MatchingTest
  } catch {
    return null
  }
}

const shuffle = <T,>(arr: T[]): T[] => {
  const next = [...arr]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }

  
return next
}

export const getMatchingTestForStudent = (id: string): MatchingTestForStudent | null => {
  const test = getMatchingTest(id)

  if (!test) {return null}

  const leftItems = test.pairs.map((p) => p.left)
  const rightOptions = shuffle(test.pairs.map((p) => p.right))

  return {
    id: test.id,
    title: test.title,
    description: test.description,
    groupIds: test.groupIds,
    startAt: test.startAt,
    endAt: test.endAt,
    createdAt: test.createdAt,
    updatedAt: test.updatedAt,
    leftItems,
    rightOptions,
  }
}

export const createMatchingTest = (
  input: Omit<MatchingTest, "id" | "createdAt" | "updatedAt">,
): MatchingTest => {
  initMatchingStore()
  const now = dayjs().toISOString()
  const id = uuid()
  const test: MatchingTest = {
    ...input,
    id,
    createdAt: now,
    updatedAt: now,
  }
  writeJsonAtomic(testFile(id), test)

  
return test
}

export const updateMatchingTest = (test: MatchingTest): MatchingTest => {
  initMatchingStore()
  const now = dayjs().toISOString()
  const updated: MatchingTest = { ...test, updatedAt: now }
  writeJsonAtomic(testFile(test.id), updated)

  
return updated
}

export const deleteMatchingTest = (id: string): boolean => {
  initMatchingStore()
  const path = testFile(id)

  if (!fs.existsSync(path)) {return false}

  fs.unlinkSync(path)

  
return true
}

export const listAvailableMatchingTestsForStudent = (groupId?: string): MatchingTestSummary[] => {
  const now = dayjs()

  
return listMatchingTests().filter((t) => {
    const within = now.isAfter(dayjs(t.startAt)) && now.isBefore(dayjs(t.endAt))

    if (!within) {return false}

    if (!groupId) {return true}
    
return t.groupIds.includes(groupId)
  })
}

export const getMatchingResults = (testId: string): MatchingAttempt[] => {
  initMatchingStore()
  const path = resultsFile(testId)

  if (!fs.existsSync(path)) {return []}

  try {
    const data = fs.readFileSync(path, "utf-8")
    const parsed = JSON.parse(data) as MatchingResultsFile

    
return parsed.attempts ?? []
  } catch {
    return []
  }
}

export const appendMatchingResult = (attempt: MatchingAttempt): MatchingAttempt => {
  initMatchingStore()
  const path = resultsFile(attempt.testId)
  const now = dayjs().toISOString()

  const current: MatchingResultsFile = fs.existsSync(path)
    ? (() => {
        try {
          return JSON.parse(fs.readFileSync(path, "utf-8")) as MatchingResultsFile
        } catch {
          return { testId: attempt.testId, updatedAt: now, attempts: [] }
        }
      })()
    : { testId: attempt.testId, updatedAt: now, attempts: [] }

  const next: MatchingResultsFile = {
    testId: attempt.testId,
    updatedAt: now,
    attempts: [attempt, ...(current.attempts ?? [])],
  }

  writeJsonAtomic(path, next)

  
return attempt
}

export const gradeMatchingAttempt = (
  test: MatchingTest,
  answers: Array<{ leftId: string; rightId: string | null }>,
) => {
  const answerMap = new Map(answers.map((a) => [a.leftId, a.rightId]))
  let score = 0
  for (const p of test.pairs) {
    if (answerMap.get(p.left.id) === p.right.id) {score += 1}
  }

  
return { score, total: test.pairs.length }
}

