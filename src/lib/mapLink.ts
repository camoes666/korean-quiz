export type MapTargetGroup = 'bts' | 'blackpink' | 'stray-kids' | 'all';

export interface MapGroupPreview {
  image: string;
  spotCount: number;
  groupName: string;
}

export const MAP_GROUP_PREVIEW: Record<MapTargetGroup, MapGroupPreview> = {
  bts: {
    image: '/images/map/bts-jumunjin-bus-stop/1.webp',
    spotCount: 14,
    groupName: 'BTS',
  },
  blackpink: {
    image: '/images/map/bp-bukchon-hanok/1.webp',
    spotCount: 8,
    groupName: 'BLACKPINK',
  },
  'stray-kids': {
    image: '/images/map/skz-nodeul-island/1.webp',
    spotCount: 8,
    groupName: 'Stray Kids',
  },
  all: {
    image: '/images/map/bp-bukchon-hanok/1.webp',
    spotCount: 30,
    groupName: 'K-Pop',
  },
};

/**
 * Resolves a quiz tag, slug, or chemistry groupId to the supported /map?group=... filter.
 */
export function resolveMapGroup(input: {
  tag?: string;
  slug?: string;
  groupId?: string;
}): MapTargetGroup {
  const candidates = [input.groupId, input.tag, input.slug]
    .filter((v): v is string => typeof v === 'string' && v.trim().length > 0)
    .map((v) => v.toLowerCase());

  for (const val of candidates) {
    if (val === 'bts' || val.includes('bts')) {
      return 'bts';
    }
    if (val === 'blackpink' || val.includes('blackpink')) {
      return 'blackpink';
    }
    if (
      val === 'stray-kids' ||
      val === 'stray kids' ||
      val.includes('stray-kids') ||
      val.includes('stray kids') ||
      val === 'skz' ||
      val.includes('skz')
    ) {
      return 'stray-kids';
    }
  }

  return 'all';
}

/**
 * Builds the internal Next.js href for /map with an optional pre-selected group query param.
 */
export function getMapHref(group: MapTargetGroup): string {
  return group === 'all' ? '/map' : `/map?group=${group}`;
}
