import type { Metadata } from 'next';
import { getLocalizedText, type Quiz } from '../types/quiz';
import { type IdolGroupProfile } from '../data/idolChemistry';
import { getTotalTriviaQuestionCount, getTriviaQuizzes } from '../data/quizzes';
import { MAP_GROUPS, MAP_SPOTS } from '../data/mapSpots';
import {
  getLocalizedMapText,
  type MapCourse,
  type MapSpot,
} from '../types/map';
import { SAJU_ELEMENTS, ZODIAC_META } from './chemistryEngine';
import { getQuizSeoData, type FaqItem } from './seo';
import {
  BASE_URL,
  OG_LOCALE_MAP,
  SITE_LOCALES,
  buildHreflangAlternates,
  buildLocalizedUrl,
  type SiteLocale,
} from './i18nRoutes';

type LocalizedStringMap = Record<SiteLocale, string>;

function pickLocale(map: LocalizedStringMap, locale: SiteLocale): string {
  return map[locale] || map.en;
}

function alternateOgLocales(current: SiteLocale): string[] {
  return SITE_LOCALES.filter((l) => l !== current).map((l) => OG_LOCALE_MAP[l]);
}

function buildPageMetadata(params: {
  basePath: string;
  locale: SiteLocale;
  title: string;
  description: string;
  ogTitle?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string[];
}): Metadata {
  const url = buildLocalizedUrl(params.basePath, params.locale);
  const ogImage = params.ogImage || '/images/og-banner.png';
  const ogTitle = params.ogTitle || params.title;

  return {
    title: params.title,
    description: params.description,
    ...(params.keywords ? { keywords: params.keywords } : {}),
    alternates: buildHreflangAlternates(params.basePath, params.locale),
    openGraph: {
      title: ogTitle,
      description: params.description,
      url,
      siteName: 'K-Pulse',
      locale: OG_LOCALE_MAP[params.locale],
      alternateLocale: alternateOgLocales(params.locale),
      type: params.ogType || 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: params.description,
      images: [ogImage],
    },
  };
}

// ==================== HOME ====================

const HOME_TITLE: LocalizedStringMap = {
  en: 'K-Pop Quizzes, Korean Name Generator & Personality Tests | K-Pulse',
  es: 'Tests de K-Pop, Tu Nombre Coreano K-Saju y Quizzes | K-Pulse',
  pt: 'Testes de K-Pop, Seu Nome Coreano K-Saju e Quizzes | K-Pulse',
  ko: 'K-Pop 성향 테스트 · K-사주 한국 이름 작명소 · 팬덤 퀴즈 | K-Pulse',
};

const HOME_DESC: LocalizedStringMap = {
  en: 'Create your authentic K-Saju Korean name, check 1:1 compatibility with 44 K-Pop idols, explore 30 Korea pilgrimage spots, and take free BTS, BLACKPINK & Stray Kids quizzes.',
  es: 'Crea tu nombre coreano según el K-Saju, descubre qué miembro de BTS, BLACKPINK o Stray Kids eres, calcula tu compatibilidad y explora el mapa K-Pop de Corea.',
  pt: 'Descubra seu nome coreano pelo K-Saju, veja qual membro de BTS, BLACKPINK ou Stray Kids você é, calcule sua compatibilidade e explore o mapa K-Pop na Coreia.',
  ko: '생년월일 K-사주 오행 한국 이름 발급부터 44명 아이돌 궁합, 성지순례 지도 30곳, BTS·블랙핑크·스키즈 성향 테스트와 230+ 팬덤 퀴즈까지 무료로 즐겨보세요.',
};

export function getHomeMetadata(locale: SiteLocale): Metadata {
  return buildPageMetadata({
    basePath: '/',
    locale,
    title: pickLocale(HOME_TITLE, locale),
    description: pickLocale(HOME_DESC, locale),
    ogImage: '/images/og-banner.png',
    keywords:
      locale === 'es'
        ? [
            'generador de nombre coreano',
            'test que miembro de blackpink eres',
            'test que miembro de bts eres',
            'test de kpop en espanol',
            'compatibilidad kpop sagu mbti',
            'k-pulse',
          ]
        : locale === 'pt'
        ? [
            'gerador de nome coreano',
            'qual membro do bts voce e',
            'qual membro do blackpink voce e',
            'teste de kpop em portugues',
            'k-pulse',
          ]
        : locale === 'ko'
        ? [
            '한국 이름 생성기',
            'K-사주 작명소',
            '아이돌 궁합 테스트',
            'K-Pop 성향 테스트',
            'K-Pulse',
          ]
        : [
            'Which Member Are You',
            'Korean Name Generator',
            'K-Pop Personality Test',
            'K-Pop Quiz',
            'BTS Trivia',
            'Korean Culture Test',
            'K-Pulse',
          ],
  });
}

// ==================== KOREAN NAME STUDIO ====================

const KOREAN_NAME_TITLE: LocalizedStringMap = {
  en: 'Korean Name Generator (K-Saju Five Elements & Hanja Seal) | K-Pulse',
  es: 'Generador de Nombre Coreano K-Saju (Significado Hanja y Sello) | K-Pulse',
  pt: 'Gerador de Nome Coreano K-Saju (Significado Hanja e Selo) | K-Pulse',
  ko: 'K-사주 한국 이름 작명소 · 오행 한자 뜻 & 낙관 ID 카드 | K-Pulse',
};

