'use client';

import {
  Building2,
  Compass,
  ExternalLink,
  TrainFront,
  Wifi,
} from 'lucide-react';
import {
  getLocalizedMapText,
  type TravelAffiliateCategory,
  type TravelAffiliateOffer,
} from '@/types/map';
import type { Language } from '@/lib/translations';
import { trackTravelAffiliateClick } from '@/lib/analytics';

interface TravelEssentialsBoxProps {
  offers: TravelAffiliateOffer[];
  lang: Language;
  spotSlug?: string;
  courseSlug?: string;
  region: string;
  compact?: boolean;
}

function getCategoryIcon(category: TravelAffiliateCategory) {
  if (category === 'esim') {
    return <Wifi className="w-4 h-4 text-emerald-700" strokeWidth={1.75} />;
  }
  if (category === 'rail') {
    return <TrainFront className="w-4 h-4 text-sky-700" strokeWidth={1.75} />;
  }
  if (category === 'tour') {
    return <Compass className="w-4 h-4 text-amber-700" strokeWidth={1.75} />;
  }
  return <Building2 className="w-4 h-4 text-slate-700" strokeWidth={1.75} />;
}

function getSectionCopy(lang: Language, isCourse: boolean) {
  if (lang === 'ko') {
    return {
      eyebrow: 'TRIP PLANNER',
      heading: isCourse
        ? '이 코스 여행을 편하게 만들어 줄 준비물'
        : '이 스팟 방문 준비물 & 주변 숙소',
      disclosure:
        '*제휴 링크가 포함될 수 있으며, 예약 시 추가 비용 없이 사이트 운영에 소정의 수수료가 지원됩니다.',
    };
  }
  if (lang === 'es') {
    return {
      eyebrow: 'PLANIFICA TU VISITA',
      heading: isCourse
        ? 'Esenciales de viaje para esta ruta'
        : 'Esenciales de viaje para este lugar',
      disclosure:
        '*Algunos enlaces pueden ser de afiliados. Podemos recibir una pequeña comisión sin costo extra para ti.',
    };
  }
  if (lang === 'pt') {
    return {
      eyebrow: 'PLANEJE SUA VISITA',
      heading: isCourse
        ? 'Essenciais de viagem para este roteiro'
        : 'Essenciais de viagem para este local',
      disclosure:
        '*Pode conter links de afiliados. Recebemos uma pequena comissão sem custo adicional para você.',
    };
  }
  return {
    eyebrow: 'TRIP ESSENTIALS',
    heading: isCourse
      ? 'Travel essentials for this route'
      : 'Travel essentials for this spot',
    disclosure:
      '*May contain affiliate links. We may earn a small commission at zero extra cost to you.',
  };
}

export default function TravelEssentialsBox({
  offers,
  lang,
  spotSlug,
  courseSlug,
  region,
  compact = false,
}: TravelEssentialsBoxProps) {
  if (!offers || offers.length === 0) return null;

  const copy = getSectionCopy(lang, Boolean(courseSlug && !spotSlug));

  return (
    <div
      className={`rounded-2xl border border-stone-200/90 bg-[#FAF8F5] ${
        compact ? 'p-4' : 'p-5 sm:p-6'
      } space-y-3`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <div className="text-[10px] font-mono font-semibold tracking-wider text-stone-500">
            {copy.eyebrow}
          </div>
          <h3
            className={`font-bold text-slate-900 ${
              compact ? 'text-xs sm:text-sm' : 'text-base sm:text-lg'
            }`}
          >
            {copy.heading}
          </h3>
        </div>
      </div>

      <div
        className={`grid gap-2.5 ${
          compact
            ? 'grid-cols-1 sm:grid-cols-3'
            : 'grid-cols-1 md:grid-cols-3 gap-3.5'
        }`}
      >
        {offers.map((offer) => (
          <a
            key={offer.id}
            href={offer.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() =>
              trackTravelAffiliateClick({
                provider: offer.provider,
                category: offer.category,
                offerId: offer.id,
                spotSlug,
                courseSlug,
                region,
                lang,
              })
            }
            className="group flex flex-col justify-between rounded-xl border border-stone-200/90 bg-white p-3.5 hover:border-stone-400 transition-colors"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#FAF8F5] border border-stone-200">
                  {getCategoryIcon(offer.category)}
                </span>
                <span className="text-[10px] font-mono font-semibold text-stone-500 border border-stone-200 bg-stone-50 rounded-md px-2 py-0.5">
                  {offer.providerName}
                </span>
              </div>

              <div
                className={`font-bold text-slate-900 leading-snug ${
                  compact ? 'text-xs' : 'text-sm'
                }`}
              >
                {getLocalizedMapText(offer.title, lang)}
              </div>

              <p
                className={`text-stone-600 leading-relaxed ${
                  compact ? 'text-[11px] line-clamp-2' : 'text-xs'
                }`}
              >
                {getLocalizedMapText(offer.subtitle, lang)}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] font-semibold text-slate-900 group-hover:text-emerald-800">
              <span>{getLocalizedMapText(offer.ctaLabel, lang)}</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 shrink-0" />
            </div>
          </a>
        ))}
      </div>

      <p className="text-[10px] text-stone-500 leading-relaxed">
        {copy.disclosure}
      </p>
    </div>
  );
}
