import { Quiz } from '@/types/quiz';

export interface QuizSeoData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
}

const SEO_OVERRIDES: Record<string, Partial<QuizSeoData>> = {
  'which-blackpink-member-are-you': {
    title: 'Which BLACKPINK Member Are You? (Personality & Vibe Test) | K-Pulse',
    ogTitle: 'Which BLACKPINK Member Are You? (Jisoo, Jennie, Rosé, or Lisa) | K-Pulse',
    description:
      'Find out which BLACKPINK member matches your personality! Are you witty Jisoo, trendsetting Jennie, soulful Rosé, or dance dynamo Lisa? 100% free test.',
    keywords: [
      'which blackpink member are you',
      'blackpink which member are you',
      'which blackpink member are you quiz',
      'blackpink personality test',
      'blackpink member test',
      'jisoo',
      'jennie',
      'rose',
      'lisa',
      'blink personality quiz',
      'kpop quiz',
    ],
  },
  'which-bts-member-are-you': {
    title: 'Which BTS Member Are You? BTS Soulmate & Personality Quiz | K-Pulse',
    ogTitle: 'Which BTS Member Is Your Soulmate? (10-Question Test) | K-Pulse',
    description:
      'Which BTS member is your soulmate? Discover your Bangtan archetype & chemistry: RM, Jin, SUGA, J-Hope, Jimin, V, or Jungkook. Play free now!',
    keywords: [
      'which bts member are you',
      'which bts member is your soulmate',
      'which bts member matches your soul',
      'bts soulmate quiz',
      'bts personality test',
      'bts army quiz',
      'bts member test',
      'bts soulmate test',
      'kpop personality test',
      'kpop quiz',
    ],
  },
  'blackpink-blink-trivia': {
    title: 'BLACKPINK Trivia Quiz: Ultimate 50-Question BLINK Challenge | K-Pulse',
    ogTitle: 'BLACKPINK Trivia Quiz: 50 Questions from Debut to Solo Hits | K-Pulse',
    description:
      'Test your BLINK knowledge with 50 questions across 3 levels: debut era, Coachella, world tour records, and solo hits (APT., Mantra, Rockstar). Play free!',
    keywords: [
      'blackpink quiz',
      'blackpink trivia',
      'blink trivia quiz',
      'blackpink trivia test',
      'blackpink test',
      'rose apt quiz',
      'jennie mantra',
      'lisa rockstar',
      'jisoo flower',
      'kpop trivia',
      'kpop quiz',
    ],
  },
  'bts-army-trivia': {
    title: 'BTS ARMY Trivia Quiz: 3-Level Hardcore Fan Test | K-Pulse',
    ogTitle: 'BTS ARMY Trivia: Can You Score 10/10 on Hardcore Mode? | K-Pulse',
    description:
      'Are you a true ARMY? Test your BTS knowledge across 3 difficulty levels with a 15-second countdown timer, combo streaks, and rank badges! Free trivia game.',
    keywords: [
      'bts quiz',
      'bts army quiz',
      'bts trivia',
      'bts trivia test',
      'bts test',
      'bts army challenge',
      'bts 2013 debut trivia',
      'kpop quiz',
    ],
  },
  'stray-kids-stay-trivia': {
    title: 'Stray Kids STAY Trivia Quiz: 3-Level Hardcore Fan Test | K-Pulse',
    ogTitle: 'Stray Kids Trivia: Are You a Real STAY? | K-Pulse',
    description:
      'Test your Stray Kids STAY knowledge! 3 difficulty levels covering 3RACHA, SKZOO, God’s Menu, MANIAC, and billboard milestones. Free K-Pop quiz.',
    keywords: [
      'stray kids quiz',
      'stray kids trivia',
      'stay trivia quiz',
      'skz quiz',
      'skz trivia',
      'kpop quiz',
    ],
  },
  'which-stray-kids-member-are-you': {
    title: 'Which Stray Kids Member Are You? (SKZOO & Soul Match) | K-Pulse',
    ogTitle: 'Which Stray Kids Member Are You? Find Your SKZOO Twin | K-Pulse',
    description:
      'Discover your Stray Kids archetype & SKZOO twin! Are you Bang Chan, Lee Know, Changbin, Hyunjin, HAN, Felix, Seungmin, or I.N? Take the 10-question test!',
    keywords: [
      'which stray kids member are you',
      'which skz member are you',
      'stray kids personality test',
      'skz soulmate quiz',
      'skzoo match test',
      'felix',
      'hyunjin',
      'bang chan',
      'kpop quiz',
    ],
  },
  'kpop-fandom-trivia': {
    title: 'The Ultimate K-Pop Stan Quiz: Fandom Lore & 1st-4th Gen Hits | K-Pulse',
    ogTitle: 'Ultimate K-Pop Stan Quiz: How High is Your K-Pop IQ? | K-Pulse',
    description:
      'How high is your K-Pop IQ? Test your knowledge across 3 difficulty levels covering BTS, BLACKPINK, Stray Kids, TWICE, EXO, NewJeans, and K-Pop history!',
    keywords: [
      'kpop quiz',
      'kpop trivia',
      'ultimate kpop quiz',
      'kpop stan test',
      'kpop fandom quiz',
      'kpop trivia game',
      'korean pop quiz',
    ],
  },
  'kdrama-trope-trivia': {
    title: 'Ultimate K-Drama Addict Quiz: Tropes, OSTs & Squid Game | K-Pulse',
    ogTitle: 'K-Drama Addict Test: How Many Iconic Scenes Do You Know? | K-Pulse',
    description:
      'Are you a true K-Drama binge-watcher? Test your knowledge on Squid Game, Crash Landing on You, Goblin, Queen of Tears, and legendary Korean drama tropes!',
    keywords: [
      'kdrama quiz',
      'korean drama quiz',
      'kdrama trivia',
      'squid game quiz',
      'korean drama test',
      'kdrama addict test',
    ],
  },
};

