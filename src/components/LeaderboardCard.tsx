'use client';

import { Trophy, Medal, Crown, Zap, Flame } from 'lucide-react';
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
    <div className="rounded-2xl border-2 border-purple-100 bg-white p-6 shadow-lg shadow-purple-500/5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-black">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              {lang === 'ko'
                ? '글로벌 명예의 전당'
                : lang === 'es'
                ? 'Salón de la Fama Global'
                : 'Global Leaderboard'}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              {lang === 'ko'
                ? '실시간 주간 랭킹 TOP 5'
                : lang === 'es'
                ? 'Top 5 retadores esta semana'
                : 'Top challengers this week'}
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          LIVE
        </span>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-3 gap-2.5 mb-5 pt-2 text-center">
        {/* 2nd Place */}
        <div className="flex flex-col items-center justify-end rounded-2xl bg-slate-50 border-2 border-slate-200/80 p-3 relative hover:border-purple-200 transition-colors">
          <span className="text-xl -mt-4 mb-1">🥈</span>
          <div className="text-xs font-black text-slate-800 truncate w-full">
            {TOP_USERS[1].flag} {TOP_USERS[1].name}
          </div>
          <div className="text-[11px] font-bold text-amber-600 mt-1 flex items-center gap-0.5">
            <Zap className="w-3 h-3 fill-current" />
            {TOP_USERS[1].xp}
          </div>
        </div>

        {/* 1st Place (Champion) with Superstar King Hobi */}
        <div className="flex flex-col items-center justify-end rounded-2xl bg-gradient-to-b from-amber-100/60 via-amber-50/40 to-white border-2 border-amber-400 p-3.5 relative shadow-md shadow-amber-500/10">
          <div className="w-16 h-16 -mt-8 mb-0.5 relative animate-bounce" style={{ animationDuration: '3s' }}>
            <img
              src="/images/hobi05.webp"
              alt="Superstar King Hobi"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>
          <div className="text-xs font-black text-slate-900 truncate w-full">
            {TOP_USERS[0].flag} {TOP_USERS[0].name}
          </div>
          <div className="text-xs font-black text-amber-600 mt-1 flex items-center gap-0.5">
            <Zap className="w-3.5 h-3.5 fill-current" />
            {TOP_USERS[0].xp}
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center justify-end rounded-2xl bg-slate-50 border-2 border-slate-200/80 p-3 relative hover:border-purple-200 transition-colors">
          <span className="text-xl -mt-4 mb-1">🥉</span>
          <div className="text-xs font-black text-slate-800 truncate w-full">
            {TOP_USERS[2].flag} {TOP_USERS[2].name}
          </div>
          <div className="text-[11px] font-bold text-amber-600 mt-1 flex items-center gap-0.5">
            <Zap className="w-3 h-3 fill-current" />
            {TOP_USERS[2].xp}
          </div>
        </div>
      </div>

      {/* Ranks 4 & 5 List */}
      <div className="space-y-1.5 mb-4">
        {TOP_USERS.slice(3).map((user) => (
          <div
            key={user.rank}
            className="flex items-center justify-between rounded-xl px-3 py-2 bg-slate-50/80 border border-slate-100 text-xs font-semibold"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 text-center text-slate-400 font-bold">#{user.rank}</span>
              <span>{user.flag}</span>
              <span className="text-slate-700 truncate max-w-[130px]">
                {user.name}
              </span>
            </div>
            <div className="flex items-center gap-1 font-bold text-amber-600">
              <Zap className="w-3 h-3 fill-current" />
              {user.xp} XP
            </div>
          </div>
        ))}
      </div>

      {/* Your Rank Bar (Snackbar) */}
      <div className="rounded-xl border border-purple-200 bg-purple-50/80 p-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-black tracking-wide">
            YOU
          </span>
          <span className="text-xs font-black text-purple-900">
            {lang === 'ko'
              ? '내 현재 순위: #42'
              : lang === 'es'
              ? 'Tu Rango: #42'
              : 'Your Rank: #42'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-black text-amber-600">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{xp} XP</span>
        </div>
      </div>
    </div>
  );
}
