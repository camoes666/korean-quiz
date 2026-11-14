import { Language } from '../lib/translations';

export type GroupId = 'bts' | 'blackpink' | 'stray-kids';

export type SpotCategory = 'hometown' | 'restaurant' | 'agency' | 'filming';

export type SpotStatus = 'verified' | 'closed' | 'relocated';

export type MapRegion =
  | 'seoul'
  | 'busan'
  | 'daegu'
  | 'gyeonggi'
  | 'incheon'
  | 'gangwon'
  | 'other';

export interface LocalizedMapText {
  en: string;
  ko: string;
  es?: string;
  pt?: string;
  ru?: string;
  zh?: string;
}

export interface GroupMeta {
  id: GroupId;
  name: string;
  fandom: string;
  color: string;       // Hex color for map markers & badges
  badgeBg: string;     // Tailwind class
  badgeText: string;   // Tailwind class
  emoji: string;
  relatedQuizSlug: string;
  relatedGuideSlug: string;
}

export interface SpotPhoto {
  url: string;
  caption: LocalizedMapText;
  credit?: string;
  kind?: 'exterior' | 'food' | 'interior' | 'filming' | 'landmark';
}

export interface MapSpot {
  id: string;
  slug: string;
  groupIds: GroupId[];
  memberNames: string[];
  category: SpotCategory;
  region: MapRegion;
  name: LocalizedMapText;
  district: LocalizedMapText;
  address: LocalizedMapText;
  story: LocalizedMapText;
  recommendedTip?: LocalizedMapText;
  sourceNote: LocalizedMapText;
  photos?: SpotPhoto[];
  youtubeEmbedId?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: SpotStatus;
  lastVerifiedAt: string; // YYYY-MM-DD
  mapQueries: {
    naver: string;
    kakao: string;
    google: string;
  };
}

export function getLocalizedMapText(
  text: LocalizedMapText | undefined,
  lang: Language
): string {
  if (!text) return '';
  return text[lang] || text.en || text.ko || '';
}
