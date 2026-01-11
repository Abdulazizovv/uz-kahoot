"use client"

import Features from "@eduarena/web/components/landing/Features"
import Footer from "@eduarena/web/components/landing/Footer"
import Hero from "@eduarena/web/components/landing/Hero"
import Roles from "@eduarena/web/components/landing/Roles"

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
