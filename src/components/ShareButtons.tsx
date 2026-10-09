'use client';

import { useState } from 'react';
import { Share2, Check, Copy, Swords, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { encodeChallenge } from '@/lib/challenge';

interface ShareButtonsProps {
  quizTitle: string;
  slug?: string;
  score: number;
  totalQuestions: number;
  totalPoints?: number;
  questionIds?: number[];
  questionScores?: number[];
  badgeTitle: string;
  badgeEmoji?: string;
  url?: string;
  userNickname?: string;
  onNicknameChange?: (nickname: string) => void;
}

export default function ShareButtons({
  quizTitle,
  slug,
  score,
  totalQuestions,
  totalPoints,
  questionIds,
  questionScores,
  badgeTitle,
  badgeEmoji = '🏆',
  url,
  userNickname: initialNickname,
  onNicknameChange,
}: ShareButtonsProps) {
  const { lang, t } = useLanguage();
  const [copiedChallenge, setCopiedChallenge] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [nickname, setNickname] = useState(() => {
    if (initialNickname) return initialNickname;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('kpulse_nickname') || '';
    }
    return '';
  });

  const handleNicknameChange = (val: string) => {
    const trimmedVal = val.slice(0, 12);
    setNickname(trimmedVal);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kpulse_nickname', trimmedVal);
    }
    if (onNicknameChange) {
      onNicknameChange(trimmedVal);
    }
  };

  const pct = Math.max(0, Math.min(100, Math.round((score / Math.max(1, totalQuestions)) * 100)));
  const isPerfect = pct === 100;
  const isHigh = pct >= 70;
  const displayedPoints = totalPoints ?? score * 1000;

  // Determine final share URL
  let shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://kpulsequiz.com');
  if (slug && questionIds && questionScores && questionIds.length === 5 && questionScores.length === 5) {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://kpulsequiz.com';
    const payload = encodeChallenge(slug, {
      q: questionIds,
      p: questionScores,
      n: nickname.trim(),
    });
    shareUrl = `${origin}/quiz/${slug}?c=${payload}`;
  }

  // Dynamic quiz-specific hashtag
  const lowerTitle = quizTitle.toLowerCase();
  const specificTag = lowerTitle.includes('bts')
    ? ' #BTS #BTSARMY'
    : lowerTitle.includes('spicy') || lowerTitle.includes('food')
    ? ' #KoreanFood #Buldak'
    : lowerTitle.includes('drama')
    ? ' #KDrama #KoreanDrama'
    : lowerTitle.includes('culture')
    ? ' #KoreanCulture #LearnKorean'
    : ' #KPop';

  // High-converting viral copy according to user points and score (Order: English -> Spanish -> Korean)
  const senderName = nickname.trim() ? `${nickname.trim()}` : '';
  const senderPrefix = senderName ? `[${senderName}] ` : '';

  let viralHeadline = '';
  if (lang === 'en') {
    viralHeadline = isPerfect
      ? `🏆 ${senderPrefix}5,000 PERFECT POINTS! I just mastered "${quizTitle}" on K-Pulse with the [${badgeTitle}] title! 👑 Can anyone beat me? ⚔️`
      : isHigh
      ? `🔥 ${senderPrefix}I scored ${displayedPoints.toLocaleString()} pts (${score}/${totalQuestions} correct) on "${quizTitle}"! Can you beat my time? ⚔️`
      : `🐯 ${senderPrefix}I just completed "${quizTitle}" on K-Pulse with ${displayedPoints.toLocaleString()} pts! Can you beat my score? 👀`;
  } else if (lang === 'es') {
    viralHeadline = isPerfect
      ? `🏆 ${senderPrefix}¡5,000 PUNTOS PERFECTOS! ¡Dominé "${quizTitle}" en K-Pulse con el título [${badgeTitle}]! 👑 ¿Alguien puede vencerme? ⚔️`
      : isHigh
      ? `🔥 ${senderPrefix}¡Obtuve ${displayedPoints.toLocaleString()} pts (${score}/${totalQuestions} correctas) en "${quizTitle}"! ¿Puedes superarme? ⚔️`
      : `🐯 ${senderPrefix}¡Acabo de completar "${quizTitle}" en K-Pulse con ${displayedPoints.toLocaleString()} pts! ¿Crees que sabes más? 👀`;
  } else {
    // Korean (ko)
    viralHeadline = isPerfect
      ? `🏆 ${senderPrefix}5,000점 만점 퍼펙트! K-Pulse "${quizTitle}"에서 [${badgeTitle}] 칭호를 획득했습니다! 👑 나를 꺾을 수 있는 사람? ⚔️`
      : isHigh
      ? `🔥 ${senderPrefix}K-Pulse "${quizTitle}"에서 ${displayedPoints.toLocaleString()}점(${totalQuestions}문제 중 ${score}개 정답) 달성! 나보다 빠른 번개손 도전해보세요! ⚔️`
      : `🐯 ${senderPrefix}K-Pulse "${quizTitle}" 퀴즈 도전 완료! 내 점수는 ${displayedPoints.toLocaleString()}점([${badgeTitle}]). 이길 수 있나요? 👀`;
  }

  const twitterPostText = `${viralHeadline}${specificTag} #KPulse`;
  const challengeMessage = `${viralHeadline}\n👉 ${shareUrl}`;

  // 1. Copy Challenge Message (Text + Link)
  const handleCopyChallenge = async () => {
    try {
      await navigator.clipboard.writeText(challengeMessage);
      setCopiedChallenge(true);
      setTimeout(() => setCopiedChallenge(false), 3000);
    } catch {
      setCopiedChallenge(true);
      setTimeout(() => setCopiedChallenge(false), 3000);
    }
  };

  // 2. Copy Pure Link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // 3. Native Web Share API
  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${quizTitle} - K-Pulse Challenge`,
          text: viralHeadline,
          url: shareUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyChallenge();
    }
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    twitterPostText
  )}&url=${encodeURIComponent(shareUrl)}`;

  const redditShareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(
    shareUrl
  )}&title=${encodeURIComponent(`[Quiz Challenge] ${quizTitle} - I scored ${displayedPoints.toLocaleString()} pts!`)}`;

  return (
    <div className="w-full mt-4">
      {/* Nickname Input Field */}
      <div className="rounded-2xl border-2 border-purple-200/90 bg-white p-4 mb-3.5 text-left shadow-xs">
        <label htmlFor="kpulse-nick-input" className="block text-xs font-black text-purple-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-purple-600" />
          <span>{t.challenge.nicknameLabel}</span>
          <span className="text-[10px] text-slate-400 font-normal">({nickname.length}/12)</span>
        </label>
        <input
          id="kpulse-nick-input"
          type="text"
          value={nickname}
          onChange={(e) => handleNicknameChange(e.target.value)}
          placeholder={t.challenge.nicknamePlaceholder}
          maxLength={12}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
        />
      </div>

      {/* Viral Challenge Quote Box Preview */}
      <div className="rounded-2xl border-2 border-purple-200/80 bg-gradient-to-br from-purple-50/80 via-white to-pink-50/80 p-4 mb-4 text-left shadow-xs">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-base">{badgeEmoji}</span>
          <span className="text-[11px] font-black uppercase tracking-wider text-purple-700">
            {lang === 'ko'
              ? '내 바이럴 도전 카드 미리보기'
              : lang === 'es'
              ? 'Vista previa de desafío viral'
              : 'Viral Challenge Preview'}
          </span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed italic">
          &ldquo;{viralHeadline}&rdquo;
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
        {/* Post to X (Twitter) */}
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 rounded-2xl bg-zinc-950 hover:bg-black text-white py-3.5 px-4 text-xs sm:text-sm font-black shadow-lg shadow-zinc-950/20 active:scale-95 transition-all group"
        >
          <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>
            {lang === 'ko'
              ? 'X (트위터)에 점수 자랑하기'
              : lang === 'es'
              ? 'Publicar puntuación en X'
              : 'Post Score to X (Twitter)'}
          </span>
        </a>

        {/* Copy Viral Challenge Message */}
        <button
          onClick={handleCopyChallenge}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white py-3.5 px-4 text-xs sm:text-sm font-black shadow-lg shadow-pink-500/25 active:scale-95 transition-all"
        >
          {copiedChallenge ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>{t.challenge.copiedNotice}</span>
            </>
          ) : (
            <>
              <Swords className="w-4 h-4" />
              <span>{t.challenge.copyChallengeBtn}</span>
            </>
          )}
        </button>
      </div>

      {/* Secondary Row: Mobile Native Share, Reddit, Simple Link Copy */}
      <div className="grid grid-cols-3 gap-2">
        {/* Native Mobile Share */}
        <button
          onClick={handleNativeShare}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 py-2.5 px-2 text-xs font-bold active:scale-95 transition-all"
          title="Share to Apps"
        >
          <Share2 className="w-3.5 h-3.5 text-purple-600" />
          <span>{t.resultView.share}</span>
        </button>

        {/* Reddit */}
        <a
          href={redditShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-orange-50 hover:border-orange-200 text-slate-700 hover:text-[#FF4500] py-2.5 px-2 text-xs font-bold active:scale-95 transition-all"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.702zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
          </svg>
          <span>{t.resultView.reddit}</span>
        </a>

        {/* Copy Link Only */}
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 py-2.5 px-2 text-xs font-bold active:scale-95 transition-all"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600">{t.resultView.copied}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>{t.resultView.copyLink}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
