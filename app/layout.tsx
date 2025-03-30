import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimationProvider } from "@/contexts/animation-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "GitHub Portfolio",
  description: "A showcase of my GitHub projects",
  icons: {
    icon: "/user.png",
    apple: "/user.png",
    shortcut: "/user.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AnimationProvider>{children}</AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'