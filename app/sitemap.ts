import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const siteUrl = 'https://novus-lilac-nu.vercel.app'
const publicRoutes = ['/', '/about', '/blog', '/booking', '/gallery', '/location']

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
  }))
}