const KOREAN_NAME_DESC: LocalizedStringMap = {
  en: 'Get your authentic Korean name balanced by Korean Saju Five Elements from your birthday. Listen to native Korean pronunciation, find your matching K-Pop idol, and save your 9:16 Hanji ID Card.',
  es: 'Descubre tu nombre coreano auténtico equilibrado con los Cinco Elementos del K-Saju según tu fecha de nacimiento. Escucha su pronunciación real y descarga tu tarjeta con sello coreano.',
  pt: 'Descubra seu nome coreano autêntico equilibrado pelos Cinco Elementos do K-Saju. Ouça a pronúncia real em coreano, veja seu idol compatível e baixe seu cartão 9:16 com selo tradicional.',
  ko: '생년월일 사주 오행으로 부족한 기운을 채워주는 3가지 한국 이름(한글·한자 뜻·발음 듣기)과 어울리는 K-Pop 소울메이트 아이돌을 확인하고 전통 낙관 ID 카드로 저장하세요.',
};

export function getKoreanNameFaq(locale: SiteLocale): FaqItem[] {
  if (locale === 'es') {
    return [
      {
        question: '¿Cómo funciona el Generador de Nombre Coreano K-Saju?',
        answer:
          'Calculamos tu elemento principal del Saju coreano (Madera, Fuego, Tierra, Metal o Agua) a partir de tu fecha de nacimiento y elegimos un apellido y nombre coreano auténtico cuyo elemento nutritivo (상생) equilibra tu energía.',
      },
      {
        question: '¿Los nombres coreanos y sus caracteres Hanja son reales?',
        answer:
          'Sí. Cada combinación proviene de apellidos coreanos reales y nombres de dos sílabas cuidadosamente seleccionados con su significado tradicional en Hanja, guía fonética y pronunciación en audio coreano.',
      },
      {
        question: '¿Puedo escuchar cómo se pronuncia mi nombre coreano y guardar la tarjeta?',
        answer:
          'Sí. Puedes reproducir la pronunciación nativa con un toque y descargar gratuitamente tu tarjeta de identificación coreana 9:16 con sello tradicional (낙관) para Instagram, TikTok o WhatsApp.',
      },
      {
        question: '¿Cómo se conecta con la calculadora de compatibilidad K-Pop?',
        answer:
          'Además de tus 3 nombres coreanos recomendados, analizamos tu perfil K-Saju frente a 44 idols reales de BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa y LE SSERAFIM para llevarte directo a tu reporte 1:1.',
      },
    ];
  }

  if (locale === 'pt') {
    return [
      {
        question: 'Como funciona o Gerador de Nome Coreano K-Saju?',
        answer:
          'Calculamos seu elemento principal no Saju coreano (Madeira, Fogo, Terra, Metal ou Água) pela sua data de nascimento e escolhemos um sobrenome e nome coreano autêntico cujo elemento complementar (상생) equilibra sua energia.',
      },
      {
        question: 'Os nomes coreanos e os significados em Hanja são autênticos?',
        answer:
          'Sim. Cada resultado combina sobrenomes coreanos tradicionais com nomes de duas sílabas selecionados junto ao significado real em Hanja, guia fonético e áudio em coreano.',
      },
      {
        question: 'Posso ouvir a pronúncia e salvar meu cartão ID coreano?',
        answer:
          'Sim. Você pode ouvir a pronúncia em coreano com um clique e baixar seu cartão 9:16 com selo tradicional (낙관) para compartilhar no Instagram, TikTok ou WhatsApp.',
      },
      {
        question: 'Como funciona a conexão com o idol K-Pop compatível?',
        answer:
          'Comparamos sua data de nascimento no sistema K-Saju com 44 membros reais de BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa e LE SSERAFIM para mostrar seu match principal e abrir a análise completa.',
      },
    ];
  }

  if (locale === 'ko') {
    return [
      {
        question: 'K-사주 한국 이름 작명소는 어떤 원리로 추천하나요?',
        answer:
          '생년월일로 타고난 일간 오행(목·화·토·금·수)을 계산한 뒤, 전통 성명학의 상생 원리에 따라 나의 기운을 가장 잘 북돋아 주는 인성 오행의 성씨와 한국 이름을 1~3순위까지 정교하게 매칭합니다.',
      },
      {
        question: '추천되는 이름과 한자 뜻풀이는 실제 한국 이름인가요?',
        answer:
          '네. 임의로 음절을 섞지 않고 실제 한국에서 사랑받는 20대 성씨와 한자 의미가 검증된 60여 개의 정통 현대 한국 이름을 기반으로 뜻풀이, 로마자 표기, 한국어 음성 발음을 함께 제공합니다.',
      },
      {
        question: '전통 낙관 도장 ID 카드는 무료로 저장할 수 있나요?',
        answer:
          '네. 회원가입 없이 100% 무료로 9:16 고화질 한지 ID 카드 PNG를 저장하거나 고유 링크로 친구·SNS에 공유할 수 있습니다.',
      },
      {
        question: '추천된 K-Pop 소울메이트 아이돌 궁합과는 어떻게 연결되나요?',
        answer:
          '입력한 생년월일을 바탕으로 7개 그룹 44명의 실제 아이돌 중 가장 오행 궁합이 높은 멤버를 찾아주며, 클릭 한 번으로 생일 정보가 입력된 1:1 사주·MBTI 궁합 리포트로 이어집니다.',
      },
    ];
  }

  return [
    {
      question: 'How does the K-Saju Korean Name Generator work?',
      answer:
        'It calculates your Korean Saju Day Master Five Element (Wood, Fire, Earth, Metal, or Water) from your birth date and pairs you with authentic Korean surnames and two-syllable given names carrying the nurturing element (상생) that balances your aura.',
    },
    {
      question: 'Are the Korean names and Hanja meanings authentic?',
      answer:
        'Yes. Instead of random syllable combinations, every result comes from a curated collection of real Korean surnames and modern two-syllable names with accurate Hanja characters, phonetic pronunciation guides, and cultural context.',
    },
    {
      question: 'Can I hear the Korean pronunciation and download an ID card?',
      answer:
        'Yes. Tap Listen to hear Korean speech synthesis pronounce your full Korean name, switch between your Top 3 picks, and save a 9:16 Hanji paper ID card stamped with a traditional vermilion Hanja seal.',
    },
    {
      question: 'How does it connect to K-Pop idol compatibility?',
      answer:
        'Your generated name report also identifies your highest-compatibility K-Pop idol out of 44 real members across BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa, and LE SSERAFIM, prefilling your birthday into our 1:1 Chemistry Lab.',
    },
  ];
}

