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

/** FAQ shown on the quiz page and emitted as FAQPage structured data. */
export function getQuizFaq(quiz: Quiz): FaqItem[] {
  const free: FaqItem = {
    question: quiz.quizType === 'personality' ? 'Is this test free?' : 'Is this quiz free?',
    answer: 'Yes. It is 100% free with no sign-up or app download, and it works in English, Spanish, and Korean.',
  };

  if (quiz.quizType === 'personality') {
    const results = Object.values(quiz.personalityResults || {}).map((r) => r.name);
    const questionCount = quiz.personalityQuestions?.length || 10;
    const faq: FaqItem[] = [
      {
        question: `How does the "${quiz.title}" test work?`,
        answer: `Answer ${questionCount} scenario-based questions about your lifestyle, taste, and personality. Each answer adds points toward a member, and the highest score is your match.`,
      },
    ];
    if (results.length > 0) {
      faq.push({
        question: 'What results can I get?',
        answer: `You can match with ${results.join(', ')}. Each result explains your shared traits and your best-match member.`,
      });
    }
    return [...faq, free];
  }

  const total = quiz.questions?.length || 0;
  return [
    {
      question: `How many questions are in the ${quiz.title}?`,
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
