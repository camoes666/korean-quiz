export type KPopThemeGroup = 'bts' | 'blackpink' | 'skz' | 'default';

export function getQuizThemeGroup(slug?: string, tag?: string): KPopThemeGroup {
  const normalizedTag = (tag || '').toLowerCase();
  const normalizedSlug = (slug || '').toLowerCase();

  if (normalizedTag.includes('bts') || normalizedSlug.includes('bts')) {
    return 'bts';
  }

  if (normalizedTag.includes('blackpink') || normalizedSlug.includes('blackpink')) {
    return 'blackpink';
  }

  if (
    normalizedTag.includes('stray kids') ||
    normalizedTag.includes('skz') ||
    normalizedSlug.includes('stray-kids') ||
    normalizedSlug.includes('skz')
  ) {
    return 'skz';
  }

  return 'default';
}