export function getKoreanNameMetadata(locale: SiteLocale): Metadata {
  return buildPageMetadata({
    basePath: '/korean-name',
    locale,
    title: pickLocale(KOREAN_NAME_TITLE, locale),
    description: pickLocale(KOREAN_NAME_DESC, locale),
    ogImage: '/images/og/korean-name.png',
    keywords:
      locale === 'es'
        ? [
            'generador de nombre coreano',
            'cual seria mi nombre coreano',
            'tu nombre coreano segun tu fecha de nacimiento',
            'nombre coreano significado hanja',
            'nombre coreano kpop',
            'saju coreano',
          ]
        : locale === 'pt'
        ? [
            'gerador de nome coreano',
            'qual seria meu nome coreano',
            'nome coreano pela data de nascimento',
            'significado nome coreano hanja',
            'nome coreano kpop',
          ]
        : locale === 'ko'
        ? [
            '사주 한국 이름 작명',
            '한글 이름 생성기',
            '오행 이름 추천',
            '외국인 한국 이름 지어주기',
            '한자 이름 뜻풀이',
          ]
        : [
            'korean name generator',
            'what is my korean name',
            'korean name by birthday',
            'saju korean name meaning',
            'hanja korean name generator',
            'kpop korean name',
          ],
  });
}

export function generateKoreanNameJsonLd(locale: SiteLocale) {
  const pageUrl = buildLocalizedUrl('/korean-name', locale);
  const homeUrl = buildLocalizedUrl('/', locale);
  const title = pickLocale(KOREAN_NAME_TITLE, locale);
  const desc = pickLocale(KOREAN_NAME_DESC, locale);
  const homeLabel =
    locale === 'es' ? 'Inicio' : locale === 'pt' ? 'Início' : locale === 'ko' ? '홈' : 'Home';
  const studioLabel =
    locale === 'es'
      ? 'Generador de Nombre Coreano'
      : locale === 'pt'
      ? 'Gerador de Nome Coreano'
      : locale === 'ko'
      ? 'K-사주 한국 이름 작명소'
      : 'Korean Name Studio';

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    url: pageUrl,
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'All',
    inLanguage: locale,
    description: desc,
    image: `${BASE_URL}/images/og/korean-name.png`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: getKoreanNameFaq(locale).map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: studioLabel,
        item: pageUrl,
      },
    ],
  };

  return [webAppSchema, faqSchema, breadcrumbSchema];
}

// ==================== QUIZ ====================

export function getQuizMetadata(quiz: Quiz, locale: SiteLocale): Metadata {
  const seo = getQuizSeoData(quiz, locale);
  return buildPageMetadata({
    basePath: `/quiz/${quiz.slug}`,
    locale,
    title: seo.title,
    ogTitle: seo.ogTitle,
    description: seo.description,
    keywords: seo.keywords,
    ogImage: `/images/og/${quiz.slug}.png`,
  });
}

// ==================== CHEMISTRY HUB & GROUP ====================

const CHEMISTRY_HUB_TITLE: LocalizedStringMap = {
  en: 'K-Pop Idol Soulmate & K-Saju × MBTI Chemistry Calculator | K-Pulse',
  es: 'Calculadora de Compatibilidad K-Pop (K-Saju × MBTI × Zodíaco) | K-Pulse',
  pt: 'Calculadora de Compatibilidade K-Pop (K-Saju × MBTI × Zodíaco) | K-Pulse',
  ko: '아이돌 K-사주 × MBTI 1:1 궁합 연구소 (7개 그룹 44명) | K-Pulse',
};

const CHEMISTRY_HUB_DESC: LocalizedStringMap = {
  en: 'Calculate your 1:1 compatibility with 44 K-Pop idols (BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa, LE SSERAFIM) using Korean Saju Five Elements, MBTI, and Zodiac signs!',
  es: 'Calcula tu porcentaje de compatibilidad 1:1 con 44 miembros de BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa y LE SSERAFIM usando K-Saju y MBTI.',
  pt: 'Calcule sua compatibilidade 1:1 com 44 idols de BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa e LE SSERAFIM usando K-Saju e MBTI.',
  ko: 'BTS·스트레이 키즈·블랙핑크·트와이스·엔하이픈·에스파·르세라핌 44명 멤버의 실제 생년월일 사주 오행과 MBTI로 나와 최애의 1:1 궁합을 분석하세요.',
};

export function getChemistryHubMetadata(locale: SiteLocale): Metadata {
  return buildPageMetadata({
    basePath: '/chemistry',
    locale,
    title: pickLocale(CHEMISTRY_HUB_TITLE, locale),
    description: pickLocale(CHEMISTRY_HUB_DESC, locale),
    ogImage: '/images/og/which-bts-member-is-your-soulmate.png',
  });
}

