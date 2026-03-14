import { resolve } from "path"

export const getConfigPath = (path: string = "") => {
  const inContainerPath = process.env.CONFIG_PATH
  if (inContainerPath) {
    return resolve(inContainerPath, path)
  }

  // Dev: Next runs from `packages/web`, config is at repo root.
  return resolve(process.cwd(), "../../config", path)
}

