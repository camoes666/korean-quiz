export interface QuizMascot {
  name: string;
  nameKo: string;
  avatarUrl: string;
  gender: 'female' | 'male';
  badgeTitle: string;
  greetingKo: string;
  greetingEn: string;
  greetingEs: string;
  winCheerKo: string;
  winCheerEn: string;
  winCheerEs: string;
  encourageKo: string;
  encourageEn: string;
  encourageEs: string;
}

export function getQuizMascot(slug?: string, tag?: string): QuizMascot {
  const normalizedTag = (tag || '').toLowerCase();
  const normalizedSlug = (slug || '').toLowerCase();

  // BLACKPINK -> Bomi (봄이 🌸)
  if (normalizedTag.includes('blackpink') || normalizedSlug.includes('blackpink')) {
    return {
      name: 'Bomi',
      nameKo: '봄이 🌸',
      avatarUrl: '/images/mascot/bomi-blackpink.webp',
      gender: 'female',
      badgeTitle: '마스코트 봄이 🌸',
      greetingKo: '블링크 전담 마스코트 봄이가 함께해요! 🖤💖',
      greetingEn: 'Bomi is cheering for BLINKs! 🖤💖',
      greetingEs: '¡Bomi está animando a los BLINKs! 🖤💖',
      winCheerKo: '대박! 찐 블링크 인정! 뿅봉 흔들어! 🖤💖',
      winCheerEn: 'Incredible! True BLINK certified! Shake the hammer! 🖤💖',
      winCheerEs: '¡Increíble! ¡Verdadera BLINK certificada! 🖤💖',
      encourageKo: '괜찮아! 다음엔 50문제 올클리어 할 수 있어! 🌸',
      encourageEn: 'Cheer up! You can ace all 50 questions next time! 🌸',
      encourageEs: '¡Ánimo! ¡La próxima vez acertarás todas! 🌸',
    };
  }

  // BTS -> Hobi (보라빛 수트 호비 💜)
  if (normalizedTag.includes('bts') || normalizedSlug.includes('bts')) {
    return {
      name: 'Hobi',
      nameKo: '호비 🐯',
      avatarUrl: '/images/mascot/hobi-bts.webp',
      gender: 'male',
      badgeTitle: '아미 호비 💜',
      greetingKo: '아미밤을 든 호비와 함께 보라빛 퀴즈 도전! 💜',
      greetingEn: 'Hobi is ready with ARMY Bomb! Borahae! 💜',
      greetingEs: '¡Hobi está listo con el ARMY Bomb! ¡Borahae! 💜',
      winCheerKo: '대박! 성골 아미 인정! 보라해! 💜',
      winCheerEn: 'Incredible! True ARMY certified! Borahae! 💜',
      winCheerEs: '¡Increíble! ¡ARMY de corazón! ¡Borahae! 💜',
      encourageKo: '파이팅! 아미의 열정은 식지 않아! 💜',
      encourageEn: 'Fighting! An ARMY never gives up! 💜',
      encourageEs: '¡Ánimo! ¡Un ARMY nunca se rinde! 💜',
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
      name: 'Hobi',
      nameKo: '호비 🐺',
      avatarUrl: '/images/mascot/hobi-skz.webp',
      gender: 'male',
      badgeTitle: '스테이 호비 🐺',
      greetingKo: '나침봉을 든 호비와 함께 5성급 스테이 도전! 🐺',
      greetingEn: 'Hobi with Nachimbong! Stray Kids everywhere! 🐺',
      greetingEs: '¡Hobi con el Nachimbong! ¡Stray Kids en todas partes! 🐺',
      winCheerKo: '100% 퍼펙트! 5성급 미슐랭 스테이 인정! 👨‍🍳🏆',
      winCheerEn: '100% Perfect! 5-Star Michelin STAY certified! 👨‍🍳🏆',
      winCheerEs: '¡100% Perfecto! ¡STAY Michelin 5 Estrellas! 👨‍🍳🏆',
      encourageKo: '파이팅! 스테이의 도전은 멈추지 않아! 🐺🔥',
      encourageEn: 'Keep going! Stray Kids make STAY proud! 🐺🔥',
      encourageEs: '¡Sigue adelante! ¡La próxima lo lograrás! 🐺🔥',
    };
  }

  // Default -> Hobi (기본 백호랑이 🐯)
  return {
    name: 'Hobi',
    nameKo: '호비 🐯',
    avatarUrl: '/images/hobi01.webp',
    gender: 'male',
    badgeTitle: '마스코트 호비 🐯',
    greetingKo: '마스코트 호비와 함께 한국 퀴즈 마스터 도전! ✨',
    greetingEn: 'Challenge your K-Culture IQ with Mascot Hobi! ✨',
    greetingEs: '¡Desafía tu IQ de K-Cultura con Hobi! ✨',
    winCheerKo: '대박! 완벽에 가까운 실력 인정! 🌟',
    winCheerEn: 'Incredible! Near perfect mastery! 🌟',
    winCheerEs: '¡Increíble! ¡Casi perfecto! 🌟',
    encourageKo: '파이팅! 다음엔 다 맞힐 수 있어! 🔥',
    encourageEn: 'Fighting! You will ace it next time! 🔥',
    encourageEs: '¡Ánimo! ¡La próxima lo harás genial! 🔥',
  };
}
