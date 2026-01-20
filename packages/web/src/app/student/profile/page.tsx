import ComingSoon from "@/components/ComingSoon"
import StudentHeader from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"

export default function StudentProfilePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <StudentSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <StudentHeader />
        <main className="flex-1 overflow-y-auto">
          <ComingSoon
            title="Shaxsiy Profil"
            description="Shaxsiy ma'lumotlaringizni boshqarish va sozlash tizimi ishlab chiqilmoqda"
            icon="👤"
            estimatedDate="2026 yil Fevral"
            features={[
              "Shaxsiy ma'lumotlarni ko'rish va tahrirlash",
              "Profil rasmini yuklash va o'zgartirish",
              "Parolni o'zgartirish xavfsizlik bilan",
              "Email va telefon raqamini yangilash",
              "Guruh va fakultet ma'lumotlari",
              "Bildirishnoma sozlamalari",
              "Til va mavzu (dark/light mode) sozlamalari",
              "Shaxsiy statistika va yutuqlar",
              "Faollik tarixi va login loglar",
              "Profilni boshqa foydalanuvchilarga ko'rsatish sozlamalari",
            ]}
          />
        </main>
      </div>
    </div>
  )
}
