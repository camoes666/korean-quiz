export const SAVED_MAP_SPOTS_KEY = 'kpulse_saved_map_spots';
export const VISITED_MAP_SPOTS_KEY = 'kpulse_visited_map_spots';

function safeReadIdList(key: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return Array.from(
      new Set(parsed.filter((item): item is string => typeof item === 'string' && item.length > 0))
    );
  } catch {
    return [];
  }
}

function safeWriteIdList(key: string, ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    const clean = Array.from(
      new Set(ids.filter((item): item is string => typeof item === 'string' && item.length > 0))
    );
    window.localStorage.setItem(key, JSON.stringify(clean));
  } catch {
    // Ignore storage quota / privacy mode errors
  }
}

/**
 * Reads saved (bookmarked) spot IDs from localStorage safely.
 */
export function readSavedSpotIds(): string[] {
  return safeReadIdList(SAVED_MAP_SPOTS_KEY);
}

/**
 * Persists saved (bookmarked) spot IDs to localStorage safely.
 */
export function writeSavedSpotIds(ids: string[]): void {
  safeWriteIdList(SAVED_MAP_SPOTS_KEY, ids);
}

/**
 * Reads visited (pilgrimage stamped) spot IDs from localStorage safely.
 */
export function readVisitedSpotIds(): string[] {
  return safeReadIdList(VISITED_MAP_SPOTS_KEY);
}

/**
 * Persists visited (pilgrimage stamped) spot IDs to localStorage safely.
 */
export function writeVisitedSpotIds(ids: string[]): void {
  safeWriteIdList(VISITED_MAP_SPOTS_KEY, ids);
}
