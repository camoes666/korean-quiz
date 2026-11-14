'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Camera,
  Play,
  ImageOff,
} from 'lucide-react';
import { Language } from '@/lib/translations';
import { MapUIText } from '@/lib/mapTranslations';
import { MapSpot, SpotCategory, getLocalizedMapText } from '@/types/map';

interface SpotGalleryProps {
  spot: MapSpot;
  lang: Language;
  ui: MapUIText;
}

type SlideItem =
  | {
      type: 'photo';
      url: string;
      caption: string;
      credit?: string;
    }
  | {
      type: 'video';
      youtubeId: string;
      caption: string;
    };

const CATEGORY_GRADIENT: Record<SpotCategory, string> = {
  restaurant: 'from-amber-500/15 via-orange-500/10 to-rose-500/15',
  agency: 'from-purple-500/15 via-indigo-500/10 to-slate-500/15',
  hometown: 'from-emerald-500/15 via-teal-500/10 to-cyan-500/15',
  filming: 'from-pink-500/15 via-purple-500/10 to-indigo-500/15',
};

const CATEGORY_EMOJI: Record<SpotCategory, string> = {
  restaurant: '🍜',
  agency: '🏢',
  hometown: '🏠',
  filming: '🎬',
};

export default function SpotGallery({ spot, lang, ui }: SpotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [brokenUrls, setBrokenUrls] = useState<Record<string, boolean>>({});

  const slides: SlideItem[] = [
    ...(spot.photos ?? []).map((p) => ({
      type: 'photo' as const,
      url: p.url,
      caption: getLocalizedMapText(p.caption, lang),
      credit: p.credit,
    })),
    ...(spot.youtubeEmbedId
      ? [
          {
            type: 'video' as const,
            youtubeId: spot.youtubeEmbedId,
            caption: `${getLocalizedMapText(spot.name, lang)} · ${ui.watchVideo}`,
          },
        ]
      : []),
  ];

  const totalSlides = slides.length;
  const safeIndex = totalSlides > 0 ? Math.min(activeIndex, totalSlides - 1) : 0;
  const currentSlide = slides[safeIndex];

  const goPrev = useCallback(() => {
    if (totalSlides <= 1) return;
    setPlayingVideo(false);
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goNext = useCallback(() => {
    if (totalSlides <= 1) return;
    setPlayingVideo(false);
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen, goPrev, goNext]);

  // No photos and no video -> clean placeholder
  if (totalSlides === 0) {
    return (
      <div
        className={`relative rounded-xl bg-gradient-to-br ${
          CATEGORY_GRADIENT[spot.category]
        } border border-slate-200/80 px-4 py-5 flex items-center gap-3`}
      >
        <div className="w-11 h-11 rounded-xl bg-white/90 border border-slate-200/80 flex items-center justify-center text-xl shadow-2xs shrink-0">
          {CATEGORY_EMOJI[spot.category]}
        </div>
        <div className="min-w-0">
          <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-slate-500" />
            <span>{ui.categories[spot.category]}</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
            {ui.noPhotosYet}
          </p>
        </div>
      </div>
    );
  }

  const isCurrentBroken =
    currentSlide?.type === 'photo' && Boolean(brokenUrls[currentSlide.url]);

  return (
    <>
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 aspect-[16/9] max-h-[280px] w-full group">
        {/* Slide Content */}
        {currentSlide.type === 'photo' ? (
          isCurrentBroken ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-500 gap-2 p-4 text-center">
              <ImageOff className="w-7 h-7 text-slate-400" />
              <span className="text-xs font-bold">{currentSlide.caption}</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="w-full h-full relative cursor-zoom-in block"
              aria-label="Open full-screen photo"
            >
              <img
                src={currentSlide.url}
                alt={currentSlide.caption}
                loading="lazy"
                onError={() =>
                  setBrokenUrls((prev) => ({ ...prev, [currentSlide.url]: true }))
                }
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-xs text-white text-[10px] font-bold">
                <Maximize2 className="w-3 h-3" />
                <span>Zoom</span>
              </span>
            </button>
          )
        ) : playingVideo ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${currentSlide.youtubeId}?autoplay=1&rel=0`}
            title={currentSlide.caption}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlayingVideo(true)}
            className="w-full h-full relative cursor-pointer block"
            aria-label={ui.watchVideo}
          >
            <img
              src={`https://i.ytimg.com/vi/${currentSlide.youtubeId}/hqdefault.jpg`}
              alt={currentSlide.caption}
              loading="lazy"
              className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center gap-2">
              <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
              <span className="px-3 py-1 rounded-full bg-black/65 text-white text-xs font-extrabold">
                {ui.watchVideo}
              </span>
            </div>
          </button>
        )}

        {/* Counter Badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-extrabold tabular-nums">
          {safeIndex + 1} / {totalSlides}
        </div>

        {/* Prev / Next Arrows */}
        {totalSlides > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous media"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next media"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Bottom Caption & Credit Overlay (hide when YouTube iframe is playing) */}
        {!(currentSlide.type === 'video' && playingVideo) && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-3.5 pt-6 pb-2.5 flex items-end justify-between gap-2 pointer-events-none">
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {currentSlide.caption}
              </p>
              {currentSlide.type === 'photo' && currentSlide.credit && (
                <p className="text-[10px] text-slate-300 truncate">
                  📷 {currentSlide.credit}
                </p>
              )}
            </div>

            {totalSlides > 1 && (
              <div className="flex items-center gap-1 shrink-0 pb-0.5 pointer-events-auto">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPlayingVideo(false);
                      setActiveIndex(idx);
                    }}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === safeIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal (for Photos) */}
      {lightboxOpen && currentSlide?.type === 'photo' && (
        <div
          className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-xs flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="relative max-w-4xl w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentSlide.url}
              alt={currentSlide.caption}
              className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />

            {totalSlides > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous photo"
                  className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next photo"
                  className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          <div className="mt-3 text-center text-white space-y-1 max-w-xl">
            <p className="text-sm font-bold">{currentSlide.caption}</p>
            {currentSlide.credit && (
              <p className="text-xs text-slate-300">📷 {currentSlide.credit}</p>
            )}
            <p className="text-[11px] text-slate-400">
              {safeIndex + 1} / {totalSlides}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
