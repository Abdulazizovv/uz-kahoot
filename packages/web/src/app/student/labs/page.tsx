"use client"

import ComingSoon from "@/components/ComingSoon"
import StudentHeader from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"

export default function StudentLabsPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <StudentSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <StudentHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <ComingSoon
            title="Test Amaliyoti"
            description="IT mavzulari bo'yicha amaliy test mashqlari tez orada qo'shiladi"
          />
        </main>
      </div>
    </div>
  )
}
