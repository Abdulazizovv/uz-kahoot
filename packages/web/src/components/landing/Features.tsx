import { motion } from "motion/react"

const features = [
  {
    title: "🎮 Gamifikatsiya",
    description:
      "Kahoot uslubidagi real-time testlar! Talabalar bir vaqtda raqobatlashadi, leaderboard'da o'z o'rinlarini ko'radilar.",
    icon: "🏆",
    color: "from-amber-500 via-orange-500 to-red-500",
    benefits: ["Live quiz", "Leaderboard", "Ball tizimi", "Yutuqlar"],
    image: "🎯",
  },
  {
    title: "🔬 Virtual Laboratoriya",
    description:
      "Fizika tajribalarini xavfsiz va interaktiv muhitda o'tkazing. 3D simulyatorlar va real vaqt kalkulyatorlari.",
    icon: "⚗️",
    color: "from-cyan-500 via-blue-500 to-indigo-500",
    benefits: ["3D simulyatorlar", "Real kalkulyatorlar", "Step-by-step guide", "Video qo'llanmalar"],
    image: "🧪",
  },
  {
    title: "📊 Analytics Dashboard",
    description:
      "O'quvchilar progressini chuqur tahlil qiling. Kuchli va zaif tomonlarni aniqlang, individual yondashuv qo'llang.",
    icon: "📈",
    color: "from-emerald-500 via-teal-500 to-cyan-500",
    benefits: ["Progress tracking", "Tahlil va hisobotlar", "Individual statistika", "Export PDF"],
    image: "📉",
  },
  {
    title: "☁️ Cloud Storage",
    description:
      "Barcha dars materiallari, video darslar va PDF fayllar bir joyda. Istalgan vaqt va joydan kirish imkoniyati.",
    icon: "💾",
    color: "from-purple-500 via-pink-500 to-rose-500",
    benefits: ["Video darslar", "PDF materiallar", "Rasm galereya", "Cheksiz saqlash"],
    image: "📱",
  },
]

const Features = () => {
  return (
    <section id="features" className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 px-4 py-32 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

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
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-2 text-sm font-semibold text-blue-700"
          >
            ✨ Imkoniyatlar
          </motion.div>
          <h2 className="mb-6 text-5xl font-black text-gray-900 md:text-6xl">
            Nima uchun{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduArena
            </span>
            ?
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Zamonaviy texnologiyalar va pedagogika metodlarini birlashtirgan
            to'liq platformasi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative overflow-hidden rounded-3xl border-2 border-gray-200 bg-white p-8 shadow-xl transition-all duration-500 hover:border-transparent hover:shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
              ></div>

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className={`mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-4xl">{feature.icon}</span>
                </motion.div>

                {/* Title */}
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mb-6 leading-relaxed text-gray-600">
                  {feature.description}
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-3">
                  {feature.benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700"
                    >
                      <span className="text-green-500">✓</span>
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Image */}
                <motion.div
                  className="absolute -bottom-4 -right-4 text-8xl opacity-10"
                  animate={{
                    rotate: [0, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {feature.image}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="mx-auto max-w-3xl rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-12">
            <h3 className="mb-4 text-3xl font-bold text-gray-900">
              Hoziroq boshlang! 🚀
            </h3>
            <p className="mb-8 text-lg text-gray-600">
              Beta test bosqichida bepul foydalaning. Birinchilar qatoridan bo'ling!
            </p>
            <motion.a
              href="/auth"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
            >
              Bepul boshlash
              <span>→</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}

export default Features
