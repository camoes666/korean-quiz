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
  placement?: 'result_top' | 'result_bottom' | 'trivia_result' | 'challenge_result';
}): void {
  trackEvent('share_click', {
    quiz_slug: params.slug || 'unknown',
    method: params.method,
    language: params.lang,
    placement: params.placement,
  });
}

export function trackHeroCardClick(params: {
  slug: string;
  position: number; // 1-based slide position in the home hero carousel
  lang: Language;
}): void {
  trackEvent('hero_card_click', {
    quiz_slug: params.slug,
    slide_position: params.position,
    language: params.lang,
  });
}

export function trackCardDownload(params: {
  slug: string;
  cardType: 'trivia' | 'personality';
  lang: Language;
  placement?: 'result_top' | 'result_bottom' | 'trivia_result';
}): void {
  trackEvent('card_download', {
    quiz_slug: params.slug,
    card_type: params.cardType,
    language: params.lang,
    placement: params.placement,
  });
}

export function trackRelatedQuizClick(params: {
  fromSlug: string;
  toSlug: string;
  toQuizType: 'trivia' | 'personality';
  position: number;
  placement: 'related_grid' | 'binge_banner' | 'next_quiz_cta' | 'random_quiz';
  lang: Language;
}): void {
  trackEvent('related_quiz_click', {
    from_slug: params.fromSlug,
    to_slug: params.toSlug,
    to_quiz_type: params.toQuizType,
    position: params.position,
    placement: params.placement,
    language: params.lang,
  });
}

export function trackChemistryCtaClick(params: {
  fromSlug: string;
  targetGroup: string;
  matchedMember?: string;
  lang: Language;
}): void {
  trackEvent('chemistry_cta_click', {
    from_slug: params.fromSlug,
    target_group: params.targetGroup,
    matched_member: params.matchedMember,
    language: params.lang,
  });
}

export function trackGuideCtaClick(params: {
  fromSlug: string;
  lang: Language;
}): void {
  trackEvent('guide_cta_click', {
    from_slug: params.fromSlug,
    language: params.lang,
  });
}

export function trackQuizRetake(params: {
  slug: string;
  quizType: 'trivia' | 'personality';
  lang: Language;
}): void {
  trackEvent('quiz_retake', {
    quiz_slug: params.slug,
    quiz_type: params.quizType,
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

export function trackMapCtaClick(params: {
  fromSurface: 'personality_result' | 'trivia_result' | 'chemistry_result' | 'navbar' | 'home_banner';
  fromSlug?: string;
  targetGroup: 'bts' | 'blackpink' | 'stray-kids' | 'all';
  lang: Language;
}): void {
  trackEvent('map_cta_click', {
    from_surface: params.fromSurface,
    from_slug: params.fromSlug,
    target_group: params.targetGroup,
    language: params.lang,
  });
}

export function trackMapSpotClick(params: {
  spotId: string;
  groupId: string;
  category: string;
  source: 'marker' | 'list' | 'directory';
  lang: Language;
}): void {
  trackEvent('map_spot_click', {
    spot_id: params.spotId,
    group_id: params.groupId,
    category: params.category,
    source: params.source,
    language: params.lang,
  });
}

export function trackMapNavClick(params: {
  spotId: string;
  provider: 'naver' | 'kakao' | 'google';
  lang: Language;
}): void {
  trackEvent('map_nav_click', {
    spot_id: params.spotId,
    provider: params.provider,
    language: params.lang,
  });
}

export function trackMapSaveSpot(params: {
  spotId: string;
  saved: boolean;
  totalSaved: number;
  lang: Language;
}): void {
  trackEvent('map_save_spot', {
    spot_id: params.spotId,
    saved: params.saved,
    total_saved: params.totalSaved,
    language: params.lang,
  });
}

export function trackMapStampSpot(params: {
  spotId: string;
  visited: boolean;
  totalVisited: number;
  lang: Language;
}): void {
  trackEvent('map_stamp_spot', {
    spot_id: params.spotId,
    visited: params.visited,
    total_visited: params.totalVisited,
    language: params.lang,
  });
}

export function trackMapCourseSelect(params: {
  courseSlug: string;
  groupId: string;
  source: 'map_strip' | 'spot_page' | 'course_directory';
  lang: Language;
}): void {
  trackEvent('map_course_select', {
    course_slug: params.courseSlug,
    group_id: params.groupId,
    source: params.source,
    language: params.lang,
  });
}

export function trackTravelAffiliateClick(params: {
  provider: string;
  category: string;
  offerId: string;
  spotSlug?: string;
  courseSlug?: string;
  region: string;
  lang: Language;
}): void {
  trackEvent('travel_affiliate_click', {
    provider: params.provider,
    category: params.category,
    offer_id: params.offerId,
    spot_slug: params.spotSlug,
    course_slug: params.courseSlug,
    region: params.region,
    language: params.lang,
  });
}

export function trackKoreanNameGenerate(params: {
  gender: string;
  vibe: string;
  coreElement: string;
  luckyElement: string;
  fullHangul: string;
  lang: Language;
}): void {
  trackEvent('korean_name_generate', {
    gender: params.gender,
    vibe: params.vibe,
    core_element: params.coreElement,
    lucky_element: params.luckyElement,
    full_hangul: params.fullHangul,
    language: params.lang,
  });
}

export function trackKoreanNameAudioPlay(params: {
  fullHangul: string;
  lang: Language;
}): void {
  trackEvent('korean_name_audio_play', {
    full_hangul: params.fullHangul,
    language: params.lang,
  });
}

export function trackKoreanNameCardDownload(params: {
  fullHangul: string;
  rank: number;
  lang: Language;
}): void {
  trackEvent('korean_name_card_download', {
    full_hangul: params.fullHangul,
    candidate_rank: params.rank,
    language: params.lang,
  });
}

export function trackKoreanNameShare(params: {
  method: 'link_copy' | 'whatsapp' | 'twitter';
  fullHangul: string;
  lang: Language;
}): void {
  trackEvent('korean_name_share', {
    method: params.method,
    full_hangul: params.fullHangul,
    language: params.lang,
  });
}

export function trackKoreanNameChemistryClick(params: {
  targetGroup: string;
  matchedMember: string;
  lang: Language;
}): void {
  trackEvent('korean_name_chemistry_click', {
    target_group: params.targetGroup,
    matched_member: params.matchedMember,
    language: params.lang,
  });
}
