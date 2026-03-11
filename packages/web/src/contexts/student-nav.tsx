"use client"

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react"

type StudentNavContextValue = {
  isSidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
}

const StudentNavContext = createContext<StudentNavContextValue | null>(null)

export function StudentNavProvider({ children }: { children: ReactNode }) {
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

  const value = useMemo<StudentNavContextValue>(
    () => ({
      isSidebarOpen,
      openSidebar,
      closeSidebar,
      toggleSidebar,
    }),
    [isSidebarOpen, openSidebar, closeSidebar, toggleSidebar],
  )

  return <StudentNavContext.Provider value={value}>{children}</StudentNavContext.Provider>
}

export function useStudentNav() {
  const ctx = useContext(StudentNavContext)
  if (!ctx) {
    throw new Error("useStudentNav must be used within StudentNavProvider")
  }
  return ctx
}
