import { KahootSessionResult } from "@eduarena/common/types/kahoot-results"
import fs from "fs"
import { resolve } from "path"

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

const resultsDir = () => getPath("kahoot/results")

export const initKahootResultsStore = () => {
  ensureDir(getPath("kahoot"))
  ensureDir(resultsDir())
}

const sessionFile = (sessionId: string) => resolve(resultsDir(), `${sessionId}.json`)

export const saveKahootSessionResult = (result: KahootSessionResult) => {
  initKahootResultsStore()
  writeJsonAtomic(sessionFile(result.sessionId), result)
}

export const listKahootSessionIds = (): string[] => {
  initKahootResultsStore()

  return fs
    .readdirSync(resultsDir())
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\\.json$/u, ""))
}

export const getKahootSessionResult = (sessionId: string): KahootSessionResult | null => {
  initKahootResultsStore()
  const path = sessionFile(sessionId)

  if (!fs.existsSync(path)) {
    return null
  }

  try {
    return JSON.parse(fs.readFileSync(path, "utf-8")) as KahootSessionResult
  } catch {
    return null
  }
}
