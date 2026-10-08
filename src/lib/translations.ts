export type Language = 'ko' | 'en' | 'es' | 'ru' | 'zh';

export interface TranslationDictionary {
  siteTitle: string;
  siteSubtitle: string;
  trending: string;
  surpriseMe: string;
  categories: Record<string, string>;
  tags: Record<string, string>;
  heroBadge: string;
  heroTitlePre: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  exploreQuizzes: string;
  playFeatured: string;
  stats: {
    solved: string;
    countries: string;
    free: string;
  };
  trendingTitle: string;
  trendingDesc: string;
  filterByTag: string;
  allTags: string;
  difficulty: string;
  questionsCount: string;
  estTime: string;
  plays: string;
  mins: string;
  hotBadge: string;
  startChallenge: string;
  whySectionTitle: string;
  whySectionDesc: string;
  whyCards: Array<{
    emoji: string;
    title: string;
    desc: string;
  }>;
  levels: {
    selectTitle: string;
    selectDesc: string;
    lvl1: string;
    lvl1Desc: string;
    lvl2: string;
    lvl2Desc: string;
    lvl3: string;
    lvl3Desc: string;
    allLevels: string;
    allLevelsDesc: string;
  };
  quizIntro: {
    challenge: string;
    questions: string;
    estTime: string;
    difficulty: string;
    startNow: string;
  };
  quizRunner: {
    question: string;
    of: string;
    score: string;
    pts: string;
    selectPrompt: string;
    readyPrompt: string;
    continuePrompt: string;
    checkAnswer: string;
    continue: string;
    viewMyScore: string;
    correct: string;
    incorrect: string;
    funLore: string;
  };
  resultView: {
    officialResult: string;
    tier: string;
    shareTitle: string;
    share: string;
    postX: string;
    reddit: string;
    copyLink: string;
    copied: string;
    retake: string;
    keepPlaying: string;
    nextChallengeBadge: string;
    streakKeep: string;
    playNextQuiz: string;
    randomQuiz: string;
    backToHome: string;
    levelUpNudge: string;
  };
  ads: {
    sponsored: string;
    adSenseSlot: string;
    placeholderLeaderboard: string;
    placeholderRectangle: string;
  };
  footer: {
    tagline: string;
    desc: string;
    home: string;
    allQuizzes: string;
    rights: string;
    disclaimer: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  ko: {
    siteTitle: 'K-Pulse',
    siteSubtitle: '글로벌 K-컬처 & 상식 퀴즈',
    trending: '인기 급상승',
    surpriseMe: '랜덤 퀴즈',
    categories: {
      All: '전체',
      Culture: '한국 문화',
      'K-Pop': 'K-팝',
      'K-Drama': 'K-드라마',
      Food: 'K-푸드 & 미식',
      Language: '리얼 한국어',
      Lifestyle: '라이프 & 미신',
    },
    tags: {
      All: '전체',
      BTS: 'BTS (방탄소년단)',
      BLACKPINK: '블랙핑크',
      NewJeans: '뉴진스',
      'Stray Kids': '스트레이 키즈',
      SEVENTEEN: '세븐틴',
      'Squid Game': '오징어 게임',
      'Queen of Tears': '눈물의 여왕',
      'Street Food': '길거리 음식',
      'Spicy Level': '맵부심 척도',
      Etiquette: '식사 예절',
      Slang: 'MZ 신조어',
      'All Fandoms': 'K-Pop 올팬덤',
    },
    heroBadge: '전 세계인을 위한 글로벌 K-컬처 & 상식 허브',
    heroTitlePre: '당신은 한국을',
    heroTitleHighlight: '얼마나 잘 알고 있나요?',
    heroSubtitle:
      '식사 예절과 일상 풍습부터 K-Pop 팬덤 역사, K-드라마의 명장면 클리셰, 한강 라면 라이프스타일까지! 퀴즈를 풀고 내 랭킹 뱃지를 확인해보세요.',
    exploreQuizzes: '퀴즈 둘러보기',
    playFeatured: '추천 퀴즈 풀기',
    stats: {
      solved: '누적 250,000+ 회 풀이',
      countries: '전 세계 140개국 유입',
      free: '100% 무료 플레이',
    },
    trendingTitle: '인기 퀴즈 컬렉션 🔥',
    trendingDesc: '원하는 카테고리나 최애 아이돌/드라마를 선택하고 도전해보세요',
    filterByTag: '세부 테마 선택:',
    allTags: '전체 보기',
    difficulty: '난이도',
    questionsCount: '문항 수',
    estTime: '소요 시간',
    plays: '회 참여',
    mins: '분',
    hotBadge: '인기',
    startChallenge: '퀴즈 시작하기',
    whySectionTitle: '왜 인터랙티브 퀴즈로 한국 문화를 배울까요?',
    whySectionDesc: '드라마나 영상만으로는 알기 어려웠던 한국의 진짜 문화와 비하인드를 재미있게 마스터합니다.',
    whyCards: [
      {
        emoji: '🥢',
        title: '진짜 식사 예절과 식문화',
        desc: '밥그릇에 젓가락을 꽂으면 안 되는 이유, 어르신과 건배할 때의 고개 돌리기 예절 등 실전 꿀팁을 배웁니다.',
      },
      {
        emoji: '💜',
        title: 'K-Pop 팬덤 역사와 비하인드',
        desc: '팬덤 이름의 숨겨진 의미, 독창적인 공식 응원봉 디자인의 유래, 역사적인 빌보드 & 유튜브 기록들을 확인합니다.',
      },
      {
        emoji: '🍜',
        title: '생생한 서울 일상 라이프',
        desc: '한강 편의점 즉석 라면 기계 문화부터 한국인 특유의 따뜻한 "정(情)" 문화까지 살아있는 일상을 경험합니다.',
      },
    ],
    levels: {
      selectTitle: '도전 난이도 선택',
      selectDesc: '원하는 난이도의 문제 풀을 선택하세요 (문제 은행 시스템)',
      lvl1: '🌱 Lv.1 초급 (루키)',
      lvl1Desc: '누구나 맞힐 수 있는 기초 상식',
      lvl2: '⭐ Lv.2 중급 (팬덤)',
      lvl2Desc: '팬이라면 알아야 할 핵심 디테일',
      lvl3: '🔥 Lv.3 고급 (고인물)',
      lvl3Desc: '성골 덕후만 아는 심층 비하인드',
      allLevels: '🎲 랜덤 믹스 (전체)',
      allLevelsDesc: '모든 난이도 무작위 출제',
    },
    quizIntro: {
      challenge: '도전 과제',
      questions: '문항 수',
      estTime: '예상 시간',
      difficulty: '난이도',
      startNow: '선택한 난이도로 시작하기',
    },
    quizRunner: {
      question: '문제',
      of: '/',
      score: '현재 점수',
      pts: '점',
      selectPrompt: '보기를 하나 선택해 주세요',
      readyPrompt: '"정답 확인"을 누르거나 Enter를 누르세요',
      continuePrompt: '"다음 문제로"를 누르거나 Enter를 누르세요',
      checkAnswer: '정답 확인',
      continue: '다음 문제로',
      viewMyScore: '내 점수 확인하기',
      correct: '정답입니다! 🎉',
      incorrect: '아쉽네요! 오답입니다 😅',
      funLore: '알아두면 재미있는 상식:',
    },
    resultView: {
      officialResult: '공식 퀴즈 결과서',
      tier: '등급',
      shareTitle: '결과를 공유하고 친구들에게 도전해보세요!',
      share: '공유하기',
      postX: 'X(트위터)에 포스팅',
      reddit: '레딧에 공유',
      copyLink: '결과 링크 복사',
      copied: '복사 완료!',
      retake: '이 퀴즈 다시 풀기',
      keepPlaying: '다음 추천 퀴즈 바로 도전하기 🔥',
      nextChallengeBadge: 'NEXT CHALLENGE (+30 BONUS XP)',
      streakKeep: '연속 콤보 유지하기 🔥',
      playNextQuiz: '다음 퀴즈 바로 도전하기',
      randomQuiz: '랜덤 퀴즈 🎲',
      backToHome: '홈으로 이동',
      levelUpNudge: '다음 레벨까지 단 {xp} XP! 1개만 더 풀면 레벨업!',
    },
    ads: {
      sponsored: '스폰서 광고',
      adSenseSlot: '구글 애드센스 배너 영역',
      placeholderLeaderboard: '반응형 리더보드 / 배너',
      placeholderRectangle: '300x250 직사각형 배너',
    },
    footer: {
      tagline: '| 퀴즈로 만나는 한국의 모든 것',
      desc: '전 세계 한류 팬과 한국 문화 애호가를 위한 인터랙티브 퀴즈 플랫폼입니다.',
      home: '홈',
      allQuizzes: '전체 퀴즈',
      rights: '모든 권리 보유.',
      disclaimer: '알림: 본 사이트는 문화 상식 팬 플랫폼이며 특정 연예 기획사와 제휴되어 있지 않습니다.',
    },
  },

  en: {
    siteTitle: 'K-Pulse',
    siteSubtitle: 'Global K-Culture & Trivia',
    trending: 'Trending',
    surpriseMe: 'Surprise Me',
    categories: {
      All: 'All',
      Culture: 'Culture',
      'K-Pop': 'K-Pop',
      'K-Drama': 'K-Drama',
      Food: 'K-Food & Dining',
      Language: 'Real Korean',
      Lifestyle: 'Lifestyle & Lore',
    },
    tags: {
      All: 'All',
      BTS: 'BTS',
      BLACKPINK: 'BLACKPINK',
      NewJeans: 'NewJeans',
      'Stray Kids': 'Stray Kids',
      SEVENTEEN: 'SEVENTEEN',
      'Squid Game': 'Squid Game',
      'Queen of Tears': 'Queen of Tears',
      'Street Food': 'Street Food',
      'Spicy Level': 'Spicy Level',
      Etiquette: 'Etiquette',
      Slang: 'Slang & Memes',
      'All Fandoms': 'All Fandoms',
    },
    heroBadge: 'The #1 Global Hub for K-Culture & Trivia',
    heroTitlePre: 'How Well Do You',
    heroTitleHighlight: 'Really Know Korea?',
    heroSubtitle:
      'Test your knowledge on Korean dining etiquette, iconic K-Pop lore, secret K-Drama tropes, and Seoul street culture. Complete tests, get your rank badge, and challenge your friends!',
    exploreQuizzes: 'Explore Quizzes',
    playFeatured: 'Play Featured Quiz',
    stats: {
      solved: '250,000+ Quizzes Solved',
      countries: '140+ Countries',
      free: '100% Free Forever',
    },
    trendingTitle: 'Trending Quizzes 🔥',
    trendingDesc: 'Pick a category, group, or drama to start your challenge',
    filterByTag: 'Filter by Theme:',
    allTags: 'View All',
    difficulty: 'Difficulty',
    questionsCount: 'Questions',
    estTime: 'Est. Time',
    plays: 'plays',
    mins: 'min',
    hotBadge: 'HOT',
    startChallenge: 'Start Challenge',
    whySectionTitle: 'Why Learn Korean Culture Through Interactive Quizzes?',
    whySectionDesc: 'Deepen your cultural appreciation beyond surface-level dramas with research-backed trivia.',
    whyCards: [
      {
        emoji: '🥢',
        title: 'Real Dining Etiquette',
        desc: 'Learn why chopsticks are never placed upright, how to clink drinks with elders respectfully, and avoid embarrassing cultural blunders.',
      },
      {
        emoji: '💜',
        title: 'Fandom Lore & History',
        desc: 'Unpack the real origin stories behind iconic lightstick designs, inside fandom jokes, and historic world chart records.',
      },
      {
        emoji: '🍜',
        title: 'Everyday Seoul Lifestyle',
        desc: 'From Han River convenience store ramen machines to the untranslatable warmth of "Jeong" (정), feel connected with real Korean life.',
      },
    ],
    levels: {
      selectTitle: 'Select Difficulty Level',
      selectDesc: 'Pick your question pool tier (Question Bank System)',
      lvl1: '🌱 Lv.1 Rookie (Easy)',
      lvl1Desc: 'Essential common knowledge',
      lvl2: '⭐ Lv.2 Fan (Medium)',
      lvl2Desc: 'Details every fan knows',
      lvl3: '🔥 Lv.3 Hardcore (Hard)',
      lvl3Desc: 'Deep lore & insider trivia',
      allLevels: '🎲 Mixed (All Tiers)',
      allLevelsDesc: 'Random pool across all difficulty tiers',
    },
    quizIntro: {
      challenge: 'Challenge',
      questions: 'Questions',
      estTime: 'Est. Time',
      difficulty: 'Difficulty',
      startNow: 'Start with Selected Level',
    },
    quizRunner: {
      question: 'Question',
      of: 'of',
      score: 'Score',
      pts: 'pts',
      selectPrompt: 'Select an option to proceed',
      readyPrompt: 'Click "Check Answer" or press Enter',
      continuePrompt: 'Press "Continue" or Enter for next question',
      checkAnswer: 'Check Answer',
      continue: 'Continue',
      viewMyScore: 'View My Score',
      correct: 'Correct Answer! 🎉',
      incorrect: 'Incorrect 😅',
      funLore: 'Fun Lore:',
    },
    resultView: {
      officialResult: 'Official Quiz Result',
      tier: 'Tier',
      shareTitle: 'Share Your Result & Challenge Friends',
      share: 'Share',
      postX: 'Post on X',
      reddit: 'Reddit',
      copyLink: 'Copy Link',
      copied: 'Copied!',
      retake: 'Retake This Quiz',
      keepPlaying: 'Keep Playing: Next Recommended Quizzes 🔥',
      nextChallengeBadge: 'NEXT CHALLENGE (+30 BONUS XP)',
      streakKeep: 'Keep the Streak Alive 🔥',
      playNextQuiz: 'Play Next Quiz Now',
      randomQuiz: 'Surprise Quiz 🎲',
      backToHome: 'Back to Home',
      levelUpNudge: 'Only {xp} XP to next level! Complete 1 more quiz to level up!',
    },
    ads: {
      sponsored: 'Sponsored Advertisement',
      adSenseSlot: 'Google AdSense Slot',
      placeholderLeaderboard: 'Responsive Leaderboard / Banner',
      placeholderRectangle: '300x250 Medium Rectangle',
    },
    footer: {
      tagline: '| Discover Korea Through Quizzes',
      desc: 'A fan-crafted interactive knowledge platform celebrating Korean culture, entertainment, cuisine, and language for worldwide fans.',
      home: 'Home',
      allQuizzes: 'All Quizzes',
      rights: 'All rights reserved.',
      disclaimer: 'Disclaimer: Fan-made cultural trivia platform. Not endorsed or affiliated with any entertainment agency.',
    },
  },

  es: {
    siteTitle: 'K-Pulse',
    siteSubtitle: 'Cultura Coreana y Trivia Global',
    trending: 'Tendencias',
    surpriseMe: 'Quiz Aleatorio',
    categories: {
      All: 'Todos',
      Culture: 'Cultura',
      'K-Pop': 'K-Pop',
      'K-Drama': 'K-Dramas',
      Food: 'Gastronomía K-Food',
      Language: 'Coreano Real',
      Lifestyle: 'Estilo de Vida',
    },
    tags: {
      All: 'Todos',
      BTS: 'BTS',
      BLACKPINK: 'BLACKPINK',
      NewJeans: 'NewJeans',
      'Stray Kids': 'Stray Kids',
      SEVENTEEN: 'SEVENTEEN',
      'Squid Game': 'El Juego del Calamar',
      'Queen of Tears': 'La Reina de las Lágrimas',
      'Street Food': 'Comida Callejera',
      'Spicy Level': 'Nivel de Picante',
      Etiquette: 'Etiqueta',
      Slang: 'Jerga y Memes',
      'All Fandoms': 'Todos los Fandoms',
    },
    heroBadge: 'El Centro Global #1 de Cultura Coreana y Trivia',
    heroTitlePre: '¿Qué tan bien conoces',
    heroTitleHighlight: 'realmente a Corea?',
    heroSubtitle:
      'Pon a prueba tus conocimientos sobre etiqueta en la mesa, historia del K-Pop, tropos de K-Dramas y la vida en Seúl. ¡Obtén tu insignia y reta a tus amigos!',
    exploreQuizzes: 'Explorar Quizzes',
    playFeatured: 'Quiz Destacado',
    stats: {
      solved: 'Más de 250,000+ quizzes resueltos',
      countries: '140+ países participantes',
      free: '100% Gratis Siempre',
    },
    trendingTitle: 'Quizzes Populares 🔥',
    trendingDesc: 'Elige una categoría, grupo o drama para comenzar tu reto',
    filterByTag: 'Filtrar por tema:',
    allTags: 'Ver Todo',
    difficulty: 'Dificultad',
    questionsCount: 'Preguntas',
    estTime: 'Tiempo Est.',
    plays: 'jugados',
    mins: 'min',
    hotBadge: 'HOT',
    startChallenge: 'Comenzar Quiz',
    whySectionTitle: '¿Por qué aprender cultura coreana con quizzes?',
    whySectionDesc: 'Profundiza tu aprecio cultural con historias y datos reales más allá de los dramas.',
    whyCards: [
      {
        emoji: '🥢',
        title: 'Auténtica Etiqueta en la Mesa',
        desc: 'Descubre por qué nunca se clavan los palillos verticalmente y cómo brindar respetuosamente con los mayores.',
      },
      {
        emoji: '💜',
        title: 'Historia y Fandoms del K-Pop',
        desc: 'Conoce los significados secretos de los lightsticks, bromas de fandom y récords históricos.',
      },
      {
        emoji: '🍜',
        title: 'Estilo de Vida en Seúl',
        desc: 'Desde las máquinas de ramen a orillas del río Han hasta el cálido concepto del "Jeong" (정).',
      },
    ],
    levels: {
      selectTitle: 'Selecciona Nivel de Dificultad',
      selectDesc: 'Elige tu nivel de preguntas (Banco de Preguntas)',
      lvl1: '🌱 Lv.1 Principiante (Fácil)',
      lvl1Desc: 'Conocimientos esenciales y populares',
      lvl2: '⭐ Lv.2 Fan (Medio)',
      lvl2Desc: 'Detalles que todo fanático sabe',
      lvl3: '🔥 Lv.3 Experto (Difícil)',
      lvl3Desc: 'Trivia avanzada e historia profunda',
      allLevels: '🎲 Mezcla (Todos)',
      allLevelsDesc: 'Preguntas aleatorias de todos los niveles',
    },
    quizIntro: {
      challenge: 'Reto',
      questions: 'Preguntas',
      estTime: 'Tiempo',
      difficulty: 'Dificultad',
      startNow: 'Empezar en este Nivel',
    },
    quizRunner: {
      question: 'Pregunta',
      of: 'de',
      score: 'Puntos',
      pts: 'pts',
      selectPrompt: 'Selecciona una opción para continuar',
      readyPrompt: 'Haz clic en "Verificar" o pulsa Enter',
      continuePrompt: 'Pulsa "Continuar" o Enter para la siguiente pregunta',
      checkAnswer: 'Verificar Respuesta',
      continue: 'Continuar',
      viewMyScore: 'Ver Mi Puntuación',
      correct: '¡Respuesta Correcta! 🎉',
      incorrect: '¡Incorrecto! 😅',
      funLore: 'Dato Curioso:',
    },
    resultView: {
      officialResult: 'Resultado Oficial del Quiz',
      tier: 'Nivel',
      shareTitle: '¡Comparte tu resultado y desafía a tus amigos!',
      share: 'Compartir',
      postX: 'Publicar en X',
      reddit: 'Compartir en Reddit',
      copyLink: 'Copiar Enlace',
      copied: '¡Copiado!',
      retake: 'Repetir este quiz',
      keepPlaying: 'Siguiente Reto Recomendado 🔥',
      nextChallengeBadge: 'SIGUIENTE RETO (+30 XP BONUS)',
      streakKeep: '¡Mantén la racha viva! 🔥',
      playNextQuiz: 'Jugar Siguiente Quiz Ahora',
      randomQuiz: 'Quiz Sorpresa 🎲',
      backToHome: 'Volver al Inicio',
      levelUpNudge: '¡Solo {xp} XP para subir de nivel! ¡Juega 1 más!',
    },
    ads: {
      sponsored: 'Anuncio Patrocinado',
      adSenseSlot: 'Espacio Google AdSense',
      placeholderLeaderboard: 'Banner / Leaderboard responsivo',
      placeholderRectangle: 'Rectángulo 300x250',
    },
    footer: {
      tagline: '| Descubre Corea a Través de Quizzes',
      desc: 'Plataforma interactiva hecha por fans para admiradores de la cultura, música y gastronomía coreana en todo el mundo.',
      home: 'Inicio',
      allQuizzes: 'Todos los Quizzes',
      rights: 'Todos los derechos reservados.',
      disclaimer: 'Aviso: Plataforma fan-made de trivia cultural. No afiliada a ninguna agencia de entretenimiento.',
    },
  },

  ru: {
    siteTitle: 'K-Pulse',
    siteSubtitle: 'Глобальная викторина о Корее и K-Culture',
    trending: 'В тренде',
    surpriseMe: 'Случайный тест',
    categories: {
      All: 'Все',
      Culture: 'Культура',
      'K-Pop': 'K-Pop',
      'K-Drama': 'Дорамы',
      Food: 'K-Food и еда',
      Language: 'Живой корейский',
      Lifestyle: 'Стиль жизни и мифы',
    },
    tags: {
      All: 'Все',
      BTS: 'BTS',
      BLACKPINK: 'BLACKPINK',
      NewJeans: 'NewJeans',
      'Stray Kids': 'Stray Kids',
      SEVENTEEN: 'SEVENTEEN',
      'Squid Game': 'Игра в кальмара',
      'Queen of Tears': 'Королева слёз',
      'Street Food': 'Уличная еда',
      'Spicy Level': 'Острота',
      Etiquette: 'Этикет',
      Slang: 'Сленг и мемы',
    },
    heroBadge: 'Главный мировой хаб викторин о Корее и K-Pop',
    heroTitlePre: 'Насколько хорошо вы',
    heroTitleHighlight: 'знаете Корею?',
    heroSubtitle:
      'Проверьте свои знания столового этикета, истории K-Pop айдолов, романтических клише дорам и жизни в Сеуле. Получите значок и поделитесь с друзьями!',
    exploreQuizzes: 'Все викторины',
    playFeatured: 'Рекомендуемый тест',
    stats: {
      solved: 'Более 250,000+ прохождений',
      countries: 'Участники из 140+ стран',
      free: '100% Бесплатно',
    },
    trendingTitle: 'Популярные тесты 🔥',
    trendingDesc: 'Выберите категорию, айдол-группу или дораму для начала',
    filterByTag: 'Фильтр по теме:',
    allTags: 'Смотреть все',
    difficulty: 'Сложность',
    questionsCount: 'Вопросов',
    estTime: 'Время',
    plays: 'игр',
    mins: 'мин',
    hotBadge: 'ТОП',
    startChallenge: 'Начать тест',
    whySectionTitle: 'Зачем изучать культуру Кореи через викторины?',
    whySectionDesc: 'Узнавайте реальные факты и тонкости повседневной жизни, о которых не расскажут в дорамах.',
    whyCards: [
      {
        emoji: '🥢',
        title: 'Настоящий столовый этикет',
        desc: 'Почему нельзя втыкать палочки в рис вертикально и как правильно пить с теми, кто старше по возрасту.',
      },
      {
        emoji: '💜',
        title: 'История фандомов K-Pop',
        desc: 'Скрытый смысл названий фандомов, дизайн культовых лайтстиков и легендарные мировые рекорды.',
      },
      {
        emoji: '🍜',
        title: 'Атмосфера Сеула',
        desc: 'От аппаратов с рамёном на набережной реки Хан до непереводимого корейского понятия теплоты «Чон» (정).',
      },
    ],
    levels: {
      selectTitle: 'Выберите уровень сложности',
      selectDesc: 'Выберите пул вопросов (Система Банка Вопросов)',
      lvl1: '🌱 Lv.1 Новичок (Легко)',
      lvl1Desc: 'Базовые общеизвестные факты',
      lvl2: '⭐ Lv.2 Знаток (Средне)',
      lvl2Desc: 'Факты, которые знает каждый фанат',
      lvl3: '🔥 Lv.3 Эксперт (Сложно)',
      lvl3Desc: 'Глубокая история и редкие детали',
      allLevels: '🎲 Микс (Все уровни)',
      allLevelsDesc: 'Случайные вопросы всех сложностей',
    },
    quizIntro: {
      challenge: 'Испытание',
      questions: 'Вопросов',
      estTime: 'Время',
      difficulty: 'Сложность',
      startNow: 'Начать выбранный уровень',
    },
    quizRunner: {
      question: 'Вопрос',
      of: 'из',
      score: 'Счёт',
      pts: 'очков',
      selectPrompt: 'Выберите вариант ответа',
      readyPrompt: 'Нажмите «Проверить» или Enter',
      continuePrompt: 'Нажмите «Далее» или Enter для следующего вопроса',
      checkAnswer: 'Проверить ответ',
      continue: 'Далее',
      viewMyScore: 'Посмотреть результат',
      correct: 'Правильно! 🎉',
      incorrect: 'Неверно! 😅',
      funLore: 'Интересный факт:',
    },
    resultView: {
      officialResult: 'Официальный результат викторины',
      tier: 'Ранг',
      shareTitle: 'Поделитесь результатом и бросьте вызов друзьям!',
      share: 'Поделиться',
      postX: 'Твитнуть в X',
      reddit: 'На Reddit',
      copyLink: 'Скопировать ссылку',
      copied: 'Скопировано!',
      retake: 'Выбрать другой уровень',
      keepPlaying: 'Играть в другие тесты 🔥',
      nextChallengeBadge: 'СЛЕДУЮЩИЙ ТЕСТ (+30 БОНУС XP)',
      streakKeep: 'Сохраняйте серию 🔥',
      playNextQuiz: 'Начать следующий тест',
      randomQuiz: 'Случайный тест 🎲',
      backToHome: 'На главную',
      levelUpNudge: 'Всего {xp} XP до нового уровня! Пройдите ещё 1 тест!',
    },
    ads: {
      sponsored: 'Реклама',
      adSenseSlot: 'Блок Google AdSense',
      placeholderLeaderboard: 'Адаптивный баннер',
      placeholderRectangle: 'Прямоугольник 300x250',
    },
    footer: {
      tagline: '| Откройте Корею через викторины',
      desc: 'Интерактивная платформа для поклонников корейской культуры, музыки и дорам со всего мира.',
      home: 'Главная',
      allQuizzes: 'Все тесты',
      rights: 'Все права защищены.',
      disclaimer: 'Дисклеймер: Фанатская платформа. Не связана ни с какими развлекательными агентствами.',
    },
  },

  zh: {
    siteTitle: 'K-Pulse',
    siteSubtitle: '全球韩国文化与K-Pop趣味测验',
    trending: '热门推荐',
    surpriseMe: '随机测验',
    categories: {
      All: '全部',
      Culture: '韩国文化',
      'K-Pop': 'K-Pop 偶像',
      'K-Drama': '韩剧经典',
      Food: 'K-Food 美食',
      Language: '地道韩语',
      Lifestyle: '生活迷信',
    },
    tags: {
      All: '全部',
      BTS: '防弹少年团 (BTS)',
      BLACKPINK: 'BLACKPINK',
      NewJeans: 'NewJeans',
      'Stray Kids': 'Stray Kids',
      SEVENTEEN: 'SEVENTEEN',
      'Squid Game': '鱿鱼游戏',
      'Queen of Tears': '泪之女王',
      'Street Food': '街头小吃',
      'Spicy Level': '吃辣挑战',
      Etiquette: '餐桌礼仪',
      Slang: '流行网络用语',
    },
    heroBadge: '全球首选韩国文化与流行趣味测验平台',
    heroTitlePre: '你对韩国的了解',
    heroTitleHighlight: '究竟有多深？',
    heroSubtitle:
      '从餐桌礼仪与日常生活风俗，到K-Pop偶像幕后历史、韩剧心动套路与汉江泡面文化！立即测验，领取你的专属成就徽章，向好友发起挑战！',
    exploreQuizzes: '浏览全部测验',
    playFeatured: '体验精选测验',
    stats: {
      solved: '累计解答 250,000+ 次',
      countries: '全球 140+ 国家用户参与',
      free: '100% 永久免费畅玩',
    },
    trendingTitle: '人气测验集合 🔥',
    trendingDesc: '选择你感兴趣的分类、偶像团队或韩剧开启挑战',
    filterByTag: '主题细分筛选：',
    allTags: '查看全部',
    difficulty: '难度',
    questionsCount: '题目数量',
    estTime: '预估耗时',
    plays: '次参与',
    mins: '分钟',
    hotBadge: '热门',
    startChallenge: '开启挑战',
    whySectionTitle: '为什么通过互动测验探索韩国文化？',
    whySectionDesc: '超越电视剧与短视频的表面印象，轻松掌握地道真实的韩国风俗与趣味冷知识。',
    whyCards: [
      {
        emoji: '🥢',
        title: '地道餐桌礼仪与风俗',
        desc: '了解为什么筷子绝不能插在米饭上，以及与长辈碰杯敬酒时侧身饮用的核心礼节。',
      },
      {
        emoji: '💜',
        title: 'K-Pop 粉丝圈历史与冷知识',
        desc: '揭秘应援棒的灵感来源、粉丝名背后的深层寓意以及告示牌历史榜单纪录。',
      },
      {
        emoji: '🍜',
        title: '鲜活的首尔日常体验',
        desc: '从汉江便利店锡纸自动泡面机，到韩国特有的温情“情 (Jeong)”文化，感受真实的韩国日常。',
      },
    ],
    levels: {
      selectTitle: '选择挑战难度等级',
      selectDesc: '选择你想要的题目难度池（题库智能抽选系统）',
      lvl1: '🌱 Lv.1 新手初级 (简单)',
      lvl1Desc: '大众皆知的基础常识',
      lvl2: '⭐ Lv.2 粉丝进阶 (中等)',
      lvl2Desc: '身为真粉丝必知的核心细节',
      lvl3: '🔥 Lv.3 骨灰硬核 (高难)',
      lvl3Desc: '资深老粉才懂的幕后冷知识',
      allLevels: '🎲 全难度随机混搭',
      allLevelsDesc: '全难度题库无规则随机出题',
    },
    quizIntro: {
      challenge: '挑战项目',
      questions: '题目数量',
      estTime: '预计耗时',
      difficulty: '难度等级',
      startNow: '以所选难度开启挑战',
    },
    quizRunner: {
      question: '题目',
      of: '/',
      score: '当前得分',
      pts: '分',
      selectPrompt: '请选择一个选项以继续',
      readyPrompt: '点击“核对答案”或按回车键',
      continuePrompt: '点击“下一题”或按回车键',
      checkAnswer: '核对答案',
      continue: '下一题',
      viewMyScore: '查看最终成绩',
      correct: '回答正确！🎉',
      incorrect: '很遗憾回答错误 😅',
      funLore: '趣味冷知识：',
    },
    resultView: {
      officialResult: '官方测验成绩单',
      tier: '等级头衔',
      shareTitle: '分享你的成绩，邀请好友一起挑战！',
      share: '分享成绩',
      postX: '分享到 X (Twitter)',
      reddit: '分享到 Reddit',
      copyLink: '复制成绩链接',
      copied: '已复制！',
      retake: '尝试其他难度挑战',
      keepPlaying: '继续探索更多测验 🔥',
      nextChallengeBadge: '下一项挑战 (+30 额外经验)',
      streakKeep: '保持连胜纪录 🔥',
      playNextQuiz: '立即挑战下一测验',
      randomQuiz: '随机惊喜测验 🎲',
      backToHome: '返回首页',
      levelUpNudge: '距下一等级仅差 {xp} XP！再答一套即可升级！',
    },
    ads: {
      sponsored: '赞助广告',
      adSenseSlot: 'Google AdSense 广告展示位',
      placeholderLeaderboard: '自适应横幅展示位',
      placeholderRectangle: '300x250 矩形广告位',
    },
    footer: {
      tagline: '| 通过趣味测验解锁韩国的一切',
      desc: '专为全球韩流粉丝与文化爱好者打造的互动式知识测验平台。',
      home: '首页',
      allQuizzes: '全部测验',
      rights: '版权所有。',
      disclaimer: '声明：本平台为粉丝文化知识分享网站，与任何特定娱乐经纪公司均无隶属关系。',
    },
  },
};
