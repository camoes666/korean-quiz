const fs = require('fs');
const path = require('path');
let sharp;
try {
  sharp = require('sharp');
} catch {
  sharp = require('C:\\Users\\USER\\code\\quiz_site\\node_modules\\sharp');
}

const QUIZZES_DIR = path.join(__dirname, '..', 'src', 'data', 'quizzes');
const BASE_OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'pinterest');
const MAIN_OUT_DIR = path.join(BASE_OUT_DIR, 'main');
const ES_OUT_DIR = path.join(BASE_OUT_DIR, 'es');
const CARDS_OUT_DIR = path.join(BASE_OUT_DIR, 'cards');
const QUESTIONS_OUT_DIR = path.join(BASE_OUT_DIR, 'questions');

[BASE_OUT_DIR, MAIN_OUT_DIR, ES_OUT_DIR, CARDS_OUT_DIR, QUESTIONS_OUT_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const MASCOTS = {
  blackpink: path.join(__dirname, '..', 'public', 'images', 'mascot', 'bomi-blackpink-v2.png'),
  bts: path.join(__dirname, '..', 'public', 'images', 'mascot', 'hobi-bts-v2.png'),
  skz: path.join(__dirname, '..', 'public', 'images', 'mascot', 'hobi-skz-v2.png'),
  default: path.join(__dirname, '..', 'public', 'images', 'hobi01.png'),
  spicy: path.join(__dirname, '..', 'public', 'images', 'hobi04.png'),
  legend: path.join(__dirname, '..', 'public', 'images', 'hobi05.png'),
};

const THEME_PALETTES = {
  blackpink: {
    bgStart: '#090106',
    bgMid: '#2a061a',
    bgEnd: '#db2777',
    accent: '#f43f5e',
    accentLight: '#f472b6',
    pillBg: '#f43f5e',
    ctaText: '#db2777',
    board: 'BLACKPINK Personality Tests & BLINK Quizzes 🖤💖',
  },
  bts: {
    bgStart: '#060111',
    bgMid: '#1e0b3d',
    bgEnd: '#7c3aed',
    accent: '#9333ea',
    accentLight: '#c084fc',
    pillBg: '#9333ea',
    ctaText: '#6d28d9',
    board: 'BTS Quizzes, Soulmate Tests & ARMY Trivia 💜🐨',
  },
  skz: {
    bgStart: '#0f0728',
    bgMid: '#2e1065',
    bgEnd: '#be123c',
    accent: '#e11d48',
    accentLight: '#fb7185',
    pillBg: '#e11d48',
    ctaText: '#be123c',
    board: 'Stray Kids Quizzes & SKZOO Personality Tests 🐺✨',
  },
  food: {
    bgStart: '#1a0404',
    bgMid: '#7c2d12',
    bgEnd: '#ea580c',
    accent: '#dc2626',
    accentLight: '#fb923c',
    pillBg: '#ea580c',
    ctaText: '#c2410c',
    board: 'Korean Food Quizzes, Spicy Ramen & Soul Food Tests 🍜🌶️',
  },
  drama: {
    bgStart: '#022c22',
    bgMid: '#064e3b',
    bgEnd: '#0f766e',
    accent: '#0d9488',
    accentLight: '#2dd4bf',
    pillBg: '#0d9488',
    ctaText: '#0f766e',
    board: 'K-Drama Quizzes, Tropes & Korean Culture Aesthetics 🎬☔',
  },
  culture: {
    bgStart: '#020617',
    bgMid: '#1e1b4b',
    bgEnd: '#4338ca',
    accent: '#4f46e5',
    accentLight: '#818cf8',
    pillBg: '#4f46e5',
    ctaText: '#3730a3',
    board: 'K-Drama Quizzes, Tropes & Korean Culture Aesthetics 🎬☔',
  },
  kpop: {
    bgStart: '#09090b',
    bgMid: '#3b0764',
    bgEnd: '#a21caf',
    accent: '#c026d3',
    accentLight: '#e879f9',
    pillBg: '#c026d3',
    ctaText: '#86198f',
    board: 'K-Pop Quizzes, Personality Tests & Stan Challenges 🎤✨',
  },
};

function stripEmojis(str) {
  return String(str || '')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxCharsPerLine, maxLines = 2) {
  const words = stripEmojis(text).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const lines = [];
  let current = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharsPerLine || !current) {
      current = candidate;
    } else {
      if (lines.length === maxLines - 1) {
        // Last allowed line: pack remaining words and truncate if needed
        const rest = [current, ...words.slice(i)].join(' ');
        lines.push(rest.length > maxCharsPerLine + 3 ? rest.slice(0, maxCharsPerLine).trim() + '...' : rest);
        return lines;
      }
      lines.push(current);
      current = word;
    }
  }
  if (current) {
    lines.push(current);
  }
  return lines.slice(0, maxLines);
}

