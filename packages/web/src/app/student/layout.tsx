"use client"

import ProtectedRoute from "@/components/ProtectedRoute"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedUserTypes={["student"]}>{children}</ProtectedRoute>
  )
}
