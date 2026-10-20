'use client';

import Link from 'next/link';
import { Quiz, getLocalizedText } from '@/types/quiz';
import { Clock, HelpCircle, Layers, ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getQuizMascot } from '@/lib/mascot';
import { isNewQuiz } from '@/lib/quizBadges';

interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const { lang, t } = useLanguage();
  const mascot = getQuizMascot(quiz.slug, quiz.tag);

  const title = getLocalizedText(quiz, 'title', lang);
  const description = getLocalizedText(quiz, 'description', lang);
  const categoryLabel = t.categories[quiz.category] || quiz.category;
  const tagLabel = quiz.tag ? t.tags[quiz.tag] || quiz.tag : null;
  const isPersonality = quiz.quizType === 'personality';

  const depthCount = isPersonality
    ? Object.keys(quiz.personalityResults || {}).length
    : new Set(quiz.questions.map((q) => q.level).filter(Boolean)).size;
  const depthLabel = isPersonality
    ? lang === 'en'
      ? 'Results'
      : lang === 'es'
      ? 'Resultados'
      : '가지 결과'
    : lang === 'en'
    ? 'Levels'
    : lang === 'es'
    ? 'Niveles'
    : '단계';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between group">
      {/* Clean Thumbnail Header: Single Category Badge + Mascot Visual */}
      <div
        className={`h-24 bg-gradient-to-r ${quiz.gradient} px-5 py-3.5 relative flex items-center justify-between overflow-hidden`}
      >
        <div className="flex flex-col items-start gap-1.5 z-10 max-w-[72%]">
          <div className="flex items-center gap-1.5 flex-wrap">
            {isPersonality ? (
              <span className="px-2.5 py-0.5 bg-amber-300 text-amber-950 font-black rounded-full text-[11px] tracking-wide shadow-2xs">
                🔮 {lang === 'en' ? 'Personality' : lang === 'es' ? 'Personalidad' : '성향 테스트'}
                {tagLabel ? ` · ${tagLabel}` : ''}
              </span>
            ) : (
              <span className="px-2.5 py-0.5 bg-white/95 backdrop-blur-md rounded-full text-[11px] font-black text-slate-800 tracking-wide shadow-2xs">
                {categoryLabel}
                {tagLabel ? ` · ${tagLabel}` : ''}
              </span>
            )}

            {isNewQuiz(quiz) && (
              <span className="px-2 py-0.5 bg-black/45 backdrop-blur-md rounded-full text-[10px] font-extrabold text-amber-300 uppercase tracking-wider">
                NEW
              </span>
            )}
          </div>
        </div>

        {/* Single Clean Visual Focal Point (Mascot) */}
        <div className="absolute right-3 -bottom-1.5 w-20 h-20 pointer-events-none select-none drop-shadow-md transition-transform duration-200 group-hover:scale-105">
          <img
            src={mascot.avatarUrl}
            alt={mascot.name}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <Link href={`/quiz/${quiz.slug}`} className="block">
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug mb-1.5 line-clamp-1 group-hover:text-purple-600 transition-colors">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-4 leading-relaxed">
            {description}
          </p>
        </div>

        <div>
          {/* Clean Meta Info Row */}
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-4 pb-3.5 border-b border-slate-100">
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              {isPersonality
                ? quiz.personalityQuestions?.length || 10
                : quiz.questions.length}{' '}
              {t.questionsCount}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              ~{quiz.estimatedMinutes} {t.mins}
            </span>
            {depthCount > 0 && (
              <span className="flex items-center gap-1 text-purple-600 font-bold ml-auto">
                <Layers className="w-3.5 h-3.5 text-purple-500" />
                {depthCount}
                {lang === 'ko' ? '' : ' '}
                {depthLabel}
              </span>
            )}
          </div>

          {/* CTA Button Row */}
          <div className="flex items-center gap-2">
            <Link
              href={`/quiz/${quiz.slug}`}
              className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-purple-600 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 transition-colors active:scale-[0.99]"
            >
              <span>
                {isPersonality
                  ? lang === 'en'
                    ? 'Find Your Match'
                    : lang === 'es'
                    ? 'Descubrir Miembro'
                    : '나의 멤버 찾기'
                  : t.startChallenge}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {!isPersonality && (
              <Link
                href={`/guide/${quiz.slug}`}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 text-slate-600 hover:text-purple-700 flex items-center justify-center transition-colors"
                title={
                  lang === 'ko'
                    ? '지식 가이드 & 해설 보기'
                    : lang === 'es'
                    ? 'Ver Guía de Lore'
                    : 'Read Lore Guide'
                }
              >
                <BookOpen className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
