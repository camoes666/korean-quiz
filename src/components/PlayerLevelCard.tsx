'use client';

import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedText } from '@/types/quiz';
import { Zap, Flame, Trophy } from 'lucide-react';

export default function PlayerLevelCard() {
  const { lang } = useLanguage();
  const { xp, streak, currentLevel, progressPercent, xpToNextLevel } = useGame();
  const levelTitle = getLocalizedText(currentLevel, 'title', lang);
  const levelLabel =
    lang === 'es' || lang === 'pt'
      ? `Nivel ${currentLevel.level}`
      : lang === 'ko'
      ? `레벨 ${currentLevel.level}`
      : `Level ${currentLevel.level}`;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl bg-slate-100 p-1 border border-slate-200 flex items-center justify-center shrink-0">
              <img src="/images/hobi01.webp" alt="Hobi Avatar" className="w-full h-full object-contain" />
              <div className="absolute -bottom-1 -right-1 text-xs">
                {currentLevel.badgeEmoji}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Level {currentLevel.level}
              </span>
              <h3 className="text-base font-semibold text-slate-900 leading-tight">
                {levelTitle}
              </h3>
            </div>
          </div>

          {/* Total XP Badge */}
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-semibold text-xs font-mono">
            <Zap className="w-3.5 h-3.5 text-slate-600 fill-current" />
            <span>{xp} XP</span>
          </div>
        </div>

        {/* Level Up Progress Bar */}
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
            <span>
              {lang === 'en'
                ? 'Progress to next level'
                : lang === 'es'
                ? 'Para el siguiente nivel'
                : lang === 'pt'
                ? 'Para o próximo nível'
                : '다음 레벨까지'}
            </span>
            <span className="font-semibold text-slate-700">
              {xpToNextLevel > 0
                ? lang === 'en'
                  ? `${xpToNextLevel} XP needed`
                  : lang === 'es'
                  ? `${xpToNextLevel} XP necesarios`
                  : lang === 'pt'
                  ? `${xpToNextLevel} XP necessários`
                  : `${xpToNextLevel} XP 필요`
                : 'MAX LEVEL'}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-slate-900 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mini Stats row */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-normal">
        <span className="flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-rose-500 fill-current" />
          <span className="font-medium text-slate-700">
            {streak}{' '}
            {lang === 'es'
              ? 'días de racha'
              : lang === 'pt'
              ? 'dias seguidos'
              : lang === 'ko'
              ? '일 연속 출석'
              : 'day streak'}
          </span>
        </span>
        <span className="flex items-center gap-1 text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
          <Trophy className="w-3.5 h-3.5 text-slate-500" />
          <span>
            {lang === 'es'
              ? 'Top 12% Retador'
              : lang === 'pt'
              ? 'Top 12% Desafiante'
              : lang === 'ko'
              ? '상위 12% 랭커'
              : 'Top 12% Challenger'}
          </span>
        </span>
      </div>
    </div>
  );
}
