import { describe, it, expect } from 'vitest';
import { getAllQuizzes, getRelatedQuizzes } from '../../data/quizzes';

describe('getRelatedQuizzes', () => {
  it('recommends 4 distinct K-Pop personality tests without Doctor X or duplicate trivia for K-Pop personality quizzes', () => {
    for (const slug of [
      'which-blackpink-member-are-you',
      'which-stray-kids-member-are-you',
      'which-twice-member-are-you',
    ]) {
      const related = getRelatedQuizzes(slug, 4);
      expect(related).toHaveLength(4);
      expect(related.every((q) => q.slug !== slug)).toBe(true);
      expect(related.every((q) => q.category === 'K-Pop')).toBe(true);
      expect(related.every((q) => q.quizType === 'personality')).toBe(true);
      expect(related.some((q) => q.tag === 'Doctor X')).toBe(false);
    }
  });

  it('links the two BTS personality tests first', () => {
    const related = getRelatedQuizzes('which-bts-member-are-you', 4);
    expect(related[0]?.slug).toBe('which-bts-member-is-your-soulmate');
    expect(related.every((q) => q.category === 'K-Pop' && q.quizType === 'personality')).toBe(true);
  });

  it('links same-tag personality quiz first from a trivia quiz', () => {
    const related = getRelatedQuizzes('blackpink-blink-trivia', 4);
    expect(related[0]?.slug).toBe('which-blackpink-member-are-you');
  });

  it('excludes any slugs passed in excludeSlugs', () => {
    const related = getRelatedQuizzes('which-doctor-x-character-are-you', 5, [
      'doctor-x-white-mafia-trivia',
    ]);
    expect(related).toHaveLength(5);
    expect(related.some((q) => q.slug === 'doctor-x-white-mafia-trivia')).toBe(false);
  });

  it('returns 5 unique, non-self quizzes for every quiz in the catalog', () => {
    const all = getAllQuizzes();
    for (const quiz of all) {
      const related = getRelatedQuizzes(quiz.slug, 5);
      expect(related, quiz.slug).toHaveLength(5);
      expect(related.some((q) => q.slug === quiz.slug), quiz.slug).toBe(false);
      const uniqueSlugs = new Set(related.map((q) => q.slug));
      expect(uniqueSlugs.size, quiz.slug).toBe(5);
    }
  });
});
