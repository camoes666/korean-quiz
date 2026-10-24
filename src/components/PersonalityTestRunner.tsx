'use client';
 
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Quiz, PersonalityQuestion, PersonalityMemberResult, getLocalizedText, getLocalizedArray } from '@/types/quiz';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';
import { Sparkles, ArrowRight, RotateCcw, Share2, Copy, Check, Heart, Trophy, Compass, Camera, Loader2 } from 'lucide-react';
import QuizCard from './QuizCard';
import { getQuizMascot } from '@/lib/mascot';
import { downloadResultCard } from '@/lib/renderResultCard';
import { getTopMatches } from '@/lib/personalityMatch';
import { getQuizThemeGroup } from '@/lib/theme';
import {
  PERSONALITY_RUNNER_MS,
  PERSONALITY_TIMING,
  PersonalityStep,
  RECORD_MESSAGE,
} from '@/lib/recordMode';
import { trackQuizStart, trackQuizComplete, trackShare, trackCardDownload } from '@/lib/analytics';

// Result-screen labels per group (the data's `skzoo` field holds each group's character twin).
const RESULT_LABELS: Record<
  string,
  {
    soulmate: string;
    soulmateEs: string;
    soulmateKo: string;
    soulmatePt: string;
    twin: string;
    twinEs: string;
    twinKo: string;
    twinPt: string;
  }
