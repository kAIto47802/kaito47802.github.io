import type { MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap => {
  const lastModified = new Date();

  return [
    {
      url: 'https://kaito47802.github.io/',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://kaito47802.github.io/ja',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
};

export default sitemap;