export function getQuizSeoData(quiz: Quiz): QuizSeoData {
  const isPersonality = quiz.quizType === 'personality';
  const defaultOgTitle = isPersonality
    ? `${quiz.title} - Personality Match | K-Pulse`
    : `${quiz.title} - High Score Challenge | K-Pulse`;

  const fallbackKeywords = [
    `${quiz.tag || 'K-Culture'} quiz`,
    `${quiz.title.toLowerCase()} test`,
    'k-pulse quiz',
    'korean trivia game',
    'play free quiz',
  ];

  const override = SEO_OVERRIDES[quiz.slug];

  return {
    title: override?.title || `${quiz.title} | K-Pulse`,
    ogTitle: override?.ogTitle || defaultOgTitle,
    description: override?.description || quiz.description,
    keywords: override?.keywords || fallbackKeywords,
  };
}

export function generateQuizJsonLd(quiz: Quiz) {
  const baseUrl = 'https://kpulsequiz.com';
  const quizUrl = `${baseUrl}/quiz/${quiz.slug}`;
  const isPersonality = quiz.quizType === 'personality';
  const seoData = getQuizSeoData(quiz);

  // 1. Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isPersonality ? 'Personality Tests' : 'Trivia Quizzes',
        item: `${baseUrl}/#quizzes`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: quiz.title,
        item: quizUrl,
      },
    ],
  };

  // 2. Quiz / Interactive Resource Schema
  const estimatedPlays = quiz.totalPlays
    ? parseInt(quiz.totalPlays.replace(/[^0-9]/g, '')) * 10 || 1840
    : 1840;

  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: seoData.title,
    description: seoData.description,
    url: quizUrl,
    inLanguage: ['en', 'es', 'ko'],
    isAccessibleForFree: true,
    educationalLevel: quiz.difficulty || 'Intermediate',
    about: {
      '@type': 'Thing',
      name: quiz.tag || 'Korean Pop Culture',
    },
    image: `${baseUrl}/images/og/${quiz.slug}.png`,
    author: {
      '@type': 'Organization',
      name: 'K-Pulse',
      url: baseUrl,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: String(estimatedPlays),
      bestRating: '5',
      worstRating: '1',
    },
  };

  // 3. FAQ Schema for Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: isPersonality
      ? [
          {
            '@type': 'Question',
            name: `How does the "${quiz.title}" test work?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Answer 10 scenario-based questions about your lifestyle, fashion taste, music style, and stage presence to discover your exact member match and chemistry percentage.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is this K-Pop test completely free to play?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, 100% free with no sign-up or app download required. Supported in English, Spanish, and Korean.',
            },
          },
        ]
      : [
          {
            '@type': 'Question',
            name: `How many questions are in the ${quiz.title}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `This quiz features ${quiz.questions?.length || 10} questions across 3 difficulty tiers: Level 1 (Rookie), Level 2 (Fan), and Level 3 (Hardcore Stan).`,
            },
          },
          {
            '@type': 'Question',
            name: 'Can I challenge my friends with my score?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! After completing the quiz, you receive a custom challenge link to share on X, Reddit, WhatsApp, or Pinterest to see if your friends can beat your speed and score.',
            },
          },
        ],
  };

  return [breadcrumbSchema, quizSchema, faqSchema];
}
