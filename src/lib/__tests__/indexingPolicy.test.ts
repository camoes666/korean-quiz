import { describe, it, expect } from 'vitest';
import sitemap from '../../app/sitemap';
import { getAllQuizzes, getQuizBySlug, getTriviaQuizzes } from '../../data/quizzes';
import { getIdolGroupById } from '../../data/idolChemistry';
import { getAllArticles } from '../articles';
import { BASE_URL } from '../i18nRoutes';
import {
  getRobotsForRoute,
  isRouteIndexable,
  type IndexableRouteKind,
} from '../indexingPolicy';
import {
  getChemistryGroupMetadata,
  getChemistryHubMetadata,
  getHomeMetadata,
  getQuizMetadata,
} from '../pageSeo';

describe('indexingPolicy', () => {
  it('indexes only primary English hub, quiz, and guide routes', () => {
    const indexableEnKinds: IndexableRouteKind[] = [
      'home',
      'korean-name',
      'map-hub',
      'chemistry-hub',
      'quiz',
      'guide-hub',
      'guide-detail',
      'articles-hub',
      'article-detail',
    ];
    for (const kind of indexableEnKinds) {
      expect(isRouteIndexable(kind, 'en')).toBe(true);
      expect(getRobotsForRoute(kind, 'en')).toBeUndefined();
    }

    const thinEnKinds: IndexableRouteKind[] = [
      'map-spot',
      'map-course',
      'chemistry-group',
    ];
    for (const kind of thinEnKinds) {
      expect(isRouteIndexable(kind, 'en')).toBe(false);
      expect(getRobotsForRoute(kind, 'en')).toEqual({
        index: false,
        follow: true,
      });
    }

    const allKinds: IndexableRouteKind[] = [...indexableEnKinds, ...thinEnKinds];
    for (const locale of ['es', 'pt', 'ko'] as const) {
      for (const kind of allKinds) {
        expect(isRouteIndexable(kind, locale)).toBe(false);
        expect(getRobotsForRoute(kind, locale)).toEqual({
          index: false,
          follow: true,
        });
      }
    }
  });

  it('emits accurate robots and alternates on page metadata', () => {
    const homeEn = getHomeMetadata('en');
    expect(homeEn.robots).toBeUndefined();
    expect(homeEn.alternates?.canonical).toBe(BASE_URL);
    expect(homeEn.alternates?.languages).toBeUndefined();

    const homeKo = getHomeMetadata('ko');
    expect(homeKo.robots).toEqual({ index: false, follow: true });
    expect(homeKo.alternates?.canonical).toBe(`${BASE_URL}/ko`);
    expect(homeKo.alternates?.languages).toBeUndefined();

    const chemHubEn = getChemistryHubMetadata('en');
    expect(chemHubEn.robots).toBeUndefined();
    expect(chemHubEn.alternates?.canonical).toBe(`${BASE_URL}/chemistry`);

    const btsGroup = getIdolGroupById('bts')!;
    const chemGroupEn = getChemistryGroupMetadata(btsGroup, 'en');
    expect(chemGroupEn.robots).toEqual({ index: false, follow: true });
    expect(chemGroupEn.alternates?.canonical).toBe(`${BASE_URL}/chemistry/bts`);
    expect(chemGroupEn.alternates?.languages).toBeUndefined();

    const btsQuiz = getQuizBySlug('which-bts-member-are-you')!;
    const quizEn = getQuizMetadata(btsQuiz, 'en');
    expect(quizEn.robots).toBeUndefined();
    expect(quizEn.alternates?.canonical).toBe(
      `${BASE_URL}/quiz/which-bts-member-are-you`
    );

    const quizEs = getQuizMetadata(btsQuiz, 'es');
    expect(quizEs.robots).toEqual({ index: false, follow: true });
    expect(quizEs.alternates?.canonical).toBe(
      `${BASE_URL}/es/quiz/which-bts-member-are-you`
    );
    expect(quizEs.alternates?.languages).toBeUndefined();
  });

  it('produces a focused 60-URL sitemap with deterministic dates and no noindex URLs', () => {
    const entriesA = sitemap();
    const entriesB = sitemap();
    const urls = entriesA.map((e) => e.url);

    expect(entriesA).toHaveLength(60);
    expect(new Set(urls).size).toBe(60);

    // Deterministic lastModified across calls
    expect(
      entriesA.map((e) =>
        e.lastModified instanceof Date ? e.lastModified.toISOString() : e.lastModified
      )
    ).toEqual(
      entriesB.map((e) =>
        e.lastModified instanceof Date ? e.lastModified.toISOString() : e.lastModified
      )
    );

    // No non-indexed locales, no map spot/course pages, no chemistry group pages, no hreflang alternates
    for (const entry of entriesA) {
      expect(entry.alternates).toBeUndefined();
      expect(entry.url).not.toMatch(/\/(es|pt|ko)(\/|$)/);
      expect(entry.url).not.toMatch(/\/map\/.+/);
      expect(entry.url).not.toMatch(/\/chemistry\/.+/);
    }

    // Core hubs & static pages
    expect(urls).toContain(BASE_URL);
    expect(urls).toContain(`${BASE_URL}/articles`);
    expect(urls).toContain(`${BASE_URL}/korean-name`);
    expect(urls).toContain(`${BASE_URL}/map`);
    expect(urls).toContain(`${BASE_URL}/chemistry`);
    expect(urls).toContain(`${BASE_URL}/guide`);
    expect(urls).toContain(`${BASE_URL}/about`);
    expect(urls).toContain(`${BASE_URL}/contact`);
    expect(urls).toContain(`${BASE_URL}/privacy`);
    expect(urls).toContain(`${BASE_URL}/terms`);

    // All 24 editorial articles, 18 quizzes, and 8 guides
    for (const a of getAllArticles()) {
      expect(urls).toContain(`${BASE_URL}/articles/${a.slug}`);
    }
    for (const q of getAllQuizzes()) {
      expect(urls).toContain(`${BASE_URL}/quiz/${q.slug}`);
    }
    for (const g of getTriviaQuizzes()) {
      expect(urls).toContain(`${BASE_URL}/guide/${g.slug}`);
    }
  });
});
