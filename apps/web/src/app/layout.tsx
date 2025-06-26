import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recipe Roulette',
  description: 'A gamified cooking application that helps users discover recipes based on available ingredients',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}