'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Flame, Zap, ChevronDown, Check, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { quizzes } from '@/data/quizzes';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';

export default function Navbar() {
  const router = useRouter();
  const { lang, setLang, t, languages } = useLanguage();
  const { xp, streak, currentLevel } = useGame();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === lang) || languages[0];
  const levelTitle = lang === 'ko' ? currentLevel.titleKo : currentLevel.title;

  const handleRandomQuiz = () => {
    if (!quizzes.length) return;
    const randomIndex = Math.floor(Math.random() * quizzes.length);
    const randomSlug = quizzes[randomIndex].slug;
    router.push(`/quiz/${randomSlug}`);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-zinc-200/80 dark:border-zinc-800 bg-[#FAF9F6]/90 dark:bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo with 3D Pop Effect */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-xl shadow-md border-b-2 border-violet-800 group-hover:scale-105 transition-transform">
            K
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t.siteTitle}
              </span>
              <span className="text-[10px] font-black tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 shadow-sm border-b border-amber-500">
                PRO
              </span>
            </div>
          </div>
        </Link>

        {/* Gamified Player Stats Header (Streak + XP + Level) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak Pill */}
          <div
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-orange-500/10 border-2 border-orange-500/30 text-orange-600 dark:text-orange-400 font-black text-xs shadow-sm cursor-default"
            title={`${streak} Day Streak!`}
          >
            <Flame className="w-4 h-4 fill-current animate-pulse text-orange-500" />
            <span className="tabular-nums font-extrabold">{streak}</span>
            <span className="hidden md:inline font-bold text-[11px]">
              {lang === 'ko' ? '일 연속' : 'd streak'}
            </span>
          </div>

          {/* XP & Level Pill */}
          <div
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-700 dark:text-amber-400 font-black text-xs shadow-sm cursor-default"
            title={`Level ${currentLevel.level}: ${levelTitle}`}
          >
            <Zap className="w-4 h-4 fill-current text-amber-500" />
            <span className="tabular-nums font-extrabold">{xp}</span>
            <span className="text-[10px] font-bold text-amber-600/80">XP</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-bold border-l border-amber-500/30 pl-2 ml-1 text-zinc-600 dark:text-zinc-300">
              <span>{currentLevel.badgeEmoji}</span>
              <span>Lv.{currentLevel.level}</span>
            </span>
          </div>

          {/* 5-Language Dropdown Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-zinc-800 dark:text-zinc-200 transition-all shadow-sm active:translate-y-0.5"
              aria-label="Select language"
            >
              <span className="text-sm">{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.label}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1.5 shadow-2xl z-50 animate-fadeIn">
                <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400 px-2.5 py-1 mb-1 border-b border-zinc-100 dark:border-zinc-800">
                  Select Language
                </div>
                {languages.map((l) => {
                  const isSelected = l.code === lang;
                  return (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-sm">{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Surprise Me 3D Action Button */}
          <button
            onClick={handleRandomQuiz}
            className="hidden sm:flex items-center gap-1.5 rounded-xl border-b-4 border-violet-800 bg-violet-600 hover:bg-violet-700 active:border-b-0 active:translate-y-1 text-white px-3.5 py-1.5 text-xs font-black shadow-md transition-all"
            title={t.surpriseMe}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{t.surpriseMe}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
