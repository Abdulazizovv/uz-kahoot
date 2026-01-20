"use client"

import Features from "@/components/landing/Features"
import Footer from "@/components/landing/Footer"
import Hero from "@/components/landing/Hero"
import Roles from "@/components/landing/Roles"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Hero />
      <Features />
      <Roles />
      <Footer />
    </main>
  )
}
