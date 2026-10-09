'use client';

import React, { useState } from 'react';
import { Swords, Trophy, Frown, Handshake, Check, Share2, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { encodeChallenge } from '@/lib/challenge';

export interface ChallengeResultProps {
  slug: string;
  quizTitle: string;
  challengerName?: string;
  challengerScores: number[];
  challengerTotalScore: number;
  userScores: number[];
  userTotalScore: number;
  questionIds: number[];
  userNickname: string;
  onRetakeNormal: () => void;
}

export default function ChallengeResult({
  slug,
  quizTitle,
  challengerName,
  challengerScores,
  challengerTotalScore,
  userScores,
  userTotalScore,
  questionIds,
  userNickname,
  onRetakeNormal,
}: ChallengeResultProps) {
  const { lang, t } = useLanguage();
  const [copiedCounter, setCopiedCounter] = useState(false);

  const opponentName = challengerName || t.challenge.defaultFriend;
  const myName = userNickname.trim() || t.challenge.you;

  const isWin = userTotalScore > challengerTotalScore;
  const isLose = userTotalScore < challengerTotalScore;
  const isDraw = userTotalScore === challengerTotalScore;

  // Generate counter challenge URL
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://kpulsequiz.com';
  const counterPayload = encodeChallenge(slug, {
    q: questionIds,
    p: userScores,
    n: userNickname.trim(),
  });
  const counterUrl = `${origin}/quiz/${slug}?c=${counterPayload}`;

  const diff = Math.abs(userTotalScore - challengerTotalScore);

  let viralHeadline = '';
  if (lang === 'ko') {
    viralHeadline = isWin
      ? `⚔️ ${opponentName}님과의 1:1 대결에서 ${userTotalScore.toLocaleString()}점으로 승리했습니다! (+${diff.toLocaleString()}점 차)`
      : isDraw
      ? `🤝 ${opponentName}님과의 1:1 대결에서 ${userTotalScore.toLocaleString()}점으로 무승부를 기록했습니다!`
      : `🔥 ${opponentName}님과의 1:1 대결에서 ${userTotalScore.toLocaleString()}점 달성! 되받아치기 도전할 사람? ⚔️`;
  } else if (lang === 'es') {
    viralHeadline = isWin
      ? `⚔️ ¡Gané el duelo 1:1 contra ${opponentName} con ${userTotalScore.toLocaleString()} pts! (+${diff.toLocaleString()} pts de ventaja)`
      : isDraw
      ? `🤝 ¡Empate 1:1 con ${opponentName} a ${userTotalScore.toLocaleString()} puntos!`
      : `🔥 ¡Obtuve ${userTotalScore.toLocaleString()} pts contra ${opponentName}! ¿Alguien acepta el contra-desafío? ⚔️`;
  } else {
    viralHeadline = isWin
      ? `⚔️ I just defeated ${opponentName} in a 1:1 quiz challenge with ${userTotalScore.toLocaleString()} pts! (+${diff.toLocaleString()} lead)`
      : isDraw
      ? `🤝 Tied 1:1 with ${opponentName} at ${userTotalScore.toLocaleString()} pts!`
      : `🔥 I scored ${userTotalScore.toLocaleString()} pts against ${opponentName}! Can anyone beat my score? ⚔️`;
  }

  const handleCopyCounterChallenge = async () => {
    const copyText = `${viralHeadline}\n👉 ${counterUrl}`;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopiedCounter(true);
      setTimeout(() => setCopiedCounter(false), 3000);
    } catch {
      setCopiedCounter(true);
      setTimeout(() => setCopiedCounter(false), 3000);
    }
  };

  const handleNativeShareCounter = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${quizTitle} - 1:1 Challenge`,
          text: viralHeadline,
          url: counterUrl,
        });
      } catch {
        // User dismissed
      }
    } else {
      handleCopyCounterChallenge();
    }
  };

  return (
    <div className="w-full my-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white shadow-2xl border-2 border-purple-500/30 relative overflow-hidden animate-fadeIn">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 -translate-y-8 translate-x-8 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-black tracking-wider uppercase text-pink-300 border border-white/10">
          <Swords className="w-3.5 h-3.5 text-pink-400" />
          <span>{t.challenge.vsTitle}</span>
        </div>

        {/* Outcome Tag */}
        <div
          className={`px-4 py-1 rounded-full text-xs sm:text-sm font-black shadow-md flex items-center gap-1.5 ${
            isWin
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-emerald-500/30'
              : isLose
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-500/30'
              : 'bg-amber-400 text-amber-950 shadow-amber-400/30'
          }`}
        >
          {isWin && <Trophy className="w-4 h-4 fill-current" />}
          {isLose && <Frown className="w-4 h-4" />}
          {isDraw && <Handshake className="w-4 h-4" />}
          <span>{isWin ? t.challenge.win : isLose ? t.challenge.lose : t.challenge.draw}</span>
        </div>
      </div>

      {/* Versus Score Card */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 mb-6 backdrop-blur-sm text-center">
        {/* You */}
        <div
          className={`p-3 sm:p-4 rounded-xl border transition-all ${
            isWin
              ? 'bg-emerald-500/10 border-emerald-400/40'
              : 'bg-white/5 border-white/10'
          }`}
        >
          <div className="text-[11px] sm:text-xs font-black uppercase text-emerald-300 mb-1 line-clamp-1">
            {myName} ({t.challenge.you})
          </div>
          <div className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {userTotalScore.toLocaleString()}
          </div>
          <div className="text-[10px] text-white/60 font-bold mt-0.5">
            {t.challenge.totalScore}
          </div>
        </div>

        {/* Challenger */}
        <div
          className={`p-3 sm:p-4 rounded-xl border transition-all ${
            isLose
              ? 'bg-rose-500/10 border-rose-400/40'
              : 'bg-white/5 border-white/10'
          }`}
        >
          <div className="text-[11px] sm:text-xs font-black uppercase text-pink-300 mb-1 line-clamp-1">
            {opponentName} ({t.challenge.challenger})
          </div>
          <div className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {challengerTotalScore.toLocaleString()}
          </div>
          <div className="text-[10px] text-white/60 font-bold mt-0.5">
            {t.challenge.totalScore}
          </div>
        </div>
      </div>

      {/* Round by Round Breakdown Table */}
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 mb-6">
        <table className="w-full text-xs text-left">
          <thead className="bg-white/10 text-white/70 font-black uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3">{t.challenge.round}</th>
              <th className="py-2.5 px-3 text-emerald-300">{myName}</th>
              <th className="py-2.5 px-3 text-pink-300">{opponentName}</th>
              <th className="py-2.5 px-3 text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-bold">
            {questionIds.map((_, idx) => {
              const uPts = userScores[idx] || 0;
              const cPts = challengerScores[idx] || 0;
              const roundWin = uPts > cPts;
              const roundLose = uPts < cPts;

              return (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 text-white/80 font-black">
                    Q{idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-black text-emerald-300">
                    {uPts.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-pink-200">
                    {cPts.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    {roundWin ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        WIN
                      </span>
                    ) : roundLose ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        LOSE
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        TIE
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Counter Challenge Actions */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <button
          type="button"
          onClick={handleCopyCounterChallenge}
          className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 active:scale-95 transition-all"
        >
          {copiedCounter ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>{t.challenge.copiedNotice}</span>
            </>
          ) : (
            <>
              <Swords className="w-4 h-4" />
              <span>{t.challenge.counterChallenge}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleNativeShareCounter}
          className="sm:w-auto py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
          title="Share to Apps"
        >
          <Share2 className="w-4 h-4 text-pink-300" />
        </button>

        <button
          type="button"
          onClick={onRetakeNormal}
          className="sm:w-auto py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white/90 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.challenge.rematchNormal}</span>
        </button>
      </div>
    </div>
  );
}
