'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Quiz, Question } from '@/types/quiz';
import { getQuizMascot } from '@/lib/mascot';
import {
  createSeededRandom,
  getAvailableRecordLangs,
  getPersonalityDurationMs,
  getPersonalitySubject,
  getRecordAudience,
  getRecordDurationMs,
  getRecordText,
  getTranslatedQuestions,
  isRecordLang,
  isRecordQuestionCount,
  pickRecordQuestions,
  planPersonalityRun,
  PERSONALITY_COPY,
  PersonalityStep,
  RECORD_COPY,
  RECORD_LANGS,
  RECORD_MESSAGE,
  RECORD_QUESTION_COUNTS,
  RECORD_TIMING,
  RecordLang,
  RecordQuestionCount,
} from '@/lib/recordMode';

// Width (CSS px) of a typical phone. The real quiz page is embedded at this width, so the
// video shows exactly what visitors see on their phones, then scaled onto the stage.
const SITE_WIDTH = 412;
// The bottom 22% of a TikTok/Reels/Shorts frame is covered by captions and buttons.
const SAFE_AREA = 0.78;
// Extra height (unscaled px) the options grow by when the correct-answer badge appears.
const REVEAL_GROWTH = 64;

// Keep things out of the recording: Next's dev indicator, scrollbars, and the search-engine
// text below the quiz (it would show under short screens like "calculating").
const IFRAME_STYLE =
  'nextjs-portal,[data-seo-content]{display:none!important}html{scrollbar-width:none}';

type PlayState = 'setup' | 'hook' | 'quiz' | 'outro';

export interface RecordQuizOption {
  slug: string;
  title: string;
  coverEmoji: string;
}

interface RecordModeRunnerProps {
  quiz: Quiz;
  themeGroup: string;
  quizOptions: RecordQuizOption[];
}

