import type { MetadataRoute } from 'next';
import { getAllQuizzes } from '@/data/quizzes';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kpulsequiz.com';
  const quizzes = getAllQuizzes();

  const quizUrls: MetadataRoute.Sitemap = quizzes.map((quiz) => ({
    url: `${baseUrl}/quiz/${quiz.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = ['about', 'privacy', 'terms'].map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...quizUrls,
    ...staticPages,
  ];
}
