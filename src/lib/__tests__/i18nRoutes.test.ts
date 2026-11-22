import { describe, it, expect } from 'vitest';
import {
  BASE_URL,
  buildHreflangAlternates,
  buildLocalizedUrl,
  getLocaleFromPathname,
  isLocalizablePath,
  localizePath,
  stripLocalePrefix,
} from '../i18nRoutes';

describe('i18nRoutes', () => {
  it('extracts locale prefix cleanly from pathnames', () => {
    expect(getLocaleFromPathname('/')).toBeNull();
    expect(getLocaleFromPathname('/korean-name')).toBeNull();
    expect(getLocaleFromPathname('/es')).toBe('es');
    expect(getLocaleFromPathname('/es/')).toBe('es');
    expect(getLocaleFromPathname('/es/korean-name')).toBe('es');
    expect(getLocaleFromPathname('/pt/quiz/which-bts-member-are-you')).toBe('pt');
    expect(getLocaleFromPathname('/ko/chemistry/bts')).toBe('ko');
    expect(getLocaleFromPathname('/espanol')).toBeNull();
    expect(getLocaleFromPathname(null)).toBeNull();
  });

  it('strips locale prefixes while preserving root, query, and hash', () => {
    expect(stripLocalePrefix('/es')).toBe('/');
    expect(stripLocalePrefix('/es/')).toBe('/');
    expect(stripLocalePrefix('/pt/korean-name')).toBe('/korean-name');
    expect(stripLocalePrefix('/ko/map?group=bts#top')).toBe('/map?group=bts#top');
    expect(stripLocalePrefix('/es#quizzes')).toBe('/#quizzes');
    expect(stripLocalePrefix('/quiz/bts-army-trivia')).toBe('/quiz/bts-army-trivia');
  });

  it('distinguishes localizable vs root-only paths', () => {
    expect(isLocalizablePath('/')).toBe(true);
    expect(isLocalizablePath('/korean-name')).toBe(true);
    expect(isLocalizablePath('/es/quiz/which-bts-member-are-you')).toBe(true);
    expect(isLocalizablePath('/chemistry/bts')).toBe(true);
    expect(isLocalizablePath('/map')).toBe(true);
    expect(isLocalizablePath('/map/hybe-yongsan-headquarters')).toBe(true);
    expect(isLocalizablePath('/map/course/bts-seoul-heritage-day')).toBe(true);
    expect(isLocalizablePath('/guide/bts-army-trivia')).toBe(true);

    expect(isLocalizablePath('/about')).toBe(false);
    expect(isLocalizablePath('/privacy')).toBe(false);
    expect(isLocalizablePath('/terms')).toBe(false);
    expect(isLocalizablePath('/record/bts-army-trivia')).toBe(false);
  });

  it('localizes paths across en/es/pt/ko and preserves query/hash & non-localizable routes', () => {
    expect(localizePath('/', 'en')).toBe('/');
    expect(localizePath('/', 'es')).toBe('/es');
    expect(localizePath('/', 'pt')).toBe('/pt');
    expect(localizePath('/', 'ko')).toBe('/ko');

    expect(localizePath('/#quizzes', 'es')).toBe('/es#quizzes');
    expect(localizePath('/es/#quizzes', 'en')).toBe('/#quizzes');
    expect(localizePath('/korean-name', 'pt')).toBe('/pt/korean-name');
    expect(localizePath('/es/korean-name?y=2002&mo=5', 'ko')).toBe('/ko/korean-name?y=2002&mo=5');
    expect(localizePath('/map?group=bts', 'es')).toBe('/es/map?group=bts');
    expect(localizePath('/map/hybe-yongsan-headquarters', 'es')).toBe(
      '/es/map/hybe-yongsan-headquarters'
    );
    expect(localizePath('/map/course/bts-seoul-heritage-day', 'pt')).toBe(
      '/pt/map/course/bts-seoul-heritage-day'
    );

    // Unsupported/non-prefixed language falls back to unprefixed root route
    expect(localizePath('/es/korean-name', 'ru')).toBe('/korean-name');

    // Non-localizable paths stay unprefixed
    expect(localizePath('/about', 'es')).toBe('/about');
    expect(localizePath('/record/bts-army-trivia', 'pt')).toBe('/record/bts-army-trivia');

    // External URLs and bare hashes are untouched
    expect(localizePath('https://x.com/JIlmong', 'es')).toBe('https://x.com/JIlmong');
    expect(localizePath('#ranking', 'ko')).toBe('#ranking');
  });

  it('builds canonical and hreflang alternates accurately', () => {
    expect(buildLocalizedUrl('/', 'en')).toBe(BASE_URL);
    expect(buildLocalizedUrl('/', 'es')).toBe(`${BASE_URL}/es`);
    expect(buildLocalizedUrl('/korean-name', 'pt')).toBe(`${BASE_URL}/pt/korean-name`);

    const alt = buildHreflangAlternates('/quiz/which-blackpink-member-are-you', 'es');
    expect(alt.canonical).toBe(`${BASE_URL}/es/quiz/which-blackpink-member-are-you`);
    expect(alt.languages).toEqual({
      en: `${BASE_URL}/quiz/which-blackpink-member-are-you`,
      es: `${BASE_URL}/es/quiz/which-blackpink-member-are-you`,
      pt: `${BASE_URL}/pt/quiz/which-blackpink-member-are-you`,
      ko: `${BASE_URL}/ko/quiz/which-blackpink-member-are-you`,
      'x-default': `${BASE_URL}/quiz/which-blackpink-member-are-you`,
    });
  });
});
