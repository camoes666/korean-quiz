'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Quiz, Category, getLocalizedText } from '@/types/quiz';
import { useLanguage } from '@/context/LanguageContext';
import { estimateGuideReadTime } from '@/lib/guides';
import {
  BookOpen,
  Sparkles,
  Gamepad2,
  ArrowRight,
  Search,
  Filter,
  Flame,
  CheckCircle2,
  Award,
  Globe2,
  Layers,
  Heart,
  ChevronRight,
  TrendingUp,
  Clock,
} from 'lucide-react';

interface GuideHubClientProps {
  guides: Quiz[];
  personalityQuizzes: Quiz[];
  totalQuestionCount: number;
}

const CATEGORIES: Category[] = ['All', 'K-Pop', 'Culture', 'Food', 'K-Drama'];

export default function GuideHubClient({
  guides,
  personalityQuizzes,
  totalQuestionCount,
}: GuideHubClientProps) {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      // Category filter
      if (selectedCategory !== 'All' && guide.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (!searchQuery.trim()) return true;

      const title = getLocalizedText(guide, 'title', lang).toLowerCase();
      const subtitle = getLocalizedText(guide, 'subtitle', lang).toLowerCase();
      const desc = getLocalizedText(guide, 'description', lang).toLowerCase();
      const tag = (guide.tag || '').toLowerCase();
      const q = searchQuery.toLowerCase();

      return (
        title.includes(q) ||
        subtitle.includes(q) ||
        desc.includes(q) ||
        tag.includes(q)
      );
    });
  }, [guides, selectedCategory, searchQuery, lang]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-24">
      {/* 1. Breadcrumbs */}
      <div className="bg-white border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Link href="/" className="hover:text-purple-600 transition-colors">
              {lang === 'ko' ? '홈' : lang === 'es' ? 'Inicio' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">
              {lang === 'ko' ? '지식 & 로어 가이드' : lang === 'es' ? 'Guías de Lore' : 'Knowledge & Lore Guides'}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-white border-b-2 border-purple-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Mascot Badge */}
          <div className="flex flex-col items-center justify-center mb-5">
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-purple-100 via-pink-50 to-indigo-100 p-2 border-2 border-purple-200/80 shadow-md shadow-purple-500/10 flex items-center justify-center group-hover:scale-105 transition-all">
                <img
                  src="/images/hobi01.webp"
                  alt="Hobi White Tiger Mascot"
                  className="w-full h-full object-contain filter drop-shadow hover:rotate-3 transition-transform"
                />
              </div>
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-purple-600 text-white font-black text-[10px] whitespace-nowrap shadow-xs">
                K-Pulse Lore Hub 📚
              </div>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1 text-xs font-black text-purple-700">
              <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>
                {lang === 'ko'
                  ? '230+개 검증된 팩트 & 꿀팁 해설 총망라'
                  : lang === 'es'
                  ? '230+ Datos y Explicaciones Verificadas'
                  : '230+ Verified Facts & Detailed Lore'}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15] mb-4">
            {lang === 'ko' ? (
              <>
                K-컬처 & K-Pop <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
                  팬 지식 가이드 & 백과
                </span>{' '}
                📖
              </>
            ) : lang === 'es' ? (
              <>
                Guías de Conocimiento <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
                  K-Pop y Cultura Coreana
                </span>{' '}
                📖
              </>
            ) : (
              <>
                K-Culture & K-Pop <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
                  Knowledge & Lore Guides
                </span>{' '}
                📖
              </>
            )}
          </h1>

          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
            {lang === 'ko'
              ? 'BTS, Stray Kids, 블랙핑크의 데뷔 역사와 비하인드부터 한국 매운맛 스코빌 지수, 식사 예절, K-드라마 클리셰까지! 퀴즈 전 정독하고 만점을 노려보세요.'
              : lang === 'es'
              ? 'Desde los orígenes y récords de BTS, Stray Kids y BLACKPINK, hasta la escala de picante coreano y costumbres tradicionales. ¡Léelas y domina los quizzes!'
              : 'Explore deep fandom lore, Billboard histories, spicy food Scoville ranks, and dining etiquette. Read the verified explanations, then test your skills in the quizzes!'}
          </p>

          {/* Quick Stats Pill Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
              <div className="text-xl sm:text-2xl font-black text-purple-600">
                {guides.length}
              </div>
              <div className="text-[11px] font-bold text-slate-600">
                {lang === 'ko' ? '분야별 가이드' : lang === 'es' ? 'Guías Temáticas' : 'Topic Guides'}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
              <div className="text-xl sm:text-2xl font-black text-pink-600">
                {totalQuestionCount}+
              </div>
              <div className="text-[11px] font-bold text-slate-600">
                {lang === 'ko' ? '검증된 해설 & 팩트' : lang === 'es' ? 'Datos y Respuestas' : 'Verified Q&A Facts'}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
              <div className="text-xl sm:text-2xl font-black text-indigo-600">
                5
              </div>
              <div className="text-[11px] font-bold text-slate-600">
                {lang === 'ko' ? '지원 언어' : lang === 'es' ? 'Idiomas' : 'Global Languages'}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-600">
                100%
              </div>
              <div className="text-[11px] font-bold text-slate-600">
                {lang === 'ko' ? '무료 & 퀴즈 연동' : lang === 'es' ? 'Gratis y Conectado' : 'Free & Connected'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Filter & Search Bar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20 scale-105'
                      : 'bg-white text-slate-600 hover:bg-purple-50 border border-purple-100'
                  }`}
                >
                  {cat === 'All'
                    ? lang === 'ko' ? '전체' : lang === 'es' ? 'Todos' : 'All'
                    : cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'ko'
                  ? '가이드 제목 또는 키워드 검색...'
                  : lang === 'es'
                  ? 'Buscar guías o palabras clave...'
                  : 'Search guide topics or keywords...'
              }
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:border-purple-500 focus:outline-hidden text-xs sm:text-sm font-medium shadow-2xs"
            />
          </div>
        </div>
      </section>

      {/* 4. Guides Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => {
            const title = getLocalizedText(guide, 'title', lang);
            const subtitle = getLocalizedText(guide, 'subtitle', lang);
            const readTime = estimateGuideReadTime(guide.questions.length);

            return (
              <div
                key={guide.slug}
                className="group relative flex flex-col justify-between rounded-3xl bg-white border-2 border-purple-100 hover:border-purple-300 p-6 shadow-xs hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Top Header: Emoji + Category Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                      {guide.coverEmoji}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-purple-100 text-purple-700">
                        {guide.category}
                      </span>
                      {guide.tag && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-pink-100 text-pink-700">
                          #{guide.tag}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2 leading-snug mb-2">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium line-clamp-2 mb-4 leading-relaxed">
                    {subtitle}
                  </p>

                  {/* Meta Pills */}
                  <div className="flex items-center gap-2 flex-wrap text-[11px] font-bold text-slate-500 mb-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                      <Layers className="w-3 h-3 text-purple-600" />
                      {guide.questions.length}{' '}
                      {lang === 'ko' ? '개 문답' : lang === 'es' ? 'Hechos' : 'Key Facts'}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                      <Clock className="w-3 h-3 text-slate-500" />
                      ~{readTime} {lang === 'ko' ? '분' : 'min'}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
                      {guide.difficulty}
                    </span>
                  </div>
                </div>

                {/* Bottom Action Buttons: Read Guide + Play Quiz */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    href={`/guide/${guide.slug}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-xs transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'ko' ? '가이드 정독' : lang === 'es' ? 'Leer Guía' : 'Read Guide'}
                    </span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <Link
                    href={`/quiz/${guide.slug}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-purple-200 hover:bg-purple-50 text-purple-700 font-black text-xs transition-colors"
                    title={lang === 'ko' ? '퀴즈 바로 풀기' : 'Play Quiz'}
                  >
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>{lang === 'ko' ? '퀴즈' : 'Quiz'}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredGuides.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 text-sm mb-1">
              {lang === 'ko' ? '일치하는 가이드가 없습니다' : 'No matching guides found'}
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              {lang === 'ko' ? '다른 검색어를 입력해보세요.' : 'Try a different search keyword.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
            >
              {lang === 'ko' ? '초기화' : 'Reset'}
            </button>
          </div>
        )}
      </section>

      {/* 5. Educational SEO Explainer Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <div className="rounded-3xl bg-white border border-purple-100 p-8 sm:p-10 shadow-xs">
          <div className="max-w-3xl">
            <span className="text-[11px] font-black uppercase tracking-wider text-purple-600 mb-2 block">
              Programmatic Knowledge Base
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              {lang === 'ko'
                ? '왜 K-Pulse 지식 가이드인가요?'
                : lang === 'es'
                ? '¿Por qué estudiar con las guías de K-Pulse?'
                : 'Why Study With K-Pulse Lore Guides?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-6">
              {lang === 'ko'
                ? '인터넷에 흩어져 있는 K-Pop 정보와 한국 문화 상식을 철저하게 팩트체크하여 체계적인 질문-답변 및 심층 비하인드로 정리했습니다. 글로벌 팬들이 가장 궁금해하는 공식 기록부터 식사 에티켓까지 한 곳에서 마스터하세요.'
                : lang === 'es'
                ? 'Reunimos información verificada de K-Pop y cultura coreana en un formato claro de preguntas y respuestas con explicaciones y curiosidades. ¡Todo lo que necesitas saber antes de viajar a Corea o unirte a un fandom!'
                : 'We compiled verified facts, debut histories, culinary science, and everyday etiquette into structured Q&A knowledge bases with cultural context. Master the lore before testing yourself in the quizzes!'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
              <CheckCircle2 className="w-5 h-5 text-purple-600 mb-2" />
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 mb-1">
                {lang === 'ko' ? '100% 검증된 팩트체크' : '100% Fact-Checked'}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {lang === 'ko'
                  ? '공식 앨범 기록, 공신력 있는 기관 자료, 공식 인터뷰를 기반으로 작성되었습니다.'
                  : 'Based on official music records, verified agency statements, and authentic cultural history.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100">
              <Sparkles className="w-5 h-5 text-pink-600 mb-2" />
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 mb-1">
                {lang === 'ko' ? '팬덤 비하인드 & 꿀팁' : 'Fandom Lore & Inside Jokes'}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {lang === 'ko'
                  ? '단순 정답뿐 아니라 팬들 사이에서 사랑받는 명대사와 비하인드 스토리를 담았습니다.'
                  : 'Beyond standard facts, discover iconic inside jokes, memes, and backstage stories.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
              <Award className="w-5 h-5 text-indigo-600 mb-2" />
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 mb-1">
                {lang === 'ko' ? '퀴즈 100점 지름길' : 'Fast-Track to 100% Score'}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {lang === 'ko'
                  ? '가이드를 1회 완독하면 해당 주제의 퀴즈에서 최고 등급 티어를 획득할 수 있습니다.'
                  : 'Review the lore guides to ace the trivia challenge and unlock the top player tier.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Personality Tests Cross-Promotion Section */}
      {personalityQuizzes.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
          <div className="rounded-3xl bg-gradient-to-r from-purple-100/60 via-pink-100/40 to-indigo-100/60 border border-purple-200/80 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-700">
                  {lang === 'ko' ? '성향 분석 챌린지' : 'Personality Match Tests'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {lang === 'ko'
                    ? '지식도 쌓고, 나와 찰떡인 최애 멤버도 찾아보세요!'
                    : 'Discover Your K-Pop & K-Food Twin!'}
                </h3>
              </div>
              <Link
                href="/"
                className="text-xs font-black text-purple-700 hover:text-purple-800 flex items-center gap-1 shrink-0"
              >
                <span>{lang === 'ko' ? '전체 테스트 보기' : 'Explore All Tests'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {personalityQuizzes.map((quiz) => {
                const pTitle = getLocalizedText(quiz, 'title', lang);
                return (
                  <Link
                    key={quiz.slug}
                    href={`/quiz/${quiz.slug}`}
                    className="p-4 rounded-2xl bg-white/90 hover:bg-white border border-purple-200/60 hover:shadow-md transition-all group flex items-center gap-3"
                  >
                    <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform">
                      {quiz.coverEmoji}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-black text-pink-600 uppercase">
                        {quiz.tag || quiz.category}
                      </div>
                      <div className="text-xs font-black text-slate-900 group-hover:text-purple-600 transition-colors truncate">
                        {pTitle}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
