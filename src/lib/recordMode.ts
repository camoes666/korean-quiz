import type { PersonalityOption, PersonalityQuestion, Question } from '@/types/quiz';

/**
 * Record Mode: auto-playing quiz sequence designed for short-form video capture
 * (TikTok / Shorts / Reels). Timing is fixed so sound effects can be placed once
 * in a CapCut template and reused for every recording.
 */

export const RECORD_QUESTION_COUNTS = [3, 5] as const;
export type RecordQuestionCount = (typeof RECORD_QUESTION_COUNTS)[number];

// To add a language: add its code here and a RECORD_COPY entry below.
// It becomes selectable for a quiz once that quiz's questions carry the matching
// `question<Suffix>` / `text<Suffix>` fields (e.g. questionPt / textPt). Because the video
// shows the real quiz page, the site itself also needs that Language in translations.ts.
export const RECORD_LANGS = ['en', 'es', 'pt'] as const;
export type RecordLang = (typeof RECORD_LANGS)[number];

export const RECORD_TIMING = {
  hookMs: 2000,
  questionMs: 1000,
  countdownMs: 3000,
  revealMs: 1000,
  outroMs: 3000,
} as const;

// The quiz timer shown in the video: 1s to read, then 3, 2, 1 before the answer appears.
export const RECORD_TIMER_SEC = (RECORD_TIMING.questionMs + RECORD_TIMING.countdownMs) / 1000;

// postMessage protocol between /record/[slug] and the embedded /quiz/[slug]?record=... page.
export const RECORD_MESSAGE = {
  ready: 'kpulse-record-ready',
  start: 'kpulse-record-start',
  question: 'kpulse-record-question',
  done: 'kpulse-record-done',
} as const;

export interface RecordCopy {
  label: string;
  hook: (fandom: string, count: number) => string;
  outroQuestion: string;
  outroCta: (totalQuestions: number) => string;
}

export const RECORD_COPY: Record<RecordLang, RecordCopy> = {
  en: {
    label: 'English',
    hook: (fandom, count) => `Only real ${fandom} get ${count}/${count} 👀`,
    outroQuestion: 'How many did you get? Comment ⬇️',
    outroCta: (total) => `${total} more questions → link in bio`,
  },
  es: {
    label: 'Español',
    hook: (fandom, count) => `Solo los verdaderos ${fandom} sacan ${count}/${count} 👀`,
    outroQuestion: '¿Cuántas acertaste? Comenta ⬇️',
    outroCta: (total) => `${total} preguntas más → link en la bio`,
  },
  pt: {
    label: 'Português',
    hook: (fandom, count) => `Só os verdadeiros ${fandom} acertam ${count}/${count} 👀`,
    outroQuestion: 'Quantas você acertou? Comenta ⬇️',
    outroCta: (total) => `Mais ${total} perguntas → link na bio`,
  },
};

export function isRecordLang(value: unknown): value is RecordLang {
  return typeof value === 'string' && (RECORD_LANGS as readonly string[]).includes(value);
}

export function isRecordQuestionCount(value: unknown): value is RecordQuestionCount {
  return (RECORD_QUESTION_COUNTS as readonly number[]).includes(Number(value));
}

