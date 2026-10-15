import { describe, it, expect } from 'vitest';
import { getAllQuizzes } from '../../data/quizzes';
import {
  createSeededRandom,
  decodePersonalityPlan,
  encodePersonalityPlan,
  getPersonalityDurationMs,
  getPersonalitySubject,
  getPersonalityWinner,
  planPersonalityRun,
  PERSONALITY_COPY,
} from '../recordMode';

const personalityQuizzes = getAllQuizzes().filter((q) => q.quizType === 'personality');

describe('personality record mode', () => {
  it('can make every member win with 3 or 5 questions', () => {
    expect(personalityQuizzes.length).toBeGreaterThan(0);
    for (const quiz of personalityQuizzes) {
      const questions = quiz.personalityQuestions!;
      const resultIds = Object.keys(quiz.personalityResults!);
      for (const target of resultIds) {
        for (const count of [3, 5]) {
          const plan = planPersonalityRun(questions, resultIds, target, count, createSeededRandom(7));
          expect(plan, `${quiz.slug} ${target} x${count}`).not.toBeNull();
          expect(plan).toHaveLength(count);
          const picked = plan!.map(({ questionId, optionId }) =>
            questions.find((q) => q.id === questionId)!.options.find((o) => o.id === optionId)!
          );
          expect(getPersonalityWinner(resultIds, picked)).toBe(target);
          // Questions stay in the test's own order.
          const order = plan!.map((s) => questions.findIndex((q) => q.id === s.questionId));
          expect([...order].sort((a, b) => a - b)).toEqual(order);
        }
      }
    }
  });

  it('round-trips the plan through the URL', () => {
    const steps = [
      { questionId: 3, optionId: 'B' },
      { questionId: 7, optionId: 'D' },
    ];
    expect(decodePersonalityPlan(encodePersonalityPlan(steps))).toEqual(steps);
  });

  it('times the video: hook 2s, 3.35s per question, calculating, result 4s, outro 3s', () => {
    expect(getPersonalityDurationMs(3)).toBe(2000 + 3 * 3350 + 1200 + 4000 + 3000);
  });

  it('builds the hook per group and language', () => {
    expect(PERSONALITY_COPY.en.hook(getPersonalitySubject('bts', 'K-Pop', 'en'))).toBe('Which BTS member are you? 👀');
    expect(PERSONALITY_COPY.es.hook(getPersonalitySubject('default', 'Food', 'es'))).toBe('¿Qué comida coreana eres? 👀');
  });
});
