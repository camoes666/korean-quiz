'use client';

import { Award, Check, Lock, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LEVELS, useGame } from '@/context/GameContext';
import { getLocalizedText } from '@/types/quiz';

export default function LeaderboardCard() {
  const { lang } = useLanguage();
  const { xp, currentLevel } = useGame();
  const currentTitle = getLocalizedText(currentLevel, 'title', lang);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-950 leading-tight">
                {lang === 'ko'
                  ? '챌린저 티어 로드맵'
                  : lang === 'es'
                  ? 'Niveles de Desafiante'
                  : lang === 'pt'
                  ? 'Níveis de Desafiante'
                  : 'Challenger Tier Roadmap'}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {lang === 'ko'
                  ? '퀴즈와 도전을 통해 잠금 해제되는 5단계 등급'
                  : lang === 'es'
                  ? '5 niveles desbloqueables al completar quizzes'
                  : lang === 'pt'
                  ? '5 níveis desbloqueáveis ao completar quizzes'
                  : '5 progression tiers unlocked as you earn XP'}
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-600">
            <span>{currentLevel.badgeEmoji}</span>
            <span>
              {lang === 'es' || lang === 'pt' ? 'Nv.' : 'Lv.'}
              {currentLevel.level} / {LEVELS.length}
            </span>
          </span>
        </div>

        {/* 5 Real Progression Tiers from GameContext */}
        <div className="space-y-1.5 mb-4">
          {LEVELS.map((tier) => {
            const tierTitle = getLocalizedText(tier, 'title', lang);
            const isCurrent = tier.level === currentLevel.level;
            const isUnlocked = xp >= tier.minXP;

            return (
              <div
                key={tier.level}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2 border text-xs transition-colors ${
                  isCurrent
                    ? 'bg-slate-900/5 border-slate-900/30 font-semibold text-slate-950'
                    : isUnlocked
                    ? 'bg-slate-50/80 border-slate-100 text-slate-800 font-medium'
                    : 'bg-white border-slate-100 text-slate-400 font-normal'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-5 text-center text-sm shrink-0">
                    {tier.badgeEmoji}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 shrink-0">
                    {lang === 'es' || lang === 'pt' ? 'Nv.' : 'Lv.'}
                    {tier.level}
                  </span>
                  <span className="truncate">{tierTitle}</span>
                  {isCurrent && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white text-[10px] font-mono font-semibold shrink-0">
                      {lang === 'ko'
                        ? '현재'
                        : lang === 'es' || lang === 'pt'
                        ? 'ACTUAL'
                        : 'NOW'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[11px] shrink-0">
                  <span>{tier.minXP} XP</span>
                  {isUnlocked ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Lock className="w-3 h-3 text-slate-300" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real Current Tier & XP Summary Bar */}
      <div className="rounded-xl border border-slate-900 bg-slate-950 text-white px-3.5 py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white text-[10px] font-mono font-bold tracking-wider shrink-0">
            {currentLevel.badgeEmoji}
          </span>
          <span className="text-xs font-medium text-slate-200 truncate">
            {lang === 'ko'
              ? `현재 등급: Lv.${currentLevel.level} ${currentTitle}`
              : lang === 'es'
              ? `Nivel Actual: Nv.${currentLevel.level} ${currentTitle}`
              : lang === 'pt'
              ? `Nível Atual: Nv.${currentLevel.level} ${currentTitle}`
              : `Current Tier: Lv.${currentLevel.level} ${currentTitle}`}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-mono font-bold text-rose-400 shrink-0">
          <Zap className="w-3.5 h-3.5 fill-current text-rose-400" />
          <span>{xp} XP</span>
        </div>
      </div>
    </div>
  );
}
