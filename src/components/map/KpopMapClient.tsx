'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  MapPin,
  Search,
  Bookmark,
  Share2,
  Check,
  CheckCircle2,
  Clock,
  Navigation,
  ExternalLink,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Maximize2,
  List,
  Map as MapIcon,
  X,
  ArrowRight,
  Camera,
  HeartHandshake,
  Route,
  Stamp,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';
import { MAP_GROUPS, MAP_SPOTS, filterMapSpots } from '@/data/mapSpots';
import {
  MAP_COURSES,
  getCourseBySlug,
  getCourseSpots,
  getCourseTotalDistanceKm,
} from '@/data/mapCourses';
import { MAP_TRANSLATIONS } from '@/lib/mapTranslations';
import { GroupId, MapSpot, SpotCategory, getLocalizedMapText } from '@/types/map';
import { getSpotNavigationLinks } from '@/lib/mapGeo';
import {
  readSavedSpotIds,
  readVisitedSpotIds,
  writeSavedSpotIds,
  writeVisitedSpotIds,
} from '@/lib/mapStorage';
import { getTravelOffersForSpot } from '@/lib/travelAffiliateBuilder';
import SpotGallery from './SpotGallery';
import TravelEssentialsBox from './TravelEssentialsBox';
import {
  trackMapSpotClick,
  trackMapNavClick,
  trackMapSaveSpot,
  trackMapStampSpot,
  trackMapCourseSelect,
} from '@/lib/analytics';
import { localizePath } from '@/lib/i18nRoutes';
import type { Language } from '@/lib/translations';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 text-sm font-semibold">
      Loading interactive map...
    </div>
  ),
});

const CATEGORY_META: Array<{ id: SpotCategory; emoji: string }> = [
  { id: 'restaurant', emoji: '🍜' },
  { id: 'agency', emoji: '🏢' },
  { id: 'hometown', emoji: '🏠' },
  { id: 'filming', emoji: '🎬' },
];

function getPlannerUiCopy(lang: Language) {
  if (lang === 'ko') {
    return {
      passportLabel: '성지 스탬프 여권',
      visitedSuffix: '방문 완료',
      coursesHeading: '추천 성지순례 코스',
      coursesSub: '코스를 클릭하면 지도에 이동선(Polyline)과 순서 번호 핀이 표시됩니다',
      stopsLabel: '개 스팟',
      previewActive: '코스 보기 중',
      previewCta: '지도에서 동선 보기',
      courseGuideLink: '상세 일정',
      fullCourseGuide: '전체 코스 가이드 보기',
      exitCourse: '코스 닫기',
      stampVisited: '방문 스탬프 (+25 XP)',
      stampedVisited: '방문 완료 ✓',
      fullSpotGuide: '상세 주소 · 주변 스팟 · 여행 팁 보기',
      chemistryCta: '이 그룹 K-사주 × MBTI 궁합 보기',
      courseDirectoryTitle: '추천 성지순례 일일 코스',
    };
  }
  if (lang === 'es') {
    return {
      passportLabel: 'Pasaporte de Viaje',
      visitedSuffix: 'sellados',
      coursesHeading: 'Rutas Recomendadas (Itinerarios)',
      coursesSub: 'Toca una ruta para trazar el recorrido numerado en el mapa',
      stopsLabel: 'paradas',
      previewActive: 'Ruta Activa',
      previewCta: 'Trazar en Mapa',
      courseGuideLink: 'Ver Guía',
      fullCourseGuide: 'Abrir Guía Completa de Ruta',
      exitCourse: 'Salir de Ruta',
      stampVisited: 'Sellar Visita (+25 XP)',
      stampedVisited: 'Visitado ✓',
      fullSpotGuide: 'Ver Guía Completa y Lugares Cercanos',
      chemistryCta: 'Compatibilidad K-Saju × MBTI del Grupo',
      courseDirectoryTitle: 'Itinerarios Curados de Peregrinaje',
    };
  }
  if (lang === 'pt') {
    return {
      passportLabel: 'Passaporte K-Pop',
      visitedSuffix: 'carimbados',
      coursesHeading: 'Roteiros Recomendados',
      coursesSub: 'Clique em um roteiro para ver o trajeto numerado no mapa',
      stopsLabel: 'paradas',
      previewActive: 'Roteiro Ativo',
      previewCta: 'Traçar no Mapa',
      courseGuideLink: 'Ver Guia',
      fullCourseGuide: 'Abrir Guia Completo do Roteiro',
      exitCourse: 'Sair do Roteiro',
      stampVisited: 'Carimbar Visita (+25 XP)',
      stampedVisited: 'Visitado ✓',
      fullSpotGuide: 'Ver Guia Completo e Locais Próximos',
      chemistryCta: 'Compatibilidade K-Saju × MBTI do Grupo',
      courseDirectoryTitle: 'Roteiros Curados na Coreia',
    };
  }
  return {
    passportLabel: 'Pilgrimage Passport',
    visitedSuffix: 'visited',
    coursesHeading: 'Curated Itinerary Courses',
    coursesSub: 'Select any course to draw its numbered walking/transit route on the map',
    stopsLabel: 'stops',
    previewActive: 'Active Route',
    previewCta: 'Preview Route',
    courseGuideLink: 'Full Guide',
    fullCourseGuide: 'Open Full Course Guide',
    exitCourse: 'Exit Course',
    stampVisited: 'Stamp Visited (+25 XP)',
    stampedVisited: 'Visited ✓',
    fullSpotGuide: 'Full Spot Guide & Nearby Spots',
    chemistryCta: '1:1 K-Saju × MBTI Chemistry Lab',
    courseDirectoryTitle: 'Curated Pilgrimage Itinerary Guides',
  };
}