export function generateChemistryHubJsonLd(locale: SiteLocale, groups: IdolGroupProfile[]) {
  const pageUrl = buildLocalizedUrl('/chemistry', locale);
  const homeUrl = buildLocalizedUrl('/', locale);

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: pickLocale(CHEMISTRY_HUB_TITLE, locale),
    url: pageUrl,
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'All',
    inLanguage: locale,
    description: pickLocale(CHEMISTRY_HUB_DESC, locale),
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity:
      locale === 'es'
        ? [
            {
              '@type': 'Question',
              name: '¿Cómo funciona la calculadora de compatibilidad K-Saju × MBTI?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Combinamos tu fecha de nacimiento (los Cinco Elementos del Saju coreano) con tu tipo MBTI y signo zodiacal para puntuar tu química 1:1 frente a 44 idols reales.',
              },
            },
            {
              '@type': 'Question',
              name: '¿Qué grupos de K-Pop están incluidos?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Incluye los 44 miembros de BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa y LE SSERAFIM.',
              },
            },
          ]
        : locale === 'pt'
        ? [
            {
              '@type': 'Question',
              name: 'Como funciona a calculadora de compatibilidade K-Saju × MBTI?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Combinamos sua data de nascimento (Cinco Elementos do Saju coreano) com seu MBTI e signo para calcular a afinidade 1:1 com 44 idols reais.',
              },
            },
            {
              '@type': 'Question',
              name: 'Quais grupos de K-Pop estão disponíveis?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Inclui todos os 44 membros de BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa e LE SSERAFIM.',
              },
            },
          ]
        : locale === 'ko'
        ? [
            {
              '@type': 'Question',
              name: 'K-사주 × MBTI 아이돌 궁합은 어떻게 계산되나요?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '입력하신 생년월일의 사주 일간 오행(목·화·토·금·수) 상생 관계와 16가지 MBTI 성향, 별자리 조화를 결합해 아이돌 멤버와의 1:1 궁합 점수를 산출합니다.',
              },
            },
            {
              '@type': 'Question',
              name: '어떤 K-Pop 그룹 멤버들과 궁합을 볼 수 있나요?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa, LE SSERAFIM 7개 그룹 44명 전원과의 궁합과 그룹 내 순위를 바로 확인할 수 있습니다.',
              },
            },
          ]
        : [
            {
              '@type': 'Question',
              name: 'How does the K-Saju × MBTI K-Pop compatibility calculator work?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'We compute your Korean Saju Five Element (Wood, Fire, Earth, Metal, or Water) from your birth date and pair it with MBTI cognitive dynamics and Zodiac harmony to score your 1:1 compatibility against 44 idols.',
              },
            },
            {
              '@type': 'Question',
              name: 'Which K-Pop groups are included in the chemistry lab?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'All 44 members from BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa, and LE SSERAFIM are included.',
              },
            },
          ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name:
          locale === 'es' ? 'Inicio' : locale === 'pt' ? 'Início' : locale === 'ko' ? '홈' : 'Home',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name:
          locale === 'es'
            ? 'Química Idol'
            : locale === 'pt'
            ? 'Química Idol'
            : locale === 'ko'
            ? '아이돌 궁합'
            : 'Idol Chemistry Lab',
        item: pageUrl,
      },
    ],
  };

  void groups;
  return [webAppSchema, faqSchema, breadcrumbSchema];
}

export function getChemistryGroupMetadata(
  group: IdolGroupProfile,
  locale: SiteLocale
): Metadata {
  const memberNames = group.members.map((m) => m.name.split(' ')[0]).join(', ');
  const groupName = locale === 'ko' ? group.nameKo : group.name;

  const title =
    locale === 'es'
      ? `Compatibilidad con ${group.name} (K-Saju × MBTI × Zodíaco) | K-Pulse`
      : locale === 'pt'
      ? `Compatibilidade com ${group.name} (K-Saju × MBTI × Zodíaco) | K-Pulse`
      : locale === 'ko'
      ? `${groupName} (${group.name}) 사주 · MBTI 1:1 궁합 계산기 | K-Pulse`
      : `${group.name} Compatibility Calculator (K-Saju × MBTI × Zodiac) | K-Pulse`;

  const description =
    locale === 'es'
      ? `¿Cuál es tu % de compatibilidad con ${group.name} (${memberNames})? Ingresa tu cumpleaños y MBTI para descubrir tu puntuación K-Saju y ranking de alma gemela.`
      : locale === 'pt'
      ? `Qual é a sua compatibilidade % com ${group.name} (${memberNames})? Informe seu aniversário e MBTI para ver sua pontuação K-Saju e ranking completo.`
      : locale === 'ko'
      ? `${groupName} 멤버(${memberNames}) 중 나와 가장 잘 맞는 천생연분은 누구일까요? 생년월일 사주 오행과 MBTI로 10초 만에 1:1 궁합 순위를 확인하세요.`
      : `What is your 1:1 compatibility % with ${group.name} (${memberNames})? Enter your birthday and MBTI to check your Korean Saju Five Elements destiny score and full ${group.name} soulmate ranking!`;

  return buildPageMetadata({
    basePath: `/chemistry/${group.id}`,
    locale,
    title,
    description,
    ogImage: `/images/og/${group.relatedQuizSlug}.png`,
    keywords: [
      `${group.name} compatibility test`,
      `${group.name} MBTI compatibility`,
      `${group.name} Saju compatibility`,
      `${group.nameKo} 궁합`,
      `compatibilidad ${group.name}`,
      `compatibilidade ${group.name}`,
      ...group.members.map((m) => `${m.name} MBTI`),
    ],
  });
}

