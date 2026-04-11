"use client"

import AuthForm from "@/components/auth/AuthForm"
import AuthNav from "@/components/auth/AuthNav"
import { LoadingScreen } from "@/components/LoadingScreen"
import TechBackdrop from "@/components/tech/TechBackdrop"
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

/**
 * Authentication Page
 * Handles login/signup with proper hydration and redirect flow
 */
const AuthPage = () => {
  const { isAuthenticated, user, isHydrated } = useAuthStore()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const hasRedirectedRef = useRef(false)

  useEffect(() => {
    // Wait for hydration to complete before any auth checks
    if (!isHydrated) return

    // Prevent multiple redirect attempts
    if (hasRedirectedRef.current) return

    // Redirect authenticated users to their dashboard
    if (isAuthenticated && user) {
      hasRedirectedRef.current = true
      setIsRedirecting(true)

      const redirectUrl =
        user.user_type === "student"
          ? "/student/dashboard"
          : "/teacher/dashboard"

      // Use router.replace() to avoid adding to history stack
      router.replace(redirectUrl)
    }

    // Cleanup function to reset redirect flag if component unmounts
    return () => {
      hasRedirectedRef.current = false
    }
  }, [isHydrated, isAuthenticated, user, router])

  // Show loading screen while waiting for hydration
  if (!isHydrated) {
    return <LoadingScreen message="Yuklanmoqda..." />
  }

  // Show redirecting state for authenticated users
  if (isRedirecting || (isAuthenticated && user)) {
    return <LoadingScreen message="Yo'naltirilmoqda..." />
  }

  // Show auth form for unauthenticated users
  return (
    <div className="relative min-h-screen bg-[#070A12] text-white">
      <TechBackdrop intensity="strong" />
      <AuthNav />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
            Student ro&apos;yxatdan o&apos;tadi · Teacher oldindan
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Kirish va ro&apos;yxatdan o&apos;tish
            <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-emerald-200 bg-clip-text text-transparent">
              IT kontent + mini quiz
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            Bu prototipda backend integratsiyasiz soddalashtirilgan auth ishlaydi:
            studentlar ro&apos;yxatdan o&apos;tadi, ma&apos;lumotlar localStorage&apos;da
            saqlanadi. Magistratura dissertatsiyasi uchun UX tezligi va
            kontent oqimi ko&apos;rsatkichlari muhim.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              {
                t: "Student signup",
                d: "Ism, familya, login (auto) va parol.",
              },
              {
                t: "Login",
                d: "Login/parol orqali tizimga kirish.",
              },
              {
                t: "IT postlar",
                d: "Chuqur mazmun + kod + resurslar.",
              },
              {
                t: "Mini quiz",
                d: "Har post oxirida tez tekshiruv.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="glow-ring rounded-3xl border border-white/10 bg-slate-950/45 p-5 backdrop-blur"
              >
                <div className="text-sm font-bold text-white/90">{x.t}</div>
                <div className="mt-1 text-sm text-white/70">{x.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
