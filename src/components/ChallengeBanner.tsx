'use client';

import React from 'react';
import { Swords, AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface ChallengeBannerProps {
  mode: 'intro' | 'in-game' | 'error';
  challengerName?: string;
  challengerScore?: number;
  userCumulativeScore?: number;
  challengerCumulativeScore?: number;
  currentQuestionIndex?: number;
  onStart?: () => void;
  onDismissError?: () => void;
}

export default function ChallengeBanner({
  mode,
  challengerName,
  challengerScore = 0,
  userCumulativeScore = 0,
  challengerCumulativeScore = 0,
  onStart,
  onDismissError,
}: ChallengeBannerProps) {
  const { t } = useLanguage();
  const displayName = challengerName || t.challenge.defaultFriend;

  // 1. Error Banner (Expired or Invalid challenge)
  if (mode === 'error') {
    return (
      <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-900 flex items-center justify-between gap-3 shadow-sm animate-fadeIn">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{t.challenge.bannerError}</span>
        </div>
        {onDismissError && (
          <button
            type="button"
            onClick={onDismissError}
            className="text-xs font-black text-amber-700 hover:text-amber-900 px-2 py-1 rounded-lg hover:bg-amber-100 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    );
  }

  // 2. Intro Banner (Shown at the top of the quiz intro view)
  if (mode === 'intro') {
    const bannerMsg = t.challenge.bannerTitle
      .replace('{name}', displayName)
      .replace('{score}', challengerScore.toLocaleString());

    return (
      <div className="mb-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-rose-900 text-white shadow-xl shadow-purple-950/20 border-2 border-pink-500/40 relative overflow-hidden animate-fadeIn">
        <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center shrink-0 shadow-md shadow-rose-500/30">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black tracking-wider uppercase mb-1 text-pink-200">
                1:1 FRIEND CHALLENGE
              </div>
              <h3 className="text-sm sm:text-base font-black leading-snug">
                {bannerMsg}
              </h3>
            </div>
          </div>

          {onStart && (
            <button
              type="button"
              onClick={onStart}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-black text-xs sm:text-sm shadow-lg shadow-pink-500/30 active:scale-95 transition-all whitespace-nowrap"
            >
              {t.challenge.startBattle}
            </button>
          )}
        </div>
      </div>
    );
  }

  // 3. In-Game Comparative Score Banner
  const diff = userCumulativeScore - challengerCumulativeScore;
  const isAhead = diff > 0;
  const isBehind = diff < 0;
  const isTied = diff === 0;

  return (
    <div className="mb-3 px-3.5 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 text-xs animate-fadeIn">
      <div className="flex items-center gap-2 font-bold text-slate-700">
        <Swords className="w-3.5 h-3.5 text-purple-600" />
        <span className="line-clamp-1">
          vs <strong className="text-purple-900 font-black">{displayName}</strong> ({challengerCumulativeScore.toLocaleString()} {t.quizRunner.pts})
        </span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {isAhead && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-black text-[11px]">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span>{t.challenge.ahead.replace('{diff}', diff.toLocaleString())}</span>
          </span>
        )}
        {isBehind && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-black text-[11px]">
            <TrendingDown className="w-3 h-3 text-rose-600" />
            <span>{t.challenge.behind.replace('{diff}', Math.abs(diff).toLocaleString())}</span>
          </span>
        )}
        {isTied && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-black text-[11px]">
            <Minus className="w-3 h-3 text-amber-600" />
            <span>{t.challenge.tied}</span>
          </span>
        )}
      </div>
    </div>
  );
}