function getQuizPaletteKey(slug) {
  if (slug.includes('blackpink')) return 'blackpink';
  if (slug.includes('bts')) return 'bts';
  if (slug.includes('stray-kids')) return 'skz';
  if (slug.includes('food')) return 'food';
  if (slug.includes('drama')) return 'drama';
  if (slug.includes('culture')) return 'culture';
  return 'kpop';
}

function getMascotPath(slug) {
  if (slug.includes('blackpink') && fs.existsSync(MASCOTS.blackpink)) return MASCOTS.blackpink;
  if (slug.includes('bts') && fs.existsSync(MASCOTS.bts)) return MASCOTS.bts;
  if (slug.includes('stray-kids') && fs.existsSync(MASCOTS.skz)) return MASCOTS.skz;
  if (slug.includes('spicy') && fs.existsSync(MASCOTS.spicy)) return MASCOTS.spicy;
  if (fs.existsSync(MASCOTS.legend)) return MASCOTS.legend;
  return MASCOTS.default;
}

const resizedMascotCache = new Map();
async function getResizedMascotBuffer(mascotPath, width) {
  const key = `${mascotPath}:${width}`;
  if (resizedMascotCache.has(key)) return resizedMascotCache.get(key);
  const buf = await sharp(mascotPath).resize(width, width, { fit: 'inside' }).toBuffer();
  resizedMascotCache.set(key, buf);
  return buf;
}

/**
 * 1. Generate Main Quiz Pin (1000x1500) in EN or ES
 */
