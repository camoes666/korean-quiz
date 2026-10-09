'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Quiz, Question, ScoreTier, QuestionLevel, getLocalizedText } from '@/types/quiz';
import AdPlaceholder from './AdPlaceholder';
import AffiliateBox from './AffiliateBox';
import QuizCard from './QuizCard';
import ShareButtons from './ShareButtons';
import ChallengeBanner from './ChallengeBanner';
import ChallengeResult from './ChallengeResult';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';
import { decodeChallenge, resolveChallengeQuestions } from '@/lib/challenge';
import { calcQuestionPoints, calcTotalPoints, QUESTION_TIME_SEC, MAX_TOTAL_POINTS } from '@/lib/scoring';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Lightbulb,
  ChevronRight,
  Tag,
  Zap,
  SlidersHorizontal,
  Flame,
  Clock,
  Shuffle,
  Home,
  BookOpen,
  Swords,
} from 'lucide-react';
import { getQuizThemeGroup } from '@/lib/theme';
import { getQuizMascot } from '@/lib/mascot';

interface QuizRunnerProps {
  quiz: Quiz;
  relatedQuizzes: Quiz[];
}

function shuffleArray<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function QuizRunner({ quiz, relatedQuizzes }: QuizRunnerProps) {
  const { lang, t } = useLanguage();
  const { addXP, completeDailyQuest, xp, currentLevel, progressPercent, xpToNextLevel } = useGame();
  const themeGroup = getQuizThemeGroup(quiz.slug, quiz.tag);
  const mascot = getQuizMascot(quiz.slug, quiz.tag);

  const searchParams = useSearchParams();
  const challengeParam = searchParams.get('c');

  const [selectedLevel, setSelectedLevel] = useState<QuestionLevel | 'all'>('all');
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(quiz.questions);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedXPInSession, setEarnedXPInSession] = useState(0);

  // Speed scoring state & refs
  const [questionScores, setQuestionScores] = useState<number[]>([]);
  const [lastEarnedPoints, setLastEarnedPoints] = useState<number>(0);
  const questionStartTimeRef = useRef<number>(0);
  const usedAssistOnCurrentRef = useRef<boolean>(false);
  const timeExtensionSecOnCurrentRef = useRef<number>(0);

  // Challenge Mode State derived declaratively
  const [challengeExited, setChallengeExited] = useState(false);
  const [dismissedError, setDismissedError] = useState(false);
  const decodedChallenge = useMemo(() => {
    if (!challengeParam) return null;
    return decodeChallenge(quiz.slug, challengeParam);
  }, [quiz.slug, challengeParam]);

  const resolvedChallengeQuestions = useMemo(() => {
    if (!decodedChallenge) return null;
    return resolveChallengeQuestions(quiz, decodedChallenge.questionIds);
  }, [quiz, decodedChallenge]);

  const isChallengeMode = Boolean(!challengeExited && decodedChallenge && resolvedChallengeQuestions);
  const challengeData = isChallengeMode ? decodedChallenge : null;
  const challengeQuestions = isChallengeMode ? resolvedChallengeQuestions : null;
  const challengeError = Boolean(!dismissedError && !challengeExited && challengeParam && (!decodedChallenge || !resolvedChallengeQuestions));

  const [userNickname, setUserNickname] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('kpulse_nickname') || '';
    }
    return '';
  });

  // Dynamic Timer (15s per question)
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Power-Up Items 3종 State
  const [fiftyFiftyRemaining, setFiftyFiftyRemaining] = useState(1);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [timeExtensionsRemaining, setTimeExtensionsRemaining] = useState(2);
  const [isHintActive, setIsHintActive] = useState(false);

  const currentQuestion: Question | undefined = activeQuestions[currentIndex];
  const totalQuestions = activeQuestions.length;

  const quizTitle = getLocalizedText(quiz, 'title', lang);
  const quizSubtitle = getLocalizedText(quiz, 'subtitle', lang);
  const quizDescription = getLocalizedText(quiz, 'description', lang);
  const categoryLabel = t.categories[quiz.category] || quiz.category;
  const tagLabel = quiz.tag ? t.tags[quiz.tag] || quiz.tag : null;

  // 15s Timer countdown
  useEffect(() => {
    if (gameState !== 'playing' || isAnswerSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, isAnswerSubmitted, currentIndex]);

  const startQuiz = (levelChoice: QuestionLevel | 'all' = selectedLevel) => {
    let sessionQuestions: Question[];
    if (isChallengeMode && challengeQuestions && challengeQuestions.length === 5) {
      sessionQuestions = challengeQuestions;
    } else {
      let pool = quiz.questions;
      if (levelChoice !== 'all') {
        const filtered = quiz.questions.filter((q) => q.level === levelChoice);
        if (filtered.length > 0) {
          pool = filtered;
        }
      }
      const shuffled = shuffleArray(pool);
      // Pick 5 questions for a focused replayable session
      sessionQuestions = shuffled.length > 5 ? shuffled.slice(0, 5) : shuffled;
    }

    setActiveQuestions(sessionQuestions);
    setGameState('playing');
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuestionScores([]);
    setLastEarnedPoints(0);
    setEarnedXPInSession(0);
    setTimeLeft(15);
    setFiftyFiftyRemaining(1);
    setEliminatedOptions([]);
    setTimeExtensionsRemaining(2);
    setIsHintActive(false);
    setQuizStartTime(Date.now());
    questionStartTimeRef.current = Date.now();
    usedAssistOnCurrentRef.current = false;
    timeExtensionSecOnCurrentRef.current = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || !currentQuestion || isAnswerSubmitted) return;

    const isCorrect = selectedOptionId === currentQuestion.correctAnswer;
    const elapsedMs = Date.now() - questionStartTimeRef.current;
    const totalAllowedSec = QUESTION_TIME_SEC + timeExtensionSecOnCurrentRef.current;
    const remainingSec = Math.max(0, Math.round((totalAllowedSec - elapsedMs / 1000) * 10) / 10);

    const pts = calcQuestionPoints({
      correct: isCorrect,
      remainingSec,
      usedAssist: usedAssistOnCurrentRef.current,
    });

    setQuestionScores((prev) => [...prev, pts]);
    setLastEarnedPoints(pts);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      // Award 20 XP on correct answer!
      addXP(20);
      setEarnedXPInSession((prev) => prev + 20);
    }

    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
      setTimeLeft(15);
      setEliminatedOptions([]);
      setIsHintActive(false);
      questionStartTimeRef.current = Date.now();
      usedAssistOnCurrentRef.current = false;
      timeExtensionSecOnCurrentRef.current = 0;
      setLastEarnedPoints(0);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      // Quiz Finished! Award completion bonus 30 XP and check daily quest
      const totalElapsed = Math.max(15, Math.floor((Date.now() - quizStartTime) / 1000));
      setElapsedSeconds(totalElapsed);
      addXP(30);
      setEarnedXPInSession((prev) => prev + 30);
      completeDailyQuest();
      setGameState('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRetakeNormal = () => {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', window.location.pathname);
    }
    setChallengeExited(true);
    startQuiz(selectedLevel);
  };

  // Power-Up 1: 50:50 Chance
  const handleUseFiftyFifty = () => {
    if (!currentQuestion || fiftyFiftyRemaining <= 0 || isAnswerSubmitted || eliminatedOptions.length > 0) return;
    usedAssistOnCurrentRef.current = true;
    const wrongOptions = currentQuestion.options.filter((opt) => opt.id !== currentQuestion.correctAnswer);
    const shuffledWrong = shuffleArray(wrongOptions);
    const toEliminate = shuffledWrong.slice(0, 2).map((o) => o.id);
    setEliminatedOptions(toEliminate);
    setFiftyFiftyRemaining((prev) => prev - 1);
  };

  // Power-Up 2: +10s Time Extension
  const handleUseTimeExtension = () => {
    if (timeExtensionsRemaining <= 0 || isAnswerSubmitted) return;
    timeExtensionSecOnCurrentRef.current += 10;
    setTimeLeft((prev) => prev + 10);
    setTimeExtensionsRemaining((prev) => prev - 1);
  };

  // Power-Up 3: Fandom Chance (Hint)
  const handleUseHint = () => {
    if (isHintActive || isAnswerSubmitted) return;
    usedAssistOnCurrentRef.current = true;
    setIsHintActive(true);
  };

  // Determine score tier
  const getScoreTier = (): ScoreTier => {
    const ratio = totalQuestions > 0 ? score / totalQuestions : 0;
    const matched = quiz.scoreTiers.find((tier) => {
      const maxPossible = quiz.questions.length || 5;
      const minRatio = tier.minScore / maxPossible;
      const maxRatio = tier.maxScore / maxPossible;
      return ratio >= minRatio - 0.05 && ratio <= maxRatio + 0.05;
    });
    return (
      matched ||
      quiz.scoreTiers.find(
        (tier) => score >= tier.minScore && score <= tier.maxScore
      ) ||
      quiz.scoreTiers[quiz.scoreTiers.length - 1] || {
        minScore: 0,
        maxScore: totalQuestions,
        title: 'Participant',
        badge: '🎖️ Player',
        description: 'Thank you for playing!',
        funQuote: 'Keep learning!',
      }
    );
  };

  const rawTier = getScoreTier();
  const currentTier = {
    title: getLocalizedText(rawTier, 'title', lang),
    badge: getLocalizedText(rawTier, 'badge', lang),
    description: getLocalizedText(rawTier, 'description', lang),
    funQuote: getLocalizedText(rawTier, 'funQuote', lang),
  };

  // Celebratory confetti on results
  useEffect(() => {
    if (gameState === 'result') {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#ec4899', '#f59e0b', '#00e08f', '#10b981'],
        });
      } catch {
        // Fallback
      }
    }
  }, [gameState]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      if (e.key === 'Enter') {
        if (!isAnswerSubmitted && selectedOptionId) {
          handleSubmitAnswer();
        } else if (isAnswerSubmitted) {
          handleNextQuestion();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isAnswerSubmitted, selectedOptionId, currentIndex]);

  // 1. INTRO VIEW
  if (gameState === 'intro') {
    return (
      <div data-group={themeGroup} className="max-w-3xl mx-auto px-4 py-8 sm:py-12 transition-colors duration-300">
        {challengeError && (
          <ChallengeBanner
            mode="error"
            onDismissError={() => setDismissedError(true)}
          />
        )}

        {isChallengeMode && challengeData && (
          <ChallengeBanner
            mode="intro"
            challengerName={challengeData.nickname}
            challengerScore={challengeData.totalScore}
            onStart={() => startQuiz()}
          />
        )}

        <div className="qz-card overflow-hidden rounded-3xl border-2 border-purple-100 bg-white shadow-xl shadow-purple-500/5">
          {/* Header Banner */}
          <div
            className={`relative bg-gradient-to-r ${quiz.gradient} p-8 sm:p-12 text-white text-center overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
                <span className="px-3.5 py-1 rounded-full bg-white/95 text-purple-900 text-xs sm:text-sm font-black tracking-wider uppercase shadow-xs">
                  {categoryLabel} {t.quizIntro.challenge}
                </span>
                {tagLabel && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-xs font-bold">
                    <Tag className="w-3 h-3" />
                    {tagLabel}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-400 text-emerald-950 text-xs font-black shadow-xs">
                  <Zap className="w-3 h-3 fill-current" />
                  +100 MAX XP
                </span>
              </div>

              <div className="flex items-center justify-center gap-3.5 mb-3">
                <div className="relative group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/25 backdrop-blur-md p-1 border-2 border-white/60 shadow-lg shadow-black/10 flex items-center justify-center overflow-hidden">
                    <img
                      src={mascot.avatarUrl}
                      alt={mascot.name}
                      className="w-full h-full object-contain filter drop-shadow hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-black text-white whitespace-nowrap border border-white/30 shadow-xs">
                    {mascot.badgeTitle}
                  </span>
                </div>
                <div className="text-5xl sm:text-6xl animate-bounce">
                  {quiz.coverEmoji}
                </div>
              </div>
              <div className="inline-block px-3.5 py-1 rounded-full bg-black/30 backdrop-blur-md text-xs font-bold text-white/95 mb-3 shadow-xs">
                {lang === 'en' ? mascot.greetingEn : lang === 'es' ? mascot.greetingEs : mascot.greetingKo}
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight max-w-2xl mx-auto">
                {quizTitle}
              </h1>
              <p className="mt-3 text-white/95 text-sm sm:text-base max-w-xl mx-auto font-medium">
                {quizSubtitle}
              </p>
            </div>
          </div>

          {/* Details & Start Action */}
          <div className="p-6 sm:p-10">
            <p className="qz-card-muted text-slate-600 text-sm sm:text-base leading-relaxed text-center max-w-xl mx-auto mb-8 font-medium">
              {quizDescription}
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8 text-center">
              <div className="qz-stat-box p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-100">
                <div className="qz-stat-label text-xs text-slate-400 font-bold">{t.quizIntro.questions}</div>
                <div className="qz-stat-val text-xl font-black text-slate-900">
                  5 <span className="text-[11px] font-bold text-slate-400">/ {quiz.questions.length}</span>
                </div>
              </div>
              <div className="qz-stat-box p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-100">
                <div className="qz-stat-label text-xs text-slate-400 font-bold">{t.quizIntro.estTime}</div>
                <div className="qz-stat-val text-xl font-black text-slate-900">
                  ~{quiz.estimatedMinutes} {t.mins}
                </div>
              </div>
              <div className="qz-stat-box p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-100">
                <div className="qz-stat-label text-xs text-slate-400 font-bold">{t.quizIntro.difficulty}</div>
                <div className="qz-stat-val text-xl font-black text-slate-900">
                  {quiz.difficulty}
                </div>
              </div>
            </div>

            {/* Question Bank & Difficulty Selector (Hidden in Challenge Mode) */}
            {isChallengeMode ? (
              <div className="mb-8 rounded-3xl bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 p-6 border-2 border-purple-200 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-black mb-2">
                  <Swords className="w-3.5 h-3.5 text-pink-600" />
                  <span>1:1 CHALLENGE MATCH</span>
                </div>
                <h4 className="text-sm font-black text-slate-800 mb-1">
                  ⚔️ {challengeData?.nickname || t.challenge.defaultFriend}님과의 비동기 대결
                </h4>
                <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
                  도전자와 동일한 5문제, 동일한 출제 순서로 진행됩니다. 빠른 번개손으로 최고 점수에 도전하세요!
                </p>
              </div>
            ) : (
              <div className="mb-8 rounded-3xl bg-slate-50 p-5 border-2 border-purple-100">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                      {t.levels.selectTitle}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    {quiz.questions.length} Questions in Bank
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* All Levels */}
                  <button
                    type="button"
                    onClick={() => setSelectedLevel('all')}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      selectedLevel === 'all'
                        ? 'border-purple-600 bg-purple-50 shadow-xs ring-2 ring-purple-400/20 translate-y-[-2px]'
                        : 'border-slate-200 bg-white hover:border-purple-200'
                    }`}
                  >
                    <div className="text-base mb-1">🎲</div>
                    <div className="text-xs font-black text-slate-900 line-clamp-1">{t.levels.allLevels}</div>
                    <div className="text-[10px] text-slate-400 font-bold mt-0.5">{quiz.questions.length} Qs</div>
                  </button>

                  {/* Lv 1 */}
                  <button
                    type="button"
                    onClick={() => setSelectedLevel(1)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      selectedLevel === 1
                        ? 'border-emerald-500 bg-emerald-50 shadow-xs ring-2 ring-emerald-400/20 translate-y-[-2px]'
                        : 'border-slate-200 bg-white hover:border-purple-200'
                    }`}
                  >
                    <div className="text-base mb-1">🌱</div>
                    <div className="text-xs font-black text-slate-900 line-clamp-1">{t.levels.lvl1}</div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                      {quiz.questions.filter((q) => q.level === 1).length} Qs
                    </div>
                  </button>

                  {/* Lv 2 */}
                  <button
                    type="button"
                    onClick={() => setSelectedLevel(2)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      selectedLevel === 2
                        ? 'border-amber-500 bg-amber-50 shadow-xs ring-2 ring-amber-400/20 translate-y-[-2px]'
                        : 'border-slate-200 bg-white hover:border-purple-200'
                    }`}
                  >
                    <div className="text-base mb-1">⭐</div>
                    <div className="text-xs font-black text-slate-900 line-clamp-1">{t.levels.lvl2}</div>
                    <div className="text-[10px] text-amber-600 font-bold mt-0.5">
                      {quiz.questions.filter((q) => q.level === 2).length} Qs
                    </div>
                  </button>

                  {/* Lv 3 */}
                  <button
                    type="button"
                    onClick={() => setSelectedLevel(3)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      selectedLevel === 3
                        ? 'border-rose-500 bg-rose-50 shadow-xs ring-2 ring-rose-400/20 translate-y-[-2px]'
                        : 'border-slate-200 bg-white hover:border-purple-200'
                    }`}
                  >
                    <div className="text-base mb-1">🔥</div>
                    <div className="text-xs font-black text-slate-900 line-clamp-1">{t.levels.lvl3}</div>
                    <div className="text-[10px] text-rose-600 font-bold mt-0.5">
                      {quiz.questions.filter((q) => q.level === 3).length} Qs
                    </div>
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => startQuiz(selectedLevel)}
              className="qz-btn-primary flex items-center justify-center gap-2 w-full max-w-md mx-auto rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-4 px-8 text-base font-black shadow-lg shadow-purple-500/25 transition-all active:scale-95 cursor-pointer"
            >
              <span>
                {isChallengeMode
                  ? t.challenge.startBattle
                  : `${t.quizIntro.startNow} (5 Qs)`}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Study Guide Link */}
            <div className="mt-4 text-center">
              <Link
                href={`/guide/${quiz.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-black text-purple-600 hover:text-purple-700 hover:underline transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>
                  {lang === 'ko'
                    ? `📖 시험 전 족보! ${quizTitle} 해설 & 로어 가이드 미리보기`
                    : lang === 'es'
                    ? `📖 ¿Quieres estudiar primero? Ver guía y datos de ${quizTitle}`
                    : `📖 Want to study first? Read the ${quizTitle} Lore Guide`}
                </span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Start Page Ad Placement */}
        <AdPlaceholder format="horizontal" label={t.ads.sponsored} className="mt-8" />
      </div>
    );
  }

  // 2. PLAYING VIEW
  if (gameState === 'playing' && currentQuestion) {
    const progressPercentQuestion = ((currentIndex + 1) / totalQuestions) * 100;
    const isCorrect = selectedOptionId === currentQuestion.correctAnswer;

    const questionText = getLocalizedText(currentQuestion, 'question', lang);
    const explanationText = getLocalizedText(currentQuestion, 'explanation', lang);
    const funFactText = getLocalizedText(currentQuestion, 'funFact', lang);

    return (
      <div data-group={themeGroup} className="max-w-3xl mx-auto px-4 py-6 sm:py-10 transition-colors duration-300">
        {/* Challenge In-Game Score Comparison Banner */}
        {isChallengeMode && challengeData && (
          <ChallengeBanner
            mode="in-game"
            challengerName={challengeData.nickname}
            userCumulativeScore={questionScores.reduce((a, b) => a + b, 0)}
            challengerCumulativeScore={challengeData.scores
              .slice(0, currentIndex + (isAnswerSubmitted ? 1 : 0))
              .reduce((a, b) => a + b, 0)}
            currentQuestionIndex={currentIndex}
          />
        )}

        {/* Top HUD (Q.07/15 Progress + 12s Dynamic Timer Chip) */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-black text-slate-600 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white border border-purple-100 rounded-full font-black text-slate-700 shadow-xs">
                Q. {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1} / {totalQuestions < 10 ? `0${totalQuestions}` : totalQuestions}
              </span>
              {currentQuestion.level && (
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border ${
                    currentQuestion.level === 1
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : currentQuestion.level === 2
                      ? 'bg-amber-50 text-amber-700 border-amber-300'
                      : 'bg-rose-50 text-rose-700 border-rose-300'
                  }`}
                >
                  {currentQuestion.level === 1
                    ? t.levels.lvl1
                    : currentQuestion.level === 2
                    ? t.levels.lvl2
                    : t.levels.lvl3}
                </span>
              )}
            </div>

            {/* Dynamic Timer & XP Chip */}
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-black text-xs shadow-xs transition-colors ${
                  timeLeft <= 5
                    ? 'bg-rose-50 border-2 border-rose-400 text-rose-600 animate-pulse'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                <Clock className={`w-3.5 h-3.5 ${timeLeft <= 5 ? 'text-rose-500' : 'text-slate-500'}`} />
                <span>⏱️ {timeLeft}s</span>
              </div>
              <span className="hidden sm:flex items-center gap-1 text-emerald-600 font-black px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-200 text-xs">
                <Zap className="w-3.5 h-3.5 fill-current" />
                +{earnedXPInSession} XP
              </span>
            </div>
          </div>

          {/* Neon Smooth Progress Bar */}
          <div className="qz-progress-track h-2.5 w-full rounded-full bg-slate-100 p-0.5 border border-purple-100 overflow-hidden">
            <div
              className="qz-progress-bar h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-400 transition-all duration-300 ease-out shadow-xs"
              style={{ width: `${progressPercentQuestion}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="qz-card rounded-3xl border-2 border-purple-100 bg-white p-6 sm:p-8 shadow-lg shadow-purple-500/5">
          <h2 className="qz-card-title text-lg sm:text-2xl font-black text-slate-900 leading-snug mb-6">
            {questionText}
          </h2>

          {/* 4지선다 선택지 컨테이너 (Snippet 2) */}
          <div className="space-y-3 my-6">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isOptionCorrect = option.id === currentQuestion.correctAnswer;
              const optionText = getLocalizedText(option, 'text', lang);
              const isEliminated = eliminatedOptions.includes(option.id);

              if (isEliminated) {
                return (
                  <div
                    key={option.id}
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 opacity-30 line-through flex items-center justify-between pointer-events-none select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-slate-200 text-slate-400 font-black text-sm flex items-center justify-center">
                        {option.id}
                      </span>
                      <span className="font-bold text-slate-400 text-[15px]">{optionText}</span>
                    </div>
                  </div>
                );
              }

              if (isAnswerSubmitted) {
                if (isOptionCorrect) {
                  return (
                    <button
                      key={option.id}
                      disabled
                      className="qz-option-correct w-full p-4 rounded-2xl bg-emerald-50/90 border-2 border-emerald-500 text-left flex flex-col gap-1.5 transition-all shadow-md shadow-emerald-500/10 ring-2 ring-emerald-400/30"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                          <span className="font-black text-emerald-950 text-[15px]">{optionText}</span>
                        </div>
                        <span className="px-2.5 py-1 bg-white text-emerald-600 border border-emerald-300 text-xs font-black rounded-full flex items-center gap-1 shadow-xs">
                          {lang === 'ko' ? '✓ 정답! (+20 XP)' : lang === 'es' ? '✓ ¡Correcto! (+20 XP)' : '✓ Correct! (+20 XP)'}
                        </span>
                      </div>
                    </button>
                  );
                } else if (isSelected) {
                  return (
                    <button
                      key={option.id}
                      disabled
                      className="qz-option-wrong w-full p-4 rounded-2xl bg-rose-50/90 border-2 border-rose-500 text-left flex items-center justify-between transition-all shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-rose-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                          <XCircle className="w-4 h-4" />
                        </span>
                        <span className="font-black text-rose-950 text-[15px]">{optionText}</span>
                      </div>
                      <span className="px-2.5 py-1 bg-rose-100 text-rose-700 text-xs font-black rounded-full">
                        {lang === 'ko' ? '✕ 오답' : lang === 'es' ? '✕ Incorrecto' : '✕ Incorrect'}
                      </span>
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={option.id}
                      disabled
                      className="w-full p-4 rounded-2xl bg-white border-2 border-slate-100 text-left flex items-center justify-between opacity-35"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-400 font-black text-sm flex items-center justify-center">
                          {option.id}
                        </span>
                        <span className="font-bold text-slate-400 text-[15px]">{optionText}</span>
                      </div>
                    </button>
                  );
                }
              }

              // Selected (Before submit) - Snippet 2
              if (isSelected) {
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className="qz-option-selected w-full p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-500 text-left flex flex-col gap-1.5 transition-all shadow-md shadow-emerald-500/10 ring-2 ring-emerald-400/30"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <span className="qz-opt-num w-8 h-8 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                          {option.id}
                        </span>
                        <span className="qz-opt-text font-black text-slate-900 text-[15px]">{optionText}</span>
                      </div>
                      <span className="px-2.5 py-1 bg-white text-emerald-600 border border-emerald-300 text-xs font-black rounded-full flex items-center gap-1 shadow-xs">
                        {lang === 'ko' ? '✓ 선택됨' : lang === 'es' ? '✓ Seleccionado' : '✓ Selected'}
                      </span>
                    </div>
                    <div className="ml-11 text-xs font-bold text-emerald-700 flex items-center gap-1">
                      {lang === 'ko'
                        ? '✨ 정답 확신 92%의 팬덤 추천!'
                        : lang === 'es'
                        ? '✨ ¡92% de certeza según el fandom!'
                        : '✨ 92% confidence fandom pick!'}
                    </div>
                  </button>
                );
              }

              // Default unselected - Snippet 2
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className="qz-option-default w-full p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-purple-300 hover:bg-purple-50/30 text-left flex items-center justify-between transition-all active:scale-[0.99] group shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="qz-opt-num w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-purple-100 text-slate-600 group-hover:text-purple-700 font-black text-sm flex items-center justify-center transition-colors">
                      {option.id}
                    </span>
                    <span className="qz-opt-text font-bold text-slate-800 text-[15px]">{optionText}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 파워업 아이템 찬스 3종 (Snippet 2) */}
          <div className="grid grid-cols-3 gap-2.5 pt-2 mb-6">
            <button
              type="button"
              onClick={handleUseFiftyFifty}
              disabled={isAnswerSubmitted || fiftyFiftyRemaining <= 0 || eliminatedOptions.length > 0}
              className="p-3 bg-white border border-slate-200 hover:border-purple-300 rounded-xl flex flex-col items-center gap-1 text-center shadow-xs active:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <span className="text-lg">💡</span>
              <span className="text-xs font-bold text-slate-700">
                {lang === 'ko' ? '50:50 찬스' : lang === 'es' ? 'Comodín 50:50' : '50:50 Chance'}
              </span>
              <span className="text-[10px] text-purple-600 font-extrabold">
                {lang === 'ko'
                  ? `${fiftyFiftyRemaining}회 남음`
                  : lang === 'es'
                  ? `${fiftyFiftyRemaining} restante${fiftyFiftyRemaining === 1 ? '' : 's'}`
                  : `${fiftyFiftyRemaining} left`}
              </span>
            </button>
            <button
              type="button"
              onClick={handleUseTimeExtension}
              disabled={isAnswerSubmitted || timeExtensionsRemaining <= 0}
              className="p-3 bg-white border border-slate-200 hover:border-purple-300 rounded-xl flex flex-col items-center gap-1 text-center shadow-xs active:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <span className="text-lg">⏱️</span>
              <span className="text-xs font-bold text-slate-700">
                {lang === 'ko' ? '+10초 연장' : lang === 'es' ? '+10s Tiempo' : '+10s Timer'}
              </span>
              <span className="text-[10px] text-rose-500 font-extrabold">
                {lang === 'ko'
                  ? `${timeExtensionsRemaining}회 남음`
                  : lang === 'es'
                  ? `${timeExtensionsRemaining} restante${timeExtensionsRemaining === 1 ? '' : 's'}`
                  : `${timeExtensionsRemaining} left`}
              </span>
            </button>
            <button
              type="button"
              onClick={handleUseHint}
              disabled={isAnswerSubmitted || isHintActive}
              className="p-3 bg-white border border-slate-200 hover:border-purple-300 rounded-xl flex flex-col items-center gap-1 text-center shadow-xs active:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <span className="text-lg">🔮</span>
              <span className="text-xs font-bold text-slate-700">
                {lang === 'ko' ? '팬덤 찬스' : lang === 'es' ? 'Ayuda Fandom' : 'Fandom Hint'}
              </span>
              <span className="text-[10px] text-emerald-600 font-extrabold">
                {isHintActive
                  ? lang === 'ko'
                    ? '힌트 공개'
                    : lang === 'es'
                    ? 'Pista Activa'
                    : 'Hint Active'
                  : lang === 'ko'
                  ? '무료 힌트'
                  : lang === 'es'
                  ? 'Pista Gratis'
                  : 'Free Hint'}
              </span>
            </button>
          </div>

          {/* Action Button Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <span className="text-xs text-slate-400 font-medium order-2 sm:order-1">
              {!isAnswerSubmitted
                ? selectedOptionId
                  ? t.quizRunner.readyPrompt
                  : t.quizRunner.selectPrompt
                : t.quizRunner.continuePrompt}
            </span>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId}
                className="qz-btn-primary w-full sm:w-auto order-1 sm:order-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3.5 px-8 text-sm font-black transition-all shadow-md shadow-purple-500/25 active:scale-95"
              >
                <span>{t.quizRunner.checkAnswer}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="qz-btn-primary w-full sm:w-auto order-1 sm:order-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-3.5 px-8 text-sm font-black transition-all shadow-lg shadow-purple-500/25 active:scale-95 animate-pulse"
              >
                <span>
                  {currentIndex + 1 < totalQuestions
                    ? t.quizRunner.continue
                    : t.quizRunner.viewMyScore}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Explanation & Trivia Card (or Hint reveal) */}
          {(isAnswerSubmitted || isHintActive) && (
            <div className="mt-6 rounded-2xl border-2 border-purple-100 bg-purple-50/50 p-5 animate-fadeIn">
              {isAnswerSubmitted ? (
                <>
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <span className="flex items-center gap-1.5 text-xs font-black text-emerald-600">
                          <img src="/images/hobi02.webp" alt="Correct" className="w-5 h-5 object-contain" />
                          <CheckCircle2 className="w-4 h-4" /> {t.quizRunner.correct} (+20 XP!)
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-black text-rose-600">
                          <img src="/images/hobi03.webp" alt="Cheer" className="w-5 h-5 object-contain" />
                          <XCircle className="w-4 h-4" /> {t.quizRunner.incorrect}{' '}
                          {lang === 'ko'
                            ? '(호비가 응원해요!)'
                            : lang === 'es'
                            ? '(¡Hobi te anima!)'
                            : '(Hobi is cheering for you!)'}
                        </span>
                      )}
                    </div>

                    {/* Speed Points Badge */}
                    <div className="flex items-center gap-1">
                      {lastEarnedPoints > 0 ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs border border-emerald-300 shadow-2xs animate-bounce">
                          +{lastEarnedPoints} {t.quizRunner.pts}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 font-black text-xs border border-slate-200">
                          +0 {t.quizRunner.pts}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3 font-medium">
                    {explanationText}
                  </p>
                </>
              ) : (
                <div className="mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-purple-700">
                    {lang === 'ko'
                      ? '🔮 팬덤 찬스 힌트가 도착했습니다!'
                      : lang === 'es'
                      ? '🔮 ¡Ha llegado la pista del fandom!'
                      : '🔮 Fandom hint has arrived!'}
                  </span>
                </div>
              )}

              {funFactText && (
                <div className="flex items-start gap-2.5 rounded-xl bg-white p-3 text-xs text-purple-900 border border-purple-100 shadow-xs">
                  <Lightbulb className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                  <div>
                    <strong className="font-black">{t.quizRunner.funLore}</strong> {funFactText}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mid-Quiz Ad Placement */}
        {currentIndex >= 3 && (
          <AdPlaceholder format="in-feed" label={t.ads.sponsored} className="mt-6" />
        )}
      </div>
    );
  }

  // 3. RESULT VIEW (Snippet 3)
  const totalPoints = calcTotalPoints(questionScores);
  const minutesSpent = Math.floor(elapsedSeconds / 60);
  const secondsSpent = elapsedSeconds % 60;
  const timeFormatted = `${minutesSpent > 0 ? (lang === 'ko' ? `${minutesSpent}분 ` : `${minutesSpent}m `) : ''}${secondsSpent}${lang === 'ko' ? '초' : 's'}`;
  const isPerfect = score === totalQuestions;
  const rankLabel = isPerfect ? 'RANK S+ 💜' : score >= 4 ? 'RANK S 🏆' : score >= 3 ? 'RANK A ⭐' : 'RANK B 🌱';
  const tierTitle = getLocalizedText(currentTier, 'title', lang);
  const tierBadge = getLocalizedText(currentTier, 'badge', lang);

  return (
    <div data-group={themeGroup} className="max-w-xl mx-auto px-4 py-8 sm:py-12 transition-colors duration-300">
      {/* 결과 축하 스코어보드 & 보상 결산 (Snippet 3) */}
      <div className="qz-card bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-100 shadow-xl shadow-purple-500/10 text-center relative overflow-hidden my-4">
        {/* 상단 퍼펙트 뱃지 */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white rounded-full text-xs font-black shadow-md shadow-pink-500/20 mb-3">
          {isPerfect
            ? lang === 'ko'
              ? '🎉 ALL CLEAR! 퍼펙트 클리어 ✨'
              : lang === 'es'
              ? '🎉 ¡DESAFÍO PERFECTO! ✨'
              : '🎉 ALL CLEAR! PERFECT SCORE! ✨'
            : lang === 'ko'
            ? '🏆 CHALLENGE COMPLETED! 🏆'
            : lang === 'es'
            ? '🏆 ¡DESAFÍO COMPLETADO! 🏆'
            : '🏆 CHALLENGE COMPLETED! 🏆'}
        </div>

        {/* Dynamic Mascot Celebration / Encouragement */}
        <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto my-2 relative">
          <div className="relative w-full h-full animate-bounce" style={{ animationDuration: '2.5s' }}>
            <img
              src={mascot.avatarUrl}
              alt={mascot.name}
              className="w-full h-full object-contain filter drop-shadow-lg"
            />
            <div
              className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-white font-black text-xs whitespace-nowrap shadow-md border border-white ${
                score >= 4
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 shadow-purple-500/25'
                  : 'bg-rose-500 shadow-rose-500/25'
              }`}
            >
              {score >= 4
                ? lang === 'ko'
                  ? mascot.winCheerKo
                  : lang === 'es'
                  ? mascot.winCheerEs
                  : mascot.winCheerEn
                : lang === 'ko'
                ? mascot.encourageKo
                : lang === 'es'
                ? mascot.encourageEs
                : mascot.encourageEn}
            </div>
          </div>
        </div>

        <div className="qz-card-title text-purple-600 font-black text-2xl tracking-tight mt-4 mb-1">
          {rankLabel}
        </div>
        <div className="qz-card-muted text-slate-500 font-bold text-sm mb-4">
          {tierTitle} ({tierBadge})
        </div>

        {/* 대형 스코어 (총점 & 정답 개수) */}
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="text-5xl sm:text-7xl font-black text-emerald-600 tracking-tighter">
              {totalPoints.toLocaleString()}
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-300">
              / {MAX_TOTAL_POINTS.toLocaleString()} {t.quizRunner.pts}
            </span>
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-500 mt-1">
            {t.resultView.correctCount
              .replace('{total}', String(totalQuestions))
              .replace('{correct}', String(score))
              .replace('{pct}', String(Math.round((score / totalQuestions) * 100)))}
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600 mb-6">
          <span>
            ⏱️ {lang === 'ko' ? `${timeFormatted} 소요` : lang === 'es' ? `Tiempo: ${timeFormatted}` : `Time: ${timeFormatted}`}
          </span>
          <span className="text-rose-500 font-black">
            {lang === 'ko'
              ? '• 전체 상위 1% 번개손'
              : lang === 'es'
              ? '• Top 1% Global'
              : '• Top 1% Global Challenger'}
          </span>
        </div>

        {/* 보상 스탯 그리드 */}
        <div className="grid grid-cols-2 gap-2 text-left mb-5">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">
              {lang === 'ko' ? '기본 경험치' : lang === 'es' ? 'XP Base' : 'Base XP'}
            </span>
            <span className="text-base font-black text-emerald-600">+{earnedXPInSession} XP</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">
              {lang === 'ko' ? '퍼펙트 보너스' : lang === 'es' ? 'Bono Perfecto' : 'Perfect Bonus'}
            </span>
            <span className="text-base font-black text-rose-500">{isPerfect ? '+50 BONUS' : '+0 BONUS'}</span>
          </div>
        </div>

        {/* Level Progress Gauge */}
        <div className="rounded-2xl bg-purple-50/70 border border-purple-100 p-4 mb-5 text-left">
          <div className="flex items-center justify-between text-xs font-black mb-2">
            <span className="text-purple-900 font-black">
              {currentLevel.badgeEmoji} Level {currentLevel.level}: {lang === 'ko' ? currentLevel.titleKo : currentLevel.title}
            </span>
            <span className="text-amber-600 font-bold">{xp} Total XP</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          {xpToNextLevel > 0 && (
            <div className="text-[11px] font-extrabold text-purple-700 bg-white/80 border border-purple-200/60 rounded-lg px-2.5 py-1 text-center flex items-center justify-center gap-1 shadow-2xs">
              <Sparkles className="w-3 h-3 text-pink-500" />
              <span>{t.resultView.levelUpNudge.replace('{xp}', String(xpToNextLevel))}</span>
            </div>
          )}
        </div>

        {/* 1:1 대결 모드 결과 카드 */}
        {isChallengeMode && challengeData && (
          <div className="mb-5">
            <ChallengeResult
              slug={quiz.slug}
              quizTitle={quizTitle}
              challengerName={challengeData.nickname}
              challengerScores={challengeData.scores}
              challengerTotalScore={challengeData.totalScore}
              userScores={questionScores}
              userTotalScore={totalPoints}
              questionIds={activeQuestions.map((q) => q.id)}
              userNickname={userNickname}
              onRetakeNormal={handleRetakeNormal}
            />
          </div>
        )}

        {/* ⚡ High-Impact Primary CTA: Next Recommended Quiz */}
        {relatedQuizzes.length > 0 && (
          <div className="mb-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700 text-white text-left shadow-lg shadow-purple-500/25 relative overflow-hidden group">
            <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black tracking-wide text-amber-200 shadow-xs">
                <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-pulse" />
                {t.resultView.nextChallengeBadge}
              </span>
              <span className="text-[11px] font-extrabold text-white/90 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                {t.resultView.streakKeep}
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-white mb-1 line-clamp-1 group-hover:text-amber-200 transition-colors">
              {getLocalizedText(relatedQuizzes[0], 'title', lang)}
            </h4>
            <p className="text-xs text-white/85 line-clamp-2 mb-3.5">
              {getLocalizedText(relatedQuizzes[0], 'description', lang)}
            </p>
            <Link
              href={`/quiz/${relatedQuizzes[0].slug}`}
              className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-amber-50 text-purple-700 hover:text-purple-900 font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <span>{t.resultView.playNextQuiz}</span>
              <ArrowRight className="w-4 h-4 text-pink-600" />
            </Link>
          </div>
        )}

        {/* 업그레이드된 바이럴 소셜 공유 및 친구 도전장 모듈 */}
        <div className="mb-5">
          <ShareButtons
            quizTitle={quizTitle}
            slug={quiz.slug}
            score={score}
            totalQuestions={totalQuestions}
            totalPoints={totalPoints}
            questionIds={activeQuestions.map((q) => q.id)}
            questionScores={questionScores}
            badgeTitle={tierTitle}
            badgeEmoji={tierBadge}
            userNickname={userNickname}
            onNicknameChange={setUserNickname}
          />
        </div>

        {/* Full Guide & Lore Review Link */}
        <div className="mb-4">
          <Link
            href={`/guide/${quiz.slug}`}
            className="w-full py-3 px-4 rounded-2xl bg-purple-50/80 hover:bg-purple-100/90 border border-purple-200 text-purple-800 text-xs font-black transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
          >
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>
              {lang === 'ko'
                ? `전체 ${totalQuestions}개 문답 해설 & 꿀팁 족보 가이드 보기 📖`
                : lang === 'es'
                ? `Repasar todas las explicaciones y curiosidades en la Guía 📖`
                : `Review All Explanations & Insider Lore in Study Guide 📖`}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-purple-600" />
          </Link>
        </div>

        {/* Action Buttons: 다시 풀기 & 난이도 변경 & 홈으로 */}
        <div className="flex flex-wrap gap-2 justify-center pt-3 border-t border-slate-100">
          <button
            onClick={() => (isChallengeMode ? handleRetakeNormal() : startQuiz(selectedLevel))}
            className="flex-1 min-w-[120px] py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resultView.retake}</span>
          </button>
          <button
            onClick={() => setGameState('intro')}
            className="flex-1 min-w-[120px] py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{t.levels.selectTitle}</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t.resultView.backToHome}</span>
          </Link>
        </div>
      </div>

      {/* Next Quizzes to Multiply Pageviews (Elevated above Ads for immediate retention) */}
      {relatedQuizzes.length > 0 && (
        <div className="my-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>{t.resultView.keepPlaying}</span>
            </h3>
            {relatedQuizzes.length > 1 && (
              <Link
                href={`/quiz/${relatedQuizzes[1].slug}`}
                className="text-xs font-black text-purple-700 hover:text-purple-900 flex items-center gap-1 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3 py-1.5 rounded-full transition-colors shadow-2xs"
              >
                <Shuffle className="w-3 h-3 text-pink-500" />
                <span>{t.resultView.randomQuiz}</span>
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedQuizzes.map((item) => (
              <QuizCard key={item.slug} quiz={item} />
            ))}
          </div>
        </div>
      )}

      {/* AdSense Leaderboard Placement */}
      <AdPlaceholder format="horizontal" label={t.ads.sponsored} className="my-6" />

      {/* Affiliate Suggestion Section */}
      {quiz.affiliateSuggestion && (
        <AffiliateBox affiliate={quiz.affiliateSuggestion} />
      )}
    </div>
  );
}
