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
    title: 'Which BLACKPINK Member Are You? (Personality & Vibe Quiz) | K-Pulse',
    ogTitle: 'Which BLACKPINK Member Are You? (Jisoo, Jennie, Rosé, or Lisa) | K-Pulse',
    description:
      'Find out what BLACKPINK member you are! Take this 10-question BLACKPINK personality quiz to see if you match witty Jisoo, trendsetting Jennie, soulful Rosé, or Lisa.',
    keywords: [
      'which blackpink member are you',
      'what blackpink member are you',
      'blackpink which member are you',
      'which blackpink member are you quiz',
      'what blackpink member are you quiz',
      'which blackpink member is your soulmate',
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
    ogTitle: 'Which BTS Member Are You? (10-Question Soulmate & Personality Test) | K-Pulse',
    description:
      'Which BTS member are you and who is your BTS soulmate? Discover your Bangtan archetype, BT21 twin & chemistry: RM, Jin, SUGA, J-Hope, Jimin, V, or Jungkook. Play free!',
    keywords: [
      'which bts member are you',
      'what bts member are you',
      'which bts member are you quiz',
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
      'Which BTS member is your soulmate? Take this 10-question BTS soulmate quiz to find out if RM, Jin, SUGA, J-Hope, Jimin, V, or Jungkook is your true BTS best friend!',
    keywords: [
      'which bts member is your soulmate',
      'bts soulmate quiz',
      'bts soulmate test',
      'who is your bts soulmate',
      'which bts member is your best friend',
      'bts best friend quiz',
      'bts friendship quiz',
      'which bts member would be your best friend',
      'which bts member are you',
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
    title: 'Which Stray Kids Member Are You? (SKZOO & Soulmate Quiz) | K-Pulse',
    ogTitle: 'Which Stray Kids Member Are You? Find Your SKZOO Twin | K-Pulse',
    description:
      'Find out what Stray Kids member you are and discover your SKZOO twin! Are you Bang Chan, Lee Know, Changbin, Hyunjin, HAN, Felix, Seungmin, or I.N? Free 10-question quiz.',
    keywords: [
      'which stray kids member are you',
      'what stray kids member are you',
      'which stray kids member are you quiz',
      'which skz member are you',
      'which stray kids member is your soulmate',
      'stray kids personality test',
      'stray kids soulmate quiz',
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
      'what aespa member are you',
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
      'what le sserafim member are you',
      'which le sserafim member are you quiz',
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
  'which-twice-member-are-you': {
    title: 'Which TWICE Member Are You? (ONCE Personality & Soulmate Quiz) | K-Pulse',
    ogTitle: 'Which TWICE Member Are You? (All 9 Members & Lovelys Match) | K-Pulse',
    description:
      'Find out what TWICE member you are! Answer 10 questions to match with Nayeon, Jeongyeon, Momo, Sana, Jihyo, Mina, Dahyun, Chaeyoung, or Tzuyu + your Lovelys twin.',
    keywords: [
      'which twice member are you',
      'what twice member are you',
      'which twice member are you quiz',
      'twice personality quiz',
      'twice personality test',
      'which twice member is your soulmate',
      'twice soulmate quiz',
      'twice member test',
      'nayeon',
      'sana',
      'momo',
      'mina',
      'jihyo',
      'tzuyu',
      'dahyun',
      'chaeyoung',
      'jeongyeon',
      'kpop personality test',
      'kpop quiz',
      // Spanish keywords (LATAM & Spain)
      'que miembro de twice eres',
      'que integrante de twice eres',
      'test que miembro de twice eres',
      'test de personalidad twice',
      'quien eres de twice',
      'test twice espanol',
      'twice test alma gemela',
    ],
  },
  'which-enhypen-member-are-you': {
    title: 'Which ENHYPEN Member Are You? (ENGENE Soulmate & Personality Quiz) | K-Pulse',
    ogTitle: 'Which ENHYPEN Member Are You? (Jungwon, Heeseung, Jay, Jake, Sunghoon, Sunoo, Ni-ki) | K-Pulse',
    description:
      'Find out which ENHYPEN member matches your personality and who is your ENGENE soulmate! Are you Jungwon, Heeseung, Jay, Jake, Sunghoon, Sunoo, or Ni-ki? Free 10-question test.',
    keywords: [
      'which enhypen member are you',
      'what enhypen member are you',
      'which enhypen member are you quiz',
      'which enhypen member is your soulmate',
      'enhypen personality test',
      'enhypen personality quiz',
      'enhypen soulmate quiz',
      'enhypen member quiz',
      'heeseung',
      'sunghoon',
      'jake',
      'ni-ki',
      'sunoo',
      'jungwon',
      'jay',
      'kpop personality test',
      'kpop quiz',
      // Spanish keywords (LATAM & Spain)
      'que miembro de enhypen eres',
      'que integrante de enhypen eres',
      'test que miembro de enhypen eres',
      'test de personalidad enhypen',
      'quien eres de enhypen',
      'test enhypen espanol',
      'enhypen test alma gemela',
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

const PERSONALITY_FAQ_EXTRAS: Record<string, FaqItem[]> = {
  'which-bts-member-are-you': [
    {
      question: 'Which BTS member are you vs. which BTS member is your soulmate?',
      answer:
        'This test matches your core personality to one of the 7 BTS members (RM, Jin, SUGA, J-Hope, Jimin, V, or Jungkook), reveals your BT21 character twin (KOYA, RJ, SHOOKY, MANG, CHIMMY, TATA, or COOKY), and shows which member has the best chemistry with you as your BTS soulmate.',
    },
    {
      question: 'Can I compare my BTS member result with my friends?',
      answer:
        'Yes! After finishing the 10-question BTS personality quiz, copy your personalized link or save your result card image to compare your Bangtan archetype and soulmate compatibility with friends.',
    },
  ],
  'which-bts-member-is-your-soulmate': [
    {
      question: 'How does the BTS Soulmate Quiz determine your best friend match?',
      answer:
        'Unlike a standard trivia test, the BTS Soulmate Quiz analyzes how you handle friendship, late-night talks, travel, and comfort to pair you with RM, Jin, SUGA, J-Hope, Jimin, V, or Jungkook.',
    },
    {
      question: 'What is the difference between Which BTS Member Are You and the BTS Soulmate Quiz?',
      answer:
        '"Which BTS Member Are You" finds the member whose personality mirrors yours, while "Which BTS Member Is Your Soulmate" focuses on friendship chemistry and who complements your vibe best.',
    },
  ],
  'which-blackpink-member-are-you': [
    {
      question: 'How do I know what BLACKPINK member I am (Jisoo, Jennie, Rosé, or Lisa)?',
      answer:
        'Each of the 10 questions tests your fashion aura, social energy, and creative instincts. Witty 4D anchors match with Jisoo, bold trendsetters match with Jennie, soulful romantics match with Rosé, and fearless performers match with Lisa.',
    },
    {
      question: 'Does this BLACKPINK quiz also show my member compatibility?',
      answer:
        'Yes! Along with your primary BLACKPINK persona and signature character twin, your result reveals your best BLACKPINK duo match (such as JenSoo or ChaeLisa) and why your personalities click.',
    },
  ],
  'which-stray-kids-member-are-you': [
    {
      question: 'Which Stray Kids member and SKZOO character am I?',
      answer:
        'This 10-question Stray Kids personality test matches you with all 8 members and their official SKZOO avatars: Bang Chan (Wolf Chan), Lee Know (Leebit), Changbin (DWAEKKI), Hyunjin (Jiniret), HAN (HAN QUOKKA), Felix (BbokAri), Seungmin (PuppyM), or I.N (FoxI.Ny).',
    },
    {
      question: 'How does the Stray Kids soulmate match work?',
      answer:
        'In addition to finding which SKZ member shares your personality traits, each result highlights your ideal Stray Kids soulmate pairing and lets you share a challenge link with fellow STAYs.',
    },
  ],
  'which-aespa-member-are-you': [
    {
      question: 'How do I find out which aespa member I am (Karina, Winter, Giselle, or Ningning)?',
      answer:
        'Answer 10 questions about your aesthetic, confidence, and friendship style to see whether you match charismatic leader Karina, cool vocal ace Winter, trendsetting Giselle, or fearless maknae Ningning.',
    },
  ],
  'which-le-sserafim-member-are-you': [
    {
      question: 'Which LE SSERAFIM member matches my personality?',
      answer:
        'This 10-question FEARNOT personality quiz scores your ambition, humor, and vibe to match you with Kim Chaewon, Sakura, Huh Yunjin, Kazuha, or Hong Eunchae, plus your best duo chemistry.',
    },
  ],
  'which-twice-member-are-you': [
    {
      question: 'Which TWICE member and Lovelys character am I?',
      answer:
        'This 10-question ONCE personality test covers all 9 TWICE members and their official Lovelys mascots: Nayeon (Navely), Jeongyeon (Jeongvely), Momo (Movely), Sana (Savely), Jihyo (Jively), Mina (Mively), Dahyun (Davely), Chaeyoung (Chaengvely), and Tzuyu (Tzuvely).',
    },
    {
      question: 'Does the TWICE quiz also show my best duo chemistry (like 2Yeon, MoSa, SaiDa, or MiChaeng)?',
      answer:
        'Yes! Every result reveals your TWICE personality twin plus your ideal ONCE soulmate pairing—including iconic duos like 2Yeon, MoSa, SaiDa, and MiChaeng.',
    },
  ],
  'which-enhypen-member-are-you': [
    {
      question: 'How do I find out which ENHYPEN member I am (Jungwon, Heeseung, Jay, Jake, Sunghoon, Sunoo, or Ni-ki)?',
      answer:
        'Answer 10 scenario questions about your late-night habits, fashion aura, friendship style, and favorite ENHYPEN era to discover which of the 7 members matches your soul.',
    },
    {
      question: 'Does this ENHYPEN quiz include soulmate duo chemistry (like JakeHoon, SunKi, or Yang-Jay)?',
      answer:
        'Yes! Along with your primary ENHYPEN archetype and representative animal twin, your result shows your best ENGENE soulmate match and lets you compare compatibility with friends.',
    },
  ],
};

/**
 * FAQ shown on the quiz page and emitted as FAQPage structured data. English only: the page
 * URL is indexed as English, so mixing in other languages here dilutes it without ranking
 * for those languages (that needs separate localized URLs).
 */
export function getQuizFaq(quiz: Quiz): FaqItem[] {
  const isPersonality = quiz.quizType === 'personality';
  const free: FaqItem = {
    question: isPersonality ? 'Is this test free to play?' : 'Is this quiz free to play?',
    answer: 'Yes. It is 100% free with no sign-up or app download required. You can also switch the site to Spanish, Portuguese, or Korean.',
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
    const extras = PERSONALITY_FAQ_EXTRAS[quiz.slug] || [];
    return [...faq, ...extras, free];
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

/** Sample personality questions shown on personality test pages as crawlable preview content. */
export function getSamplePersonalityQuestions(quiz: Quiz, count = 3) {
  return (quiz.personalityQuestions || []).slice(0, count);
}
