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
    <header className="sticky top-0 z-50 w-full border-b-2 border-purple-100 bg-white/95 backdrop-blur-md shadow-xs shadow-purple-500/5">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo with 3D Pop Effect & Hobi Mascot */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-100 via-pink-50 to-purple-200 p-0.5 border border-purple-200 flex items-center justify-center shadow-md shadow-purple-500/15 group-hover:scale-105 transition-transform overflow-hidden relative">
            <img
              src="/images/hobi01.webp"
              alt="Hobi Mascot"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                {t.siteTitle}
              </span>
              <span className="text-[10px] font-black tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 shadow-xs">
                PRO
              </span>
            </div>
          </div>
        </Link>

        {/* Gamified Player Stats Header (Streak + XP + Level) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak Pill */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-xs shadow-xs cursor-default"
            title={`${streak} Day Streak!`}
          >
            <Flame className="w-4 h-4 fill-current animate-pulse text-rose-500" />
            <span className="tabular-nums font-extrabold">{streak}</span>
            <span className="hidden md:inline font-bold text-[11px]">
              {lang === 'ko' ? '일 연속' : lang === 'es' ? 'días de racha' : lang === 'ru' ? 'дн. подряд' : lang === 'zh' ? '天连续' : 'd streak'}
            </span>
          </div>

          {/* XP & Level Pill */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-black text-xs shadow-xs cursor-default"
            title={`Level ${currentLevel.level}: ${levelTitle}`}
          >
            <Zap className="w-4 h-4 fill-current text-emerald-500" />
            <span className="tabular-nums font-extrabold">{xp}</span>
            <span className="text-[10px] font-bold text-emerald-600">XP</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-bold border-l border-emerald-200 pl-2 ml-1 text-slate-600">
              <span>{currentLevel.badgeEmoji}</span>
              <span>Lv.{currentLevel.level}</span>
            </span>
          </div>

          {/* 5-Language Dropdown Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 rounded-full border border-purple-100 bg-white hover:bg-purple-50/50 px-3 py-1.5 text-xs font-bold text-slate-800 transition-all shadow-xs active:scale-95"
              aria-label="Select language"
            >
              <span className="text-sm">{currentLang.flag}</span>
              <span className="hidden sm:inline font-extrabold">{currentLang.label}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl border-2 border-purple-100 bg-white p-1.5 shadow-xl shadow-purple-500/10 z-50 animate-fadeIn">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2.5 py-1 mb-1 border-b border-slate-100">
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
                          ? 'bg-purple-100 text-purple-700 font-black'
                          : 'text-slate-700 hover:bg-purple-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-sm">{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-purple-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Surprise Me 3D Action Button */}
          <button
            onClick={handleRandomQuiz}
            className="hidden sm:flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 text-white px-4 py-2 text-xs font-black shadow-md shadow-purple-500/20 transition-all"
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
