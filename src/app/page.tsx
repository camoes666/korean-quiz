'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getAllQuizzes } from '@/data/quizzes';
import { Category, getLocalizedText } from '@/types/quiz';
import QuizCard from '@/components/QuizCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import DailyQuestCard from '@/components/DailyQuestCard';
import PlayerLevelCard from '@/components/PlayerLevelCard';
import LeaderboardCard from '@/components/LeaderboardCard';
import {
  Sparkles,
  Trophy,
  Flame,
  Heart,
  ArrowRight,
  Tag,
  BookOpen,
  Zap,
  Swords,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';

const CATEGORIES: Category[] = ['All', 'K-Pop', 'K-Drama', 'Food', 'Culture'];

type QuizModeFilter = 'all' | 'trivia' | 'personality';

interface QuickFandomChip {
  label: string;
  emoji: string;
  category: Category;
  tag: string;
  badgeClass: string;
}

const QUICK_FANDOM_CHIPS: QuickFandomChip[] = [
  {
    label: 'BTS',
    emoji: '💜',
    category: 'K-Pop',
    tag: 'BTS',
    badgeClass: 'hover:border-purple-400 hover:bg-purple-50/80 text-purple-900 border-purple-200/90',
  },
  {
    label: 'BLACKPINK',
    emoji: '💖',
    category: 'K-Pop',
    tag: 'BLACKPINK',
    badgeClass: 'hover:border-pink-400 hover:bg-pink-50/80 text-pink-900 border-pink-200/90',
  },
  {
    label: 'Stray Kids',
    emoji: '🧭',
    category: 'K-Pop',
    tag: 'Stray Kids',
    badgeClass: 'hover:border-rose-400 hover:bg-rose-50/80 text-rose-900 border-rose-200/90',
  },
  {
    label: 'K-Drama',
    emoji: '🎬',
    category: 'K-Drama',
    tag: 'All',
    badgeClass: 'hover:border-indigo-400 hover:bg-indigo-50/80 text-indigo-900 border-indigo-200/90',
  },
  {
    label: 'K-Food',
    emoji: '🍜',
    category: 'Food',
    tag: 'All',
    badgeClass: 'hover:border-amber-400 hover:bg-amber-50/80 text-amber-900 border-amber-200/90',
  },
];

export default function HomePage() {
  const { t, lang } = useLanguage();
  const { xp, streak, currentLevel, dailyQuestCompleted } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedMode, setSelectedMode] = useState<QuizModeFilter>('all');

  const allQuizzes = getAllQuizzes();
  const triviaCount = allQuizzes.filter((q) => q.quizType !== 'personality').length;
  const personalityCount = allQuizzes.filter((q) => q.quizType === 'personality').length;

  // Pick the daily quest quiz
  const dailyQuestQuiz = allQuizzes.find((q) => q.slug === 'bts-army-trivia') || allQuizzes[0];
  const levelTitle = getLocalizedText(currentLevel, 'title', lang);

  // Extract relevant tags based on category
  const getAvailableTags = () => {
    const pool =
      selectedCategory === 'All'
        ? allQuizzes
        : allQuizzes.filter((q) => q.category === selectedCategory);

    const tags = Array.from(new Set(pool.map((q) => q.tag).filter(Boolean))) as string[];
    return ['All', ...tags];
  };

  const availableTags = getAvailableTags();

  // Filter quizzes
  const filteredQuizzes = allQuizzes.filter((quiz) => {
    const isPersonality = quiz.quizType === 'personality';
    const matchesMode =
      selectedMode === 'all' ||
      (selectedMode === 'personality' && isPersonality) ||
      (selectedMode === 'trivia' && !isPersonality);
    const matchesCategory =
      selectedCategory === 'All' || quiz.category === selectedCategory;
    const matchesTag =
      selectedTag === 'All' || quiz.tag === selectedTag;
    return matchesMode && matchesCategory && matchesTag;
  });

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setSelectedTag('All');
  };

  const scrollToQuizzes = (options?: {
    mode?: QuizModeFilter;
    category?: Category;
    tag?: string;
  }) => {
    if (options?.mode) setSelectedMode(options.mode);
    if (options?.category) setSelectedCategory(options.category);
    if (options?.tag !== undefined) setSelectedTag(options.tag);
    const el = document.getElementById('quizzes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      {/* 1. ASYMMETRIC SPLIT HERO + BENTO SHOWCASE */}
      <section className="relative overflow-hidden pt-4 pb-10 sm:pt-6 sm:pb-14 border-b border-purple-100/90 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-100/65 via-white to-[#F9FAFB]">
        {/* Ambient background glow accents */}
        <div className="pointer-events-none absolute -top-24 right-0 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-indigo-200/25 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* Top Compact Player Status Bar (Replaces bulky above-the-fold widgets) */}
          <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-2.5 rounded-2xl bg-white/85 backdrop-blur-md border border-purple-100/90 px-3.5 py-2 shadow-xs">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center gap-1.5 pr-2.5 border-r border-slate-200">
                <span className="text-sm">{currentLevel.badgeEmoji}</span>
                <span className="text-xs font-black text-purple-700">
                  Lv.{currentLevel.level}
                </span>
                <span className="text-xs font-bold text-slate-700 hidden sm:inline">
                  {levelTitle}
                </span>
              </div>

              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-black tabular-nums">
                <Zap className="w-3 h-3 text-emerald-600 fill-current" />
                <span>{xp} XP</span>
              </div>

              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 text-xs font-bold tabular-nums">
                <Flame className="w-3 h-3 text-rose-500 fill-current" />
                <span>
                  {streak}
                  {lang === 'ko' ? '일 연속' : lang === 'es' ? 'd racha' : lang === 'pt' ? 'd ofensiva' : 'd streak'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/quiz/${dailyQuestQuiz.slug}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition-all active:scale-[0.98] ${
                  dailyQuestCompleted
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xs hover:opacity-95'
                }`}
              >
                {dailyQuestCompleted ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'ko'
                        ? '오늘의 미션 완료'
                        : lang === 'es'
                        ? 'Misión completada'
                        : lang === 'pt'
                        ? 'Missão concluída'
                        : 'Daily Quest Done'}
                    </span>
                  </>
                ) : (
                  <>
                    <span>🎯</span>
                    <span>
                      {lang === 'ko'
                        ? '오늘의 미션 (+100 XP)'
                        : lang === 'es'
                        ? 'Misión del Día (+100 XP)'
                        : lang === 'pt'
                        ? 'Missão do Dia (+100 XP)'
                        : 'Daily Quest (+100 XP)'}
                    </span>
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </Link>

              <a
                href="#community-stats"
                className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition-colors"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {lang === 'ko'
                    ? '랭킹 보기'
                    : lang === 'es'
                    ? 'Ranking'
                    : lang === 'pt'
                    ? 'Ranking'
                    : 'Leaderboard'}
                </span>
              </a>
            </div>
          </div>

          {/* 12-Column Asymmetric Split Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* LEFT COLUMN (7 Cols): High-Impact Headline, Dual CTAs & Fandom Quick Chips */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/90 bg-white/95 px-3.5 py-1.5 text-xs font-black text-purple-800 shadow-xs mb-5">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                <span>{t.heroBadge}</span>
                <span className="text-slate-300">|</span>
                <span className="text-pink-600 tabular-nums">
                  {lang === 'ko'
                    ? '11개 테스트 · 230+ 문항'
                    : lang === 'es'
                    ? '11 Tests · 230+ Preguntas'
                    : lang === 'pt'
                    ? '11 Testes · 230+ Perguntas'
                    : '11 Quizzes · 230+ Questions'}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black tracking-tight text-slate-950 leading-[1.08] [text-wrap:balance]">
                {t.heroTitlePre}{' '}
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
                  {t.heroTitleHighlight}
                </span>
              </h1>

              <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-[54ch] font-medium leading-relaxed">
                {t.heroSubtitle}
              </p>

              {/* Dual Primary Action Buttons */}
              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToQuizzes({ mode: 'trivia' })}
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white px-6 py-4 text-sm sm:text-base font-black shadow-lg shadow-slate-950/15 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Swords className="w-4 h-4 text-amber-400" />
                  <span>
                    {lang === 'ko'
                      ? '15초 스피드 퀴즈 & 1:1 대결'
                      : lang === 'es'
                      ? 'Quiz Rápido 15s y Duelo 1:1'
                      : lang === 'pt'
                      ? 'Quiz Rápido 15s e Duelo 1:1'
                      : '15s Speed Quiz & 1:1 Duel'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToQuizzes({ mode: 'personality' })}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white hover:bg-pink-50/60 text-slate-900 border-2 border-pink-200 hover:border-pink-400 px-6 py-4 text-sm sm:text-base font-black shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-pink-500 fill-current" />
                  <span>
                    {lang === 'ko'
                      ? '아이돌 소울메이트 테스트'
                      : lang === 'es'
                      ? 'Test de Alma Gemela K-Pop'
                      : lang === 'pt'
                      ? 'Teste de Alma Gêmea K-Pop'
                      : 'Idol Soulmate Match Test'}
                  </span>
                </button>
              </div>

              {/* Fandom Quick-Jump Filter Bar */}
              <div className="mt-7 pt-5 border-t border-purple-100/90">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  <span>
                    {lang === 'ko'
                      ? '관심 팬덤 · 테마 바로가기'
                      : lang === 'es'
                      ? 'Acceso rápido por fandom o tema'
                      : lang === 'pt'
                      ? 'Acesso rápido por fandom ou tema'
                      : 'Jump straight to your fandom'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {QUICK_FANDOM_CHIPS.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() =>
                        scrollToQuizzes({
                          mode: 'all',
                          category: chip.category,
                          tag: chip.tag,
                        })
                      }
                      className={`inline-flex items-center gap-1.5 rounded-xl bg-white border px-3.5 py-2 text-xs font-black shadow-2xs transition-all active:scale-95 cursor-pointer ${chip.badgeClass}`}
                    >
                      <span>{chip.emoji}</span>
                      <span>{t.tags[chip.label] || t.categories[chip.label] || chip.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (5 Cols): Bento Featured Game Showcase with Hobi & Bomi */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Featured Card 1: Soulmate Match Showcase */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-indigo-950 to-fuchsia-950 text-white p-5 sm:p-6 shadow-xl shadow-purple-950/15 border border-white/15 group">
                <div className="pointer-events-none absolute -right-6 -bottom-4 w-36 h-36 sm:w-40 sm:h-40 select-none z-10 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="/images/mascot/bomi-blackpink-v2.webp"
                    alt="Mascot Bomi"
                    className="w-full h-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)]"
                    loading="eager"
                  />
                </div>

                <div className="relative z-20 pr-24 sm:pr-28">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/25 border border-pink-400/40 text-pink-200 text-[11px] font-black mb-2.5">
                    <span>💖</span>
                    <span>
                      {lang === 'ko'
                        ? '인기 1위 소울메이트 매칭'
                        : lang === 'es'
                        ? 'TOP #1 TEST ALMA GEMELA'
                        : lang === 'pt'
                        ? 'TOP #1 TESTE ALMA GÊMEA'
                        : '#1 FAN FAVORITE MATCH'}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-black leading-snug tracking-tight">
                    {lang === 'ko'
                      ? '나와 100% 통하는 최애 멤버는 누구?'
                      : lang === 'es'
                      ? '¿Qué miembro de K-Pop es tu alma gemela?'
                      : lang === 'pt'
                      ? 'Qual membro de K-Pop é sua alma gêmea?'
                      : 'Which K-Pop Member Matches Your Soul?'}
                  </h2>

                  <p className="mt-1.5 text-xs text-purple-200/90 font-medium leading-relaxed">
                    {lang === 'ko'
                      ? '10가지 상황 질문으로 알아보는 내 성향과 환상의 케미 멤버 카드 발급!'
                      : lang === 'es'
                      ? 'Responde 10 preguntas y descarga tu tarjeta oficial de compatibilidad.'
                      : lang === 'pt'
                      ? 'Responda 10 perguntas e baixe seu cartão oficial de compatibilidade.'
                      : '10 scenario questions + instant shareable chemistry result card.'}
                  </p>

                  {/* Quick Direct Links to the 3 Idol Soulmate Tests */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    <Link
                      href="/quiz/which-bts-member-are-you"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white text-slate-950 hover:bg-purple-100 text-xs font-black shadow-xs transition-all active:scale-95"
                    >
                      <span>💜 BTS</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      href="/quiz/which-blackpink-member-are-you"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-pink-500/90 hover:bg-pink-500 text-white text-xs font-black shadow-xs transition-all active:scale-95"
                    >
                      <span>🖤💖 BLACKPINK</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      href="/quiz/which-stray-kids-member-are-you"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold transition-all active:scale-95"
                    >
                      <span>🧭 SKZ</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Featured Card 2: 15s Speed Trivia & 1:1 Friend Duel */}
              <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-purple-100 hover:border-purple-300 p-5 sm:p-6 shadow-lg shadow-purple-500/5 transition-all group">
                <div className="pointer-events-none absolute -right-4 -bottom-4 w-32 h-32 sm:w-36 sm:h-36 select-none z-10 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="/images/mascot/hobi-bts-v2.webp"
                    alt="Mascot Hobi"
                    className="w-full h-full object-contain drop-shadow-md"
                    loading="eager"
                  />
                </div>

                <div className="relative z-20 pr-24 sm:pr-28">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black">
                      <Swords className="w-3 h-3 text-amber-700" />
                      <span>
                        {lang === 'ko'
                          ? '1:1 친구 대결 모드'
                          : lang === 'es'
                          ? 'MODO DUELO 1:1'
                          : lang === 'pt'
                          ? 'MODO DUELO 1:1'
                          : '1:1 FRIEND CHALLENGE'}
                      </span>
                    </span>
                    <span className="text-[11px] font-black text-purple-700 tabular-nums">
                      MAX 5,000 PTS
                    </span>
                  </div>

                  <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {lang === 'ko'
                      ? '15초 스피드 고인물 판독기 도전!'
                      : lang === 'es'
                      ? '¡Desafío de Trivia en 15 Segundos!'
                      : lang === 'pt'
                      ? 'Desafio de Trivia em 15 Segundos!'
                      : 'Beat the 15-Second Speed Trivia!'}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500 font-medium leading-relaxed">
                    {lang === 'ko'
                      ? '루키·팬·하드코어 난이도 선택 후 내 점수로 친구에게 도전장을 보내세요.'
                      : lang === 'es'
                      ? 'Elige tu nivel (Novato, Fan, Experto) y reta a tus amigos con tu enlace.'
                      : lang === 'pt'
                      ? 'Escolha seu nível (Novato, Fã, Experto) e desafie seus amigos com seu link.'
                      : 'Pick your level (Rookie, Fan, Hardcore) and send a 1:1 challenge link to friends.'}
                  </p>

                  <div className="mt-3.5 flex flex-wrap items-center gap-2">
                    <Link
                      href="/quiz/bts-army-trivia"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black shadow-xs transition-all active:scale-95"
                    >
                      <span>
                        {lang === 'ko'
                          ? 'BTS 퀴즈 시작'
                          : lang === 'es'
                          ? 'Jugar Quiz BTS'
                          : lang === 'pt'
                          ? 'Jogar Quiz BTS'
                          : 'Play BTS Trivia'}
                      </span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      href="/quiz/blackpink-blink-trivia"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black transition-all active:scale-95"
                    >
                      <span>BLACKPINK</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement */}
      <div className="max-w-5xl mx-auto px-4 w-full">
        <AdPlaceholder format="horizontal" label={t.ads.sponsored} />
      </div>

      {/* 2. QUIZ COLLECTION SECTION (IMMEDIATELY ACCESSIBLE) */}
      <section id="quizzes" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full scroll-mt-16">
        <div className="flex flex-col gap-5 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t.trendingTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                {t.trendingDesc}
              </p>
            </div>

            {/* Mode Switcher Tabs: All vs Speed Trivia vs Soulmate Match */}
            <div className="inline-flex items-center p-1 rounded-2xl bg-slate-200/75 border border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedMode('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedMode === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.categories.All} ({allQuizzes.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedMode('trivia')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedMode === 'trivia'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ⚡ {lang === 'ko' ? '스피드 퀴즈' : lang === 'es' ? 'Trivia 15s' : lang === 'pt' ? 'Trivia 15s' : 'Speed Trivia'} ({triviaCount})
              </button>
              <button
                type="button"
                onClick={() => setSelectedMode('personality')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedMode === 'personality'
                    ? 'bg-white text-pink-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                💖 {lang === 'ko' ? '소울메이트' : lang === 'es' ? 'Personalidad' : lang === 'pt' ? 'Personalidade' : 'Soulmate Test'} ({personalityCount})
              </button>
            </div>
          </div>

          {/* Category Chunky Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              const categoryLabel = t.categories[category] || category;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded-full px-5 py-2 text-xs sm:text-sm font-black transition-all active:scale-95 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25'
                      : 'bg-white border-2 border-purple-100 hover:border-purple-300 text-slate-700 shadow-xs'
                  }`}
                >
                  {categoryLabel}
                </button>
              );
            })}
          </div>

          {/* Sub-tag Bar */}
          {availableTags.length > 1 && (
            <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-purple-100">
              <span className="text-xs font-black text-slate-400 flex items-center gap-1 mr-1 uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5 text-purple-500" />
                {t.filterByTag}
              </span>
              {availableTags.map((tag) => {
                const isActive = selectedTag === tag;
                const tagLabel = tag === 'All' ? t.allTags : t.tags[tag] || tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                      isActive
                        ? 'bg-purple-900 text-white shadow-xs'
                        : 'bg-white border border-purple-100 text-slate-600 hover:bg-purple-50'
                    }`}
                  >
                    {tagLabel}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <QuizCard key={quiz.slug} quiz={quiz} />
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-16 text-zinc-400">
            <p className="text-base font-bold">{t.noQuizzesFound}</p>
            <button
              onClick={() => {
                setSelectedMode('all');
                setSelectedCategory('All');
                setSelectedTag('All');
              }}
              className="mt-3 text-xs text-violet-600 font-bold hover:underline"
            >
              {t.resetFilters}
            </button>
          </div>
        )}
      </section>

      {/* 2.3 DAILY QUEST, PLAYER LEVEL & LEADERBOARD SECTION (Moved below quizzes so quizzes come first) */}
      <section id="community-stats" className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 w-full scroll-mt-16">
        <div className="mb-6">
          <DailyQuestCard questQuiz={dailyQuestQuiz} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PlayerLevelCard />
          <LeaderboardCard />
        </div>
      </section>

      {/* 2.5 KNOWLEDGE & LORE GUIDES PROGRAMMATIC SEO SECTION */}
      <section className="border-t-2 border-purple-100 bg-gradient-to-r from-purple-50 via-pink-50/50 to-indigo-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border-2 border-purple-100 shadow-md shadow-purple-500/5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-100 flex items-center justify-center shrink-0 text-3xl">
                📚
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-black text-[11px] mb-2">
                  <Sparkles className="w-3 h-3 text-pink-500" />
                  <span>
                    {lang === 'en'
                      ? '230+ Verified Facts & Explanations'
                      : lang === 'es'
                      ? '230+ Hechos y Respuestas Verificadas'
                      : lang === 'pt'
                      ? '230+ Fatos e Respostas Verificadas'
                      : '230+개 팩트체크 & 해설 수록'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {lang === 'en'
                    ? 'K-Culture & K-Pop Fan Knowledge Guides'
                    : lang === 'es'
                    ? 'Guías de Lore y Conocimiento K-Pop'
                    : lang === 'pt'
                    ? 'Guias de Lore e Conhecimento K-Pop'
                    : 'K-컬처 & K-Pop 팬 지식 가이드 백과'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-xl">
                  {lang === 'en'
                    ? 'Explore verified answers, debut histories, cultural etiquette, and insider fun facts before taking the quizzes.'
                    : lang === 'es'
                    ? 'Descubre las respuestas y explicaciones detrás de cada pregunta sobre BTS, SKZ, BLACKPINK y comida coreana.'
                    : lang === 'pt'
                    ? 'Descubra as respostas verificadas, histórias de debut e curiosidades sobre BTS, SKZ, BLACKPINK e comida coreana.'
                    : 'BTS, Stray Kids, 블랙핑크, 한국 매운맛 순위, 문화 IQ까지 모든 퀴즈의 정답과 심층 해설을 무료로 정독하세요.'}
                </p>
              </div>
            </div>

            <Link
              href="/guide"
              className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-md shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>
                {lang === 'en'
                  ? 'Explore All Lore Guides'
                  : lang === 'es'
                  ? 'Explorar Guías de Lore'
                  : lang === 'pt'
                  ? 'Explorar Guias de Lore'
                  : '전체 지식 가이드 둘러보기'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SEO / AD-APPROVAL VALUE SECTION */}
      <section className="border-t-2 border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
              {t.whySectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
              {t.whySectionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {t.whyCards.map((card, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 shadow-sm"
              >
                <div className="text-3xl mb-3">{card.emoji}</div>
                <h3 className="font-black text-sm sm:text-base text-zinc-900 dark:text-zinc-100 mb-1.5">
                  {card.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