async function generateMainQuizPin(quiz, lang = 'en') {
  const paletteKey = getQuizPaletteKey(quiz.slug);
  const pal = THEME_PALETTES[paletteKey];
  const mascotPath = getMascotPath(quiz.slug);
  const mascotBuf = await getResizedMascotBuffer(mascotPath, 420);

  const isPersonality = quiz.quizType === 'personality';
  const rawTitle = lang === 'es' ? (quiz.titleEs || quiz.title) : quiz.title;
  const cleanTitle = stripEmojis(rawTitle.replace(/\s*\(.*?\)\s*/g, ''));
  const titleLines = wrapText(cleanTitle, 24, 2);
  const longestTitleLine = Math.max(...titleLines.map((l) => l.length), 1);
  const titleFontSize = longestTitleLine > 22 ? 52 : longestTitleLine > 18 ? 58 : 66;

  const rawSub = lang === 'es' ? (quiz.subtitleEs || quiz.subtitle) : quiz.subtitle;
  const subLines = wrapText(rawSub, 48, 2);

  const topPillText = isPersonality
    ? lang === 'es'
      ? '✦ TEST DE ALMA GEMELA · 10 PREGUNTAS ✦'
      : '✦ 10-QUESTION SOULMATE TEST ✦'
    : lang === 'es'
    ? `✦ RETO DE ${quiz.questions?.length || 20} PREGUNTAS ✦`
    : `✦ ${quiz.questions?.length || 20}-QUESTION SPEED TRIVIA ✦`;

  let teaserHeader = '';
  let teaserLine1 = '';
  let teaserLine2 = '';

  if (isPersonality) {
    const members = Object.values(quiz.personalityResults || {});
    const memberRoll = members
      .slice(0, 8)
      .map((m) => stripEmojis(m.name.replace(/\s*\(.*?\)\s*/g, '')).trim())
      .join(' · ');
    const firstQ = (quiz.personalityQuestions || [])[0];
    const qText = firstQ ? (lang === 'es' ? firstQ.questionEs || firstQ.question : firstQ.question) : '';
    teaserHeader = memberRoll.length > 62 ? memberRoll.slice(0, 60) + '...' : memberRoll;
    const qWrapped = wrapText(`"${qText}"`, 48, 2);
    teaserLine1 = qWrapped[0] || '';
    teaserLine2 = qWrapped[1] || '';
  } else {
    const sampleQ = (quiz.questions || []).find((q) => q.level === 2) || (quiz.questions || [])[0];
    const qText = sampleQ ? (lang === 'es' ? sampleQ.questionEs || sampleQ.question : sampleQ.question) : '';
    const qWrapped = wrapText(`Q: "${qText}"`, 48, 2);
    teaserHeader = lang === 'es' ? '✦ ¿PUEDES RESPONDER EN 15 SEGUNDOS?' : '✦ CAN YOU ANSWER UNDER 15 SECONDS?';
    teaserLine1 = qWrapped[0] || '';
    teaserLine2 = qWrapped[1] || '';
  }

  const ctaLabel = lang === 'es' ? 'JUGAR GRATIS AHORA ➔' : 'TAP TO PLAY FREE ➔';

  const svg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${pal.bgStart}"/>
        <stop offset="45%" stop-color="${pal.bgMid}"/>
        <stop offset="100%" stop-color="${pal.bgEnd}"/>
      </linearGradient>
      <radialGradient id="topGlow" cx="50%" cy="22%" r="45%">
        <stop offset="0%" stop-color="${pal.accent}" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="${pal.accent}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="bottomGlow" cx="50%" cy="76%" r="50%">
        <stop offset="0%" stop-color="${pal.accentLight}" stop-opacity="0.38"/>
        <stop offset="100%" stop-color="${pal.accentLight}" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="1000" height="1500" fill="url(#bgGrad)"/>
    <rect width="1000" height="1500" fill="url(#topGlow)"/>
    <rect width="1000" height="1500" fill="url(#bottomGlow)"/>

    <rect x="30" y="30" width="940" height="1440" rx="40" fill="none" stroke="rgba(255, 255, 255, 0.22)" stroke-width="3"/>

    <!-- Top Pill -->
    <g transform="translate(500, 115)">
      <rect x="-360" y="-30" width="720" height="60" rx="30" fill="${pal.pillBg}"/>
      <text x="0" y="8" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="21" font-weight="900" letter-spacing="2" text-anchor="middle">
        ${escapeXml(topPillText)}
      </text>
    </g>

    <!-- Main Title (2 Lines) -->
    <text x="500" y="250" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="${titleFontSize}" font-weight="900" text-anchor="middle" letter-spacing="-0.5">
      ${escapeXml(titleLines[0] || '')}
    </text>
    ${
      titleLines[1]
        ? `<text x="500" y="328" fill="${pal.accentLight}" font-family="'Helvetica Neue', Arial, sans-serif" font-size="${titleFontSize}" font-weight="900" text-anchor="middle" letter-spacing="-0.5">
            ${escapeXml(titleLines[1])}
          </text>`
        : ''
    }

    <!-- Subtitle -->
    <g transform="translate(500, ${titleLines[1] ? 395 : 340})">
      <text x="0" y="0" fill="rgba(255, 255, 255, 0.88)" font-family="'Helvetica Neue', Arial, sans-serif" font-size="25" font-weight="600" text-anchor="middle">
        ${escapeXml(subLines[0] || '')}
      </text>
      ${
        subLines[1]
          ? `<text x="0" y="35" fill="rgba(255, 255, 255, 0.75)" font-family="'Helvetica Neue', Arial, sans-serif" font-size="23" font-weight="500" text-anchor="middle">
              ${escapeXml(subLines[1])}
            </text>`
          : ''
      }
    </g>

    <!-- Teaser Card -->
    <g transform="translate(500, 1020)">
      <rect x="-415" y="0" width="830" height="175" rx="28" fill="rgba(255, 255, 255, 0.11)" stroke="rgba(255, 255, 255, 0.28)" stroke-width="2"/>
      <text x="0" y="48" fill="#fef08a" font-family="'Helvetica Neue', Arial, sans-serif" font-size="21" font-weight="800" text-anchor="middle">
        ${escapeXml(teaserHeader)}
      </text>
      <text x="0" y="96" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="23" font-weight="700" text-anchor="middle">
        ${escapeXml(teaserLine1)}
      </text>
      ${
        teaserLine2
          ? `<text x="0" y="134" fill="rgba(255, 255, 255, 0.9)" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="600" text-anchor="middle">
              ${escapeXml(teaserLine2)}
            </text>`
          : ''
      }
    </g>

    <!-- Bottom CTA Button -->
    <g transform="translate(500, 1300)">
      <rect x="-340" y="-46" width="680" height="92" rx="46" fill="#ffffff"/>
      <text x="0" y="11" fill="${pal.ctaText}" font-family="'Helvetica Neue', Arial, sans-serif" font-size="31" font-weight="900" text-anchor="middle" letter-spacing="1">
        ${escapeXml(ctaLabel)}
      </text>
    </g>

    <text x="500" y="1410" fill="rgba(255, 255, 255, 0.7)" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="700" text-anchor="middle" letter-spacing="2.5">
      KPULSEQUIZ.COM
    </text>
  </svg>
  `;

  const fileName = lang === 'es' ? `pin-${quiz.slug}-es.png` : `pin-${quiz.slug}.png`;
  const targetDir = lang === 'es' ? ES_OUT_DIR : MAIN_OUT_DIR;
  const outPath = path.join(targetDir, fileName);

  await sharp(Buffer.from(svg))
    .composite([{ input: mascotBuf, top: 500, left: 290 }])
    .png({ quality: 90 })
    .toFile(outPath);

  if (lang === 'en' && (quiz.slug === 'which-blackpink-member-are-you' || quiz.slug === 'which-bts-member-are-you')) {
    fs.copyFileSync(outPath, path.join(BASE_OUT_DIR, fileName));
  }

  const destUrl =
    lang === 'es'
      ? `https://kpulsequiz.com/quiz/${quiz.slug}?lang=es`
      : `https://kpulsequiz.com/quiz/${quiz.slug}`;

  const pinTitle =
    lang === 'es'
      ? `${quiz.titleEs || quiz.title} ✨ Test Interactivo Gratis | K-Pulse`
      : `${quiz.title} ✨ Free Interactive K-Pop & K-Culture Quiz | K-Pulse`;

  const pinDesc =
    lang === 'es'
      ? `${quiz.descriptionEs || quiz.description} ¡Juega gratis en español sin registro en K-Pulse!`
      : `${quiz.description} Play 100% free at K-Pulse and share your result card with friends!`;

  return {
    category: lang === 'es' ? 'Main Quiz Pin (ES)' : 'Main Quiz Pin (EN)',
    file: `public/images/pinterest/${lang === 'es' ? 'es' : 'main'}/${fileName}`,
    board: pal.board,
    title: pinTitle.slice(0, 100),
    description: pinDesc.slice(0, 500),
    link: destUrl,
  };
}

