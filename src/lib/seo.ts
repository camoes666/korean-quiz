import { Question, Quiz } from '@/types/quiz';

export interface QuizSeoData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
}

// `{n}` in a title is replaced with the quiz's question count, so titles stay accurate
// as question banks grow. Trivia titles lead with the phrases people actually search
// ("bts quiz", "how well do you know bts").
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
      // Spanish keywords (LATAM & Spain)
      'que miembro de blackpink eres',
      'que integrante de blackpink eres',
      'test que miembro de blackpink eres',
      'test de personalidad blackpink',
      'quiz blackpink espanol',
      'quien eres de blackpink',
      'test blackpink espanol',
      'blackpink test alma gemela',
      'con que miembro de blackpink eres compatible',
      'blackpink test espanol',
    ],
  },
  'which-bts-member-are-you': {
    title: 'Which BTS Member Are You? BTS Soulmate & Personality Quiz | K-Pulse',
    ogTitle: 'Which BTS Member Is Your Soulmate? (10-Question Test) | K-Pulse',
    description:
      'Which BTS Member is your soulmate? Discover your Bangtan archetype & chemistry: RM, Jin, SUGA, J-Hope, Jimin, V, or Jungkook. Play free now!',
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
      // Spanish keywords (LATAM & Spain)
      'que miembro de bts eres',
      'que integrante de bts es tu alma gemela',
      'bts test alma gemela',
      'test de personalidad bts',
      'quien eres de bts',
      'test bts espanol',
      'bts quiz espanol',
      'miembro de bts segun tu personalidad',
      'con quien de bts eres compatible',
      'alma gemela bts test',
    ],
  },
  'which-bts-member-is-your-soulmate': {
    title: 'Which BTS Member Is Your Soulmate? (BTS Soulmate Quiz) | K-Pulse',
    ogTitle: 'Which BTS Member Is Your Soulmate? Find Your BTS Best Friend | K-Pulse',
    description:
      'Which BTS member is your soulmate? Answer 10 questions about friendship and find out if RM, Jin, SUGA, J-Hope, Jimin, V, or Jungkook is your BTS best friend. Free!',
    keywords: [
      'which bts member is your soulmate',
      'bts soulmate quiz',
      'bts soulmate test',
      'who is your bts soulmate',
      'which bts member is your best friend',
      'bts best friend quiz',
      'bts friendship quiz',
      'which bts member would be your best friend',
      'kpop soulmate quiz',
      'bts quiz',
      // Spanish keywords (LATAM & Spain)
      'que miembro de bts es tu alma gemela',
      'bts test alma gemela',
      'alma gemela bts test',
      'que miembro de bts seria tu mejor amigo',
      'test bts mejor amigo',
    ],
  },
  'blackpink-blink-trivia': {
    title: 'BLACKPINK Quiz: How Well Do You Know BLACKPINK? ({n} Questions) | K-Pulse',
    ogTitle: 'BLACKPINK Trivia Quiz: 50 Questions from Debut to Solo Hits | K-Pulse',
    description:
      'Test your BLINK knowledge with 50 questions across 3 levels: debut era, Coachella, world tour records, and solo hits (APT., Mantra, Rockstar). Play free!',
    keywords: [
      'blackpink quiz',
      'how well do you know blackpink',
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
      // Spanish keywords (LATAM & Spain)
      'quiz de blackpink en espanol',
      'preguntas de blackpink',
      'cuanto sabes de blackpink',
      'trivia blackpink espanol',
      'test blink espanol',
      'quiz blackpink preguntas',
    ],
  },
  'bts-army-trivia': {
    title: 'BTS Quiz: How Well Do You Know BTS? ({n} Questions) | K-Pulse',
    ogTitle: 'BTS ARMY Trivia: Can You Score 10/10 on Hardcore Mode? | K-Pulse',
    description:
      'Are you a true ARMY? Test your BTS knowledge across 3 difficulty levels with a 15-second countdown timer, combo streaks, and rank badges! Free trivia game.',
    keywords: [
      'bts quiz',
      'how well do you know bts',
      'bts army quiz',
      'bts trivia',
      'bts trivia test',
      'bts test',
      'bts army challenge',
      'bts 2013 debut trivia',
      'kpop quiz',
      // Spanish keywords (LATAM & Spain)
      'quiz de bts en espanol',
      'cuanto sabes de bts',
      'preguntas de bts',
      'trivia bts espanol',
      'test army espanol',
      'quiz bts preguntas',
    ],
  },
  'stray-kids-stay-trivia': {
    title: 'Stray Kids Quiz: How Well Do You Know SKZ? ({n} Questions) | K-Pulse',
    ogTitle: 'Stray Kids Trivia: Are You a Real STAY? | K-Pulse',
    description:
      'Test your Stray Kids STAY knowledge! 3 difficulty levels covering 3RACHA, SKZOO, God’s Menu, MANIAC, and billboard milestones. Free K-Pop quiz.',
    keywords: [
      'stray kids quiz',
      'how well do you know stray kids',
      'stray kids trivia',
      'stay trivia quiz',
      'skz quiz',
      'skz trivia',
      'kpop quiz',
      // Spanish keywords
      'quiz stray kids espanol',
      'cuanto sabes de stray kids',
      'preguntas de stray kids',
      'test stay espanol',
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
      // Spanish keywords
      'que miembro de stray kids eres',
      'test stray kids espanol',
      'quien eres de stray kids',
      'stray kids alma gemela test',
    ],
  },
  'kpop-fandom-trivia': {
    title: 'K-Pop Quiz: How Well Do You Know K-Pop? ({n} Questions) | K-Pulse',
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
      // Spanish keywords
      'quiz kpop espanol',
      'test de kpop en espanol',
      'cuanto sabes de kpop',
      'preguntas de kpop espanol',
    ],
  },
  'kdrama-trope-trivia': {
    title: 'K-Drama Quiz: Tropes, OSTs & Squid Game ({n} Questions) | K-Pulse',
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
      // Spanish keywords
      'quiz kdrama espanol',
      'test dramas coreanos espanol',
      'cuanto sabes de doramas',
      'quiz series coreanas',
    ],
  },
  'korean-culture-iq': {
    title: 'Korean Culture Quiz: Etiquette & Customs Test ({n} Questions) | K-Pulse',
    ogTitle: 'Korean Culture Quiz: Would You Survive Dinner in Korea? | K-Pulse',
    description:
      'How well do you know Korean culture? Test yourself on dining etiquette, age and honorifics, holidays, and taboos. Free Korean culture quiz with answers explained.',
    keywords: [
      'korean culture quiz',
      'korean etiquette quiz',
      'korea quiz',
      'korean customs test',
      'how well do you know korea',
      'korean culture trivia',
      // Spanish keywords
      'quiz cultura coreana',
      'test cultura de corea del sur',
      'costumbres coreanas quiz',
    ],
  },
  'korean-spicy-food': {
    title: 'Korean Food Quiz: Spicy Food & Street Snacks ({n} Questions) | K-Pulse',
    ogTitle: 'Korean Food Quiz: How Spicy Can You Go? | K-Pulse',
    description:
      'How well do you know Korean food? Test yourself on tteokbokki, buldak, kimchi, and street snacks across 3 levels. Free K-food quiz with answers explained.',
    keywords: [
      'korean food quiz',
      'k-food quiz',
      'korean spicy food quiz',
      'buldak quiz',
      'korean street food trivia',
      'how well do you know korean food',
      // Spanish keywords
      'quiz comida coreana',
      'test comida coreana espanol',
      'cuanto sabes de comida coreana',
    ],
  },
  'which-korean-food-are-you': {
    title: 'Which Korean Food Are You? (K-Food Soulmate & Personality Test) | K-Pulse',
    ogTitle: 'Which Korean Food Matches Your Soul? (10-Question Test) | K-Pulse',
    description:
      'Find out which Korean food matches your personality! Are you fiery Spicy Tteokbokki, sizzling K-BBQ Samgyeopsal, comforting Kimchi Jjigae, Chimaek, or Bungeoppang? Free 10-question test.',
    keywords: [
      'which korean food are you',
      'which korean food are you quiz',
      'what korean food am i',
      'korean food personality test',
      'k-food soulmate quiz',
      'korean street food personality quiz',
      'tteokbokki',
      'samgyeopsal',
      'kimchi jjigae',
      'chimaek',
      'bungeoppang',
      // Spanish keywords (LATAM & Spain)
      'que comida coreana eres',
      'que platillo coreano eres',
      'test que comida coreana eres',
      'test de personalidad comida coreana',
      'quiz comida coreana alma gemela',
    ],
  },
  'which-aespa-member-are-you': {
    title: 'Which aespa Member Are You? Supernova & Soulmate Quiz | K-Pulse',
    ogTitle: 'Which aespa Member Are You? (Karina, Winter, Giselle, or Ningning) | K-Pulse',
    description:
      'Find out which aespa member matches your soul! Are you AI-visual Karina, vocal ace Winter, chill hot girl Giselle, or artistic Ningning? 100% free personality test.',
    keywords: [
      'which aespa member are you',
      'aespa personality test',
      'aespa member test',
      'aespa quiz',
      'which aespa member are you quiz',
      'aespa soulmate quiz',
      'karina',
      'winter',
      'giselle',
      'ningning',
      'kpop personality test',
      'kpop quiz',
      // Spanish keywords (LATAM & Spain)
      'que miembro de aespa eres',
      'que integrante de aespa eres',
      'test que miembro de aespa eres',
      'test de personalidad aespa',
      'quien eres de aespa',
      'test aespa espanol',
      'quiz aespa espanol',
      'aespa test alma gemela',
    ],
  },
  'which-le-sserafim-member-are-you': {
    title: 'Which LE SSERAFIM Member Are You? FEARLESS & Soulmate Quiz | K-Pulse',
    ogTitle: 'Which LE SSERAFIM Member Are You? (Chaewon, Sakura, Yunjin, Kazuha, Eunchae) | K-Pulse',
    description:
      'Discover your LE SSERAFIM archetype! Are you leader Chaewon, resilient icon Sakura, hot girl Yunjin, ballerina Kazuha, or vitamin maknae Eunchae? Free 10-question test.',
    keywords: [
      'which le sserafim member are you',
      'le sserafim personality quiz',
      'le sserafim personality test',
      'which le sserafim member is your soulmate',
      'le sserafim quiz',
      'chaewon',
      'sakura',
      'yunjin',
      'kazuha',
      'eunchae',
      'kpop personality test',
      'kpop quiz',
      // Spanish keywords (LATAM & Spain)
      'que miembro de le sserafim eres',
      'que integrante de le sserafim eres',
      'test que miembro de le sserafim eres',
      'test de personalidad le sserafim',
      'quien eres de le sserafim',
      'test le sserafim espanol',
      'quiz le sserafim espanol',
      'le sserafim test alma gemela',
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

  const questionCount = String(quiz.questions?.length || 0);

  return {
    title: (override?.title || `${quiz.title} | K-Pulse`).replace('{n}', questionCount),
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
  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: seoData.title,
    description: seoData.description,
    url: quizUrl,
    inLanguage: 'en',
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
  };

  // 3. FAQ Schema: mirrors the FAQ rendered on the page (Google requires it to be visible)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: getQuizFaq(quiz).map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  return [breadcrumbSchema, quizSchema, faqSchema];
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQ shown on the quiz page and emitted as FAQPage structured data. English only: the page
 * URL is indexed as English, so mixing in other languages here dilutes it without ranking
 * for those languages (that needs separate localized URLs).
 */
export function getQuizFaq(quiz: Quiz): FaqItem[] {
  const isPersonality = quiz.quizType === 'personality';
  const free: FaqItem = {
    question: isPersonality ? 'Is this test free to play?' : 'Is this quiz free to play?',
    answer: 'Yes. It is 100% free with no sign-up or app download required. You can also switch the site to Spanish or Korean.',
  };

  if (isPersonality) {
    const results = Object.values(quiz.personalityResults || {}).map((r) => r.name);
    const questionCount = quiz.personalityQuestions?.length || 10;

    const faq: FaqItem[] = [
      {
        question: `How does the "${quiz.title}" test work?`,
        answer: `Answer ${questionCount} scenario-based questions about your lifestyle, taste, and personality. Each answer adds points toward a match, and the highest score reveals your archetype.`,
      },
    ];
    if (results.length > 0) {
      faq.push({
        question: 'What results can I get?',
        answer: `You can match with ${results.join(', ')}. Each result explains your shared traits and your best match.`,
      });
    }
    return [...faq, free];
  }

  const total = quiz.questions?.length || 0;
  return [
    {
      question: `How many questions are in "${quiz.title}"?`,
      answer: `The question bank has ${total} questions across 3 difficulty levels: Level 1 (Rookie), Level 2 (Fan), and Level 3 (Hardcore). Each round picks 5 random questions, so every play is different.`,
    },
    {
      question: 'Do I get the answers explained?',
      answer: 'Yes. After each question you see the correct answer with a short explanation and a fun fact.',
    },
    {
      question: 'Can I challenge my friends?',
      answer: 'Yes. When you finish, you get a challenge link with your score to share so friends can try to beat it.',
    },
    free,
  ];
}

/** One easy, one medium and one hard question, shown on the page as crawlable sample content. */
export function getSampleQuestions(quiz: Quiz): Question[] {
  const questions = quiz.questions || [];
  const samples: Question[] = [];
  for (const level of [1, 2, 3]) {
    const q = questions.find((x) => x.level === level);
    if (q) samples.push(q);
  }
  for (const q of questions) {
    if (samples.length >= 3) break;
    if (!samples.includes(q)) samples.push(q);
  }
  return samples;
}
