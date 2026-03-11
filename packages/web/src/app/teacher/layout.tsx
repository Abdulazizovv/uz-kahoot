"use client"

import ProtectedRoute from "@/components/ProtectedRoute"
import { TeacherNavProvider } from "@/contexts/teacher-nav"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedUserTypes={["teacher"]}>
      <TeacherNavProvider>{children}</TeacherNavProvider>
    </ProtectedRoute>
  )
}