export default function KpopMapClient() {
  const { lang } = useLanguage();
  const { addXP } = useGame();
  const ui = MAP_TRANSLATIONS[lang] || MAP_TRANSLATIONS.en;
  const pui = getPlannerUiCopy(lang);

  const [selectedGroup, setSelectedGroup] = useState<GroupId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<SpotCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySaved, setOnlySaved] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [activeCourseSlug, setActiveCourseSlug] = useState<string | null>(null);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(MAP_SPOTS[0]?.id ?? null);
  const [mobileView, setMobileView] = useState<'map' | 'list'>('map');
  const [fitTrigger, setFitTrigger] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const awardedStampIdsRef = useRef<Set<string>>(new Set());

  // Hydrate saved spots, stamped spots, and URL query params (?course=..., ?spots=..., ?group=...)
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const localSaved = readSavedSpotIds();
        const localVisited = readVisitedSpotIds();
        localVisited.forEach((id) => awardedStampIdsRef.current.add(id));
        setVisitedIds(localVisited);

        const params = new URLSearchParams(window.location.search);

        const courseParam = params.get('course');
        if (courseParam) {
          const matchedCourse = getCourseBySlug(courseParam);
          if (matchedCourse) {
            setActiveCourseSlug(matchedCourse.slug);
            const firstStop = getCourseSpots(matchedCourse)[0];
            if (firstStop) setSelectedSpotId(firstStop.id);
            setSavedIds(localSaved);
            setFitTrigger((c) => c + 1);
            return;
          }
        }

        const groupParam = params.get('group') as GroupId | null;
        if (groupParam && groupParam in MAP_GROUPS) {
          setSelectedGroup(groupParam);
          const firstGroupSpot = MAP_SPOTS.find((spot) => spot.groupIds.includes(groupParam));
          if (firstGroupSpot) {
            setSelectedSpotId(firstGroupSpot.id);
          }
          setFitTrigger((c) => c + 1);
        }

        const spotsParam = params.get('spots');
        if (spotsParam) {
          const sharedIds = spotsParam
            .split(',')
            .map((s) => s.trim())
            .filter((id) => MAP_SPOTS.some((spot) => spot.id === id));
          if (sharedIds.length > 0) {
            const merged = Array.from(new Set([...localSaved, ...sharedIds]));
            setSavedIds(merged);
            setOnlySaved(true);
            setSelectedSpotId(sharedIds[0]);
            setFitTrigger((c) => c + 1);
            return;
          }
        }

        setSavedIds(localSaved);
      } catch {
        // Ignore storage/URL parsing errors
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleSaveSpot = useCallback(
    (spotId: string) => {
      const willSave = !savedIds.includes(spotId);
      const nextCount = willSave ? savedIds.length + 1 : Math.max(0, savedIds.length - 1);
      trackMapSaveSpot({
        spotId,
        saved: willSave,
        totalSaved: nextCount,
        lang,
      });

      setSavedIds((prev) => {
        const next = prev.includes(spotId)
          ? prev.filter((id) => id !== spotId)
          : [...prev, spotId];
        writeSavedSpotIds(next);
        return next;
      });
    },
    [savedIds, lang]
  );

  const toggleVisitedSpot = useCallback(
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

  const activeCourse = useMemo(
    () => (activeCourseSlug ? getCourseBySlug(activeCourseSlug) ?? null : null),
    [activeCourseSlug]
  );

  const filteredSpots = useMemo(() => {
    return filterMapSpots({
      groupId: selectedGroup,
      category: selectedCategory,
      query: searchQuery,
      savedIds,
      onlySaved,
    });
  }, [selectedGroup, selectedCategory, searchQuery, savedIds, onlySaved]);

  const displayedSpots = useMemo(() => {
    if (activeCourse) {
      return getCourseSpots(activeCourse);
    }
    return filteredSpots;
  }, [activeCourse, filteredSpots]);

  const selectedSpot = useMemo(() => {
    if (displayedSpots.length === 0) return null;
    if (selectedSpotId) {
      const exact = displayedSpots.find((s) => s.id === selectedSpotId);
      if (exact) return exact;
    }
    return displayedSpots[0];
  }, [displayedSpots, selectedSpotId]);

  const detailCardRef = useRef<HTMLDivElement>(null);

  const scrollToDetailOnMobile = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      window.setTimeout(() => {
        detailCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 120);
    }
  }, []);

  const handleSelectSpot = useCallback(
    (spot: MapSpot, source: 'marker' | 'list' | 'directory' = 'marker') => {
      setSelectedSpotId(spot.id);
      trackMapSpotClick({
        spotId: spot.id,
        groupId: spot.groupIds[0] || 'all',
        category: spot.category,
        source,
        lang,
      });
      scrollToDetailOnMobile();
    },
    [scrollToDetailOnMobile, lang]
  );

  // Warm browser cache for the representative photo of visible spots after initial render
  useEffect(() => {
    const timer = window.setTimeout(() => {
      displayedSpots.forEach((spot) => {
        const firstUrl = spot.photos?.[0]?.url;
        if (!firstUrl || spot.id === selectedSpotId) return;
        const img = new window.Image();
        img.decoding = 'async';
        img.src = firstUrl;
      });
    }, 400);
    return () => window.clearTimeout(timer);
  }, [displayedSpots, selectedSpotId]);

  const handleToggleCourse = (slug: string) => {
    if (activeCourseSlug === slug) {
      setActiveCourseSlug(null);
      setFitTrigger((c) => c + 1);
      return;
    }
    const course = getCourseBySlug(slug);
    if (!course) return;
    setActiveCourseSlug(slug);
    setOnlySaved(false);
    const firstSpot = getCourseSpots(course)[0];
    if (firstSpot) setSelectedSpotId(firstSpot.id);
    setFitTrigger((c) => c + 1);
    setMobileView('map');
    trackMapCourseSelect({
      courseSlug: slug,
      groupId: course.groupId,
      source: 'map_strip',
      lang,
    });
  };

  const handleResetFilters = () => {
    setSelectedGroup('all');
    setSelectedCategory('all');
    setSearchQuery('');
    setOnlySaved(false);
    setActiveCourseSlug(null);
    setFitTrigger((c) => c + 1);
  };

  const handleShareTrip = async () => {
    const localizedMap = localizePath('/map', lang);
    const url = activeCourse
      ? `${window.location.origin}${localizedMap}?course=${encodeURIComponent(activeCourse.slug)}`
      : `${window.location.origin}${localizedMap}?spots=${encodeURIComponent(
          (savedIds.length > 0 ? savedIds : displayedSpots.slice(0, 5).map((s) => s.id)).join(',')
        )}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      window.prompt('Copy your K-Pop Pilgrimage Trip link:', url);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Hero Header */}
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-extrabold tracking-wider text-amber-300">
              <MapPin className="w-3.5 h-3.5" />
              <span>{ui.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {ui.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {ui.subtitle}
            </p>
          </div>

          {/* Pilgrimage Passport Progress Pill */}
          <div className="shrink-0 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Stamp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-300">
                {pui.passportLabel}
              </div>
              <div className="text-sm font-black text-white tabular-nums">
                {visitedIds.length} / {MAP_SPOTS.length}{' '}
                <span className="text-xs font-semibold text-emerald-300">
                  {pui.visitedSuffix}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Courses Strip */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Route className="w-4 h-4 text-emerald-700" />
              <span>{pui.coursesHeading}</span>
            </h2>
            <p className="text-xs text-slate-500">{pui.coursesSub}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MAP_COURSES.map((course) => {
            const isActive = activeCourseSlug === course.slug;
            const totalKm = getCourseTotalDistanceKm(course);
            const groupMeta =
              course.groupId !== 'all' ? MAP_GROUPS[course.groupId] : null;
            return (
              <div
                key={course.id}
                onClick={() => handleToggleCourse(course.slug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggleCourse(course.slug);
                  }
                }}
                className={`rounded-2xl border p-4 text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-900 border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? 'bg-white/15 text-white'
                          : groupMeta
                          ? `${groupMeta.badgeBg} ${groupMeta.badgeText}`
                          : 'bg-emerald-50 text-emerald-800'
                      }`}
                    >
                      <span>{groupMeta ? groupMeta.emoji : '🗺️'}</span>
                      <span>{groupMeta ? groupMeta.name : 'ALL-IN-ONE'}</span>
                    </span>
                    <span
                      className={`text-[11px] font-mono tabular-nums ${
                        isActive ? 'text-emerald-300' : 'text-stone-500'
                      }`}
                    >
                      {course.spotIds.length} {pui.stopsLabel} · {course.durationHours}h · {totalKm} km
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold leading-snug line-clamp-1">
                    {getLocalizedMapText(course.title, lang)}
                  </h3>
                  <p
                    className={`text-xs line-clamp-1 ${
                      isActive ? 'text-slate-300' : 'text-stone-600'
                    }`}
                  >
                    {getLocalizedMapText(course.subtitle, lang)}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-current/10 text-[11px] font-semibold">
                  <span
                    className={
                      isActive ? 'text-amber-300' : 'text-emerald-800'
                    }
                  >
                    {isActive ? pui.previewActive : pui.previewCta}
                  </span>
                  <Link
                    href={localizePath(`/map/course/${course.slug}`, lang)}
                    onClick={(e) => {
                      e.stopPropagation();
                      trackMapCourseSelect({
                        courseSlug: course.slug,
                        groupId: course.groupId,
                        source: 'course_directory',
                        lang,
                      });
                    }}
                    className={`inline-flex items-center gap-1 underline-offset-2 hover:underline ${
                      isActive ? 'text-white' : 'text-stone-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{pui.courseGuideLink}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Active Course Banner */}
      {activeCourse && (
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: activeCourse.color }}
            />
            <div className="min-w-0">
              <div className="text-xs font-extrabold text-slate-900 truncate">
                {getLocalizedMapText(activeCourse.title, lang)}
              </div>
              <div className="text-[11px] text-slate-600 flex items-center gap-2">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {activeCourse.durationHours}h
                </span>
                <span>·</span>
                <span>
                  {displayedSpots.length} {pui.stopsLabel} ({getCourseTotalDistanceKm(activeCourse)} km)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={localizePath(`/map/course/${activeCourse.slug}`, lang)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 text-xs font-bold transition-colors"
            >
              <span>{pui.fullCourseGuide}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => {
                setActiveCourseSlug(null);
                setFitTrigger((c) => c + 1);
              }}
              className="inline-flex items-center gap-1 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-slate-700 px-3 py-2 text-xs font-bold transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>{pui.exitCourse}</span>
            </button>
          </div>
        </section>
      )}

      {/* Filter & Search Bar */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Group Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setActiveCourseSlug(null);
                setSelectedGroup('all');
                setFitTrigger((c) => c + 1);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                !activeCourse && selectedGroup === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {ui.allGroups} ({MAP_SPOTS.length})
            </button>
            {(Object.keys(MAP_GROUPS) as GroupId[]).map((gId) => {
              const g = MAP_GROUPS[gId];
              const count = MAP_SPOTS.filter((s) => s.groupIds.includes(gId)).length;
              const active = !activeCourse && selectedGroup === gId;
              return (
                <button
                  key={gId}
                  onClick={() => {
                    setActiveCourseSlug(null);
                    setSelectedGroup(gId);
                    setFitTrigger((c) => c + 1);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer border ${
                    active
                      ? 'text-white border-transparent shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                  style={active ? { backgroundColor: g.color } : undefined}
                >
                  <span>{g.emoji}</span>
                  <span>{g.name}</span>
                  <span className="opacity-75 text-[11px]">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Search + Saved + Share */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setActiveCourseSlug(null);
                  setSearchQuery(e.target.value);
                }}
                placeholder={ui.searchPlaceholder}
                className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => {
                setActiveCourseSlug(null);
                setOnlySaved((prev) => !prev);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                onlySaved
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{ui.savedOnly}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black">
                {savedIds.length}
              </span>
            </button>

            <button
              onClick={handleShareTrip}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? ui.tripCopied : ui.shareTrip}</span>
            </button>
          </div>
        </div>

        {/* Category Filter Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                setActiveCourseSlug(null);
                setSelectedCategory('all');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                !activeCourse && selectedCategory === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {ui.allCategories}
            </button>
            {CATEGORY_META.map((cat) => {
              const active = !activeCourse && selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCourseSlug(null);
                    setSelectedCategory(cat.id);
                  }}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    active
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{ui.categories[cat.id]}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <span>
              <strong className="text-slate-900">{displayedSpots.length}</strong> {ui.spotsFound}
            </span>
            <button
              onClick={() => setFitTrigger((c) => c + 1)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3 h-3" />
              <span>{ui.fitAll}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Mobile View Switcher */}
      <div className="flex lg:hidden rounded-xl bg-slate-100 p-1">
        <button
          onClick={() => setMobileView('map')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-extrabold transition-all ${
            mobileView === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
          }`}
        >
          <MapIcon className="w-3.5 h-3.5" />
          <span>{ui.mapView}</span>
        </button>
        <button
          onClick={() => setMobileView('list')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-extrabold transition-all ${
            mobileView === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
          }`}
        >
          <List className="w-3.5 h-3.5" />
          <span>
            {ui.listView} ({displayedSpots.length})
          </span>
        </button>
      </div>

      {/* Main Workspace: Left Spot List + Right Map & Detail */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left List Panel */}
        <div
          className={`lg:col-span-5 space-y-2.5 lg:max-h-[640px] lg:overflow-y-auto lg:pr-1 ${
            mobileView === 'list' ? 'block' : 'hidden lg:block'
          }`}
        >
          {displayedSpots.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <p className="text-sm font-bold text-slate-600">{ui.noSpotsFound}</p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-purple-600 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{ui.resetFilters}</span>
              </button>
            </div>
          ) : (
            displayedSpots.map((spot, idx) => {
              const isSelected = spot.id === selectedSpot?.id;
              const isSaved = savedIds.includes(spot.id);
              const isVisited = visitedIds.includes(spot.id);
              const primaryGroup = MAP_GROUPS[spot.groupIds[0]];
              const catEmoji = CATEGORY_META.find((c) => c.id === spot.category)?.emoji ?? '📍';

              return (
                <div
                  key={spot.id}
                  onClick={() => {
                    handleSelectSpot(spot, 'list');
                    setMobileView('map');
                  }}
                  className={`rounded-2xl border p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-50/60 border-purple-400 shadow-sm ring-2 ring-purple-500/15'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {activeCourse && (
                        <span
                          className="w-5 h-5 rounded-full text-white text-[11px] font-black inline-flex items-center justify-center shrink-0"
                          style={{ backgroundColor: activeCourse.color }}
                        >
                          {idx + 1}
                        </span>
                      )}
                      {spot.groupIds.map((gId) => {
                        const g = MAP_GROUPS[gId];
                        return (
                          <span
                            key={gId}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${g.badgeBg} ${g.badgeText}`}
                          >
                            {g.emoji} {g.name}
                          </span>
                        );
                      })}
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {catEmoji} {ui.categories[spot.category]}
                      </span>
                      {isVisited && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>✓</span>
                        </span>
                      )}
                      {(spot.photos?.length || spot.youtubeEmbedId) && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                          <Camera className="w-2.5 h-2.5" />
                          {(spot.photos?.length ?? 0) + (spot.youtubeEmbedId ? 1 : 0)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveSpot(spot.id);
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-amber-500 transition-colors"
                      aria-label={isSaved ? ui.savedSpot : ui.saveSpot}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-500' : ''}`}
                      />
                    </button>
                  </div>

                  <h3 className="mt-2 font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                    {getLocalizedMapText(spot.name, lang)}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3 shrink-0" style={{ color: primaryGroup.color }} />
                    <span>{getLocalizedMapText(spot.district, lang)}</span>
                  </p>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {getLocalizedMapText(spot.story, lang)}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Right Map + Selected Spot Detail Card */}
        <div
          className={`lg:col-span-7 space-y-4 ${
            mobileView === 'map' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="bg-white rounded-2xl border border-slate-200 p-1.5 shadow-sm h-[300px] sm:h-[420px] lg:h-[480px]">
            <LeafletMap
              spots={displayedSpots}
              selectedSpotId={selectedSpot?.id ?? null}
              onSelectSpot={handleSelectSpot}
              lang={lang}
              fitTrigger={fitTrigger}
              routeLine={Boolean(activeCourse)}
              numberedMarkers={Boolean(activeCourse)}
              routeColor={activeCourse?.color}
              visitedIds={visitedIds}
            />
          </div>

          {/* Selected Spot Detail Card */}
          {selectedSpot && (
            <div
              ref={detailCardRef}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4"
            >
              <SpotGallery key={selectedSpot.id} spot={selectedSpot} lang={lang} ui={ui} />

              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {selectedSpot.groupIds.map((gId) => {
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
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" />
                      {ui.verifiedLabel} · {selectedSpot.lastVerifiedAt}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">
                    {getLocalizedMapText(selectedSpot.name, lang)}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    📍 {getLocalizedMapText(selectedSpot.address, lang)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => toggleVisitedSpot(selectedSpot.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold border transition-colors cursor-pointer ${
                      visitedIds.includes(selectedSpot.id)
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {visitedIds.includes(selectedSpot.id)
                        ? pui.stampedVisited
                        : pui.stampVisited}
                    </span>
                  </button>

                  <button
                    onClick={() => toggleSaveSpot(selectedSpot.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold border transition-colors cursor-pointer ${
                      savedIds.includes(selectedSpot.id)
                        ? 'bg-amber-50 border-amber-300 text-amber-800'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        savedIds.includes(selectedSpot.id) ? 'fill-amber-500 text-amber-500' : ''
                      }`}
                    />
                    <span>
                      {savedIds.includes(selectedSpot.id) ? ui.savedSpot : ui.saveSpot}
                    </span>
                  </button>
                </div>
              </div>

              {/* Member tags */}
              {selectedSpot.memberNames.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {selectedSpot.memberNames.map((member) => (
                    <span
                      key={member}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold"
                    >
                      #{member}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-sm text-slate-700 leading-relaxed">
                {getLocalizedMapText(selectedSpot.story, lang)}
              </p>

              {selectedSpot.recommendedTip && (
                <div className="rounded-xl bg-amber-50/80 border border-amber-200/80 p-3.5 text-xs text-amber-900 space-y-1">
                  <div className="font-black flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{ui.tipLabel}</span>
                  </div>
                  <p className="leading-relaxed">
                    {getLocalizedMapText(selectedSpot.recommendedTip, lang)}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 font-semibold">
                <span>
                  {ui.sourceLabel}: {getLocalizedMapText(selectedSpot.sourceNote, lang)}
                </span>
                <Link
                  href={localizePath(`/map/${selectedSpot.slug}`, lang)}
                  className="inline-flex items-center gap-1 font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span>{pui.fullSpotGuide}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 3-App Navigation Deep Links */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-purple-600" />
                  <span>{ui.openInMaps}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(() => {
                    const links = getSpotNavigationLinks(selectedSpot);
                    return (
                      <>
                        <a
                          href={links.naver}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackMapNavClick({
                              spotId: selectedSpot.id,
                              provider: 'naver',
                              lang,
                            })
                          }
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-colors"
                        >
                          <span>Naver Map</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href={links.kakao}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackMapNavClick({
                              spotId: selectedSpot.id,
                              provider: 'kakao',
                              lang,
                            })
                          }
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-extrabold transition-colors"
                        >
                          <span>KakaoMap</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href={links.google}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackMapNavClick({
                              spotId: selectedSpot.id,
                              provider: 'google',
                              lang,
                            })
                          }
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition-colors"
                        >
                          <span>Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Travel Essentials Affiliate Module */}
              <TravelEssentialsBox
                offers={getTravelOffersForSpot(selectedSpot, lang)}
                lang={lang}
                spotSlug={selectedSpot.slug}
                region={selectedSpot.region}
                compact
              />

              {/* Related K-Pulse Quiz + Chemistry CTAs */}
              {(() => {
                const primaryGroup = MAP_GROUPS[selectedSpot.groupIds[0]];
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <Link
                      href={localizePath(`/quiz/${primaryGroup.relatedQuizSlug}`, lang)}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 border border-stone-200 hover:border-stone-400 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg">{primaryGroup.emoji}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-black text-slate-900 truncate">
                            {primaryGroup.name} ({primaryGroup.fandom}) Quiz
                          </div>
                          <div className="text-[11px] text-stone-600 font-medium truncate">
                            {ui.relatedQuizCta}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </Link>

                    <Link
                      href={localizePath(`/chemistry/${primaryGroup.id}`, lang)}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 hover:border-rose-300 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <HeartHandshake className="w-4 h-4 text-rose-600 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-xs font-black text-slate-900 truncate">
                            {primaryGroup.name} Saju × MBTI
                          </div>
                          <div className="text-[11px] text-rose-700 font-medium truncate">
                            {pui.chemistryCta}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-rose-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </Link>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </section>

      {/* Privacy Notice + Static Directory for SEO (Real Links to /map/[slug] & /map/course/[slug]) */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 sm:p-6 space-y-6">
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          🛡️ {ui.privacyNotice}
        </p>

        {/* Course Directory Links */}
        <div className="pt-3 border-t border-slate-200/80 space-y-3">
          <h2 className="text-base font-black text-slate-900">
            {pui.courseDirectoryTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {MAP_COURSES.map((course) => (
              <Link
                key={course.id}
                href={localizePath(`/map/course/${course.slug}`, lang)}
                className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-400 transition-colors"
              >
                <div className="min-w-0">
                  <div className="text-xs font-extrabold text-slate-900 line-clamp-1">
                    {getLocalizedMapText(course.title, lang)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {course.spotIds.length} {pui.stopsLabel} · {course.durationHours}h
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* All 30 Verified Spot Individual Guide Links */}
        <div className="pt-3 border-t border-slate-200/80">
          <h2 className="text-lg font-black text-slate-900">{ui.directoryTitle}</h2>
          <p className="text-xs text-slate-500 mt-1">{ui.directoryDesc}</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MAP_SPOTS.map((spot) => {
              const g = MAP_GROUPS[spot.groupIds[0]];
              const isVisited = visitedIds.includes(spot.id);
              return (
                <Link
                  key={spot.id}
                  href={localizePath(`/map/${spot.slug}`, lang)}
                  className="text-left p-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-400 transition-colors block"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>
                      {g.emoji} {g.name}
                    </span>
                    <span className="flex items-center gap-1.5">
                      {isVisited && (
                        <span className="text-emerald-700 font-extrabold">✓</span>
                      )}
                      <span>{ui.categories[spot.category]}</span>
                    </span>
                  </div>
                  <div className="mt-1 font-extrabold text-xs text-slate-900 line-clamp-1">
                    {getLocalizedMapText(spot.name, lang)}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-500 line-clamp-1">
                    {getLocalizedMapText(spot.district, lang)}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
