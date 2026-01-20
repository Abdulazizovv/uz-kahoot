"use client"

import { useAuthStore } from "@/stores/auth"
import { motion } from "motion/react"
import Link from "next/link"

const Hero = () => {
  const { isAuthenticated, user } = useAuthStore()

  const getDashboardUrl = () => {
    if (!user) return "/auth"
    return user.user_type === "student"
      ? "/student/dashboard"
      : "/teacher/dashboard"
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-900 to-purple-950">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <motion.div
          className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/4 -right-40 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-pink-500/30 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Hero Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-6 py-2 backdrop-blur-sm"
        >
          <span className="text-2xl">🎓</span>
          <span className="text-sm font-semibold text-blue-300">
            O'zbekiston Universitetlari uchun #1 Platforma
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="mb-6 text-7xl leading-tight font-black text-white md:text-9xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block"
            >
              Edu
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Arena
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300 md:text-2xl"
          >
            🚀 Ta'limni gamifikatsiya qiling! Interaktiv testlar, real-time
            raqobat va zamonaviy o'qitish vositalari bilan talabalaringizni
            ilhomlantiring.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          {isAuthenticated ? (
            <Link
              href={getDashboardUrl()}
              className="group relative transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              <span className="relative z-10">Dashboard'ga o'tish</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
            </Link>
          ) : (
            <Link
              href="/auth"
              className="group relative transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              <span className="relative z-10">Boshlash</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
            </Link>
          )}
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
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="group rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 backdrop-blur-md transition-all"
          >
            <div className="mb-3 text-5xl">🎮</div>
            <div className="mb-2 text-5xl font-black text-white group-hover:text-blue-400 transition-colors">Live</div>
            <div className="text-lg text-gray-300">Real-time Testlar</div>
            <div className="mt-2 text-sm text-blue-300">Kahoot uslubida</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="group rounded-2xl border border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 backdrop-blur-md transition-all"
          >
            <div className="mb-3 text-5xl">🔬</div>
            <div className="mb-2 text-5xl font-black text-white group-hover:text-purple-400 transition-colors">14+</div>
            <div className="text-lg text-gray-300">Laboratoriyalar</div>
            <div className="mt-2 text-sm text-purple-300">Fizika fanlari</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="group rounded-2xl border border-pink-400/20 bg-gradient-to-br from-pink-500/10 to-orange-500/10 p-8 backdrop-blur-md transition-all"
          >
            <div className="mb-3 text-5xl">☁️</div>
            <div className="mb-2 text-5xl font-black text-white group-hover:text-pink-400 transition-colors">24/7</div>
            <div className="text-lg text-gray-300">Cloud Access</div>
            <div className="mt-2 text-sm text-pink-300">Har qanday joydan</div>
          </motion.div>
        </motion.div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-10 text-6xl"
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
            📖
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-20 text-5xl"
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
            🔬
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 left-1/4 text-5xl"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💡
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
