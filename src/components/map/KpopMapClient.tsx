'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  MapPin,
  Search,
  Bookmark,
  Share2,
  Check,
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
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { MAP_GROUPS, MAP_SPOTS, filterMapSpots } from '@/data/mapSpots';
import { MAP_TRANSLATIONS } from '@/lib/mapTranslations';
import { GroupId, MapSpot, SpotCategory, getLocalizedMapText } from '@/types/map';
import SpotGallery from './SpotGallery';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 text-sm font-semibold">
      Loading interactive map...
    </div>
  ),
});

const SAVED_STORAGE_KEY = 'kpulse_saved_map_spots';

const CATEGORY_META: Array<{ id: SpotCategory; emoji: string }> = [
  { id: 'restaurant', emoji: '🍜' },
  { id: 'agency', emoji: '🏢' },
  { id: 'hometown', emoji: '🏠' },
  { id: 'filming', emoji: '🎬' },
];

export default function KpopMapClient() {
  const { lang } = useLanguage();
  const ui = MAP_TRANSLATIONS[lang] || MAP_TRANSLATIONS.en;

  const [selectedGroup, setSelectedGroup] = useState<GroupId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<SpotCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySaved, setOnlySaved] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(MAP_SPOTS[0]?.id ?? null);
  const [mobileView, setMobileView] = useState<'map' | 'list'>('map');
  const [fitTrigger, setFitTrigger] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Hydrate saved spots from localStorage and URL query params (?spots=..., ?group=...)
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(SAVED_STORAGE_KEY);
        const localSaved: string[] = raw ? JSON.parse(raw) : [];

        const params = new URLSearchParams(window.location.search);
        const groupParam = params.get('group') as GroupId | null;
        if (groupParam && groupParam in MAP_GROUPS) {
          setSelectedGroup(groupParam);
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

  const toggleSaveSpot = useCallback((spotId: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(spotId)
        ? prev.filter((id) => id !== spotId)
        : [...prev, spotId];
      try {
        localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage quota errors
      }
      return next;
    });
  }, []);

  const filteredSpots = useMemo(() => {
    return filterMapSpots({
      groupId: selectedGroup,
      category: selectedCategory,
      query: searchQuery,
      savedIds,
      onlySaved,
    });
  }, [selectedGroup, selectedCategory, searchQuery, savedIds, onlySaved]);

  const selectedSpot = useMemo(() => {
    if (!selectedSpotId) return null;
    return filteredSpots.find((s) => s.id === selectedSpotId) || null;
  }, [filteredSpots, selectedSpotId]);

  const handleSelectSpot = useCallback((spot: MapSpot) => {
    setSelectedSpotId(spot.id);
  }, []);

  const handleResetFilters = () => {
    setSelectedGroup('all');
    setSelectedCategory('all');
    setSearchQuery('');
    setOnlySaved(false);
    setFitTrigger((c) => c + 1);
  };

  const handleShareTrip = async () => {
    const idsToShare = savedIds.length > 0 ? savedIds : filteredSpots.slice(0, 5).map((s) => s.id);
    const url = `${window.location.origin}/map?spots=${encodeURIComponent(idsToShare.join(','))}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      window.prompt('Copy your K-Pop Pilgrimage Trip link:', url);
    }
  };

  const getMapLinks = (spot: MapSpot) => ({
    naver: `https://map.naver.com/p/search/${encodeURIComponent(spot.mapQueries.naver)}`,
    kakao: `https://map.kakao.com/link/search/${encodeURIComponent(spot.mapQueries.kakao)}`,
    google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.mapQueries.google)}`,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Hero Header */}
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
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
      </section>

      {/* Filter & Search Bar */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Group Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setSelectedGroup('all');
                setFitTrigger((c) => c + 1);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                selectedGroup === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {ui.allGroups} ({MAP_SPOTS.length})
            </button>
            {(Object.keys(MAP_GROUPS) as GroupId[]).map((gId) => {
              const g = MAP_GROUPS[gId];
              const count = MAP_SPOTS.filter((s) => s.groupIds.includes(gId)).length;
              const active = selectedGroup === gId;
              return (
                <button
                  key={gId}
                  onClick={() => {
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
              onClick={() => setOnlySaved((prev) => !prev)}
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
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {ui.allCategories}
            </button>
            {CATEGORY_META.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
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
              <strong className="text-slate-900">{filteredSpots.length}</strong> {ui.spotsFound}
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
            {ui.listView} ({filteredSpots.length})
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
          {filteredSpots.length === 0 ? (
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
            filteredSpots.map((spot) => {
              const isSelected = spot.id === selectedSpotId;
              const isSaved = savedIds.includes(spot.id);
              const primaryGroup = MAP_GROUPS[spot.groupIds[0]];
              const catEmoji = CATEGORY_META.find((c) => c.id === spot.category)?.emoji ?? '📍';

              return (
                <div
                  key={spot.id}
                  onClick={() => {
                    handleSelectSpot(spot);
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
          <div className="bg-white rounded-2xl border border-slate-200 p-1.5 shadow-sm h-[420px] sm:h-[480px]">
            <LeafletMap
              spots={filteredSpots}
              selectedSpotId={selectedSpotId}
              onSelectSpot={handleSelectSpot}
              lang={lang}
              fitTrigger={fitTrigger}
            />
          </div>

          {/* Selected Spot Detail Card */}
          {selectedSpot && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
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

              <div className="text-[11px] text-slate-500 font-semibold">
                {ui.sourceLabel}: {getLocalizedMapText(selectedSpot.sourceNote, lang)}
              </div>

              {/* 3-App Navigation Deep Links */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-purple-600" />
                  <span>{ui.openInMaps}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(() => {
                    const links = getMapLinks(selectedSpot);
                    return (
                      <>
                        <a
                          href={links.naver}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-colors"
                        >
                          <span>Naver Map</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href={links.kakao}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-extrabold transition-colors"
                        >
                          <span>KakaoMap</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href={links.google}
                          target="_blank"
                          rel="noopener noreferrer"
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

              {/* Related K-Pulse Quiz CTA */}
              {(() => {
                const primaryGroup = MAP_GROUPS[selectedSpot.groupIds[0]];
                return (
                  <Link
                    href={`/quiz/${primaryGroup.relatedQuizSlug}`}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/80 hover:border-purple-300 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{primaryGroup.emoji}</span>
                      <div>
                        <div className="text-xs font-black text-purple-900">
                          {primaryGroup.name} ({primaryGroup.fandom}) Quiz
                        </div>
                        <div className="text-[11px] text-purple-700 font-medium">
                          {ui.relatedQuizCta}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                );
              })()}
            </div>
          )}
        </div>
      </section>

      {/* Privacy Notice + Static Directory for SEO */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 sm:p-6 space-y-4">
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          🛡️ {ui.privacyNotice}
        </p>

        <div className="pt-3 border-t border-slate-200/80">
          <h2 className="text-lg font-black text-slate-900">{ui.directoryTitle}</h2>
          <p className="text-xs text-slate-500 mt-1">{ui.directoryDesc}</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MAP_SPOTS.map((spot) => {
              const g = MAP_GROUPS[spot.groupIds[0]];
              return (
                <button
                  key={spot.id}
                  onClick={() => {
                    setSelectedGroup('all');
                    setSelectedCategory('all');
                    setOnlySaved(false);
                    setSelectedSpotId(spot.id);
                    setMobileView('map');
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                  }}
                  className="text-left p-3.5 rounded-xl bg-white border border-slate-200 hover:border-purple-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>
                      {g.emoji} {g.name}
                    </span>
                    <span>{ui.categories[spot.category]}</span>
                  </div>
                  <div className="mt-1 font-extrabold text-xs text-slate-900 line-clamp-1">
                    {getLocalizedMapText(spot.name, lang)}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-500 line-clamp-1">
                    {getLocalizedMapText(spot.district, lang)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
