'use client';

import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';
import { Zap, Flame, Trophy } from 'lucide-react';

export default function PlayerLevelCard() {
  const { lang } = useLanguage();
  const { xp, streak, currentLevel, progressPercent, xpToNextLevel } = useGame();
  const levelTitle = lang === 'en' || lang === 'es' ? currentLevel.title : currentLevel.titleKo;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl bg-purple-50 p-1 border border-purple-100 flex items-center justify-center shrink-0">
              <img src="/images/hobi01.webp" alt="Hobi Avatar" className="w-full h-full object-contain" />
              <div className="absolute -bottom-1 -right-1 text-sm">
                {currentLevel.badgeEmoji}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-black text-purple-600 uppercase tracking-wider">
                Level {currentLevel.level}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                {levelTitle}
              </h3>
            </div>
          </div>

          {/* Total XP Badge */}
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 font-black text-xs">
            <Zap className="w-3.5 h-3.5 fill-current text-emerald-500" />
            <span>{xp} XP</span>
          </div>
        </div>

        {/* Level Up Progress Bar */}
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>
              {lang === 'en'
                ? 'Progress to next level'
                : lang === 'es'
                ? 'Para el siguiente nivel'
                : '다음 레벨까지'}
            </span>
            <span className="font-extrabold text-purple-600">
              {xpToNextLevel > 0
                ? lang === 'en'
                  ? `${xpToNextLevel} XP needed`
                  : lang === 'es'
                  ? `${xpToNextLevel} XP necesarios`
                  : `${xpToNextLevel} XP 필요`
                : 'MAX LEVEL'}
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mini Stats row */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span className="flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-rose-500 fill-current" />
          <span className="font-bold text-slate-700">
            {streak}{' '}
            {lang === 'en'
              ? 'day streak'
              : lang === 'es'
              ? 'días de racha'
              : '일 연속 출석'}
          </span>
        </span>
        <span className="flex items-center gap-1 text-purple-700 font-bold bg-purple-50 px-2.5 py-1 rounded-full">
          <Trophy className="w-3.5 h-3.5" />
          <span>
            {lang === 'en'
              ? 'Top 12% Challenger'
              : lang === 'es'
              ? 'Top 12% Retador'
              : '상위 12% 랭커'}
          </span>
        </span>
      </div>
    </div>
  );
}
