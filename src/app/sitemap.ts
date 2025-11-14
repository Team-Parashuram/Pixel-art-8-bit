import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pixel-art-8-bit.mishrashardendu22.is-a.dev'
  
  // Component routes - expanded list
  const componentSlugs = [
    'pixel-button',
    'pixel-card',
    'pixel-input',
    'pixel-badge',
    'pixel-checkbox',
    'pixel-select',
    'pixel-tabs',
    'pixel-accordion',
    'pixel-alert',
    'pixel-avatar',
    'pixel-breadcrumb',
    'pixel-calendar',
    'pixel-dialog',
    'pixel-dropdown',
    'pixel-form',
    'pixel-label',
    'pixel-menu',
    'pixel-popover',
    'pixel-progress',
    'pixel-radio',
    'pixel-separator',
    'pixel-slider',
    'pixel-switch',
    'pixel-table',
    'pixel-textarea',
    'pixel-toast',
    'pixel-toggle',
    'pixel-tooltip',
  ]
  
  const componentRoutes = componentSlugs.map((slug) => ({
    url: `${baseUrl}/docs/components/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Category routes
  const categories = [
    'animations',
    'forms',
    'display',
    'feedback',
    'navigation',
    'overlays'
  ]

  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/docs/components?category=${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/docs/components`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/examples`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/animations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...componentRoutes,
    ...categoryRoutes,
  ]
}
