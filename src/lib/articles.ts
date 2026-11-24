import type { ArticleSummary, EditorialArticle } from '../types/article';
import { EDITORIAL_ARTICLES } from '../data/articles';

function countWordsInText(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function countArticleWords(article: EditorialArticle): number {
  const parts: string[] = [
    article.title,
    article.subtitle,
    ...article.intro,
    ...article.keyTakeaways,
  ];

  for (const section of article.sections) {
    parts.push(section.heading);
    parts.push(...section.paragraphs);
    if (section.bullets) {
      parts.push(...section.bullets);
    }
    if (section.table) {
      if (section.table.caption) parts.push(section.table.caption);
      parts.push(...section.table.headers);
      for (const row of section.table.rows) {
        parts.push(...row);
      }
    }
    if (section.callout) {
      parts.push(section.callout.title, section.callout.body);
    }
    if (section.subsections) {
      for (const sub of section.subsections) {
        parts.push(sub.heading, ...sub.paragraphs);
        if (sub.bullets) parts.push(...sub.bullets);
      }
    }
  }

  parts.push(
    article.companionCta.title,
    article.companionCta.description
  );

  return parts.reduce((sum, part) => sum + countWordsInText(part), 0);
}

export function estimateArticleReadingMinutes(wordCount: number): number {
  return Math.max(4, Math.ceil(wordCount / 220));
}

export function getAllArticles(): EditorialArticle[] {
  return EDITORIAL_ARTICLES;
}

export function getArticleBySlug(slug: string): EditorialArticle | undefined {
  return EDITORIAL_ARTICLES.find((article) => article.slug === slug);
}

export function toArticleSummary(article: EditorialArticle): ArticleSummary {
  const wordCount = countArticleWords(article);
  return {
    slug: article.slug,
    title: article.title,
    subtitle: article.subtitle,
    description: article.description,
    category: article.category,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    readingTimeMinutes: estimateArticleReadingMinutes(wordCount),
    wordCount,
    coverEmoji: article.coverEmoji,
    accentBg: article.accentBg,
    featured: article.featured,
  };
}

export function getArticleSummaries(): ArticleSummary[] {
  return EDITORIAL_ARTICLES.map(toArticleSummary);
}

export function getFeaturedArticleSummaries(limit = 6): ArticleSummary[] {
  const featured = EDITORIAL_ARTICLES.filter((article) => article.featured);
  const pool =
    featured.length >= limit
      ? featured
      : [
          ...featured,
          ...EDITORIAL_ARTICLES.filter((article) => !article.featured),
        ];
  return pool.slice(0, limit).map(toArticleSummary);
}

export function getRelatedArticles(slug: string, limit = 3): ArticleSummary[] {
  const current = getArticleBySlug(slug);
  const others = EDITORIAL_ARTICLES.filter((article) => article.slug !== slug);
  if (!current) {
    return others.slice(0, limit).map(toArticleSummary);
  }
  const sameCategory = others.filter(
    (article) => article.category === current.category
  );
  const differentCategory = others.filter(
    (article) => article.category !== current.category
  );
  return [...sameCategory, ...differentCategory]
    .slice(0, limit)
    .map(toArticleSummary);
}
