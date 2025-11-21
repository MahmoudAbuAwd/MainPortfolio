import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { Libre_Baskerville, Plus_Jakarta_Sans } from 'next/font/google'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://abuawd.online'

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

const fontSerif = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mahmoud AbuAwd',
  url: siteUrl,
  image: `${siteUrl}/imggg.png`,
  jobTitle: 'AI & Machine Learning Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Mahmoud AbuAwd — AI Engineer',
  },
  sameAs: [
    'https://github.com/MahmoudAbuAwd',
    'https://www.linkedin.com/in/mahmoud-abuawd-247290225/',
    'https://twitter.com/s9mod',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Amman',
    addressCountry: 'JO',
  },
  alumniOf: 'Al-Balqa Applied University',
  description:
    'AI & ML engineer crafting intelligent products, specializing in deep learning, NLP, MLOps, and generative AI solutions.',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mahmoud AbuAwd | AI Engineer Portfolio',
    template: '%s | Mahmoud AbuAwd',
  },
  description:
    'Explore Mahmoud AbuAwd’s AI engineering portfolio featuring machine learning, deep learning, NLP, MLOps, and generative AI work.',
  keywords: [
    'Mahmoud AbuAwd',
    'AI Engineer',
    'Machine Learning Portfolio',
    'Deep Learning',
    'MLOps',
    'Generative AI',
    'Artificial Intelligence Projects',
  ],
  authors: [{ name: 'Mahmoud AbuAwd', url: siteUrl }],
  creator: 'Mahmoud AbuAwd',
  publisher: 'Mahmoud AbuAwd',
  applicationName: 'Mahmoud AbuAwd Portfolio',
  category: 'technology',
  generator: 'Next.js',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: siteUrl,
    title: 'Mahmoud AbuAwd | AI Engineer Portfolio',
    description:
      'AI engineer showcasing projects in machine learning, deep learning, NLP, MLOps, and generative AI.',
    siteName: 'Mahmoud AbuAwd Portfolio',
    images: [
      {
        url: '/imggg.png',
        width: 1200,
        height: 630,
        alt: 'Preview of Mahmoud AbuAwd AI Engineer Portfolio',
      },
    ],
    profile: {
      firstName: 'Mahmoud',
      lastName: 'AbuAwd',
      username: 'MahmoudAbuAwd',
    },
  },
  twitter: {
    card: 'summary_large_image',
    site: '@s9mod',
    creator: '@s9mod',
    title: 'Mahmoud AbuAwd | AI Engineer Portfolio',
    description:
      'Discover AI and ML projects, case studies, and experience from Mahmoud AbuAwd.',
    images: ['/imggg.png'],
  },
  icons: {
    icon: '/certs/ai.png',
    apple: '/certs/ai.png',
  },
  verification: {
    google: ['wfNe4dC0_Gs0uv9mZErxak0e7SskKE1cCqMWudvcSC8', 'aq5RbQYjIu5R-p4Uejgu53IYhfiJKCkpJCR_TKh3n8M'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0b0b0d',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
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
        <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
      </head>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} font-sans bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white antialiased`}
      >
        {children}
      </body>
      </html>
    )
  }
