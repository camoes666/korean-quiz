import { describe, it, expect } from 'vitest';
import { resolveMapGroup, getMapHref, MAP_GROUP_PREVIEW } from '../mapLink';

describe('mapLink helpers', () => {
  it('resolves BTS, BLACKPINK, and Stray Kids slugs, tags, and chemistry groupIds', () => {
    expect(resolveMapGroup({ tag: 'BTS', slug: 'which-bts-member-is-your-soulmate' })).toBe('bts');
    expect(resolveMapGroup({ tag: 'BLACKPINK', slug: 'which-blackpink-member-are-you' })).toBe('blackpink');
    expect(resolveMapGroup({ tag: 'Stray Kids', slug: 'which-stray-kids-member-are-you' })).toBe('stray-kids');
    expect(resolveMapGroup({ groupId: 'bts' })).toBe('bts');
    expect(resolveMapGroup({ groupId: 'blackpink' })).toBe('blackpink');
    expect(resolveMapGroup({ groupId: 'stray-kids' })).toBe('stray-kids');
    expect(resolveMapGroup({ slug: 'bts-army-trivia' })).toBe('bts');
    expect(resolveMapGroup({ slug: 'blackpink-blink-trivia' })).toBe('blackpink');
    expect(resolveMapGroup({ slug: 'stray-kids-stay-trivia' })).toBe('stray-kids');
    expect(resolveMapGroup({ tag: 'skz' })).toBe('stray-kids');
  });

  it('falls back to all for groups without dedicated map pins yet', () => {
    expect(resolveMapGroup({ tag: 'TWICE', slug: 'which-twice-member-are-you' })).toBe('all');
    expect(resolveMapGroup({ tag: 'ENHYPEN', slug: 'which-enhypen-member-are-you' })).toBe('all');
    expect(resolveMapGroup({ tag: 'aespa', slug: 'which-aespa-member-are-you' })).toBe('all');
    expect(resolveMapGroup({ tag: 'Doctor X', slug: 'doctor-x-white-mafia-trivia' })).toBe('all');
    expect(resolveMapGroup({ groupId: 'twice' })).toBe('all');
    expect(resolveMapGroup({})).toBe('all');
  });

  it('builds /map hrefs and exposes valid group previews', () => {
    expect(getMapHref('bts')).toBe('/map?group=bts');
    expect(getMapHref('blackpink')).toBe('/map?group=blackpink');
    expect(getMapHref('stray-kids')).toBe('/map?group=stray-kids');
    expect(getMapHref('all')).toBe('/map');

    expect(MAP_GROUP_PREVIEW.bts.spotCount).toBe(14);
    expect(MAP_GROUP_PREVIEW.blackpink.spotCount).toBe(8);
    expect(MAP_GROUP_PREVIEW['stray-kids'].spotCount).toBe(8);
    expect(MAP_GROUP_PREVIEW.all.spotCount).toBe(30);
  });
});
