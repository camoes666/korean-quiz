'use client';

import { Trophy, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';

interface LeaderboardUser {
  rank: number;
  name: string;
  flag: string;
  xp: number;
  badge: string;
}

const TOP_USERS: LeaderboardUser[] = [
  { rank: 1, name: 'Borahae_Army99', flag: '🇺🇸', xp: 2450, badge: '👑 Legend' },
  { rank: 2, name: 'SeoulVibe_Mate', flag: '🇰🇷', xp: 2180, badge: '⭐ Master' },
  { rank: 3, name: 'KPopLover_ES', flag: '🇪🇸', xp: 1940, badge: '🔥 Icon' },
  { rank: 4, name: 'MinYoongi_Cat', flag: '🇲🇽', xp: 1720, badge: '🎤 Pro' },
  { rank: 5, name: 'Tokyo_Kdrama', flag: '🇯🇵', xp: 1590, badge: '🎤 Pro' },
];

export default function LeaderboardCard() {
  const { lang } = useLanguage();
  const { xp } = useGame();

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center font-black">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              {lang === 'ko'
                ? '글로벌 명예의 전당'
                : lang === 'es'
                ? 'Salón de la Fama Global'
                : 'Global Hall of Fame'}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              {lang === 'ko'
                ? '시즌 1 TOP 5 챌린저'
                : lang === 'es'
                ? 'Top 5 Temporada 1'
                : 'Season 1 Top Challengers'}
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
          <span>🏆</span>
          <span>{lang === 'ko' ? '시즌 1' : lang === 'es' ? 'Temporada 1' : 'Season 1'}</span>
        </span>
      </div>

      {/* Compact Clean Leaderboard List */}
      <div className="space-y-1.5 mb-4">
        {TOP_USERS.slice(0, 3).map((user) => (
          <div
            key={user.rank}
            className="flex items-center justify-between rounded-xl px-3.5 py-2.5 bg-slate-50/80 border border-slate-100 text-xs font-semibold"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-5 text-center font-black text-sm">
                {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
              </span>
              <span>{user.flag}</span>
              <span className="text-slate-800 font-bold truncate max-w-[150px]">
                {user.name}
              </span>
            </div>
            <div className="flex items-center gap-1 font-bold text-slate-600">
              <Zap className="w-3 h-3 fill-current text-amber-500" />
              {user.xp} XP
            </div>
          </div>
        ))}
      </div>

      {/* Your Rank Bar */}
      <div className="rounded-xl border border-purple-200/80 bg-purple-50/60 px-3.5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white text-[10px] font-black tracking-wide">
            YOU
          </span>
          <span className="text-xs font-bold text-purple-950">
            {lang === 'ko'
              ? '내 현재 순위: #42'
              : lang === 'es'
              ? 'Tu Rango: #42'
              : 'Your Rank: #42'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-black text-purple-700">
          <Zap className="w-3.5 h-3.5 fill-current text-purple-600" />
          <span>{xp} XP</span>
        </div>
      </div>
    </div>
  );
}
