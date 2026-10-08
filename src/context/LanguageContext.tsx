'use client';

import React, { createContext, useContext, useState } from 'react';
import { Language, translations, TranslationDictionary } from '@/lib/translations';

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
];

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
    // 1. URL Query Param: ?lang=es / ?lang=ko / ?lang=en (최우선)
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

    // 3. Browser Language Auto-Detection (첫 방문자 브라우저 언어 자동 감지)
    const browserLangs = navigator.languages || [navigator.language || ''];
    for (const bLang of browserLangs) {
      const lower = (bLang || '').toLowerCase();
      if (lower.startsWith('es')) return 'es';
      if (lower.startsWith('ko')) return 'ko';
      if (lower.startsWith('en')) return 'en';
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
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang')?.toLowerCase() as Language;
      if (urlLang && translations[urlLang] && urlLang !== lang) {
        setLangState(urlLang);
        localStorage.setItem('kpulse_lang', urlLang);
      }
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    } catch {
      // safe
    }
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('kpulse_lang', newLang);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLang;
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
