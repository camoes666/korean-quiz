import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { MAP_GROUPS, MAP_SPOTS, filterMapSpots } from '../../data/mapSpots';
import { MAP_TRANSLATIONS } from '../mapTranslations';
import { getLocalizedMapText } from '../../types/map';

describe('K-Pop Star Map data & filtering', () => {
  it('contains curated spots for BTS, BLACKPINK, and Stray Kids with unique IDs and slugs', () => {
    expect(MAP_SPOTS.length).toBeGreaterThanOrEqual(24);

    const ids = new Set(MAP_SPOTS.map((s) => s.id));
    const slugs = new Set(MAP_SPOTS.map((s) => s.slug));
    expect(ids.size).toBe(MAP_SPOTS.length);
    expect(slugs.size).toBe(MAP_SPOTS.length);

    expect(MAP_SPOTS.some((s) => s.groupIds.includes('bts'))).toBe(true);
    expect(MAP_SPOTS.some((s) => s.groupIds.includes('blackpink'))).toBe(true);
    expect(MAP_SPOTS.some((s) => s.groupIds.includes('stray-kids'))).toBe(true);
  });

  it('has valid South Korea coordinates and required multilingual fields for every spot', () => {
    for (const spot of MAP_SPOTS) {
      expect(spot.coordinates.lat).toBeGreaterThanOrEqual(33.0);
      expect(spot.coordinates.lat).toBeLessThanOrEqual(38.7);
      expect(spot.coordinates.lng).toBeGreaterThanOrEqual(124.5);
      expect(spot.coordinates.lng).toBeLessThanOrEqual(131.9);

      expect(spot.name.en.trim().length).toBeGreaterThan(0);
      expect(spot.name.ko.trim().length).toBeGreaterThan(0);
      expect((spot.name.pt ?? '').trim().length).toBeGreaterThan(0);
      expect(spot.story.en.trim().length).toBeGreaterThan(0);
      expect(spot.story.ko.trim().length).toBeGreaterThan(0);
      expect((spot.story.pt ?? '').trim().length).toBeGreaterThan(0);
      expect(spot.mapQueries.naver.trim().length).toBeGreaterThan(0);
      expect(spot.mapQueries.kakao.trim().length).toBeGreaterThan(0);
      expect(spot.mapQueries.google.trim().length).toBeGreaterThan(0);

      expect(spot.photos && spot.photos.length).toBeGreaterThan(0);
      if (spot.photos) {
        for (const photo of spot.photos) {
          expect(photo.url.startsWith('/images/map/')).toBe(true);
          const diskPath = path.join(process.cwd(), 'public', photo.url.replace(/^\//, ''));
          expect(fs.existsSync(diskPath)).toBe(true);
          expect(photo.caption.en.trim().length).toBeGreaterThan(0);
          expect(photo.caption.ko.trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('filters spots by group, category, query, and saved state', () => {
    const btsSpots = filterMapSpots({ groupId: 'bts' });
    expect(btsSpots.length).toBeGreaterThan(0);
    expect(btsSpots.every((s) => s.groupIds.includes('bts'))).toBe(true);

    const agencies = filterMapSpots({ category: 'agency' });
    expect(agencies.length).toBe(3); // HYBE, YG, JYP

    const searchHybe = filterMapSpots({ query: 'HYBE' });
    expect(searchHybe.some((s) => s.id === 'bts-hybe-hq')).toBe(true);

    const savedOnly = filterMapSpots({
      savedIds: ['bp-yg-hq', 'skz-jyp-hq'],
      onlySaved: true,
    });
    expect(savedOnly.map((s) => s.id)).toEqual(['bp-yg-hq', 'skz-jyp-hq']);
  });

  it('falls back to English when a localized spot field is missing for a language', () => {
    const sample = MAP_SPOTS[0].name;
    expect(getLocalizedMapText(sample, 'ru')).toBe(sample.en);
    expect(getLocalizedMapText(sample, 'pt')).toBe(sample.pt);
    expect(getLocalizedMapText(sample, 'ko')).toBe(sample.ko);
  });

  it('provides complete UI translations for all 6 supported languages and valid group metadata', () => {
    const langs = ['en', 'ko', 'es', 'pt', 'ru', 'zh'] as const;
    for (const lang of langs) {
      expect(MAP_TRANSLATIONS[lang].title.length).toBeGreaterThan(0);
      expect(MAP_TRANSLATIONS[lang].categories.hometown.length).toBeGreaterThan(0);
      expect(MAP_TRANSLATIONS[lang].categories.restaurant.length).toBeGreaterThan(0);
      expect(MAP_TRANSLATIONS[lang].categories.agency.length).toBeGreaterThan(0);
      expect(MAP_TRANSLATIONS[lang].categories.filming.length).toBeGreaterThan(0);
    }

    expect(Object.keys(MAP_GROUPS)).toEqual(['bts', 'blackpink', 'stray-kids']);
  });
});
