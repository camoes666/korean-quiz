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
    <div className="rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-amber-600">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100">
              {lang === 'ko' ? '글로벌 명예의 전당' : 'Global Leaderboard'}
            </h3>
            <p className="text-[11px] text-zinc-400 font-medium">
              {lang === 'ko' ? '실시간 주간 랭킹 TOP 5' : 'Top challengers this week'}
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          LIVE
        </span>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-3 gap-2.5 mb-6 pt-2 text-center">
        {/* 2nd Place */}
        <div className="flex flex-col items-center justify-end rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-2 border-zinc-200 dark:border-zinc-700 p-3 relative">
          <span className="text-xl -mt-4 mb-1">🥈</span>
          <div className="text-xs font-black text-zinc-800 dark:text-zinc-200 truncate w-full">
            {TOP_USERS[1].flag} {TOP_USERS[1].name}
          </div>
          <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-0.5">
            <Zap className="w-3 h-3 fill-current" />
            {TOP_USERS[1].xp}
          </div>
        </div>

        {/* 1st Place (Champion) */}
        <div className="flex flex-col items-center justify-end rounded-2xl bg-gradient-to-b from-amber-500/15 via-amber-400/10 to-transparent border-2 border-amber-400 p-3.5 relative shadow-md">
          <div className="absolute -top-3.5 text-2xl animate-bounce">👑</div>
          <span className="text-2xl mt-1 mb-1">🥇</span>
          <div className="text-xs font-black text-zinc-900 dark:text-white truncate w-full">
            {TOP_USERS[0].flag} {TOP_USERS[0].name}
          </div>
          <div className="text-xs font-black text-amber-700 dark:text-amber-400 mt-1 flex items-center gap-0.5">
            <Zap className="w-3.5 h-3.5 fill-current" />
            {TOP_USERS[0].xp}
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center justify-end rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-2 border-zinc-200 dark:border-zinc-700 p-3 relative">
          <span className="text-xl -mt-4 mb-1">🥉</span>
          <div className="text-xs font-black text-zinc-800 dark:text-zinc-200 truncate w-full">
            {TOP_USERS[2].flag} {TOP_USERS[2].name}
          </div>
          <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-0.5">
            <Zap className="w-3 h-3 fill-current" />
            {TOP_USERS[2].xp}
          </div>
        </div>
      </div>

      {/* Ranks 4 & 5 List */}
      <div className="space-y-2 mb-4">
        {TOP_USERS.slice(3).map((user) => (
          <div
            key={user.rank}
            className="flex items-center justify-between rounded-xl px-3 py-2 bg-zinc-50/70 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800 text-xs font-semibold"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 text-center text-zinc-400 font-bold">#{user.rank}</span>
              <span>{user.flag}</span>
              <span className="text-zinc-700 dark:text-zinc-300 truncate max-w-[130px]">
                {user.name}
              </span>
            </div>
            <div className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
              <Zap className="w-3 h-3 fill-current" />
              {user.xp} XP
            </div>
          </div>
        ))}
      </div>

      {/* Your Rank Bar */}
      <div className="rounded-2xl border-2 border-violet-500/40 bg-violet-500/10 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-lg bg-violet-600 text-white text-[10px] font-black">
            YOU
          </span>
          <span className="text-xs font-black text-violet-900 dark:text-violet-200">
            {lang === 'ko' ? '내 현재 순위: #42' : 'Your Rank: #42'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-black text-amber-700 dark:text-amber-400">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{xp} XP</span>
        </div>
      </div>
    </div>
  );
}
