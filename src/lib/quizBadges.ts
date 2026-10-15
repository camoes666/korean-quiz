import type { Quiz } from '@/types/quiz';

// How long a quiz shows the "New" badge after it goes live.
export const NEW_QUIZ_DAYS = 14;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * True while the quiz is within NEW_QUIZ_DAYS of its addedAt date. `today` defaults to the
 * build date (see next.config.ts) so static HTML and the hydrated client agree.
 */
export function isNewQuiz(quiz: Pick<Quiz, 'addedAt'>, today: string = process.env.BUILD_DATE ?? ''): boolean {
  if (!quiz.addedAt || !today) return false;
  const age = Date.parse(today) - Date.parse(quiz.addedAt);
  return age >= 0 && age < NEW_QUIZ_DAYS * DAY_MS;
}
