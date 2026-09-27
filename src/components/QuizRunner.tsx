'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Quiz, Question, ScoreTier, QuestionLevel, getLocalizedText } from '@/types/quiz';
import AdPlaceholder from './AdPlaceholder';
import AffiliateBox from './AffiliateBox';
import ShareButtons from './ShareButtons';
import QuizCard from './QuizCard';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Trophy,
  ChevronRight,
  Tag,
  Zap,
  SlidersHorizontal,
} from 'lucide-react';

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
  const { addXP, completeDailyQuest, xp, currentLevel, progressPercent } = useGame();

  const [selectedLevel, setSelectedLevel] = useState<QuestionLevel | 'all'>('all');
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(quiz.questions);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: string }>({});
  const [score, setScore] = useState(0);
  const [earnedXPInSession, setEarnedXPInSession] = useState(0);

  const currentQuestion: Question | undefined = activeQuestions[currentIndex];
  const totalQuestions = activeQuestions.length;

  const quizTitle = getLocalizedText(quiz, 'title', lang);
  const quizSubtitle = getLocalizedText(quiz, 'subtitle', lang);
  const quizDescription = getLocalizedText(quiz, 'description', lang);
  const categoryLabel = t.categories[quiz.category] || quiz.category;
  const tagLabel = quiz.tag ? t.tags[quiz.tag] || quiz.tag : null;

  const startQuiz = (levelChoice: QuestionLevel | 'all' = selectedLevel) => {
    let pool = quiz.questions;
    if (levelChoice !== 'all') {
      const filtered = quiz.questions.filter((q) => q.level === levelChoice);
      if (filtered.length > 0) {
        pool = filtered;
      }
    }
    const shuffled = shuffleArray(pool);
    // Question Bank: pick 5 questions for a focused replayable session (or total if less)
    const sessionQuestions = shuffled.length > 5 ? shuffled.slice(0, 5) : shuffled;
    setActiveQuestions(sessionQuestions);
    setGameState('playing');
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setScore(0);
    setEarnedXPInSession(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || !currentQuestion || isAnswerSubmitted) return;

    const isCorrect = selectedOptionId === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      // Award 20 XP on correct answer!
      addXP(20);
      setEarnedXPInSession((prev) => prev + 20);
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedOptionId,
    }));
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      // Quiz Finished! Award completion bonus 30 XP and check daily quest
      addXP(30);
      setEarnedXPInSession((prev) => prev + 30);
      completeDailyQuest();
      setGameState('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Determine which score tier user achieved
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

  // Launch celebratory confetti when viewing results
  useEffect(() => {
    if (gameState === 'result') {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#ec4899', '#f59e0b', '#3b82f6', '#10b981'],
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
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <div className="overflow-hidden rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl">
          {/* Header Banner */}
          <div
            className={`relative bg-gradient-to-r ${quiz.gradient} p-8 sm:p-12 text-white text-center overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/15"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-black tracking-wider uppercase">
                  {categoryLabel} {t.quizIntro.challenge}
                </span>
                {tagLabel && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-xs font-bold">
                    <Tag className="w-3 h-3" />
                    {tagLabel}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-black shadow-sm">
                  <Zap className="w-3 h-3 fill-current" />
                  +100 MAX XP
                </span>
              </div>

              <div className="text-6xl sm:text-7xl mb-4 animate-bounce">
                {quiz.coverEmoji}
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight max-w-2xl mx-auto">
                {quizTitle}
              </h1>
              <p className="mt-3 text-white/90 text-sm sm:text-base max-w-xl mx-auto font-medium">
                {quizSubtitle}
              </p>
            </div>
          </div>

          {/* Details & Start Action */}
          <div className="p-6 sm:p-10">
            <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed text-center max-w-xl mx-auto mb-8 font-medium">
              {quizDescription}
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8 text-center">
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border-2 border-zinc-200/80 dark:border-zinc-700/60">
                <div className="text-xs text-zinc-400 font-bold">{t.quizIntro.questions}</div>
                <div className="text-xl font-black text-zinc-800 dark:text-zinc-100">
                  {totalQuestions}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border-2 border-zinc-200/80 dark:border-zinc-700/60">
                <div className="text-xs text-zinc-400 font-bold">{t.quizIntro.estTime}</div>
                <div className="text-xl font-black text-zinc-800 dark:text-zinc-100">
                  ~{quiz.estimatedMinutes} {t.mins}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border-2 border-zinc-200/80 dark:border-zinc-700/60">
                <div className="text-xs text-zinc-400 font-bold">{t.quizIntro.difficulty}</div>
                <div className="text-xl font-black text-zinc-800 dark:text-zinc-100">
                  {quiz.difficulty}
                </div>
              </div>
            </div>

            {/* Question Bank & Difficulty Selector */}
            <div className="mb-8 rounded-3xl bg-zinc-50 dark:bg-zinc-800/50 p-5 border-2 border-zinc-200/80 dark:border-zinc-700/80">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                    {t.levels.selectTitle}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-950/60 px-2.5 py-0.5 rounded-full">
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
                      ? 'border-violet-600 bg-violet-100/70 dark:bg-violet-950/70 shadow-sm border-b-4 translate-y-[-2px]'
                      : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 border-b-2'
                  }`}
                >
                  <div className="text-base mb-1">🎲</div>
                  <div className="text-xs font-black text-zinc-900 dark:text-zinc-100 line-clamp-1">{t.levels.allLevels}</div>
                  <div className="text-[10px] text-zinc-500 font-semibold mt-0.5">{quiz.questions.length} Qs</div>
                </button>

                {/* Lv 1 */}
                <button
                  type="button"
                  onClick={() => setSelectedLevel(1)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    selectedLevel === 1
                      ? 'border-emerald-500 bg-emerald-100/70 dark:bg-emerald-950/70 shadow-sm border-b-4 translate-y-[-2px]'
                      : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 border-b-2'
                  }`}
                >
                  <div className="text-base mb-1">🌱</div>
                  <div className="text-xs font-black text-zinc-900 dark:text-zinc-100 line-clamp-1">{t.levels.lvl1}</div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                    {quiz.questions.filter((q) => q.level === 1).length > 0
                      ? `${quiz.questions.filter((q) => q.level === 1).length} Qs`
                      : 'Available'}
                  </div>
                </button>

                {/* Lv 2 */}
                <button
                  type="button"
                  onClick={() => setSelectedLevel(2)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    selectedLevel === 2
                      ? 'border-amber-500 bg-amber-100/70 dark:bg-amber-950/70 shadow-sm border-b-4 translate-y-[-2px]'
                      : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 border-b-2'
                  }`}
                >
                  <div className="text-base mb-1">⭐</div>
                  <div className="text-xs font-black text-zinc-900 dark:text-zinc-100 line-clamp-1">{t.levels.lvl2}</div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
                    {quiz.questions.filter((q) => q.level === 2).length > 0
                      ? `${quiz.questions.filter((q) => q.level === 2).length} Qs`
                      : 'Available'}
                  </div>
                </button>

                {/* Lv 3 */}
                <button
                  type="button"
                  onClick={() => setSelectedLevel(3)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    selectedLevel === 3
                      ? 'border-rose-500 bg-rose-100/70 dark:bg-rose-950/70 shadow-sm border-b-4 translate-y-[-2px]'
                      : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 border-b-2'
                  }`}
                >
                  <div className="text-base mb-1">🔥</div>
                  <div className="text-xs font-black text-zinc-900 dark:text-zinc-100 line-clamp-1">{t.levels.lvl3}</div>
                  <div className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold mt-0.5">
                    {quiz.questions.filter((q) => q.level === 3).length > 0
                      ? `${quiz.questions.filter((q) => q.level === 3).length} Qs`
                      : 'Available'}
                  </div>
                </button>
              </div>
            </div>

            <button
              onClick={() => startQuiz(selectedLevel)}
              className="flex items-center justify-center gap-2 w-full max-w-md mx-auto rounded-2xl border-b-4 border-violet-800 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 active:border-b-0 active:translate-y-1 text-white py-4 px-8 text-base font-black shadow-xl transition-all"
            >
              <span>{t.quizIntro.startNow}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
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
      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
        {/* Progress Tracker */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-black text-zinc-500 mb-2">
            <div className="flex items-center gap-2">
              <span>
                {t.quizRunner.question} <strong className="text-violet-600 dark:text-violet-400">{currentIndex + 1}</strong> {t.quizRunner.of} {totalQuestions}
              </span>
              {currentQuestion.level && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-black border ${
                    currentQuestion.level === 1
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : currentQuestion.level === 2
                      ? 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                      : 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
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
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-black">
                <Zap className="w-3.5 h-3.5 fill-current" />
                +{earnedXPInSession} XP
              </span>
              <span>{t.quizRunner.score}: {score} {t.quizRunner.pts}</span>
            </div>
          </div>
          <div className="h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 p-0.5 border border-zinc-300 dark:border-zinc-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${progressPercentQuestion}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 leading-snug mb-6">
            {questionText}
          </h2>

          {/* Chunky 3D Option Buttons */}
          <div className="space-y-3.5">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isOptionCorrect = option.id === currentQuestion.correctAnswer;
              const optionText = getLocalizedText(option, 'text', lang);

              let optionStyle =
                'border-2 border-b-4 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 hover:border-violet-400 active:border-b-2 active:translate-y-0.5 text-zinc-800 dark:text-zinc-200';

              if (isAnswerSubmitted) {
                if (isOptionCorrect) {
                  optionStyle =
                    'border-2 border-b-4 border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 shadow-md';
                } else if (isSelected) {
                  optionStyle =
                    'border-2 border-b-4 border-rose-600 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200';
                } else {
                  optionStyle = 'opacity-40 border-2 border-zinc-200 dark:border-zinc-800';
                }
              } else if (isSelected) {
                optionStyle =
                  'border-2 border-b-4 border-violet-700 bg-violet-50 dark:bg-violet-950/50 text-violet-900 dark:text-violet-200 ring-2 ring-violet-500/20 translate-y-0.5';
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={isAnswerSubmitted}
                  className={`flex w-full items-center gap-3.5 rounded-2xl p-4 text-left transition-all duration-150 ${optionStyle}`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-all ${
                      isAnswerSubmitted && isOptionCorrect
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : isAnswerSubmitted && isSelected
                        ? 'bg-rose-500 text-white shadow-sm'
                        : isSelected
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {isAnswerSubmitted && isOptionCorrect ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isAnswerSubmitted && isSelected ? (
                      <XCircle className="w-5 h-5" />
                    ) : (
                      option.id
                    )}
                  </span>
                  <span className="text-sm sm:text-base font-bold leading-normal flex-1">
                    {optionText}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-100 dark:border-zinc-800/80 pt-5">
            <span className="text-xs text-zinc-400 font-medium order-2 sm:order-1">
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
                className="w-full sm:w-auto order-1 sm:order-2 flex items-center justify-center gap-2 rounded-2xl border-b-4 border-violet-800 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:border-b-0 text-white py-3.5 px-7 text-sm font-black transition-all shadow-md active:border-b-0 active:translate-y-1"
              >
                <span>{t.quizRunner.checkAnswer}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto order-1 sm:order-2 flex items-center justify-center gap-2 rounded-2xl border-b-4 border-violet-800 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white py-3.5 px-7 text-sm font-black transition-all shadow-lg active:border-b-0 active:translate-y-1 animate-pulse"
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

          {/* Explanation & Trivia Card */}
          {isAnswerSubmitted && (
            <div className="mt-6 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 p-5 animate-fadeIn">
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <span className="flex items-center gap-1.5 text-xs font-black text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> {t.quizRunner.correct} (+20 XP!)
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-black text-rose-600 dark:text-rose-400">
                    <XCircle className="w-4 h-4" /> {t.quizRunner.incorrect}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3 font-medium">
                {explanationText}
              </p>

              {funFactText && (
                <div className="flex items-start gap-2.5 rounded-xl bg-violet-500/10 dark:bg-violet-500/15 p-3 text-xs text-violet-800 dark:text-violet-300">
                  <Lightbulb className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                  <div>
                    <strong className="font-bold">{t.quizRunner.funLore}</strong> {funFactText}
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

  // 3. RESULT VIEW
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Result Card */}
      <div className="overflow-hidden rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl mb-8">
        {/* Top Banner with Badge */}
        <div
          className={`relative bg-gradient-to-r ${quiz.gradient} p-8 sm:p-12 text-white text-center overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/35 backdrop-blur-md px-4 py-1 text-xs font-black uppercase tracking-wider mb-3">
              <Trophy className="w-4 h-4 text-amber-400" />
              {t.resultView.officialResult}
            </div>

            <div className="my-2">
              <span className="text-5xl sm:text-7xl font-black tracking-tight drop-shadow-md">
                {score} / {totalQuestions}
              </span>
              <span className="text-lg sm:text-xl font-bold text-white/80 ml-2">
                ({Math.round((score / totalQuestions) * 100)}%)
              </span>
            </div>

            {/* Total XP Earned Pill */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400 text-amber-950 font-black text-sm shadow-lg border-b-2 border-amber-600 mt-2">
              <Zap className="w-4 h-4 fill-current" />
              <span>+{earnedXPInSession} XP EARNED</span>
            </div>

            <div className="block mt-4">
              <div className="inline-block rounded-2xl bg-white/20 backdrop-blur-md px-5 py-2.5 border border-white/30">
                <h2 className="text-xl sm:text-2xl font-black">{currentTier.badge}</h2>
                <div className="text-xs sm:text-sm font-bold text-white/95">
                  {t.resultView.tier}: {currentTier.title}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Level Progression & Description */}
        <div className="p-6 sm:p-10">
          {/* Level Progress Gauge */}
          <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border-2 border-zinc-200 dark:border-zinc-700/60 p-5 mb-6">
            <div className="flex items-center justify-between text-xs font-black mb-2">
              <span className="flex items-center gap-1.5 text-violet-700 dark:text-violet-400">
                <span>{currentLevel.badgeEmoji}</span>
                <span>Level {currentLevel.level}: {lang === 'ko' ? currentLevel.titleKo : currentLevel.title}</span>
              </span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{xp} Total XP</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-amber-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 p-5 mb-6 text-center">
            <p className="text-sm sm:text-base font-bold text-zinc-800 dark:text-zinc-200 leading-relaxed mb-3">
              {currentTier.description}
            </p>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 italic font-medium">
              &quot;{currentTier.funQuote}&quot;
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="mb-6">
            <ShareButtons
              quizTitle={quizTitle}
              scoreText={`${score}/${totalQuestions}`}
              badgeTitle={currentTier.title}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => startQuiz(selectedLevel)}
              className="flex items-center justify-center gap-2 rounded-2xl border-b-4 border-violet-800 bg-violet-600 hover:bg-violet-700 active:border-b-0 active:translate-y-1 text-white py-3.5 px-6 text-sm font-black transition-all shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.resultView.retake} (🎲 New Shuffle)</span>
            </button>
            <button
              onClick={() => setGameState('intro')}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 py-3.5 px-6 text-sm font-black transition-all active:translate-y-0.5"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{t.levels.selectTitle}</span>
            </button>
          </div>
        </div>
      </div>

      {/* AdSense Leaderboard Placement */}
      <AdPlaceholder format="horizontal" label={t.ads.sponsored} />

      {/* Affiliate Suggestion Section */}
      {quiz.affiliateSuggestion && (
        <AffiliateBox affiliate={quiz.affiliateSuggestion} />
      )}

      {/* Next Quizzes to Multiply Pageviews */}
      {relatedQuizzes.length > 0 && (
        <div className="my-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
              {t.resultView.keepPlaying}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedQuizzes.map((item) => (
              <QuizCard key={item.slug} quiz={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
