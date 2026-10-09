import { Quiz, Question } from '@/types/quiz';

export const CHALLENGE_VERSION = 1;
export const CHALLENGE_SALT = 'kpulse-ch-v1-salt';

export interface ChallengeData {
  q: number[]; // question IDs (exactly 5)
  p: number[]; // question points (exactly 5, 0..1000)
  n?: string;  // nickname (0..12 chars)
}

export interface DecodedChallenge {
  version: number;
  questionIds: number[];
  scores: number[];
  nickname: string;
  totalScore: number;
}

interface RawChallengePayload {
  v: number;
  q: number[];
  p: number[];
  n: string;
  h: string;
}

/**
 * 32-bit FNV-1a hash algorithm returning a base36 string.
 * Uses TextEncoder for robust multi-byte UTF-8 hashing across browsers and Node.js.
 */
export function computeFnv1a32Base36(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let hash = 0x811c9dc5;
  for (let i = 0; i < bytes.length; i++) {
    hash ^= bytes[i];
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}

/**
 * Computes verification hash `h` for a challenge payload.
 */
export function computeChallengeHash(
  slug: string,
  version: number,
  q: number[],
  p: number[],
  nickname: string
): string {
  const seed = `${slug}|${version}|${q.join(',')}|${p.join(',')}|${nickname}|${CHALLENGE_SALT}`;
  return computeFnv1a32Base36(seed);
}

/**
 * Converts a UTF-8 string to URL-safe Base64 without padding.
 */
export function toUrlSafeBase64(utf8Str: string): string {
  const bytes = new TextEncoder().encode(utf8Str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Converts a URL-safe Base64 string back to a UTF-8 string.
 */
export function fromUrlSafeBase64(base64UrlStr: string): string {
  let base64 = base64UrlStr.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Encodes challenge data into a URL-safe payload string.
 */
export function encodeChallenge(slug: string, data: ChallengeData): string {
  const v = CHALLENGE_VERSION;
  const q = data.q;
  const p = data.p;
  const n = (data.n || '').trim().slice(0, 12);
  const h = computeChallengeHash(slug, v, q, p, n);

  const payload: RawChallengePayload = { v, q, p, n, h };
  return toUrlSafeBase64(JSON.stringify(payload));
}

/**
 * Decodes and validates a challenge payload string.
 * Returns DecodedChallenge if valid, or null if corrupted, tampered, or mismatched.
 */
export function decodeChallenge(slug: string, payloadStr: string): DecodedChallenge | null {
  if (!payloadStr || typeof payloadStr !== 'string') {
    return null;
  }

  try {
    const jsonStr = fromUrlSafeBase64(payloadStr.trim());
    const data = JSON.parse(jsonStr) as Partial<RawChallengePayload>;

    if (!data || typeof data !== 'object') {
      return null;
    }

    if (data.v !== CHALLENGE_VERSION) {
      return null;
    }

    // Must have exactly 5 positive integer question IDs
    if (!Array.isArray(data.q) || data.q.length !== 5) {
      return null;
    }
    for (const id of data.q) {
      if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
        return null;
      }
    }

    // Must have exactly 5 scores, each integer between 0 and 1000
    if (!Array.isArray(data.p) || data.p.length !== 5) {
      return null;
    }
    for (const score of data.p) {
      if (typeof score !== 'number' || !Number.isInteger(score) || score < 0 || score > 1000) {
        return null;
      }
    }

    // Nickname validation: string, trimmed length <= 12
    if (typeof data.n !== 'string') {
      return null;
    }
    const trimmedNick = data.n.trim();
    if (trimmedNick.length > 12) {
      return null;
    }

    // Hash validation
    if (typeof data.h !== 'string' || !data.h) {
      return null;
    }

    const expectedHash = computeChallengeHash(slug, data.v, data.q, data.p, trimmedNick);
    if (data.h !== expectedHash) {
      return null;
    }

    const totalScore = data.p.reduce((acc, score) => acc + score, 0);

    return {
      version: data.v,
      questionIds: data.q,
      scores: data.p,
      nickname: trimmedNick,
      totalScore,
    };
  } catch {
    return null;
  }
}

/**
 * Resolves question objects for the given question IDs from the quiz bank in matching order.
 * Returns null if any question ID is missing from the quiz or ids length != 5.
 */
export function resolveChallengeQuestions(quiz: Quiz, ids: number[]): Question[] | null {
  if (!quiz || !Array.isArray(quiz.questions) || !Array.isArray(ids) || ids.length !== 5) {
    return null;
  }

  const resolved: Question[] = [];
  for (const id of ids) {
    const question = quiz.questions.find((q) => q.id === id);
    if (!question) {
      return null;
    }
    resolved.push(question);
  }

  return resolved;
}
