import { describe, it, expect } from 'vitest';
import {
  calcQuestionPoints,
  calcTotalPoints,
  QUESTION_TIME_SEC,
  MAX_POINTS_PER_QUESTION,
  MAX_TOTAL_POINTS,
} from '../scoring';

describe('scoring.ts', () => {
  describe('constants', () => {
    it('has correct standard constants', () => {
      expect(QUESTION_TIME_SEC).toBe(15);
      expect(MAX_POINTS_PER_QUESTION).toBe(1000);
      expect(MAX_TOTAL_POINTS).toBe(5000);
    });
  });

  describe('calcQuestionPoints', () => {
    it('awards 1000 points for correct answer with full 15s remaining', () => {
      const pts = calcQuestionPoints({ correct: true, remainingSec: 15 });
      expect(pts).toBe(1000);
    });

    it('awards 500 base points for correct answer with 0s remaining', () => {
      const pts = calcQuestionPoints({ correct: true, remainingSec: 0 });
      expect(pts).toBe(500);
    });

    it('awards 0 points for incorrect answer regardless of remaining time', () => {
      expect(calcQuestionPoints({ correct: false, remainingSec: 15 })).toBe(0);
      expect(calcQuestionPoints({ correct: false, remainingSec: 8.5 })).toBe(0);
      expect(calcQuestionPoints({ correct: false, remainingSec: 0 })).toBe(0);
    });

    it('halves points when assist (50:50 or hint) was used', () => {
      // 1000 / 2 = 500
      expect(calcQuestionPoints({ correct: true, remainingSec: 15, usedAssist: true })).toBe(500);
      // 500 / 2 = 250
      expect(calcQuestionPoints({ correct: true, remainingSec: 0, usedAssist: true })).toBe(250);
      // 7.5s: 500 + 500 * 0.5 = 750 -> 750 / 2 = 375
      expect(calcQuestionPoints({ correct: true, remainingSec: 7.5, usedAssist: true })).toBe(375);
    });

    it('caps remaining time at 15s when +10s extension exceeds 15s', () => {
      // e.g. 22s remaining due to power-up: should still be capped at 15s (1000 pts)
      expect(calcQuestionPoints({ correct: true, remainingSec: 22 })).toBe(1000);
      expect(calcQuestionPoints({ correct: true, remainingSec: 18, usedAssist: true })).toBe(500);
    });

    it('clamps negative remaining seconds to 0', () => {
      expect(calcQuestionPoints({ correct: true, remainingSec: -2 })).toBe(500);
    });

    it('correctly rounds floating point score values', () => {
      // 7.3s: 500 + 500 * (7.3 / 15) = 743.3333... -> 743
      expect(calcQuestionPoints({ correct: true, remainingSec: 7.3 })).toBe(743);
      // 7.3s with assist: 743 / 2 = 371.5 -> 372
      expect(calcQuestionPoints({ correct: true, remainingSec: 7.3, usedAssist: true })).toBe(372);
      // 10.0s: 500 + 500 * (10 / 15) = 833.3333... -> 833
      expect(calcQuestionPoints({ correct: true, remainingSec: 10 })).toBe(833);
    });
  });

  describe('calcTotalPoints', () => {
    it('calculates the sum of points correctly', () => {
      expect(calcTotalPoints([1000, 870, 0, 500, 450])).toBe(2820);
      expect(calcTotalPoints([1000, 1000, 1000, 1000, 1000])).toBe(5000);
      expect(calcTotalPoints([])).toBe(0);
    });
  });
});
