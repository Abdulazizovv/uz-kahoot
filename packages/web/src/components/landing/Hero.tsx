import { motion } from "motion/react"
import Link from "next/link"

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 h-72 w-72 animate-pulse rounded-full bg-blue-500 mix-blend-multiply blur-xl filter"></div>
        <div className="animation-delay-2000 absolute top-40 right-10 h-72 w-72 animate-pulse rounded-full bg-purple-500 mix-blend-multiply blur-xl filter"></div>
        <div className="animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 animate-pulse rounded-full bg-pink-500 mix-blend-multiply blur-xl filter"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="mb-6 text-6xl leading-tight font-bold text-white md:text-8xl">
            Edu
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Arena
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300 md:text-2xl">
            Universitet ta'limini yangi bosqichga olib chiqing. Interaktiv
            testlar, fizik simulyatorlar va zamonaviy dars materiallari bilan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <Link
            href="/auth"
            className="group relative transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10">Boshlash</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
          </Link>
          <Link
            href="#features"
            className="rounded-lg border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:border-white/50 hover:bg-white/10"
          >
            Batafsil ma'lumot
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3"
        >
          <div className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <div className="mb-2 text-3xl font-bold text-white">1000+</div>
            <div className="text-gray-300">Faol foydalanuvchi</div>
          </div>
          <div className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <div className="mb-2 text-3xl font-bold text-white">500+</div>
            <div className="text-gray-300">O'tkazilgan test</div>
          </div>
          <div className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <div className="mb-2 text-3xl font-bold text-white">50+</div>
            <div className="text-gray-300">Universitet hamkor</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
