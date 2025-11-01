import type React from "react"
// In app/layout.tsx

import type { Metadata } from "next"
import { Orbitron } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers" // We will create this next
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { validateEnvironmentVariables, EnvValidationErrorOverlay } from "@/lib/env-validator"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "Apex AI - One AI. Infinite Possibilities.",
  description: "Your private, intelligent companion.",
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const validation = validateEnvironmentVariables()

  if (!validation.isValid) {
    return (
      <html lang="en">
        <body className={orbitron.variable}>
          <EnvValidationErrorOverlay missingVars={validation.missingVars} />
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className={orbitron.variable}>
        <Providers>{children}</Providers>
        <Analytics />
        <Script
          src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
