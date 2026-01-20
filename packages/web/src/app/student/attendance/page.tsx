import ComingSoon from "@/components/ComingSoon"
import StudentHeader from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"

export default function StudentAttendancePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <StudentSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <StudentHeader />
        <main className="flex-1 overflow-y-auto">
          <ComingSoon
            title="Davomat Tizimi"
            description="Darslar va laboratoriyalardagi davomatni kuzatish tizimi ishlab chiqilmoqda"
            icon="📅"
            estimatedDate="2026 yil Fevral"
            features={[
              "Barcha darslar bo'yicha davomat ko'rsatkichlari",
              "Har bir fan uchun alohida statistika",
              "Sababli va sababsiz qoldirish ko'rsatkichlari",
              "Davomat grafiklari va tahlil",
              "QR kod orqali davomat belgilash",
              "Push bildirishnomalar va eslatmalar",
              "Oylik va semestr bo'yicha hisobotlar",
              "Davomat foizi va reyting",
              "Bugungi darslar jadvali",
              "Avtomatik davomat belgilash integratsiyasi",
            ]}
          />
        </main>
      </div>
    </div>
  )
}
