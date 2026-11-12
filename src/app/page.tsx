'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getAllQuizzes, getHeroQuizzes } from '@/data/quizzes';
import { Category, getLocalizedText } from '@/types/quiz';
import QuizCard from '@/components/QuizCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import HeroCarousel from '@/components/HeroCarousel';
import PlayerLevelCard from '@/components/PlayerLevelCard';
import LeaderboardCard from '@/components/LeaderboardCard';
import { Sparkles, Trophy, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';

const CATEGORIES: Category[] = ['All', 'K-Pop', 'K-Drama', 'Food', 'Culture'];

export default function HomePage() {
  const { t, lang } = useLanguage();
  const { currentLevel, progressPercent, xpToNextLevel } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allQuizzes = getAllQuizzes();
  const levelTitle = getLocalizedText(currentLevel, 'title', lang);

  const heroSlides = getHeroQuizzes();

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
    const matchesCategory =
      selectedCategory === 'All' || quiz.category === selectedCategory;
    const matchesTag =
      selectedTag === 'All' || quiz.tag === selectedTag;
    return matchesCategory && matchesTag;
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
      label: 'BLACKPINK',
      category: 'K-Pop' as Category,
      tag: 'BLACKPINK',
    },
    {
      label: 'BTS',
      category: 'K-Pop' as Category,
      tag: 'BTS',
    },
    {
      label: 'Stray Kids',
      category: 'K-Pop' as Category,
      tag: 'Stray Kids',
    },
    {
      label: 'TWICE',
      category: 'K-Pop' as Category,
      tag: 'TWICE',
    },
    {
      label: 'ENHYPEN',
      category: 'K-Pop' as Category,
      tag: 'ENHYPEN',
    },
    {
      label: 'aespa',
      category: 'K-Pop' as Category,
      tag: 'aespa',
    },
    {
      label: 'LE SSERAFIM',
      category: 'K-Pop' as Category,
      tag: 'LE SSERAFIM',
    },
    {
      label: lang === 'ko' ? 'K-푸드' : 'K-Food',
      category: 'Food' as Category,
      tag: 'All',
    },
    {
      label: lang === 'ko' ? 'K-드라마' : 'K-Drama',
      category: 'K-Drama' as Category,
      tag: 'All',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* 1. EDITORIAL STAGE HERO */}
      <section className="relative overflow-hidden py-10 sm:py-14 border-b border-slate-200/80 bg-white">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* DOM order is headline → carousel → chips/level so phones see a clickable test in the
              first screen; on lg the grid puts the carousel back in the right column. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-x-8 lg:gap-y-6 items-stretch">
            {/* Left Column (top): Brand Pitch */}
            <div className="lg:col-span-7 lg:row-start-1">
              {/* Hero Top Badge */}
              <div className="inline-flex items-center gap-2 rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-mono font-medium text-slate-700 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>{t.heroBadge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 leading-[1.15]">
                <span>{t.heroTitlePre}</span>{' '}
                <span className="text-slate-950 underline decoration-rose-500 decoration-2 underline-offset-8">
                  {t.heroTitleHighlight}
                </span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
                {t.heroSubtitle}
              </p>
            </div>

            {/* Right Column: rotating spotlight of featured personality tests */}
            <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2">
              <HeroCarousel slides={heroSlides} />
            </div>

            {/* Left Column (bottom): Fandom Quick-Jump Chips + Level Bar */}
            <div className="lg:col-span-7 lg:row-start-2 flex flex-col justify-end">
              {/* Interactive Fandom Quick-Jump Chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-slate-400 mr-1">
                  {lang === 'ko' ? '인기 테마:' : lang === 'es' ? 'Popular:' : lang === 'pt' ? 'Em Alta:' : 'Hot Picks:'}
                </span>
                {quickFandomChips.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => handleQuickJump(chip.category, chip.tag)}
                    className="px-2.5 py-1 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors active:scale-95"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Editorial Player Progress Bar */}
              <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="relative w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
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
                      <span className="font-bold text-slate-900 truncate">
                        Lv.{currentLevel.level} {levelTitle}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500 shrink-0">
                        {xpToNextLevel > 0
                          ? lang === 'ko'
                            ? `${xpToNextLevel} XP 남음`
                            : lang === 'es'
                            ? `Faltan ${xpToNextLevel} XP`
                            : lang === 'pt'
                            ? `Faltam ${xpToNextLevel} XP`
                            : `${xpToNextLevel} XP to next`
                          : 'MAX'}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-slate-900 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <a
                  href="#ranking"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors shrink-0"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {lang === 'ko'
                      ? '명예의 전당 & 순위'
                      : lang === 'es'
                      ? 'Ver Clasificación'
                      : lang === 'pt'
                      ? 'Ver Classificação'
                      : 'Hall of Fame & Rank'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 IDOL K-SAJU × MBTI CHEMISTRY LAB SPOTLIGHT BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 w-full">
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 text-white p-6 sm:p-8 border border-slate-800">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded border border-white/15 bg-white/5 text-[11px] font-mono text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>
                  {lang === 'ko'
                    ? 'K-사주 오행 × MBTI × 별자리 1:1 궁합'
                    : lang === 'es'
                    ? 'Química K-Saju × MBTI × Zodiaco'
                    : 'K-Saju Five Elements × MBTI × Zodiac'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                {lang === 'ko'
                  ? '나와 최애 아이돌의 사주·MBTI 궁합은 몇 %일까?'
                  : lang === 'es'
                  ? '¿Cuál es tu % de compatibilidad K-Saju y MBTI con tu Bias?'
                  : 'What Is Your K-Saju & MBTI Compatibility % With Your Bias?'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                {lang === 'ko'
                  ? '7개 그룹 44명 멤버의 실제 생년월일(오행: 목·화·토·금·수)과 MBTI로 10초 만에 내 최애와의 궁합 리포트와 그룹 내 천생연분 순위를 확인하세요!'
                  : lang === 'es'
                  ? 'Analiza tu fecha de nacimiento y MBTI con 44 miembros reales de BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa y LE SSERAFIM.'
                  : 'Match your birth date (Korean Saju Five Elements) & MBTI against 44 idols across BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa & LE SSERAFIM!'}
              </p>

              {/* Direct Group Shortcut Pills */}
              <div className="flex items-center gap-1.5 flex-wrap pt-2">
                {[
                  { id: 'bts', label: 'BTS' },
                  { id: 'stray-kids', label: 'Stray Kids' },
                  { id: 'blackpink', label: 'BLACKPINK' },
                  { id: 'twice', label: 'TWICE' },
                  { id: 'enhypen', label: 'ENHYPEN' },
                  { id: 'aespa', label: 'aespa' },
                  { id: 'le-sserafim', label: 'LE SSERAFIM' },
                ].map((grp) => (
                  <Link
                    key={grp.id}
                    href={`/chemistry/${grp.id}`}
                    className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-medium text-slate-200 transition-colors"
                  >
                    {grp.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="shrink-0">
              <Link
                href="/chemistry"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm transition-colors"
              >
                <span>
                  {lang === 'ko'
                    ? '10초 궁합 분석 시작하기'
                    : lang === 'es'
                    ? 'Calcular Mi Química Ahora'
                    : 'Check Idol Chemistry Now'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUIZ COLLECTION SECTION */}
      <section id="quizzes" className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 w-full">
        <div className="flex flex-col gap-4 mb-7">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                {t.trendingTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
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
                    className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
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

          {/* Sub-tag Bar */}
          {availableTags.length > 1 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-slate-200/60">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mr-1.5 uppercase tracking-wider">
                <Tag className="w-3 h-3 text-slate-400" />
                {t.filterByTag}
              </span>
              {availableTags.map((tag) => {
                const isActive = selectedTag === tag;
                const tagLabel = tag === 'All' ? t.allTags : t.tags[tag] || tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-slate-900 text-white'
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
                setSelectedCategory('All');
                setSelectedTag('All');
              }}
              className="mt-3 text-xs text-slate-900 font-bold hover:underline"
            >
              {t.resetFilters}
            </button>
          </div>
        )}
      </section>

      {/* 3. PLAYER STATS & HALL OF FAME SECTION */}
      <section id="ranking" className="border-t border-slate-200/80 bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
              {lang === 'ko'
                ? '내 챌린저 스탯 & 명예의 전당'
                : lang === 'es'
                ? 'Estadísticas y Salón de la Fama'
                : lang === 'pt'
                ? 'Estatísticas e Hall da Fama'
                : 'Your Stats & Global Hall of Fame'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
              {lang === 'ko'
                ? '퀴즈를 풀고 XP를 모아 글로벌 팬들과 랭킹을 겨뤄보세요.'
                : lang === 'es'
                ? 'Gana XP resolviendo quizzes y sube en el ranking global.'
                : lang === 'pt'
                ? 'Ganhe XP resolvendo quizzes e suba no ranking global.'
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

      {/* 4. KNOWLEDGE & LORE GUIDES SECTION */}
      <section className="border-t border-slate-200/80 bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-800">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-slate-200 bg-white text-slate-700 font-mono text-[11px] mb-2">
                  <span>
                    {lang === 'en'
                      ? '230+ Verified Facts'
                      : lang === 'es'
                      ? '230+ Hechos Verificados'
                      : lang === 'pt'
                      ? '230+ Fatos Verificados'
                      : '230+개 팩트체크 수록'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 leading-snug">
                  {lang === 'en'
                    ? 'K-Culture & K-Pop Fan Knowledge Guides'
                    : lang === 'es'
                    ? 'Guías de Lore y Conocimiento K-Pop'
                    : lang === 'pt'
                    ? 'Guias de Lore e Conhecimento K-Pop'
                    : 'K-컬처 & K-Pop 팬 지식 가이드 백과'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 max-w-xl">
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
              className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors"
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

      {/* 5. EDITORIAL VALUE SECTION */}
      <section className="border-t border-slate-200/80 bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
              {t.whySectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal">
              {t.whySectionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {t.whyCards.map((card, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs"
              >
                <div className="text-2xl mb-3">{card.emoji}</div>
                <h3 className="font-bold text-sm sm:text-base text-slate-950 mb-1.5">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
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
