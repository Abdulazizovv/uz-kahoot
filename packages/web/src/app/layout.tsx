import Toaster from "@/components/Toaster"
import { SocketProvider } from "@/contexts/socketProvider"
import { AuthProvider } from "@/stores/auth"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { PropsWithChildren } from "react"
import "./globals.css"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "EduArena - Universitet Ta'lim Platformasi",
  description:
    "Interaktiv testlar, fizik simulyatorlar va dars materiallari bilan zamonaviy ta'lim. O'quvchilar va o'qituvchilar uchun.",
  keywords: "ta'lim, universitet, testlar, simulyatorlar, o'yinlar",
  authors: [{ name: "EduArena Team" }],
  icons: "/icon.svg",
}

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en" suppressHydrationWarning={true} data-lt-installed="true">
    <body className={`${montserrat.variable} bg-secondary antialiased`}>
      <AuthProvider>
        <SocketProvider>
          <main className="text-base-[8px] flex flex-col">{children}</main>
          <Toaster />
        </SocketProvider>
      </AuthProvider>
    </body>
  </html>
)

export default RootLayout
