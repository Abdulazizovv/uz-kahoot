import { motion } from "motion/react"

const features = [
  {
    title: "Interaktiv Testlar",
    description:
      "Turli xil test turlari bilan darslarni qiziqarli qiling. Real-time o'yinlar va avtomatik baholash tizimi.",
    icon: "🎯",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Fizik Simulyatorlar",
    description:
      "Laboratoriya tajribalarini virtual muhitda amalga oshiring. 3D simulyatorlar bilan xavfsiz o'rganish.",
    icon: "🔬",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Dars Materiallari",
    description:
      "Video, PDF va interaktiv materiallar bilan to'liq dars paketlari. Cloud storage bilan har qachon mavjud.",
    icon: "📚",
    color: "from-green-500 to-teal-500",
  },
  {
    title: "Analytics va Hisobot",
    description:
      "O'quvchilarning natijalarini chuqur tahlil qiling. Progress tracking va individual yondashuv.",
    icon: "📊",
    color: "from-orange-500 to-red-500",
  },
]

const Features = () => {
  return (
    <section id="features" className="bg-gray-50 px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Kuchli Imkoniyatlar
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            EduArena zamonaviy ta'lim texnologiyalarini bir joyga to'plagan
            platformadir
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group transform rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-gray-200 hover:shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className={`h-16 w-16 rounded-lg bg-gradient-to-r ${feature.color} mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
              >
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
