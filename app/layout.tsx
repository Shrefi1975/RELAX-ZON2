import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { ImageLightbox } from '@/src/components/site/image-lightbox'
import { SiteFooter } from '@/src/components/site/site-footer'
import { SiteHeader } from '@/src/components/site/site-header'
import { socialPreviewImage, socialPreviewImageUrl } from '@/components/site/social-metadata'
import './globals.css'

export const metadata: Metadata = {
  title: 'ريلاكس زون 2 | شقق مفروشة فاخرة في جدة',
  description: 'شقق ريلاكس زون 2 المفروشة في حي الشاطئ بجدة.',
  applicationName: 'ريلاكس زون 2',
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    siteName: 'ريلاكس زون 2',
    title: 'ريلاكس زون 2 | شقق مفروشة فاخرة في جدة',
    description: 'شقق مفروشة فاخرة في جدة',
    images: [socialPreviewImage],
  },
  twitter: { card: 'summary_large_image', images: [socialPreviewImageUrl] },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#171818',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ImageLightbox>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ImageLightbox>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
