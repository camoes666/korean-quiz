'use client';

import Link from 'next/link';
import { Zap, Sparkles, ArrowRight, Flame } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';
import { Quiz, getLocalizedText } from '@/types/quiz';
import { getQuizMascot } from '@/lib/mascot';
import type { Language } from '@/lib/translations';

export type HeroBadge = 'featured' | 'trending' | 'new';

interface DailyQuestCardProps {
  questQuiz: Quiz;
  badge?: HeroBadge;
  onPlayClick?: () => void;
}

function getBadgeLabel(badge: HeroBadge, tag: string, lang: Language): string {
  if (badge === 'new') return `NEW · ${tag}`;
  if (badge === 'trending') {
    return lang === 'ko' ? `인기 급상승 · ${tag}` : lang === 'es' ? `Tendencia · ${tag}` : `Trending · ${tag}`;
  }
  return lang === 'ko' ? `인기 메인 테스트 · ${tag}` : lang === 'es' ? `Test Destacado · ${tag}` : `Featured Test · ${tag}`;
}

export default function DailyQuestCard({ questQuiz, badge = 'featured', onPlayClick }: DailyQuestCardProps) {
  const { lang } = useLanguage();
  const { streak } = useGame();
  const quizTitle = getLocalizedText(questQuiz, 'title', lang);
  const quizDesc = getLocalizedText(questQuiz, 'description', lang);
  const mascot = getQuizMascot(questQuiz.slug, questQuiz.tag);
  const isPersonality = questQuiz.quizType === 'personality';
  const questionCount = isPersonality
    ? questQuiz.personalityQuestions?.length || 10
    : questQuiz.questions.length;
  const isBlackpinkMemberQuiz = questQuiz.slug === 'which-blackpink-member-are-you';

  const members =
    lang === 'ko'
      ? [
          { emoji: '🐰', name: '지수', role: '4D 무드메이커' },
          { emoji: '🥟', name: '제니', role: '트렌드 아이콘' },
          { emoji: '🐿️', name: '로제', role: '감성 보컬' },
          { emoji: '🐤', name: '리사', role: '퍼포먼스 퀸' },
        ]
      : lang === 'es'
      ? [
          { emoji: '🐰', name: 'Jisoo', role: 'Carisma 4D' },
          { emoji: '🥟', name: 'Jennie', role: 'Icono Trend' },
          { emoji: '🐿️', name: 'Rosé', role: 'Alma Vocal' },
          { emoji: '🐤', name: 'Lisa', role: 'Reina Dance' },
        ]
      : [
          { emoji: '🐰', name: 'Jisoo', role: '4D Moodmaker' },
          { emoji: '🥟', name: 'Jennie', role: 'Trend Icon' },
          { emoji: '🐿️', name: 'Rosé', role: 'Soulful Vocal' },
          { emoji: '🐤', name: 'Lisa', role: 'Dance Queen' },
        ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#160812] via-[#240d1d] to-[#12091a] p-6 sm:p-7 text-white shadow-2xl shadow-pink-950/25 border border-pink-500/30 flex flex-col justify-between h-full group">
      {/* Stage Spotlight Glows */}
      <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-pink-500/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-40 h-40 rounded-full bg-rose-500/25 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top Meta Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs font-extrabold backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            {isPersonality
              ? getBadgeLabel(badge, questQuiz.tag || 'K-Pop', lang)
              : lang === 'ko'
              ? '오늘의 데일리 퀘스트'
              : lang === 'es'
              ? 'Misión del Día'
              : 'Daily Quest'}
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-400/15 border border-emerald-400/35 text-emerald-300 text-xs font-black">
            <Zap className="w-3 h-3 fill-current" />
            +100 XP
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="pr-24 sm:pr-32">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug">
            {quizTitle}
          </h2>
          <p className="mt-1.5 text-xs text-pink-100/75 font-medium leading-relaxed line-clamp-2">
            {quizDesc}
          </p>
        </div>

        {/* Symmetrical 2x2 Member Grid + Large Mascot */}
        <div className="relative mt-4 flex items-end justify-between gap-3">
          {isBlackpinkMemberQuiz && (
            <div className="grid grid-cols-2 gap-2 flex-1 max-w-[260px] z-10">
              {members.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-pink-300/15 backdrop-blur-md transition-colors"
                >
                  <span className="text-base leading-none">{m.emoji}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-black text-white leading-tight truncate">
                      {m.name}
                    </div>
                    <div className="text-[10px] font-semibold text-pink-200/70 truncate">
                      {m.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hero-sized Mascot Bomi with Motion Graphics & Stage Aura */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 ml-auto -mt-10 sm:-mt-12 -mr-2 relative select-none pointer-events-none z-10">
            {/* Pulsing Pink Stage Halo */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-pink-500/50 via-rose-400/35 to-purple-500/30 blur-xl animate-bomi-aura" />
            {/* Rotating Dashed Stage Orbit Ring */}
            <div className="absolute inset-1.5 rounded-full border border-dashed border-pink-400/40 animate-bomi-orbit" />
            {/* Floating K-Pop Heart & Sparkle Particles */}
            <span className="absolute -top-1 left-2 text-xs animate-particle-1">💖</span>
            <span className="absolute top-3 -right-1 text-xs animate-particle-2">✨</span>
            <span className="absolute bottom-4 -left-1 text-[11px] animate-particle-3">🌸</span>
            {/* Floating Bomi Illustration */}
            <img
              src={mascot.avatarUrl}
              alt={mascot.name}
              className="relative w-full h-full object-contain drop-shadow-[0_12px_20px_rgba(236,72,153,0.45)] animate-bomi-float"
            />
          </div>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="relative z-10 mt-5 pt-4 border-t border-pink-200/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-pink-100/80 font-semibold">
          <span className="inline-flex items-center gap-1 text-pink-300 font-bold">
            <Flame className="w-3.5 h-3.5 fill-current text-pink-400" />
            {lang === 'ko' ? `${streak}일 스트릭` : `${streak}d streak`}
          </span>
          <span className="text-white/25">·</span>
          <span>
            {questionCount} {lang === 'ko' ? '문항' : 'Qs'} (~{questQuiz.estimatedMinutes}
            {lang === 'ko' ? '분' : 'm'})
          </span>
        </div>

        {/* Always clickable: completing the daily trivia quest shouldn't hide the featured tests. */}
        <Link
          href={`/quiz/${questQuiz.slug}`}
          onClick={onPlayClick}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-500 active:scale-95 text-white px-5 py-2.5 text-xs sm:text-sm font-black shadow-lg shadow-pink-500/30 transition-all shrink-0"
        >
          <span>
            {isPersonality
              ? lang === 'ko'
                ? '내 멤버 알아보러 가기'
                : lang === 'es'
                ? 'Descubrir Mi Miembro'
                : 'Find My Member'
              : lang === 'ko'
              ? '데일리 도전하기'
              : lang === 'es'
              ? 'Jugar Misión'
              : 'Play Daily Quest'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
