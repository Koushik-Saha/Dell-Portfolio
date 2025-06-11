import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://dell-portfolio-koushik.vercel.app' // Update with your actual domain
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/onboarding/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}