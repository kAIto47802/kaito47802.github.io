import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://kaito47802.github.io/sitemap.xml',
    host: 'https://kaito47802.github.io',
  };
}