> = {
  skz: {
    soulmate: 'Your Stray Kids Soulmate',
    soulmateEs: 'Tu Alma Gemela de Stray Kids',
    soulmateKo: '나의 스트레이 키즈 소울메이트',
    soulmatePt: 'Sua Alma Gêmea do Stray Kids',
    twin: 'SKZOO Twin',
    twinEs: 'Gemelo SKZOO',
    twinKo: 'SKZOO 캐릭터',
    twinPt: 'Gêmeo SKZOO',
  },
  bts: {
    soulmate: 'Your BTS Soulmate',
    soulmateEs: 'Tu Alma Gemela de BTS',
    soulmateKo: '나의 방탄소년단 소울메이트',
    soulmatePt: 'Sua Alma Gêmea do BTS',
    twin: 'BT21 Twin',
    twinEs: 'Gemelo BT21',
    twinKo: 'BT21 캐릭터',
    twinPt: 'Gêmeo BT21',
  },
  blackpink: {
    soulmate: 'Your BLACKPINK Soulmate',
    soulmateEs: 'Tu Alma Gemela de BLACKPINK',
    soulmateKo: '나의 블랙핑크 소울메이트',
    soulmatePt: 'Sua Alma Gêmea do BLACKPINK',
    twin: 'Character Twin',
    twinEs: 'Personaje Gemelo',
    twinKo: '상징 캐릭터',
    twinPt: 'Personagem Gêmeo',
  },
  default: {
    soulmate: 'Your Korean Food Soulmate',
    soulmateEs: 'Tu Comida Coreana Gemela',
    soulmateKo: '나의 한국 음식 소울메이트',
    soulmatePt: 'Sua Comida Coreana Gêmea',
    twin: 'Food Spirit',
    twinEs: 'Espíritu Culinario',
    twinKo: '소울 푸드 심볼',
    twinPt: 'Espírito Culinário',
  },
};

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
  const mascot = getQuizMascot(quiz.slug, quiz.tag);

  const allQuestions: PersonalityQuestion[] = quiz.personalityQuestions || [];
  const resultsMap: Record<string, PersonalityMemberResult> = quiz.personalityResults || {};
  const resultLabels = RESULT_LABELS[getQuizThemeGroup(quiz.slug, quiz.tag)] || RESULT_LABELS.default;

  // Record mode: /record/[slug] embeds this page and sends a plan of answers in its start
  // message (not the URL, so the page keeps its static intro HTML for search engines).
  const [recordPlan, setRecordPlan] = useState<PersonalityStep[] | null>(null);
  const questions: PersonalityQuestion[] = recordPlan
    ? recordPlan
        .map((step) => allQuestions.find((q) => q.id === step.questionId))
        .filter((q): q is PersonalityQuestion => Boolean(q))
    : allQuestions;

  const getInitialScores = () => {
    const initial: Record<string, number> = {};
    Object.keys(resultsMap).forEach((id) => {
      initial[id] = 0;
    });
    return initial;
  };

  const [testState, setTestState] = useState<'intro' | 'answering' | 'calculating' | 'result'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>(() => getInitialScores());
  const [matchedResult, setMatchedResult] = useState<PersonalityMemberResult | null>(null);
  const [friendMatch, setFriendMatch] = useState<PersonalityMemberResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [cardDownloaded, setCardDownloaded] = useState(false);

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const friendMemberId = params.get('m');
    if (friendMemberId && resultsMap[friendMemberId]) {
      setFriendMatch(resultsMap[friendMemberId]);
    }
  }, [resultsMap]);

  const startTest = () => {
    if (!recordPlan) {
      trackQuizStart({
        slug: quiz.slug,
        quizType: 'personality',
        lang,
        isChallenge: Boolean(friendMatch),
      });
    }
    setTestState('answering');
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setScores(getInitialScores());
    window.scrollTo({ top: 0, behavior: recordPlan ? 'instant' : 'smooth' });
  };

  useEffect(() => {
    if (window.parent === window) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.data?.type !== RECORD_MESSAGE.start) return;
      if (!Array.isArray(e.data.plan)) return;
      setRecordPlan(e.data.plan);
      setTestState('answering');
      setCurrentIndex(0);
      setSelectedOptionId(null);
      setScores(getInitialScores());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('message', onMessage);
    window.parent.postMessage({ type: RECORD_MESSAGE.ready }, window.location.origin);
    return () => window.removeEventListener('message', onMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectOption = (option: typeof currentQ.options[0]) => {
    if (selectedOptionId) return; // Prevent double click
    setSelectedOptionId(option.id);

    // Accumulate scores
    const updatedScores = { ...scores };
    Object.entries(option.scores).forEach(([memberId, points]) => {
      updatedScores[memberId] = (updatedScores[memberId] || 0) + (points || 0);
    });
    setScores(updatedScores);

    // Auto advance after a short beat
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

          const winner = resultsMap[topMemberId] || Object.values(resultsMap)[0];
          setMatchedResult(winner);
          setTestState('result');
          if (!recordPlan) {
            addXP(50); // Award 50 XP for completing personality test
            trackQuizComplete({
              slug: quiz.slug,
              quizType: 'personality',
              totalQuestions: questions.length,
              resultId: winner?.id,
              lang,
            });
          }
          window.scrollTo({ top: 0, behavior: recordPlan ? 'instant' : 'smooth' });
        }, PERSONALITY_RUNNER_MS.calculating);
      }
    }, PERSONALITY_RUNNER_MS.advance);
  };

  // Record mode: pick the planned answer after a pause, then hold the result and report done.
  useEffect(() => {
    if (!recordPlan) return;
    if (testState === 'answering' && currentQ && !selectedOptionId) {
      window.parent.postMessage({ type: RECORD_MESSAGE.question, index: currentIndex }, window.location.origin);
      const step = recordPlan[currentIndex];
      const option = currentQ.options.find((o) => o.id === step?.optionId);
      if (!option) return;
      const id = setTimeout(() => handleSelectOption(option), PERSONALITY_TIMING.readMs);
      return () => clearTimeout(id);
    }
    if (testState === 'result') {
      window.parent.postMessage({ type: RECORD_MESSAGE.question, index: -1 }, window.location.origin);
      const id = setTimeout(
        () => window.parent.postMessage({ type: RECORD_MESSAGE.done }, window.location.origin),
        PERSONALITY_TIMING.resultMs
      );
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordPlan, testState, currentIndex]);

  const handleDownloadCard = async () => {
    if (!matchedResult) return;
    trackCardDownload({
      slug: quiz.slug,
      cardType: 'personality',
      lang,
    });
    try {
      setIsGeneratingCard(true);
      const memberName = getLocalizedText(matchedResult, 'name', lang);
      const memberTitle = getLocalizedText(matchedResult, 'title', lang);
      const memberSubtitle = getLocalizedText(matchedResult, 'subtitle', lang);
      const traits = getLocalizedArray(matchedResult, 'traits', lang);
      const bestMatchName = getLocalizedText(matchedResult, 'bestMatchName', lang);
      // Card uses short names: "Jimin (Park Jimin)" -> "Jimin"
      const shortName = (name: string) => name.replace(/\s*\(.*\)\s*$/, '');

      await downloadResultCard(
        {
          type: 'personality',
          quizTitle: getLocalizedText(quiz, 'title', lang),
          slug: quiz.slug,
          lang,
          memberName: shortName(memberName),
          memberTitle,
          memberSubtitle,
          memberEmoji: matchedResult.emoji,
          traits,
          bestMatchName,
          mascotUrl: mascot.avatarUrl,
          groupName: quiz.tag,
          topMatches: getTopMatches(questions, scores).map(({ id, percent }) => ({
            name: shortName(getLocalizedText(resultsMap[id], 'name', lang)),
            percent,
          })),
        },
        `${quiz.slug}-${matchedResult.id}`
      );
      setCardDownloaded(true);
      setTimeout(() => setCardDownloaded(false), 3500);
    } catch (err) {
      console.error('Failed to download personality card:', err);
    } finally {
      setIsGeneratingCard(false);
    }
  };

  const getPersonalityShareUrl = (baseOrigin?: string) => {
    const origin = baseOrigin || (typeof window !== 'undefined' ? window.location.origin : 'https://kpulsequiz.com');
    const queryParts: string[] = [];
    if (matchedResult?.id) {
      queryParts.push(`m=${encodeURIComponent(matchedResult.id)}`);
    }
    if (lang !== 'en') {
      queryParts.push(`lang=${lang}`);
    }
    const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
    return `${origin}/quiz/${quiz.slug}${queryString}`;
  };

  const getPersonalityShareText = () => {
    if (!matchedResult) return '';
    const memberName = getLocalizedText(matchedResult, 'name', lang);
    const groupName = quiz.tag || 'K-Pop';
    return lang === 'ko'
      ? `나의 ${groupName} 소울메이트는 [${memberName} ${matchedResult.emoji}]! ✨ 나와 100% 일치하는 멤버를 지금 확인해보세요!`
      : lang === 'es'
      ? `¡Mi alma gemela de ${groupName} es [${memberName} ${matchedResult.emoji}]! ✨ ¿Con qué integrante haces match al 100%? ¡Haz el test aquí!`
      : lang === 'pt'
      ? `Minha alma gêmea de ${groupName} é [${memberName} ${matchedResult.emoji}]! ✨ Qual membro combina 100% com você? Descubra:`
      : `My ${groupName} soulmate is [${memberName} ${matchedResult.emoji}]! ✨ Which member matches your vibe 100%? Take the test:`;
  };

  const handleCopyLink = () => {
    trackShare({ slug: quiz.slug, method: 'link_copy', lang });
    const url = getPersonalityShareUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    if (!matchedResult) return;
    trackShare({ slug: quiz.slug, method: 'whatsapp', lang });
    const text = getPersonalityShareText();
    const targetUrl = getPersonalityShareUrl('https://kpulsequiz.com');
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text}\n👉 ${targetUrl}`)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareTwitter = () => {
    if (!matchedResult) return;
    trackShare({ slug: quiz.slug, method: 'twitter', lang });
    const text = getPersonalityShareText();

    const hashtags =
      quiz.tag === 'BTS'
        ? 'BTS,BTSARMY,KPulse'
        : quiz.tag === 'BLACKPINK'
        ? 'BLACKPINK,BLINK,KPulse'
        : quiz.category === 'Food' || quiz.tag === 'K-Food'
        ? 'KFood,KoreanFood,KCulture,KPulse'
        : 'StrayKids,SKZ,STAY,KPulse';

    const targetUrl = getPersonalityShareUrl('https://kpulsequiz.com');
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(targetUrl)}&hashtags=${hashtags}`;

    window.open(shareUrl, '_blank', 'width=550,height=420');
  };

  // 1. INTRO SCREEN
  if (testState === 'intro') {
    const memberCount = Object.keys(resultsMap).length;
    const friendName = friendMatch ? getLocalizedText(friendMatch, 'name', lang) : '';
    const friendTitle = friendMatch ? getLocalizedText(friendMatch, 'title', lang) : '';

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        {friendMatch && (
          <div className="mb-5 rounded-3xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 p-0.5 shadow-xl shadow-purple-500/20 animate-fade-in">
            <div className="bg-slate-950/90 backdrop-blur-xl rounded-[22px] px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                {friendMatch.emoji}
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-[11px] font-black uppercase tracking-wider mb-1">
                  <span>💌</span>
                  <span>
                    {lang === 'ko'
                      ? '친구의 소울메이트 초대장'
                      : lang === 'es'
                      ? '¡Desafío de Alma Gemela de tu Amigo/a!'
                      : lang === 'pt'
                      ? 'Desafio de Alma Gêmea de um Amigo!'
                      : "Friend's Soulmate Match"}
                  </span>
                </div>
                <p className="text-white font-black text-sm sm:text-base leading-snug">
                  {lang === 'ko'
                    ? `친구의 소울메이트는 [${friendName}] (${friendTitle}) 입니다!`
                    : lang === 'es'
                    ? `¡El alma gemela de tu amigo/a es [${friendName}] (${friendTitle})!`
                    : lang === 'pt'
                    ? `A alma gêmea do seu amigo(a) é [${friendName}] (${friendTitle})!`
                    : `Your friend matched with [${friendName}] (${friendTitle})!`}
                </p>
                <p className="text-purple-200/90 text-xs sm:text-sm font-medium mt-0.5">
                  {lang === 'ko'
                    ? '과연 나의 소울메이트는 누구일까요? 지금 테스트하고 친구와의 궁합을 확인해보세요! ✨'
                    : lang === 'es'
                    ? '¿Quién será tu alma gemela? ¡Haz el test de 10 preguntas y compara vuestra compatibilidad! ✨'
                    : lang === 'pt'
                    ? 'Quem será a sua alma gêmea? Faça o teste de 10 perguntas e compare a compatibilidade! ✨'
                    : 'Who is your true soulmate? Take the 10-question test to compare your compatibility! ✨'}
                </p>
              </div>
            </div>
          </div>
        )}

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
                  ? '팬메이드 소울메이트 성격 테스트'
                  : lang === 'es'
                  ? 'Test de Personalidad Fan-Made'
                  : lang === 'pt'
                  ? 'Teste de Personalidade Fan-Made'
                  : `Fan-Made ${quiz.tag || 'K-Pop'} Personality Test`}
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
                src={mascot.avatarUrl}
                alt={getLocalizedText(mascot, 'name', lang)}
                className="w-16 h-16 object-contain drop-shadow-md"
              />
              <div className="text-left bg-black/25 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15">
                <span className="text-[11px] font-black text-amber-300 block">
                  {getLocalizedText(mascot, 'badgeTitle', lang)}
                </span>
                <span className="text-xs text-white/90 font-medium">
                  {lang === 'ko'
                    ? '정답은 없어요! 내 마음에 가장 와닿는 답변을 골라보세요 ✨'
                    : lang === 'es'
                    ? '¡No hay respuestas incorrectas! Elige lo que dicte tu corazón ✨'
                    : lang === 'pt'
                    ? 'Não há respostas erradas! Escolha o que tocar seu coração ✨'
                    : 'No wrong answers! Pick what resonates with your heart ✨'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Info & Start Button */}
          <div className="p-6 sm:p-10 text-center">
            <div className="grid grid-cols-3 gap-3 mb-8 max-w-md mx-auto text-center">
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100">
                <span className="text-xs text-slate-400 block font-medium">
                  {t.quizIntro.questions}
                </span>
                <span className="text-base font-black text-purple-700">{questions.length} {t.levels.qsUnit}</span>
              </div>
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100">
                <span className="text-xs text-slate-400 block font-medium">
                  {t.quizIntro.estTime}
                </span>
                <span className="text-base font-black text-rose-600">~{quiz.estimatedMinutes || 3} {t.mins}</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span className="text-xs text-slate-400 block font-medium">
                  {lang === 'ko' ? '결과 유형' : lang === 'es' || lang === 'pt' ? 'Resultados' : 'Outcomes'}
                </span>
                <span className="text-base font-black text-emerald-700">
                  {memberCount} {lang === 'ko' ? '멤버' : lang === 'es' ? 'Miembros' : lang === 'pt' ? 'Membros' : 'Members'}
                </span>
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
                  : lang === 'pt'
                  ? 'Começar Teste de Personalidade ✨'
                  : 'Find Your Soulmate ✨'}
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
    const memberCount = Object.keys(resultsMap).length;
    const localizedMascotName = getLocalizedText(mascot, 'name', lang);
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="bg-white rounded-3xl p-10 border-2 border-purple-100 shadow-xl shadow-purple-500/10 flex flex-col items-center">
          <div className="relative mb-6">
            <img
              src={mascot.avatarUrl}
              alt={localizedMascotName}
              className="w-32 h-32 object-contain animate-bounce drop-shadow-md"
            />
            <Compass className="w-8 h-8 text-rose-500 absolute -bottom-1 -right-1 animate-spin" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">
            {lang === 'ko'
              ? `${localizedMascotName}가 소울메이트를 분석 중입니다... ✨`
              : lang === 'es'
              ? `${localizedMascotName} está analizando tu alma gemela... ✨`
              : lang === 'pt'
              ? `${localizedMascotName} está analisando sua alma gêmea... ✨`
              : `${localizedMascotName} is calculating your soulmate... ✨`}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {lang === 'ko'
              ? `${memberCount}명의 멤버 중 나와 가장 닮은 바이브를 찾는 중!`
              : lang === 'es'
              ? `¡Descubriendo cuál de los ${memberCount} miembros tiene tu misma energía!`
              : lang === 'pt'
              ? `Descobrindo qual dos ${memberCount} membros tem a sua energia!`
              : `Matching your answers across all ${memberCount} members!`}
          </p>
        </div>
      </div>
    );
  }

  // 3. RESULT SCREEN
  if (testState === 'result' && matchedResult) {
    const memberName = getLocalizedText(matchedResult, 'name', lang);
    const memberTitle = getLocalizedText(matchedResult, 'title', lang);
    const memberSubtitle = getLocalizedText(matchedResult, 'subtitle', lang);
    const memberDesc = getLocalizedText(matchedResult, 'description', lang);
    const traits = getLocalizedArray(matchedResult, 'traits', lang);
    const bestMatchName = getLocalizedText(matchedResult, 'bestMatchName', lang);
    const bestMatchReason = getLocalizedText(matchedResult, 'bestMatchReason', lang);
    const skzooName = getLocalizedText(matchedResult, 'skzoo', lang);
    const soulmateLabel = getLocalizedText(resultLabels, 'soulmate', lang);
    const twinLabel = getLocalizedText(resultLabels, 'twin', lang);

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
              <span>{soulmateLabel}</span>
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
              <span>{twinLabel}:</span>
              <span className="text-amber-300 font-black">{skzooName}</span>
            </div>
          </div>

          {/* Result Body */}
          <div className="p-6 sm:p-10 space-y-6">
            {/* Traits Tags */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">
                {lang === 'ko'
                  ? '핵심 성향 키워드'
                  : lang === 'es'
                  ? 'Rasgos Clave de Personalidad'
                  : lang === 'pt'
                  ? 'Traços Principais de Personalidade'
                  : 'Key Personality Traits'}
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
                    : lang === 'pt'
                    ? 'Análise de Sincronia'
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
                  {lang === 'ko'
                    ? '최고의 찰떡 궁합 멤버'
                    : lang === 'es'
                    ? 'Tu Mejor Dúo / Soulmate'
                    : lang === 'pt'
                    ? 'Sua Melhor Dupla / Química'
                    : 'Best Chemistry Match'}
                </span>
                <h4 className="text-base font-black text-slate-900 mb-1">
                  {bestMatchName}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {bestMatchReason}
                </p>
              </div>
            </div>

            {/* Friend Soulmate Comparison Card (when opened via ?m=...) */}
            {friendMatch && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-fuchsia-50 via-purple-50 to-indigo-50 border-2 border-purple-200/80 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-purple-200 flex items-center justify-center text-2xl shadow-sm">
                    {friendMatch.emoji}
                  </div>
                  <span className="text-purple-400 font-black text-lg">×</span>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-purple-200 flex items-center justify-center text-2xl shadow-sm">
                    {matchedResult.emoji}
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-purple-600 block mb-0.5">
                    {matchedResult.id === friendMatch.id
                      ? lang === 'ko'
                        ? '🎉 100% 쌍둥이 소울메이트 매치!'
                        : lang === 'es'
                        ? '🎉 ¡100% GEMELOS DE ALMA!'
                        : lang === 'pt'
                        ? '🎉 100% GÊMEOS DE ALMA!'
                        : '🎉 100% TWIN SOULMATE MATCH!'
                      : matchedResult.bestMatchId === friendMatch.id || friendMatch.bestMatchId === matchedResult.id
                      ? lang === 'ko'
                        ? '🔥 운명의 1위 찰떡 케미 듀오!'
                        : lang === 'es'
                        ? '🔥 ¡DÚO DESTINADO CON QUÍMICA #1!'
                        : lang === 'pt'
                        ? '🔥 DUPLA DESTINADA COM QUÍMICA #1!'
                        : '🔥 DESTINED #1 CHEMISTRY DUO!'
                      : lang === 'ko'
                      ? '✨ 친구와의 소울메이트 케미 결과'
                      : lang === 'es'
                      ? '✨ Resultado de Compatibilidad con tu Amigo/a'
                      : lang === 'pt'
                      ? '✨ Resultado de Compatibilidade com seu Amigo(a)'
                      : '✨ Friend Soulmate Compatibility'}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                    {matchedResult.id === friendMatch.id
                      ? lang === 'ko'
                        ? `소름! 친구와 똑같이 [${memberName}] 소울메이트가 나왔어요! 지금 결과를 공유해 보세요!`
                        : lang === 'es'
                        ? `¡Increíble! Tú y tu amigo/a obtuvieron exactamente a [${memberName}]. ¡Envíale tu resultado!`
                        : lang === 'pt'
                        ? `Incrível! Você e seu amigo(a) tiraram exatamente [${memberName}]! Envie seu resultado!`
                        : `Incredible! You and your friend both matched with [${memberName}]! Send them your result!`
                      : matchedResult.bestMatchId === friendMatch.id || friendMatch.bestMatchId === matchedResult.id
                      ? lang === 'ko'
                        ? `친구의 [${getLocalizedText(friendMatch, 'name', lang)}] & 나의 [${memberName}] 조합은 그룹 내 최고 궁합 듀오입니다!`
                        : lang === 'es'
                        ? `¡[${getLocalizedText(friendMatch, 'name', lang)}] (tu amigo/a) y [${memberName}] (tú) son el mejor dúo del grupo!`
                        : lang === 'pt'
                        ? `[${getLocalizedText(friendMatch, 'name', lang)}] (seu amigo) e [${memberName}] (você) formam a melhor dupla do grupo!`
                        : `Your friend's [${getLocalizedText(friendMatch, 'name', lang)}] & your [${memberName}] are each other's #1 Best Chemistry Match!`
                      : lang === 'ko'
                      ? `친구는 [${getLocalizedText(friendMatch, 'name', lang)}], 나는 [${memberName}]! 친구에게 내 결과를 답장으로 보내보세요!`
                      : lang === 'es'
                      ? `Tu amigo/a obtuvo a [${getLocalizedText(friendMatch, 'name', lang)}] y tú a [${memberName}]. ¡Respóndele con tu resultado en WhatsApp!`
                      : lang === 'pt'
                      ? `Seu amigo(a) tirou [${getLocalizedText(friendMatch, 'name', lang)}] e você [${memberName}]. Responda com seu resultado no WhatsApp!`
                      : `Your friend got [${getLocalizedText(friendMatch, 'name', lang)}] and you got [${memberName}]! Send your result back to them!`}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons (Share & Retake) */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              {/* 📸 Download Soulmate Result Card Button */}
              <button
                onClick={handleDownloadCard}
                disabled={isGeneratingCard}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white text-sm font-black rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-500/25 group"
              >
                {isGeneratingCard ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>
                      {lang === 'ko'
                        ? '카드 이미지 생성 중... 📸'
                        : lang === 'es'
                        ? 'Generando tarjeta de imagen... 📸'
                        : lang === 'pt'
                        ? 'Gerando cartão de imagem... 📸'
                        : 'Generating Card Image... 📸'}
                    </span>
                  </>
                ) : cardDownloaded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>
                      {lang === 'ko'
                        ? '소울메이트 카드 저장 완료! 인스타·X에 자랑해보세요 ✨'
                        : lang === 'es'
                        ? '¡Tarjeta guardada! ¡Compártela en Instagram y X! ✨'
                        : lang === 'pt'
                        ? 'Cartão salvo! Compartilhe no Instagram e X! ✨'
                        : 'Card Saved! Share on Instagram & X! ✨'}
                    </span>
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>
                      {lang === 'ko'
                        ? '📸 내 소울메이트 카드 이미지 저장 (인스타·X 자랑용)'
                        : lang === 'es'
                        ? '📸 Guardar Tarjeta de Soulmate (PNG)'
                        : lang === 'pt'
                        ? '📸 Salvar Cartão de Alma Gêmea (PNG)'
                        : '📸 Save Soulmate Card Image (PNG for Instagram & X)'}
                    </span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleShareWhatsApp}
                  className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-black rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md shadow-[#25D366]/25"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.124.556 4.119 1.528 5.847l-1.528 5.581 5.713-1.499c1.678.9 3.593 1.413 5.629 1.413 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
                  </svg>
                  <span>
                    {lang === 'ko'
                      ? 'WhatsApp으로 친구와 궁합 보기'
                      : lang === 'es'
                      ? 'Compartir en WhatsApp'
                      : lang === 'pt'
                      ? 'Compartilhar no WhatsApp'
                      : 'Share on WhatsApp'}
                  </span>
                </button>

                <button
                  onClick={handleShareTwitter}
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-black text-white text-sm font-black rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md shadow-slate-900/10"
                >
                  <Share2 className="w-4 h-4" />
                  <span>
                    {lang === 'ko'
                      ? 'X (트위터)에 결과 공유'
                      : lang === 'es'
                      ? 'Compartir en X (Twitter)'
                      : lang === 'pt'
                      ? 'Compartilhar no X (Twitter)'
                      : 'Share Result on X'}
                  </span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleCopyLink}
                  className="w-full sm:flex-1 py-3 px-5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border border-purple-200"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>
                    {copied
                      ? t.resultView.copied
                      : lang === 'ko'
                      ? '내 소울메이트 초대 링크 복사'
                      : lang === 'es'
                      ? 'Copiar Enlace de Desafío'
                      : lang === 'pt'
                      ? 'Copiar Link de Desafio'
                      : 'Copy Soulmate Challenge Link'}
                  </span>
                </button>

                <button
                  onClick={startTest}
                  className="w-full sm:w-auto py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.resultView.retake}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Continuous Binge Banner */}
        {(() => {
          let bingeHref = '/quiz/stray-kids-stay-trivia';
          let bingeTitle = lang === 'ko' ? '스키즈 60문제 상식 퀴즈도 도전해볼까요?' : lang === 'es' ? '¿Listo para el Desafío STAY de 60 Preguntas?' : lang === 'pt' ? 'Pronto para o Desafio STAY de 60 Perguntas?' : 'Ready for the 60-Question STAY Trivia?';
          let bingeDesc = lang === 'ko' ? '데뷔곡 District 9부터 빌보드 200 대기록까지, 당신의 진정한 스테이 레벨을 증명하세요!' : lang === 'es' ? '¡Desde District 9 hasta récords de Billboard! ¡Demuestra cuánto sabes de Stray Kids!' : lang === 'pt' ? 'De District 9 aos recordes da Billboard, prove seu verdadeiro nível STAY!' : 'From District 9 to historic Billboard #1 records, prove your true STAY status!';
          let bingeBtn = lang === 'ko' ? '60문제 퀴즈 풀러 가기' : lang === 'es' ? 'Jugar Quiz de 60 Preguntas' : lang === 'pt' ? 'Jogar Quiz de 60 Perguntas' : 'Play 60-Question Trivia';

          if (quiz.tag === 'BTS') {
            bingeHref = '/quiz/bts-army-trivia';
            bingeTitle = lang === 'ko' ? '방탄소년단 35문제 아미 지식 퀴즈도 도전해볼까요?' : lang === 'es' ? '¿Listo para el Desafío ARMY de 35 Preguntas?' : lang === 'pt' ? 'Pronto para o Desafio ARMY de 35 Perguntas?' : 'Ready for the 35-Question BTS ARMY Trivia?';
            bingeDesc = lang === 'ko' ? '데뷔곡 No More Dream부터 빌보드 Hot 100 대기록까지, 아미 레벨을 증명하세요!' : lang === 'es' ? '¡Desde No More Dream hasta el Hot 100! ¡Demuestra tu nivel ARMY!' : lang === 'pt' ? 'De No More Dream ao topo da Billboard Hot 100, prove seu nível ARMY!' : 'From No More Dream to Billboard Hot 100 records, prove your true ARMY status!';
            bingeBtn = lang === 'ko' ? '35문제 퀴즈 풀러 가기' : lang === 'es' ? 'Jugar Quiz de 35 Preguntas' : lang === 'pt' ? 'Jogar Quiz de 35 Perguntas' : 'Play 35-Question Trivia';
          } else if (quiz.tag === 'BLACKPINK') {
            bingeHref = '/quiz/blackpink-blink-trivia';
            bingeTitle = lang === 'ko' ? '블랙핑크 50문제 블링크 지식 퀴즈도 도전해볼까요?' : lang === 'es' ? '¿Listo para el Desafío BLINK de 50 Preguntas?' : lang === 'pt' ? 'Pronto para o Desafio BLINK de 50 Perguntas?' : 'Ready for the 50-Question BLINK Trivia?';
            bingeDesc = lang === 'ko' ? '휘파람, 뚜두뚜두부터 코첼라 헤드라이너까지, 당신의 블링크 지식을 테스트하세요!' : lang === 'es' ? '¡Desde Whistle hasta Coachella! ¡Pon a prueba cuánto sabes de BLACKPINK!' : lang === 'pt' ? 'De Whistle ao Coachella, teste seus conhecimentos sobre o BLACKPINK!' : 'From Whistle to headlining Coachella, put your BLINK knowledge to the test!';
            bingeBtn = lang === 'ko' ? '50문제 퀴즈 풀러 가기' : lang === 'es' ? 'Jugar Quiz de 50 Preguntas' : lang === 'pt' ? 'Jogar Quiz de 50 Perguntas' : 'Play 50-Question Trivia';
          } else if (quiz.category === 'Food' || quiz.tag === 'K-Food') {
            bingeHref = '/quiz/korean-spicy-food';
            bingeTitle = lang === 'ko' ? '한국 매운 음식 & 길거리 음식 챌린지도 도전해볼까요?' : lang === 'es' ? '¿Listo para el Reto de Comida Picante Coreana?' : lang === 'pt' ? 'Pronto para o Desafio de Comida Picante Coreana?' : 'Ready for the Spicy Food & Street Food Challenge?';
            bingeDesc = lang === 'ko' ? '불닭볶음면부터 길거리 포장마차 꿀조합까지, 당신의 진정한 K-푸드 레벨을 테스트해보세요!' : lang === 'es' ? '¡Desde Buldak ramen hasta comida callejera! ¡Demuestra tu nivel foodie coreano!' : lang === 'pt' ? 'Do Buldak ramen à comida de rua, teste seu verdadeiro nível foodie coreano!' : 'From Buldak challenges to street food lore, test your true Korean foodie IQ!';
            bingeBtn = lang === 'ko' ? '푸드 챌린지 풀러 가기' : lang === 'es' ? 'Jugar Reto Foodie' : lang === 'pt' ? 'Jogar Desafio Foodie' : 'Play Food Challenge';
          }

          return (
            <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-purple-500/20">
              <div>
                <span className="px-3 py-1 rounded-full bg-rose-500/30 text-rose-300 text-xs font-black uppercase tracking-wider mb-2 inline-block border border-rose-500/40">
                  ⚡ {t.resultView.nextChallengeBadge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-1">
                  {bingeTitle}
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80 max-w-md font-medium">
                  {bingeDesc}
                </p>
              </div>
              <Link
                href={bingeHref}
                className="w-full sm:w-auto px-6 py-3.5 bg-rose-500 hover:bg-rose-400 active:scale-95 text-white font-black text-sm rounded-full shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 shrink-0 transition-all"
              >
                <span>{bingeBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })()}

        {/* Related Quizzes */}
        <div>
          <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
            <span>✨</span>
            <span>{t.resultView.keepPlaying}</span>
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
            {lang === 'en'
              ? `Question ${currentIndex + 1} of ${questions.length}`
              : lang === 'es'
              ? `Pregunta ${currentIndex + 1} de ${questions.length}`
              : lang === 'pt'
              ? `Pergunta ${currentIndex + 1} de ${questions.length}`
              : `질문 ${currentIndex + 1} / ${questions.length}`}
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
          {getLocalizedText(currentQ, 'question', lang)}
        </h2>

        {/* 4 Options */}
        <div data-record-options className="space-y-3">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const text = getLocalizedText(opt, 'text', lang);

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
