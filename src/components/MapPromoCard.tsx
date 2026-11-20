'use client';

import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import type { Language } from '@/lib/translations';
import { trackMapCtaClick } from '@/lib/analytics';
import { MAP_GROUP_PREVIEW, MapTargetGroup, getMapHref } from '@/lib/mapLink';

interface MapPromoCardProps {
  groupId: MapTargetGroup;
  fromSurface: 'personality_result' | 'trivia_result' | 'chemistry_result';
  fromSlug?: string;
  lang: Language;
  variant?: 'card' | 'compact';
}

function getMapPromoCopy(groupId: MapTargetGroup, lang: Language) {
  const preview = MAP_GROUP_PREVIEW[groupId];

  if (groupId !== 'all') {
    if (lang === 'ko') {
      return {
        title: `${preview.groupName} 한국 성지순례 지도 (${preview.spotCount}곳 실제 사진)`,
        sub: '소속사·단골 맛집·MV 촬영지·고향 스팟까지 네이버·카카오·구글 지도 원클릭 길찾기',
        cta: `${preview.groupName} 성지 지도 보기`,
      };
    }
    if (lang === 'es') {
      return {
        title: `Mapa de ${preview.groupName} en Corea (${preview.spotCount} Lugares Reales)`,
        sub: 'Fotos reales de agencias, restaurantes y locaciones de MV con Naver, Kakao y Google Maps.',
        cta: `Abrir Mapa ${preview.groupName}`,
      };
    }
    if (lang === 'pt') {
      return {
        title: `Mapa do ${preview.groupName} na Coreia (${preview.spotCount} Locais Reais)`,
        sub: 'Fotos reais de agências, restaurantes e cenários de MV com Naver, Kakao e Google Maps.',
        cta: `Abrir Mapa ${preview.groupName}`,
      };
    }
    return {
      title: `${preview.groupName} Korea Pilgrimage Map (${preview.spotCount} Real Spots)`,
      sub: 'Real photos of agencies, favorite restaurants & MV filming sites with 1-tap Naver, Kakao & Google Maps.',
      cta: `Explore ${preview.groupName} Map`,
    };
  }

  if (lang === 'ko') {
    return {
      title: 'K-Pop 한국 성지순례 지도 (BTS·블핑·스키즈 30곳)',
      sub: '실제 사진과 네이버·카카오·구글 지도 원클릭 길찾기로 한국 여행 코스를 만들어보세요.',
      cta: 'K-Pop 성지 지도 보기',
    };
  }
  if (lang === 'es') {
    return {
      title: 'Mapa K-Pop en Corea (30 Lugares Reales)',
      sub: 'Explora 30 lugares verificados de BTS, BLACKPINK y Stray Kids con fotos reales y Naver/Google Maps.',
      cta: 'Abrir Mapa K-Pop',
    };
  }
  if (lang === 'pt') {
    return {
      title: 'Mapa K-Pop na Coreia (30 Locais Reais)',
      sub: 'Explore 30 locais verificados de BTS, BLACKPINK e Stray Kids com fotos reais e Naver/Google Maps.',
      cta: 'Abrir Mapa K-Pop',
    };
  }
  return {
    title: 'K-Pop Korea Pilgrimage Map (30 Real Spots)',
    sub: 'Explore verified BTS, BLACKPINK & Stray Kids restaurants, agencies & filming sites with real photos.',
    cta: 'Open Korea K-Map',
  };
}

export default function MapPromoCard({
  groupId,
  fromSurface,
  fromSlug,
  lang,
  variant = 'card',
}: MapPromoCardProps) {
  const preview = MAP_GROUP_PREVIEW[groupId];
  const href = getMapHref(groupId);
  const copy = getMapPromoCopy(groupId, lang);

  const handleClick = () => {
    trackMapCtaClick({
      fromSurface,
      fromSlug,
      targetGroup: groupId,
      lang,
    });
  };

  if (variant === 'compact') {
    return (
      <Link
        href={href}
        onClick={handleClick}
        className="w-full py-3 px-4 rounded-xl bg-rose-50/80 hover:bg-rose-100/80 border border-rose-200 text-rose-900 text-xs font-bold transition-colors flex items-center justify-between gap-2"
      >
        <span className="flex items-center gap-2 min-w-0">
          <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
          <span className="truncate">{copy.title}</span>
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-rose-600 shrink-0" />
      </Link>
    );
  }

  return (
    <div className="rounded-2xl border border-pink-200/80 bg-gradient-to-r from-rose-50/80 via-white to-purple-50/70 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
      <div className="w-full sm:w-28 h-32 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-200/80 bg-slate-100">
        <img
          src={preview.image}
          alt={copy.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex-1 text-center sm:text-left min-w-0">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-100 text-pink-800 border border-pink-200/80 text-[10px] font-extrabold tracking-wider uppercase mb-1">
          <MapPin className="w-3 h-3 text-pink-600" />
          <span>K-POP TRAVEL MAP</span>
        </span>
        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          {copy.title}
        </h4>
        <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 font-normal">
          {copy.sub}
        </p>
      </div>

      <Link
        href={href}
        onClick={handleClick}
        className="w-full sm:w-auto bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shrink-0 inline-flex items-center justify-center gap-1.5 transition-colors active:scale-95"
      >
        <span>{copy.cta}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
