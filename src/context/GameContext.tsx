'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface LevelInfo {
  level: number;
  title: string;
  titleKo: string;
  minXP: number;
  nextXP: number;
  badgeEmoji: string;
}

export const LEVELS: LevelInfo[] = [
  { level: 1, title: 'Trainee', titleKo: '루키 연습생', minXP: 0, nextXP: 100, badgeEmoji: '🌱' },
  { level: 2, title: 'Debut Stage', titleKo: '데뷔 무대', minXP: 100, nextXP: 250, badgeEmoji: '🎤' },
  { level: 3, title: 'Rising Star', titleKo: '라이징 스타', minXP: 250, nextXP: 500, badgeEmoji: '⭐' },
  { level: 4, title: 'Hallyu Icon', titleKo: '한류 아이콘', minXP: 500, nextXP: 1000, badgeEmoji: '🔥' },
  { level: 5, title: 'Global Legend', titleKo: '월드 레전드', minXP: 1000, nextXP: 2000, badgeEmoji: '👑' },
];

interface GameContextType {
  xp: number;
  streak: number;
  currentLevel: LevelInfo;
  progressPercent: number;
  xpToNextLevel: number;
  dailyQuestCompleted: boolean;
  addXP: (amount: number) => void;
  completeDailyQuest: () => void;
  floatingXP: number | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXp] = useState<number>(60);
  const [streak, setStreak] = useState<number>(1);
  const [dailyQuestCompleted, setDailyQuestCompleted] = useState<boolean>(false);
  const [floatingXP, setFloatingXP] = useState<number | null>(null);

  // Load saved game stats
  useEffect(() => {
    try {
      const savedXP = localStorage.getItem('kpulse_xp');
      const savedStreak = localStorage.getItem('kpulse_streak');
      const savedQuest = localStorage.getItem('kpulse_quest_date');

      if (savedXP) setXp(Number(savedXP));
      if (savedStreak) setStreak(Number(savedStreak));

      const today = new Date().toDateString();
      if (savedQuest === today) {
        setDailyQuestCompleted(true);
      }
    } catch {
      // Safe fallback
    }
  }, []);

  // Determine level
  const currentLevel =
    [...LEVELS].reverse().find((lvl) => xp >= lvl.minXP) || LEVELS[0];

  const nextLevel = LEVELS.find((lvl) => lvl.level === currentLevel.level + 1);
  const xpNeededInCurrentTier = nextLevel ? nextLevel.minXP - currentLevel.minXP : 500;
  const xpEarnedInCurrentTier = xp - currentLevel.minXP;
  const progressPercent = nextLevel
    ? Math.min(100, Math.round((xpEarnedInCurrentTier / xpNeededInCurrentTier) * 100))
    : 100;
  const xpToNextLevel = nextLevel ? Math.max(0, nextLevel.minXP - xp) : 0;

  const addXP = (amount: number) => {
    setXp((prev) => {
      const newXP = prev + amount;
      localStorage.setItem('kpulse_xp', String(newXP));
      return newXP;
    });

    setFloatingXP(amount);
    setTimeout(() => setFloatingXP(null), 2000);
  };

  const completeDailyQuest = () => {
    if (dailyQuestCompleted) return;
    setDailyQuestCompleted(true);
    const today = new Date().toDateString();
    localStorage.setItem('kpulse_quest_date', today);
    addXP(100);
    setStreak((prev) => {
      const nextStreak = prev + 1;
      localStorage.setItem('kpulse_streak', String(nextStreak));
      return nextStreak;
    });
  };

  return (
    <GameContext.Provider
      value={{
        xp,
        streak,
        currentLevel,
        progressPercent,
        xpToNextLevel,
        dailyQuestCompleted,
        addXP,
        completeDailyQuest,
        floatingXP,
      }}
    >
      {children}
      {/* Floating XP Animation Popup */}
      {floatingXP && (
        <div className="fixed bottom-10 right-6 z-50 flex items-center gap-2 rounded-2xl bg-amber-400 text-amber-950 font-black px-4 py-2.5 shadow-2xl border-2 border-amber-300 animate-bounce">
          <span className="text-lg">⚡</span>
          <span>+{floatingXP} XP!</span>
        </div>
      )}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
