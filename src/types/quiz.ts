import { Language } from '@/lib/translations';

export type Category =
  | 'All'
  | 'Culture'
  | 'K-Pop'
  | 'K-Drama'
  | 'Food'
  | 'Language'
  | 'Lifestyle';

export type QuestionLevel = 1 | 2 | 3;

export interface QuizOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  textKo?: string;
  textEs?: string;
  textRu?: string;
  textZh?: string;
}

export interface Question {
  id: number;
  level?: QuestionLevel; // 1: Rookie/Easy, 2: Fan/Medium, 3: Hardcore/Hard
  question: string;
  questionKo?: string;
  questionEs?: string;
  questionRu?: string;
  questionZh?: string;
  options: QuizOption[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
  explanation: string;
  explanationKo?: string;
  explanationEs?: string;
  explanationRu?: string;
  explanationZh?: string;
  funFact?: string;
  funFactKo?: string;
  funFactEs?: string;
  funFactRu?: string;
  funFactZh?: string;
}

export interface ScoreTier {
  minScore: number;
  maxScore: number;
  title: string;
  titleKo?: string;
  titleEs?: string;
  titleRu?: string;
  titleZh?: string;
  badge: string;
  badgeKo?: string;
  badgeEs?: string;
  badgeRu?: string;
  badgeZh?: string;
  description: string;
  descriptionKo?: string;
  descriptionEs?: string;
  descriptionRu?: string;
  descriptionZh?: string;
  funQuote: string;
  funQuoteKo?: string;
  funQuoteEs?: string;
  funQuoteRu?: string;
  funQuoteZh?: string;
}

export interface AffiliateSuggestion {
  tag: string;
  tagKo?: string;
  tagEs?: string;
  tagRu?: string;
  tagZh?: string;
  title: string;
  titleKo?: string;
  titleEs?: string;
  titleRu?: string;
  titleZh?: string;
  productName: string;
  productNameKo?: string;
  productNameEs?: string;
  productNameRu?: string;
  productNameZh?: string;
  description: string;
  descriptionKo?: string;
  descriptionEs?: string;
  descriptionRu?: string;
  descriptionZh?: string;
  buttonText: string;
  buttonTextKo?: string;
  buttonTextEs?: string;
  buttonTextRu?: string;
  buttonTextZh?: string;
  targetUrl: string;
  badgeText?: string;
  badgeTextKo?: string;
  badgeTextEs?: string;
  badgeTextRu?: string;
  badgeTextZh?: string;
}

export interface Quiz {
  slug: string;
  title: string;
  titleKo?: string;
  titleEs?: string;
  titleRu?: string;
  titleZh?: string;
  subtitle: string;
  subtitleKo?: string;
  subtitleEs?: string;
  subtitleRu?: string;
  subtitleZh?: string;
  description: string;
  descriptionKo?: string;
  descriptionEs?: string;
  descriptionRu?: string;
  descriptionZh?: string;
  category: Exclude<Category, 'All'>;
  tag?: string; // e.g. "BTS", "BLACKPINK", "Squid Game", "Spicy Level"
  coverEmoji: string;
  gradient: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedMinutes: number;
  totalPlays: string;
  featured?: boolean;
  questions: Question[];
  scoreTiers: ScoreTier[];
  affiliateSuggestion?: AffiliateSuggestion;
}

// Universal localized property resolver helper
export function getLocalizedText<T extends object>(
  item: T,
  prop: string,
  lang: Language
): string {
  if (!item) return '';

  const record = item as Record<string, unknown>;
  const langKey =
    lang === 'en'
      ? prop
      : `${prop}${lang.charAt(0).toUpperCase() + lang.slice(1)}`;

  if (record[langKey]) {
    return String(record[langKey]);
  }

  // If Korean is explicitly selected, fallback to Korean first
  if (lang === 'ko' && record[`${prop}Ko`]) {
    return String(record[`${prop}Ko`]);
  }

  // For English, Spanish or any other language, fallback to English (base) first
  if (record[prop]) {
    return String(record[prop]);
  }

  // Final fallback to Korean if English does not exist
  if (record[`${prop}Ko`]) {
    return String(record[`${prop}Ko`]);
  }

  return '';
}
