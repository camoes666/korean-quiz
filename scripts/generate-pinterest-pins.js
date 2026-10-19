const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'pinterest');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const BOMI_PATH = path.join(__dirname, '..', 'public', 'images', 'mascot', 'bomi-blackpink-v2.png');
const HOBI_BTS_PATH = path.join(__dirname, '..', 'public', 'images', 'mascot', 'hobi-bts-v2.png');
const HOBI_SKZ_PATH = path.join(__dirname, '..', 'public', 'images', 'mascot', 'hobi-skz-v2.png');

const PIN_CONFIGS = [
  // 1. BLACKPINK (English)
  {
    filename: 'pin-which-blackpink-member-are-you.png',
    mascotPath: BOMI_PATH,
    mascotWidth: 510,
    mascotLeft: 245,
    mascotTop: 505,
    gradStops: ['#090106', '#2a061a', '#500730', '#db2777'],
    topGlow: '#f43f5e',
    bottomGlow: '#ec4899',
    badgeBg: '#f43f5e',
    badgeText: '★ 10-QUESTION SOUL MATCH ★',
    titleLine1: 'Which BLACKPINK',
    titleLine2: 'Member Are You?',
    titleLine2Color: '#f472b6',
    membersLine: 'Jisoo  •  Jennie  •  Rosé  •  Lisa',
    subtitleLine: 'Discover your style aura & sisterly chemistry!',
    questionBoxColor: '#fbcfe8',
    sampleQ: '"If you were at Paris Fashion Week, what is your vibe?"',
    sampleOpts: 'A) Classic Elegance   B) Trendsetter   C) Grunge Rock   D) Cool Edgy',
    ctaText: 'TAP TO PLAY FREE  →',
    ctaColor: '#db2777',
  },
  // 2. BTS (English)
  {
    filename: 'pin-which-bts-member-are-you.png',
    mascotPath: HOBI_BTS_PATH,
    mascotWidth: 495,
    mascotLeft: 252,
    mascotTop: 505,
    gradStops: ['#060111', '#1e0b3d', '#4c1d95', '#7c3aed'],
    topGlow: '#a855f7',
    bottomGlow: '#c084fc',
    badgeBg: '#9333ea',
    badgeText: '★ 10-QUESTION SOULMATE TEST ★',
    titleLine1: 'Which BTS Member',
    titleLine2: 'Is Your Soulmate?',
    titleLine2Color: '#c084fc',
    membersLine: 'RM  •  Jin  •  SUGA  •  J-Hope  •  Jimin  •  V  •  Jungkook',
    subtitleLine: 'Discover your Bangtan archetype & twin chemistry!',
    questionBoxColor: '#e9d5ff',
    sampleQ: '"On a free Sunday in Seoul, what would you do?"',
    sampleOpts: 'A) Quiet Art Museum   B) Studio Music   C) Boxing & Gym   D) Cozy Cafe',
    ctaText: 'TAP TO PLAY FREE  →',
    ctaColor: '#7c3aed',
  },
  // 3. Stray Kids (English)
  {
    filename: 'pin-which-stray-kids-member-are-you.png',
    mascotPath: HOBI_SKZ_PATH,
    mascotWidth: 500,
    mascotLeft: 250,
    mascotTop: 505,
    gradStops: ['#090204', '#2b0710', '#650d1b', '#dc2626'],
    topGlow: '#ef4444',
    bottomGlow: '#f97316',
    badgeBg: '#e11d48',
    badgeText: '★ 10-QUESTION SKZOO MATCH ★',
    titleLine1: 'Which Stray Kids',
    titleLine2: 'Member Are You?',
    titleLine2Color: '#fb7185',
    membersLine: 'Bang Chan • Lee Know • Changbin • Hyunjin • HAN • Felix • Seungmin • I.N',
    subtitleLine: 'Find your Stray Kids soulmate & SKZOO twin!',
    questionBoxColor: '#fecdd3',
    sampleQ: '"What is your role in your friend group?"',
    sampleOpts: 'A) Protective Leader   B) Chaotic Prankster   C) Sunshine Baker   D) Deep Artist',
    ctaText: 'TAP TO PLAY FREE  →',
    ctaColor: '#e11d48',
  },
  // 4. BTS (Spanish - Español)
  {
    filename: 'pin-es-which-bts-member-are-you.png',
    mascotPath: HOBI_BTS_PATH,
    mascotWidth: 495,
    mascotLeft: 252,
    mascotTop: 505,
    gradStops: ['#060111', '#1e0b3d', '#4c1d95', '#7c3aed'],
    topGlow: '#a855f7',
    bottomGlow: '#c084fc',
    badgeBg: '#9333ea',
    badgeText: '★ TEST DE ALMA GEMELA (10 PREGUNTAS) ★',
    titleLine1: '¿Qué Miembro de BTS',
    titleLine2: 'Es Tu Alma Gemela?',
    titleLine2Color: '#c084fc',
    membersLine: 'RM  •  Jin  •  SUGA  •  J-Hope  •  Jimin  •  V  •  Jungkook',
    subtitleLine: '¡Descubre tu compatibilidad 100% gratis en español!',
    questionBoxColor: '#e9d5ff',
    sampleQ: '"¿Qué harías en un domingo libre en Seúl?"',
    sampleOpts: 'A) Museo de Arte   B) Producir Música   C) Gimnasio y Boxeo   D) Café Acogedor',
    ctaText: 'JUGAR GRATIS AHORA  →',
    ctaColor: '#7c3aed',
  },
  // 5. BLACKPINK (Spanish - Español)
  {
    filename: 'pin-es-which-blackpink-member-are-you.png',
    mascotPath: BOMI_PATH,
    mascotWidth: 510,
    mascotLeft: 245,
    mascotTop: 505,
    gradStops: ['#090106', '#2a061a', '#500730', '#db2777'],
    topGlow: '#f43f5e',
    bottomGlow: '#ec4899',
    badgeBg: '#f43f5e',
    badgeText: '★ TEST DE PERSONALIDAD K-POP ★',
    titleLine1: '¿Qué Integrante de',
    titleLine2: 'BLACKPINK Eres?',
    titleLine2Color: '#f472b6',
    membersLine: 'Jisoo  •  Jennie  •  Rosé  •  Lisa',
    subtitleLine: '¡Descubre qué miembro combina con tu estilo y vibra!',
    questionBoxColor: '#fbcfe8',
    sampleQ: '"Si estuvieras en la Semana de la Moda de París, ¿cuál sería tu estilo?"',
    sampleOpts: 'A) Elegancia Clásica   B) Trendsetter   C) Rock Indie   D) Urbano Audaz',
    ctaText: 'JUGAR GRATIS AHORA  →',
    ctaColor: '#db2777',
  },
  // 6. Stray Kids (Spanish - Español)
  {
    filename: 'pin-es-which-stray-kids-member-are-you.png',
    mascotPath: HOBI_SKZ_PATH,
    mascotWidth: 500,
    mascotLeft: 250,
    mascotTop: 505,
    gradStops: ['#090204', '#2b0710', '#650d1b', '#dc2626'],
    topGlow: '#ef4444',
    bottomGlow: '#f97316',
    badgeBg: '#e11d48',
    badgeText: '★ TEST DE ALMA GEMELA SKZOO ★',
    titleLine1: '¿Qué Miembro de',
    titleLine2: 'Stray Kids Eres?',
    titleLine2Color: '#fb7185',
    membersLine: 'Bang Chan • Lee Know • Changbin • Hyunjin • HAN • Felix • Seungmin • I.N',
    subtitleLine: '¡Descubre tu gemelo SKZOO y tu alma gemela en Stray Kids!',
    questionBoxColor: '#fecdd3',
    sampleQ: '"¿Cuál es tu rol dentro de tu grupo de amigos?"',
    sampleOpts: 'A) Líder Protector   B) Bromista Caótico   C) Luz Cálida   D) Artista Profundo',
    ctaText: 'JUGAR GRATIS AHORA  →',
    ctaColor: '#e11d48',
  },
];

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function generatePin(cfg) {
  const mascotBuffer = fs.readFileSync(cfg.mascotPath);
  const mascotResized = await sharp(mascotBuffer)
    .resize(cfg.mascotWidth, null)
    .toBuffer();

  const membersFontSize = cfg.membersLine.length > 55 ? 21 : 26;

  const svg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${cfg.gradStops[0]}"/>
        <stop offset="35%" stop-color="${cfg.gradStops[1]}"/>
        <stop offset="70%" stop-color="${cfg.gradStops[2]}"/>
        <stop offset="100%" stop-color="${cfg.gradStops[3]}"/>
      </linearGradient>
      <radialGradient id="topGlow" cx="50%" cy="20%" r="45%">
        <stop offset="0%" stop-color="${cfg.topGlow}" stop-opacity="0.48"/>
        <stop offset="100%" stop-color="${cfg.topGlow}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="bottomGlow" cx="50%" cy="75%" r="50%">
        <stop offset="0%" stop-color="${cfg.bottomGlow}" stop-opacity="0.38"/>
        <stop offset="100%" stop-color="${cfg.bottomGlow}" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <!-- Background -->
    <rect width="1000" height="1500" fill="url(#bgGrad)"/>
    <rect width="1000" height="1500" fill="url(#topGlow)"/>
    <rect width="1000" height="1500" fill="url(#bottomGlow)"/>

    <!-- Stylish Inner Border -->
    <rect x="30" y="30" width="940" height="1440" rx="40" fill="none" stroke="rgba(255, 255, 255, 0.22)" stroke-width="3"/>

    <!-- Top Badge -->
    <g transform="translate(500, 120)">
      <rect x="-310" y="-32" width="620" height="64" rx="32" fill="${cfg.badgeBg}"/>
      <text x="0" y="9" fill="#ffffff" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="900" letter-spacing="2.5" text-anchor="middle">
        ${escapeXml(cfg.badgeText)}
      </text>
    </g>

    <!-- Main Title -->
    <text x="500" y="268" fill="#ffffff" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="70" font-weight="900" text-anchor="middle" letter-spacing="-1">
      ${escapeXml(cfg.titleLine1)}
    </text>
    <text x="500" y="354" fill="${cfg.titleLine2Color}" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="74" font-weight="900" text-anchor="middle" letter-spacing="-1">
      ${escapeXml(cfg.titleLine2)}
    </text>

    <!-- Subtitle Card -->
    <g transform="translate(500, 428)">
      <text x="0" y="0" fill="rgba(255, 255, 255, 0.9)" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="${membersFontSize}" font-weight="700" text-anchor="middle">
        ${escapeXml(cfg.membersLine)}
      </text>
      <text x="0" y="42" fill="rgba(255, 255, 255, 0.72)" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="23" font-weight="500" text-anchor="middle">
        ${escapeXml(cfg.subtitleLine)}
      </text>
    </g>

    <!-- Interactive Teaser Card -->
    <g transform="translate(500, 1070)">
      <rect x="-410" y="0" width="820" height="150" rx="24" fill="rgba(255, 255, 255, 0.11)" stroke="rgba(255, 255, 255, 0.28)" stroke-width="2"/>
      <text x="0" y="52" fill="${cfg.questionBoxColor}" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="700" text-anchor="middle">
        ${escapeXml(cfg.sampleQ)}
      </text>
      <text x="0" y="102" fill="#ffffff" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="600" text-anchor="middle">
        ${escapeXml(cfg.sampleOpts)}
      </text>
    </g>

    <!-- Bottom CTA Button -->
    <g transform="translate(500, 1310)">
      <rect x="-310" y="-45" width="620" height="90" rx="45" fill="#ffffff"/>
      <text x="0" y="13" fill="${cfg.ctaColor}" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="32" font-weight="900" text-anchor="middle" letter-spacing="1">
        ${escapeXml(cfg.ctaText)}
      </text>
    </g>

    <text x="500" y="1412" fill="rgba(255, 255, 255, 0.65)" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="700" text-anchor="middle" letter-spacing="3">
      KPULSEQUIZ.COM
    </text>
  </svg>
  `;

  await sharp(Buffer.from(svg))
    .composite([
      {
        input: mascotResized,
        top: cfg.mascotTop,
        left: cfg.mascotLeft,
      },
    ])
    .png()
    .toFile(path.join(OUTPUT_DIR, cfg.filename));

  console.log('Generated:', cfg.filename);
}

async function main() {
  for (const cfg of PIN_CONFIGS) {
    await generatePin(cfg);
  }
}

main().catch(console.error);
