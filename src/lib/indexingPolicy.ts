import type { Metadata } from 'next';
import type { SiteLocale } from './i18nRoutes';

export const SITE_LAST_UPDATED = '2026-11-25';

/**
 * Only index the primary English pages during AdSense review so multi-locale
 * duplicates and <html lang="en"> mismatches do not dilute site quality.
 * Non-indexed locale routes remain live and accessible to visitors.
 */
export const INDEXED_LOCALES: readonly SiteLocale[] = ['en'];

/**
 * Gate thin/templated derivative pages (/map/[slug], /map/course/[slug], /chemistry/[group])
 * out of search indexing during AdSense review while keeping them live for users.
 */
export const INDEX_THIN_DERIVATIVE_PAGES = false;

export type IndexableRouteKind =
  | 'home'
  | 'korean-name'
  | 'map-hub'
  | 'map-spot'
  | 'map-course'
  | 'chemistry-hub'
  | 'chemistry-group'
  | 'quiz'
  | 'guide-hub'
  | 'guide-detail'
  | 'articles-hub'
  | 'article-detail';

const THIN_DERIVATIVE_KINDS = new Set<IndexableRouteKind>([
  'map-spot',
  'map-course',
  'chemistry-group',
]);

export function isRouteIndexable(
  kind: IndexableRouteKind,
  locale: SiteLocale
): boolean {
  if (!INDEXED_LOCALES.includes(locale)) {
    return false;
  }
  if (!INDEX_THIN_DERIVATIVE_PAGES && THIN_DERIVATIVE_KINDS.has(kind)) {
    return false;
  }
  return true;
}

export function getRobotsForRoute(
  kind: IndexableRouteKind,
  locale: SiteLocale
): Metadata['robots'] {
  if (isRouteIndexable(kind, locale)) {
    return undefined;
  }
  return { index: false, follow: true };
}

export function resolveLastModifiedDate(dateStr?: string): Date {
  if (dateStr) {
    const parsed = new Date(dateStr);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return new Date(SITE_LAST_UPDATED);
}
