import type { Language } from './translations';

export const BASE_URL = 'https://kpulsequiz.com';

export const SITE_LOCALES = ['en', 'es', 'pt', 'ko'] as const;
export type SiteLocale = (typeof SITE_LOCALES)[number];

export const PREFIX_LOCALES = ['es', 'pt', 'ko'] as const;
export type PrefixLocale = (typeof PREFIX_LOCALES)[number];

export const OG_LOCALE_MAP: Record<SiteLocale, string> = {
  en: 'en_US',
  es: 'es_ES',
  pt: 'pt_BR',
  ko: 'ko_KR',
};

const PREFIX_SET = new Set<string>(PREFIX_LOCALES);
const SITE_LOCALE_SET = new Set<string>(SITE_LOCALES);

/**
 * Type guard for URL-prefixed locales (`es`, `pt`, `ko`).
 */
export function isPrefixLocale(val: string | null | undefined): val is PrefixLocale {
  return typeof val === 'string' && PREFIX_SET.has(val);
}

/**
 * Type guard for statically generated site locales (`en`, `es`, `pt`, `ko`).
 */
export function isSiteLocale(val: string | null | undefined): val is SiteLocale {
  return typeof val === 'string' && SITE_LOCALE_SET.has(val);
}

/**
 * Normalizes any supported app Language into a SiteLocale (`en` fallback for `ru`/`zh`).
 */
export function toSiteLocale(lang: Language | string | null | undefined): SiteLocale {
  return isSiteLocale(lang) ? lang : 'en';
}

/**
 * Extracts the locale prefix from a URL pathname (`es`, `pt`, `ko`), or `null` for root/English paths.
 */
export function getLocaleFromPathname(pathname: string | null | undefined): PrefixLocale | null {
  if (!pathname) return null;
  const clean = pathname.split('?')[0].split('#')[0];
  const segments = clean.split('/').filter(Boolean);
  if (segments.length > 0 && isPrefixLocale(segments[0])) {
    return segments[0];
  }
  return null;
}

/**
 * Removes any leading `/es`, `/pt`, or `/ko` locale segment from a pathname, returning `'/'` if empty.
 */
export function stripLocalePrefix(pathname: string): string {
  const clean = pathname.trim() || '/';
  const match = clean.match(/^\/(es|pt|ko)(?=\/|$|\?|#)(.*)$/);
  if (!match) {
    return clean.startsWith('/') ? clean : `/${clean}`;
  }
  const rest = match[2];
  if (!rest) return '/';
  if (rest.startsWith('?') || rest.startsWith('#')) {
    return `/${rest}`;
  }
  return rest;
}

/**
 * Checks whether a given internal path has localized static equivalents (`/es/...`, `/pt/...`, `/ko/...`).
 */
export function isLocalizablePath(pathname: string): boolean {
  const pathOnly = stripLocalePrefix(pathname.split('?')[0].split('#')[0]);
  if (pathOnly === '/' || pathOnly === '') return true;
  if (pathOnly === '/korean-name') return true;
  if (pathOnly === '/map' || pathOnly.startsWith('/map/')) return true;
  if (pathOnly === '/chemistry' || pathOnly.startsWith('/chemistry/')) return true;
  if (pathOnly === '/quiz' || pathOnly.startsWith('/quiz/')) return true;
  if (pathOnly === '/guide' || pathOnly.startsWith('/guide/')) return true;
  return false;
}

/**
 * Separates pathname, query string, and hash fragment from an internal path.
 */
function splitPathParts(input: string): { pathname: string; suffix: string } {
  const hashIdx = input.indexOf('#');
  const queryIdx = input.indexOf('?');
  let splitIdx = -1;
  if (queryIdx !== -1 && hashIdx !== -1) {
    splitIdx = Math.min(queryIdx, hashIdx);
  } else if (queryIdx !== -1) {
    splitIdx = queryIdx;
  } else if (hashIdx !== -1) {
    splitIdx = hashIdx;
  }

  if (splitIdx === -1) {
    return { pathname: input || '/', suffix: '' };
  }
  return {
    pathname: input.slice(0, splitIdx) || '/',
    suffix: input.slice(splitIdx),
  };
}

/**
 * Maps an internal path to its localized equivalent for `lang`, preserving `?query` and `#hash`.
 * Non-localizable routes (`/about`, `/privacy`, `/terms`, `/record/...`) and external URLs stay unprefixed.
 */
export function localizePath(path: string, lang: Language): string {
  if (!path) return '/';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  const { pathname, suffix } = splitPathParts(path);
  const basePath = stripLocalePrefix(pathname.startsWith('/') ? pathname : `/${pathname}`);

  if (!isLocalizablePath(basePath)) {
    return `${basePath}${suffix}`;
  }

  if (!isPrefixLocale(lang)) {
    return `${basePath}${suffix}`;
  }

  if (basePath === '/') {
    return `/${lang}${suffix}`;
  }

  return `/${lang}${basePath}${suffix}`;
}

/**
 * Builds the canonical production URL for a base path and locale.
 */
export function buildLocalizedUrl(basePath: string, locale: SiteLocale): string {
  const localized = localizePath(basePath, locale);
  if (localized === '/') {
    return BASE_URL;
  }
  return `${BASE_URL}${localized}`;
}

/**
 * Builds Next.js `alternates` metadata with `canonical` and `hreflang` language map (`en`, `es`, `pt`, `ko`, `x-default`).
 */
export function buildHreflangAlternates(basePath: string, currentLocale: SiteLocale) {
  return {
    canonical: buildLocalizedUrl(basePath, currentLocale),
    languages: {
      en: buildLocalizedUrl(basePath, 'en'),
      es: buildLocalizedUrl(basePath, 'es'),
      pt: buildLocalizedUrl(basePath, 'pt'),
      ko: buildLocalizedUrl(basePath, 'ko'),
      'x-default': buildLocalizedUrl(basePath, 'en'),
    },
  };
}
