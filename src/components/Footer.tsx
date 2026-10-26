'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

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
    slug: 'stray-kids-stay-trivia',
    en: 'Stray Kids STAY 5-Star Lore Guide',
    ko: '스트레이 키즈 스테이 지식 가이드',
    es: 'Guía de Lore de Stray Kids',
    pt: 'Guia de Lore do Stray Kids',
  },
  {
    slug: 'kpop-fandom-trivia',
    en: 'K-Pop All-Fandom Ultimate Guide',
    ko: 'K-Pop 올팬덤 종합 상식 가이드',
    es: 'Guía Definitiva de Fandoms K-Pop',
    pt: 'Guia Definitivo de Fandoms K-Pop',
  },
  {
    slug: 'kdrama-trope-trivia',
    en: 'K-Drama & Squid Game Lore Guide',
    ko: 'K-드라마 & 오징어게임 해설 가이드',
    es: 'Guía de K-Dramas y Squid Game',
    pt: 'Guia de K-Dramas e Round 6',
  },
  {
    slug: 'korean-spicy-food',
    en: 'Korean Spicy Food & Street Food Guide',
    ko: '한국 매운 음식 & 길거리 미식 가이드',
    es: 'Guía de Comida Picante Coreana',
    pt: 'Guia de Comida Picante Coreana',
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

export default function Footer() {
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
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t.siteTitle}
              </span>
              <span className="text-xs font-semibold text-slate-400">{t.footer.tagline}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              {t.footer.desc}
            </p>
            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-slate-600">
              <Link href="/" className="hover:text-purple-600 transition-colors">
                {t.footer.home}
              </Link>
              <Link href="/#quizzes" className="hover:text-purple-600 transition-colors">
                {t.footer.allQuizzes}
              </Link>
              <Link href="/guide" className="hover:text-purple-600 transition-colors text-purple-700">
                {lang === 'ko' ? '지식 가이드 백과' : lang === 'es' ? 'Guías de Lore' : lang === 'pt' ? 'Guias de Lore' : 'Knowledge Guides'}
              </Link>
              <Link href="/about" className="hover:text-purple-600 transition-colors">
                {t.footer.aboutUs}
              </Link>
              <Link href="/privacy" className="hover:text-purple-600 transition-colors">
                {t.footer.privacyPolicy}
              </Link>
              <Link href="/terms" className="hover:text-purple-600 transition-colors">
                {t.footer.terms}
              </Link>
              <a
                href="https://x.com/JIlmong"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-600 transition-colors"
              >
                X (Twitter)
              </a>
            </div>
          </div>

          {/* Column 2: K-Pop Personality & Soulmate Tests */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <span>🔮</span>
              <span>
                {lang === 'ko'
                  ? 'K-Pop 소울메이트 성향 테스트'
                  : lang === 'es'
                  ? 'Tests de Personalidad K-Pop'
                  : lang === 'pt'
                  ? 'Testes de Personalidade K-Pop'
                  : 'K-Pop Personality & Soulmate Tests'}
              </span>
            </h3>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              {PERSONALITY_LINKS.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/quiz/${item.slug}`}
                    className="hover:text-purple-600 hover:underline transition-colors block truncate"
                  >
                    {pickLabel(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Verified Knowledge & Lore Guides (Direct Crawl Links for /guide/*) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <span>📚</span>
              <span>
                {lang === 'ko'
                  ? '팬덤 로어 & 해설 가이드북'
                  : lang === 'es'
                  ? 'Guías de Lore y Respuestas'
                  : lang === 'pt'
                  ? 'Guias de Lore e Respostas'
                  : 'Verified Fan Lore & Study Guides'}
              </span>
            </h3>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link
                  href="/guide"
                  className="font-bold text-purple-700 hover:text-purple-900 hover:underline transition-colors block"
                >
                  {lang === 'ko'
                    ? '✦ 전체 230+ 지식 가이드 허브 보기'
                    : lang === 'es'
                    ? '✦ Ver Todas las Guías de Lore (230+ Datos)'
                    : lang === 'pt'
                    ? '✦ Ver Todos os Guias de Lore (230+ Fatos)'
                    : '✦ All K-Culture & K-Pop Lore Guides Hub'}
                </Link>
              </li>
              {GUIDE_LINKS.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/guide/${item.slug}`}
                    className="hover:text-purple-600 hover:underline transition-colors block truncate"
                  >
                    {pickLabel(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Fandom Trivia Quizzes */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <span>⚡</span>
              <span>
                {lang === 'ko'
                  ? '팬덤 상식 & 한국 문화 퀴즈'
                  : lang === 'es'
                  ? 'Quizzes de Trivia K-Pop y Cultura'
                  : lang === 'pt'
                  ? 'Quizzes de Trivia K-Pop e Cultura'
                  : 'K-Pop & Korean Culture Trivia'}
              </span>
            </h3>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              {TRIVIA_LINKS.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/quiz/${item.slug}`}
                    className="hover:text-purple-600 hover:underline transition-colors block truncate"
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
