import type { MetadataRoute } from 'next';
import { getAllQuizzes, getTriviaQuizzes } from '@/data/quizzes';
import { IDOL_GROUPS } from '@/data/idolChemistry';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kpulsequiz.com';
  const quizzes = getAllQuizzes();
  const triviaQuizzes = getTriviaQuizzes();

  const quizUrls: MetadataRoute.Sitemap = quizzes.map((quiz) => ({
    url: `${baseUrl}/quiz/${quiz.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const chemistryUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/chemistry`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    ...IDOL_GROUPS.map((group) => ({
      url: `${baseUrl}/chemistry/${group.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    })),
  ];

  const guideHubUrl: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const guideUrls: MetadataRoute.Sitemap = triviaQuizzes.map((guide) => ({
    url: `${baseUrl}/guide/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
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
    ...chemistryUrls,
    ...quizUrls,
    ...guideHubUrl,
    ...guideUrls,
    ...staticPages,
  ];
}
