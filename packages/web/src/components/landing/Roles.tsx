import { motion } from "motion/react"

const roles = [
  {
    title: "O'quvchi",
    description:
      "O'yinlar orqali o'rganing, testlarni yeching, simulyatorlarda tajriba qiling.",
    benefits: [
      "Interaktiv o'rganish",
      "Real-time leaderboard",
      "Progress tracking",
    ],
    icon: "🎓",
    stats: "85% o'quvchilar natijasi yaxshilandi",
  },
  {
    title: "O'qituvchi",
    description:
      "Darslarni boshqaring, testlar yarating, o'quvchilarni kuzating.",
    benefits: ["Test yaratish", "Analytics", "Sinfi boshqarish"],
    icon: "👨‍🏫",
    stats: "50+ o'qituvchi foydalanmoqda",
  },
]

const Roles = () => {
  return (
    <section className="bg-white px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Platforma Foydalanuvchilari
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            EduArena har bir foydalanuvchi uchun maxsus imkoniyatlar taqdim
            etadi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 flex items-center">
                <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                  <span className="text-2xl">{role.icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {role.title}
                  </h3>
                  <p className="font-medium text-blue-600">{role.stats}</p>
                </div>
              </div>

              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                {role.description}
              </p>

              <div className="space-y-3">
                {role.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center">
                    <div className="mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
                      <span className="text-xs text-white">✓</span>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Roles
