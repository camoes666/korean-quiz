'use client';

import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ShareButtonsProps {
  quizTitle: string;
  scoreText: string;
  badgeTitle: string;
  url?: string;
}

export default function ShareButtons({
  quizTitle,
  scoreText,
  badgeTitle,
  url,
}: ShareButtonsProps) {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? (url || window.location.href) : '';
  const shareText =
    lang === 'ko'
      ? `🎉 K-Pulse 퀴즈 "${quizTitle}"에서 [${badgeTitle}] 뱃지를 획득했어요! (내 점수: ${scoreText}) 친구들도 도전해보세요! #KPulse #KCulture #KPop #KDrama`
      : `🎉 I scored ${scoreText} on "${quizTitle}" and got [${badgeTitle}] on K-Pulse! Can you beat my score? #KPulse #KCulture #KPop #KDrama`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: quizTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(shareUrl)}`;

  const redditShareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(
    shareUrl
  )}&title=${encodeURIComponent(`[Quiz] ${quizTitle} - I got ${badgeTitle}!`)}`;

  return (
    <div className="w-full">
      <div className="text-center mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          {t.resultView.shareTitle}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Native Web Share API */}
        <button
          onClick={handleNativeShare}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white py-2.5 px-3 text-xs sm:text-sm font-semibold shadow-md shadow-pink-500/20 active:scale-95 transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span>{t.resultView.share}</span>
        </button>

        {/* Twitter / X */}
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 py-2.5 px-3 text-xs sm:text-sm font-semibold active:scale-95 transition-all"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>{t.resultView.postX}</span>
        </a>

        {/* Reddit */}
        <a
          href={redditShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FF4500] hover:bg-[#E03D00] text-white py-2.5 px-3 text-xs sm:text-sm font-semibold active:scale-95 transition-all"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.702zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
          </svg>
          <span>{t.resultView.reddit}</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 py-2.5 px-3 text-xs sm:text-sm font-semibold active:scale-95 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">{t.resultView.copied}</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>{t.resultView.copyLink}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
