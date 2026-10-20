'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllQuizzes } from '@/data/quizzes';
import { Category, getLocalizedText } from '@/types/quiz';
import QuizCard from '@/components/QuizCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import DailyQuestCard from '@/components/DailyQuestCard';
import PlayerLevelCard from '@/components/PlayerLevelCard';
import LeaderboardCard from '@/components/LeaderboardCard';
import { Sparkles, Trophy, ArrowRight, Tag, BookOpen } from 'lucide-react';
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

const LIVE_SOULMATE_TICKER = [
  { emoji: '💜', member: 'Jungkook', group: 'BTS', match: '99%', color: 'text-purple-100 bg-purple-500/30 border-purple-400/40' },
  { emoji: '💖', member: 'Lisa', group: 'BLACKPINK', match: '98%', color: 'text-pink-100 bg-pink-500/30 border-pink-400/40' },
  { emoji: '🧭', member: 'Felix', group: 'Stray Kids', match: '99%', color: 'text-amber-100 bg-amber-500/25 border-amber-400/40' },
  { emoji: '💜', member: 'V · Taehyung', group: 'BTS', match: '97%', color: 'text-purple-100 bg-purple-500/30 border-purple-400/40' },
  { emoji: '💖', member: 'Jennie', group: 'BLACKPINK', match: '98%', color: 'text-pink-100 bg-pink-500/30 border-pink-400/40' },
];

