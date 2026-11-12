import {
  IdolGroupProfile,
  IdolMemberProfile,
  MbtiType,
  SajuElement,
  ZodiacSign,
} from '../data/idolChemistry';
import { Language } from './translations';

export type UserMbtiInput = MbtiType | 'UNKNOWN';

export interface UserChemistryInput {
  nickname?: string;
  birthYear?: number; // Default 2000 if omitted
  birthMonth: number; // 1..12
  birthDay: number; // 1..31
  mbti: UserMbtiInput;
}

export type SajuRelationType =
  | 'harmony_feed' // 내가 상대를 생해주는 상생 (수생목, 목생화, 화생토, 토생금, 금생수)
  | 'harmony_receive' // 상대가 나를 생해주는 상생
  | 'twin_flame' // 비화 (같은 오행 기운)
  | 'magnetic_spark'; // 상극/보완 (서로 다른 극성으로 강하게 끌리는 자석 케미)

export interface SajuElementMeta {
  element: SajuElement;
  emoji: string;
  hanja: string;
  nameEn: string;
  nameKo: string;
  nameEs: string;
  namePt: string;
  traitEn: string;
  traitKo: string;
  traitEs: string;
  traitPt: string;
  colorClass: string;
  badgeBg: string;
}

export const SAJU_ELEMENTS: Record<SajuElement, SajuElementMeta> = {
  wood: {
    element: 'wood',
    emoji: '🌲',
    hanja: '木',
    nameEn: 'Wood (Tree)',
    nameKo: '목(木) · 푸른 나무',
    nameEs: 'Madera (Árbol)',
    namePt: 'Madeira (Árvore)',
    traitEn: 'Warm growth, creativity & gentle shelter',
    traitKo: '따뜻한 성장, 창의력, 포근한 그늘',
    traitEs: 'Crecimiento cálido, creatividad y refugio suave',
    traitPt: 'Crescimento caloroso, criatividade e abrigo suave',
    colorClass: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  },
  fire: {
    element: 'fire',
    emoji: '🔥',
    hanja: '火',
    nameEn: 'Fire (Flame)',
    nameKo: '화(火) · 타오르는 태양',
    nameEs: 'Fuego (Llama)',
    namePt: 'Fogo (Chama)',
    traitEn: 'Passionate spark, honesty & radiant warmth',
    traitKo: '뜨거운 열정, 솔직한 표현, 밝은 에너지',
    traitEs: 'Chispa apasionada, sinceridad y calidez radiante',
    traitPt: 'Faísca apaixonada, sinceridade e calor radiante',
    colorClass: 'text-rose-600',
    badgeBg: 'bg-rose-50 border-rose-200 text-rose-800',
  },
  earth: {
    element: 'earth',
    emoji: '⛰️',
    hanja: '土',
    nameEn: 'Earth (Mountain)',
    nameKo: '토(土) · 단단한 대지',
    nameEs: 'Tierra (Montaña)',
    namePt: 'Terra (Montanha)',
    traitEn: 'Unshakable trust, comfort & loyal embrace',
    traitKo: '흔들리지 않는 신뢰, 편안함, 묵묵한 포용력',
    traitEs: 'Confianza inquebrantable, calma y lealtad',
    traitPt: 'Confiança inabalável, conforto e lealdade',
    colorClass: 'text-amber-600',
    badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
  },
  metal: {
    element: 'metal',
    emoji: '💎',
    hanja: '金',
    nameEn: 'Metal (Jewel)',
    nameKo: '금(金) · 빛나는 보석',
    nameEs: 'Metal (Joya)',
    namePt: 'Metal (Joia)',
    traitEn: 'Clear conviction, loyalty & sparkling wit',
    traitKo: '투명한 진심, 의리, 반짝이는 센스',
    traitEs: 'Convicción clara, lealtad e ingenio brillante',
    traitPt: 'Convicção clara, lealdade e brilho único',
    colorClass: 'text-indigo-600',
    badgeBg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
  },
  water: {
    element: 'water',
    emoji: '🌊',
    hanja: '水',
    nameEn: 'Water (Ocean)',
    nameKo: '수(水) · 깊은 바다',
    nameEs: 'Agua (Océano)',
    namePt: 'Água (Oceano)',
    traitEn: 'Deep empathy, intuition & flexible flow',
    traitKo: '깊은 공감력, 섬세한 감수성, 유연한 지혜',
    traitEs: 'Empatía profunda, intuición y fluidez',
    traitPt: 'Empatia profunda, intuição e sabedoria fluida',
    colorClass: 'text-sky-600',
    badgeBg: 'bg-sky-50 border-sky-200 text-sky-800',
  },
};

