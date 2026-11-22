import {
  analyzeIdolChemistry,
  getSajuElementFromBirthDate,
  getZodiacFromMonthDay,
  SAJU_ELEMENTS,
  SajuElementMeta,
  ZODIAC_META,
  ZodiacMeta,
} from './chemistryEngine';
import {
  IDOL_GROUPS,
  IdolGroupProfile,
  IdolMemberProfile,
  SajuElement,
} from '../data/idolChemistry';
import {
  KOREAN_GIVEN_NAMES,
  KOREAN_SURNAMES,
  KoreanGivenName,
  KoreanSurname,
  LocalizedCopy,
  NameGender,
  NameVibe,
} from '../data/koreanNames';
import type { Language } from './translations';

export interface KoreanNameInput {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  gender: NameGender;
  vibe: NameVibe;
  realName?: string;
}

export interface KoreanNameCandidate {
  rank: 1 | 2 | 3;
  surname: KoreanSurname;
  givenName: KoreanGivenName;
  fullHangul: string;
  fullRomanized: string;
  fullHanja: string;
  phoneticGuide: string;
  sealChars: string;
  harmonyScore: number;
}

export interface MatchedIdolSummary {
  member: IdolMemberProfile;
  group: IdolGroupProfile;
  totalScore: number;
  sajuScore: number;
}

export interface KoreanNameResult {
  input: KoreanNameInput;
  coreElement: SajuElementMeta;
  luckyElement: SajuElementMeta;
  zodiac: ZodiacMeta;
  serialCode: string;
  candidates: [KoreanNameCandidate, KoreanNameCandidate, KoreanNameCandidate];
  sajuStory: LocalizedCopy;
  matchedIdol: MatchedIdolSummary;
}

const BALANCING_ELEMENT_MAP: Record<SajuElement, SajuElement> = {
  wood: 'water', // 수생목: Water nourishes Wood
  fire: 'wood', // 목생화: Wood fuels Fire
  earth: 'fire', // 화생토: Fire enriches Earth
  metal: 'earth', // 토생금: Earth yields Metal
  water: 'metal', // 금생수: Metal purifies Water
};

const ELEMENT_INITIAL_CODE: Record<SajuElement, string> = {
  wood: 'W',
  fire: 'F',
  earth: 'E',
  metal: 'M',
  water: 'A',
};

/**
 * Picks localized copy for EN / KO / ES / PT, falling back safely to EN.
 */
export function pickKoreanNameCopy(copy: LocalizedCopy, lang: Language): string {
  if (lang === 'ko') return copy.ko;
  if (lang === 'es') return copy.es;
  if (lang === 'pt') return copy.pt;
  return copy.en;
}

/**
 * Returns the Korean Saju Resource (인성 / 상생) element that nourishes and balances `core`.
 */
export function getBalancingElement(core: SajuElement): SajuElement {
  return BALANCING_ELEMENT_MAP[core];
}

