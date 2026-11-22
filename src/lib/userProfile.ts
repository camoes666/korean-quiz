const PROFILE_STORAGE_KEY = 'kpulse_user_profile';

export interface StoredUserProfile {
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
  realName?: string;
  mbti?: string;
  lastKoreanName?: string;
  lastKoreanRomanized?: string;
}

/**
 * Safely reads the shared user profile from localStorage across K-Pulse tools.
 */
export function readUserProfile(): StoredUserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed as StoredUserProfile;
  } catch {
    return null;
  }
}

/**
 * Safely merges partial profile updates into localStorage for cross-feature continuity.
 */
export function saveUserProfile(partial: Partial<StoredUserProfile>): void {
  if (typeof window === 'undefined') return;
  try {
    const current = readUserProfile() || {};
    const next: StoredUserProfile = {
      ...current,
      ...partial,
    };
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage quota or private mode errors
  }
}
