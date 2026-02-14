import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { BackgroundWrapper } from '@/components/background-wrapper'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'FarmaciaYA - Encontrá productos y farmacias cerca tuyo',
  description: 'Catálogo digital de productos farmacéuticos y red de farmacias. Encontrá lo que necesitás, rápido.',
  generator: 'v0.app',
  keywords: ['farmacia', 'medicamentos', 'productos', 'salud', 'farmacias cercanas', 'catálogo farmacéutico'],
  openGraph: {
    title: 'FarmaciaYA - Encontrá productos y farmacias cerca tuyo',
    description: 'Catálogo digital de productos farmacéuticos y red de farmacias.',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#0C95AD',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundWrapper />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
