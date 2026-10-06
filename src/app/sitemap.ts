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

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...quizUrls,
  ];
}