export function generateChemistryGroupJsonLd(
  group: IdolGroupProfile,
  locale: SiteLocale
) {
  const pageUrl = buildLocalizedUrl(`/chemistry/${group.id}`, locale);
  const hubUrl = buildLocalizedUrl('/chemistry', locale);
  const homeUrl = buildLocalizedUrl('/', locale);
  const memberNames = group.members.map((m) => m.name).join(', ');

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${group.name} K-Saju × MBTI Compatibility Calculator`,
    url: pageUrl,
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'All',
    inLanguage: locale,
    description: `Calculate 1:1 compatibility with ${group.name} members (${memberNames}) using Korean Saju Five Elements, MBTI, and Western Zodiac signs.`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name:
          locale === 'es'
            ? `¿Cuáles son los MBTI y cumpleaños de ${group.name}?`
            : locale === 'pt'
            ? `Quais são os MBTIs e aniversários do ${group.name}?`
            : locale === 'ko'
            ? `${group.nameKo} (${group.name}) 멤버들의 생년월일, MBTI, 사주 오행은 무엇인가요?`
            : `What are the MBTI types and birthdays of ${group.name} members?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: group.members
            .map(
              (m) =>
                `${m.name} (${m.birthDate}, MBTI: ${m.mbti}, Saju: ${SAJU_ELEMENTS[m.sajuElement].nameEn}, Zodiac: ${ZODIAC_META[m.zodiac].nameEn})`
            )
            .join('; '),
        },
      },
      {
        '@type': 'Question',
        name:
          locale === 'es'
            ? `¿Cómo funciona la calculadora de química K-Saju de ${group.name}?`
            : locale === 'pt'
            ? `Como funciona a calculadora K-Saju do ${group.name}?`
            : locale === 'ko'
            ? `${group.nameKo} K-사주 × MBTI 궁합 계산기는 어떻게 동작하나요?`
            : `How does the ${group.name} K-Saju × MBTI Chemistry Calculator work?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The calculator combines Korean Saju Five Elements derived from your birth date with 16-type MBTI synergy and Zodiac harmony to compute a 1:1 compatibility score across all ${group.members.length} ${group.name} members.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'es' ? 'Inicio' : locale === 'pt' ? 'Início' : locale === 'ko' ? '홈' : 'Home',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name:
          locale === 'es'
            ? 'Química Idol'
            : locale === 'pt'
            ? 'Química Idol'
            : locale === 'ko'
            ? '아이돌 궁합'
            : 'Idol Chemistry Lab',
        item: hubUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${group.name}`,
        item: pageUrl,
      },
    ],
  };

  return [webAppSchema, faqSchema, breadcrumbSchema];
}

// ==================== MAP ====================

const MAP_TITLE: LocalizedStringMap = {
  en: 'K-Pop Star Map: BTS, BLACKPINK & Stray Kids Spots in Korea | K-Pulse',
  es: 'Mapa K-Pop en Corea: 30 Lugares Reales de BTS, BLACKPINK y Stray Kids | K-Pulse',
  pt: 'Mapa K-Pop na Coreia: 30 Locais Reais de BTS, BLACKPINK e Stray Kids | K-Pulse',
  ko: 'BTS·블랙핑크·스트레이 키즈 한국 성지순례 지도 (30곳) | K-Pulse',
};

const MAP_DESC: LocalizedStringMap = {
  en: 'Interactive K-Pop pilgrimage map of verified BTS, BLACKPINK, and Stray Kids hometown landmarks, favorite restaurants, agency headquarters, and MV filming locations in Korea.',
  es: 'Mapa interactivo con 30 lugares reales de BTS, BLACKPINK y Stray Kids en Corea: restaurantes favoritos, agencias y locaciones de MVs con fotos y enlaces a Naver, Kakao y Google Maps.',
  pt: 'Mapa interativo com 30 locais reais de BTS, BLACKPINK e Stray Kids na Coreia: restaurantes, agências e cenários de MVs com fotos reais e rotas no Naver, Kakao e Google Maps.',
  ko: 'BTS, 블랙핑크, 스트레이 키즈의 단골 맛집, 소속사, 고향 스팟, 뮤비 촬영지 30곳을 실제 사진과 네이버·카카오·구글 지도 길찾기로 바로 확인하세요.',
};

export function getMapMetadata(locale: SiteLocale): Metadata {
  return buildPageMetadata({
    basePath: '/map',
    locale,
    title: pickLocale(MAP_TITLE, locale),
    description: pickLocale(MAP_DESC, locale),
    ogImage: '/images/og-banner.png',
  });
}

export function generateMapJsonLd(locale: SiteLocale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pickLocale(MAP_TITLE, locale),
    numberOfItems: MAP_SPOTS.length,
    itemListElement: MAP_SPOTS.map((spot, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: spot.name[locale] || spot.name.en,
      description: spot.story[locale] || spot.story.en,
      url: buildLocalizedUrl(`/map/${spot.slug}`, locale),
    })),
  };
}

