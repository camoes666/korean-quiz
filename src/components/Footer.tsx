'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { localizePath } from '@/lib/i18nRoutes';

const PERSONALITY_LINKS = [
  {
    slug: 'which-bts-member-are-you',
    en: 'Which BTS Member Are You?',
    ko: '나와 닮은 방탄소년단(BTS) 멤버는?',
    es: '¿Qué miembro de BTS eres?',
    pt: 'Qual membro do BTS você é?',
  },
  {
    slug: 'which-bts-member-is-your-soulmate',
    en: 'Which BTS Member Is Your Soulmate?',
    ko: '나의 BTS 운명의 소울메이트는?',
    es: '¿Qué miembro de BTS es tu alma gemela?',
    pt: 'Qual membro do BTS é sua alma gêmea?',
  },
  {
    slug: 'which-blackpink-member-are-you',
    en: 'Which BLACKPINK Member Are You?',
    ko: '나와 닮은 블랙핑크 멤버는?',
    es: '¿Qué miembro de BLACKPINK eres?',
    pt: 'Qual membro do BLACKPINK você é?',
  },
  {
    slug: 'which-stray-kids-member-are-you',
    en: 'Which Stray Kids Member Are You?',
    ko: '나와 닮은 스트레이 키즈 멤버는?',
    es: '¿Qué miembro de Stray Kids eres?',
    pt: 'Qual membro do Stray Kids você é?',
  },
  {
    slug: 'which-twice-member-are-you',
    en: 'Which TWICE Member Are You?',
    ko: '나와 닮은 트와이스(TWICE) 멤버는?',
    es: '¿Qué miembro de TWICE eres?',
    pt: 'Qual membro do TWICE você é?',
  },
  {
    slug: 'which-enhypen-member-are-you',
    en: 'Which ENHYPEN Member Are You?',
    ko: '나와 닮은 엔하이픈(ENHYPEN) 멤버는?',
    es: '¿Qué miembro de ENHYPEN eres?',
    pt: 'Qual membro do ENHYPEN você é?',
  },
  {
    slug: 'which-aespa-member-are-you',
    en: 'Which aespa Member Are You?',
    ko: '나와 닮은 에스파(aespa) 멤버는?',
    es: '¿Qué miembro de aespa eres?',
    pt: 'Qual membro do aespa você é?',
  },
  {
    slug: 'which-le-sserafim-member-are-you',
    en: 'Which LE SSERAFIM Member Are You?',
    ko: '나와 닮은 르세라핌 멤버는?',
    es: '¿Qué miembro de LE SSERAFIM eres?',
    pt: 'Qual membro do LE SSERAFIM você é?',
  },
  {
    slug: 'which-korean-food-are-you',
    en: 'Which Korean Food Are You?',
    ko: '나와 닮은 한국 소울푸드는?',
    es: '¿Qué comida coreana eres?',
    pt: 'Qual comida coreana você é?',
  },
];

const EDITORIAL_ARTICLE_LINKS = [
  {
    slug: 'bts-seoul-1-day-pilgrimage-itinerary',
    label: '1-Day BTS Seoul Itinerary & Subway Guide',
  },
  {
    slug: 'korea-travel-apps-etiquette-for-kpop-fans',
    label: 'Naver Map, T-Money & Birthday Cafe Guide',
  },
  {
    slug: 'how-korean-names-work-surnames-hanja-guide',
    label: 'How Korean Names, Hanja & Bon-gwan Work',
  },
  {
    slug: 'korean-spicy-food-scoville-guide',
    label: 'Korean Spicy Food Scoville Scale Guide',
  },
  {
    slug: 'korean-dining-etiquette-complete-guide',
    label: 'Korean Dining Etiquette & Table Manners',
  },
  {
    slug: 'kpop-generations-1st-to-5th-gen-history',
    label: 'History of K-Pop: 1st Gen to 5th Gen',
  },
];

const GUIDE_LINKS = [
  {
    slug: 'bts-army-trivia',
    en: 'BTS ARMY Lore & History Guide',
    ko: 'BTS 아미 공식 역사 & 로어 백과',
    es: 'Guía de Lore e Historia de BTS',
    pt: 'Guia de Lore e História do BTS',
  },
  {
    slug: 'blackpink-blink-trivia',
    en: 'BLACKPINK BLINK Lore Guide',
    ko: '블랙핑크 블링크 완벽 지식 가이드',
    es: 'Guía de Lore de BLACKPINK',
    pt: 'Guia de Lore do BLACKPINK',
  },
  {
    slug: 'korean-culture-iq',
    en: 'Korean Culture & Etiquette IQ Guide',
    ko: '한국 문화 & 예절 상식 완벽 가이드',
    es: 'Guía de Cultura y Etiqueta Coreana',
    pt: 'Guia de Cultura e Etiqueta Coreana',
  },
];

