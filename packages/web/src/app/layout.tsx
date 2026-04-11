import Toaster from "@/components/Toaster"
import type { Metadata } from "next"
import { JetBrains_Mono, Space_Grotesk } from "next/font/google"
import { PropsWithChildren } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "EduArena - Universitet Ta'lim Platformasi",
  description:
    "Interaktiv testlar, IT postlar va dars materiallari bilan zamonaviy ta'lim. O'quvchilar va o'qituvchilar uchun.",
  keywords: "ta'lim, universitet, testlar, IT, postlar, o'yinlar",
  authors: [{ name: "EduArena Team" }],
  icons: "/icon.svg",
}

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="uz" suppressHydrationWarning={true}>
    <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} bg-secondary antialiased`}>
      <main className="flex min-h-screen flex-col text-base">{children}</main>
      <Toaster />
    </body>
  </html>
)

export default RootLayout
