import type { Language } from './translations';

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-D8KRGWM01F';

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetIdOrEventName: string | Date,
      params?: GtagParams
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Safe wrapper around window.gtag so events never throw when GA is not loaded or blocked by ad-blockers.
 */
export function trackEvent(eventName: string, params?: GtagParams): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }
  try {
    window.gtag('event', eventName, params);
  } catch {
    // Ignore errors if blocked by browser privacy extensions
  }
}

export function trackQuizStart(params: {
  slug: string;
  quizType: 'trivia' | 'personality';
  level?: number;
  lang: Language;
  isChallenge?: boolean;
}): void {
  trackEvent('quiz_start', {
    quiz_slug: params.slug,
    quiz_type: params.quizType,
    difficulty_level: params.level,
    language: params.lang,
    is_challenge: params.isChallenge ?? false,
  });
}

export function trackQuizComplete(params: {
  slug: string;
  quizType: 'trivia' | 'personality';
  score?: number;
  totalQuestions?: number;
  totalPoints?: number;
  resultId?: string;
  lang: Language;
  isChallenge?: boolean;
}): void {
  trackEvent('quiz_complete', {
    quiz_slug: params.slug,
    quiz_type: params.quizType,
    score: params.score,
    total_questions: params.totalQuestions,
    total_points: params.totalPoints,
    result_id: params.resultId,
    language: params.lang,
    is_challenge: params.isChallenge ?? false,
  });
}

export function trackShare(params: {
  slug?: string;
  method: 'challenge_copy' | 'link_copy' | 'native_share' | 'twitter' | 'whatsapp' | 'counter_challenge';
  lang: Language;
}): void {
  trackEvent('share_click', {
    quiz_slug: params.slug || 'unknown',
    method: params.method,
    language: params.lang,
  });
}

export function trackCardDownload(params: {
  slug: string;
  cardType: 'trivia' | 'personality';
  lang: Language;
}): void {
  trackEvent('card_download', {
    quiz_slug: params.slug,
    card_type: params.cardType,
    language: params.lang,
  });
}

export function trackAffiliateClick(params: {
  slug?: string;
  productName: string;
  platform: string;
  lang: Language;
}): void {
  trackEvent('affiliate_click', {
    quiz_slug: params.slug || 'unknown',
    product_name: params.productName,
    platform: params.platform,
    language: params.lang,
  });
}

export function trackLanguageChange(params: {
  from: Language;
  to: Language;
}): void {
  trackEvent('language_change', {
    from_lang: params.from,
    to_lang: params.to,
  });
}