export interface ZodiacMeta {
  sign: ZodiacSign;
  emoji: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  nameEn: string;
  nameKo: string;
  nameEs: string;
  namePt: string;
}

export const ZODIAC_META: Record<ZodiacSign, ZodiacMeta> = {
  aries: { sign: 'aries', emoji: '♈', element: 'fire', nameEn: 'Aries', nameKo: '양자리', nameEs: 'Aries', namePt: 'Áries' },
  taurus: { sign: 'taurus', emoji: '♉', element: 'earth', nameEn: 'Taurus', nameKo: '황소자리', nameEs: 'Tauro', namePt: 'Touro' },
  gemini: { sign: 'gemini', emoji: '♊', element: 'air', nameEn: 'Gemini', nameKo: '쌍둥이자리', nameEs: 'Géminis', namePt: 'Gêmeos' },
  cancer: { sign: 'cancer', emoji: '♋', element: 'water', nameEn: 'Cancer', nameKo: '게자리', nameEs: 'Cáncer', namePt: 'Câncer' },
  leo: { sign: 'leo', emoji: '♌', element: 'fire', nameEn: 'Leo', nameKo: '사자자리', nameEs: 'Leo', namePt: 'Leão' },
  virgo: { sign: 'virgo', emoji: '♍', element: 'earth', nameEn: 'Virgo', nameKo: '처녀자리', nameEs: 'Virgo', namePt: 'Virgem' },
  libra: { sign: 'libra', emoji: '♎', element: 'air', nameEn: 'Libra', nameKo: '천칭자리', nameEs: 'Libra', namePt: 'Libra' },
  scorpio: { sign: 'scorpio', emoji: '♏', element: 'water', nameEn: 'Scorpio', nameKo: '전갈자리', nameEs: 'Escorpio', namePt: 'Escorpião' },
  sagittarius: { sign: 'sagittarius', emoji: '♐', element: 'fire', nameEn: 'Sagittarius', nameKo: '사수자리', nameEs: 'Sagitario', namePt: 'Sagitário' },
  capricorn: { sign: 'capricorn', emoji: '♑', element: 'earth', nameEn: 'Capricorn', nameKo: '염소자리', nameEs: 'Capricornio', namePt: 'Capricórnio' },
  aquarius: { sign: 'aquarius', emoji: '♒', element: 'air', nameEn: 'Aquarius', nameKo: '물병자리', nameEs: 'Acuario', namePt: 'Aquário' },
  pisces: { sign: 'pisces', emoji: '♓', element: 'water', nameEn: 'Pisces', nameKo: '물고기자리', nameEs: 'Piscis', namePt: 'Peixes' },
};

export const ALL_MBTI_TYPES: MbtiType[] = [
  'ENFP', 'ENFJ', 'INFP', 'INFJ',
  'ENTP', 'ENTJ', 'INTP', 'INTJ',
  'ESFP', 'ESTP', 'ISFP', 'ISTP',
  'ESFJ', 'ESTJ', 'ISFJ', 'ISTJ',
];

/**
 * Calculates Western Zodiac sign from month (1-12) and day (1-31).
 */
export function getZodiacFromMonthDay(month: number, day: number): ZodiacSign {
  const m = Math.max(1, Math.min(12, month));
  const d = Math.max(1, Math.min(31, day));

  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'aries';
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'taurus';
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 'gemini';
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 'cancer';
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'leo';
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'virgo';
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 'libra';
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 'scorpio';
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return 'sagittarius';
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 'capricorn';
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'aquarius';
  return 'pisces';
}

/**
 * Calculates the user's K-Saju Five Element (오행: 목·화·토·금·수)
 * using the Julian Day Number -> 10 Heavenly Stems (천간: 갑을=목, 병정=화, 무기=토, 경신=금, 임계=수)
 * which is the authentic Korean Saju Day Master (일간) method!
 */
