"use client"

import StudentHeader from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"

export default function StudentLabsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <StudentSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <StudentHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}

