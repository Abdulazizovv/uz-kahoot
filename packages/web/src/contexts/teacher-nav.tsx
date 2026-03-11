"use client"

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react"

type TeacherNavContextValue = {
  isSidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
}

const TeacherNavContext = createContext<TeacherNavContextValue | null>(null)

export function TeacherNavProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openSidebar = useCallback(() => setIsSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])
  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((v) => !v),
    [],
  )

  useEffect(() => {
    if (!isSidebarOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isSidebarOpen])

  const value = useMemo<TeacherNavContextValue>(
    () => ({
      isSidebarOpen,
      openSidebar,
      closeSidebar,
      toggleSidebar,
    }),
    [isSidebarOpen, openSidebar, closeSidebar, toggleSidebar],
  )

  return <TeacherNavContext.Provider value={value}>{children}</TeacherNavContext.Provider>
}

export function useTeacherNav() {
  const ctx = useContext(TeacherNavContext)
  if (!ctx) {
    throw new Error("useTeacherNav must be used within TeacherNavProvider")
  }
  return ctx
}
