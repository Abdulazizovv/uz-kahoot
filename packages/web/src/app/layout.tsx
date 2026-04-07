import Toaster from "@/components/Toaster"
import type { Metadata } from "next"
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

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="uz" suppressHydrationWarning={true}>
    <body className="bg-secondary font-sans antialiased">
      <main className="text-base-[8px] flex flex-col">{children}</main>
      <Toaster />
    </body>
  </html>
)

export default RootLayout
