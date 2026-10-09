export const QUESTION_TIME_SEC = 15;
export const MAX_POINTS_PER_QUESTION = 1000;
export const MAX_QUESTIONS_PER_CHALLENGE = 5;
export const MAX_TOTAL_POINTS = QUESTION_TIME_SEC * 0 + MAX_POINTS_PER_QUESTION * MAX_QUESTIONS_PER_CHALLENGE; // 5000

export interface ScoringInput {
  correct: boolean;
  remainingSec: number;
  usedAssist?: boolean;
}

/**
 * Calculates points for a single question based on speed and assist usage.
 *
 * Rules:
 * - If incorrect: 0 pts.
 * - Base correct formula: round(500 + 500 * (min(remainingSec, 15) / 15))
 * - remainingSec clamped to [0, 15] (power-up extension beyond 15s does not exceed 1000 pts)
 * - If 50:50 or hint was used on this question: round(points / 2)
 */
export function calcQuestionPoints({
  correct,
  remainingSec,
  usedAssist = false,
}: ScoringInput): number {
  if (!correct) {
    return 0;
  }

  const clampedSec = Math.min(Math.max(0, remainingSec), QUESTION_TIME_SEC);
  let pts = Math.round(500 + 500 * (clampedSec / QUESTION_TIME_SEC));

  if (usedAssist) {
    pts = Math.round(pts / 2);
  }

  return pts;
}

/**
 * Calculates sum of points across question scores.
 */
export function calcTotalPoints(scores: number[]): number {
  return scores.reduce((sum, pts) => sum + pts, 0);
}
