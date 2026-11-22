import type { MetadataRoute } from 'next';
import { getAllQuizzes, getTriviaQuizzes } from '@/data/quizzes';
import { IDOL_GROUPS } from '@/data/idolChemistry';
import { MAP_SPOTS } from '@/data/mapSpots';
import { MAP_COURSES } from '@/data/mapCourses';
import {
  BASE_URL,
  SITE_LOCALES,
  buildLocalizedUrl,
} from '@/lib/i18nRoutes';

export const dynamic = 'force-static';

function buildSitemapAlternates(basePath: string) {
  return {
    languages: {
      en: buildLocalizedUrl(basePath, 'en'),
      es: buildLocalizedUrl(basePath, 'es'),
      pt: buildLocalizedUrl(basePath, 'pt'),
      ko: buildLocalizedUrl(basePath, 'ko'),
    },
  };
}

function expandLocalizedEntries(
  basePath: string,
  changeFrequency: 'daily' | 'weekly' | 'monthly',
  priority: number
): MetadataRoute.Sitemap {
  const alternates = buildSitemapAlternates(basePath);
  return SITE_LOCALES.map((locale) => ({
    url: buildLocalizedUrl(basePath, locale),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const quizzes = getAllQuizzes();
  const triviaQuizzes = getTriviaQuizzes();

  const homeUrls = expandLocalizedEntries('/', 'daily', 1.0);
  const koreanNameUrls = expandLocalizedEntries('/korean-name', 'weekly', 0.96);
  const mapUrls = expandLocalizedEntries('/map', 'weekly', 0.95);
  const mapCourseUrls = MAP_COURSES.flatMap((course) =>
    expandLocalizedEntries(`/map/course/${course.slug}`, 'weekly', 0.9)
  );
  const mapSpotUrls = MAP_SPOTS.flatMap((spot) =>
    expandLocalizedEntries(`/map/${spot.slug}`, 'weekly', 0.88)
  );
  const chemistryHubUrls = expandLocalizedEntries('/chemistry', 'weekly', 0.95);
  const chemistryGroupUrls = IDOL_GROUPS.flatMap((group) =>
    expandLocalizedEntries(`/chemistry/${group.id}`, 'weekly', 0.92)
  );
  const quizUrls = quizzes.flatMap((quiz) =>
    expandLocalizedEntries(`/quiz/${quiz.slug}`, 'weekly', 0.9)
  );
  const guideHubUrls = expandLocalizedEntries('/guide', 'weekly', 0.9);
  const guideDetailUrls = triviaQuizzes.flatMap((guide) =>
    expandLocalizedEntries(`/guide/${guide.slug}`, 'weekly', 0.85)
  );

  const staticPages: MetadataRoute.Sitemap = ['about', 'privacy', 'terms'].map(
    (page) => ({
      url: `${BASE_URL}/${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  );

  return [
    ...homeUrls,
    ...koreanNameUrls,
    ...mapUrls,
    ...mapCourseUrls,
    ...mapSpotUrls,
    ...chemistryHubUrls,
    ...chemistryGroupUrls,
    ...quizUrls,
    ...guideHubUrls,
    ...guideDetailUrls,
    ...staticPages,
  ];
}