export function getMapSpotFaq(
  spot: MapSpot,
  nearbySpots: MapSpot[],
  locale: SiteLocale
): FaqItem[] {
  const spotName = getLocalizedMapText(spot.name, locale);
  const address = getLocalizedMapText(spot.address, locale);
  const district = getLocalizedMapText(spot.district, locale);
  const tip = spot.recommendedTip
    ? getLocalizedMapText(spot.recommendedTip, locale)
    : '';
  const nearbyNames = nearbySpots
    .slice(0, 3)
    .map((n) => getLocalizedMapText(n.name, locale))
    .join(', ');

  if (locale === 'ko') {
    return [
      {
        question: `${spotName}의 정확한 주소와 위치는 어디인가요?`,
        answer: `${address} (${district})에 위치해 있습니다. 하단의 네이버 지도·카카오맵·구글 지도 원클릭 길찾기 버튼을 누르면 바로 경로 안내를 시작할 수 있습니다.`,
      },
      {
        question: '한국에서 성지순례 길찾기할 때 어떤 지도 앱이 가장 정확한가요?',
        answer:
          '한국 내 도보·지하철 경로는 네이버 지도(Naver Map)와 카카오맵(KakaoMap)이 가장 정확하며, 각 스팟 페이지에서 원클릭으로 바로 열 수 있습니다.',
      },
      {
        question: '방문 전 알아두면 좋은 팬 팁이나 검증 정보가 있나요?',
        answer: `${tip ? `${tip} ` : ''}(최종 확인일: ${spot.lastVerifiedAt}). 사생활 보호를 위해 비공개 거주지가 아닌 공개 매장·사옥·랜드마크만 제공합니다.`,
      },
      {
        question: `${spotName} 근처에서 함께 가기 좋은 주변 K-Pop 성지는 어디인가요?`,
        answer: nearbyNames
          ? `근처 동선으로 ${nearbyNames} 등을 함께 방문해 보세요.`
          : 'K-Pop 스타 지도 허브에서 같은 그룹의 다른 서울·지방 성지를 함께 둘러보실 수 있습니다.',
      },
    ];
  }

  if (locale === 'es') {
    return [
      {
        question: `¿Cuál es la dirección exacta de ${spotName}?`,
        answer: `Está ubicado en ${address} (${district}). Usa los enlaces directos a Naver Map, KakaoMap o Google Maps en esta página para abrir la ruta al instante.`,
      },
      {
        question: '¿Qué app de mapas funciona mejor para moverse en Corea?',
        answer:
          'En Corea del Sur, Naver Map y KakaoMap ofrecen las rutas a pie y en metro más precisas, y aquí tienes el acceso directo en un toque.',
      },
      {
        question: '¿Algún consejo práctico y verificación reciente antes de ir?',
        answer: `${tip ? `${tip} ` : ''}Información verificada el ${spot.lastVerifiedAt}. K-Pulse excluye estrictamente residencias privadas.`,
      },
      {
        question: `¿Qué otros lugares K-Pop están cerca de ${spotName}?`,
        answer: nearbyNames
          ? `Puedes combinar tu visita con paradas cercanas como ${nearbyNames}.`
          : 'Explora otros puntos del mismo grupo directamente en el Mapa K-Pop.',
      },
    ];
  }

  if (locale === 'pt') {
    return [
      {
        question: `Qual é o endereço exato de ${spotName}?`,
        answer: `Fica em ${address} (${district}). Use os botões diretos para Naver Map, KakaoMap ou Google Maps nesta página para traçar sua rota.`,
      },
      {
        question: 'Qual aplicativo de mapas é mais preciso na Coreia do Sul?',
        answer:
          'Naver Map e KakaoMap são os mais confiáveis para rotas de metrô e caminhada na Coreia, ambos integrados com um clique aqui.',
      },
      {
        question: 'Há alguma dica importante e data de verificação?',
        answer: `${tip ? `${tip} ` : ''}Verificado em ${spot.lastVerifiedAt}. Apenas locais públicos, negócios e marcos oficiais são listados.`,
      },
      {
        question: `Quais outros pontos K-Pop ficam perto de ${spotName}?`,
        answer: nearbyNames
          ? `Você pode combinar o passeio com ${nearbyNames}.`
          : 'Confira mais locais do mesmo grupo no Mapa K-Pop completo.',
      },
    ];
  }

  return [
    {
      question: `What is the exact address of ${spotName}?`,
      answer: `Located at ${address} (${district}). Tap Naver Map, KakaoMap, or Google Maps on this page for instant turn-by-turn directions.`,
    },
    {
      question: 'Which map app works best for K-Pop travel in South Korea?',
      answer:
        'Naver Map and KakaoMap provide the most accurate subway and walking directions inside Korea. This guide includes pre-filled deep links for both plus Google Maps.',
    },
    {
      question: 'Is there a fan tip and verification date for this spot?',
      answer: `${tip ? `${tip} ` : ''}Last verified ${spot.lastVerifiedAt}. Only public businesses, studios, and official landmarks are listed.`,
    },
    {
      question: `What K-Pop spots can I pair near ${spotName}?`,
      answer: nearbyNames
        ? `Popular nearby stops include ${nearbyNames}.`
        : 'Explore more artist landmarks and routes on the main K-Pop Star Map.',
    },
  ];
}

export function getMapSpotMetadata(spot: MapSpot, locale: SiteLocale): Metadata {
  const spotName = getLocalizedMapText(spot.name, locale);
  const district = getLocalizedMapText(spot.district, locale);
  const groupNames = spot.groupIds.map((g) => MAP_GROUPS[g].name).join(' & ');
  const story = getLocalizedMapText(spot.story, locale);

  const title =
    locale === 'ko'
      ? `${spotName} 위치·주소·가는 법 (${groupNames} 성지) | K-Pulse`
      : locale === 'es'
      ? `${spotName}: Dirección, Cómo Llegar y Fotos (${groupNames}) | K-Pulse`
      : locale === 'pt'
      ? `${spotName}: Endereço, Como Chegar e Fotos (${groupNames}) | K-Pulse`
      : `${spotName} — Address, Photos & Directions (${groupNames}) | K-Pulse`;

  const description =
    locale === 'ko'
      ? `${spotName} (${district}) 실제 사진, 정확한 주소, 네이버·카카오 지도 길찾기, 주변 K-Pop 성지와 방문 팁까지 한눈에 확인하세요.`
      : locale === 'es'
      ? `Cómo llegar a ${spotName} en ${district}. Dirección exacta, fotos reales, enlaces a Naver y Google Maps, consejos y paradas ${groupNames} cercanas. ${story}`
      : locale === 'pt'
      ? `Como chegar a ${spotName} em ${district}. Endereço exato, fotos reais, links para Naver e Google Maps, dicas e locais ${groupNames} próximos.`
      : `Visit ${spotName} in ${district}: exact address, real photos, 1-tap Naver & Kakao directions, fan tips, and nearby ${groupNames} spots.`;

  return buildPageMetadata({
    basePath: `/map/${spot.slug}`,
    locale,
    title,
    description: description.slice(0, 160),
    ogType: 'article',
    ogImage: spot.photos?.[0]?.url || '/images/og-banner.png',
    keywords: [
      spot.name.en,
      spot.name.ko,
      `${spot.name.en} address`,
      `${groupNames} Korea spots`,
      ...spot.memberNames.slice(0, 3).map((m) => `${m} Korea spot`),
    ],
  });
}