export function getSajuElementFromBirthDate(
  year = 2000,
  month = 1,
  day = 1
): SajuElement {
  const y = Math.max(1940, Math.min(2025, year || 2000));
  const m = Math.max(1, Math.min(12, month || 1));
  const d = Math.max(1, Math.min(31, day || 1));

  // Julian Day Number calculation
  const a = Math.floor((14 - m) / 12);
  const yAdj = y + 4800 - a;
  const mAdj = m + 12 * a - 3;
  const jdn =
    d +
    Math.floor((153 * mAdj + 2) / 5) +
    365 * yAdj +
    Math.floor(yAdj / 4) -
    Math.floor(yAdj / 100) +
    Math.floor(yAdj / 400) -
    32045;

  // 10 Heavenly Stems (갑0, 을1 -> wood, 병2, 정3 -> fire, 무4, 기5 -> earth, 경6, 신7 -> metal, 임8, 계9 -> water)
  const stemIndex = ((jdn + 9) % 10 + 10) % 10;
  const elementOrder: SajuElement[] = ['wood', 'fire', 'earth', 'metal', 'water'];
  return elementOrder[Math.floor(stemIndex / 2)];
}

/**
 * Determines the traditional Five Elements (오행) relationship between User and Idol.
 * Sangsaeng (상생) cycle: wood -> fire -> earth -> metal -> water -> wood
 */
export function getSajuRelation(
  userEl: SajuElement,
  memberEl: SajuElement
): {
  type: SajuRelationType;
  rawScore: number; // 78..98
} {
  if (userEl === memberEl) {
    return { type: 'twin_flame', rawScore: 93 };
  }

  const generates: Record<SajuElement, SajuElement> = {
    wood: 'fire',
    fire: 'earth',
    earth: 'metal',
    metal: 'water',
    water: 'wood',
  };

  if (generates[userEl] === memberEl) {
    return { type: 'harmony_feed', rawScore: 97 };
  }
  if (generates[memberEl] === userEl) {
    return { type: 'harmony_receive', rawScore: 96 };
  }

  // Complementary / Magnetic Spark (상극이지만 서로 없는 에너지를 강하게 끌어당기는 보완 케미)
  return { type: 'magnetic_spark', rawScore: 86 };
}

export type MbtiRelationCategory =
  | 'soulmate_pair' // 천생연분 (인식기능 N/S 일치 + 나머지 보완 or 이상적 궁합)
  | 'bestie_tiki_taka' // 말 잘 통하는 단짝
  | 'mirror_twin' // 도플갱어 거울 케미
  | 'magnetic_balance'; // 정반대여서 끌리는 반전 시너지

/**
 * Evaluates MBTI chemistry between User and Member.
 */
export function getMbtiChemistry(
  userMbti: UserMbtiInput,
  memberMbti: MbtiType
): {
  category: MbtiRelationCategory;
  rawScore: number; // 78..98
} {
  if (userMbti === 'UNKNOWN') {
    return { category: 'bestie_tiki_taka', rawScore: 89 };
  }

  if (userMbti === memberMbti) {
    return { category: 'mirror_twin', rawScore: 92 };
  }

  let sharedLetters = 0;
  for (let i = 0; i < 4; i++) {
    if (userMbti[i] === memberMbti[i]) sharedLetters++;
  }

  const sameNS = userMbti[1] === memberMbti[1];
  const oppositeEI = userMbti[0] !== memberMbti[0];
  const oppositeJP = userMbti[3] !== memberMbti[3];

  // Classic Golden Pair (e.g. ENFP x INFJ / INTJ, INFP x ENFJ, ISTP x ESFJ, etc.)
  if (
    (sameNS && oppositeEI && oppositeJP) ||
    (oppositeEI && userMbti[1] === memberMbti[1] && userMbti[2] === memberMbti[2])
  ) {
    return { category: 'soulmate_pair', rawScore: 98 };
  }

  if (sharedLetters === 3) {
    return { category: 'bestie_tiki_taka', rawScore: 94 };
  }

  if (sharedLetters === 2) {
    return { category: 'bestie_tiki_taka', rawScore: 89 };
  }

  return { category: 'magnetic_balance', rawScore: 85 };
}

/**
 * Evaluates Western Zodiac 4-element harmony (Fire/Air compatible, Earth/Water compatible).
 */
