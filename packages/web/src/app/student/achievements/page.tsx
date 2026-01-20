import ComingSoon from "@/components/ComingSoon"
import StudentHeader from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"

export default function StudentAchievementsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <StudentSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <StudentHeader />
        <main className="flex-1 overflow-y-auto">
          <ComingSoon
            title="Yutuqlar va Medallar"
            description="O'qish jarayonidagi yutuqlaringizni kuzatish va rag'batlantirish tizimi ishlab chiqilmoqda"
            icon="🏆"
            estimatedDate="2026 yil Mart"
            features={[
              "Turli kategoriyalardagi yutuqlar va medallar",
              "Progressiv yutuqlar tizimi (bronza, kumush, oltin)",
              "Test o'yinlarida g'oliblik yutuqlari",
              "Laboratoriyalarni o'z vaqtida tugatish yutuqlari",
              "Izchillik va faollik yutuqlari",
              "Maxsus hodisa yutuqlari (Challenge events)",
              "Yutuqlar tarixi va sanasi",
              "Har bir yutuq uchun virtual badge",
              "Do'stlar bilan yutuqlarni baham ko'rish",
              "Reytingda yuqori o'rinlar uchun maxsus unvonlar",
              "Yutuqlar uchun ball to'plash tizimi",
            ]}
          />
        </main>
      </div>
    </div>
  )
}