export default function RecordModeRunner({ quiz, themeGroup, quizOptions }: RecordModeRunnerProps) {
  const searchParams = useSearchParams();
  const isPersonality = quiz.quizType === 'personality';
  const personalityQuestions = useMemo(() => quiz.personalityQuestions || [], [quiz.personalityQuestions]);
  const results = quiz.personalityResults || {};
  const resultIds = Object.keys(results);
  const availableLangs = useMemo(
    () => getAvailableRecordLangs(isPersonality ? personalityQuestions : quiz.questions),
    [isPersonality, personalityQuestions, quiz.questions]
  );

  const [count, setCountState] = useState<RecordQuestionCount>(() => {
    const n = Number(searchParams.get('n'));
    return isRecordQuestionCount(n) ? (n as RecordQuestionCount) : 5;
  });
  const [lang, setLangState] = useState<RecordLang>(() => {
    const l = searchParams.get('lang');
    return isRecordLang(l) && availableLangs.includes(l) ? l : 'en';
  });
  // The first pick is seeded so server and client render the same questions (a mismatch
  // would reload the embedded quiz mid-stream); reshuffles after that are truly random.
  const [picked, setPicked] = useState<Question[]>(() =>
    isPersonality
      ? []
      : pickRecordQuestions(getTranslatedQuestions(quiz.questions, lang), count, createSeededRandom(count))
  );
  // Personality tests: which member the video ends on ('random' picks one per shuffle).
  const [target, setTargetState] = useState<string>('random');
  const makePlan = (l: RecordLang, n: number, t: string, random: () => number) => {
    const member = t === 'random' ? resultIds[Math.floor(random() * resultIds.length)] : t;
    const steps = planPersonalityRun(getTranslatedQuestions(personalityQuestions, l), resultIds, member, n, random);
    return { member, steps: steps ?? [] };
  };
  const [plan, setPlan] = useState<{ member: string; steps: PersonalityStep[] }>(() =>
    isPersonality ? makePlan(lang, count, 'random', createSeededRandom(count)) : { member: '', steps: [] }
  );
  const [play, setPlay] = useState<PlayState>('setup');
  const [ready, setReady] = useState(false);
  // Bumped to reload the embedded quiz for a fresh take.
  const [take, setTake] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timersRef = useRef<number[]>([]);

  const shuffle = (nextLang: RecordLang, nextCount: RecordQuestionCount, nextTarget = target) => {
    if (isPersonality) {
      // The plan travels in the start message, so the embedded page only reloads on a language change.
      if (nextLang !== lang) setReady(false);
      setPlan(makePlan(nextLang, nextCount, nextTarget, Math.random));
      return;
    }
    setReady(false);
    setPicked(pickRecordQuestions(getTranslatedQuestions(quiz.questions, nextLang), nextCount));
  };
  const reshuffle = () => shuffle(lang, count);
  const setTarget = (t: string) => {
    setTargetState(t);
    shuffle(lang, count, t);
  };
  const setCount = (n: RecordQuestionCount) => {
    setCountState(n);
    shuffle(lang, n);
  };
  const setLang = (l: RecordLang) => {
    setLangState(l);
    shuffle(l, count);
  };

  const iframeSrc = isPersonality
    ? `/quiz/${quiz.slug}?lang=${lang}`
    : `/quiz/${quiz.slug}?record=${picked.map((q) => q.id).join(',')}&lang=${lang}`;
  const planReady = isPersonality ? plan.steps.length === count : picked.length === count;

  // Fill the stage width with the phone-sized page, shrinking when a long question would
  // push the options into the bottom safe zone.
  const fit = useCallback(() => {
    const stage = stageRef.current;
    const iframe = iframeRef.current;
    if (!stage || !iframe) return;
    const { clientWidth: w, clientHeight: h } = stage;
    if (w === 0 || h === 0) return;
    const options = iframe.contentDocument?.querySelector('[data-record-options]');
    const optionsBottom = options ? options.getBoundingClientRect().bottom + REVEAL_GROWTH : 0;
    const scale = optionsBottom > 0 ? Math.min(w / SITE_WIDTH, (h * SAFE_AREA) / optionsBottom) : w / SITE_WIDTH;
    iframe.style.width = `${SITE_WIDTH}px`;
    iframe.style.height = `${h / scale}px`;
    iframe.style.transform = `scale(${scale})`;
    iframe.style.left = `${(w - SITE_WIDTH * scale) / 2}px`;
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [fit]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.source !== iframeRef.current?.contentWindow) return;
      const type = e.data?.type;
      if (type === RECORD_MESSAGE.ready) setReady(true);
      if (type === RECORD_MESSAGE.question) fit();
      if (type === RECORD_MESSAGE.done) setPlay('outro');
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [fit]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const start = () => {
    if (!ready || !planReady) return;
    setPlay('hook');
    timersRef.current.push(
      window.setTimeout(() => {
        setPlay('quiz');
        iframeRef.current?.contentWindow?.postMessage(
          { type: RECORD_MESSAGE.start, plan: isPersonality ? plan.steps : undefined },
          window.location.origin
        );
      }, RECORD_TIMING.hookMs)
    );
  };

  const stop = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    setPlay('setup');
    setReady(false);
    setTake((n) => n + 1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') stop();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [stop]);

  useEffect(() => clearTimers, []);

  const onIframeLoad = () => {
    const doc = iframeRef.current?.contentDocument;
    if (doc) {
      const style = doc.createElement('style');
      style.textContent = IFRAME_STYLE;
      doc.head.appendChild(style);
    }
    fit();
  };

  const mascot = getQuizMascot(quiz.slug, quiz.tag);
  const copy = RECORD_COPY[lang];
  const hook = isPersonality
    ? PERSONALITY_COPY[lang].hook(getPersonalitySubject(themeGroup, quiz.category, lang))
    : copy.hook(getRecordAudience(themeGroup, quiz.category, lang), count);
  const outroQuestion = isPersonality ? PERSONALITY_COPY[lang].outroQuestion : copy.outroQuestion;
  const outroCta = isPersonality ? PERSONALITY_COPY[lang].outroCta : copy.outroCta(quiz.questions.length);

  const preview = isPersonality
    ? plan.steps.map((step) => {
        const q = personalityQuestions.find((x) => x.id === step.questionId);
        const option = q?.options.find((o) => o.id === step.optionId);
        return {
          key: String(step.questionId),
          label: q ? getRecordText(q, 'question', lang) : '',
          detail: option ? `→ ${getRecordText(option, 'text', lang)}` : '',
        };
      })
    : picked.map((q) => ({ key: String(q.id), label: `Lv${q.level ?? '?'} · ${getRecordText(q, 'question', lang)}`, detail: '' }));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div
        ref={stageRef}
        className="relative overflow-hidden select-none bg-[#F9FAFB]"
        style={{
          // Full screen on phones; a 9:16 column on wider screens.
          width: 'min(100vw, calc(100dvh * 9 / 16))',
          height: '100dvh',
          containerType: 'size',
        }}
      >
        <iframe
          key={`${iframeSrc}#${take}`}
          ref={iframeRef}
          src={iframeSrc}
          onLoad={onIframeLoad}
          title="Quiz preview"
          tabIndex={-1}
          className="absolute top-0 origin-top-left border-0"
          style={{ width: SITE_WIDTH }}
        />

        {play === 'hook' && (
          <div data-group={themeGroup} className="absolute inset-0">
            <div className="flex h-[78%] flex-col items-center justify-center gap-[6%] px-[6%] text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mascot.avatarUrl} alt="" className="w-[45%] drop-shadow-xl" />
              <p className="text-[clamp(1.6rem,7.5cqh,3.6rem)] font-black leading-tight" style={{ color: 'var(--qz-accent-text)' }}>
                {hook}
              </p>
            </div>
          </div>
        )}

        {play === 'outro' && (
          <div data-group={themeGroup} className="absolute inset-0">
            <div className="flex h-[78%] flex-col items-center justify-center gap-[5%] px-[6%] text-center">
              <p className="text-[clamp(1.4rem,6cqh,3rem)] font-black leading-tight">{outroQuestion}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mascot.avatarUrl} alt="" className="w-[38%] drop-shadow-xl" />
              <p
                className="rounded-2xl px-5 py-3 text-[clamp(1.1rem,4.5cqh,2.2rem)] font-extrabold leading-tight"
                style={{ background: 'var(--qz-accent)', color: 'var(--qz-on-accent)' }}
              >
                {outroCta}
              </p>
              <p className="text-[clamp(0.9rem,3cqh,1.4rem)] font-bold" style={{ color: 'var(--qz-text-muted)' }}>
                kpulsequiz.com
              </p>
            </div>
          </div>
        )}

        {/* Blocks interaction with the embedded page; a click returns to setup. */}
        {play !== 'setup' && <div className="absolute inset-0" style={{ cursor: 'none' }} onClick={stop} />}
      </div>

      {play === 'setup' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <SetupPanel
            quiz={quiz}
            quizOptions={quizOptions}
            count={count}
            setCount={setCount}
            lang={lang}
            setLang={setLang}
            availableLangs={availableLangs}
            preview={preview}
            durationMs={isPersonality ? getPersonalityDurationMs : getRecordDurationMs}
            resultPicker={
              isPersonality
                ? {
                    value: target,
                    current: results[plan.member]?.name ?? '',
                    options: resultIds.map((id) => ({ id, label: `${results[id].emoji} ${results[id].name}` })),
                    onChange: setTarget,
                  }
                : undefined
            }
            canStart={planReady}
            ready={ready}
            onShuffle={reshuffle}
            onStart={start}
          />
        </div>
      )}
    </div>
  );
}

