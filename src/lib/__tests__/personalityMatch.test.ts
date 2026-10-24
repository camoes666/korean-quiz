import { describe, it, expect } from 'vitest';
import { getTopMatches } from '../personalityMatch';
import type { PersonalityQuestion } from '@/types/quiz';

const questions: PersonalityQuestion[] = [
  {
    id: 1,
    question: 'q1',
    options: [
      { id: 'A', text: 'a', scores: { jimin: 3, v: 1 } },
      { id: 'B', text: 'b', scores: { v: 3 } },
    ],
  },
  {
    id: 2,
    question: 'q2',
    options: [
      { id: 'A', text: 'a', scores: { jimin: 2 } },
      { id: 'B', text: 'b', scores: { rm: 3, v: 1 } },
    ],
  },
];

describe('getTopMatches', () => {
  it('ranks by score and uses one shared denominator so order matches the winner', () => {
    // Max reachable: jimin 3+2=5, v 3+1=4, rm 0+3=3 -> shared denominator 5.
    const top = getTopMatches(questions, { rm: 3, jimin: 3, v: 2 });
    expect(top).toEqual([
      { id: 'rm', percent: 60 },
      { id: 'jimin', percent: 60 },
      { id: 'v', percent: 40 },
    ]);
  });

  it('gives 100% only for a perfect run and honours the limit', () => {
    expect(getTopMatches(questions, { jimin: 5, v: 1, rm: 0 }, 1)).toEqual([{ id: 'jimin', percent: 100 }]);
  });
});
