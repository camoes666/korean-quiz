'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  MapPin,
  Navigation,
  Route,
  Share2,
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
import { getSpotNavigationLinks } from '@/lib/mapGeo';
import { readVisitedSpotIds, writeVisitedSpotIds } from '@/lib/mapStorage';
import { getTravelOffersForCourse } from '@/lib/travelAffiliateBuilder';
import { trackMapStampSpot } from '@/lib/analytics';
import { localizePath } from '@/lib/i18nRoutes';
import type { Language } from '@/lib/translations';
import TravelEssentialsBox from './TravelEssentialsBox';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] sm:h-[400px] rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 text-xs font-semibold">
      Loading course route map...
    </div>
  ),
});

interface MapCourseClientProps {
  course: MapCourse;
  spots: MapSpot[];
  legDistancesKm: number[];
  totalDistanceKm: number;
  otherCourses: MapCourse[];
}

function getCourseUiCopy(lang: Language) {
  if (lang === 'ko') {
    return {
      home: '홈',
      mapHub: 'K-Pop 성지 지도',
      courses: '추천 코스',
      openFullMap: '전체 지도에서 동선 보기',
      copyCourseLink: '코스 링크 복사',
      copiedCourseLink: '복사됨 ✓',
      progressLabel: '코스 스탬프 달성률',
      durationSuffix: '시간 코스',
      stopsSuffix: '개 스팟',
      highlightsHeading: '이 코스의 하이라이트',
      timelineHeading: '순서별 이동 동선 타임라인',
      nextLegPrefix: '다음 스팟까지 약',
      viewSpotGuide: '상세 가이드',
      stampStop: '방문 체크 (+25 XP)',
      stampedStop: '방문 완료 ✓',
      otherCoursesHeading: '다른 추천 성지순례 코스',
    };
  }
  if (lang === 'es') {
    return {
      home: 'Inicio',
      mapHub: 'Mapa K-Pop',
      courses: 'Itinerarios',
      openFullMap: 'Abrir Ruta en Mapa Completo',
      copyCourseLink: 'Copiar Enlace',
      copiedCourseLink: 'Copiado ✓',
      progressLabel: 'Pasaporte de esta ruta',
      durationSuffix: 'h aprox.',
      stopsSuffix: 'paradas',
      highlightsHeading: 'Lo mejor de este recorrido',
      timelineHeading: 'Itinerario Paso a Paso',
      nextLegPrefix: 'Siguiente tramo aprox.',
      viewSpotGuide: 'Guía del Lugar',
      stampStop: 'Sellar (+25 XP)',
      stampedStop: 'Visitado ✓',
      otherCoursesHeading: 'Otros Itinerarios K-Pop Recomendados',
    };
  }
  if (lang === 'pt') {
    return {
      home: 'Início',
      mapHub: 'Mapa K-Pop',
      courses: 'Roteiros',
      openFullMap: 'Abrir Roteiro no Mapa',
      copyCourseLink: 'Copiar Link',
      copiedCourseLink: 'Copiado ✓',
      progressLabel: 'Progresso deste roteiro',
      durationSuffix: 'h aprox.',
      stopsSuffix: 'paradas',
      highlightsHeading: 'Destaques deste roteiro',
      timelineHeading: 'Roteiro Passo a Passo',
      nextLegPrefix: 'Próximo trecho aprox.',
      viewSpotGuide: 'Guia do Local',
      stampStop: 'Carimbar (+25 XP)',
      stampedStop: 'Visitado ✓',
      otherCoursesHeading: 'Outros Roteiros Recomendados na Coreia',
    };
  }
  return {
    home: 'Home',
    mapHub: 'K-Pop Star Map',
    courses: 'Courses',
    openFullMap: 'Open Route on Full Map',
    copyCourseLink: 'Copy Course Link',
    copiedCourseLink: 'Copied ✓',
    progressLabel: 'Course Stamp Progress',
    durationSuffix: 'hrs',
    stopsSuffix: 'stops',
    highlightsHeading: 'Course Highlights',
    timelineHeading: 'Step-by-Step Stop Timeline',
    nextLegPrefix: 'Next leg ~',
    viewSpotGuide: 'Spot Guide',
    stampStop: 'Stamp (+25 XP)',
    stampedStop: 'Visited ✓',
    otherCoursesHeading: 'More Curated K-Pop Itineraries',
  };
}