interface SetupPanelProps {
  quiz: Quiz;
  quizOptions: RecordQuizOption[];
  count: RecordQuestionCount;
  setCount: (n: RecordQuestionCount) => void;
  lang: RecordLang;
  setLang: (l: RecordLang) => void;
  availableLangs: RecordLang[];
  preview: { key: string; label: string; detail: string }[];
  durationMs: (count: number) => number;
  resultPicker?: {
    value: string;
    current: string;
    options: { id: string; label: string }[];
    onChange: (id: string) => void;
  };
  canStart: boolean;
  ready: boolean;
  onShuffle: () => void;
  onStart: () => void;
}

function SetupPanel({
  quiz,
  quizOptions,
  count,
  setCount,
  lang,
  setLang,
  availableLangs,
  preview,
  durationMs,
  resultPicker,
  canStart,
  ready,
  onShuffle,
  onStart,
}: SetupPanelProps) {
  const router = useRouter();
  const chip = (active: boolean, disabled = false) =>
    `px-4 py-2 rounded-full text-sm font-bold border transition ${
      disabled
        ? 'border-slate-700 text-slate-600 cursor-not-allowed'
        : active
          ? 'bg-white text-black border-white'
          : 'border-slate-500 text-slate-200 hover:border-white'
    }`;

  return (
    <div className="w-full max-w-md max-h-full overflow-y-auto p-6 text-slate-100">
      <p className="text-xs font-bold tracking-widest text-slate-400">RECORD MODE 🎬</p>

      <section className="mt-3">
        <h2 className="text-sm font-bold text-slate-300">퀴즈</h2>
        <select
          value={quiz.slug}
          onChange={(e) => router.push(`/record/${e.target.value}?n=${count}&lang=${lang}`)}
          className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-3 text-base font-bold text-slate-100"
        >
          {quizOptions.map((q) => (
            <option key={q.slug} value={q.slug}>
              {q.coverEmoji} {q.title}
            </option>
          ))}
        </select>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-bold text-slate-300">문제 수</h2>
        <div className="mt-2 flex gap-2">
          {RECORD_QUESTION_COUNTS.map((n) => (
            <button key={n} type="button" className={chip(count === n)} onClick={() => setCount(n)}>
              {n}문제 · {Math.round(durationMs(n) / 1000)}초
            </button>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="text-sm font-bold text-slate-300">언어</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {RECORD_LANGS.map((l) => {
            const available = availableLangs.includes(l);
            return (
              <button
                key={l}
                type="button"
                disabled={!available}
                className={chip(lang === l, !available)}
                onClick={() => setLang(l)}
                title={available ? undefined : '이 퀴즈에 번역이 아직 없어요'}
              >
                {RECORD_COPY[l].label}
                {!available && ' (번역 준비 중)'}
              </button>
            );
          })}
        </div>
      </section>

      {resultPicker && (
        <section className="mt-5">
          <h2 className="text-sm font-bold text-slate-300">마지막에 나올 결과</h2>
          <select
            value={resultPicker.value}
            onChange={(e) => resultPicker.onChange(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-3 text-base font-bold text-slate-100"
          >
            <option value="random">🎲 무작위</option>
            {resultPicker.options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
          {resultPicker.value === 'random' && resultPicker.current && (
            <p className="mt-1 text-xs text-slate-400">이번에 나올 결과: {resultPicker.current}</p>
          )}
        </section>
      )}

      <section className="mt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-300">
            {resultPicker ? '이번 영상 질문 → 고를 답' : '이번 영상 문제 (쉬움 → 어려움)'}
          </h2>
          <button type="button" onClick={onShuffle} className="text-xs font-bold text-slate-300 underline">
            🔀 다시 뽑기
          </button>
        </div>
        <ol className="mt-2 space-y-2 text-sm">
          {preview.map((item, i) => (
            <li key={item.key} className="rounded-lg bg-slate-900 px-3 py-2">
              <span className="text-slate-500">{i + 1}. </span>
              {item.label}
              {item.detail && <span className="block text-xs text-slate-400">{item.detail}</span>}
            </li>
          ))}
        </ol>
      </section>

      <button
        type="button"
        onClick={onStart}
        disabled={!ready || !canStart}
        className="mt-6 w-full rounded-2xl bg-white py-4 text-lg font-extrabold text-black disabled:opacity-40"
      >
        {ready ? '▶ 재생 시작' : '퀴즈 화면 불러오는 중…'}
      </button>
      <p className="mt-3 text-xs leading-relaxed text-slate-400">
        화면 녹화를 먼저 켠 뒤 재생을 누르세요. 재생 중 Esc 또는 화면 탭으로 처음 화면으로 돌아옵니다.
        보기 순서는 매번 섞여서 정답 위치가 달라져요.
      </p>
    </div>
  );
}
