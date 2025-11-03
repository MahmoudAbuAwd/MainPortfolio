import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mahmoud Portfolio',
  description: 'AI & ML Engineer Portfolio',
  generator: 'Mahmoud Portfolio',
  other: {
    'google-site-verification': 'wfNe4dC0_Gs0uv9mZErxak0e7SskKE1cCqMWudvcSC8',
}
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
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GGJLWFKNKW"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GGJLWFKNKW');
          `}
        </Script>
      </head>
      <body className="font-sans bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white">
        {children}
      </body>
    </html>
  )
}
