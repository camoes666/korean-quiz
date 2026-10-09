'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Quiz, Question, getLocalizedText } from '@/types/quiz';
import { useLanguage } from '@/context/LanguageContext';
import { getCorrectAnswerText, getLevelBadge, estimateGuideReadTime } from '@/lib/guides';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Search,
  Filter,
  ArrowRight,
  ChevronRight,
  Flame,
  Gamepad2,
  Share2,
  Clock,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface GuideDetailClientProps {
  quiz: Quiz;
  relatedGuides: Quiz[];
}

export default function GuideDetailClient({
  quiz,
  relatedGuides,
}: GuideDetailClientProps) {
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [copied, setCopied] = useState(false);

  const title = getLocalizedText(quiz, 'title', lang);
  const subtitle = getLocalizedText(quiz, 'subtitle', lang);
  const description = getLocalizedText(quiz, 'description', lang);
  const readTime = estimateGuideReadTime(quiz.questions.length);

  // Filter questions based on search query and selected level
  const filteredQuestions = useMemo(() => {
    return quiz.questions.filter((q) => {
      // Level filter
      if (selectedLevel !== 'all' && q.level !== selectedLevel) {
        return false;
      }

      // Search query filter
      if (!searchQuery.trim()) return true;

      const qText = getLocalizedText(q, 'question', lang).toLowerCase();
      const expText = getLocalizedText(q, 'explanation', lang).toLowerCase();
      const funText = getLocalizedText(q, 'funFact', lang).toLowerCase();
      const ansText = getCorrectAnswerText(q, lang).toLowerCase();
      const query = searchQuery.toLowerCase();

      return (
        qText.includes(query) ||
        expText.includes(query) ||
        funText.includes(query) ||
        ansText.includes(query)
      );
    });
  }, [quiz.questions, selectedLevel, searchQuery, lang]);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const levelStats = useMemo(() => {
    const l1 = quiz.questions.filter((q) => q.level === 1).length;
    const l2 = quiz.questions.filter((q) => q.level === 2).length;
    const l3 = quiz.questions.filter((q) => q.level === 3).length;
    return { l1, l2, l3 };
  }, [quiz.questions]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-24">
      {/* 1. Breadcrumbs */}
      <div className="bg-white border-b border-purple-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold flex-wrap">
            <Link href="/" className="hover:text-purple-600 transition-colors">
              {lang === 'ko' ? '홈' : lang === 'es' ? 'Inicio' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/guide" className="hover:text-purple-600 transition-colors">
              {lang === 'ko' ? '지식 가이드' : lang === 'es' ? 'Guías' : 'Guides'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-xs sm:max-w-md">
              {title}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-purple-100 py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              {/* Category & Stats Badges */}
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-100 text-purple-700">
                  {quiz.category}
                </span>
                {quiz.tag && (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-pink-100 text-pink-700">
                    #{quiz.tag}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700">
                  <Layers className="w-3.5 h-3.5" />
                  {quiz.questions.length}{' '}
                  {lang === 'ko' ? '개 핵심 문답' : lang === 'es' ? 'Preguntas' : 'Key Facts'}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700">
                  <Clock className="w-3.5 h-3.5" />
                  ~{readTime} {lang === 'ko' ? '분 정독' : lang === 'es' ? 'min lectura' : 'min read'}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.2] mb-3">
                <span className="mr-3">{quiz.coverEmoji}</span>
                {title}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-3xl mb-4">
                {subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl">
                {description}
              </p>
            </div>

            {/* Quick Action Button Box */}
            <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
              <Link
                href={`/quiz/${quiz.slug}`}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm shadow-lg shadow-purple-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>
                  {lang === 'ko' ? '퀴즈 바로 풀기' : lang === 'es' ? 'Jugar el Quiz' : 'Play Interactive Quiz'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>
                  {copied
                    ? lang === 'ko' ? '링크 복사 완료!' : lang === 'es' ? '¡Copiado!' : 'Link Copied!'
                    : lang === 'ko' ? '가이드 공유하기' : lang === 'es' ? 'Compartir' : 'Share Guide'}
                </span>
              </button>
            </div>
          </div>

          {/* Fact Level Breakdown Pill Bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3 flex-wrap text-xs font-bold text-slate-600">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              {lang === 'ko' ? '난이도 구성:' : lang === 'es' ? 'Dificultad:' : 'Difficulty breakdown:'}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
              🟢 {lang === 'ko' ? '루키' : lang === 'es' ? 'Novato' : 'Rookie'}: {levelStats.l1}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
              🔵 {lang === 'ko' ? '팬' : lang === 'es' ? 'Fan' : 'Fan'}: {levelStats.l2}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-100">
              🔴 {lang === 'ko' ? '하드코어' : lang === 'es' ? 'Experto' : 'Hardcore'}: {levelStats.l3}
            </span>
          </div>
        </div>
      </section>

      {/* 3. Search & Interactive Filter Controls */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-purple-100 py-3 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'ko'
                  ? '키워드, 문제 또는 해설 검색...'
                  : lang === 'es'
                  ? 'Buscar por pregunta o explicación...'
                  : 'Search questions, answers, or lore...'
              }
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-purple-500 focus:outline-hidden text-xs sm:text-sm font-medium transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Level Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                selectedLevel === 'all'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lang === 'ko' ? '전체' : lang === 'es' ? 'Todos' : 'All'} ({quiz.questions.length})
            </button>
            <button
              onClick={() => setSelectedLevel(1)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                selectedLevel === 1
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              {lang === 'ko' ? '루키' : lang === 'es' ? 'Novato' : 'Rookie'} ({levelStats.l1})
            </button>
            <button
              onClick={() => setSelectedLevel(2)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                selectedLevel === 2
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              {lang === 'ko' ? '팬' : lang === 'es' ? 'Fan' : 'Fan'} ({levelStats.l2})
            </button>
            <button
              onClick={() => setSelectedLevel(3)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                selectedLevel === 3
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              {lang === 'ko' ? '하드코어' : lang === 'es' ? 'Experto' : 'Hardcore'} ({levelStats.l3})
            </button>
          </div>
        </div>
      </section>

      {/* 4. Questions & Lore List */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs font-bold text-slate-500">
          <span>
            {lang === 'ko'
              ? `총 ${filteredQuestions.length}개의 지식 카드 표시 중`
              : lang === 'es'
              ? `Mostrando ${filteredQuestions.length} tarjetas de lore`
              : `Showing ${filteredQuestions.length} lore knowledge cards`}
          </span>
          {filteredQuestions.length !== quiz.questions.length && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLevel('all');
              }}
              className="text-purple-600 hover:underline"
            >
              {lang === 'ko' ? '필터 초기화' : lang === 'es' ? 'Restablecer filtros' : 'Reset filters'}
            </button>
          )}
        </div>

        {/* List of Cards */}
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">
              {lang === 'ko' ? '검색 결과가 없습니다' : lang === 'es' ? 'No se encontraron resultados' : 'No results found'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              {lang === 'ko'
                ? '다른 키워드로 검색하거나 난이도 필터를 전체로 변경해보세요.'
                : lang === 'es'
                ? 'Intenta con otra palabra clave o selecciona todos los niveles.'
                : 'Try searching with different keywords or switch the filter to all levels.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLevel('all');
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs"
            >
              {lang === 'ko' ? '필터 초기화' : lang === 'es' ? 'Restablecer' : 'Clear filters'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuestions.map((q, index) => {
              const qText = getLocalizedText(q, 'question', lang);
              const expText = getLocalizedText(q, 'explanation', lang);
              const funFactText = getLocalizedText(q, 'funFact', lang);
              const correctAnswerText = getCorrectAnswerText(q, lang);
              const levelBadge = getLevelBadge(q.level, lang);

              return (
                <article
                  key={q.id || index}
                  id={`q-${q.id}`}
                  className="bg-white rounded-2xl sm:rounded-3xl border-2 border-purple-50 hover:border-purple-200 p-5 sm:p-7 shadow-xs hover:shadow-md transition-all group"
                >
                  {/* Card Header: Question Index + Level Badge */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-100 text-purple-700 font-black text-xs sm:text-sm">
                        Q{q.id}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border ${levelBadge.color}`}
                      >
                        {levelBadge.label}
                      </span>
                    </div>

                    <a
                      href={`#q-${q.id}`}
                      className="text-[11px] font-mono text-slate-300 hover:text-purple-600 transition-colors"
                      title="Link to this question"
                    >
                      #link
                    </a>
                  </div>

                  {/* Question Text */}
                  <h2 className="text-base sm:text-xl font-black text-slate-900 leading-snug mb-4">
                    {qText}
                  </h2>

                  {/* 1. Verified Answer Highlight Box */}
                  <div className="mb-4 rounded-xl sm:rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-3.5 sm:p-4">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-black uppercase tracking-wider text-emerald-700 mb-0.5">
                          {lang === 'ko' ? '정답 확인' : lang === 'es' ? 'Respuesta Correcta' : 'Verified Correct Answer'}
                        </div>
                        <div className="text-sm sm:text-base font-extrabold text-emerald-950">
                          {correctAnswerText}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Deep Lore & Explanation */}
                  <div className="mb-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 p-4">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-700 mb-2">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      <span>
                        {lang === 'ko'
                          ? '심층 해설 & 문화적 맥락'
                          : lang === 'es'
                          ? 'Explicación Detallada y Contexto'
                          : 'Deep Dive & Cultural Context'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {expText}
                    </p>
                  </div>

                  {/* 3. Did You Know? / Fun Fact Box (if available) */}
                  {funFactText && (
                    <div className="rounded-xl sm:rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50/50 p-4">
                      <div className="flex items-start gap-2.5">
                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[11px] font-black uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1.5">
                            <span>
                              {lang === 'ko'
                                ? '💡 알고 계셨나요? (비하인드 & 팬 로어)'
                                : lang === 'es'
                                ? '💡 ¿Sabías qué? (Dato Curioso)'
                                : '💡 Did You Know? (Insider Lore)'}
                            </span>
                            <Sparkles className="w-3 h-3 text-amber-500" />
                          </div>
                          <p className="text-xs sm:text-sm text-amber-950/90 font-medium leading-relaxed">
                            {funFactText}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {/* 5. Bottom Interactive Quiz Invitation Banner */}
        <div className="mt-14 rounded-3xl bg-gradient-to-tr from-purple-700 via-indigo-700 to-pink-600 p-8 sm:p-10 text-white shadow-xl shadow-purple-500/20 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-black text-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {lang === 'ko' ? '지식 학습 완료!' : lang === 'es' ? '¡Aprendizaje completado!' : 'Knowledge Study Complete!'}
            </span>
            <h3 className="text-2xl sm:text-4xl font-black mb-3 leading-tight">
              {lang === 'ko'
                ? `방금 읽은 지식을 바탕으로 만점에 도전해보세요!`
                : lang === 'es'
                ? `¡Pon a prueba tu conocimiento y consigue la puntuación perfecta!`
                : `Ready to prove your mastery? Take the official challenge!`}
            </h3>
            <p className="text-purple-100 text-xs sm:text-sm mb-6 leading-relaxed">
              {lang === 'ko'
                ? `정답을 외웠다면 이제 실전입니다! 총 ${quiz.questions.length}문항 퀴즈를 풀고 글로벌 팬 등급 티어를 획득하세요.`
                : lang === 'es'
                ? `¡Es hora de jugar! Responde las ${quiz.questions.length} preguntas y descubre tu rango oficial.`
                : `Answer all ${quiz.questions.length} questions interactively, beat the timer, and claim your verified fan tier!`}
            </p>
            <Link
              href={`/quiz/${quiz.slug}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white hover:bg-purple-50 text-purple-900 font-black text-sm sm:text-base shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <Gamepad2 className="w-5 h-5 text-purple-600" />
              <span>
                {lang === 'ko'
                  ? `${quiz.coverEmoji} ${title} 퀴즈 시작`
                  : lang === 'es'
                  ? `Jugar el Quiz de ${title}`
                  : `Play the ${title} Now`}
              </span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* 6. Related Lore Guides Grid */}
        {relatedGuides.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {lang === 'ko'
                    ? '다른 추천 지식 가이드'
                    : lang === 'es'
                    ? 'Otras Guías Recomendadas'
                    : 'More Recommended Lore Guides'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {lang === 'ko'
                    ? '다른 K-컬처 및 아이돌 지식도 함께 정복해보세요'
                    : lang === 'es'
                    ? 'Explora más datos sobre el K-Pop y la cultura coreana'
                    : 'Explore more deep dives into K-Pop and Korean culture'}
                </p>
              </div>
              <Link
                href="/guide"
                className="text-xs font-black text-purple-600 hover:text-purple-700 flex items-center gap-1"
              >
                <span>{lang === 'ko' ? '전체 가이드 허브' : lang === 'es' ? 'Ver todas' : 'View all guides'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedGuides.map((rel) => {
                const relTitle = getLocalizedText(rel, 'title', lang);
                const relSub = getLocalizedText(rel, 'subtitle', lang);
                return (
                  <Link
                    key={rel.slug}
                    href={`/guide/${rel.slug}`}
                    className="p-5 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-2xl mb-2">{rel.coverEmoji}</div>
                      <div className="text-[11px] font-black text-purple-600 mb-1">
                        {rel.category} • {rel.questions.length}{' '}
                        {lang === 'ko' ? '문항' : 'Facts'}
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
                        {relTitle}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                        {relSub}
                      </p>
                    </div>
                    <div className="text-xs font-black text-purple-600 flex items-center gap-1 pt-2 border-t border-slate-100">
                      <span>{lang === 'ko' ? '가이드 읽기' : lang === 'es' ? 'Leer guía' : 'Read Guide'}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
