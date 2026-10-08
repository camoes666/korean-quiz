'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Quiz, PersonalityQuestion, PersonalityMemberResult, getLocalizedText } from '@/types/quiz';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';
import { Sparkles, ArrowRight, RotateCcw, Share2, Copy, Check, Heart, Trophy, Compass } from 'lucide-react';
import QuizCard from './QuizCard';

interface PersonalityTestRunnerProps {
  quiz: Quiz;
  relatedQuizzes: Quiz[];
}

export default function PersonalityTestRunner({
  quiz,
  relatedQuizzes,
}: PersonalityTestRunnerProps) {
  const { lang, t } = useLanguage();
  const { addXP } = useGame();

  const questions: PersonalityQuestion[] = quiz.personalityQuestions || [];
  const resultsMap: Record<string, PersonalityMemberResult> = quiz.personalityResults || {};

  const [testState, setTestState] = useState<'intro' | 'answering' | 'calculating' | 'result'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({
    bangchan: 0,
    leeknow: 0,
    changbin: 0,
    hyunjin: 0,
    han: 0,
    felix: 0,
    seungmin: 0,
    in: 0,
  });
  const [matchedResult, setMatchedResult] = useState<PersonalityMemberResult | null>(null);
  const [copied, setCopied] = useState(false);

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);

  const startTest = () => {
    setTestState('answering');
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setScores({
      bangchan: 0,
      leeknow: 0,
      changbin: 0,
      hyunjin: 0,
      han: 0,
      felix: 0,
      seungmin: 0,
      in: 0,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (option: typeof currentQ.options[0]) => {
    if (selectedOptionId) return; // Prevent double click
    setSelectedOptionId(option.id);

    // Accumulate scores
    const updatedScores = { ...scores };
    Object.entries(option.scores).forEach(([memberId, points]) => {
      updatedScores[memberId] = (updatedScores[memberId] || 0) + (points || 0);
    });
    setScores(updatedScores);

    // Auto advance after 350ms
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOptionId(null);
      } else {
        // Calculate result
        setTestState('calculating');
        setTimeout(() => {
          let topMemberId = 'felix';
          let maxScore = -1;
          Object.entries(updatedScores).forEach(([memberId, score]) => {
            if (score > maxScore) {
              maxScore = score;
              topMemberId = memberId;
            }
          });

          const winner = resultsMap[topMemberId] || resultsMap.felix;
          setMatchedResult(winner);
          setTestState('result');
          addXP(50); // Award 50 XP for completing personality test
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1200);
      }
    }, 350);
  };

  const handleCopyLink = () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://kpulsequiz.com';
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareTwitter = () => {
    if (!matchedResult) return;
    const memberName = lang === 'ko' ? matchedResult.nameKo : matchedResult.name;
    const text =
      lang === 'ko'
        ? `나의 스트레이 키즈 소울메이트는 [${memberName}]! 🐺✨ 나와 100% 일치하는 스키즈 멤버를 지금 확인해보세요!`
        : lang === 'es'
        ? `¡Mi alma gemela de Stray Kids es [${memberName}]! 🐺✨ ¿Con cuál de los 8 miembros tienes vibra gemela? ¡Descúbrelo aquí!`
        : `My Stray Kids soulmate is [${memberName}]! 🐺✨ Which SKZ member matches your vibe? Take the test:`;

    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent('https://kpulsequiz.com/quiz/which-stray-kids-member-are-you')}&hashtags=StrayKids,SKZ,STAY,KPulse`;

    window.open(shareUrl, '_blank', 'width=550,height=420');
  };

  // 1. INTRO SCREEN
  if (testState === 'intro') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl border-2 border-purple-100 shadow-xl shadow-purple-500/10 overflow-hidden">
          {/* Hero Header */}
          <div className="bg-gradient-to-r from-rose-600 via-purple-700 to-indigo-800 p-8 sm:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 opacity-20 text-9xl pointer-events-none select-none">
              🔮
            </div>
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase mb-4 border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {lang === 'ko'
                  ? '공식 소울메이트 성격 테스트'
                  : lang === 'es'
                  ? 'Test Oficial de Personalidad'
                  : 'Official SKZ Personality Test'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-4">
              {getLocalizedText(quiz, 'title', lang)}
            </h1>
            <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
              {getLocalizedText(quiz, 'subtitle', lang)}
            </p>

            {/* Mascot Preview */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <img
                src="/images/mascot/hobi-skz-v2.webp"
                alt="Stay Hobi"
                className="w-16 h-16 object-contain drop-shadow-md"
              />
              <div className="text-left bg-black/25 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15">
                <span className="text-[11px] font-black text-amber-300 block">
                  {lang === 'ko' ? '스테이 호비의 가이드' : lang === 'es' ? 'Guía de Hobi STAY' : "Stay Hobi's Guide"}
                </span>
                <span className="text-xs text-white/90 font-medium">
                  {lang === 'ko'
                    ? '정답은 없어요! 내 마음에 가장 와닿는 답변을 골라보세요 🐺'
                    : lang === 'es'
                    ? '¡No hay respuestas incorrectas! Elige lo que dicte tu corazón 🐺'
                    : 'No wrong answers! Pick what resonates with your heart 🐺'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Info & Start Button */}
          <div className="p-6 sm:p-10 text-center">
            <div className="grid grid-cols-3 gap-3 mb-8 max-w-md mx-auto text-center">
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100">
                <span className="text-xs text-slate-400 block font-medium">
                  {lang === 'ko' ? '문항 수' : lang === 'es' ? 'Preguntas' : 'Questions'}
                </span>
                <span className="text-base font-black text-purple-700">10 문항</span>
              </div>
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100">
                <span className="text-xs text-slate-400 block font-medium">
                  {lang === 'ko' ? '소요 시간' : lang === 'es' ? 'Tiempo' : 'Time'}
                </span>
                <span className="text-base font-black text-rose-600">~2 분</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span className="text-xs text-slate-400 block font-medium">
                  {lang === 'ko' ? '결과 유형' : lang === 'es' ? 'Resultados' : 'Outcomes'}
                </span>
                <span className="text-base font-black text-emerald-700">8 멤버</span>
              </div>
            </div>

            <button
              onClick={startTest}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-lg rounded-full shadow-xl shadow-purple-500/25 transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-3"
            >
              <span>
                {lang === 'ko'
                  ? '소울메이트 테스트 시작하기 ✨'
                  : lang === 'es'
                  ? 'Comenzar Test de Personalidad ✨'
                  : 'Find My SKZ Soulmate ✨'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. CALCULATING ANIMATION
  if (testState === 'calculating') {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="bg-white rounded-3xl p-10 border-2 border-purple-100 shadow-xl shadow-purple-500/10 flex flex-col items-center">
          <div className="relative mb-6">
            <img
              src="/images/mascot/hobi-skz-v2.webp"
              alt="Hobi calculating"
              className="w-32 h-32 object-contain animate-bounce drop-shadow-md"
            />
            <Compass className="w-8 h-8 text-rose-500 absolute -bottom-1 -right-1 animate-spin" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">
            {lang === 'ko'
              ? '호비가 소울메이트를 분석 중입니다... 🐺'
              : lang === 'es'
              ? 'Hobi está analizando tu alma gemela... 🐺'
              : 'Hobi is calculating your soulmate... 🐺'}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {lang === 'ko'
              ? '8명 멤버 중 나와 가장 닮은 바이브를 찾는 중!'
              : lang === 'es'
              ? '¡Descubriendo cuál de los 8 miembros tiene tu misma energía!'
              : 'Matching your answers across all 8 Stray Kids members!'}
          </p>
        </div>
      </div>
    );
  }

  // 3. RESULT SCREEN
  if (testState === 'result' && matchedResult) {
    const memberName =
      lang === 'ko'
        ? matchedResult.nameKo
        : lang === 'es'
        ? matchedResult.nameEs
        : matchedResult.name;

    const memberTitle =
      lang === 'ko'
        ? matchedResult.titleKo
        : lang === 'es'
        ? matchedResult.titleEs
        : matchedResult.title;

    const memberSubtitle =
      lang === 'ko'
        ? matchedResult.subtitleKo
        : lang === 'es'
        ? matchedResult.subtitleEs
        : matchedResult.subtitle;

    const memberDesc =
      lang === 'ko'
        ? matchedResult.descriptionKo
        : lang === 'es'
        ? matchedResult.descriptionEs
        : matchedResult.description;

    const traits =
      lang === 'ko'
        ? matchedResult.traitsKo
        : lang === 'es'
        ? matchedResult.traitsEs
        : matchedResult.traits;

    const bestMatchName =
      lang === 'ko'
        ? matchedResult.bestMatchNameKo
        : lang === 'es'
        ? matchedResult.bestMatchNameEs
        : matchedResult.bestMatchName;

    const bestMatchReason =
      lang === 'ko'
        ? matchedResult.bestMatchReasonKo
        : lang === 'es'
        ? matchedResult.bestMatchReasonEs
        : matchedResult.bestMatchReason;

    const skzooName =
      lang === 'ko'
        ? matchedResult.skzooKo
        : lang === 'es'
        ? matchedResult.skzooEs
        : matchedResult.skzoo;

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
        {/* Main Result Card */}
        <div className="bg-white rounded-3xl border-2 border-purple-100 shadow-xl shadow-purple-500/10 overflow-hidden mb-8">
          {/* Header Banner */}
          <div
            className={`p-8 sm:p-12 text-white text-center relative overflow-hidden bg-gradient-to-r ${matchedResult.bgGradient}`}
          >
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase mb-3 border border-white/30">
              <span>{matchedResult.emoji}</span>
              <span>
                {lang === 'ko'
                  ? '나의 스트레이 키즈 소울메이트'
                  : lang === 'es'
                  ? 'Tu Alma Gemela de Stray Kids'
                  : 'Your Stray Kids Soulmate'}
              </span>
            </div>

            <div className="text-5xl sm:text-6xl mb-2">{matchedResult.emoji}</div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">
              {memberName}
            </h1>
            <p className="text-lg sm:text-xl font-bold text-amber-200 mb-1">
              {memberTitle}
            </p>
            <p className="text-xs sm:text-sm text-white/90 max-w-md mx-auto font-medium">
              &quot;{memberSubtitle}&quot;
            </p>

            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/30 backdrop-blur-md text-xs font-bold text-white border border-white/20">
              <span>SKZOO Twin:</span>
              <span className="text-amber-300 font-black">{skzooName}</span>
            </div>
          </div>

          {/* Result Body */}
          <div className="p-6 sm:p-10 space-y-6">
            {/* Traits Tags */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">
                {lang === 'ko' ? '핵심 성향 키워드' : lang === 'es' ? 'Rasgos Clave de Personalidad' : 'Key Personality Traits'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {traits.map((trait, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100"
                  >
                    #{trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Description Narrative */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-black text-slate-900 mb-2 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-purple-600" />
                <span>
                  {lang === 'ko'
                    ? '당신과 멤버의 싱크로율 분석'
                    : lang === 'es'
                    ? 'Análisis de Sincronización'
                    : 'Soulmate Sync Analysis'}
                </span>
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {memberDesc}
              </p>
            </div>

            {/* Best Match (궁합) Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200/80 flex items-start gap-4">
              <div className="text-3xl shrink-0">💖</div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-rose-600 block mb-0.5">
                  {lang === 'ko' ? '최고의 찰떡 궁합 멤버' : lang === 'es' ? 'Tu Mejor Dúo / Soulmate' : 'Best Chemistry Match'}
                </span>
                <h4 className="text-base font-black text-slate-900 mb-1">
                  {bestMatchName}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {bestMatchReason}
                </p>
              </div>
            </div>

            {/* Action Buttons (Share & Retake) */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleShareTwitter}
                className="w-full sm:flex-1 py-3 px-4 bg-slate-900 hover:bg-black text-white text-sm font-black rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md shadow-slate-900/10"
              >
                <Share2 className="w-4 h-4" />
                <span>{lang === 'ko' ? 'X (트위터)에 결과 공유' : lang === 'es' ? 'Compartir en X (Twitter)' : 'Share Result on X'}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto py-3 px-5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border border-purple-200"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? (lang === 'ko' ? '복사 완료!' : '¡Copiado!') : (lang === 'ko' ? '링크 복사' : 'Copiar Enlace')}</span>
              </button>

              <button
                onClick={startTest}
                className="w-full sm:w-auto py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{lang === 'ko' ? '다시 하기' : lang === 'es' ? 'Repetir' : 'Retake'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Continuous Binge Banner: Link to 60-Question Stray Kids Trivia */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-purple-500/20">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/30 text-rose-300 text-xs font-black uppercase tracking-wider mb-2 inline-block border border-rose-500/40">
              ⚡ NEXT CHALLENGE (+100 XP)
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-1">
              {lang === 'ko'
                ? '스키즈 60문제 상식 퀴즈도 도전해볼까요?'
                : lang === 'es'
                ? '¿Listo para el Desafío STAY de 60 Preguntas?'
                : 'Ready for the 60-Question STAY Trivia?'}
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/80 max-w-md font-medium">
              {lang === 'ko'
                ? '데뷔곡 District 9부터 빌보드 200 대기록까지, 당신의 진정한 스테이 레벨을 증명하세요!'
                : lang === 'es'
                ? '¡Desde District 9 hasta récords de Billboard! ¡Demuestra cuánto sabes de Stray Kids!'
                : 'From District 9 to historic Billboard #1 records, prove your true STAY status!'}
            </p>
          </div>
          <Link
            href="/quiz/stray-kids-stay-trivia"
            className="w-full sm:w-auto px-6 py-3.5 bg-rose-500 hover:bg-rose-400 active:scale-95 text-white font-black text-sm rounded-full shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 shrink-0 transition-all"
          >
            <span>{lang === 'ko' ? '60문제 퀴즈 풀러 가기' : lang === 'es' ? 'Jugar Quiz de 60 Preguntas' : 'Play 60-Question Trivia'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related Quizzes */}
        <div>
          <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
            <span>✨</span>
            <span>{lang === 'ko' ? '다른 추천 퀴즈 둘러보기' : lang === 'es' ? 'Más Quizzes Recomendados' : 'Explore More Quizzes'}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedQuizzes.slice(0, 2).map((relQuiz) => (
              <QuizCard key={relQuiz.slug} quiz={relQuiz} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. ANSWERING QUESTIONS SCREEN
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Top Header & Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-black text-slate-400 mb-2">
          <span>
            {lang === 'ko'
              ? `질문 ${currentIndex + 1} / ${questions.length}`
              : lang === 'es'
              ? `Pregunta ${currentIndex + 1} de ${questions.length}`
              : `Question ${currentIndex + 1} of ${questions.length}`}
          </span>
          <span className="text-purple-600 font-extrabold">{progressPercent}%</span>
        </div>

        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-rose-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl border-2 border-purple-100 shadow-xl shadow-purple-500/10 p-6 sm:p-10 mb-6">
        <div className="text-3xl sm:text-4xl mb-3 text-center">
          {currentQ.emoji || '✨'}
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 text-center tracking-tight leading-snug mb-8">
          {lang === 'ko'
            ? currentQ.questionKo
            : lang === 'es'
            ? currentQ.questionEs
            : currentQ.question}
        </h2>

        {/* 4 Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const text =
              lang === 'ko' ? opt.textKo : lang === 'es' ? opt.textEs : opt.text;

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                disabled={!!selectedOptionId}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all font-medium text-sm sm:text-base flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold scale-[1.01] shadow-md shadow-purple-500/15'
                    : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-slate-50/80 text-slate-800 active:scale-[0.99]'
                }`}
              >
                <span>{text}</span>
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {opt.id}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
