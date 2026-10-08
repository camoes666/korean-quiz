'use client';

import Link from 'next/link';
import { Quiz, getLocalizedText } from '@/types/quiz';
import { Clock, HelpCircle, Users, ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { getQuizThemeGroup } from '@/lib/theme';
import { getQuizMascot } from '@/lib/mascot';

interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const { lang, t } = useLanguage();
  const [liked, setLiked] = useState(false);
  const themeGroup = getQuizThemeGroup(quiz.slug, quiz.tag);
  const mascot = getQuizMascot(quiz.slug, quiz.tag);

  const title = getLocalizedText(quiz, 'title', lang);
  const description = getLocalizedText(quiz, 'description', lang);
  const categoryLabel = t.categories[quiz.category] || quiz.category;
  const tagLabel = quiz.tag ? t.tags[quiz.tag] || quiz.tag : null;

  return (
    <div
      data-group={themeGroup}
      className="qz-card bg-white rounded-2xl border-2 border-purple-100 shadow-lg shadow-purple-500/5 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 active:scale-[0.99] flex flex-col justify-between mb-4 group"
    >
      {/* 카드 헤더 비주얼 썸네일 */}
      <div
        className={`h-28 bg-gradient-to-r ${quiz.gradient} p-4 relative flex flex-col justify-between overflow-hidden`}
      >
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {quiz.quizType === 'personality' ? (
              <span className="px-2.5 py-1 bg-amber-300 text-amber-950 font-black rounded-full text-xs tracking-wider uppercase shadow-xs">
                🔮 {lang === 'en' ? 'Personality Test' : lang === 'es' ? 'Test de Personalidad' : '소울메이트 테스트'}
              </span>
            ) : (
              <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-black text-purple-700 tracking-wider uppercase shadow-xs">
                {categoryLabel} {tagLabel ? `· ${tagLabel}` : ''}
              </span>
            )}
            <span className="px-2 py-0.5 bg-emerald-400 text-emerald-950 font-black text-[11px] rounded-full flex items-center gap-1 shadow-xs">
              ⚡ +100 XP
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setLiked(!liked);
            }}
            className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform"
            aria-label="Favorite quiz"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                liked ? 'fill-rose-400 text-rose-400' : 'fill-white text-white'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center gap-2 z-10">
          <span className="px-2 py-0.5 bg-black/40 backdrop-blur-md rounded-md text-[11px] font-bold text-amber-300">
            ★ 4.9 ({quiz.totalPlays})
          </span>
          <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-md text-[11px] font-bold text-white">
            ✨ {mascot.badgeTitle}
          </span>
        </div>

        {/* 배경 데코 이모지 & 마스코트 */}
        <div className="absolute right-14 -bottom-4 text-white/20 text-6xl font-black pointer-events-none select-none">
          {quiz.coverEmoji}
        </div>
        <div className="absolute right-1 -bottom-2 w-20 h-20 opacity-95 pointer-events-none select-none drop-shadow-md transition-transform group-hover:scale-110">
          <img
            src={mascot.avatarUrl}
            alt={mascot.name}
            className="w-full h-full object-contain filter"
          />
        </div>
      </div>

      {/* 카드 바디 */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="qz-card-title text-lg font-black text-slate-900 tracking-tight leading-snug mb-1.5 line-clamp-1 hover:text-purple-600 transition-colors">
            {title}
          </h3>
          <p className="qz-card-muted text-xs text-slate-500 font-medium line-clamp-2 mb-4 leading-relaxed">
            {description}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-400 mb-4 pb-4 border-b border-slate-100">
            <span className="flex items-center gap-1 text-slate-600">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              {quiz.quizType === 'personality'
                ? (quiz.personalityQuestions?.length || 10)
                : quiz.questions.length}{' '}
              {t.questionsCount}
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              ~{quiz.estimatedMinutes} {t.mins}
            </span>
            <span className="flex items-center gap-1 text-purple-600 font-bold">
              <Users className="w-3.5 h-3.5 text-purple-500" />
              {quiz.totalPlays}{' '}
              {lang === 'en' ? 'Players' : lang === 'es' ? 'Jugadores' : '도전자'}
            </span>
          </div>

          {/* 풀사이즈 CTA 젤리 버튼 */}
          <Link
            href={`/quiz/${quiz.slug}`}
            className="qz-btn-primary w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm rounded-xl shadow-md shadow-purple-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span>
              {quiz.quizType === 'personality'
                ? lang === 'en'
                  ? 'Find Your Soulmate'
                  : lang === 'es'
                  ? 'Descubrir Mi Miembro'
                  : '나의 멤버 찾기'
                : t.startChallenge}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
