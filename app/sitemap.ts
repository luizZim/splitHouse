import type { MetadataRoute } from 'next'
import { PRODUCT_TYPES } from '@/lib/data/catalog'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    ...PRODUCT_TYPES.map((t) => ({
      url: `${SITE_URL}/produtos/${t.id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
