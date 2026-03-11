"use client"

import ProtectedRoute from "@/components/ProtectedRoute"
import { StudentNavProvider } from "@/contexts/student-nav"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedUserTypes={["student"]}>
      <StudentNavProvider>{children}</StudentNavProvider>
    </ProtectedRoute>
  )
}