export default function MapCourseClient({
  course,
  spots,
  legDistancesKm,
  totalDistanceKm,
  otherCourses,
}: MapCourseClientProps) {
  const { lang } = useLanguage();
  const { addXP } = useGame();
  const ui = MAP_TRANSLATIONS[lang] || MAP_TRANSLATIONS.en;
  const copy = getCourseUiCopy(lang);

  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(
    spots[0]?.id ?? null
  );
  const [fitTrigger, setFitTrigger] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const awardedStampIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const localVisited = readVisitedSpotIds();
      localVisited.forEach((id) => awardedStampIdsRef.current.add(id));
      setVisitedIds(localVisited);
      setFitTrigger((c) => c + 1);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [course.slug]);

  const toggleStamp = useCallback(
    (spotId: string) => {
      const willVisit = !visitedIds.includes(spotId);
      const nextCount = willVisit
        ? visitedIds.length + 1
        : Math.max(0, visitedIds.length - 1);
      trackMapStampSpot({
        spotId,
        visited: willVisit,
        totalVisited: nextCount,
        lang,
      });
      if (willVisit && !awardedStampIdsRef.current.has(spotId)) {
        awardedStampIdsRef.current.add(spotId);
        addXP(25);
      }
      setVisitedIds((prev) => {
        const next = prev.includes(spotId)
          ? prev.filter((id) => id !== spotId)
          : [...prev, spotId];
        writeVisitedSpotIds(next);
        return next;
      });
    },
    [visitedIds, addXP, lang]
  );

  const handleCopyCourseLink = async () => {
    const url = `${window.location.origin}${localizePath(`/map/course/${course.slug}`, lang)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      // Ignore clipboard failure
    }
  };

  const stampedInCourseCount = useMemo(
    () => spots.filter((s) => visitedIds.includes(s.id)).length,
    [spots, visitedIds]
  );
  const progressPct =
    spots.length > 0
      ? Math.round((stampedInCourseCount / spots.length) * 100)
      : 0;

  const groupMeta =
    course.groupId !== 'all' ? MAP_GROUPS[course.groupId] : null;
  const offers = useMemo(
    () => getTravelOffersForCourse(course, lang),
    [course, lang]
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
          {getLocalizedMapText(course.title, lang)}
        </span>
      </nav>

      {/* Course Header & Progress */}
      <section className="rounded-3xl bg-white border border-stone-200 p-5 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-[11px] font-black ${
                  groupMeta
                    ? `${groupMeta.badgeBg} ${groupMeta.badgeText}`
                    : 'bg-emerald-50 text-emerald-800'
                }`}
              >
                <span>{groupMeta ? groupMeta.emoji : '🗺️'}</span>
                <span>{groupMeta ? groupMeta.name : 'ALL-IN-ONE'}</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-0.5 text-[11px] font-mono text-stone-700">
                <Clock className="w-3 h-3" /> {course.durationHours}{' '}
                {copy.durationSuffix}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-0.5 text-[11px] font-mono text-stone-700">
                {spots.length} {copy.stopsSuffix} · {totalDistanceKm} km
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              {getLocalizedMapText(course.title, lang)}
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {getLocalizedMapText(course.description, lang)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              href={localizePath(`/map?course=${course.slug}`, lang)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 text-xs font-bold transition-colors"
            >
              <Route className="w-4 h-4" />
              <span>{copy.openFullMap}</span>
            </Link>

            <button
              type="button"
              onClick={handleCopyCourseLink}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-[#FAF8F5] hover:bg-stone-100 text-slate-800 px-3.5 py-2.5 text-xs font-bold transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4 text-stone-600" />
              )}
              <span>
                {copiedLink ? copy.copiedCourseLink : copy.copyCourseLink}
              </span>
            </button>
          </div>
        </div>

        {/* Highlights + Stamp Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2">
          <div className="lg:col-span-8 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 p-4 space-y-2">
            <div className="text-xs font-bold text-slate-800">
              {copy.highlightsHeading}
            </div>
            <ul className="space-y-1.5">
              {course.highlights.map((h, i) => (
                <li
                  key={i}
                  className="text-xs text-stone-700 flex items-start gap-2"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: course.color }}
                  />
                  <span>{getLocalizedMapText(h, lang)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 p-4 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">
                {copy.progressLabel}
              </span>
              <span className="font-mono font-bold text-emerald-700 tabular-nums">
                {stampedInCourseCount} / {spots.length}
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-600 transition-[width] duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="text-[11px] font-mono text-stone-500 tabular-nums">
              {progressPct}% complete
            </div>
          </div>
        </div>
      </section>

      {/* Route Map */}
      <section className="rounded-2xl bg-white border border-stone-200 p-2 shadow-xs">
        <div className="h-[320px] sm:h-[420px] rounded-xl overflow-hidden">
          <LeafletMap
            spots={spots}
            selectedSpotId={selectedSpotId}
            onSelectSpot={(picked) => setSelectedSpotId(picked.id)}
            lang={lang}
            fitTrigger={fitTrigger}
            routeLine
            numberedMarkers
            routeColor={course.color}
            visitedIds={visitedIds}
          />
        </div>
      </section>

      {/* Step-by-Step Timeline */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          {copy.timelineHeading}
        </h2>

        <div className="space-y-3">
          {spots.map((spot, idx) => {
            const isVisited = visitedIds.includes(spot.id);
            const isFocused = selectedSpotId === spot.id;
            const navLinks = getSpotNavigationLinks(spot);
            const nextLegKm =
              idx < legDistancesKm.length ? legDistancesKm[idx] : null;

            return (
              <div key={spot.id} className="space-y-3">
                <div
                  onClick={() => setSelectedSpotId(spot.id)}
                  className={`rounded-2xl bg-white border p-4 sm:p-5 transition-colors ${
                    isFocused
                      ? 'border-slate-900 ring-1 ring-slate-900/10'
                      : 'border-stone-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Number badge + thumbnail */}
                    <div className="flex items-start gap-3 shrink-0">
                      <span
                        className="w-8 h-8 rounded-full text-white text-sm font-black inline-flex items-center justify-center shrink-0"
                        style={{ backgroundColor: course.color }}
                      >
                        {idx + 1}
                      </span>
                      {spot.photos?.[0]?.url && (
                        <img
                          src={spot.photos[0].url}
                          alt={getLocalizedMapText(spot.name, lang)}
                          className="w-24 h-20 rounded-xl object-cover border border-stone-200"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Spot Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="space-y-1 min-w-0">
                          <div className="text-[11px] font-mono text-stone-500">
                            {ui.categories[spot.category]} ·{' '}
                            {getLocalizedMapText(spot.district, lang)}
                          </div>
                          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                            <Link
                              href={localizePath(`/map/${spot.slug}`, lang)}
                              className="hover:underline underline-offset-2"
                            >
                              {getLocalizedMapText(spot.name, lang)}
                            </Link>
                          </h3>
                          <p className="text-xs text-stone-500 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            <span>{getLocalizedMapText(spot.address, lang)}</span>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStamp(spot.id);
                          }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer shrink-0 ${
                            isVisited
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {isVisited ? copy.stampedStop : copy.stampStop}
                          </span>
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {getLocalizedMapText(spot.story, lang)}
                      </p>

                      {spot.recommendedTip && (
                        <div className="text-xs text-amber-900 bg-amber-50/70 border border-amber-200/70 rounded-lg px-3 py-2">
                          <strong className="font-semibold">
                            {ui.tipLabel}:
                          </strong>{' '}
                          {getLocalizedMapText(spot.recommendedTip, lang)}
                        </div>
                      )}

                      <div className="pt-1 flex flex-wrap items-center gap-2">
                        <a
                          href={navLinks.naver}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 text-[11px] font-bold"
                        >
                          <Navigation className="w-3 h-3" />
                          <span>Naver</span>
                        </a>
                        <a
                          href={navLinks.kakao}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-900 px-2.5 py-1 text-[11px] font-bold"
                        >
                          <span>Kakao</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href={navLinks.google}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-1 text-[11px] font-bold"
                        >
                          <span>Google</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <Link
                          href={localizePath(`/map/${spot.slug}`, lang)}
                          onClick={(e) => e.stopPropagation()}
                          className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-emerald-700"
                        >
                          <span>{copy.viewSpotGuide}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {nextLegKm !== null && (
                  <div className="pl-6 flex items-center gap-2 text-[11px] font-mono text-stone-500">
                    <span className="h-5 w-px bg-stone-300" />
                    <span>
                      {copy.nextLegPrefix} {nextLegKm} km →
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Travel Essentials Affiliate Module */}
      <TravelEssentialsBox
        offers={offers}
        lang={lang}
        courseSlug={course.slug}
        region={course.region}
      />

      {/* Other Recommended Courses */}
      {otherCourses.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {copy.otherCoursesHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {otherCourses.map((other) => (
              <Link
                key={other.id}
                href={localizePath(`/map/course/${other.slug}`, lang)}
                className="rounded-2xl bg-white border border-stone-200 hover:border-stone-400 p-4 space-y-1.5 transition-colors"
              >
                <div className="text-[11px] font-mono text-stone-500">
                  {other.spotIds.length} {copy.stopsSuffix} ·{' '}
                  {other.durationHours}h
                </div>
                <div className="text-sm font-bold text-slate-900 line-clamp-1">
                  {getLocalizedMapText(other.title, lang)}
                </div>
                <div className="text-xs text-stone-600 line-clamp-2">
                  {getLocalizedMapText(other.subtitle, lang)}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
