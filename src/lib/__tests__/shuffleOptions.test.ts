import { describe, it, expect } from 'vitest';
import type { Question } from '@/types/quiz';
import { shuffleQuestionOptions } from '../shuffleOptions';

const question = {
  id: 1,
  question: 'Q',
  correctAnswer: 'A',
  explanation: '',
  options: [
    { id: 'A', text: 'right', textEs: 'bien' },
    { id: 'B', text: 'wrong1' },
    { id: 'C', text: 'wrong2' },
    { id: 'D', text: 'wrong3' },
  ],
} as Question;

describe('shuffleQuestionOptions', () => {
  it('keeps A–D labels in display order and moves correctAnswer with the right option', () => {
    // random() = 0 always swaps with index 0: [A,B,C,D] -> [B,C,D,A]
    const shuffled = shuffleQuestionOptions(question, () => 0);
    expect(shuffled.options.map((o) => o.id)).toEqual(['A', 'B', 'C', 'D']);
    expect(shuffled.options.map((o) => o.text)).toEqual(['wrong1', 'wrong2', 'wrong3', 'right']);
    expect(shuffled.correctAnswer).toBe('D');
    const correct = shuffled.options.find((o) => o.id === shuffled.correctAnswer);
    expect(correct?.textEs).toBe('bien');
  });

  it('does not mutate the original question', () => {
    shuffleQuestionOptions(question, () => 0);
    expect(question.options[0].text).toBe('right');
    expect(question.correctAnswer).toBe('A');
  });

  it('spreads the correct answer across slots', () => {
    const slots = new Set<string>();
    for (let i = 0; i < 200; i++) slots.add(shuffleQuestionOptions(question).correctAnswer);
    expect(slots).toEqual(new Set(['A', 'B', 'C', 'D']));
  });
});