/**
 * 2. Generate Collectible Member Soulmate Archetype Cards (1000x1500)
 */
async function generatePersonalityMemberCard(quiz, result) {
  const paletteKey = getQuizPaletteKey(quiz.slug);
  const pal = THEME_PALETTES[paletteKey];
  const mascotPath = getMascotPath(quiz.slug);
  const mascotBuf = await getResizedMascotBuffer(mascotPath, 310);

  const memberName = stripEmojis(result.name);
  const nameFontSize = memberName.length > 22 ? 52 : memberName.length > 16 ? 60 : 66;
  const archetypeLines = wrapText(result.title || '', 34, 2);
  const subLines = wrapText(`"${result.subtitle || ''}"`, 50, 2);
  const traits = (result.traits || []).slice(0, 3);
  const cleanSkzoo = stripEmojis(result.skzoo || '');
  const skzooBadge = cleanSkzoo ? `✦ ${cleanSkzoo} ✦` : `✦ ${quiz.tag.toUpperCase()} SOULMATE ✦`;
  const bestMatch = stripEmojis(result.bestMatchName || '');

  const svg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${pal.bgStart}"/>
        <stop offset="45%" stop-color="${pal.bgMid}"/>
        <stop offset="100%" stop-color="${pal.bgEnd}"/>
      </linearGradient>
      <radialGradient id="cardGlow" cx="50%" cy="32%" r="48%">
        <stop offset="0%" stop-color="${result.colorHex || pal.accent}" stop-opacity="0.48"/>
        <stop offset="100%" stop-color="${result.colorHex || pal.accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="1000" height="1500" fill="url(#cardGrad)"/>
    <rect width="1000" height="1500" fill="url(#cardGlow)"/>

    <!-- Collectible Outer Frame -->
    <rect x="44" y="44" width="912" height="1412" rx="48" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.28)" stroke-width="3"/>

    <!-- Top Header Pill -->
    <g transform="translate(500, 118)">
      <rect x="-370" y="-28" width="740" height="56" rx="28" fill="${pal.pillBg}"/>
      <text x="0" y="8" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="900" letter-spacing="2" text-anchor="middle">
        ${escapeXml(`✦ ${quiz.tag.toUpperCase()} SOULMATE ARCHETYPE CARD ✦`)}
      </text>
    </g>

    <!-- SKZOO / BT21 Sub-badge -->
    <text x="500" y="205" fill="#fef08a" font-family="'Helvetica Neue', Arial, sans-serif" font-size="25" font-weight="800" text-anchor="middle" letter-spacing="1">
      ${escapeXml(skzooBadge)}
    </text>

    <!-- Giant Member Name -->
    <text x="500" y="290" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="${nameFontSize}" font-weight="900" text-anchor="middle" letter-spacing="-0.5">
      ${escapeXml(memberName)}
    </text>

    <!-- Archetype Title -->
    <text x="500" y="705" fill="${pal.accentLight}" font-family="'Helvetica Neue', Arial, sans-serif" font-size="36" font-weight="900" text-anchor="middle">
      ${escapeXml(archetypeLines[0] || '')}
    </text>
    ${
      archetypeLines[1]
        ? `<text x="500" y="750" fill="${pal.accentLight}" font-family="'Helvetica Neue', Arial, sans-serif" font-size="36" font-weight="900" text-anchor="middle">
            ${escapeXml(archetypeLines[1])}
          </text>`
        : ''
    }

    <!-- Subtitle Quote (Up to 2 lines) -->
    <text x="500" y="${archetypeLines[1] ? 802 : 768}" fill="rgba(255, 255, 255, 0.85)" font-family="'Helvetica Neue', Arial, sans-serif" font-size="23" font-style="italic" font-weight="600" text-anchor="middle">
      ${escapeXml(subLines[0] || '')}
    </text>
    ${
      subLines[1]
        ? `<text x="500" y="${archetypeLines[1] ? 834 : 800}" fill="rgba(255, 255, 255, 0.85)" font-family="'Helvetica Neue', Arial, sans-serif" font-size="23" font-style="italic" font-weight="600" text-anchor="middle">
            ${escapeXml(subLines[1])}
          </text>`
        : ''
    }

    <!-- 3 Trait Pills -->
    ${traits
      .map((trait, idx) => {
        const yPos = 895 + idx * 68;
        return `
        <g transform="translate(500, ${yPos})">
          <rect x="-360" y="-26" width="720" height="52" rx="26" fill="rgba(255, 255, 255, 0.12)" stroke="rgba(255, 255, 255, 0.28)" stroke-width="1.5"/>
          <text x="0" y="8" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="23" font-weight="800" text-anchor="middle">
            ✦  #${escapeXml(stripEmojis(trait))}
          </text>
        </g>`;
      })
      .join('')}

    <!-- Best Chemistry Match Box -->
    <g transform="translate(500, 1145)">
      <rect x="-390" y="-42" width="780" height="84" rx="24" fill="rgba(0, 0, 0, 0.35)" stroke="${pal.accentLight}" stroke-width="2"/>
      <text x="0" y="9" fill="#fef08a" font-family="'Helvetica Neue', Arial, sans-serif" font-size="26" font-weight="900" text-anchor="middle">
        ★ #1 Best Chemistry Match: ${escapeXml(bestMatch)}
      </text>
    </g>

    <!-- Bottom CTA Button -->
    <g transform="translate(500, 1300)">
      <rect x="-380" y="-44" width="760" height="88" rx="44" fill="#ffffff"/>
      <text x="0" y="10" fill="${pal.ctaText}" font-family="'Helvetica Neue', Arial, sans-serif" font-size="27" font-weight="900" text-anchor="middle" letter-spacing="0.8">
        WHICH MEMBER ARE YOU? PLAY FREE ➔
      </text>
    </g>

    <text x="500" y="1405" fill="rgba(255, 255, 255, 0.72)" font-family="'Helvetica Neue', Arial, sans-serif" font-size="21" font-weight="700" text-anchor="middle" letter-spacing="2.5">
      KPULSEQUIZ.COM
    </text>
  </svg>
  `;

  const fileName = `card-${quiz.slug}-${result.id}.png`;
  const outPath = path.join(CARDS_OUT_DIR, fileName);

  await sharp(Buffer.from(svg))
    .composite([{ input: mascotBuf, top: 335, left: 345 }])
    .png({ quality: 90 })
    .toFile(outPath);

  const pinTitle = `${quiz.tag} Soulmate Result: ${result.name} ${result.emoji || '✨'} | ${quiz.title}`;
  const pinDesc = `Got ${result.name} ("${result.title}") on the ${quiz.title}! Traits: ${traits.join(', ')}. Best chemistry match: ${result.bestMatchName}! Which ${quiz.tag} member matches your personality? Take the free 10-question test at K-Pulse!`;

  return {
    category: 'Soulmate Collectible Card',
    file: `public/images/pinterest/cards/${fileName}`,
    board: pal.board,
    title: pinTitle.slice(0, 100),
    description: pinDesc.slice(0, 500),
    link: `https://kpulsequiz.com/quiz/${quiz.slug}`,
  };
}