export function getZodiacHarmonyScore(
  userZodiac: ZodiacSign,
  memberZodiac: ZodiacSign
): number {
  if (userZodiac === memberZodiac) return 95;

  const uEl = ZODIAC_META[userZodiac].element;
  const mEl = ZODIAC_META[memberZodiac].element;

  if (uEl === mEl) return 96;
  if (
    (uEl === 'fire' && mEl === 'air') ||
    (uEl === 'air' && mEl === 'fire') ||
    (uEl === 'earth' && mEl === 'water') ||
    (uEl === 'water' && mEl === 'earth')
  ) {
    return 93;
  }
  return 85;
}

export interface ChemistryAnalysisResult {
  member: IdolMemberProfile;
  group: IdolGroupProfile;
  userElement: SajuElementMeta;
  memberElement: SajuElementMeta;
  userZodiac: ZodiacMeta;
  memberZodiac: ZodiacMeta;
  sajuRelationType: SajuRelationType;
  mbtiCategory: MbtiRelationCategory;
  totalScore: number; // 74..99
  stats: {
    sajuScore: number;
    mbtiScore: number;
    vibeScore: number;
    dateScore: number;
  };
  tierBadge: string;
  tierTitle: string;
  sajuHeadline: string;
  sajuDetail: string;
  mbtiDetail: string;
  dateScenario: string;
}

function pickLocalized(
  lang: Language,
  map: { en: string; ko: string; es: string; pt?: string }
): string {
  if (lang === 'ko') return map.ko;
  if (lang === 'es') return map.es;
  if (lang === 'pt') return map.pt || map.es;
  return map.en;
}

export function getElementDisplayName(meta: SajuElementMeta, lang: Language): string {
  if (lang === 'ko') return meta.nameKo;
  if (lang === 'es') return meta.nameEs;
  if (lang === 'pt') return meta.namePt;
  return meta.nameEn;
}

export function getZodiacDisplayName(meta: ZodiacMeta, lang: Language): string {
  if (lang === 'ko') return meta.nameKo;
  if (lang === 'es') return meta.nameEs;
  if (lang === 'pt') return meta.namePt;
  return meta.nameEn;
}

/**
 * Computes full deterministic compatibility report for a user and an idol member.
 */
