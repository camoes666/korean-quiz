export type ArticleCategory =
  | 'Korea Travel'
  | 'Names & Saju'
  | 'Food & Culture'
  | 'K-Pop & K-Drama';

export interface ArticleTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface ArticleCallout {
  title: string;
  body: string;
  tone?: 'tip' | 'note' | 'etiquette';
}

export interface ArticleSubsection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: ArticleTable;
  callout?: ArticleCallout;
  subsections?: ArticleSubsection[];
}

export interface ArticleSource {
  label: string;
  detail: string;
  url?: string;
}

export interface ArticleCompanionCta {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
}

export interface EditorialArticle {
  slug: string;
  locale: 'en';
  title: string;
  subtitle: string;
  description: string;
  category: ArticleCategory;
  tags: string[];
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    role: string;
  };
  coverEmoji: string;
  accentBg: string;
  featured?: boolean;
  keyTakeaways: string[];
  intro: string[];
  sections: ArticleSection[];
  companionCta: ArticleCompanionCta;
  relatedQuizSlugs: string[];
  sources: ArticleSource[];
}

export interface ArticleSummary {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: ArticleCategory;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  wordCount: number;
  coverEmoji: string;
  accentBg: string;
  featured?: boolean;
}