/**
 * 3. Generate Trivia "1 Killer Question" Visual Pin (1000x1500)
 */
async function generateTriviaQuestionPin(quiz) {
  const paletteKey = getQuizPaletteKey(quiz.slug);
  const pal = THEME_PALETTES[paletteKey];
  const mascotPath = getMascotPath(quiz.slug);
  const mascotBuf = await getResizedMascotBuffer(mascotPath, 240);

  const candidates = (quiz.questions || []).filter(
    (q) => (q.level === 2 || q.level === 3) && q.question.length <= 95
  );
  const sampleQ = candidates[0] || (quiz.questions || [])[0];
  if (!sampleQ) return null;

  const qLines = wrapText(sampleQ.question, 34, 3);
  const options = (sampleQ.options || []).slice(0, 4);

  const svg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="qGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${pal.bgStart}"/>
        <stop offset="50%" stop-color="${pal.bgMid}"/>
        <stop offset="100%" stop-color="${pal.bgEnd}"/>
      </linearGradient>
    </defs>

    <rect width="1000" height="1500" fill="url(#qGrad)"/>
    <rect x="34" y="34" width="932" height="1432" rx="42" fill="none" stroke="rgba(255, 255, 255, 0.22)" stroke-width="3"/>

    <!-- Top Challenge Pill -->
    <g transform="translate(500, 110)">
      <rect x="-390" y="-28" width="780" height="56" rx="28" fill="${pal.pillBg}"/>
      <text x="0" y="8" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="900" letter-spacing="2" text-anchor="middle">
        ✦ 15-SECOND CHALLENGE · ONLY 5% GET THIS RIGHT! ✦
      </text>
    </g>

    <!-- Quiz Header -->
    <text x="500" y="195" fill="#fef08a" font-family="'Helvetica Neue', Arial, sans-serif" font-size="27" font-weight="800" text-anchor="middle">
      ${escapeXml(stripEmojis(quiz.title.replace(/\s*\(.*?\)\s*/g, '')))}
    </text>

    <!-- Question Box -->
    <g transform="translate(500, 490)">
      <rect x="-410" y="0" width="820" height="230" rx="32" fill="rgba(255, 255, 255, 0.12)" stroke="rgba(255, 255, 255, 0.3)" stroke-width="2.5"/>
      <text x="0" y="68" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="33" font-weight="900" text-anchor="middle">
        ${escapeXml(qLines[0] || '')}
      </text>
      ${
        qLines[1]
          ? `<text x="0" y="122" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="33" font-weight="900" text-anchor="middle">
              ${escapeXml(qLines[1])}
            </text>`
          : ''
      }
      ${
        qLines[2]
          ? `<text x="0" y="176" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="33" font-weight="900" text-anchor="middle">
              ${escapeXml(qLines[2])}
            </text>`
          : ''
      }
    </g>

    <!-- 4 Options (A, B, C, D) -->
    ${options
      .map((opt, idx) => {
        const yPos = 785 + idx * 102;
        const cleanOpt = stripEmojis(opt.text);
        const optText = cleanOpt.length > 42 ? cleanOpt.slice(0, 40) + '...' : cleanOpt;
        return `
        <g transform="translate(500, ${yPos})">
          <rect x="-390" y="-36" width="780" height="76" rx="24" fill="rgba(15, 23, 42, 0.55)" stroke="rgba(255, 255, 255, 0.32)" stroke-width="2"/>
          <circle cx="-335" cy="2" r="22" fill="${pal.pillBg}"/>
          <text x="-335" y="10" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="900" text-anchor="middle">
            ${escapeXml(opt.id)}
          </text>
          <text x="-285" y="11" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="26" font-weight="700" text-anchor="start">
            ${escapeXml(optText)}
          </text>
        </g>`;
      })
      .join('')}

    <!-- Bottom CTA Button -->
    <g transform="translate(500, 1300)">
      <rect x="-370" y="-44" width="740" height="88" rx="44" fill="#ffffff"/>
      <text x="0" y="10" fill="${pal.ctaText}" font-family="'Helvetica Neue', Arial, sans-serif" font-size="28" font-weight="900" text-anchor="middle" letter-spacing="0.8">
        CHECK ANSWER &amp; PLAY FULL QUIZ ➔
      </text>
    </g>

    <text x="500" y="1405" fill="rgba(255, 255, 255, 0.72)" font-family="'Helvetica Neue', Arial, sans-serif" font-size="21" font-weight="700" text-anchor="middle" letter-spacing="2.5">
      KPULSEQUIZ.COM
    </text>
  </svg>
  `;

  const fileName = `q-${quiz.slug}.png`;
  const outPath = path.join(QUESTIONS_OUT_DIR, fileName);

  await sharp(Buffer.from(svg))
    .composite([{ input: mascotBuf, top: 225, left: 380 }])
    .png({ quality: 90 })
    .toFile(outPath);

  const pinTitle = `Can You Answer This ${quiz.tag || 'K-Pop'} Question Under 15s? ⚡ | ${quiz.title}`;
  const pinDesc = `"${sampleQ.question}" — Think you know the right answer without Googling? Test your score and check the full explanation at K-Pulse!`;

  return {
    category: 'Killer Question Pin',
    file: `public/images/pinterest/questions/${fileName}`,
    board: pal.board,
    title: pinTitle.slice(0, 100),
    description: pinDesc.slice(0, 500),
    link: `https://kpulsequiz.com/quiz/${quiz.slug}`,
  };
}