const TRIVIA_LINKS = [
  {
    slug: 'bts-army-trivia',
    en: 'BTS ARMY Trivia Quiz (35 Qs)',
    ko: 'BTS 아미 상식 퀴즈 (35문항)',
    es: 'Quiz de Trivia BTS ARMY',
    pt: 'Quiz de Trivia BTS ARMY',
  },
  {
    slug: 'blackpink-blink-trivia',
    en: 'BLACKPINK BLINK Trivia (50 Qs)',
    ko: '블랙핑크 블링크 퀴즈 (50문항)',
    es: 'Quiz de Trivia BLACKPINK',
    pt: 'Quiz de Trivia BLACKPINK',
  },
  {
    slug: 'stray-kids-stay-trivia',
    en: 'Stray Kids STAY Trivia (60 Qs)',
    ko: '스트레이 키즈 퀴즈 (60문항)',
    es: 'Quiz de Trivia Stray Kids',
    pt: 'Quiz de Trivia Stray Kids',
  },
  {
    slug: 'kpop-fandom-trivia',
    en: 'K-Pop All-Fandom Trivia Challenge',
    ko: 'K-Pop 올팬덤 상식 챌린지',
    es: 'Reto de Trivia K-Pop',
    pt: 'Desafio de Trivia K-Pop',
  },
  {
    slug: 'kdrama-trope-trivia',
    en: 'K-Drama & Squid Game Trivia',
    ko: 'K-드라마 & 오징어게임 퀴즈',
    es: 'Trivia de K-Dramas y Squid Game',
    pt: 'Trivia de K-Dramas e Round 6',
  },
  {
    slug: 'korean-spicy-food',
    en: 'Korean Spicy Food Challenge',
    ko: '한국 매운맛 & K-푸드 퀴즈',
    es: 'Reto de Comida Picante Coreana',
    pt: 'Desafio de Comida Coreana',
  },
  {
    slug: 'korean-culture-iq',
    en: 'Korean Culture & Etiquette IQ Test',
    ko: '한국 문화 & 예절 IQ 테스트',
    es: 'Test de IQ de Cultura Coreana',
    pt: 'Teste de QI de Cultura Coreana',
  },
];

