'use client';

import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';
import { Zap, Flame, Trophy } from 'lucide-react';

export default function PlayerLevelCard() {
  const { lang } = useLanguage();
  const { xp, streak, currentLevel, progressPercent, xpToNextLevel } = useGame();
  const levelTitle = lang === 'ko' ? currentLevel.titleKo : currentLevel.title;

  return (
    <div className="rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center text-2xl shadow-md border-b-2 border-violet-800">
            {currentLevel.badgeEmoji}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                Level {currentLevel.level}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white leading-tight">
              {levelTitle}
            </h3>
          </div>
        </div>

        {/* Total XP Badge */}
        <div className="text-right">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-400 text-amber-950 font-black text-xs shadow-sm border-b-2 border-amber-600">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{xp} XP</span>
          </div>
        </div>
      </div>

      {/* Level Up Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500 mb-1.5">
          <span>{lang === 'ko' ? '다음 레벨까지' : 'Progress to next level'}</span>
          <span>{xpToNextLevel > 0 ? `${xpToNextLevel} XP needed` : 'MAX LEVEL'}</span>
        </div>
        <div className="h-3 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 p-0.5 border border-zinc-200 dark:border-zinc-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 transition-all duration-500 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Mini Stats row */}
      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 font-medium">
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-orange-500 fill-current" />
          <span>{streak} {lang === 'ko' ? '일 연속 출석' : 'day streak'}</span>
        </span>
        <span className="flex items-center gap-1 text-violet-600 dark:text-violet-400 font-bold">
          <Trophy className="w-3.5 h-3.5" />
          <span>{lang === 'ko' ? '글로벌 랭크: 상위 12%' : 'Top 12% Challenger'}</span>
        </span>
      </div>
    </div>
  );
}
