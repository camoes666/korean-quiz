import type { PersonalityQuestion } from '@/types/quiz';

export interface MatchPercent {
  id: string;
  percent: number;
}

/**
 * Top results with a score-based match percentage for the share card.
 *
 * Every member is measured against the same denominator (the highest total any single
 * member can reach), so the percentages keep the same order as the raw scores that pick
 * the winner. Ties keep the scores object's insertion order, matching the runner's pick.
 */
export function getTopMatches(
  questions: PersonalityQuestion[],
  scores: Record<string, number>,
  limit = 3
): MatchPercent[] {
  const ids = Object.keys(scores);
  const maxPossible = Math.max(
    1,
    ...ids.map((id) =>
      questions.reduce((sum, q) => sum + Math.max(0, ...q.options.map((o) => o.scores[id] ?? 0)), 0)
    )
  );
  return ids
    .map((id, order) => ({ id, order, score: scores[id] ?? 0 }))
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, limit)
    .map(({ id, score }) => ({ id, percent: Math.round((100 * score) / maxPossible) }));
}