export default function Footer({ articleCount }: { articleCount?: number }) {
  const { t, lang } = useLanguage();

  const pickLabel = (item: { en: string; ko: string; es: string; pt: string }) =>
    lang === 'ko' ? item.ko : lang === 'es' ? item.es : lang === 'pt' ? item.pt : item.en;

  return (
    <footer className="w-full border-t border-slate-200/90 bg-white mt-auto pt-12 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* 4-Column SEO Internal Link Silo Hub */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-100">
          {/* Column 1: Brand & Site Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-slate-900">
                {t.siteTitle}
              </span>
              <span className="text-xs text-slate-400 font-medium">{t.footer.tagline}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              {t.footer.desc}
            </p>
            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-600">
              <Link href={localizePath('/', lang)} className="hover:text-slate-900 transition-colors">
                {t.footer.home}
              </Link>
              <Link href={localizePath('/#quizzes', lang)} className="hover:text-slate-900 transition-colors">
                {t.footer.allQuizzes}
              </Link>
              <Link href="/articles" className="hover:text-slate-900 transition-colors font-semibold text-slate-900">
                {lang === 'ko' ? '매거진' : lang === 'es' ? 'Artículos' : lang === 'pt' ? 'Artigos' : 'Articles'}
              </Link>
              <Link href={localizePath('/korean-name', lang)} className="hover:text-slate-900 transition-colors font-semibold text-slate-900">
                {lang === 'ko' ? '한국 이름 작명' : lang === 'es' ? 'Nombre Coreano' : lang === 'pt' ? 'Nome Coreano' : 'Korean Name'}
              </Link>
              <Link href={localizePath('/chemistry', lang)} className="hover:text-slate-900 transition-colors">
                {lang === 'ko' ? '아이돌 궁합' : lang === 'es' ? 'Química Idol' : lang === 'pt' ? 'Química Idol' : 'Idol Chemistry'}
              </Link>
              <Link href={localizePath('/map', lang)} className="hover:text-slate-900 transition-colors">
                {lang === 'ko' ? '성지 지도' : lang === 'es' ? 'Mapa K-Pop' : lang === 'pt' ? 'Mapa K-Pop' : 'Korea Map'}
              </Link>
              <Link href={localizePath('/guide', lang)} className="hover:text-slate-900 transition-colors">
                {lang === 'ko' ? '지식 가이드' : lang === 'es' ? 'Guías de Lore' : lang === 'pt' ? 'Guias de Lore' : 'Knowledge Guides'}
              </Link>
              <Link href="/about" className="hover:text-slate-900 transition-colors">
                {t.footer.aboutUs}
              </Link>
              <Link href="/contact" className="hover:text-slate-900 transition-colors">
                {lang === 'ko' ? '문의하기' : lang === 'es' ? 'Contacto' : lang === 'pt' ? 'Contato' : 'Contact'}
              </Link>
              <Link href="/privacy" className="hover:text-slate-900 transition-colors">
                {t.footer.privacyPolicy}
              </Link>
              <Link href="/terms" className="hover:text-slate-900 transition-colors">
                {t.footer.terms}
              </Link>
              <a
                href="https://x.com/JIlmong"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors"
              >
                X (Twitter)
              </a>
            </div>
          </div>

          {/* Column 2: K-Pop Personality & Soulmate Tests */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold text-slate-900 mb-3">
              {lang === 'ko'
                ? 'K-Pop 소울메이트 성향 테스트'
                : lang === 'es'
                ? 'Tests de Personalidad K-Pop'
                : lang === 'pt'
                ? 'Testes de Personalidade K-Pop'
                : 'K-Pop Personality & Soulmate Tests'}
            </h3>
            <ul className="space-y-2 text-xs font-normal text-slate-600">
              {PERSONALITY_LINKS.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={localizePath(`/quiz/${item.slug}`, lang)}
                    className="hover:text-slate-900 hover:underline transition-colors block truncate"
                  >
                    {pickLabel(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Editorial Feature Guides + Lore Hub */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold text-slate-900 mb-3">
              {lang === 'ko'
                ? '에디토리얼 가이드 & 로어'
                : lang === 'es'
                ? 'Guías Editoriales y Lore'
                : lang === 'pt'
                ? 'Guias Editoriais e Lore'
                : 'Editorial Guides & Fan Lore'}
            </h3>
            <ul className="space-y-2 text-xs font-normal text-slate-600">
              <li>
                <Link
                  href="/articles"
                  className="font-semibold text-slate-900 hover:underline transition-colors block"
                >
                  All Korean Culture Articles{articleCount ? ` (${articleCount})` : ''}
                </Link>
              </li>
              {EDITORIAL_ARTICLE_LINKS.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/articles/${item.slug}`}
                    className="hover:text-slate-900 hover:underline transition-colors block truncate"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={localizePath('/guide', lang)}
                  className="font-medium text-slate-900 hover:underline transition-colors block pt-1"
                >
                  {lang === 'ko'
                    ? '전체 지식 가이드 허브 보기'
                    : lang === 'es'
                    ? 'Ver Todas las Guías de Lore'
                    : lang === 'pt'
                    ? 'Ver Todos os Guias de Lore'
                    : 'All K-Culture & K-Pop Lore Guides Hub'}
                </Link>
              </li>
              {GUIDE_LINKS.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={localizePath(`/guide/${item.slug}`, lang)}
                    className="hover:text-slate-900 hover:underline transition-colors block truncate"
                  >
                    {pickLabel(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Fandom Trivia Quizzes */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold text-slate-900 mb-3">
              {lang === 'ko'
                ? '팬덤 상식 & 한국 문화 퀴즈'
                : lang === 'es'
                ? 'Quizzes de Trivia K-Pop y Cultura'
                : lang === 'pt'
                ? 'Quizzes de Trivia K-Pop e Cultura'
                : 'K-Pop & Korean Culture Trivia'}
            </h3>
            <ul className="space-y-2 text-xs font-normal text-slate-600">
              {TRIVIA_LINKS.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={localizePath(`/quiz/${item.slug}`, lang)}
                    className="hover:text-slate-900 hover:underline transition-colors block truncate"
                  >
                    {pickLabel(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} K-Pulse. {t.footer.rights}</p>
          <p>{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
