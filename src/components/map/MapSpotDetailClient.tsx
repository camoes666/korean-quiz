'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  ExternalLink,
  HeartHandshake,
  MapPin,
  Navigation,
  Route,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';
import { MAP_GROUPS } from '@/data/mapSpots';
import { MAP_TRANSLATIONS } from '@/lib/mapTranslations';
import {
  getLocalizedMapText,
  type MapCourse,
  type MapSpot,
} from '@/types/map';
import type { FaqItem } from '@/lib/seo';
import { getSpotNavigationLinks } from '@/lib/mapGeo';
import {
  readSavedSpotIds,
  readVisitedSpotIds,
  writeSavedSpotIds,
  writeVisitedSpotIds,
} from '@/lib/mapStorage';
import { getTravelOffersForSpot } from '@/lib/travelAffiliateBuilder';
import {
  trackMapNavClick,
  trackMapSaveSpot,
  trackMapStampSpot,
} from '@/lib/analytics';
import { localizePath } from '@/lib/i18nRoutes';
import type { Language } from '@/lib/translations';
import SpotGallery from './SpotGallery';
import TravelEssentialsBox from './TravelEssentialsBox';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] sm:h-[340px] rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 text-xs font-semibold">
      Loading area map...
    </div>
  ),
});

interface MapSpotDetailClientProps {
  spot: MapSpot;
  nearbySpots: Array<{ spot: MapSpot; distanceKm: number }>;
  courses: MapCourse[];
  faqs: FaqItem[];
}

function getDetailUiCopy(lang: Language) {
  if (lang === 'ko') {
    return {
      home: '홈',
      mapHub: 'K-Pop 성지 지도',
      copyAddress: '주소 복사',
      copiedAddress: '주소 복사됨',
      stampVisited: '방문 스탬프 (+25 XP)',
      stampedVisited: '방문 완료 ✓',
      areaMapHeading: '위치 & 주변 K-Pop 성지 지도',
      areaMapSub: '마커를 클릭하면 주변 스팟 미리보기 및 상세 가이드로 이동할 수 있습니다.',
      openSelectedNearby: '선택한 스팟 가이드 보기',
      coursesHeading: '이 성지가 포함된 추천 일일 코스',
      stopsSuffix: '개 스팟',
      nearbyHeading: '함께 가기 좋은 주변 K-Pop 성지',
      awaySuffix: 'km 거리',
      chemistryTitle: 'K-사주 × MBTI 아이돌 궁합',
      chemistrySub: '생년월일과 MBTI로 나와 가장 잘 맞는 멤버를 확인해 보세요',
      faqHeading: '방문 전 자주 묻는 질문',
      backToMap: '전체 30곳 성지 지도로 돌아가기',
    };
  }
  if (lang === 'es') {
    return {
      home: 'Inicio',
      mapHub: 'Mapa K-Pop',
      copyAddress: 'Copiar dirección',
      copiedAddress: 'Dirección copiada',
      stampVisited: 'Sellar Visita (+25 XP)',
      stampedVisited: 'Visitado ✓',
      areaMapHeading: 'Ubicación y Lugares K-Pop Cercanos',
      areaMapSub: 'Toca cualquier marcador en el mapa para previsualizar el lugar cercano.',
      openSelectedNearby: 'Abrir guía de este lugar',
      coursesHeading: 'Incluido en Estos Itinerarios',
      stopsSuffix: 'paradas',
      nearbyHeading: 'Lugares K-Pop Cercanos para Combinar',
      awaySuffix: 'km',
      chemistryTitle: 'Calculadora K-Saju × MBTI del Grupo',
      chemistrySub: 'Compara tu cumpleaños y MBTI con los miembros de este grupo',
      faqHeading: 'Preguntas frecuentes de viaje',
      backToMap: 'Volver al Mapa K-Pop completo (30 lugares)',
    };
  }
  if (lang === 'pt') {
    return {
      home: 'Início',
      mapHub: 'Mapa K-Pop',
      copyAddress: 'Copiar endereço',
      copiedAddress: 'Endereço copiado',
      stampVisited: 'Carimbar Visita (+25 XP)',
      stampedVisited: 'Visitado ✓',
      areaMapHeading: 'Localização e Pontos K-Pop Próximos',
      areaMapSub: 'Clique em qualquer pino do mapa para visualizar o local próximo.',
      openSelectedNearby: 'Abrir guia deste local',
      coursesHeading: 'Roteiros Que Incluem Este Local',
      stopsSuffix: 'paradas',
      nearbyHeading: 'Locais K-Pop Próximos para Combinar',
      awaySuffix: 'km',
      chemistryTitle: 'Calculadora K-Saju × MBTI do Grupo',
      chemistrySub: 'Compare seu aniversário e MBTI com os integrantes do grupo',
      faqHeading: 'Perguntas frequentes de viagem',
      backToMap: 'Voltar para o Mapa K-Pop completo (30 locais)',
    };
  }
  return {
    home: 'Home',
    mapHub: 'K-Pop Star Map',
    copyAddress: 'Copy address',
    copiedAddress: 'Address copied',
    stampVisited: 'Stamp Visited (+25 XP)',
    stampedVisited: 'Visited ✓',
    areaMapHeading: 'Location & Nearby K-Pop Map',
    areaMapSub: 'Tap any nearby marker on the map to preview and open its full guide.',
    openSelectedNearby: 'Open spot guide',
    coursesHeading: 'Included in These Pilgrimage Courses',
    stopsSuffix: 'stops',
    nearbyHeading: 'Nearby K-Pop Spots to Pair',
    awaySuffix: 'km away',
    chemistryTitle: 'K-Saju × MBTI Idol Chemistry Lab',
    chemistrySub: 'Check your 1:1 compatibility score with members of this group',
    faqHeading: 'Visitor FAQ',
    backToMap: 'Explore all 30 spots on the interactive K-Pop Map',
  };
}

