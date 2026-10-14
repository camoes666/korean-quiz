import { describe, it, expect } from 'vitest';
import type { Question } from '@/types/quiz';
import {
  createSeededRandom,
  getAvailableRecordLangs,
  getRecordAudience,
  getRecordDurationMs,
  getRecordText,
  pickRecordQuestions,
  RECORD_COPY,
  RECORD_TIMER_SEC,
} from '../recordMode';

function makeQuestion(id: number, level: 1 | 2 | 3, langs: string[] = ['', 'Es']): Question {
  const q: Record<string, unknown> = {
    id,
    level,
    correctAnswer: 'A',
    explanation: '',
    options: ['A', 'B'].map((oid) => {
      const o: Record<string, unknown> = { id: oid };
      for (const s of langs) o[`text${s}`] = `${oid}${s}`;
      return o;
    }),
  };
  for (const s of langs) q[`question${s}`] = `Q${id}${s}`;
  return q as unknown as Question;
}

const pool = [
  ...[1, 2, 3, 4].map((i) => makeQuestion(i, 1)),
  ...[5, 6, 7, 8].map((i) => makeQuestion(i, 2)),
  ...[9, 10].map((i) => makeQuestion(i, 3)),
];

describe('recordMode', () => {
  it('picks 5 questions ordered easy → hard without duplicates', () => {
    const picked = pickRecordQuestions(pool, 5);
    expect(picked.map((q) => q.level)).toEqual([1, 1, 2, 2, 3]);
    expect(new Set(picked.map((q) => q.id)).size).toBe(5);
  });

  it('picks the same questions for the same seed (server and client agree)', () => {
    const a = pickRecordQuestions(pool, 5, createSeededRandom(5)).map((q) => q.id);
    const b = pickRecordQuestions(pool, 5, createSeededRandom(5)).map((q) => q.id);
    expect(a).toEqual(b);
  });

  it('picks 3 questions as one per level', () => {
    expect(pickRecordQuestions(pool, 3).map((q) => q.level)).toEqual([1, 2, 3]);
  });

  it('falls back to other levels when a level runs out', () => {
    const easyOnly = [1, 2, 3, 4, 5].map((i) => makeQuestion(i, 1));
    expect(pickRecordQuestions(easyOnly, 5)).toHaveLength(5);
  });

  it('only offers languages with enough translated questions', () => {
    expect(getAvailableRecordLangs(pool)).toEqual(['en', 'es']);
    const withPt = [1, 2, 3, 4, 5].map((i) => makeQuestion(i, 1, ['', 'Es', 'Pt']));
    expect(getAvailableRecordLangs(withPt)).toEqual(['en', 'es', 'pt']);
  });

  it('reads localized text without falling back to another language', () => {
    const q = makeQuestion(1, 1);
    expect(getRecordText(q, 'question', 'es')).toBe('Q1Es');
    expect(getRecordText(q, 'question', 'pt')).toBe('');
  });

  it('runs a fixed timeline: hook 2s, 5s per question, outro 3s', () => {
    expect(getRecordDurationMs(5)).toBe(30000);
    expect(getRecordDurationMs(3)).toBe(20000);
    expect(RECORD_TIMER_SEC).toBe(4);
  });

  it('builds hook and outro copy per language', () => {
    expect(RECORD_COPY.en.hook(getRecordAudience('skz', 'K-Pop', 'en'), 5)).toBe('Only real STAYs get 5/5 👀');
    expect(RECORD_COPY.es.hook(getRecordAudience('skz', 'K-Pop', 'es'), 3)).toBe('Solo los verdaderos STAY sacan 3/3 👀');
    expect(RECORD_COPY.en.outroCta(60)).toBe('60 more questions → link in bio');
  });

  it('challenges the right audience for quizzes that are not about one group', () => {
    expect(getRecordAudience('default', 'Food', 'en')).toBe('K-food lovers');
    expect(getRecordAudience('default', 'K-Drama', 'es')).toBe('fans de los K-dramas');
    expect(getRecordAudience('default', 'K-Pop', 'pt')).toBe('fãs de K-pop');
    expect(getRecordAudience('default', 'Culture', 'en')).toBe('Korea lovers');
  });
});
