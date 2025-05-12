import type React from "react"
import type { Metadata } from "next"
import { Inter, Audiowide } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" })
const audiowide = Audiowide({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-audiowide" })

export const metadata: Metadata = {
  title: "GameFlow | Organize the game. Unleash the emotion.",
  description:
    "The digital platform that transforms how sports courts are managed, bringing people together through play.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${audiowide.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
