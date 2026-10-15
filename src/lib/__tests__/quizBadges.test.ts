import { describe, it, expect } from 'vitest';
import { isNewQuiz } from '../quizBadges';

describe('isNewQuiz', () => {
  it('is new within 14 days of going live', () => {
    expect(isNewQuiz({ addedAt: '2026-10-08' }, '2026-10-08')).toBe(true);
    expect(isNewQuiz({ addedAt: '2026-10-08' }, '2026-10-21')).toBe(true);
  });

  it('stops being new after 14 days', () => {
    expect(isNewQuiz({ addedAt: '2026-10-08' }, '2026-10-22')).toBe(false);
  });

  it('is not new without a date or before it goes live', () => {
    expect(isNewQuiz({}, '2026-10-15')).toBe(false);
    expect(isNewQuiz({ addedAt: '2026-10-08' }, '')).toBe(false);
    expect(isNewQuiz({ addedAt: '2026-10-20' }, '2026-10-15')).toBe(false);
  });
});