export function analyzeIdolChemistry(
  userInput: UserChemistryInput,
  group: IdolGroupProfile,
  member: IdolMemberProfile,
  lang: Language = 'en'
): ChemistryAnalysisResult {
  const birthYear = userInput.birthYear || 2000;
  const birthMonth = Math.max(1, Math.min(12, userInput.birthMonth || 1));
  const birthDay = Math.max(1, Math.min(31, userInput.birthDay || 1));

  const userElKey = getSajuElementFromBirthDate(birthYear, birthMonth, birthDay);
  const userElement = SAJU_ELEMENTS[userElKey];
  const memberElement = SAJU_ELEMENTS[member.sajuElement];

  const userZodiacKey = getZodiacFromMonthDay(birthMonth, birthDay);
  const userZodiac = ZODIAC_META[userZodiacKey];
  const memberZodiac = ZODIAC_META[member.zodiac];

  const sajuRel = getSajuRelation(userElKey, member.sajuElement);
  const mbtiRel = getMbtiChemistry(userInput.mbti, member.mbti);
  const zodiacBase = getZodiacHarmonyScore(userZodiacKey, member.zodiac);

  // Deterministic personal harmonic offset (-3 to +4) based on exact birthday & member id
  const memberBirthParts = member.birthDate.split('-').map(Number);
  const mMonth = memberBirthParts[1] || 1;
  const mDay = memberBirthParts[2] || 1;
  let idHash = 0;
  for (let i = 0; i < member.id.length; i++) {
    idHash = (idHash * 31 + member.id.charCodeAt(i)) % 997;
  }
  const seed = (birthMonth * 37 + birthDay * 13 + mMonth * 19 + mDay * 7 + idHash) % 8;
  const harmonicDelta = seed - 3; // -3..+4

  const clampStat = (val: number) => Math.max(74, Math.min(99, Math.round(val)));

  const sajuScore = clampStat(sajuRel.rawScore + (harmonicDelta % 3));
  const mbtiScore = clampStat(
    userInput.mbti === 'UNKNOWN'
      ? (sajuRel.rawScore + zodiacBase) / 2 + (seed % 4)
      : mbtiRel.rawScore + ((seed + 1) % 3) - 1
  );
  const vibeScore = clampStat(zodiacBase + harmonicDelta);
  const dateScore = clampStat((sajuScore * 0.4 + mbtiScore * 0.4 + vibeScore * 0.2) + ((seed % 5) - 2));

  const rawTotal =
    userInput.mbti === 'UNKNOWN'
      ? sajuScore * 0.5 + vibeScore * 0.3 + dateScore * 0.2
      : sajuScore * 0.38 + mbtiScore * 0.34 + vibeScore * 0.16 + dateScore * 0.12;

  const totalScore = clampStat(rawTotal);

  const memberNameLocal = lang === 'ko' ? member.nameKo : member.name;
  const userNameLocal =
    userInput.nickname?.trim() ||
    pickLocalized(lang, {
      en: 'You',
      ko: '당신',
      es: 'Tú',
      pt: 'Você',
    });

  // Tier Title & Badge
  let tierBadge = '';
  let tierTitle = '';
  if (totalScore >= 94) {
    tierBadge = pickLocalized(lang, {
      en: '👑 DESTINED TWIN FLAME (Top 1% Match)',
      ko: '👑 전생부터 약속된 천생연분 (상위 1% 운명)',
      es: '👑 ALMAS GEMELAS DESTINADAS (Top 1%)',
      pt: '👑 ALMAS GÊMEAS DESTINADAS (Top 1%)',
    });
    tierTitle = pickLocalized(lang, {
      en: `Written in the Stars: Unbreakable Soulmate Bond with ${member.name}`,
      ko: `우주가 점찍어준 인연! ${memberNameLocal}와(과) 영혼까지 통하는 운명`,
      es: `Escrito en las estrellas: Conexión de alma gemela con ${member.name}`,
      pt: `Escrito nas estrelas: Conexão de alma gêmea com ${member.name}`,
    });
  } else if (totalScore >= 88) {
    tierBadge = pickLocalized(lang, {
      en: '💖 PERFECT HEARTBEAT CHEMISTRY',
      ko: '💖 눈빛만 봐도 통하는 환상의 짝꿍',
      es: '💖 QUÍMICA DE CORAZÓN PERFECTA',
      pt: '💖 QUÍMICA DE CORAÇÃO PERFEITA',
    });
    tierTitle = pickLocalized(lang, {
      en: `Effortless Tiki-Taka & Sweet Spark with ${member.name}`,
      ko: `말하지 않아도 알아요! ${memberNameLocal}와(과) 설렘 가득한 찰떡 케미`,
      es: `Risas sin fin y chispa perfecta con ${member.name}`,
      pt: `Risadas sem fim e sintonia perfeita com ${member.name}`,
    });
  } else if (totalScore >= 81) {
    tierBadge = pickLocalized(lang, {
      en: '✨ HEALING BESTIE & ROMANCE VIBE',
      ko: '✨ 웃음과 설렘이 끊이지 않는 단짝 케미',
      es: '✨ VIBRA DE MEJORES AMIGOS Y ROMANCE',
      pt: '✨ VIBE DE MELHORES AMIGOS E ROMANCE',
    });
    tierTitle = pickLocalized(lang, {
      en: `Comfortable Warmth & Playful Energy with ${member.name}`,
      ko: `함께 있을 때 가장 나다워지는 ${memberNameLocal}와의 힐링 시너지`,
      es: `Calidez reconfortante y energía divertida con ${member.name}`,
      pt: `Calor reconfortante e energia divertida com ${member.name}`,
    });
  } else {
    tierBadge = pickLocalized(lang, {
      en: '⚡ MAGNETIC OPPOSITES ATTRACT',
      ko: '⚡ 서로의 빈틈을 채워주는 반전 매력 자석',
      es: '⚡ POLOS OPUESTOS MAGNÉTICOS',
      pt: '⚡ OPOSTOS MAGNÉTICOS QUE SE ATRAEM',
    });
    tierTitle = pickLocalized(lang, {
      en: `Unpredictable Thrill & Complementary Spark with ${member.name}`,
      ko: `달라서 더 강렬하게 끌린다! ${memberNameLocal}와의 짜릿한 반전 궁합`,
      es: `Atracción intensa y chispa complementaria con ${member.name}`,
      pt: `Atração intensa e faísca complementar com ${member.name}`,
    });
  }

  // Saju Headline & Explanation
  const uElName = getElementDisplayName(userElement, lang);
  const mElName = getElementDisplayName(memberElement, lang);

  let sajuHeadline = '';
  let sajuDetail = '';

  if (sajuRel.type === 'harmony_feed') {
    sajuHeadline = pickLocalized(lang, {
      en: `${userElement.emoji} Your ${userElement.nameEn} Nurtures ${member.name}'s ${memberElement.emoji} ${memberElement.nameEn}`,
      ko: `${userElement.emoji} 당신의 [${uElName}] 기운이 ${memberNameLocal}의 ${memberElement.emoji} [${mElName}] 기운을 활짝 피워주는 상생(相生) 궁합`,
      es: `${userElement.emoji} Tu ${userElement.nameEs} impulsa la energía ${memberElement.emoji} ${memberElement.nameEs} de ${member.name}`,
      pt: `${userElement.emoji} Sua energia ${userElement.namePt} fortalece ${memberElement.emoji} ${memberElement.namePt} de ${member.name}`,
    });
    sajuDetail = pickLocalized(lang, {
      en: `In Korean Saju (Five Elements), your ${userElement.nameEn} energy naturally fuels ${member.name}'s ${memberElement.nameEn}. Simply being around ${userNameLocal} makes ${member.name} feel deeply inspired, safe, and energized.`,
      ko: `명리학 오행에서 ${userNameLocal}님의 [${uElName}] 기운은 ${memberNameLocal}의 [${mElName}] 에너지를 자연스럽게 북돋아 주는 '상생' 관계입니다. 당신이 곁에 있는 것만으로도 ${memberNameLocal}는 큰 위로와 영감을 얻고 당신에게 깊이 의지하게 됩니다.`,
      es: `En el Saju coreano, tu energía ${userElement.nameEs} alimenta naturalmente el elemento ${memberElement.nameEs} de ${member.name}. Estar contigo le da paz, inspiración y alegría instantánea.`,
      pt: `No Saju coreano, sua energia ${userElement.namePt} alimenta naturalmente o elemento ${memberElement.namePt} de ${member.name}. Estar com você traz paz, inspiração e alegria imediata.`,
    });
  } else if (sajuRel.type === 'harmony_receive') {
    sajuHeadline = pickLocalized(lang, {
      en: `${memberElement.emoji} ${member.name}'s ${memberElement.nameEn} Empowers Your ${userElement.emoji} ${userElement.nameEn}`,
      ko: `${memberElement.emoji} ${memberNameLocal}의 [${mElName}] 기운이 당신의 ${userElement.emoji} [${uElName}] 기운을 빛내주는 귀인(貴人) 궁합`,
      es: `${memberElement.emoji} La energía ${memberElement.nameEs} de ${member.name} ilumina tu ${userElement.emoji} ${userElement.nameEs}`,
      pt: `${memberElement.emoji} A energia ${memberElement.namePt} de ${member.name} ilumina sua ${userElement.emoji} ${userElement.namePt}`,
    });
    sajuDetail = pickLocalized(lang, {
      en: `In Korean Saju, ${member.name}'s ${memberElement.nameEn} aura acts as a warm guardian for your ${userElement.nameEn} spirit. Whenever you feel tired, ${member.name}'s voice and presence recharge your luck and happiness 200%.`,
      ko: `사주 오행상 ${memberNameLocal}의 [${mElName}] 기운이 ${userNameLocal}님의 [${uElName}] 에너지를 따뜻하게 감싸주고 키워주는 최고급 상생 구조입니다. 지친 날에도 ${memberNameLocal}를 보거나 목소리를 들으면 에너지가 200% 충전되는 행운의 파트너입니다.`,
      es: `En el Saju coreano, el elemento ${memberElement.nameEs} de ${member.name} protege y recarga tu espíritu ${userElement.nameEs} al 200%.`,
      pt: `No Saju coreano, o elemento ${memberElement.namePt} de ${member.name} protege e recarrega seu espírito ${userElement.namePt} em 200%.`,
    });
  } else if (sajuRel.type === 'twin_flame') {
    sajuHeadline = pickLocalized(lang, {
      en: `${userElement.emoji} Twin ${userElement.nameEn} Souls: Instant Telepathy`,
      ko: `${userElement.emoji} 같은 [${uElName}] 기운을 타고난 영혼의 쌍둥이 (비화·比和 궁합)`,
      es: `${userElement.emoji} Almas Gemelas de ${userElement.nameEs}: Telepatía Instantánea`,
      pt: `${userElement.emoji} Almas Gêmeas de ${userElement.namePt}: Telepatia Instantânea`,
    });
    sajuDetail = pickLocalized(lang, {
      en: `You and ${member.name} share the exact same ${userElement.nameEn} core element! In Korean Saju, this is called 'Bihwa' — two souls on the same frequency who understand each other's unspoken feelings at first glance.`,
      ko: `${userNameLocal}님과 ${memberNameLocal}는 사주에 똑같은 [${uElName}] 기운을 품고 태어났습니다! 굳이 긴 말로 설명하지 않아도 눈빛과 표정만으로 상대의 기분을 단번에 알아채는 텔레파시 단짝입니다.`,
      es: `¡Tú y ${member.name} comparten exactamente el mismo elemento ${userElement.nameEs}! Se entienden sin palabras desde el primer segundo.`,
      pt: `Você e ${member.name} compartilham exatamente o mesmo elemento ${userElement.namePt}! Vocês se entendem sem palavras desde o primeiro segundo.`,
    });
  } else {
    sajuHeadline = pickLocalized(lang, {
      en: `${userElement.emoji} ${userElement.nameEn} × ${memberElement.emoji} ${memberElement.nameEn}: Unstoppable Magnetic Spark`,
      ko: `${userElement.emoji} [${uElName}] × ${memberElement.emoji} [${mElName}] — 서로에게 강렬하게 끌리는 자석 케미`,
      es: `${userElement.emoji} ${userElement.nameEs} × ${memberElement.emoji} ${memberElement.nameEs}: Chispa Magnética`,
      pt: `${userElement.emoji} ${userElement.namePt} × ${memberElement.emoji} ${memberElement.namePt}: Faísca Magnética`,
    });
    sajuDetail = pickLocalized(lang, {
      en: `Your ${userElement.nameEn} and ${member.name}'s ${memberElement.nameEn} possess contrasting energies that awaken curiosity and excitement. Like opposite poles of a magnet, you fill each other's blind spots and never have a dull moment together.`,
      ko: `${userNameLocal}님의 [${uElName}] 기운과 ${memberNameLocal}의 [${mElName}] 기운은 내가 갖지 못한 매력을 상대에게서 발견하며 강렬하게 끌리는 관계입니다. 함께 있으면 매일 새로운 설렘과 반전 매력을 발견하게 됩니다.`,
      es: `Tu ${userElement.nameEs} y el ${memberElement.nameEs} de ${member.name} tienen energías contrastantes que se atraen como un imán y nunca se aburren juntos.`,
      pt: `Sua energia ${userElement.namePt} e o elemento ${memberElement.namePt} de ${member.name} se atraem como um ímã e nunca ficam entediados juntos.`,
    });
  }

  // MBTI Detail
  let mbtiDetail = '';
  if (userInput.mbti === 'UNKNOWN') {
    mbtiDetail = pickLocalized(lang, {
      en: `${member.name} (${member.mbti}) naturally adapts to your rhythm, combining ${userZodiac.nameEn} and ${memberZodiac.nameEn} sensibilities for effortless late-night conversations.`,
      ko: `${memberNameLocal}(${member.mbti})의 성향과 당신의 ${userZodiac.nameKo} 감성이 자연스럽게 어우러져, 첫 만남부터 어색함 없이 오래 알고 지낸 사이처럼 편안한 대화가 이어집니다.`,
      es: `La personalidad ${member.mbti} de ${member.name} se adapta naturalmente a tu ritmo ${userZodiac.nameEs} para charlas inolvidables.`,
      pt: `A personalidade ${member.mbti} de ${member.name} se adapta naturalmente ao seu ritmo ${userZodiac.namePt} para conversas inesquecíveis.`,
    });
  } else if (mbtiRel.category === 'soulmate_pair') {
    mbtiDetail = pickLocalized(lang, {
      en: `${userInput.mbti} × ${member.mbti} is a legendary Golden Pair! You share the same core intuition while balancing each other's lifestyle — one leads with warmth while the other grounds the moment.`,
      ko: `${userInput.mbti}(당신) × ${member.mbti}(${memberNameLocal}) 조합은 MBTI 궁합에서도 손꼽히는 '황금 페어'입니다! 세상을 바라보는 결은 닮았으면서도 에너지 방향이 서로를 완벽하게 보완해 줍니다.`,
      es: `¡${userInput.mbti} × ${member.mbti} es una Pareja Dorada legendaria! Comparten la misma visión y se complementan a la perfección.`,
      pt: `${userInput.mbti} × ${member.mbti} é um Par Dourado lendário! Vocês compartilham a mesma visão e se complementam perfeitamente.`,
    });
  } else if (mbtiRel.category === 'mirror_twin') {
    mbtiDetail = pickLocalized(lang, {
      en: `Double ${member.mbti} energy! Because you both process feelings and humor the exact same way, you'll constantly shout "Wait, me too!" within 5 minutes of talking.`,
      ko: `두 사람 모두 [${member.mbti}] 도플갱어 조합! 개그 코드부터 혼자만의 충전 타이밍, 사소한 취향까지 소름 돋게 똑같아서 대화 5분 만에 "어? 나도 그런데!"를 연발하게 됩니다.`,
      es: `¡Doble energía ${member.mbti}! Comparten exactamente el mismo sentido del humor y gustos desde el primer minuto.`,
      pt: `Energia dupla ${member.mbti}! Vocês compartilham exatamente o mesmo senso de humor e gostos desde o primeiro minuto.`,
    });
  } else if (mbtiRel.category === 'bestie_tiki_taka') {
    mbtiDetail = pickLocalized(lang, {
      en: `${userInput.mbti} and ${member.mbti} have top-tier Tiki-Taka banter. Whether you're joking around or sharing deep thoughts, the conversation flows with zero awkward silence.`,
      ko: `${userInput.mbti}(당신)와 ${member.mbti}(${memberNameLocal})는 티키타카가 가장 매끄러운 단짝 조합입니다. 장난칠 때는 한없이 유쾌하고, 진지한 고민을 나눌 때는 누구보다 든든한 내 편이 되어줍니다.`,
      es: `${userInput.mbti} y ${member.mbti} tienen una química de conversación increíble, sin silencios incómodos y con mucha complicidad.`,
      pt: `${userInput.mbti} e ${member.mbti} têm uma química de conversa incrível, sem silêncios estranhos e com muita cumplicidade.`,
    });
  } else {
    mbtiDetail = pickLocalized(lang, {
      en: `${userInput.mbti} and ${member.mbti} bring refreshingly different perspectives! ${member.name} opens up a whole new world for you, while your unique reactions make ${member.name} smile non-stop.`,
      ko: `${userInput.mbti}(당신)와 ${member.mbti}(${memberNameLocal})는 서로 다른 매력을 지녀서 더욱 눈길이 가는 조합입니다. ${memberNameLocal}는 당신의 색다른 리액션에 귀엽다며 웃음을 터뜨리고, 서로에게 새로운 세상을 선물합니다.`,
      es: `${userInput.mbti} y ${member.mbti} aportan perspectivas distintas que hacen que ${member.name} no deje de sonreír a tu lado.`,
      pt: `${userInput.mbti} e ${member.mbti} trazem perspectivas diferentes que fazem ${member.name} não parar de sorrir ao seu lado.`,
    });
  }

  const dateScenario = pickLocalized(lang, {
    en: member.dateScenarioEn,
    ko: member.dateScenarioKo,
    es: member.dateScenarioEs,
    pt: member.dateScenarioPt,
  });

  return {
    member,
    group,
    userElement,
    memberElement,
    userZodiac,
    memberZodiac,
    sajuRelationType: sajuRel.type,
    mbtiCategory: mbtiRel.category,
    totalScore,
    stats: {
      sajuScore,
      mbtiScore,
      vibeScore,
      dateScore,
    },
    tierBadge,
    tierTitle,
    sajuHeadline,
    sajuDetail,
    mbtiDetail,
    dateScenario,
  };
}

export interface GroupRankingEntry {
  member: IdolMemberProfile;
  totalScore: number;
  sajuScore: number;
  mbtiScore: number;
}

/**
 * Ranks all members of a group by compatibility score with the user (highest first).
 */
export function getGroupChemistryRanking(
  userInput: UserChemistryInput,
  group: IdolGroupProfile,
  lang: Language = 'en'
): GroupRankingEntry[] {
  return group.members
    .map((m) => {
      const res = analyzeIdolChemistry(userInput, group, m, lang);
      return {
        member: m,
        totalScore: res.totalScore,
        sajuScore: res.stats.sajuScore,
        mbtiScore: res.stats.mbtiScore,
      };
    })
    .sort((a, b) => b.totalScore - a.totalScore || b.sajuScore - a.sajuScore);
}
