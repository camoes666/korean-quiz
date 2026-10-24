'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Pause, Play } from 'lucide-react';
import DailyQuestCard, { type HeroBadge } from '@/components/DailyQuestCard';
import { useLanguage } from '@/context/LanguageContext';
import { trackHeroCardClick } from '@/lib/analytics';
import type { Quiz } from '@/types/quiz';

// Slow on purpose: long enough to read the card before it moves on.
const AUTO_ADVANCE_MS = 6500;
const SWIPE_THRESHOLD_PX = 40;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

interface HeroCarouselProps {
  slides: { quiz: Quiz; badge: HeroBadge }[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // Explicit pause/play (WCAG 2.2.2). Until the user chooses, reduced-motion users start paused.
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
  const paused = userPaused ?? prefersReducedMotion;
  const touchStartX = useRef<number | null>(null);

  const count = slides.length;
  const goTo = (next: number) => setIndex(((next % count) + count) % count);

  // Restarts on every index change, so a manual move gets a full interval before the next auto move.
  useEffect(() => {
    if (count < 2 || hovered || focused || paused) return;
    const id = setTimeout(() => {
      if (document.visibilityState === 'visible') setIndex((i) => (i + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [index, count, hovered, focused, paused]);

  if (count === 0) return null;

  const labels =
    lang === 'ko'
      ? { region: '추천 테스트', slide: '슬라이드', pause: '자동 넘김 멈춤', play: '자동 넘김 재생' }
      : lang === 'es'
      ? { region: 'Tests destacados', slide: 'Diapositiva', pause: 'Pausar', play: 'Reproducir' }
      : { region: 'Featured tests', slide: 'Slide', pause: 'Pause auto-rotation', play: 'Play auto-rotation' };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="flex flex-col gap-3 h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > SWIPE_THRESHOLD_PX) goTo(index + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="overflow-hidden rounded-3xl flex-1">
        <div
          className="flex h-full transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map(({ quiz, badge }, i) => (
            <div
              key={quiz.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${labels.slide} ${i + 1} / ${count}`}
              aria-hidden={i !== index}
              inert={i !== index}
              className="w-full shrink-0"
            >
              <DailyQuestCard
                questQuiz={quiz}
                badge={badge}
                onPlayClick={() => trackHeroCardClick({ slug: quiz.slug, position: i + 1, lang })}
              />
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="flex items-center justify-center gap-2">
          {slides.map(({ quiz }, i) => (
            <button
              key={quiz.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${labels.slide} ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-pink-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
          <button
            type="button"
            onClick={() => setUserPaused(!paused)}
            aria-label={paused ? labels.play : labels.pause}
            className="ml-1 p-1 rounded-full text-slate-400 hover:text-slate-600"
          >
            {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}
    </section>
  );
}
