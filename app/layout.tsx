import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "@/components/Providers"
import RootLayoutClient from "@/components/RootLayoutClient"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Voiceflow - AI-Powered Voice Agent Bookings",
  description:
    "Voiceflow specializes in AI-powered voice agent bookings for salons, beauty shops, and aesthetic clinics.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <RootLayoutClient>
            {children}
          </RootLayoutClient>
        </Providers>
      </body>
    </html>
  )
}