export function generateMapSpotJsonLd(
  spot: MapSpot,
  nearbySpots: MapSpot[],
  locale: SiteLocale
) {
  const spotName = getLocalizedMapText(spot.name, locale);
  const address = getLocalizedMapText(spot.address, locale);
  const district = getLocalizedMapText(spot.district, locale);
  const story = getLocalizedMapText(spot.story, locale);
  const pageUrl = buildLocalizedUrl(`/map/${spot.slug}`, locale);
  const mapUrl = buildLocalizedUrl('/map', locale);
  const homeUrl = buildLocalizedUrl('/', locale);

  const imageList = (spot.photos || [])
    .slice(0, 3)
    .map((p) => `${BASE_URL}${p.url}`);

  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': spot.category === 'restaurant' ? 'Restaurant' : 'TouristAttraction',
    name: spotName,
    description: story,
    url: pageUrl,
    inLanguage: locale,
    ...(imageList.length > 0 ? { image: imageList } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: district,
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: spot.coordinates.lat,
      longitude: spot.coordinates.lng,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name:
          locale === 'es'
            ? 'Inicio'
            : locale === 'pt'
            ? 'Início'
            : locale === 'ko'
            ? '홈'
            : 'Home',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name:
          locale === 'es'
            ? 'Mapa K-Pop'
            : locale === 'pt'
            ? 'Mapa K-Pop'
            : locale === 'ko'
            ? '성지 지도'
            : 'K-Pop Star Map',
        item: mapUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: spotName,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: getMapSpotFaq(spot, nearbySpots, locale).map(
      ({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })
    ),
  };

  return [placeSchema, breadcrumbSchema, faqSchema];
}

export function getMapCourseMetadata(
  course: MapCourse,
  spots: MapSpot[],
  locale: SiteLocale
): Metadata {
  const titleText = getLocalizedMapText(course.title, locale);
  const descText = getLocalizedMapText(course.description, locale);
  const leadImage = spots[0]?.photos?.[0]?.url || '/images/og-banner.png';

  return buildPageMetadata({
    basePath: `/map/course/${course.slug}`,
    locale,
    title: `${titleText} | K-Pulse`,
    description: descText.slice(0, 160),
    ogType: 'article',
    ogImage: leadImage,
    keywords: [
      course.title.en,
      course.title.ko,
      'Korea K-Pop itinerary',
      ...spots.slice(0, 3).map((s) => s.name.en),
    ],
  });
}

export function generateMapCourseJsonLd(
  course: MapCourse,
  spots: MapSpot[],
  locale: SiteLocale
) {
  const titleText = getLocalizedMapText(course.title, locale);
  const descText = getLocalizedMapText(course.description, locale);
  const pageUrl = buildLocalizedUrl(`/map/course/${course.slug}`, locale);
  const mapUrl = buildLocalizedUrl('/map', locale);
  const homeUrl = buildLocalizedUrl('/', locale);

  const touristTripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: titleText,
    description: descText,
    url: pageUrl,
    inLanguage: locale,
    touristType: 'K-Pop Fans & Korea Travelers',
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: spots.length,
      itemListElement: spots.map((spot, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: getLocalizedMapText(spot.name, locale),
        url: buildLocalizedUrl(`/map/${spot.slug}`, locale),
      })),
    },
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: titleText,
    numberOfItems: spots.length,
    itemListElement: spots.map((spot, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: getLocalizedMapText(spot.name, locale),
      description: getLocalizedMapText(spot.story, locale),
      url: buildLocalizedUrl(`/map/${spot.slug}`, locale),
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name:
          locale === 'es'
            ? 'Inicio'
            : locale === 'pt'
            ? 'Início'
            : locale === 'ko'
            ? '홈'
            : 'Home',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name:
          locale === 'es'
            ? 'Mapa K-Pop'
            : locale === 'pt'
            ? 'Mapa K-Pop'
            : locale === 'ko'
            ? '성지 지도'
            : 'K-Pop Star Map',
        item: mapUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: titleText,
        item: pageUrl,
      },
    ],
  };

  return [touristTripSchema, itemListSchema, breadcrumbSchema];
}

// ==================== GUIDES ====================

const GUIDE_HUB_TITLE: LocalizedStringMap = {
  en: 'K-Culture & K-Pop Knowledge Guides | 230+ Curated Facts & Lore | K-Pulse',
  es: 'Guías de Conocimiento y Lore K-Pop | 230+ Datos Verificados | K-Pulse',
  pt: 'Guias de Conhecimento e Lore K-Pop | 230+ Fatos Verificados | K-Pulse',
  ko: 'K-컬처 & K-Pop 팬 지식 가이드 백과 (230+ 팩트체크) | K-Pulse',
};