function stableStringHash(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function normalizeInput(raw: KoreanNameInput): KoreanNameInput {
  return {
    birthYear: Math.max(1940, Math.min(2025, Math.round(raw.birthYear || 2002))),
    birthMonth: Math.max(1, Math.min(12, Math.round(raw.birthMonth || 5))),
    birthDay: Math.max(1, Math.min(31, Math.round(raw.birthDay || 15))),
    gender: raw.gender === 'male' || raw.gender === 'unisex' ? raw.gender : 'female',
    vibe:
      raw.vibe === 'soft' || raw.vibe === 'chic' || raw.vibe === 'classic'
        ? raw.vibe
        : 'idol',
    realName: (raw.realName || '').trim().slice(0, 24),
  };
}

function buildSajuStory(
  coreEl: SajuElementMeta,
  luckyEl: SajuElementMeta
): LocalizedCopy {
  return {
    en: `Your birth Day Master carries ${coreEl.nameEn} energy. In traditional Korean Saju naming, pairing it with ${luckyEl.nameEn} completes the nurturing cycle (상생), strengthening balance, natural charm, and good fortune.`,
    ko: `타고난 사주 일간의 핵심 기운은 [${coreEl.nameKo}]입니다. 한국 전통 성명학에서는 이 기운을 따뜻하게 생(生)해주는 [${luckyEl.nameKo}] 기운의 한자를 이름에 담아 부족한 오행을 채우고 평생의 조화와 복을 북돋아 줍니다.`,
    es: `Tu fecha de nacimiento lleva energía de ${coreEl.nameEs}. En la tradición coreana del Saju, combinarla con ${luckyEl.nameEs} activa el ciclo de nutrición (상생), equilibrando tu aura y atrayendo buena fortuna.`,
    pt: `Sua data de nascimento traz energia de ${coreEl.namePt}. Na tradição coreana do Saju, combiná-la com ${luckyEl.namePt} ativa o ciclo de nutrição (상생), equilibrando sua aura e atraindo boa sorte.`,
  };
}

function pickBestMatchedIdol(
  input: KoreanNameInput,
  luckyElement: SajuElement,
  lang: Language
): MatchedIdolSummary {
  let best: MatchedIdolSummary | null = null;

  for (const group of IDOL_GROUPS) {
    for (const member of group.members) {
      const analysis = analyzeIdolChemistry(
        {
          nickname: input.realName,
          birthYear: input.birthYear,
          birthMonth: input.birthMonth,
          birthDay: input.birthDay,
          mbti: 'UNKNOWN',
        },
        group,
        member,
        lang
      );

      const elementBonus = member.sajuElement === luckyElement ? 0.5 : 0;
      const bestElementBonus =
        best && best.member.sajuElement === luckyElement ? 0.5 : 0;

      if (
        !best ||
        analysis.totalScore + elementBonus > best.totalScore + bestElementBonus ||
        (analysis.totalScore + elementBonus === best.totalScore + bestElementBonus &&
          analysis.stats.sajuScore > best.sajuScore)
      ) {
        best = {
          member,
          group,
          totalScore: analysis.totalScore,
          sajuScore: analysis.stats.sajuScore,
        };
      }
    }
  }

  return best!;
}

/**
 * Deterministically generates Top 3 authentic Korean names balanced to the user's K-Saju Five Elements,
 * plus Saju balancing story and #1 compatible K-Pop idol match.
 */
export function generateKoreanName(
  rawInput: KoreanNameInput,
  lang: Language = 'en'
): KoreanNameResult {
  const input = normalizeInput(rawInput);
  const coreKey = getSajuElementFromBirthDate(
    input.birthYear,
    input.birthMonth,
    input.birthDay
  );
  const luckyKey = getBalancingElement(coreKey);

  const coreElement = SAJU_ELEMENTS[coreKey];
  const luckyElement = SAJU_ELEMENTS[luckyKey];
  const zodiac = ZODIAC_META[getZodiacFromMonthDay(input.birthMonth, input.birthDay)];

  const cleanRealName = (input.realName || '').toLowerCase();
  const baseSeed = stableStringHash(
    `${input.birthYear}-${input.birthMonth}-${input.birthDay}-${input.gender}-${input.vibe}-${cleanRealName}`
  );

  // Rank given names
  const rankedGivenNames = [...KOREAN_GIVEN_NAMES]
    .map((name) => {
      let score = 0;

      // Gender affinity
      if (input.gender === 'unisex') {
        score += name.gender === 'unisex' ? 75 : 20;
      } else if (name.gender === input.gender) {
        score += 75;
      } else if (name.gender === 'unisex') {
        score += 55;
      } else {
        score -= 120;
      }

      // Saju balancing affinity
      if (name.element === luckyKey) {
        score += 48;
      } else if (name.element === coreKey) {
        score += 26;
      } else {
        score += 8;
      }

      // Vibe affinity
      if (name.vibes.includes(input.vibe)) {
        score += 32;
      }

      // Phonetic resonance if user entered their real name
      if (cleanRealName.length > 0) {
        const firstChar = cleanRealName[0];
        if (name.romanized.toLowerCase().startsWith(firstChar)) {
          score += 9;
        }
      }

      // Deterministic personal tie-breaker (0..13)
      const jitter = stableStringHash(`${baseSeed}:${name.id}`) % 14;
      score += jitter;

      return { name, score };
    })
    .sort((a, b) => b.score - a.score || a.name.id.localeCompare(b.name.id));

  // Rank surnames so Top 3 names each receive a complementary, distinct surname
  const rankedSurnames = [...KOREAN_SURNAMES]
    .map((surname) => {
      let score = 0;
      if (surname.element === luckyKey) {
        score += 36;
      } else if (surname.element === coreKey) {
        score += 22;
      } else {
        score += 8;
      }

      if (cleanRealName.length > 0 && surname.romanized.toLowerCase()[0] === cleanRealName[0]) {
        score += 7;
      }

      const jitter = stableStringHash(`${baseSeed}:sur:${surname.id}`) % 15;
      return { surname, score: score + jitter };
    })
    .sort((a, b) => b.score - a.score || a.surname.id.localeCompare(b.surname.id));

  const topThreeGiven = rankedGivenNames.slice(0, 3);
  const topThreeSurnames = [
    rankedSurnames[0].surname,
    rankedSurnames[1].surname,
    rankedSurnames[2].surname,
  ];

  const candidates = topThreeGiven.map((entry, idx) => {
    const rank = (idx + 1) as 1 | 2 | 3;
    const surname = topThreeSurnames[idx];
    const givenName = entry.name;
    const fullHangul = `${surname.hangul}${givenName.hangul}`;
    const fullRomanized = `${surname.romanized} ${givenName.romanized}`;
    const fullHanja = `${surname.hanja}${givenName.hanja}`;
    const phoneticGuide = `${surname.phonetic} ${givenName.phonetic}`;
    // Traditional 4-character square seal reads: Surname + Given1 + Given2 + 印 (Seal)
    const sealChars = `${surname.hanja}${givenName.hanja}印`;
    const harmonyBase = 98 - idx * 2 - (baseSeed % 2);
    const harmonyScore = Math.max(91, Math.min(99, harmonyBase));

    return {
      rank,
      surname,
      givenName,
      fullHangul,
      fullRomanized,
      fullHanja,
      phoneticGuide,
      sealChars,
      harmonyScore,
    };
  }) as [KoreanNameCandidate, KoreanNameCandidate, KoreanNameCandidate];

  const mm = String(input.birthMonth).padStart(2, '0');
  const dd = String(input.birthDay).padStart(2, '0');
  const serialCode = `KP-${input.birthYear}-${mm}${dd}-${ELEMENT_INITIAL_CODE[luckyKey]}`;

  return {
    input,
    coreElement,
    luckyElement,
    zodiac,
    serialCode,
    candidates,
    sajuStory: buildSajuStory(coreElement, luckyElement),
    matchedIdol: pickBestMatchedIdol(input, luckyKey, lang),
  };
}

/**
 * Serializes user inputs and selected rank into URL query params for sharing.
 */
export function buildKoreanNameShareQuery(
  input: KoreanNameInput,
  pickIndex = 0
): string {
  const params = new URLSearchParams({
    y: String(input.birthYear),
    mo: String(input.birthMonth),
    d: String(input.birthDay),
    g: input.gender,
    v: input.vibe,
  });
  if (input.realName?.trim()) {
    params.set('n', input.realName.trim().slice(0, 24));
  }
  if (pickIndex > 0 && pickIndex <= 2) {
    params.set('pick', String(pickIndex));
  }
  return params.toString();
}

/**
 * Parses URLSearchParams into validated Korean name inputs and auto-generate flag.
 */
export function parseKoreanNameQuery(params: URLSearchParams): {
  input: Partial<KoreanNameInput>;
  pickIndex: number;
  autoGenerate: boolean;
} {
  const input: Partial<KoreanNameInput> = {};

  const y = Number(params.get('y'));
  if (params.has('y') && !Number.isNaN(y)) {
    input.birthYear = Math.max(1940, Math.min(2025, Math.round(y)));
  }

  const mo = Number(params.get('mo'));
  const hasMonth = params.has('mo') && !Number.isNaN(mo) && mo >= 1 && mo <= 12;
  if (hasMonth) {
    input.birthMonth = Math.round(mo);
  }

  const d = Number(params.get('d'));
  const hasDay = params.has('d') && !Number.isNaN(d) && d >= 1 && d <= 31;
  if (hasDay) {
    input.birthDay = Math.round(d);
  }

  const g = params.get('g');
  if (g === 'female' || g === 'male' || g === 'unisex') {
    input.gender = g;
  }

  const v = params.get('v');
  if (v === 'idol' || v === 'soft' || v === 'chic' || v === 'classic') {
    input.vibe = v;
  }

  const n = params.get('n');
  if (n && n.trim().length > 0) {
    input.realName = n.trim().slice(0, 24);
  }

  const pickRaw = Number(params.get('pick'));
  const pickIndex =
    !Number.isNaN(pickRaw) && pickRaw >= 0 && pickRaw <= 2 ? Math.round(pickRaw) : 0;

  return {
    input,
    pickIndex,
    autoGenerate: hasMonth && hasDay,
  };
}
