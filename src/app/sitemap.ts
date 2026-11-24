import type { MetadataRoute } from 'next';
import { getAllQuizzes, getTriviaQuizzes } from '../data/quizzes';
import { getAllArticles } from '../lib/articles';
import { IDOL_GROUPS } from '../data/idolChemistry';
import { MAP_SPOTS } from '../data/mapSpots';
import { MAP_COURSES } from '../data/mapCourses';
import {
  BASE_URL,
  type SiteLocale,
  buildLocalizedUrl,
} from '../lib/i18nRoutes';
import {
  INDEXED_LOCALES,
  INDEX_THIN_DERIVATIVE_PAGES,
  SITE_LAST_UPDATED,
  resolveLastModifiedDate,
} from '../lib/indexingPolicy';

export const dynamic = 'force-static';

function buildSitemapAlternates(basePath: string) {
  const languages = Object.fromEntries(
    INDEXED_LOCALES.map((locale: SiteLocale) => [
      locale,
      buildLocalizedUrl(basePath, locale),
    ])
  );
  return { languages };
}

function expandLocalizedEntries(
  basePath: string,
  changeFrequency: 'daily' | 'weekly' | 'monthly',
  priority: number,
  lastModified: Date
): MetadataRoute.Sitemap {
  const includeAlternates = INDEXED_LOCALES.length > 1;
  const alternates = includeAlternates ? buildSitemapAlternates(basePath) : undefined;

  return INDEXED_LOCALES.map((locale) => ({
    url: buildLocalizedUrl(basePath, locale),
    lastModified,
    changeFrequency,
    priority,
    ...(alternates ? { alternates } : {}),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const quizzes = getAllQuizzes();
  const triviaQuizzes = getTriviaQuizzes();
  const articles = getAllArticles();
  const siteLastUpdatedDate = resolveLastModifiedDate(SITE_LAST_UPDATED);

  const homeUrls = expandLocalizedEntries('/', 'daily', 1.0, siteLastUpdatedDate);
  const articlesHubUrls = expandLocalizedEntries(
    '/articles',
    'weekly',
    0.95,
    siteLastUpdatedDate
  );
  const articleDetailUrls = articles.flatMap((article) =>
    expandLocalizedEntries(
      `/articles/${article.slug}`,
      'monthly',
      0.92,
      resolveLastModifiedDate(article.updatedAt || article.publishedAt)
    )
  );
  const koreanNameUrls = expandLocalizedEntries(
    '/korean-name',
    'weekly',
    0.96,
    siteLastUpdatedDate
  );
  const mapUrls = expandLocalizedEntries('/map', 'weekly', 0.95, siteLastUpdatedDate);
  const mapCourseUrls = INDEX_THIN_DERIVATIVE_PAGES
    ? MAP_COURSES.flatMap((course) =>
        expandLocalizedEntries(
          `/map/course/${course.slug}`,
          'weekly',
          0.9,
          siteLastUpdatedDate
        )
      )
    : [];
  const mapSpotUrls = INDEX_THIN_DERIVATIVE_PAGES
    ? MAP_SPOTS.flatMap((spot) =>
        expandLocalizedEntries(
          `/map/${spot.slug}`,
          'weekly',
          0.88,
          resolveLastModifiedDate(spot.lastVerifiedAt)
        )
      )
    : [];
  const chemistryHubUrls = expandLocalizedEntries(
    '/chemistry',
    'weekly',
    0.95,
    siteLastUpdatedDate
  );
  const chemistryGroupUrls = INDEX_THIN_DERIVATIVE_PAGES
    ? IDOL_GROUPS.flatMap((group) =>
        expandLocalizedEntries(
          `/chemistry/${group.id}`,
          'weekly',
          0.92,
          siteLastUpdatedDate
        )
      )
    : [];
  const quizUrls = quizzes.flatMap((quiz) =>
    expandLocalizedEntries(
      `/quiz/${quiz.slug}`,
      'weekly',
      0.9,
      resolveLastModifiedDate(quiz.addedAt)
    )
  );
  const guideHubUrls = expandLocalizedEntries(
    '/guide',
    'weekly',
    0.9,
    siteLastUpdatedDate
  );
  const guideDetailUrls = triviaQuizzes.flatMap((guide) =>
    expandLocalizedEntries(
      `/guide/${guide.slug}`,
      'weekly',
      0.85,
      resolveLastModifiedDate(guide.addedAt)
    )
  );

  const staticPages: MetadataRoute.Sitemap = [
    'about',
    'contact',
    'privacy',
    'terms',
  ].map((page) => ({
    url: `${BASE_URL}/${page}`,
    lastModified: siteLastUpdatedDate,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [
    ...homeUrls,
    ...articlesHubUrls,
    ...articleDetailUrls,
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