const GUIDE_HUB_DESC: LocalizedStringMap = {
  en: 'Explore 230+ verified facts, deep fandom lore, and cultural insights across BTS, Stray Kids, BLACKPINK, Korean Spicy Food, Culture IQ, and KDrama.',
  es: 'Explora más de 230 datos verificados, historias de debut y curiosidades culturales sobre BTS, Stray Kids, BLACKPINK, comida picante y K-Dramas.',
  pt: 'Explore mais de 230 fatos verificados, histórias de debut e curiosidades culturais sobre BTS, Stray Kids, BLACKPINK, comida apimentada e K-Dramas.',
  ko: 'BTS, 스트레이 키즈, 블랙핑크, 한국 매운맛 순위, 문화 IQ, K-드라마까지 230개 이상의 검증된 해설과 팬덤 비하인드 로어를 정독하세요.',
};

export function getGuideHubMetadata(locale: SiteLocale): Metadata {
  return buildPageMetadata({
    basePath: '/guide',
    locale,
    title: pickLocale(GUIDE_HUB_TITLE, locale),
    description: pickLocale(GUIDE_HUB_DESC, locale),
    ogImage: '/images/og/bts-army-trivia.png',
  });
}

export function generateGuideHubJsonLd(locale: SiteLocale) {
  const triviaQuizzes = getTriviaQuizzes();
  const homeUrl = buildLocalizedUrl('/', locale);
  const guideHubUrl = buildLocalizedUrl('/guide', locale);
  const totalQuestionCount = getTotalTriviaQuestionCount();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${pickLocale(GUIDE_HUB_TITLE, locale)} (${totalQuestionCount})`,
    itemListElement: triviaQuizzes.map((guide, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: getLocalizedText(guide, 'title', locale),
      description: getLocalizedText(guide, 'description', locale),
      url: buildLocalizedUrl(`/guide/${guide.slug}`, locale),
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'es' ? 'Inicio' : locale === 'pt' ? 'Início' : locale === 'ko' ? '홈' : 'Home',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name:
          locale === 'es'
            ? 'Guías de Lore'
            : locale === 'pt'
            ? 'Guias de Lore'
            : locale === 'ko'
            ? '지식 가이드'
            : 'Knowledge & Lore Guides',
        item: guideHubUrl,
      },
    ],
  };

  return [itemListSchema, breadcrumbSchema];
}

export function getGuideDetailMetadata(quiz: Quiz, locale: SiteLocale): Metadata {
  const localizedTitle = getLocalizedText(quiz, 'title', locale);
  const count = quiz.questions.length;

  const title =
    locale === 'es'
      ? `${localizedTitle} - Guía Completa de Lore (${count} Datos) | K-Pulse`
      : locale === 'pt'
      ? `${localizedTitle} - Guia Completo de Lore (${count} Fatos) | K-Pulse`
      : locale === 'ko'
      ? `${localizedTitle} - 전체 정답·해설 지식 가이드 (${count}문항) | K-Pulse`
      : `${quiz.title} - Complete Fan Lore & Knowledge Guide (${count} Facts) | K-Pulse`;

  const description =
    locale === 'es'
      ? `Guía verificada y explicaciones de ${localizedTitle}. Repasa ${count} preguntas, respuestas correctas y datos curiosos.`
      : locale === 'pt'
      ? `Guia verificado e explicações de ${localizedTitle}. Confira ${count} perguntas, respostas corretas e curiosidades.`
      : locale === 'ko'
      ? `${localizedTitle} 전체 ${count}개 문항의 정확한 정답과 심층 해설, 팬덤 비하인드 로어를 무료로 확인하세요.`
      : `Study guide & verified explanations for ${quiz.title}. Explore ${count} questions, correct answers, cultural context, and insider fun facts.`;

  return buildPageMetadata({
    basePath: `/guide/${quiz.slug}`,
    locale,
    title,
    description,
    ogType: 'article',
    ogImage: `/images/og/${quiz.slug}.png`,
  });
}

export function generateGuideDetailJsonLd(quiz: Quiz, locale: SiteLocale) {
  const localizedTitle = getLocalizedText(quiz, 'title', locale);
  const homeUrl = buildLocalizedUrl('/', locale);
  const hubUrl = buildLocalizedUrl('/guide', locale);
  const pageUrl = buildLocalizedUrl(`/guide/${quiz.slug}`, locale);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: quiz.questions.map((q) => {
      const correctOpt = q.options.find((opt) => opt.id === q.correctAnswer);
      const ansText = correctOpt ? getLocalizedText(correctOpt, 'text', locale) : '';
      const expText = getLocalizedText(q, 'explanation', locale);
      const funText = getLocalizedText(q, 'funFact', locale);
      const fullAnswer = `${ansText}. ${expText}${funText ? ` ${funText}` : ''}`.trim();

      return {
        '@type': 'Question',
        name: getLocalizedText(q, 'question', locale),
        acceptedAnswer: {
          '@type': 'Answer',
          text: fullAnswer,
        },
      };
    }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'es' ? 'Inicio' : locale === 'pt' ? 'Início' : locale === 'ko' ? '홈' : 'Home',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name:
          locale === 'es'
            ? 'Guías'
            : locale === 'pt'
            ? 'Guias'
            : locale === 'ko'
            ? '지식 가이드'
            : 'Knowledge Guides',
        item: hubUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: localizedTitle,
        item: pageUrl,
      },
    ],
  };

  return [faqSchema, breadcrumbSchema];
}
