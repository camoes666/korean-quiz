'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Flame, Zap, ChevronDown, Check, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { quizzes } from '@/data/quizzes';
import { getLocalizedText } from '@/types/quiz';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';

export default function Navbar() {
  const router = useRouter();
  const { lang, setLang, t, languages } = useLanguage();
  const { xp, streak, currentLevel } = useGame();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === lang) || languages[0];
  const levelTitle = getLocalizedText(currentLevel, 'title', lang);
  const levelPrefix = lang === 'es' || lang === 'pt' ? 'Nv.' : 'Lv.';

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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-purple-50 p-0.5 border border-purple-200/60 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform overflow-hidden relative">
            <img
              src="/images/hobi01.webp"
              alt="Hobi Mascot"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-black text-xl tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
            {t.siteTitle}
          </span>
        </Link>

        {/* Right Controls: Unified Status Pill + Nav Links */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Unified Player Status Pill (Streak + XP + Level) */}
          <div
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-700"
            title={`Level ${currentLevel.level}: ${levelTitle} · ${streak}d streak`}
          >
            <span className="flex items-center gap-1 text-rose-600 font-extrabold" title={`${streak} Day Streak`}>
              <Flame className="w-3.5 h-3.5 fill-current text-rose-500" />
              <span className="tabular-nums">{streak}</span>
            </span>
            <span className="h-3 w-px bg-slate-200" />
            <span className="flex items-center gap-1 text-emerald-700 font-extrabold">
              <Zap className="w-3.5 h-3.5 fill-current text-emerald-500" />
              <span className="tabular-nums">{xp}</span>
              <span className="text-[10px] text-emerald-600/80">XP</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 border-l border-slate-200 pl-2">
              <span>{currentLevel.badgeEmoji}</span>
              <span>{levelPrefix}{currentLevel.level}</span>
            </span>
          </div>

          {/* Knowledge Guides Navigation Link */}
          <Link
            href="/guide"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors shrink-0"
            title={lang === 'ko' ? 'K-컬처 & K-Pop 지식 가이드' : lang === 'es' ? 'Guías de Lore' : 'Knowledge & Lore Guides'}
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">
              {lang === 'en'
                ? 'Guides'
                : lang === 'es'
                ? 'Guías'
                : lang === 'pt'
                ? 'Guias'
                : lang === 'ko'
                ? '지식 가이드'
                : lang === 'ru'
                ? 'Гайды'
                : lang === 'zh'
                ? '指南'
                : 'Guides'}
            </span>
          </Link>

          {/* Language Dropdown Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors active:scale-95"
              aria-label="Select language"
            >
              <span className="text-sm">{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.label}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/5 z-50 animate-fadeIn">
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
                          ? 'bg-purple-50 text-purple-700 font-black'
                          : 'text-slate-700 hover:bg-slate-50'
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

          {/* Surprise Me Action Button */}
          <button
            onClick={handleRandomQuiz}
            className="hidden sm:flex items-center gap-1.5 rounded-full bg-slate-900 hover:bg-purple-600 active:scale-95 text-white px-3.5 py-1.5 text-xs font-bold shadow-2xs transition-colors"
            title={t.surpriseMe}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.surpriseMe}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
