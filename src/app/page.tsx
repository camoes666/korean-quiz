'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getAllQuizzes } from '@/data/quizzes';
import { Category } from '@/types/quiz';
import QuizCard from '@/components/QuizCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import DailyQuestCard from '@/components/DailyQuestCard';
import PlayerLevelCard from '@/components/PlayerLevelCard';
import LeaderboardCard from '@/components/LeaderboardCard';
import { Sparkles, Trophy, Globe, Flame, Heart, ArrowRight, Tag } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const CATEGORIES: Category[] = ['All', 'K-Pop', 'K-Drama', 'Food', 'Culture'];

export default function HomePage() {
  const { t, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allQuizzes = getAllQuizzes();

  // Pick the daily quest quiz (e.g., BTS or Spicy Food)
  const dailyQuestQuiz = allQuizzes.find((q) => q.slug === 'bts-army-trivia') || allQuizzes[0];

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

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      {/* 1. GAMIFIED HERO & DAILY CHALLENGE SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 border-b-2 border-purple-100 bg-gradient-to-b from-purple-100/50 via-white to-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Main Title Banner with Waving Hobi */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            {/* Mascot Greeting Badge */}
            <div className="flex flex-col items-center justify-center mb-5">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-purple-100 via-pink-50 to-indigo-100 p-2 border-2 border-purple-200/80 shadow-lg shadow-purple-500/10 flex items-center justify-center group-hover:scale-105 transition-all">
                  <img
                    src="/images/hobi01.webp"
                    alt="Hobi White Tiger Mascot"
                    className="w-full h-full object-contain filter drop-shadow hover:rotate-3 transition-transform"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black text-[11px] whitespace-nowrap shadow-sm shadow-purple-500/25 border border-white">
                  {lang === 'en' ? 'Mascot Hobi 🐯' : lang === 'es' ? 'Mascota Hobi 🐯' : '마스코트 호비 🐯'}
                </div>
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-black text-purple-700 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '5s' }} />
                <span>{t.heroBadge}</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
              {t.heroTitlePre} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
                {t.heroTitleHighlight}
              </span>{' '}
              ✨
            </h1>

            <p className="mt-4 text-xs sm:text-base text-slate-600 max-w-xl mx-auto font-medium leading-relaxed">
              {t.heroSubtitle}
            </p>
          </div>

          {/* Daily Quest Highlight Card */}
          <div className="mb-8">
            <DailyQuestCard questQuiz={dailyQuestQuiz} />
          </div>

          {/* Gamified Widgets Grid: Player Stats & Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PlayerLevelCard />
            <LeaderboardCard />
          </div>
        </div>
      </section>

      {/* Ad Placement */}
      <div className="max-w-5xl mx-auto px-4 w-full">
        <AdPlaceholder format="horizontal" label={t.ads.sponsored} />
      </div>

      {/* 2. QUIZ COLLECTION SECTION WITH 3D PILL FILTERS */}
      <section id="quizzes" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="flex flex-col gap-5 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t.trendingTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                {t.trendingDesc}
              </p>
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
                    className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-black transition-all active:scale-95 ${
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
                    className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all active:scale-95 ${
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
            <p className="text-base font-bold">No quizzes found for this filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedTag('All');
              }}
              className="mt-3 text-xs text-violet-600 font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
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
