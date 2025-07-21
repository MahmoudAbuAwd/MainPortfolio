import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mahmoud Portfolio',
  description: 'AI & ML Engineer Portfolio',
  generator: 'Mahmoud Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon links */}
        <link rel="icon" href="/certs/ai.png" type="/certs/ai.png" />
        {/* For Apple devices */}
        <link rel="apple-touch-icon" href="/certs/ai.png" />
      </head>
      <body className="font-sans bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white">
        {children}
      </body>
    </html>
  )
}