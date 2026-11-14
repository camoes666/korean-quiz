'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Flame, Zap, ChevronDown, Check, BookOpen, MapPin } from 'lucide-react';
import { MAP_TRANSLATIONS } from '@/lib/mapTranslations';
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
          <div className="w-8 h-8 rounded-lg bg-slate-100 p-0.5 border border-slate-200 flex items-center justify-center overflow-hidden relative">
            <img
              src="/images/hobi01.webp"
              alt="Hobi Mascot"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
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
            {/* Streak hides on phones so the language switcher still fits in a 375px header. */}
            <span className="hidden sm:flex items-center gap-1 text-rose-600 font-extrabold" title={`${streak} Day Streak`}>
              <Flame className="w-3.5 h-3.5 fill-current text-rose-500" />
              <span className="tabular-nums">{streak}</span>
            </span>
            <span className="hidden sm:block h-3 w-px bg-slate-200" />
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

          {/* K-Pop Star Map Navigation Link */}
          <Link
            href="/map"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-pink-200 bg-pink-50/80 hover:bg-pink-100/80 text-slate-900 font-semibold text-xs transition-colors shrink-0"
            title={MAP_TRANSLATIONS[lang]?.title || 'K-Pop Star Map'}
          >
            <MapPin className="w-3.5 h-3.5 text-pink-600" />
            <span>
              {MAP_TRANSLATIONS[lang]?.navLabel || 'K-Map'}
            </span>
          </Link>

          {/* Idol Chemistry & Saju Compatibility Link */}
          <Link
            href="/chemistry"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs transition-colors shrink-0"
            title={
              lang === 'ko'
                ? 'K-사주 × MBTI 아이돌 궁합 연구소'
                : lang === 'es'
                ? 'Calculadora de Química K-Pop y Saju'
                : lang === 'pt'
                ? 'Calculadora de Química K-Pop & Saju'
                : 'K-Pop Idol Saju × MBTI Chemistry'
            }
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span className="hidden sm:inline">
              {lang === 'ko'
                ? '아이돌 궁합'
                : lang === 'es'
                ? 'Química Idol'
                : lang === 'pt'
                ? 'Química Idol'
                : 'Idol Chemistry'}
            </span>
          </Link>

          {/* Knowledge Guides Navigation Link */}
          <Link
            href="/guide"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors shrink-0"
            title={
              lang === 'ko'
                ? 'K-컬처 & K-Pop 지식 가이드'
                : lang === 'es'
                ? 'Guías de Lore'
                : lang === 'pt'
                ? 'Guias de Lore'
                : 'Knowledge & Lore Guides'
            }
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
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
              className="flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors"
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
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-900/5 z-50 animate-fadeIn">
                <div className="text-[11px] font-medium text-slate-400 px-2.5 py-1 mb-1 border-b border-slate-100">
                  Language
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
                      className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                        isSelected
                          ? 'bg-slate-100 text-slate-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-sm">{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-slate-900" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Surprise Me Action Button */}
          <button
            onClick={handleRandomQuiz}
            className="hidden sm:flex items-center gap-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 text-xs font-medium shadow-2xs transition-colors"
            title={t.surpriseMe}
          >
            <span>{t.surpriseMe}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
