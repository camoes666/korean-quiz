import { describe, it, expect } from 'vitest';
import {
  countArticleWords,
  estimateArticleReadingMinutes,
  getAllArticles,
  getArticleBySlug,
  getFeaturedArticleSummaries,
  getRelatedArticles,
} from '../articles';
import { getQuizBySlug } from '../../data/quizzes';
import { BASE_URL } from '../i18nRoutes';
import {
  generateArticleJsonLd,
  generateArticlesHubJsonLd,
  getArticleMetadata,
  getArticlesHubMetadata,
} from '../pageSeo';

const BANNED_PHRASES = [
  "in today's fast-paced",
  'rich tapestry',
  'delve into',
  'in conclusion,',
];

describe('editorial articles', () => {
  it('provides 24 unique long-form guides evenly distributed across 4 categories', () => {
    const articles = getAllArticles();
    expect(articles).toHaveLength(24);

    const slugs = new Set(articles.map((a) => a.slug));
    expect(slugs.size).toBe(24);

    const byCategory = articles.reduce<Record<string, number>>((acc, a) => {
      acc[a.category] = (acc[a.category] || 0) + 1;
      return acc;
    }, {});

    expect(byCategory).toEqual({
      'Korea Travel': 6,
      'Names & Saju': 6,
      'Food & Culture': 6,
      'K-Pop & K-Drama': 6,
    });
  });

  it('meets strict word count, structural depth, quiz-link, and copy-quality checks for every article', () => {
    for (const article of getAllArticles()) {
      const words = countArticleWords(article);
      expect(words, `${article.slug} word count (${words})`).toBeGreaterThanOrEqual(
        1000
      );
      expect(estimateArticleReadingMinutes(words)).toBeGreaterThanOrEqual(4);

      expect(article.keyTakeaways.length).toBeGreaterThanOrEqual(3);
      expect(article.intro.length).toBeGreaterThanOrEqual(2);
      expect(article.sections.length).toBeGreaterThanOrEqual(4);
      expect(article.sources.length).toBeGreaterThanOrEqual(2);

      const hasTable = article.sections.some(
        (s) =>
          s.table &&
          s.table.headers.length >= 2 &&
          s.table.rows.length >= 3
      );
      expect(hasTable, `${article.slug} missing structured table`).toBe(true);

      const hasCallout = article.sections.some((s) => Boolean(s.callout));
      expect(hasCallout, `${article.slug} missing practical callout`).toBe(true);

      expect(article.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(article.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      expect(article.relatedQuizSlugs.length).toBeGreaterThanOrEqual(1);
      for (const qSlug of article.relatedQuizSlugs) {
        expect(
          getQuizBySlug(qSlug),
          `${article.slug} references invalid quiz slug "${qSlug}"`
        ).toBeDefined();
      }

      const fullText = JSON.stringify(article).toLowerCase();
      for (const phrase of BANNED_PHRASES) {
        expect(fullText, `${article.slug} contains banned phrase "${phrase}"`).not.toContain(
          phrase
        );
      }
    }
  });

  it('provides 6 featured article summaries and category-prioritized related recommendations', () => {
    const featured = getFeaturedArticleSummaries(6);
    expect(featured).toHaveLength(6);

    const sample = getAllArticles()[0];
    expect(getArticleBySlug(sample.slug)?.slug).toBe(sample.slug);

    const related = getRelatedArticles(sample.slug, 3);
    expect(related).toHaveLength(3);
    expect(related.every((r) => r.slug !== sample.slug)).toBe(true);
    expect(related[0].category).toBe(sample.category);
  });

  it('emits indexable Article and CollectionPage metadata + JSON-LD schemas', () => {
    const articles = getAllArticles();
    const hubMeta = getArticlesHubMetadata();
    expect(hubMeta.robots).toBeUndefined();
    expect(hubMeta.alternates?.canonical).toBe(`${BASE_URL}/articles`);
    expect(generateArticlesHubJsonLd(articles)).toHaveLength(2);

    for (const article of articles) {
      const meta = getArticleMetadata(article);
      expect(meta.robots).toBeUndefined();
      expect(meta.alternates?.canonical).toBe(`${BASE_URL}/articles/${article.slug}`);

      const words = countArticleWords(article);
      const schemas = generateArticleJsonLd(article, words);
      expect(schemas).toHaveLength(2);
      expect(schemas[0]).toMatchObject({
        '@type': 'Article',
        headline: article.title,
        wordCount: words,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
      });
      expect(schemas[1]).toMatchObject({ '@type': 'BreadcrumbList' });
    }
  });
});
