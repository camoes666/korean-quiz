'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Language, translations, TranslationDictionary } from '@/lib/translations';
import { trackLanguageChange } from '@/lib/analytics';
import {
  getLocaleFromPathname,
  isLocalizablePath,
  localizePath,
} from '@/lib/i18nRoutes';

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
];

const ACTIVE_LANGUAGE_CODES = new Set<Language>(LANGUAGE_OPTIONS.map((opt) => opt.code));

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationDictionary;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function resolveClientFallbackLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  try {
    // 1. URL Query Param: ?lang=es / ?lang=ko / ?lang=en / ?lang=pt
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang')?.toLowerCase() as Language;
    if (urlLang && translations[urlLang]) {
      localStorage.setItem('kpulse_lang', urlLang);
      return urlLang;
    }

    // 2. Previously Saved Preference in localStorage
    const saved = localStorage.getItem('kpulse_lang') as Language;
    if (saved && translations[saved]) {
      return saved;
    }

    // 3. Browser Language Auto-Detection against active LANGUAGE_OPTIONS
    const browserLangs = navigator.languages || [navigator.language || ''];
    for (const bLang of browserLangs) {
      const prefix = (bLang || '').toLowerCase().split('-')[0] as Language;
      if (ACTIVE_LANGUAGE_CODES.has(prefix) && translations[prefix]) {
        return prefix;
      }
    }
  } catch {
    // Fallback safe
  }

  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const pathLocale = getLocaleFromPathname(pathname);

  // Derive lang directly from URL prefix when on /es, /pt, /ko so static HTML & hydration match 100%.
  const [rootLang, setRootLang] = useState<Language>('en');
  const lang: Language = pathLocale || rootLang;
  const didHydrateRootRef = useRef(false);

  useEffect(() => {
    if (pathLocale) {
      didHydrateRootRef.current = true;
      return;
    }

    const applyRootResolution = () => {
      didHydrateRootRef.current = true;
      setRootLang(resolveClientFallbackLanguage());
    };

    let timer: number | undefined;
    if (!didHydrateRootRef.current) {
      timer = window.setTimeout(applyRootResolution, 0);
    } else {
      timer = window.setTimeout(() => {
        try {
          const params = new URLSearchParams(window.location.search);
          const urlLang = params.get('lang')?.toLowerCase() as Language;
          if (urlLang && translations[urlLang]) {
            setRootLang(urlLang);
          }
        } catch {
          // safe
        }
      }, 0);
    }

    window.addEventListener('popstate', applyRootResolution);
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      window.removeEventListener('popstate', applyRootResolution);
    };
  }, [pathLocale, pathname]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (newLang: Language) => {
    if (newLang !== lang) {
      trackLanguageChange({ from: lang, to: newLang });
    }
    setRootLang(newLang);

    try {
      localStorage.setItem('kpulse_lang', newLang);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLang;
      }

      if (typeof window !== 'undefined') {
        const currentPathname = pathname || window.location.pathname || '/';
        const currentParams = new URLSearchParams(window.location.search);
        const currentHash = window.location.hash || '';

        if (isLocalizablePath(currentPathname)) {
          currentParams.delete('lang');
          const searchStr = currentParams.toString();
          const pathWithSuffix = `${currentPathname}${searchStr ? `?${searchStr}` : ''}${currentHash}`;
          const targetPath = localizePath(pathWithSuffix, newLang);
          const currentFull = `${currentPathname}${window.location.search}${currentHash}`;
          if (targetPath !== currentFull) {
            router.push(targetPath);
          }
          return;
        }

        const url = new URL(window.location.href);
        if (url.searchParams.has('lang')) {
          if (newLang === 'en') {
            url.searchParams.delete('lang');
          } else {
            url.searchParams.set('lang', newLang);
          }
          window.history.replaceState({}, '', url.toString());
        }
      }
    } catch {
      // safe
    }
  };

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages: LANGUAGE_OPTIONS }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
