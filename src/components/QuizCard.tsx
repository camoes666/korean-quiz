'use client';

import Link from 'next/link';
import { Quiz, getLocalizedText } from '@/types/quiz';
import { Clock, HelpCircle, Users, ArrowRight, Sparkles, Tag, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const { lang, t } = useLanguage();

  const title = getLocalizedText(quiz, 'title', lang);
  const description = getLocalizedText(quiz, 'description', lang);
  const categoryLabel = t.categories[quiz.category] || quiz.category;
  const tagLabel = quiz.tag ? t.tags[quiz.tag] || quiz.tag : null;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl hover:border-violet-500/50 transition-all duration-300">
      {/* Top Banner Gradient */}
      <div
        className={`relative h-40 w-full bg-gradient-to-r ${quiz.gradient} p-4 sm:p-5 flex flex-col justify-between overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        {/* Background Decorative Emoji */}
        <div className="absolute -right-5 -bottom-6 text-7xl opacity-20 select-none transition-transform duration-300 group-hover:scale-110">
          {quiz.coverEmoji}
        </div>

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="rounded-full bg-black/35 backdrop-blur-md px-3 py-1 text-xs font-black text-white tracking-wide">
              {categoryLabel}
            </span>
            {tagLabel && (
              <span className="rounded-full bg-white/25 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-bold text-white flex items-center gap-1">
                <Tag className="w-2.5 h-2.5" />
                {tagLabel}
              </span>
            )}
          </div>

          {/* Reward XP Badge */}
          <div className="flex items-center gap-1 rounded-full bg-amber-400 text-amber-950 px-2.5 py-1 text-xs font-black shadow-md border-b-2 border-amber-600 shrink-0">
            <Zap className="w-3 h-3 fill-current" />
            +100 XP
          </div>
        </div>

        {/* Big Emoji */}
        <div className="relative z-10 text-4xl filter drop-shadow">
          {quiz.coverEmoji}
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed font-medium">
            {description}
          </p>
        </div>

        {/* Metadata & 3D Play Button */}
        <div className="mt-5 border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-4 font-semibold">
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
              {quiz.questions.length} {t.questionsCount}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              ~{quiz.estimatedMinutes} {t.mins}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-zinc-400" />
              {quiz.totalPlays}
            </span>
          </div>

          <Link
            href={`/quiz/${quiz.slug}`}
            className="flex items-center justify-center gap-2 w-full rounded-2xl border-b-4 border-violet-800 bg-violet-600 hover:bg-violet-700 active:border-b-0 active:translate-y-1 text-white py-3 px-4 text-xs sm:text-sm font-black shadow-md transition-all group-hover:shadow-lg"
          >
            <span>{t.startChallenge}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
