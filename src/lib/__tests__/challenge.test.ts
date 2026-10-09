import { describe, it, expect } from 'vitest';
import {
  encodeChallenge,
  decodeChallenge,
  resolveChallengeQuestions,
  computeChallengeHash,
  toUrlSafeBase64,
  fromUrlSafeBase64,
  CHALLENGE_VERSION,
} from '../challenge';
import { Quiz, Question } from '@/types/quiz';

describe('challenge.ts', () => {
  const dummySlug = 'bts-army-trivia';
  const validData = {
    q: [101, 102, 103, 104, 105],
    p: [900, 850, 1000, 500, 750],
    n: 'Minji',
  };

  describe('Base64 URL-safe conversion', () => {
    it('round trips ASCII and unicode strings', () => {
      const original = 'Hello World! 💜 안녕 민지야 🐯';
      const encoded = toUrlSafeBase64(original);
      expect(encoded).not.toContain('+');
      expect(encoded).not.toContain('/');
      expect(encoded).not.toContain('=');
      const decoded = fromUrlSafeBase64(encoded);
      expect(decoded).toBe(original);
    });
  });

  describe('encodeChallenge & decodeChallenge', () => {
    it('successfully round trips valid challenge data', () => {
      const payload = encodeChallenge(dummySlug, validData);
      expect(typeof payload).toBe('string');
      expect(payload.length).toBeGreaterThan(0);

      const decoded = decodeChallenge(dummySlug, payload);
      expect(decoded).not.toBeNull();
      expect(decoded?.version).toBe(CHALLENGE_VERSION);
      expect(decoded?.questionIds).toEqual(validData.q);
      expect(decoded?.scores).toEqual(validData.p);
      expect(decoded?.nickname).toBe('Minji');
      expect(decoded?.totalScore).toBe(4000); // 900+850+1000+500+750
    });

    it('correctly handles Korean and emoji nicknames', () => {
      const dataWithUnicode = {
        q: [1, 2, 3, 4, 5],
        p: [1000, 1000, 1000, 1000, 1000],
        n: '💜민지_BTS짱🐯',
      };
      const payload = encodeChallenge(dummySlug, dataWithUnicode);
      const decoded = decodeChallenge(dummySlug, payload);
      expect(decoded).not.toBeNull();
      expect(decoded?.nickname).toBe('💜민지_BTS짱🐯');
      expect(decoded?.totalScore).toBe(5000);
    });

    it('handles empty or whitespace nickname by trimming', () => {
      const data = {
        q: [1, 2, 3, 4, 5],
        p: [500, 500, 500, 500, 500],
        n: '   ',
      };
      const payload = encodeChallenge(dummySlug, data);
      const decoded = decodeChallenge(dummySlug, payload);
      expect(decoded?.nickname).toBe('');
    });

    it('rejects tampered scores (p modified)', () => {
      const payload = encodeChallenge(dummySlug, validData);
      // Manually parse and modify payload
      const json = JSON.parse(fromUrlSafeBase64(payload));
      json.p[0] = 1000; // change 900 to 1000 without updating hash
      const tamperedPayload = toUrlSafeBase64(JSON.stringify(json));

      const decoded = decodeChallenge(dummySlug, tamperedPayload);
      expect(decoded).toBeNull();
    });

    it('rejects payload when opened under a different quiz slug', () => {
      const payload = encodeChallenge('bts-army-trivia', validData);
      const decoded = decodeChallenge('blackpink-blink-trivia', payload);
      expect(decoded).toBeNull();
    });

    it('rejects invalid or corrupted base64 and JSON', () => {
      expect(decodeChallenge(dummySlug, 'invalid@@base64')).toBeNull();
      expect(decodeChallenge(dummySlug, toUrlSafeBase64('not a json object'))).toBeNull();
      expect(decodeChallenge(dummySlug, '')).toBeNull();
    });

    it('rejects unsupported version (v != 1)', () => {
      const json = {
        v: 2,
        q: [1, 2, 3, 4, 5],
        p: [500, 500, 500, 500, 500],
        n: 'Test',
        h: 'somehash',
      };
      const payload = toUrlSafeBase64(JSON.stringify(json));
      expect(decodeChallenge(dummySlug, payload)).toBeNull();
    });

    it('rejects invalid question counts or invalid IDs', () => {
      // 4 questions instead of 5
      const json4 = {
        v: 1,
        q: [1, 2, 3, 4],
        p: [500, 500, 500, 500],
        n: 'Test',
        h: 'somehash',
      };
      expect(decodeChallenge(dummySlug, toUrlSafeBase64(JSON.stringify(json4)))).toBeNull();

      // Negative or float ID
      const jsonBadId = {
        v: 1,
        q: [1, 2, 3, 4, -5],
        p: [500, 500, 500, 500, 500],
        n: 'Test',
        h: computeChallengeHash(dummySlug, 1, [1, 2, 3, 4, -5], [500, 500, 500, 500, 500], 'Test'),
      };
      expect(decodeChallenge(dummySlug, toUrlSafeBase64(JSON.stringify(jsonBadId)))).toBeNull();
    });

    it('rejects out-of-range scores (< 0 or > 1000 or float)', () => {
      // Score > 1000
      const badScore = [1200, 500, 500, 500, 500];
      const badHash = computeChallengeHash(dummySlug, 1, [1, 2, 3, 4, 5], badScore, 'Test');
      const payloadOver = toUrlSafeBase64(
        JSON.stringify({ v: 1, q: [1, 2, 3, 4, 5], p: badScore, n: 'Test', h: badHash })
      );
      expect(decodeChallenge(dummySlug, payloadOver)).toBeNull();

      // Negative score
      const badScoreNeg = [-10, 500, 500, 500, 500];
      const badHashNeg = computeChallengeHash(dummySlug, 1, [1, 2, 3, 4, 5], badScoreNeg, 'Test');
      const payloadNeg = toUrlSafeBase64(
        JSON.stringify({ v: 1, q: [1, 2, 3, 4, 5], p: badScoreNeg, n: 'Test', h: badHashNeg })
      );
      expect(decodeChallenge(dummySlug, payloadNeg)).toBeNull();
    });
  });

  describe('resolveChallengeQuestions', () => {
    const mockQuestions: Question[] = [
      { id: 10, question: 'Q10', options: [], correctAnswer: 'A', explanation: '' },
      { id: 20, question: 'Q20', options: [], correctAnswer: 'B', explanation: '' },
      { id: 30, question: 'Q30', options: [], correctAnswer: 'C', explanation: '' },
      { id: 40, question: 'Q40', options: [], correctAnswer: 'D', explanation: '' },
      { id: 50, question: 'Q50', options: [], correctAnswer: 'A', explanation: '' },
      { id: 60, question: 'Q60', options: [], correctAnswer: 'B', explanation: '' },
    ];

    const mockQuiz = {
      slug: dummySlug,
      title: 'Mock Quiz',
      questions: mockQuestions,
    } as unknown as Quiz;

    it('resolves questions in the specified order', () => {
      const ids = [50, 10, 40, 20, 30];
      const resolved = resolveChallengeQuestions(mockQuiz, ids);
      expect(resolved).not.toBeNull();
      expect(resolved?.map((q) => q.id)).toEqual([50, 10, 40, 20, 30]);
    });

    it('returns null if any ID does not exist in quiz questions', () => {
      const ids = [10, 20, 999, 40, 50]; // 999 does not exist
      expect(resolveChallengeQuestions(mockQuiz, ids)).toBeNull();
    });

    it('returns null if question count is not exactly 5', () => {
      expect(resolveChallengeQuestions(mockQuiz, [10, 20, 30])).toBeNull();
      expect(resolveChallengeQuestions(mockQuiz, [10, 20, 30, 40, 50, 60])).toBeNull();
    });
  });
});
