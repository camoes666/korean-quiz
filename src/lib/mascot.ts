export interface QuizMascot {
  name: string;
  nameKo: string;
  nameEs: string;
  namePt?: string;
  avatarUrl: string;
  gender: 'female' | 'male';
  badgeTitle: string;
  badgeTitleKo: string;
  badgeTitleEs: string;
  badgeTitlePt?: string;
  greeting: string;
  greetingKo: string;
  greetingEn: string;
  greetingEs: string;
  greetingPt?: string;
  winCheer: string;
  winCheerKo: string;
  winCheerEn: string;
  winCheerEs: string;
  winCheerPt?: string;
  encourage: string;
  encourageKo: string;
  encourageEn: string;
  encourageEs: string;
  encouragePt?: string;
}

export function getQuizMascot(slug?: string, tag?: string): QuizMascot {
  const normalizedTag = (tag || '').toLowerCase();
  const normalizedSlug = (slug || '').toLowerCase();

  // K-Food / Culinary -> Chef Bomi (셰프 봄이 🍜🌶️)
  if (
    normalizedTag.includes('food') ||
    normalizedTag.includes('spicy') ||
    normalizedSlug.includes('food') ||
    normalizedSlug.includes('spicy')
  ) {
    return {
      name: 'Bomi 🍜',
      nameKo: '봄이 🍜',
      nameEs: 'Bomi 🍜',
      namePt: 'Bomi 🍜',
      avatarUrl: '/images/mascot/bomi-food.webp',
      gender: 'female',
      badgeTitle: 'Chef Bomi 🍜🌶️',
      badgeTitleKo: '미식 셰프 봄이 🍜🌶️',
      badgeTitleEs: 'Chef Bomi 🍜🌶️',
      badgeTitlePt: 'Chef Bomi 🍜🌶️',
      greeting: 'Chef Bomi cooked up a sizzling K-Food challenge! 🍜🌶️',
      greetingKo: '미식 셰프 봄이와 함께하는 매콤달콤 K-푸드 챌린지! 🍜🌶️',
      greetingEn: 'Chef Bomi cooked up a sizzling K-Food challenge! 🍜🌶️',
      greetingEs: '¡La Chef Bomi preparó un delicioso reto de K-Food! 🍜🌶️',
      greetingPt: 'A Chef Bomi preparou um delicioso desafio de K-Food! 🍜🌶️',
      winCheer: '3-Star Michelin K-Foodie certified by Chef Bomi! 🍜🔥',
      winCheerKo: '대박! 미슐랭 3스타급 찐 K-푸드 미식가 인정! 🍜🔥',
      winCheerEn: '3-Star Michelin K-Foodie certified by Chef Bomi! 🍜🔥',
      winCheerEs: '¡Increíble! ¡Experto Michelin en comida coreana! 🍜🔥',
      winCheerPt: 'Incrível! Especialista Michelin em comida coreana! 🍜🔥',
      encourage: 'Grab a bite of tteokbokki and try again! 🍜💖',
      encourageKo: '떡볶이 한 입 먹고 다시 만점에 도전해봐요! 🍜💖',
      encourageEn: 'Grab a bite of tteokbokki and try again! 🍜💖',
      encourageEs: '¡Toma un bocado de tteokbokki e inténtalo de nuevo! 🍜💖',
      encouragePt: 'Coma um pouco de tteokbokki e tente novamente! 🍜💖',
    };
  }

  // K-Drama -> Actor / Director Hobi (K-드라마 남주 호비 🎬💖)
  if (
    normalizedTag.includes('drama') ||
    normalizedTag.includes('squid') ||
    normalizedTag.includes('tears') ||
    normalizedSlug.includes('kdrama') ||
    normalizedSlug.includes('drama')
  ) {
    return {
      name: 'Hobi 🎬',
      nameKo: '호비 🎬',
      nameEs: 'Hobi 🎬',
      namePt: 'Hobi 🎬',
      avatarUrl: '/images/mascot/hobi-kdrama.webp',
      gender: 'male',
      badgeTitle: 'K-Drama Hobi 🎬💖',
      badgeTitleKo: '드라마 남주 호비 🎬💖',
      badgeTitleEs: 'Actor Hobi 🎬💖',
      badgeTitlePt: 'Ator Hobi 🎬💖',
      greeting: 'Lights, Camera, Action! Ready for K-Drama magic with Hobi? 🎬💖',
      greetingKo: '레디 액션! 드라마 남주 호비와 함께 명장면 퀴즈 도전! 🎬💖',
      greetingEn: 'Lights, Camera, Action! Ready for K-Drama magic with Hobi? 🎬💖',
      greetingEs: '¡Luces, cámara, acción! ¿Listo para el reto de K-Dramas con Hobi? 🎬💖',
      greetingPt: 'Luz, câmera, ação! Pronto para o desafio de K-Dramas com o Hobi? 🎬💖',
      winCheer: 'Daesang Grand Prize winner! True K-Drama main character! 🎬🏆',
      winCheerKo: '연기대상 급 완벽 정답! 당신이 바로 K-드라마 주인공! 🎬🏆',
      winCheerEn: 'Daesang Grand Prize winner! True K-Drama main character! 🎬🏆',
      winCheerEs: '¡Ganador del Daesang! ¡Verdadero protagonista de K-Drama! 🎬🏆',
      winCheerPt: 'Vencedor do Daesang! Verdadeiro protagonista de K-Drama! 🎬🏆',
      encourage: 'Plot twist incoming! Your happy ending is on the next take! 🎬✨',
      encourageKo: '반전 드라마는 지금부터! 다음 테이크에서 해피엔딩을 만들어요! 🎬✨',
      encourageEn: 'Plot twist incoming! Your happy ending is on the next take! 🎬✨',
      encourageEs: '¡Giro de trama! ¡Tu final feliz está en la siguiente toma! 🎬✨',
      encouragePt: 'Reviravolta! Seu final feliz está no próximo take! 🎬✨',
    };
  }

  // TWICE -> ONCE Bomi (원스 봄이 🍭💖)
  if (normalizedTag.includes('twice') || normalizedSlug.includes('twice')) {
    return {
      name: 'Bomi 🍭',
      nameKo: '봄이 🍭',
      nameEs: 'Bomi 🍭',
      namePt: 'Bomi 🍭',
      avatarUrl: '/images/mascot/bomi-blackpink-v2.webp',
      gender: 'female',
      badgeTitle: 'ONCE Bomi 🍭💖',
      badgeTitleKo: '원스 봄이 🍭💖',
      badgeTitleEs: 'ONCE Bomi 🍭💖',
      badgeTitlePt: 'ONCE Bomi 🍭💖',
      greeting: 'One in a Million! Bomi is ready with Candybong! 🍭💖',
      greetingKo: 'One in a Million! 캔디봉을 든 봄이와 함께 트와이스 소울메이트 찾기! 🍭💖',
      greetingEn: 'One in a Million! Bomi is ready with Candybong! 🍭💖',
      greetingEs: '¡One in a Million! ¡Bomi lista con el Candybong para encontrar tu alma gemela de TWICE! 🍭💖',
      greetingPt: 'One in a Million! Bomi pronta com o Candybong para achar sua alma gêmea do TWICE! 🍭💖',
      winCheer: 'One in a Million! 100% True ONCE certified! Shake your Candybong! 🍭💖',
      winCheerKo: '대박! 원 인 어 밀리언! 싱크로율 100% 찐 원스(ONCE) 인정! 🍭💖',
      winCheerEn: 'One in a Million! 100% True ONCE certified! Shake your Candybong! 🍭💖',
      winCheerEs: '¡One in a Million! ¡100% verdadera ONCE certificada! 🍭💖',
      winCheerPt: 'One in a Million! 100% verdadeira ONCE certificada! 🍭💖',
      encourage: 'Cheer Up, baby! Your TWICE energy is shining bright! 🍭',
      encourageKo: 'Cheer Up 베이비! 당신 안의 트와이스 에너지는 언제나 반짝여요! 🍭',
      encourageEn: 'Cheer Up, baby! Your TWICE energy is shining bright! 🍭',
      encourageEs: '¡Cheer Up! ¡Tu energía TWICE brilla con fuerza! 🍭',
      encouragePt: 'Cheer Up! Sua energia TWICE brilha com força! 🍭',
    };
  }

  // ENHYPEN -> ENGENE Hobi (엔진 호비 🧛🔥)
  if (normalizedTag.includes('enhypen') || normalizedSlug.includes('enhypen')) {
    return {
      name: 'Hobi 🧛',
      nameKo: '호비 🧛',
      nameEs: 'Hobi 🧛',
      namePt: 'Hobi 🧛',
      avatarUrl: '/images/mascot/hobi-skz-v2.webp',
      gender: 'male',
      badgeTitle: 'ENGENE Hobi 🧛🔥',
      badgeTitleKo: '엔진 호비 🧛🔥',
      badgeTitleEs: 'ENGENE Hobi 🧛🔥',
      badgeTitlePt: 'ENGENE Hobi 🧛🔥',
      greeting: 'Connect! Hobi is ready to find your ENHYPEN vampire fate! 🧛🔥',
      greetingKo: 'Connect! 엔진봉을 든 호비와 함께 운명의 엔하이픈 소울메이트 찾기! 🧛🔥',
      greetingEn: 'Connect! Hobi is ready to find your ENHYPEN vampire fate! 🧛🔥',
      greetingEs: '¡Connect! ¡Hobi está listo para descubrir tu destino con ENHYPEN! 🧛🔥',
      greetingPt: 'Connect! Hobi está pronto para descobrir seu destino com o ENHYPEN! 🧛🔥',
      winCheer: 'Bite Me! 100% True ENGENE soulmate bond certified! 🧛🔥',
      winCheerKo: '완벽해! 운명처럼 연결된 100% 찐 엔진(ENGENE) 인정! 🧛🔥',
      winCheerEn: 'Bite Me! 100% True ENGENE soulmate bond certified! 🧛🔥',
      winCheerEs: '¡Increíble! ¡Vínculo 100% ENGENE certificado! 🧛🔥',
      winCheerPt: 'Incrível! Conexão 100% ENGENE certificada! 🧛🔥',
      encourage: 'Keep connecting! An ENGENE never stops shining! 🧛🔥',
      encourageKo: '파이팅! 엔진과 엔하이픈의 연결은 멈추지 않아! 🧛🔥',
      encourageEn: 'Keep connecting! An ENGENE never stops shining! 🧛🔥',
      encourageEs: '¡Sigue adelante! ¡Un ENGENE nunca se rinde! 🧛🔥',
      encouragePt: 'Continue firme! Um ENGENE nunca desiste! 🧛🔥',
    };
  }

  // aespa -> Bomi in cyber-Y2K futuristic outfit (사이버 봄이 💙✨)
  if (normalizedTag.includes('aespa') || normalizedSlug.includes('aespa')) {
    return {
      name: 'Bomi 💙',
      nameKo: '봄이 💙',
      nameEs: 'Bomi 💙',
      namePt: 'Bomi 💙',
      avatarUrl: '/images/mascot/bomi-aespa.webp',
      gender: 'female',
      badgeTitle: 'MY Bomi 💙✨',
      badgeTitleKo: '마이 봄이 💙✨',
      badgeTitleEs: 'MY Bomi 💙✨',
      badgeTitlePt: 'MY Bomi 💙✨',
      greeting: 'Bomi is ready for Kwangya with aespa! Supernova! 💙✨',
      greetingKo: '광야로 떠나는 사이버 봄이와 함께 에스파 소울메이트 찾기! 💙✨',
      greetingEn: 'Bomi is ready for Kwangya with aespa! Supernova! 💙✨',
      greetingEs: '¡Bomi lista para viajar a Kwangya con aespa! ¡Supernova! 💙✨',
      greetingPt: 'Bomi pronta para Kwangya com o aespa! Supernova! 💙✨',
      winCheer: 'Supernova explosion! 100% MY sync rate certified! 💙✨',
      winCheerKo: '대박! 수수수 슈퍼노바! 싱크로율 100% 찐 마이(MY) 인정! 💙✨',
      winCheerEn: 'Supernova explosion! 100% MY sync rate certified! 💙✨',
      winCheerEs: '¡Explosión Supernova! ¡Sincronización 100% con aespa! 💙✨',
      winCheerPt: 'Explosão Supernova! Sincronização 100% com o aespa! 💙✨',
      encourage: "Don't worry! Your inner avatar is shining bright! 💙",
      encourageKo: '괜찮아! 당신 안의 슈퍼노바 에너지는 영원해! 💙',
      encourageEn: "Don't worry! Your inner avatar is shining bright! 💙",
      encourageEs: '¡Ánimo! ¡Tu avatar interior brilla con fuerza! 💙',
      encouragePt: 'Ânimo! Seu avatar interior brilha com força! 💙',
    };
  }

  // LE SSERAFIM -> Bomi in sporty fearless athleisure (피어리스 봄이 🔥👑)
  if (
    normalizedTag.includes('le sserafim') ||
    normalizedTag.includes('lesserafim') ||
    normalizedSlug.includes('le-sserafim') ||
    normalizedSlug.includes('lesserafim')
  ) {
    return {
      name: 'Bomi 🔥',
      nameKo: '봄이 🔥',
      nameEs: 'Bomi 🔥',
      namePt: 'Bomi 🔥',
      avatarUrl: '/images/mascot/bomi-lesserafim.webp',
      gender: 'female',
      badgeTitle: 'FEARNOT Bomi 🔥',
      badgeTitleKo: '피어나 봄이 🔥',
      badgeTitleEs: 'FEARNOT Bomi 🔥',
      badgeTitlePt: 'FEARNOT Bomi 🔥',
      greeting: 'Bomi is cheering with FEARNOTs! Make it look easy! 🔥',
      greetingKo: '당당하고 피어리스한 봄이와 함께 르세라핌 소울메이트 찾기! 🔥',
      greetingEn: 'Bomi is cheering with FEARNOTs! Make it look easy! 🔥',
      greetingEs: '¡Bomi anima a los FEARNOTs! ¡Haz que parezca fácil! 🔥',
      greetingPt: 'Bomi torcendo com os FEARNOTs! Faça parecer fácil! 🔥',
      winCheer: 'Incredible! Fearless & Antifragile FEARNOT certified! 🔥👑',
      winCheerKo: '완벽해! 부러지지 않는 안티프래자일 찐 피어나(FEARNOT) 인정! 🔥👑',
      winCheerEn: 'Incredible! Fearless & Antifragile FEARNOT certified! 🔥👑',
      winCheerEs: '¡Increíble! ¡FEARNOT Antifragile certificada! 🔥👑',
      winCheerPt: 'Incrível! FEARNOT Antifrágil certificada! 🔥👑',
      encourage: 'Never fear! Make the impossible look easy! 🔥',
      encourageKo: '두려워하지 마! 불가능도 이지(EASY)하게 해낼 수 있어! 🔥',
      encourageEn: 'Never fear! Make the impossible look easy! 🔥',
      encourageEs: '¡Sin miedo! ¡Haz que lo imposible sea fácil! 🔥',
      encouragePt: 'Sem medo! Faça o impossível parecer fácil! 🔥',
    };
  }

  // BLACKPINK -> Bomi (봄이 🌸)
  if (normalizedTag.includes('blackpink') || normalizedSlug.includes('blackpink')) {
    return {
      name: 'Bomi 🌸',
      nameKo: '봄이 🌸',
      nameEs: 'Bomi 🌸',
      namePt: 'Bomi 🌸',
      avatarUrl: '/images/mascot/bomi-blackpink-v2.webp',
      gender: 'female',
      badgeTitle: 'Mascot Bomi 🌸',
      badgeTitleKo: '마스코트 봄이 🌸',
      badgeTitleEs: 'Mascota Bomi 🌸',
      badgeTitlePt: 'Mascote Bomi 🌸',
      greeting: 'Bomi is cheering for BLINKs! 🖤💖',
      greetingKo: '블링크 전담 마스코트 봄이가 함께해요! 🖤💖',
      greetingEn: 'Bomi is cheering for BLINKs! 🖤💖',
      greetingEs: '¡Bomi está animando a los BLINKs! 🖤💖',
      greetingPt: 'A Bomi está torcendo pelos BLINKs! 🖤💖',
      winCheer: 'Incredible! True BLINK certified! Shake the hammer! 🖤💖',
      winCheerKo: '대박! 찐 블링크 인정! 뿅봉 흔들어! 🖤💖',
      winCheerEn: 'Incredible! True BLINK certified! Shake the hammer! 🖤💖',
      winCheerEs: '¡Increíble! ¡Verdadera BLINK certificada! 🖤💖',
      winCheerPt: 'Incrível! BLINK de verdade certificada! 🖤💖',
      encourage: 'Cheer up! You can ace all 50 questions next time! 🌸',
      encourageKo: '괜찮아! 다음엔 50문제 올클리어 할 수 있어! 🌸',
      encourageEn: 'Cheer up! You can ace all 50 questions next time! 🌸',
      encourageEs: '¡Ánimo! ¡La próxima vez acertarás todas! 🌸',
      encouragePt: 'Ânimo! Na próxima vez você vai acertar todas! 🌸',
    };
  }

  // BTS -> Hobi (보라빛 수트 호비 💜)
  if (normalizedTag.includes('bts') || normalizedSlug.includes('bts')) {
    return {
      name: 'Hobi 🐯',
      nameKo: '호비 🐯',
      nameEs: 'Hobi 🐯',
      namePt: 'Hobi 🐯',
      avatarUrl: '/images/mascot/hobi-bts-v2.webp',
      gender: 'male',
      badgeTitle: 'ARMY Hobi 💜',
      badgeTitleKo: '아미 호비 💜',
      badgeTitleEs: 'ARMY Hobi 💜',
      badgeTitlePt: 'ARMY Hobi 💜',
      greeting: 'Hobi is ready with ARMY Bomb! Borahae! 💜',
      greetingKo: '아미밤을 든 호비와 함께 보라빛 퀴즈 도전! 💜',
      greetingEn: 'Hobi is ready with ARMY Bomb! Borahae! 💜',
      greetingEs: '¡Hobi está listo con el ARMY Bomb! ¡Borahae! 💜',
      greetingPt: 'Hobi está pronto com o ARMY Bomb! Borahae! 💜',
      winCheer: 'Incredible! True ARMY certified! Borahae! 💜',
      winCheerKo: '대박! 성골 아미 인정! 보라해! 💜',
      winCheerEn: 'Incredible! True ARMY certified! Borahae! 💜',
      winCheerEs: '¡Increíble! ¡ARMY de corazón! ¡Borahae! 💜',
      winCheerPt: 'Incrível! ARMY de coração! Borahae! 💜',
      encourage: 'Fighting! An ARMY never gives up! 💜',
      encourageKo: '파이팅! 아미의 열정은 식지 않아! 💜',
      encourageEn: 'Fighting! An ARMY never gives up! 💜',
      encourageEs: '¡Ánimo! ¡Un ARMY nunca se rinde! 💜',
      encouragePt: 'Força! Um ARMY nunca desiste! 💜',
    };
  }

  // Stray Kids -> Hobi (스트릿/나침봉 호비 🐺)
  if (
    normalizedTag.includes('stray kids') ||
    normalizedTag.includes('skz') ||
    normalizedSlug.includes('stray-kids') ||
    normalizedSlug.includes('skz')
  ) {
    return {
      name: 'Hobi 🐺',
      nameKo: '호비 🐺',
      nameEs: 'Hobi 🐺',
      namePt: 'Hobi 🐺',
      avatarUrl: '/images/mascot/hobi-skz-v2.webp',
      gender: 'male',
      badgeTitle: 'STAY Hobi 🐺',
      badgeTitleKo: '스테이 호비 🐺',
      badgeTitleEs: 'STAY Hobi 🐺',
      badgeTitlePt: 'STAY Hobi 🐺',
      greeting: 'Hobi with Nachimbong! Stray Kids everywhere! 🐺',
      greetingKo: '나침봉을 든 호비와 함께 5성급 스테이 도전! 🐺',
      greetingEn: 'Hobi with Nachimbong! Stray Kids everywhere! 🐺',
      greetingEs: '¡Hobi con el Nachimbong! ¡Stray Kids en todas partes! 🐺',
      greetingPt: 'Hobi com o Nachimbong! Stray Kids em todo lugar! 🐺',
      winCheer: '100% Perfect! 5-Star Michelin STAY certified! 👨‍🍳🏆',
      winCheerKo: '100% 퍼펙트! 5성급 미슐랭 스테이 인정! 👨‍🍳🏆',
      winCheerEn: '100% Perfect! 5-Star Michelin STAY certified! 👨‍🍳🏆',
      winCheerEs: '¡100% Perfecto! ¡STAY Michelin 5 Estrellas! 👨‍🍳🏆',
      winCheerPt: '100% Perfeito! STAY Michelin 5 Estrelas! 👨‍🍳🏆',
      encourage: 'Keep going! Stray Kids make STAY proud! 🐺🔥',
      encourageKo: '파이팅! 스테이의 도전은 멈추지 않아! 🐺🔥',
      encourageEn: 'Keep going! Stray Kids make STAY proud! 🐺🔥',
      encourageEs: '¡Sigue adelante! ¡La próxima lo lograrás! 🐺🔥',
      encouragePt: 'Continue assim! Na próxima você consegue! 🐺🔥',
    };
  }

  // Default -> Sleek v2 Hobi (세련된 마스코트 호비 🐯)
  return {
    name: 'Hobi 🐯',
    nameKo: '호비 🐯',
    nameEs: 'Hobi 🐯',
    namePt: 'Hobi 🐯',
    avatarUrl: '/images/mascot/hobi-bts-v2.webp',
    gender: 'male',
    badgeTitle: 'Mascot Hobi 🐯',
    badgeTitleKo: '마스코트 호비 🐯',
    badgeTitleEs: 'Mascota Hobi 🐯',
    badgeTitlePt: 'Mascote Hobi 🐯',
    greeting: 'Challenge your K-Culture IQ with Mascot Hobi! ✨',
    greetingKo: '마스코트 호비와 함께 한국 퀴즈 마스터 도전! ✨',
    greetingEn: 'Challenge your K-Culture IQ with Mascot Hobi! ✨',
    greetingEs: '¡Desafía tu IQ de K-Cultura con Hobi! ✨',
    greetingPt: 'Desafie seu QI de K-Cultura com o Hobi! ✨',
    winCheer: 'Incredible! Near perfect mastery! 🌟',
    winCheerKo: '대박! 완벽에 가까운 실력 인정! 🌟',
    winCheerEn: 'Incredible! Near perfect mastery! 🌟',
    winCheerEs: '¡Increíble! ¡Casi perfecto! 🌟',
    winCheerPt: 'Incrível! Quase perfeito! 🌟',
    encourage: 'Fighting! You will ace it next time! 🔥',
    encourageKo: '파이팅! 다음엔 다 맞힐 수 있어! 🔥',
    encourageEn: 'Fighting! You will ace it next time! 🔥',
    encourageEs: '¡Ánimo! ¡La próxima lo harás genial! 🔥',
    encouragePt: 'Força! Na próxima você vai arrasar! 🔥',
  };
}
