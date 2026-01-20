import ComingSoon from "@/components/ComingSoon"
import StudentHeader from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"

export default function StudentResultsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <StudentSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <StudentHeader />
        <main className="flex-1 overflow-y-auto">
          <ComingSoon
            title="Natijalar va Statistika"
            description="Barcha testlar va laboratoriyalar bo'yicha batafsil natijalar tizimi ishlab chiqilmoqda"
            icon="📈"
            estimatedDate="2026 yil Fevral"
            features={[
              "Barcha testlar bo'yicha natijalar tarixi",
              "Har bir test uchun batafsil tahlil",
              "Grafik ko'rinishdagi progress ko'rsatkichlari",
              "Mavzular bo'yicha kuchli va zaif tomonlar tahlili",
              "Guruh va kurs bo'yicha reyting",
              "Vaqt bo'yicha taqqoslash (haftalik, oylik, semestr)",
              "Har bir savol uchun to'g'ri/noto'g'ri javoblar tahlili",
              "O'rtacha ball dinamikasi grafigi",
              "PDF formatda hisobotlarni yuklab olish",
              "Eng yaxshi natijalar va rekordlar",
            ]}
          />
        </main>
      </div>
    </div>
  )
}
