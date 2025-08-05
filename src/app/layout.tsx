import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-inter'
})

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-plus-jakarta-sans'
})

export const metadata: Metadata = {
  title: 'Buzzberry - AI Search Platform',
  description: 'A powerful AI search platform for discovering and organizing content',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${plusJakartaSans.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}