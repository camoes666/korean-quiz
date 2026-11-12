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
    return lang === 'ko'
      ? `인기 급상승 · ${tag}`
      : lang === 'es'
      ? `Tendencia · ${tag}`
      : lang === 'pt'
      ? `Em Alta · ${tag}`
      : `Trending · ${tag}`;
  }
  return lang === 'ko'
    ? `인기 메인 테스트 · ${tag}`
    : lang === 'es'
    ? `Test Destacado · ${tag}`
    : lang === 'pt'
    ? `Teste em Destaque · ${tag}`
    : `Featured Test · ${tag}`;
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
      : lang === 'pt'
      ? [
          { emoji: '🐰', name: 'Jisoo', role: 'Carisma 4D' },
          { emoji: '🥟', name: 'Jennie', role: 'Ícone Trend' },
          { emoji: '🐿️', name: 'Rosé', role: 'Alma Vocal' },
          { emoji: '🐤', name: 'Lisa', role: 'Rainha da Dança' },
        ]
      : [
          { emoji: '🐰', name: 'Jisoo', role: '4D Moodmaker' },
          { emoji: '🥟', name: 'Jennie', role: 'Trend Icon' },
          { emoji: '🐿️', name: 'Rosé', role: 'Soulful Vocal' },
          { emoji: '🐤', name: 'Lisa', role: 'Dance Queen' },
        ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 sm:p-7 text-white border border-slate-800 flex flex-col justify-between h-full group">
      <div className="relative z-10">
        {/* Top Meta Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-slate-200 text-xs font-medium">
            {isPersonality
              ? getBadgeLabel(badge, questQuiz.tag || 'K-Pop', lang)
              : lang === 'ko'
              ? '오늘의 데일리 퀘스트'
              : lang === 'es'
              ? 'Misión del Día'
              : lang === 'pt'
              ? 'Missão do Dia'
              : 'Daily Quest'}
          </span>

          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-xs font-mono font-medium">
            <Zap className="w-3 h-3 fill-current" />
            +100 XP
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="pr-20 sm:pr-28">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
            {quizTitle}
          </h2>
          <p className="mt-1.5 text-xs text-slate-400 font-normal leading-relaxed line-clamp-2">
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
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10"
                >
                  <span className="text-sm leading-none">{m.emoji}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-white leading-tight truncate">
                      {m.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {m.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Clean Mascot Illustration */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 ml-auto -mt-6 sm:-mt-8 relative select-none pointer-events-none z-10">
            <img
              src={mascot.avatarUrl}
              alt={mascot.name}
              className="relative w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="relative z-10 mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span className="inline-flex items-center gap-1 text-slate-300">
            <Flame className="w-3.5 h-3.5 text-rose-400 fill-current" />
            {lang === 'ko' ? `${streak}일 스트릭` : `${streak}d streak`}
          </span>
          <span className="text-slate-600">·</span>
          <span>
            {questionCount} {lang === 'ko' ? '문항' : 'Qs'} (~{questQuiz.estimatedMinutes}
            {lang === 'ko' ? '분' : 'm'})
          </span>
        </div>

        {/* Action Button */}
        <Link
          href={`/quiz/${questQuiz.slug}`}
          onClick={onPlayClick}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 px-4 py-2 text-xs sm:text-sm font-semibold transition-colors shrink-0"
        >
          <span>
            {isPersonality
              ? lang === 'ko'
                ? '내 멤버 찾기'
                : lang === 'es'
                ? 'Descubrir Miembro'
                : lang === 'pt'
                ? 'Descobrir Membro'
                : 'Find My Member'
              : lang === 'ko'
              ? '도전하기'
              : lang === 'es'
              ? 'Jugar Misión'
              : lang === 'pt'
              ? 'Jogar Missão'
              : 'Play Daily Quest'}
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
