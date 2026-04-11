"use client"

import Features from "@/components/landing/Features"
import Footer from "@/components/landing/Footer"
import Hero from "@/components/landing/Hero"
import LandingNav from "@/components/landing/LandingNav"
import Research from "@/components/landing/Research"
import Roles from "@/components/landing/Roles"
import TechBackdrop from "@/components/tech/TechBackdrop"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#070A12] text-white">
      <TechBackdrop intensity="soft" />
      <LandingNav />
      <Hero />
      <Features />
      <Research />
      <Roles />
      <Footer />
    </main>
  )
}
