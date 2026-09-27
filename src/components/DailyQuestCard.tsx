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
    <div className="relative overflow-hidden rounded-3xl border-2 border-violet-500/30 bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 p-6 sm:p-8 text-white shadow-xl">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-36 h-36 rounded-full bg-pink-500/20 blur-xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-lg">
          {/* Top Badges */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-black shadow-md border-b-2 border-amber-600">
              <Flame className="w-3.5 h-3.5 fill-current" />
              {lang === 'ko' ? '오늘의 데일리 챌린지' : "Today's Daily Quest"}
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white">
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-current" />
              +100 BONUS XP
            </span>

            <span className="inline-flex items-center gap-1 text-[11px] text-white/80 font-semibold">
              <Clock className="w-3 h-3" />
              {lang === 'ko' ? '자정에 초기화' : 'Resets at midnight'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            {lang === 'ko'
              ? '매일 1개 퀴즈 풀고 출석 스트릭(🔥)을 유지하세요!'
              : 'Complete 1 daily quiz to keep your fire streak alive!'}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-white/85 font-medium leading-relaxed">
            {lang === 'ko'
              ? `연속 출석 ${streak}일차 달성 중! 오늘의 보너스 XP를 획득하고 글로벌 랭킹을 올려보세요.`
              : `You are on a ${streak}-day streak! Claim your +100 XP bonus and climb the leaderboard.`}
          </p>
        </div>

        {/* Action Button / Completed State */}
        <div className="w-full md:w-auto shrink-0">
          {dailyQuestCompleted ? (
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500/90 border-2 border-emerald-400 px-6 py-4 text-white font-black text-sm shadow-lg">
              <CheckCircle2 className="w-5 h-5" />
              <span>{lang === 'ko' ? '오늘의 퀘스트 완료!' : 'Completed Today!'}</span>
            </div>
          ) : (
            <Link
              href={`/quiz/${questQuiz.slug}`}
              className="flex items-center justify-center gap-2 w-full md:w-auto rounded-2xl bg-amber-400 hover:bg-amber-300 active:translate-y-1 border-b-4 border-amber-600 text-amber-950 px-7 py-4 text-sm sm:text-base font-black shadow-xl transition-all"
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
