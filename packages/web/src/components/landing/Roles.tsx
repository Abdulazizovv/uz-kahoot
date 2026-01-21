import { motion } from "motion/react"

const roles = [
  {
    title: "Talabalar uchun",
    subtitle: "O'rganing, Raqobatlashing, G'olib Bo'ling",
    description:
      "Interaktiv testlar va o'yinlar orqali o'rganing. Real-time raqobat va leaderboard'da birinchi o'rinni egallang!",
    benefits: [
      {
        icon: "🎮",
        title: "Gamifikatsiya",
        desc: "Test o'yinlarida qatnashing",
      },
      {
        icon: "🏆",
        title: "Raqobat",
        desc: "Leaderboard'da birinchi bo'ling",
      },
      {
        icon: "🔬",
        title: "Virtual Lab",
        desc: "Tajribalarni online bajaring",
      },
      {
        icon: "📊",
        title: "Progress",
        desc: "O'z natijalaringizni kuzating",
      },
    ],
    icon: "👨‍🎓",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    stats: [
      { value: "Beta", label: "Test bosqichi" },
      { value: "Bepul", label: "Hozircha" },
    ],
    testimonial: {
      text: "EduArena bilan IT bilimlarni o'rganish juda qiziqarli! Test o'yinlari orqali dasturlashni o'rganish samarali.",
      author: "Aziza Karimova",
      role: "Dasturlash talabasi, TATU",
    },
  },
  {
    title: "O'qituvchilar uchun",
    subtitle: "Boshqaring, Tahlil Qiling, Rivojlantiring",
    description:
      "Darslarni osonlik bilan boshqaring. Test yarating, o'quvchilarni kuzating va chuqur analytics bilan takomillashtiring.",
    benefits: [
      {
        icon: "✏️",
        title: "Test Yaratish",
        desc: "Oson va tez test tuzish",
      },
      {
        icon: "📈",
        title: "Analytics",
        desc: "Chuqur tahlil va hisobotlar",
      },
      {
        icon: "👥",
        title: "Guruh Boshqaruvi",
        desc: "Talabalarni guruhlang",
      },
      {
        icon: "🎯",
        title: "Live Quiz",
        desc: "Real-time test o'tkazing",
      },
    ],
    icon: "👨‍🏫",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    stats: [
      { value: "Oson", label: "Test yaratish" },
      { value: "Tez", label: "Analytics" },
    ],
    testimonial: {
      text: "Platformada test yaratish va talabalarni kuzatish juda qulay. Vaqtimni tejaydi.",
      author: "Prof. Jahongir Usmonov",
      role: "Dasturlash o'qituvchisi, NUUz",
    },
  },
]

const Roles = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-blue-50 px-4 py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-2 text-sm font-semibold text-purple-700"
          >
            👥 Kimlar uchun?
          </motion.div>
          <h2 className="mb-6 text-5xl font-black text-gray-900 md:text-6xl">
            Har bir foydalanuvchi uchun
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Talabalar va o'qituvchilar uchun maxsus imkoniyatlar
          </p>
        </motion.div>

        <div className="space-y-24">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              className={`flex flex-col gap-12 lg:flex-row lg:items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Content */}
              <div className="flex-1 space-y-8">
                <div>
                  <motion.div
                    className={`mb-4 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${role.gradient} shadow-2xl`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-4xl">{role.icon}</span>
                  </motion.div>
                  <h3 className="mb-2 text-4xl font-black text-gray-900">
                    {role.title}
                  </h3>
                  <p
                    className={`mb-4 bg-gradient-to-r text-lg font-semibold ${role.gradient} bg-clip-text text-transparent`}
                  >
                    {role.subtitle}
                  </p>
                  <p className="text-lg leading-relaxed text-gray-600">
                    {role.description}
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {role.benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-lg transition-all hover:border-blue-300 hover:shadow-xl"
                    >
                      <div className="mb-2 text-3xl">{benefit.icon}</div>
                      <h4 className="mb-1 font-bold text-gray-900">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600">{benefit.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex gap-6">
                  {role.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="flex-1 rounded-xl bg-gradient-to-br from-gray-50 to-white p-4 text-center shadow-md"
                    >
                      <div
                        className={`bg-gradient-to-r text-3xl font-black ${role.gradient} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className={`rounded-2xl border-l-4 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg ${
                    index % 2 === 0 ? "border-blue-500" : "border-emerald-500"
                  }`}
                >
                  <p className="mb-4 text-gray-700 italic">
                    "{role.testimonial.text}"
                  </p>
                  <div>
                    <div className="font-bold text-gray-900">
                      {role.testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {role.testimonial.role}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Visual/Image Placeholder */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div
                  className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${role.gradient} p-12 shadow-2xl`}
                >
                  {/* Mockup Content */}
                  <div className="relative z-10 space-y-6">
                    <div className="rounded-2xl bg-white/20 p-6 backdrop-blur-sm">
                      <div className="mb-4 h-4 w-1/2 rounded bg-white/40"></div>
                      <div className="space-y-2">
                        <div className="h-3 w-full rounded bg-white/30"></div>
                        <div className="h-3 w-4/5 rounded bg-white/30"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-white/20 p-4 backdrop-blur-sm">
                        <div className="mb-2 h-3 w-3/4 rounded bg-white/40"></div>
                        <div className="h-6 w-1/2 rounded bg-white/50"></div>
                      </div>
                      <div className="rounded-xl bg-white/20 p-4 backdrop-blur-sm">
                        <div className="mb-2 h-3 w-3/4 rounded bg-white/40"></div>
                        <div className="h-6 w-1/2 rounded bg-white/50"></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Icons */}
                  <motion.div
                    className="absolute top-10 right-10 text-6xl opacity-20"
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {index === 0 ? "🎓" : "📚"}
                  </motion.div>
                  <motion.div
                    className="absolute bottom-10 left-10 text-5xl opacity-20"
                    animate={{
                      y: [0, 20, 0],
                      rotate: [0, -10, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {index === 0 ? "🏆" : "✍️"}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Roles
