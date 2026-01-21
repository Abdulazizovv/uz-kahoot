"use client"

import ComingSoon from "@/components/ComingSoon"
import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"

const LabsPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-72 flex-1">
        <Header />
        <main className="p-8">
          <ComingSoon
            title="Test Amaliyoti"
            description="IT mavzulari bo'yicha amaliy test mashqlari tez orada qo'shiladi"
          />
        </main>
      </div>
    </div>
  )
}

export default LabsPage
