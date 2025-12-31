import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://augustopolonio.vercel.app'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/private/'], // Add paths you want to block from crawlers
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