export default function MapSpotDetailClient({
  spot,
  nearbySpots,
  courses,
  faqs,
}: MapSpotDetailClientProps) {
  const { lang } = useLanguage();
  const { addXP } = useGame();
  const ui = MAP_TRANSLATIONS[lang] || MAP_TRANSLATIONS.en;
  const copy = getDetailUiCopy(lang);

  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [mapSelectedId, setMapSelectedId] = useState<string>(spot.id);
  const [fitTrigger, setFitTrigger] = useState(1);

  const awardedStampIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const localSaved = readSavedSpotIds();
      const localVisited = readVisitedSpotIds();
      localVisited.forEach((id) => awardedStampIdsRef.current.add(id));
      setSavedIds(localSaved);
      setVisitedIds(localVisited);
      setFitTrigger((c) => c + 1);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [spot.id]);

  const toggleSave = useCallback(() => {
    const willSave = !savedIds.includes(spot.id);
    const nextCount = willSave
      ? savedIds.length + 1
      : Math.max(0, savedIds.length - 1);
    trackMapSaveSpot({
      spotId: spot.id,
      saved: willSave,
      totalSaved: nextCount,
      lang,
    });
    setSavedIds((prev) => {
      const next = prev.includes(spot.id)
        ? prev.filter((id) => id !== spot.id)
        : [...prev, spot.id];
      writeSavedSpotIds(next);
      return next;
    });
  }, [savedIds, spot.id, lang]);

  const toggleStamp = useCallback(() => {
    const willVisit = !visitedIds.includes(spot.id);
    const nextCount = willVisit
      ? visitedIds.length + 1
      : Math.max(0, visitedIds.length - 1);
    trackMapStampSpot({
      spotId: spot.id,
      visited: willVisit,
      totalVisited: nextCount,
      lang,
    });
    if (willVisit && !awardedStampIdsRef.current.has(spot.id)) {
      awardedStampIdsRef.current.add(spot.id);
      addXP(25);
    }
    setVisitedIds((prev) => {
      const next = prev.includes(spot.id)
        ? prev.filter((id) => id !== spot.id)
        : [...prev, spot.id];
      writeVisitedSpotIds(next);
      return next;
    });
  }, [visitedIds, spot.id, addXP, lang]);

  const handleCopyAddress = async () => {
    const addr = getLocalizedMapText(spot.address, lang);
    try {
      await navigator.clipboard.writeText(addr);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch {
      // Ignore clipboard failures
    }
  };

  const primaryGroup = MAP_GROUPS[spot.groupIds[0]];
  const isSaved = savedIds.includes(spot.id);
  const isVisited = visitedIds.includes(spot.id);
  const navLinks = getSpotNavigationLinks(spot);
  const offers = useMemo(() => getTravelOffersForSpot(spot, lang), [spot, lang]);

  const areaSpots = useMemo(
    () => [spot, ...nearbySpots.map((entry) => entry.spot)],
    [spot, nearbySpots]
  );

  const focusedAreaSpot = useMemo(
    () => areaSpots.find((s) => s.id === mapSelectedId) || spot,
    [areaSpots, mapSelectedId, spot]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs font-medium text-stone-500 flex-wrap"
      >
        <Link href={localizePath('/', lang)} className="hover:text-slate-900">
          {copy.home}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={localizePath('/map', lang)} className="hover:text-slate-900">
          {copy.mapHub}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-semibold line-clamp-1">
          {getLocalizedMapText(spot.name, lang)}
        </span>
      </nav>

      {/* Main Editorial Spot Header + Gallery Card */}
      <section className="rounded-3xl bg-white border border-stone-200 p-5 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-1.5">
              {spot.groupIds.map((gId) => {
                const g = MAP_GROUPS[gId];
                return (
                  <span
                    key={gId}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-black ${g.badgeBg} ${g.badgeText}`}
                  >
                    {g.emoji} {g.name}
                  </span>
                );
              })}
              <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[11px] font-semibold">
                {ui.categories[spot.category]}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                <ShieldCheck className="w-3 h-3" />
                {ui.verifiedLabel} · {spot.lastVerifiedAt}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              {getLocalizedMapText(spot.name, lang)}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-600">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{getLocalizedMapText(spot.address, lang)}</span>
              </span>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-[#FAF8F5] hover:bg-stone-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                {copiedAddress ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3 text-stone-500" />
                )}
                <span>
                  {copiedAddress ? copy.copiedAddress : copy.copyAddress}
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleStamp}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold border transition-colors cursor-pointer ${
                isVisited
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isVisited ? copy.stampedVisited : copy.stampVisited}</span>
            </button>

            <button
              type="button"
              onClick={toggleSave}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100'
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isSaved ? 'fill-amber-500 text-amber-500' : ''
                }`}
              />
              <span>{isSaved ? ui.savedSpot : ui.saveSpot}</span>
            </button>
          </div>
        </div>

        {/* Photo Gallery */}
        <SpotGallery spot={spot} lang={lang} ui={ui} />

        {/* Member Tags + Story + Tip */}
        <div className="space-y-4">
          {spot.memberNames.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {spot.memberNames.map((member) => (
                <span
                  key={member}
                  className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-semibold"
                >
                  #{member}
                </span>
              ))}
            </div>
          )}

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {getLocalizedMapText(spot.story, lang)}
          </p>

          {spot.recommendedTip && (
            <div className="rounded-xl bg-amber-50/80 border border-amber-200/80 p-4 text-xs sm:text-sm text-amber-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{ui.tipLabel}</span>
              </div>
              <p className="leading-relaxed">
                {getLocalizedMapText(spot.recommendedTip, lang)}
              </p>
            </div>
          )}

          <div className="text-xs text-stone-500 font-medium">
            {ui.sourceLabel}: {getLocalizedMapText(spot.sourceNote, lang)}
          </div>
        </div>

        {/* 3-App Navigation Deep Links */}
        <div className="pt-4 border-t border-stone-200/80 space-y-2.5">
          <div className="text-xs sm:text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-emerald-700" />
            <span>{ui.openInMaps}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a
              href={navLinks.naver}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackMapNavClick({ spotId: spot.id, provider: 'naver', lang })
              }
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-colors"
            >
              <span>Naver Map</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={navLinks.kakao}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackMapNavClick({ spotId: spot.id, provider: 'kakao', lang })
              }
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs sm:text-sm font-bold transition-colors"
            >
              <span>KakaoMap</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={navLinks.google}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackMapNavClick({ spotId: spot.id, provider: 'google', lang })
              }
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-colors"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Travel Affiliate Essentials */}
      <TravelEssentialsBox
        offers={offers}
        lang={lang}
        spotSlug={spot.slug}
        region={spot.region}
      />

      {/* Interactive Area Map */}
      <section className="rounded-2xl bg-white border border-stone-200 p-5 sm:p-6 space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {copy.areaMapHeading}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">{copy.areaMapSub}</p>
        </div>

        <div className="h-[300px] sm:h-[360px] rounded-2xl overflow-hidden border border-stone-200">
          <LeafletMap
            spots={areaSpots}
            selectedSpotId={mapSelectedId}
            onSelectSpot={(picked) => setMapSelectedId(picked.id)}
            lang={lang}
            fitTrigger={fitTrigger}
            visitedIds={visitedIds}
          />
        </div>

        {focusedAreaSpot.id !== spot.id && (
          <div className="rounded-xl bg-[#FAF8F5] border border-stone-200 px-4 py-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">
                {getLocalizedMapText(focusedAreaSpot.name, lang)}
              </div>
              <div className="text-[11px] text-stone-500 truncate">
                {getLocalizedMapText(focusedAreaSpot.district, lang)}
              </div>
            </div>
            <Link
              href={localizePath(`/map/${focusedAreaSpot.slug}`, lang)}
              className="inline-flex items-center gap-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 text-xs font-semibold shrink-0"
            >
              <span>{copy.openSelectedNearby}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>

      {/* Courses Including This Spot */}
      {courses.length > 0 && (
        <section className="rounded-2xl bg-white border border-stone-200 p-5 sm:p-6 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Route className="w-5 h-5 text-emerald-700" />
            <span>{copy.coursesHeading}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={localizePath(`/map/course/${course.slug}`, lang)}
                className="rounded-xl border border-stone-200 bg-[#FAF8F5] hover:border-stone-400 p-4 flex items-center justify-between gap-3 transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <div className="text-xs font-mono text-stone-500">
                    {course.spotIds.length} {copy.stopsSuffix} ·{' '}
                    {course.durationHours}h
                  </div>
                  <div className="text-sm font-bold text-slate-900 line-clamp-1">
                    {getLocalizedMapText(course.title, lang)}
                  </div>
                  <div className="text-xs text-stone-600 line-clamp-1">
                    {getLocalizedMapText(course.subtitle, lang)}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-500 shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Nearby Spots Grid */}
      {nearbySpots.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {copy.nearbyHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {nearbySpots.map(({ spot: nearSpot, distanceKm }) => {
              const g = MAP_GROUPS[nearSpot.groupIds[0]];
              return (
                <Link
                  key={nearSpot.id}
                  href={localizePath(`/map/${nearSpot.slug}`, lang)}
                  className="rounded-2xl bg-white border border-stone-200 hover:border-stone-400 p-4 flex items-center gap-3.5 transition-colors"
                >
                  {nearSpot.photos?.[0]?.url && (
                    <img
                      src={nearSpot.photos[0].url}
                      alt={getLocalizedMapText(nearSpot.name, lang)}
                      className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                      loading="lazy"
                    />
                  )}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2 text-[11px] font-semibold">
                      <span className="text-stone-600">
                        {g.emoji} {g.name}
                      </span>
                      <span className="font-mono text-emerald-700 tabular-nums">
                        {distanceKm} {copy.awaySuffix}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 line-clamp-1">
                      {getLocalizedMapText(nearSpot.name, lang)}
                    </div>
                    <div className="text-xs text-stone-500 line-clamp-1">
                      {getLocalizedMapText(nearSpot.district, lang)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Quiz & Idol Chemistry CTAs */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href={localizePath(`/chemistry/${primaryGroup.id}`, lang)}
          className="rounded-2xl bg-white border border-stone-200 hover:border-rose-300 p-5 flex items-center justify-between gap-3 transition-colors"
        >
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600">
              <HeartHandshake className="w-4 h-4" />
              <span>{primaryGroup.name}</span>
            </div>
            <div className="text-sm font-bold text-slate-900">
              {copy.chemistryTitle}
            </div>
            <div className="text-xs text-stone-600">{copy.chemistrySub}</div>
          </div>
          <ArrowRight className="w-4 h-4 text-rose-600 shrink-0" />
        </Link>

        <Link
          href={localizePath(`/quiz/${primaryGroup.relatedQuizSlug}`, lang)}
          className="rounded-2xl bg-white border border-stone-200 hover:border-stone-400 p-5 flex items-center justify-between gap-3 transition-colors"
        >
          <div className="space-y-1 min-w-0">
            <div className="text-xs font-bold text-stone-600">
              {primaryGroup.emoji} {primaryGroup.fandom}
            </div>
            <div className="text-sm font-bold text-slate-900">
              {primaryGroup.name} Trivia & Fan Challenge
            </div>
            <div className="text-xs text-stone-600">{ui.relatedQuizCta}</div>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-500 shrink-0" />
        </Link>
      </section>

      {/* Spot FAQ Section */}
      {faqs.length > 0 && (
        <section className="rounded-2xl bg-white border border-stone-200 p-5 sm:p-7 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {copy.faqHeading}
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((item) => (
              <div key={item.question} className="space-y-1.5">
                <dt className="text-sm font-bold text-slate-900">
                  {item.question}
                </dt>
                <dd className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Back to Hub CTA */}
      <div className="text-center pt-2">
        <Link
          href={localizePath('/map', lang)}
          className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 transition-colors"
        >
          <MapPin className="w-4 h-4 text-emerald-700" />
          <span>{copy.backToMap}</span>
        </Link>
      </div>
    </div>
  );
}