function toCsvField(val) {
  const s = String(val ?? '').replace(/"/g, '""');
  return `"${s}"`;
}

async function main() {
  const files = fs.readdirSync(QUIZZES_DIR).filter((f) => f.endsWith('.json'));
  const manifest = [];

  for (const file of files) {
    const quiz = JSON.parse(fs.readFileSync(path.join(QUIZZES_DIR, file), 'utf-8'));

    // 1. Main Pin (EN)
    const enMain = await generateMainQuizPin(quiz, 'en');
    manifest.push(enMain);

    // 2. Main Pin (ES)
    const esMain = await generateMainQuizPin(quiz, 'es');
    manifest.push(esMain);

    // 3. Personality Collectible Member Cards OR Trivia Killer Question Pin
    if (quiz.quizType === 'personality' && quiz.personalityResults) {
      for (const result of Object.values(quiz.personalityResults)) {
        const cardPin = await generatePersonalityMemberCard(quiz, result);
        manifest.push(cardPin);
      }
    } else if (quiz.questions && quiz.questions.length > 0) {
      const qPin = await generateTriviaQuestionPin(quiz);
      if (qPin) manifest.push(qPin);
    }
  }

  // Write CSV manifest for easy reference / bulk tools
  const csvHeader = ['Category', 'Image File', 'Target Board', 'Pin Title', 'Pin Description', 'Destination URL'].join(',');
  const csvRows = manifest.map((item) =>
    [item.category, item.file, item.board, item.title, item.description, item.link].map(toCsvField).join(',')
  );
  fs.writeFileSync(path.join(BASE_OUT_DIR, 'pinterest-pins-manifest.csv'), [csvHeader, ...csvRows].join('\n'), 'utf-8');

  // Write Markdown Catalog for human copy-paste
  const mdLines = [
    '# 🎨 자동 생성된 핀터레스트 핀 이미지 & 업로드 매칭표',
    '',
    `> 총 **${manifest.length}장**의 핀터레스트 최적화 세로형 이미지(\`1000×1500px\`)가 자동 생성되었습니다.`,
    '> 아래 표에서 이미지 파일 경로와 매칭되는 **보드 이름, 핀 제목, 설명, 랜딩 링크**를 그대로 복사해 업로드하세요.',
    '',
    '| 분류 | 이미지 파일 경로 | 추천 보드 | 핀 제목 (Title) | 랜딩 URL |',
    '|---|---|---|---|---|',
    ...manifest.map(
      (m) => `| ${m.category} | \`${m.file}\` | ${m.board} | ${m.title} | \`${m.link}\` |`
    ),
    '',
  ];
  fs.writeFileSync(path.join(BASE_OUT_DIR, 'PINS_INDEX.md'), mdLines.join('\n'), 'utf-8');

  console.log(`✅ Successfully generated ${manifest.length} Pinterest pins and manifest files in public/images/pinterest/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
