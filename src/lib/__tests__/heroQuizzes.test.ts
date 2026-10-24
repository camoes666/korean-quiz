import { describe, it, expect } from 'vitest';
import { getHeroQuizzes } from '../../data/quizzes';

describe('getHeroQuizzes', () => {
  it('resolves every hero slide to a real personality quiz, in display order', () => {
    const slides = getHeroQuizzes();
    expect(slides.map((s) => s.quiz.slug)).toEqual([
      'which-bts-member-is-your-soulmate',
      'which-stray-kids-member-are-you',
      'which-blackpink-member-are-you',
    ]);
    expect(slides.every((s) => s.quiz.quizType === 'personality')).toBe(true);
    expect(slides.map((s) => s.badge)).toEqual(['new', 'trending', 'featured']);
  });
});
