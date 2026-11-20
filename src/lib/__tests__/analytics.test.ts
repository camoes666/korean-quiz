import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  trackShare,
  trackCardDownload,
  trackRelatedQuizClick,
  trackChemistryCtaClick,
  trackGuideCtaClick,
  trackQuizRetake,
  trackMapCtaClick,
  trackMapSpotClick,
  trackMapNavClick,
  trackMapSaveSpot,
} from '../analytics';

describe('analytics tracking helpers', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends related_quiz_click with expected snake_case params', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', { gtag });

    trackRelatedQuizClick({
      fromSlug: 'which-blackpink-member-are-you',
      toSlug: 'which-stray-kids-member-are-you',
      toQuizType: 'personality',
      position: 1,
      placement: 'related_grid',
      lang: 'es',
    });

    expect(gtag).toHaveBeenCalledWith('event', 'related_quiz_click', {
      from_slug: 'which-blackpink-member-are-you',
      to_slug: 'which-stray-kids-member-are-you',
      to_quiz_type: 'personality',
      position: 1,
      placement: 'related_grid',
      language: 'es',
    });
  });

  it('sends chemistry_cta_click, guide_cta_click, and quiz_retake events', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', { gtag });

    trackChemistryCtaClick({
      fromSlug: 'which-blackpink-member-are-you',
      targetGroup: 'blackpink',
      matchedMember: 'jennie',
      lang: 'es',
    });
    trackGuideCtaClick({
      fromSlug: 'stray-kids-stay-trivia',
      lang: 'en',
    });
    trackQuizRetake({
      slug: 'which-stray-kids-member-are-you',
      quizType: 'personality',
      lang: 'pt',
    });

    expect(gtag).toHaveBeenNthCalledWith(1, 'event', 'chemistry_cta_click', {
      from_slug: 'which-blackpink-member-are-you',
      target_group: 'blackpink',
      matched_member: 'jennie',
      language: 'es',
    });
    expect(gtag).toHaveBeenNthCalledWith(2, 'event', 'guide_cta_click', {
      from_slug: 'stray-kids-stay-trivia',
      language: 'en',
    });
    expect(gtag).toHaveBeenNthCalledWith(3, 'event', 'quiz_retake', {
      quiz_slug: 'which-stray-kids-member-are-you',
      quiz_type: 'personality',
      language: 'pt',
    });
  });

  it('forwards placement on share_click and card_download', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', { gtag });

    trackShare({
      slug: 'which-blackpink-member-are-you',
      method: 'whatsapp',
      lang: 'es',
      placement: 'result_top',
    });
    trackCardDownload({
      slug: 'which-blackpink-member-are-you',
      cardType: 'personality',
      lang: 'es',
      placement: 'result_top',
    });

    expect(gtag).toHaveBeenNthCalledWith(1, 'event', 'share_click', {
      quiz_slug: 'which-blackpink-member-are-you',
      method: 'whatsapp',
      language: 'es',
      placement: 'result_top',
    });
    expect(gtag).toHaveBeenNthCalledWith(2, 'event', 'card_download', {
      quiz_slug: 'which-blackpink-member-are-you',
      card_type: 'personality',
      language: 'es',
      placement: 'result_top',
    });
  });

  it('safely no-ops when window or gtag is unavailable', () => {
    expect(() =>
      trackRelatedQuizClick({
        fromSlug: 'a',
        toSlug: 'b',
        toQuizType: 'trivia',
        position: 1,
        placement: 'related_grid',
        lang: 'en',
      })
    ).not.toThrow();

    vi.stubGlobal('window', {});
    expect(() =>
      trackQuizRetake({ slug: 'a', quizType: 'trivia', lang: 'en' })
    ).not.toThrow();
    expect(() =>
      trackMapCtaClick({ fromSurface: 'navbar', targetGroup: 'all', lang: 'en' })
    ).not.toThrow();
  });

  it('sends map_cta_click, map_spot_click, map_nav_click, and map_save_spot events', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', { gtag });

    trackMapCtaClick({
      fromSurface: 'personality_result',
      fromSlug: 'which-blackpink-member-are-you',
      targetGroup: 'blackpink',
      lang: 'es',
    });
    trackMapSpotClick({
      spotId: 'bp-bukchon-hanok',
      groupId: 'blackpink',
      category: 'hometown',
      source: 'marker',
      lang: 'en',
    });
    trackMapNavClick({
      spotId: 'bts-jumunjin-bus-stop',
      provider: 'naver',
      lang: 'pt',
    });
    trackMapSaveSpot({
      spotId: 'skz-nodeul-island',
      saved: true,
      totalSaved: 3,
      lang: 'ko',
    });

    expect(gtag).toHaveBeenNthCalledWith(1, 'event', 'map_cta_click', {
      from_surface: 'personality_result',
      from_slug: 'which-blackpink-member-are-you',
      target_group: 'blackpink',
      language: 'es',
    });
    expect(gtag).toHaveBeenNthCalledWith(2, 'event', 'map_spot_click', {
      spot_id: 'bp-bukchon-hanok',
      group_id: 'blackpink',
      category: 'hometown',
      source: 'marker',
      language: 'en',
    });
    expect(gtag).toHaveBeenNthCalledWith(3, 'event', 'map_nav_click', {
      spot_id: 'bts-jumunjin-bus-stop',
      provider: 'naver',
      language: 'pt',
    });
    expect(gtag).toHaveBeenNthCalledWith(4, 'event', 'map_save_spot', {
      spot_id: 'skz-nodeul-island',
      saved: true,
      total_saved: 3,
      language: 'ko',
    });
  });
});
