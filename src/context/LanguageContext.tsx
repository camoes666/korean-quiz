'use client';

import React, { createContext, useContext, useState } from 'react';
import { Language, translations, TranslationDictionary } from '@/lib/translations';
import { trackLanguageChange } from '@/lib/analytics';

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  // To enable Portuguese in the language switcher once quiz JSON *Pt fields are populated, uncomment:
  // { code: 'pt', label: 'Português', flag: '🇧🇷' },
];

const ACTIVE_LANGUAGE_CODES = new Set<Language>(LANGUAGE_OPTIONS.map((opt) => opt.code));

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationDictionary;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function resolveInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  try {
    // 1. URL Query Param: ?lang=es / ?lang=ko / ?lang=en / ?lang=pt (최우선)
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
  const [lang, setLangState] = useState<Language>(() => resolveInitialLanguage());

  // URL 쿼리 파라미터 변경 감지 및 동기화
  React.useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang')?.toLowerCase() as Language;
        if (urlLang && translations[urlLang]) {
          setLangState(urlLang);
          localStorage.setItem('kpulse_lang', urlLang);
        }
      } catch {
        // safe
      }
    };
    window.addEventListener('popstate', handlePopState);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
    return () => window.removeEventListener('popstate', handlePopState);
  }, [lang]);

  const setLang = (newLang: Language) => {
    if (newLang !== lang) {
      trackLanguageChange({ from: lang, to: newLang });
    }
    setLangState(newLang);
    try {
      localStorage.setItem('kpulse_lang', newLang);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLang;
      }
      if (typeof window !== 'undefined') {
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
