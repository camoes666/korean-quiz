'use client';

import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';
import { Zap, Flame, Trophy } from 'lucide-react';

export default function PlayerLevelCard() {
  const { lang } = useLanguage();
  const { xp, streak, currentLevel, progressPercent, xpToNextLevel } = useGame();
  const levelTitle = lang === 'ko' ? currentLevel.titleKo : currentLevel.title;

  return (
    <div className="rounded-2xl border-2 border-purple-100 bg-white p-6 shadow-lg shadow-purple-500/5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-2xl shadow-md shadow-purple-500/20">
            {currentLevel.badgeEmoji}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-purple-600 uppercase tracking-wider">
                Level {currentLevel.level}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              {levelTitle}
            </h3>
          </div>
        </div>

        {/* Total XP Badge */}
        <div className="text-right">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-400 text-emerald-950 font-black text-xs shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{xp} XP</span>
          </div>
        </div>
      </div>

      {/* Level Up Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5">
          <span>{lang === 'ko' ? '다음 레벨까지' : 'Progress to next level'}</span>
          <span className="font-extrabold text-purple-600">
            {xpToNextLevel > 0 ? `${xpToNextLevel} XP needed` : 'MAX LEVEL'}
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-slate-100 p-0.5 border border-slate-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-400 transition-all duration-500 shadow-xs"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Mini Stats row */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-rose-500 fill-current animate-pulse" />
          <span className="font-bold text-slate-700">{streak} {lang === 'ko' ? '일 연속 출석' : 'day streak'}</span>
        </span>
        <span className="flex items-center gap-1 text-purple-600 font-black bg-purple-50 px-2.5 py-0.5 rounded-full">
          <Trophy className="w-3.5 h-3.5" />
          <span>{lang === 'ko' ? '상위 12% 랭커' : 'Top 12% Challenger'}</span>
        </span>
      </div>
    </div>
  );
}
