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
  textPt?: string;
}

export interface Question {
  id: number;
  level?: QuestionLevel; // 1: Rookie/Easy, 2: Fan/Medium, 3: Hardcore/Hard
  question: string;
  questionKo?: string;
  questionEs?: string;
  questionRu?: string;
  questionZh?: string;
  questionPt?: string;
  options: QuizOption[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
  explanation: string;
  explanationKo?: string;
  explanationEs?: string;
  explanationRu?: string;
  explanationZh?: string;
  explanationPt?: string;
  funFact?: string;
  funFactKo?: string;
  funFactEs?: string;
  funFactRu?: string;
  funFactZh?: string;
  funFactPt?: string;
}

export interface ScoreTier {
  minScore: number;
  maxScore: number;
  title: string;
  titleKo?: string;
  titleEs?: string;
  titleRu?: string;
  titleZh?: string;
  titlePt?: string;
  badge: string;
  badgeKo?: string;
  badgeEs?: string;
  badgeRu?: string;
  badgeZh?: string;
  badgePt?: string;
  description: string;
  descriptionKo?: string;
  descriptionEs?: string;
  descriptionRu?: string;
  descriptionZh?: string;
  descriptionPt?: string;
  funQuote: string;
  funQuoteKo?: string;
  funQuoteEs?: string;
  funQuoteRu?: string;
  funQuoteZh?: string;
  funQuotePt?: string;
}

export interface AffiliateSuggestion {
  tag: string;
  tagKo?: string;
  tagEs?: string;
  tagRu?: string;
  tagZh?: string;
  tagPt?: string;
  title: string;
  titleKo?: string;
  titleEs?: string;
  titleRu?: string;
  titleZh?: string;
  titlePt?: string;
  productName: string;
  productNameKo?: string;
  productNameEs?: string;
  productNameRu?: string;
  productNameZh?: string;
  productNamePt?: string;
  description: string;
  descriptionKo?: string;
  descriptionEs?: string;
  descriptionRu?: string;
  descriptionZh?: string;
  descriptionPt?: string;
  buttonText: string;
  buttonTextKo?: string;
  buttonTextEs?: string;
  buttonTextRu?: string;
  buttonTextZh?: string;
  buttonTextPt?: string;
  targetUrl: string;
  badgeText?: string;
  badgeTextKo?: string;
  badgeTextEs?: string;
  badgeTextRu?: string;
  badgeTextZh?: string;
  badgeTextPt?: string;
}

export type QuizType = 'trivia' | 'personality';

export interface PersonalityMemberResult {
  id: string; // e.g. 'felix', 'bangchan', etc.
  name: string;
  nameKo: string;
  nameEs: string;
  namePt?: string;
  title: string;
  titleKo: string;
  titleEs: string;
  titlePt?: string;
  subtitle: string;
  subtitleKo: string;
  subtitleEs: string;
  subtitlePt?: string;
  skzoo: string;
  skzooKo: string;
  skzooEs: string;
  skzooPt?: string;
  emoji: string;
  traits: string[];
  traitsKo: string[];
  traitsEs: string[];
  traitsPt?: string[];
  description: string;
  descriptionKo: string;
  descriptionEs: string;
  descriptionPt?: string;
  bestMatchId: string;
  bestMatchName: string;
  bestMatchNameKo: string;
  bestMatchNameEs: string;
  bestMatchNamePt?: string;
  bestMatchReason: string;
  bestMatchReasonKo: string;
  bestMatchReasonEs: string;
  bestMatchReasonPt?: string;
  colorHex: string;
  bgGradient: string;
}

export interface PersonalityOption {
  id: string;
  text: string;
  textKo?: string;
  textEs?: string;
  textPt?: string;
  scores: Record<string, number | undefined>;
}

export interface PersonalityQuestion {
  id: number;
  question: string;
  questionKo?: string;
  questionEs?: string;
  questionPt?: string;
  emoji?: string;
  options: PersonalityOption[];
}

export interface Quiz {
  slug: string;
  addedAt?: string; // YYYY-MM-DD the quiz went live; drives the "New" badge
  quizType?: QuizType;
  title: string;
  titleKo?: string;
  titleEs?: string;
  titleRu?: string;
  titleZh?: string;
  titlePt?: string;
  subtitle: string;
  subtitleKo?: string;
  subtitleEs?: string;
  subtitleRu?: string;
  subtitleZh?: string;
  subtitlePt?: string;
  description: string;
  descriptionKo?: string;
  descriptionEs?: string;
  descriptionRu?: string;
  descriptionZh?: string;
  descriptionPt?: string;
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
  personalityQuestions?: PersonalityQuestion[];
  personalityResults?: Record<string, PersonalityMemberResult>;
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

  // Fallback priority order: English -> Spanish -> Korean
  if (record[prop]) {
    return String(record[prop]);
  }
  if (record[`${prop}Es`]) {
    return String(record[`${prop}Es`]);
  }
  if (record[`${prop}Ko`]) {
    return String(record[`${prop}Ko`]);
  }

  return '';
}

// Universal localized string array resolver helper (e.g. traits / traitsEs / traitsKo / traitsPt)
export function getLocalizedArray<T extends object>(
  item: T,
  prop: string,
  lang: Language
): string[] {
  if (!item) return [];

  const record = item as Record<string, unknown>;
  const langKey =
    lang === 'en'
      ? prop
      : `${prop}${lang.charAt(0).toUpperCase() + lang.slice(1)}`;

  if (Array.isArray(record[langKey]) && (record[langKey] as string[]).length > 0) {
    return record[langKey] as string[];
  }

  if (Array.isArray(record[prop])) {
    return record[prop] as string[];
  }
  if (Array.isArray(record[`${prop}Es`])) {
    return record[`${prop}Es`] as string[];
  }
  if (Array.isArray(record[`${prop}Ko`])) {
    return record[`${prop}Ko`] as string[];
  }

  return [];
}