function suffixed(prop: string, lang: RecordLang): string {
  return lang === 'en' ? prop : `${prop}${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;
}

/** Strict lookup: no fallback to other languages, so a video never mixes languages. */
export function getRecordText(item: object, prop: string, lang: RecordLang): string {
  const value = (item as Record<string, unknown>)[suffixed(prop, lang)];
  return typeof value === 'string' ? value : '';
}

type AnyQuestion = { question: string; options: object[] };

export function isQuestionTranslated(question: AnyQuestion, lang: RecordLang): boolean {
  return (
    getRecordText(question, 'question', lang) !== '' &&
    question.options.every((option) => getRecordText(option, 'text', lang) !== '')
  );
}

export function getTranslatedQuestions<Q extends AnyQuestion>(questions: Q[], lang: RecordLang): Q[] {
  return questions.filter((q) => isQuestionTranslated(q, lang));
}

/** Languages with enough fully translated questions to fill the largest video. */
export function getAvailableRecordLangs(questions: AnyQuestion[]): RecordLang[] {
  const needed = Math.max(...RECORD_QUESTION_COUNTS);
  return RECORD_LANGS.filter((lang) => getTranslatedQuestions(questions, lang).length >= needed);
}

const LEVEL_PLAN: Record<RecordQuestionCount, number[]> = {
  3: [1, 2, 3],
  5: [1, 1, 2, 2, 3],
};

/**
 * Picks questions ordered easy → hard so viewers keep watching.
 * Falls back to any remaining question when a level runs out.
 */
export function pickRecordQuestions(
  pool: Question[],
  count: RecordQuestionCount,
  random: () => number = Math.random
): Question[] {
  const remaining = [...pool];
  const take = (predicate: (q: Question) => boolean): Question | undefined => {
    const candidates = remaining.filter(predicate);
    if (candidates.length === 0) return undefined;
    const chosen = candidates[Math.floor(random() * candidates.length)];
    remaining.splice(remaining.indexOf(chosen), 1);
    return chosen;
  };

  const picked: Question[] = [];
  for (const level of LEVEL_PLAN[count]) {
    const q = take((x) => (x.level ?? 2) === level) ?? take(() => true);
    if (q) picked.push(q);
  }
  return picked;
}

/** Deterministic PRNG (mulberry32) so server and client render the same first pick. */
export function createSeededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getRecordDurationMs(count: number): number {
  const { hookMs, questionMs, countdownMs, revealMs, outroMs } = RECORD_TIMING;
  return hookMs + count * (questionMs + countdownMs + revealMs) + outroMs;
}

const FANDOM_BY_GROUP: Record<string, string> = {
  bts: 'ARMY',
  blackpink: 'BLINKs',
  skz: 'STAYs',
};

// Who the hook challenges when the quiz isn't about one group ("Only real ___ get 5/5").
const AUDIENCE_BY_CATEGORY: Record<string, Record<RecordLang, string>> = {
  'K-Pop': { en: 'K-pop fans', es: 'fans del K-pop', pt: 'fãs de K-pop' },
  'K-Drama': { en: 'K-drama fans', es: 'fans de los K-dramas', pt: 'fãs de K-drama' },
  Food: { en: 'K-food lovers', es: 'amantes de la comida coreana', pt: 'amantes da comida coreana' },
};

const AUDIENCE_FALLBACK: Record<RecordLang, string> = {
  en: 'Korea lovers',
  es: 'amantes de Corea',
  pt: 'amantes da Coreia',
};

export function getRecordAudience(themeGroup: string, category: string, lang: RecordLang): string {
  const fandom = FANDOM_BY_GROUP[themeGroup];
  if (fandom) {
    // Spanish/Portuguese copy reads "los verdaderos STAY", without the English plural "s".
    return lang === 'en' ? fandom : fandom.replace(/s$/, '');
  }
  return AUDIENCE_BY_CATEGORY[category]?.[lang] ?? AUDIENCE_FALLBACK[lang];
}

/* ------------------------------------------------------------------------------------------
 * Personality tests ("Which BTS member are you?")
 * The embedded test answers a few questions automatically, then shows the real result screen.
 * Answers are planned so the chosen member wins, which makes per-member video series possible.
 * ---------------------------------------------------------------------------------------- */

export const PERSONALITY_TIMING = {
  readMs: 3000, // question on screen before the answer is picked
  resultMs: 4000, // result screen on screen before the outro
} as const;

// Delays inside PersonalityTestRunner itself, shared so the video length stays predictable.
export const PERSONALITY_RUNNER_MS = {
  advance: 350, // after picking an option
  calculating: 1200, // "calculating your soulmate" screen
} as const;

export function getPersonalityDurationMs(count: number): number {
  return (
    RECORD_TIMING.hookMs +
    count * (PERSONALITY_TIMING.readMs + PERSONALITY_RUNNER_MS.advance) +
    PERSONALITY_RUNNER_MS.calculating +
    PERSONALITY_TIMING.resultMs +
    RECORD_TIMING.outroMs
  );
}

export interface PersonalityStep {
  questionId: number;
  optionId: string;
}

/** Same rule as PersonalityTestRunner: the first member (in result order) with the top score wins. */
export function getPersonalityWinner(resultIds: string[], options: PersonalityOption[]): string {
  const scores: Record<string, number> = {};
  resultIds.forEach((id) => (scores[id] = 0));
  options.forEach((o) =>
    Object.entries(o.scores).forEach(([id, pts]) => (scores[id] = (scores[id] || 0) + (pts || 0)))
  );
  let winner = resultIds[0];
  let max = -1;
  Object.entries(scores).forEach(([id, score]) => {
    if (score > max) {
      max = score;
      winner = id;
    }
  });
  return winner;
}

/**
 * Picks `count` questions (kept in test order) and one option each so that `targetId` wins,
 * preferring the widest winning margin. Returns null if no combination makes the target win.
 */
export function planPersonalityRun(
  questions: PersonalityQuestion[],
  resultIds: string[],
  targetId: string,
  count: number,
  random: () => number = Math.random
): PersonalityStep[] | null {
  for (let attempt = 0; attempt < 40; attempt++) {
    const pool = [...questions];
    const chosen: PersonalityQuestion[] = [];
    while (chosen.length < count && pool.length > 0) {
      chosen.push(pool.splice(Math.floor(random() * pool.length), 1)[0]);
    }
    chosen.sort((a, b) => questions.indexOf(a) - questions.indexOf(b));

    let best: { options: PersonalityOption[]; margin: number } | null = null;
    const walk = (i: number, picked: PersonalityOption[]) => {
      if (i === chosen.length) {
        if (getPersonalityWinner(resultIds, picked) !== targetId) return;
        const totals = resultIds.map((id) =>
          picked.reduce((sum, o) => sum + (o.scores[id] || 0), 0)
        );
        const target = totals[resultIds.indexOf(targetId)];
        const runnerUp = Math.max(...totals.filter((_, k) => resultIds[k] !== targetId));
        const margin = target - runnerUp;
        if (!best || margin > best.margin || (margin === best.margin && random() < 0.5)) {
          best = { options: [...picked], margin };
        }
        return;
      }
      for (const option of chosen[i].options) walk(i + 1, [...picked, option]);
    };
    walk(0, []);

    const found = best as { options: PersonalityOption[]; margin: number } | null;
    if (found) {
      return chosen.map((q, i) => ({ questionId: q.id, optionId: found.options[i].id }));
    }
  }
  return null;
}

export function encodePersonalityPlan(steps: PersonalityStep[]): string {
  return steps.map((s) => `${s.questionId}:${s.optionId}`).join(',');
}

export function decodePersonalityPlan(value: string): PersonalityStep[] {
  return value
    .split(',')
    .map((pair) => pair.split(':'))
    .filter(([q, o]) => q && o)
    .map(([q, o]) => ({ questionId: Number(q), optionId: o }));
}

const PERSONALITY_SUBJECT: Record<string, Record<RecordLang, string>> = {
  bts: { en: 'BTS member', es: 'miembro de BTS', pt: 'membro do BTS' },
  blackpink: { en: 'BLACKPINK member', es: 'miembro de BLACKPINK', pt: 'membro do BLACKPINK' },
  skz: { en: 'Stray Kids member', es: 'miembro de Stray Kids', pt: 'membro do Stray Kids' },
  food: { en: 'Korean food', es: 'comida coreana', pt: 'comida coreana' },
};

export const PERSONALITY_COPY: Record<
  RecordLang,
  { hook: (subject: string) => string; outroQuestion: string; outroCta: string }
> = {
  en: {
    hook: (subject) => `Which ${subject} are you? 👀`,
    outroQuestion: 'Which one did you get? Comment ⬇️',
    outroCta: 'Find yours → link in bio',
  },
  es: {
    hook: (subject) => `¿Qué ${subject} eres? 👀`,
    outroQuestion: '¿Cuál te salió? Comenta ⬇️',
    outroCta: 'Descubre el tuyo → link en la bio',
  },
  pt: {
    hook: (subject) => `Qual ${subject} você é? 👀`,
    outroQuestion: 'Qual deu pra você? Comenta ⬇️',
    outroCta: 'Descubra o seu → link na bio',
  },
};

export function getPersonalitySubject(themeGroup: string, category: string, lang: RecordLang): string {
  const key = themeGroup in PERSONALITY_SUBJECT ? themeGroup : category === 'Food' ? 'food' : '';
  return key ? PERSONALITY_SUBJECT[key][lang] : PERSONALITY_SUBJECT.bts[lang].replace('BTS', 'K-pop');
}
