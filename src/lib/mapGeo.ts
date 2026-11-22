import { MAP_SPOTS } from '../data/mapSpots';
import type { GroupId, MapSpot } from '../types/map';

const EARTH_RADIUS_KM = 6371;

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Looks up a verified spot by its URL slug.
 */
export function getSpotBySlug(slug: string): MapSpot | undefined {
  return MAP_SPOTS.find((spot) => spot.slug === slug);
}

/**
 * Looks up a verified spot by its internal ID.
 */
export function getSpotById(id: string): MapSpot | undefined {
  return MAP_SPOTS.find((spot) => spot.id === id);
}

/**
 * Computes the great-circle Haversine distance in kilometers rounded to 1 decimal place.
 */
export function calculateDistanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h =
    sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLng * sinLng;
  const km = 2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return Math.round(km * 10) / 10;
}

/**
 * Finds nearby K-Pop spots sorted by distance; guarantees useful cross-links even for regional spots.
 */
export function getNearbySpots(
  spot: MapSpot,
  options?: { maxDistanceKm?: number; limit?: number }
): Array<{ spot: MapSpot; distanceKm: number }> {
  const maxDistanceKm = options?.maxDistanceKm ?? 8;
  const limit = options?.limit ?? 4;

  const withDistance = MAP_SPOTS.filter((candidate) => candidate.id !== spot.id).map(
    (candidate) => ({
      spot: candidate,
      distanceKm: calculateDistanceKm(spot.coordinates, candidate.coordinates),
    })
  );

  const withinRadius = withDistance
    .filter((entry) => entry.distanceKm <= maxDistanceKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  if (withinRadius.length >= 2) {
    return withinRadius.slice(0, limit);
  }

  const pickedIds = new Set(withinRadius.map((entry) => entry.spot.id));
  const fallbackCandidates = withDistance
    .filter((entry) => !pickedIds.has(entry.spot.id))
    .sort((a, b) => {
      const aSameGroup = a.spot.groupIds.some((g) => spot.groupIds.includes(g)) ? 0 : 1;
      const bSameGroup = b.spot.groupIds.some((g) => spot.groupIds.includes(g)) ? 0 : 1;
      const aSameRegion = a.spot.region === spot.region ? 0 : 1;
      const bSameRegion = b.spot.region === spot.region ? 0 : 1;

      if (aSameRegion !== bSameRegion) return aSameRegion - bSameRegion;
      if (aSameGroup !== bSameGroup) return aSameGroup - bSameGroup;
      return a.distanceKm - b.distanceKm;
    });

  return [...withinRadius, ...fallbackCandidates].slice(0, limit);
}

/**
 * Returns verified spots associated with an idol member, backfilling with group spots if needed.
 */
export function getSpotsForMember(
  memberName: string,
  groupId?: GroupId,
  limit = 3
): MapSpot[] {
  const normalizedTokens = memberName
    .toLowerCase()
    .split(/\s+/)
    .map((token) => token.replace(/[^a-z0-9가-힣-]/g, ''))
    .filter((token) => token.length >= 2);

  const pool = groupId
    ? MAP_SPOTS.filter((spot) => spot.groupIds.includes(groupId))
    : MAP_SPOTS;

  const memberMatched = pool.filter((spot) => {
    const memberField = spot.memberNames.join(' ').toLowerCase();
    const textField = `${spot.name.en} ${spot.name.ko} ${spot.story.en}`.toLowerCase();
    return normalizedTokens.some(
      (token) => memberField.includes(token) || textField.includes(token)
    );
  });

  if (memberMatched.length >= limit) {
    return memberMatched.slice(0, limit);
  }

  const pickedIds = new Set(memberMatched.map((spot) => spot.id));
  const backfill = pool.filter((spot) => !pickedIds.has(spot.id));
  return [...memberMatched, ...backfill].slice(0, limit);
}

/**
 * Builds direct Naver Map, KakaoMap, and Google Maps search URLs for a spot.
 */
export function getSpotNavigationLinks(spot: MapSpot): {
  naver: string;
  kakao: string;
  google: string;
} {
  return {
    naver: `https://map.naver.com/p/search/${encodeURIComponent(spot.mapQueries.naver)}`,
    kakao: `https://map.kakao.com/link/search/${encodeURIComponent(spot.mapQueries.kakao)}`,
    google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.mapQueries.google)}`,
  };
}
