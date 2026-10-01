'use client';

import Link from 'next/link';
import { Flame, Zap, Trophy, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';
import { Quiz } from '@/types/quiz';

interface DailyQuestCardProps {
  questQuiz: Quiz;
}

export default function DailyQuestCard({ questQuiz }: DailyQuestCardProps) {
  const { lang } = useLanguage();
  const { dailyQuestCompleted, streak } = useGame();

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-purple-200/50 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-6 sm:p-8 text-white shadow-xl shadow-purple-500/15">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 rounded-full bg-white/15 blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-36 h-36 rounded-full bg-pink-400/25 blur-xl pointer-events-none"></div>
      {/* Fiery Streak Hobi Mascot (Desktop Illustration) */}
      <div className="hidden lg:flex items-center justify-center absolute right-48 -bottom-3 w-40 h-40 pointer-events-none select-none z-10">
        <img
          src="/images/hobi04.webp"
          alt="Streak Fire Hobi"
          className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)] animate-pulse"
          style={{ animationDuration: '3s' }}
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-lg">
          {/* Top Badges */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-purple-900 text-xs font-black shadow-xs">
              <img src="/images/hobi04.webp" alt="Fire Hobi" className="w-4 h-4 object-contain inline-block -my-0.5" />
              {lang === 'ko' ? '오늘의 데일리 챌린지' : "Today's Daily Quest"}
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-400 text-emerald-950 text-xs font-black shadow-xs">
              <Zap className="w-3.5 h-3.5 text-emerald-950 fill-current" />
              +100 BONUS XP
            </span>

            <span className="inline-flex items-center gap-1 text-[11px] text-white/90 font-bold bg-black/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
              <Clock className="w-3 h-3" />
              {lang === 'ko' ? '자정에 초기화' : 'Resets at midnight'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            {lang === 'ko'
              ? '매일 1개 퀴즈 풀고 출석 스트릭(🔥)을 유지하세요!'
              : 'Complete 1 daily quiz to keep your fire streak alive!'}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
            {lang === 'ko'
              ? `연속 출석 ${streak}일차 달성 중! 오늘의 보너스 XP를 획득하고 글로벌 랭킹을 올려보세요.`
              : `You are on a ${streak}-day streak! Claim your +100 XP bonus and climb the leaderboard.`}
          </p>
        </div>

        {/* Action Button / Completed State */}
        <div className="w-full md:w-auto shrink-0">
          {dailyQuestCompleted ? (
            <div className="flex items-center justify-center gap-2 rounded-full bg-emerald-400 text-emerald-950 font-black px-7 py-3.5 text-sm shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-5 h-5" />
              <span>{lang === 'ko' ? '오늘의 퀘스트 완료!' : 'Completed Today!'}</span>
            </div>
          ) : (
            <Link
              href={`/quiz/${questQuiz.slug}`}
              className="flex items-center justify-center gap-2 w-full md:w-auto rounded-full bg-amber-300 hover:bg-amber-200 active:scale-95 text-amber-950 px-7 py-3.5 text-sm sm:text-base font-black shadow-lg shadow-amber-500/25 transition-all"
            >
              <span>{lang === 'ko' ? '퀘스트 도전하기' : 'Start Daily Quest'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