export default function HomePage() {
  const { t, lang } = useLanguage();
  const { currentLevel, progressPercent, xpToNextLevel } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedMode, setSelectedMode] = useState<QuizModeFilter>('all');
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % LIVE_SOULMATE_TICKER.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const currentTicker = LIVE_SOULMATE_TICKER[tickerIndex];

  const allQuizzes = getAllQuizzes();
  const levelTitle = lang === 'ko' ? currentLevel.titleKo : currentLevel.title;

  // Pick the featured main quiz (BLACKPINK member personality test)
  const dailyQuestQuiz =
    allQuizzes.find((q) => q.slug === 'which-blackpink-member-are-you') || allQuizzes[0];

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

  const handleQuickJump = (category: Category, tag: string) => {
    setSelectedCategory(category);
    setSelectedTag(tag);
    const el = document.getElementById('quizzes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const quickFandomChips = [
    {
      label: '🖤💖 BLACKPINK',
      category: 'K-Pop' as Category,
      tag: 'BLACKPINK',
      style: 'border-pink-200 bg-white/90 text-pink-700 hover:bg-pink-50 hover:border-pink-300',
    },
    {
      label: '💜 BTS',
      category: 'K-Pop' as Category,
      tag: 'BTS',
      style: 'border-purple-200 bg-white/90 text-purple-700 hover:bg-purple-50 hover:border-purple-300',
    },
    {
      label: '🐺 Stray Kids',
      category: 'K-Pop' as Category,
      tag: 'Stray Kids',
      style: 'border-rose-200 bg-white/90 text-rose-700 hover:bg-rose-50 hover:border-rose-300',
    },
    {
      label: lang === 'ko' ? '🌶️ K-푸드' : '🌶️ K-Food',
      category: 'Food' as Category,
      tag: 'All',
      style: 'border-amber-200 bg-white/90 text-amber-800 hover:bg-amber-50 hover:border-amber-300',
    },
    {
      label: lang === 'ko' ? '🎬 K-드라마' : '🎬 K-Drama',
      category: 'K-Drama' as Category,
      tag: 'All',
      style: 'border-indigo-200 bg-white/90 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      {/* 1. ATMOSPHERIC STAGE HERO: AURORA MESH + SPLIT SPOTLIGHT */}
      <section className="relative overflow-hidden py-9 sm:py-12 border-b border-purple-100/80 bg-gradient-to-br from-purple-50/90 via-pink-50/40 to-indigo-50/80">
        {/* Subtle Dot Matrix Texture */}
        <div
          className="absolute inset-0 opacity-35 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#c084fc 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Stage Ambient Spotlights */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-300/30 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-pink-400/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Column: Brand Pitch + Fandom Quick-Jump Chips + Frosted Level Bar */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Hero Top Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/90 bg-white/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-extrabold text-purple-700 shadow-2xs mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  <span>{t.heroBadge}</span>
                </div>

                {/* Main Headline with Kinetic Reveal & Liquid Aurora Shimmer */}
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-[1.14]">
                  <span className="inline-block animate-hero-reveal">
                    {t.heroTitlePre}
                  </span>{' '}
                  <span className="relative inline-block animate-hero-reveal-delay">
                    <span className="inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-liquid-shimmer">
                      {t.heroTitleHighlight}
                    </span>
                    {/* Animated Neon Stage Underline */}
                    <span className="absolute -bottom-1.5 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 animate-underline-sweep" />
                  </span>
                </h1>

                <p className="mt-3.5 text-sm sm:text-base text-slate-600 max-w-xl font-medium leading-relaxed">
                  {t.heroSubtitle}
                </p>

                {/* Interactive Fandom Quick-Jump Chips */}
                <div className="mt-5 flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mr-1">
                    {lang === 'ko' ? '인기 테마:' : lang === 'es' ? 'Popular:' : 'Hot Picks:'}
                  </span>
                  {quickFandomChips.map((chip) => (
                    <button
                      key={chip.label}
                      onClick={() => handleQuickJump(chip.category, chip.tag)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-extrabold shadow-2xs backdrop-blur-md transition-all active:scale-95 ${chip.style}`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frosted Glass Player Progress Bar */}
              <div className="mt-6 rounded-2xl bg-white/85 backdrop-blur-md border border-purple-200/70 p-3.5 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm shadow-purple-500/5">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-100 to-pink-50 p-0.5 border border-purple-200/80 flex items-center justify-center shrink-0">
                    <img
                      src="/images/hobi01.webp"
                      alt="Hobi Mascot"
                      className="w-full h-full object-contain"
                    />
                    <span className="absolute -bottom-1 -right-1 text-xs">
                      {currentLevel.badgeEmoji}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1.5 gap-2">
                      <span className="font-black text-slate-900 truncate">
                        Lv.{currentLevel.level} {levelTitle}
                      </span>
                      <span className="font-extrabold text-purple-600 text-[11px] shrink-0">
                        {xpToNextLevel > 0
                          ? lang === 'ko'
                            ? `${xpToNextLevel} XP 남음`
                            : `${xpToNextLevel} XP to next`
                          : 'MAX'}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <a
                  href="#ranking"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50/80 hover:bg-purple-100/80 border border-purple-200/60 text-xs font-extrabold text-purple-700 transition-colors shrink-0"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {lang === 'ko'
                      ? '명예의 전당 & 순위'
                      : lang === 'es'
                      ? 'Ver Clasificación'
                      : 'Hall of Fame & Rank'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Spotlight BLACKPINK Member Card */}
            <div className="lg:col-span-5">
              <DailyQuestCard questQuiz={dailyQuestQuiz} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUIZ COLLECTION SECTION — IMMEDIATELY ABOVE THE FOLD */}
      <section id="quizzes" className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-12 w-full">
        <div className="flex flex-col gap-4 mb-7">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t.trendingTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                {t.trendingDesc}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                const categoryLabel = t.categories[category] || category;
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all active:scale-95 ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white border border-slate-200/80 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {categoryLabel}
                  </button>
                );
              })}
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
            <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-slate-200/60">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1.5 uppercase tracking-wider">
                <Tag className="w-3 h-3 text-purple-500" />
                {t.filterByTag}
              </span>
              {availableTags.map((tag) => {
                const isActive = selectedTag === tag;
                const tagLabel = tag === 'All' ? t.allTags : t.tags[tag] || tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`rounded-full px-3 py-1 text-xs font-bold transition-all active:scale-95 ${
                      isActive
                        ? 'bg-purple-600 text-white'
                        : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'
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

      {/* 3. PLAYER STATS & HALL OF FAME SECTION */}
      <section id="ranking" className="border-t border-slate-200/80 bg-slate-50/70 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {lang === 'ko'
                ? '내 챌린저 스탯 & 명예의 전당'
                : lang === 'es'
                ? 'Estadísticas y Salón de la Fama'
                : 'Your Stats & Global Hall of Fame'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              {lang === 'ko'
                ? '퀴즈를 풀고 XP를 모아 글로벌 팬들과 랭킹을 겨뤄보세요.'
                : lang === 'es'
                ? 'Gana XP resolviendo quizzes y sube en el ranking global.'
                : 'Earn XP by completing quizzes and climb the seasonal ranks.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PlayerLevelCard />
            <LeaderboardCard />
          </div>
        </div>
      </section>

      {/* Ad Placement */}
      <div className="max-w-5xl mx-auto px-4 py-4 w-full">
        <AdPlaceholder format="horizontal" label={t.ads.sponsored} />
      </div>

      {/* 4. KNOWLEDGE & LORE GUIDES PROGRAMMATIC SEO SECTION */}
      <section className="border-t border-slate-200/80 bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-100/80 flex items-center justify-center shrink-0 text-3xl">
                📚
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-black text-[11px] mb-2">
                  <Sparkles className="w-3 h-3 text-purple-600" />
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
              className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-purple-600 text-white font-black text-xs sm:text-sm shadow-sm transition-all active:scale-95"
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

      {/* 5. SEO / AD-APPROVAL VALUE SECTION */}
      <section className="border-t border-slate-200/80 bg-[#F9FAFB] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {t.whySectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
              {t.whySectionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {t.whyCards.map((card, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs"
              >
                <div className="text-3xl mb-3">{card.emoji}</div>
                <h3 className="font-black text-sm sm:text-base text-slate-900 mb-1.5">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
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
