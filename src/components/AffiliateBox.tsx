'use client';

import { AffiliateSuggestion } from '@/types/quiz';
import { Sparkles, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AffiliateBoxProps {
  affiliate: AffiliateSuggestion;
}

export default function AffiliateBox({ affiliate }: AffiliateBoxProps) {
  const { lang } = useLanguage();

  const tag =
    lang === 'ko' && affiliate.tagKo
      ? affiliate.tagKo
      : lang === 'es' && affiliate.tagEs
      ? affiliate.tagEs
      : affiliate.tag;
  const title =
    lang === 'ko' && affiliate.titleKo
      ? affiliate.titleKo
      : lang === 'es' && affiliate.titleEs
      ? affiliate.titleEs
      : affiliate.title;
  const productName =
    lang === 'ko' && affiliate.productNameKo
      ? affiliate.productNameKo
      : lang === 'es' && affiliate.productNameEs
      ? affiliate.productNameEs
      : affiliate.productName;
  const description =
    lang === 'ko' && affiliate.descriptionKo
      ? affiliate.descriptionKo
      : lang === 'es' && affiliate.descriptionEs
      ? affiliate.descriptionEs
      : affiliate.description;
  const buttonText =
    lang === 'ko' && affiliate.buttonTextKo
      ? affiliate.buttonTextKo
      : lang === 'es' && affiliate.buttonTextEs
      ? affiliate.buttonTextEs
      : affiliate.buttonText;
  const badgeText =
    lang === 'ko' && affiliate.badgeTextKo
      ? affiliate.badgeTextKo
      : lang === 'es' && affiliate.badgeTextEs
      ? affiliate.badgeTextEs
      : affiliate.badgeText;

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-pink-500/10 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-600/10 dark:bg-violet-500/20 px-3 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300">
          <Sparkles className="w-3.5 h-3.5" />
          {tag}
        </span>
        {badgeText && (
          <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-400">
            {badgeText}
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
        {title}
      </h3>
      <p className="text-sm font-medium text-violet-600 dark:text-violet-400 mb-2">
        {productName}
      </p>
      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
        {description}
      </p>

      <a
        href={affiliate.targetUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white px-4 py-2.5 text-sm font-semibold shadow-md shadow-violet-600/25 transition-all w-full sm:w-auto"
      >
        <span>{buttonText}</span>
        <ExternalLink className="w-4 h-4" />
      </a>
      <p className="mt-2 text-[10px] text-zinc-400">
        {lang === 'ko'
          ? '*제휴 링크가 포함되어 있을 수 있으며, 구매 시 플랫폼에 소정의 수수료가 지급될 수 있습니다.'
          : lang === 'es'
          ? '*Puede contener enlaces de afiliados. Podemos ganar una pequeña comisión sin costo adicional para ti.'
          : '*May contain affiliate links. We may earn a small commission at zero extra cost to you.'}
      </p>
    </div>
  );
}
