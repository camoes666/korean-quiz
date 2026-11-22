const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = path.join(__dirname, '..');
const QUIZZES_DIR = path.join(ROOT_DIR, 'src', 'data', 'quizzes');
const CHEMISTRY_FILE = path.join(ROOT_DIR, 'src', 'data', 'idolChemistry.ts');
const MASCOT_DIR = path.join(ROOT_DIR, 'public', 'images', 'mascot');
const MAP_IMAGES_DIR = path.join(ROOT_DIR, 'public', 'images', 'map');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public', 'images', 'pinterest');

const FORMAT_DIRS = [
  'covers',
  'questions',
  'cards',
  'chemistry',
  'maps',
  'korean-name',
  'courses',
  'spots',
];
const LEGACY_DIRS = ['main', 'es'];
const FONT_KOREAN =
  "'Malgun Gothic', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Segoe UI', Arial, sans-serif";

const LANGS = ['es', 'en', 'pt'];

const QUIZ_CONFIGS = [
  {
    slug: 'which-blackpink-member-are-you',
    groupKey: 'blackpink',
    groupName: 'BLACKPINK',
    mascotFile: 'bomi-blackpink-v2.png',
    accent: '#DB2777',
    accentDark: '#9D174D',
    pastelBg: '#FDF2F8',
    pastelBorder: '#FBCFE8',
    darkGlow: '#EC4899',
    cardGroup: true,
    membersLine: 'Jisoo  •  Jennie  •  Rosé  •  Lisa',
  },
  {
    slug: 'which-stray-kids-member-are-you',
    groupKey: 'skz',
    groupName: 'Stray Kids',
    mascotFile: 'hobi-skz-v2.png',
    accent: '#E11D48',
    accentDark: '#9F1239',
    pastelBg: '#FFF1F2',
    pastelBorder: '#FECDD3',
    darkGlow: '#F43F5E',
    cardGroup: true,
    membersLine: 'Bang Chan • Lee Know • Changbin • Hyunjin • HAN • Felix • Seungmin • I.N',
  },
  {
    slug: 'which-bts-member-are-you',
    groupKey: 'bts',
    groupName: 'BTS',
    variant: 'personality',
    mascotFile: 'hobi-bts-v2.png',
    accent: '#7C3AED',
    accentDark: '#5B21B6',
    pastelBg: '#F5F3FF',
    pastelBorder: '#DDD6FE',
    darkGlow: '#A855F7',
    cardGroup: false,
    membersLine: 'RM  •  Jin  •  SUGA  •  J-Hope  •  Jimin  •  V  •  Jungkook',
  },
  {
    slug: 'which-bts-member-is-your-soulmate',
    groupKey: 'bts-soulmate',
    groupName: 'BTS',
    variant: 'soulmate',
    mascotFile: 'hobi-bts-v2.png',
    accent: '#9333EA',
    accentDark: '#6B21A8',
    pastelBg: '#FAF5FF',
    pastelBorder: '#E9D5FF',
    darkGlow: '#C084FC',
    cardGroup: true,
    cardGroupKey: 'bts',
    membersLine: 'RM  •  Jin  •  SUGA  •  J-Hope  •  Jimin  •  V  •  Jungkook',
  },
  {
    slug: 'which-twice-member-are-you',
    groupKey: 'twice',
    groupName: 'TWICE',
    mascotFile: 'bomi-twice.png',
    accent: '#EC4899',
    accentDark: '#BE185D',
    pastelBg: '#FFF7ED',
    pastelBorder: '#FED7AA',
    darkGlow: '#FB7185',
    cardGroup: true,
    membersLine: 'Nayeon • Jeongyeon • Momo • Sana • Jihyo • Mina • Dahyun • Chaeyoung • Tzuyu',
  },
  {
    slug: 'which-enhypen-member-are-you',
    groupKey: 'enhypen',
    groupName: 'ENHYPEN',
    mascotFile: 'hobi-enhypen.png',
    accent: '#B91C1C',
    accentDark: '#7F1D1D',
    pastelBg: '#FEF2F2',
    pastelBorder: '#FECACA',
    darkGlow: '#EF4444',
    cardGroup: false,
    membersLine: 'Jungwon • Heeseung • Jay • Jake • Sunghoon • Sunoo • Ni-ki',
  },
  {
    slug: 'which-aespa-member-are-you',
    groupKey: 'aespa',
    groupName: 'aespa',
    mascotFile: 'bomi-aespa.png',
    accent: '#2563EB',
    accentDark: '#1E40AF',
    pastelBg: '#EFF6FF',
    pastelBorder: '#BFDBFE',
    darkGlow: '#38BDF8',
    cardGroup: false,
    membersLine: 'Karina  •  Winter  •  Giselle  •  Ningning',
  },
  {
    slug: 'which-le-sserafim-member-are-you',
    groupKey: 'lsf',
    groupName: 'LE SSERAFIM',
    mascotFile: 'bomi-lesserafim.png',
    accent: '#059669',
    accentDark: '#065F46',
    pastelBg: '#ECFDF5',
    pastelBorder: '#A7F3D0',
    darkGlow: '#10B981',
    cardGroup: false,
    membersLine: 'Chaewon  •  Sakura  •  Yunjin  •  Kazuha  •  Eunchae',
  },
];

const TAILWIND_PALETTES = {
  rose: { top: '#E11D48', bottom: '#881337', accent: '#E11D48', accentDark: '#9F1239', softBg: '#FFF1F2', border: '#FECDD3' },
  pink: { top: '#EC4899', bottom: '#831843', accent: '#DB2777', accentDark: '#9D174D', softBg: '#FDF2F8', border: '#FBCFE8' },
  fuchsia: { top: '#C026D3', bottom: '#701A75', accent: '#C026D3', accentDark: '#86198F', softBg: '#FAE8FF', border: '#F5D0FE' },
  purple: { top: '#9333EA', bottom: '#4C1D95', accent: '#7C3AED', accentDark: '#5B21B6', softBg: '#F5F3FF', border: '#DDD6FE' },
  violet: { top: '#7C3AED', bottom: '#3B0764', accent: '#7C3AED', accentDark: '#5B21B6', softBg: '#F5F3FF', border: '#DDD6FE' },
  indigo: { top: '#4F46E5', bottom: '#1E1B4B', accent: '#4338CA', accentDark: '#312E81', softBg: '#EEF2FF', border: '#C7D2FE' },
  blue: { top: '#2563EB', bottom: '#1E3A8A', accent: '#2563EB', accentDark: '#1E40AF', softBg: '#EFF6FF', border: '#BFDBFE' },
  sky: { top: '#0284C7', bottom: '#0C4A6E', accent: '#0284C7', accentDark: '#075985', softBg: '#F0F9FF', border: '#BAE6FD' },
  cyan: { top: '#0891B2', bottom: '#164E63', accent: '#0891B2', accentDark: '#155E75', softBg: '#ECFEFF', border: '#A5F3FC' },
  teal: { top: '#0D9488', bottom: '#134E4A', accent: '#0D9488', accentDark: '#115E59', softBg: '#F0FDFA', border: '#99F6E4' },
  emerald: { top: '#059669', bottom: '#064E3B', accent: '#059669', accentDark: '#065F46', softBg: '#ECFDF5', border: '#A7F3D0' },
  green: { top: '#16A34A', bottom: '#14532D', accent: '#16A34A', accentDark: '#166534', softBg: '#F0FDF4', border: '#BBF7D0' },
  amber: { top: '#D97706', bottom: '#78350F', accent: '#D97706', accentDark: '#92400E', softBg: '#FFFBEB', border: '#FDE68A' },
  orange: { top: '#EA580C', bottom: '#7C2D12', accent: '#EA580C', accentDark: '#9A3412', softBg: '#FFF7ED', border: '#FED7AA' },
  red: { top: '#DC2626', bottom: '#7F1D1D', accent: '#DC2626', accentDark: '#991B1B', softBg: '#FEF2F2', border: '#FECACA' },
  zinc: { top: '#27272A', bottom: '#09090B', accent: '#DB2777', accentDark: '#9D174D', softBg: '#FDF2F8', border: '#FBCFE8' },
  slate: { top: '#334155', bottom: '#0F172A', accent: '#475569', accentDark: '#1E293B', softBg: '#F8FAFC', border: '#CBD5E1' },
};

const TWIN_PREFIX_BY_GROUP = {
  blackpink: 'BLACKPINK',
  skz: 'SKZOO',
  bts: 'BT21',
  twice: 'LOVELYS',
};

const CHEMISTRY_BOARD_MAP = {
  es: 'Tests de K-Pop en Español | BTS, BLACKPINK, Stray Kids ✨',
  pt: 'Testes de K-Pop em Português | BTS, BLACKPINK, TWICE 💜',
  en: 'K-Pop Quizzes, Personality Tests & Stan Challenges 🎤✨',
};

function getTargetBoard(groupKey, lang) {
  if (groupKey === 'korean-name') {
    if (lang === 'es') return 'Tu Nombre Coreano, Significado Hanja y Cultura Coreana 🇰🇷✨';
    if (lang === 'pt') return 'Seu Nome Coreano, Significado Hanja e Cultura Coreana 🇰🇷✨';
    return 'Korean Name Generator, Hangul Aesthetic & K-Saju Meanings 🇰🇷✨';
  }
  if (groupKey === 'korea-travel') {
    if (lang === 'es') return 'Guía de Viaje a Corea y Mapa K-Pop (Seúl, Busán y Gangneung) 📍🇰🇷';
    if (lang === 'pt') return 'Guia de Viagem para Coreia e Mapa K-Pop (Seul e Busan) 📍🇰🇷';
    return 'Korea Travel Guide & K-Pop Pilgrimage Map (Seoul & Busan) 📍🇰🇷';
  }
  if (lang === 'es') return CHEMISTRY_BOARD_MAP.es;
  if (lang === 'pt') return CHEMISTRY_BOARD_MAP.pt;
  const enBoards = {
    skz: 'Stray Kids Quizzes & SKZOO Personality Tests 🐺✨',
    'stray-kids': 'Stray Kids Quizzes & SKZOO Personality Tests 🐺✨',
    bts: 'BTS Quizzes, Soulmate Tests & ARMY Trivia 💜🐨',
    'bts-soulmate': 'BTS Quizzes, Soulmate Tests & ARMY Trivia 💜🐨',
    blackpink: 'BLACKPINK Personality Tests & BLINK Quizzes 🖤💖',
    twice: 'TWICE Quizzes & Lovelys Personality Tests 🍭✨',
    enhypen: 'ENHYPEN Quizzes & Dark Moon Personality Tests 🧛🔥',
    aespa: 'aespa Quizzes, Supernova & MY Personality Tests 💙✨',
    lsf: 'LE SSERAFIM Quizzes, FEARLESS & CRAZY Personality Tests 🔥👑',
    'le-sserafim': 'LE SSERAFIM Quizzes, FEARLESS & CRAZY Personality Tests 🔥👑',
  };
  return enBoards[groupKey] || CHEMISTRY_BOARD_MAP.en;
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripEmojis(str) {
  return String(str)
    .replace(/\p{Extended_Pictographic}|\uFE0F|\u200D|\u20E3/gu, '')
    .replace(/\s+\)/g, ')')
    .replace(/\(\s+/g, '(')
    .replace(/\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function cleanHangulParens(str) {
  return String(str)
    .replace(/\s*\([^)]*[\uAC00-\uD7A3][^)]*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function shortMemberName(raw) {
  const cleaned = cleanHangulParens(raw)
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return cleaned;
}

function getMemberInitials(name) {
  const clean = shortMemberName(name);
  if (clean === 'I.N') return 'I.N';
  if (clean === 'RM' || clean === 'V' || clean === 'SUGA') return clean.slice(0, 2);
  const parts = clean.split(/[\s-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  const word = parts[0] || 'K';
  if (word.length <= 2) return word.toUpperCase();
  return (word[0] + word[word.length - 1]).toUpperCase();
}

function wrapText(text, maxChars, maxLines) {
  const words = stripEmojis(text).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [''];
  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      if (word.length > maxChars) {
        lines.push(word.slice(0, maxChars - 1) + '…');
        current = '';
      } else {
        current = word;
      }
    }
  }
  if (current) {
    lines.push(current);
  }
  if (lines.length <= maxLines) {
    return lines;
  }
  const sliced = lines.slice(0, maxLines);
  const last = sliced[maxLines - 1].replace(/…+$/, '');
  sliced[maxLines - 1] =
    last.length >= maxChars ? last.slice(0, maxChars - 1) + '…' : `${last}…`;
  return sliced;
}

function trimWords(str, maxLen) {
  const s = stripEmojis(str);
  if (s.length <= maxLen) return s;
  const slice = s.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace >= Math.floor(maxLen * 0.55) ? slice.slice(0, lastSpace) : slice;
  return `${cut.replace(/[,:;.\-?!¿¡]+$/, '')}…`;
}

function buildPinUrl({ pathName, lang, campaign, content, extraParams }) {
  const cleanPath = pathName.startsWith('/') ? pathName : `/${pathName}`;
  const localizedPath =
    lang === 'en'
      ? cleanPath
      : cleanPath === '/'
      ? `/${lang}`
      : `/${lang}${cleanPath}`;
  const url = new URL(`https://kpulsequiz.com${localizedPath}`);
  if (extraParams) {
    for (const [k, v] of Object.entries(extraParams)) {
      if (v !== undefined && v !== null && v !== '') {
        url.searchParams.set(k, String(v));
      }
    }
  }
  url.searchParams.set('utm_source', 'pinterest');
  url.searchParams.set('utm_medium', 'social');
  url.searchParams.set('utm_campaign', campaign);
  url.searchParams.set('utm_content', content);
  return url.toString();
}

function csvEscape(val) {
  const s = String(val ?? '');
  if (/[",\r\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function pickPaletteFromGradient(bgGradient) {
  const match = String(bgGradient || '').match(/from-([a-z]+)-/);
  const key = match ? match[1] : 'purple';
  return TAILWIND_PALETTES[key] || TAILWIND_PALETTES.purple;
}

function selectPunchyQuestion(quiz) {
  const questions = quiz.personalityQuestions || [];
  let best = questions[0];
  let bestScore = Infinity;
  for (const q of questions) {
    const opts = (q.options || []).slice(0, 4);
    const qLen = stripEmojis(q.questionEs || q.question || '').length;
    const maxOptLen = Math.max(...opts.map((o) => stripEmojis(o.textEs || o.text || '').length), 0);
    const score = qLen + maxOptLen * 2;
    if (score < bestScore) {
      bestScore = score;
      best = q;
    }
  }
  return best;
}

function parseChemistryGroups() {
  const src = fs.readFileSync(CHEMISTRY_FILE, 'utf8');
  const groups = [];
  const groupMatches = src.matchAll(
    /id:\s*'([^']+)',\s*name:\s*'([^']+)',[\s\S]*?fandom:\s*'([^']+)',[\s\S]*?mascotUrl:\s*'([^']+)',\s*relatedQuizSlug:\s*'([^']+)',\s*members:\s*\[([\s\S]*?)\n\s*\],/g
  );
  for (const g of groupMatches) {
    const [, id, name, fandom, mascotUrl, relatedQuizSlug, membersBlock] = g;
    const members = [];
    const memberMatches = membersBlock.matchAll(
      /name:\s*'([^']+)',[\s\S]*?mbti:\s*'([^']+)',\s*sajuElement:\s*'([^']+)',[\s\S]*?colorHex:\s*'([^']+)',/g
    );
    for (const m of memberMatches) {
      members.push({
        name: shortMemberName(m[1]),
        mbti: m[2],
        sajuElement: m[3],
        colorHex: m[4],
      });
    }
    groups.push({
      id,
      name,
      fandom,
      mascotFile: path.basename(mascotUrl).replace(/\.webp$/i, '.png'),
      relatedQuizSlug,
      members,
    });
  }
  return groups;
}

async function writePng(svgString, composites, outPath, quality = 90) {
  await sharp(Buffer.from(svgString))
    .composite(composites)
    .png({ compressionLevel: 9, palette: true, quality })
    .toFile(outPath);
}

async function makeRoundedPhotoBuffer(absPath, width, height, rx = 24) {
  const maskSvg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="${width}" height="${height}" rx="${rx}" ry="${rx}" fill="#ffffff"/></svg>`;
  return sharp(absPath)
    .resize(width, height, { fit: 'cover', position: 'centre' })
    .ensureAlpha()
    .composite([{ input: Buffer.from(maskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();
}

async function getResizedMascot(mascotPath, maxSize) {
  return sharp(mascotPath)
    .resize(maxSize, maxSize, { fit: 'inside' })
    .png()
    .toBuffer({ resolveWithObject: true });
}

function cleanOutputDirectory() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  // Remove legacy root PNGs
  for (const entry of fs.readdirSync(OUTPUT_DIR, { withFileTypes: true })) {
    const full = path.join(OUTPUT_DIR, entry.name);
    if (entry.isFile() && entry.name.endsWith('.png')) {
      fs.unlinkSync(full);
    }
    if (entry.isDirectory() && LEGACY_DIRS.includes(entry.name)) {
      fs.rmSync(full, { recursive: true, force: true });
    }
  }
  // Prepare clean format subdirs
  for (const dir of FORMAT_DIRS) {
    const target = path.join(OUTPUT_DIR, dir);
    fs.rmSync(target, { recursive: true, force: true });
    fs.mkdirSync(target, { recursive: true });
  }
}

function getCoverCopy(cfg, lang) {
  const g = cfg.groupName;
  if (cfg.variant === 'soulmate') {
    return {
      es: {
        badge: 'EDICIÓN SOULMATE • 10 PREG.',
        lines: ['¿Quién de', g, 'Es Tu Alma Gemela?'],
        hook: 'Incluye Photocard + Compatibilidad WhatsApp',
        cta: 'DESCUBRIR GRATIS →',
        title: `¿Quién de BTS Es Tu Alma Gemela? 💜 Test de Mejor Amigo en Español`,
        desc: `Descubre con qué integrante de BTS conectas al 100% como alma gemela. Responde 10 preguntas y descarga tu photocard oficial para compartir por WhatsApp.`,
      },
      en: {
        badge: 'SOULMATE EDITION • 10 Qs',
        lines: ['Who in', g, 'Is Your Soulmate?'],
        hook: 'Get your Photocard + Top 3 Member Sync',
        cta: 'FIND YOUR MATCH →',
        title: `Which BTS Member Is Your Soulmate? 💜 Free 10-Question Personality Test`,
        desc: `Find out which BTS member is your true soulmate among RM, Jin, SUGA, J-Hope, Jimin, V, and Jungkook! Get your holographic photocard and Top 3 sync rate free.`,
      },
      pt: {
        badge: 'EDIÇÃO SOULMATE • 10 PERG.',
        lines: ['Quem do', g, 'É Sua Alma Gêmea?'],
        hook: 'Ganhe seu Photocard + Top 3 Membros',
        cta: 'FAZER TESTE GRÁTIS →',
        title: `Quem do BTS É a Sua Alma Gêmea? 💜 Teste de Personalidade Grátis`,
        desc: `Descubra qual integrante do BTS é sua verdadeira alma gêmea! Responda 10 perguntas e salve seu photocard oficial gratuitamente.`,
      },
    }[lang];
  }

  if (cfg.variant === 'personality') {
    return {
      es: {
        badge: 'PERSONALIDAD • 10 PREG.',
        lines: ['¿Qué Miembro de', g, 'Eres Realmente?'],
        hook: 'Incluye Photocard + Compatibilidad WhatsApp',
        cta: 'JUGAR GRATIS AHORA →',
        title: `¿Qué Miembro de BTS Eres? ✨ Test de Personalidad ARMY Gratis`,
        desc: `¿Tienes la vibra de RM, Jin, SUGA, J-Hope, Jimin, V o Jungkook? Haz este test interactivo de 10 preguntas en español y guarda tu photocard.`,
      },
      en: {
        badge: 'PERSONALITY • 10 Qs',
        lines: ['Which Member of', g, 'Are You Like?'],
        hook: 'Get your Photocard + Top 3 Member Sync',
        cta: 'TAKE FREE QUIZ →',
        title: `Which BTS Member Are You? ✨ Free ARMY Personality & BT21 Quiz`,
        desc: `Discover which BTS member matches your true personality and BT21 twin! Take our free 10-question quiz and download your official photocard.`,
      },
      pt: {
        badge: 'PERSONALIDADE • 10 PERG.',
        lines: ['Qual Membro do', g, 'Combina Com Você?'],
        hook: 'Ganhe seu Photocard + Top 3 Membros',
        cta: 'FAZER TESTE GRÁTIS →',
        title: `Qual Membro do BTS Combina Com Você? ✨ Teste de Personalidade Grátis`,
        desc: `Descubra qual integrante do BTS tem a sua personalidade e o seu gêmeo BT21! Faça o teste grátis de 10 perguntas e salve seu photocard.`,
      },
    }[lang];
  }

  return {
    es: {
      badge: '10 PREGUNTAS • GRATIS',
      lines: ['¿Qué Integrante de', g, 'Eres Hoy?'],
      hook: 'Incluye Photocard + Compatibilidad WhatsApp',
      cta: 'JUGAR GRATIS AHORA →',
      title: `¿Qué Integrante de ${g} Eres? ✨ Test de Personalidad Gratis`,
      desc: `Descubre qué integrante de ${g} coincide al 100% con tu personalidad y vibra. Responde 10 preguntas en español, guarda tu photocard y compárate por WhatsApp.`,
    },
    en: {
      badge: '10 QUESTIONS • FREE',
      lines: ['Which Member of', g, 'Are You?'],
      hook: 'Get your Photocard + Top 3 Member Sync',
      cta: 'TAKE FREE QUIZ →',
      title: `Which ${g} Member Are You? ✨ Free 10-Question Soulmate Quiz`,
      desc: `Find out which ${g} member matches your energy and aesthetic! Take this free 10-question personality quiz and download your holographic photocard.`,
    },
    pt: {
      badge: '10 PERGUNTAS • GRÁTIS',
      lines: ['Qual Integrante do', g, 'Você É?'],
      hook: 'Ganhe seu Photocard + Top 3 Membros',
      cta: 'FAZER TESTE GRÁTIS →',
      title: `Qual Integrante do ${g} Você É? ✨ Teste de Personalidade Grátis`,
      desc: `Descubra qual membro do ${g} combina 100% com a sua vibe! Faça este teste grátis de 10 perguntas em português e salve seu photocard oficial.`,
    },
  }[lang];
}

async function generateFormatACover(cfg, lang) {
  const copy = getCoverCopy(cfg, lang);
  const membersClean = stripEmojis(cfg.membersLine);
  const membersFontSize = membersClean.length > 58 ? 18 : 22;
  const line2Size = cfg.groupName.length > 9 ? 78 : 88;
  const mascot = await getResizedMascot(path.join(MASCOT_DIR, cfg.mascotFile), 535);

  const svg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <!-- Warm Ivory Editorial Background -->
    <rect width="1000" height="1500" fill="#FAF7F2"/>
    <rect x="0" y="0" width="1000" height="16" fill="${cfg.accent}"/>
    <rect x="32" y="36" width="936" height="1428" rx="34" fill="none" stroke="#E5DFD3" stroke-width="2.5"/>

    <!-- Top Masthead -->
    <text x="72" y="96" fill="#475569" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="3.5">
      K-PULSE EDITION
    </text>
    <rect x="572" y="62" width="356" height="48" rx="24" fill="${cfg.accent}"/>
    <text x="750" y="93" fill="#FFFFFF" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="900" letter-spacing="1.2" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.badge))}
    </text>

    <!-- Editorial 3-Line Headline -->
    <text x="500" y="196" fill="#0F172A" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="56" font-weight="800" text-anchor="middle" letter-spacing="-0.5">
      ${escapeXml(stripEmojis(copy.lines[0]))}
    </text>
    <text x="500" y="286" fill="${cfg.accent}" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="${line2Size}" font-weight="900" text-anchor="middle" letter-spacing="-1.5">
      ${escapeXml(stripEmojis(copy.lines[1]))}
    </text>
    <text x="500" y="358" fill="#0F172A" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="56" font-weight="800" text-anchor="middle" letter-spacing="-0.5">
      ${escapeXml(stripEmojis(copy.lines[2]))}
    </text>

    <!-- Member Roster Pill -->
    <rect x="66" y="394" width="868" height="52" rx="26" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    <text x="500" y="427" fill="#334155" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="${membersFontSize}" font-weight="700" text-anchor="middle">
      ${escapeXml(membersClean)}
    </text>

    <!-- Centered Pastel Arch Stage (peak y=496, cleanly below roster pill) -->
    <path d="M 160 1130 L 160 806 A 340 310 0 0 1 840 806 L 840 1130 Z" fill="${cfg.pastelBg}" stroke="${cfg.pastelBorder}" stroke-width="3"/>
    <circle cx="500" cy="825" r="240" fill="#FFFFFF" fill-opacity="0.7"/>

    <!-- Bottom Hook -->
    <text x="500" y="1196" fill="#334155" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="25" font-weight="700" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.hook))}
    </text>

    <!-- Solid Dark Pill CTA -->
    <rect x="170" y="1244" width="660" height="94" rx="47" fill="#0F172A"/>
    <text x="500" y="1302" fill="#FFFFFF" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="31" font-weight="900" letter-spacing="1" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.cta))}
    </text>

    <!-- Footer -->
    <text x="500" y="1408" fill="#64748B" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="800" letter-spacing="3.5" text-anchor="middle">
      KPULSEQUIZ.COM
    </text>
  </svg>`;

  const filename = `cover-${cfg.slug}-${lang}.png`;
  const relPath = `public/images/pinterest/covers/${filename}`;
  const outPath = path.join(OUTPUT_DIR, 'covers', filename);

  const mascotLeft = Math.round((1000 - mascot.info.width) / 2);
  const mascotTop = Math.round(545 + (565 - mascot.info.height) / 2);

  await writePng(svg, [{ input: mascot.data, left: mascotLeft, top: mascotTop }], outPath);

  return {
    format: 'Cover (Editorial)',
    lang,
    group: cfg.groupName,
    imageFile: relPath,
    targetBoard: getTargetBoard(cfg.groupKey, lang),
    pinTitle: copy.title,
    pinDescription: copy.desc,
    destinationUrl: buildPinUrl({
      pathName: `/quiz/${cfg.slug}`,
      lang,
      campaign: `${cfg.groupKey}_${lang}`,
      content: 'cover',
    }),
  };
}

async function generateFormatBQuestion(cfg, quiz, lang) {
  const q = selectPunchyQuestion(quiz);
  const qRaw = lang === 'es' ? (q.questionEs || q.question) : lang === 'pt' ? (q.questionPt || q.question) : q.question;
  const qLines = wrapText(qRaw, 31, 4);
  const qFontSize = qLines.length >= 4 ? 40 : 44;
  const qLineHeight = qLines.length >= 4 ? 52 : 56;
  const qStartY = qLines.length <= 2 ? 255 : 225;

  const opts = (q.options || []).slice(0, 4).map((o, idx) => {
    const raw = lang === 'es' ? (o.textEs || o.text) : lang === 'pt' ? (o.textPt || o.text) : o.text;
    const clean = stripEmojis(raw);
    const letter = ['A', 'B', 'C', 'D'][idx];
    const fontSize = clean.length > 62 ? 22 : 25;
    const maxChars = clean.length > 62 ? 26 : 23;
    const lineHeight = clean.length > 62 ? 30 : 34;
    const lines = wrapText(clean, maxChars, 5);
    return { letter, lines, fontSize, lineHeight };
  });

  const mascot = await getResizedMascot(path.join(MASCOT_DIR, cfg.mascotFile), 104);

  const badgeLabel =
    lang === 'es'
      ? `${cfg.groupName.toUpperCase()}  •  PREGUNTA`
      : lang === 'pt'
      ? `${cfg.groupName.toUpperCase()}  •  PERGUNTA`
      : `${cfg.groupName.toUpperCase()}  •  QUIZ Q1`;

  const hookText =
    lang === 'es'
      ? '¿Cuál elegiste? Descubre qué miembro eres'
      : lang === 'pt'
      ? 'Qual você escolheu? Veja seu membro ideal'
      : 'Which option is you? See your member match';

  const ctaText =
    lang === 'es'
      ? 'VER MI RESULTADO GRATIS →'
      : lang === 'pt'
      ? 'VER MEU RESULTADO GRÁTIS →'
      : 'SEE MY MEMBER MATCH →';

  const pinTitle =
    lang === 'es'
      ? `Test ${cfg.groupName}: "${trimWords(qRaw, 58)}" ⚡ Descubre tu Miembro`
      : lang === 'pt'
      ? `Teste ${cfg.groupName}: "${trimWords(qRaw, 56)}" ⚡ Descubra Seu Membro`
      : `${cfg.groupName} Quiz: "${trimWords(qRaw, 58)}" ⚡ Find Your Match`;

  const pinDesc =
    lang === 'es'
      ? `Elige A, B, C o D y descubre qué integrante de ${cfg.groupName} coincide con tu forma de ser. Responde el test gratis de 10 preguntas en español y obtén tu photocard oficial.`
      : lang === 'pt'
      ? `Escolha A, B, C ou D e descubra qual integrante do ${cfg.groupName} combina com você! Faça o teste grátis de 10 perguntas em português e ganhe seu photocard.`
      : `Pick A, B, C, or D and see which ${cfg.groupName} member matches your vibe! Take the free 10-question quiz at K-Pulse and unlock your photocard.`;

  const optionCardsSvg = opts
    .map((opt, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const cardX = col === 0 ? 58 : 514;
      const cardY = row === 0 ? 485 : 805;
      const textSvg = opt.lines
        .map(
          (line, lIdx) =>
            `<text x="${cardX + 26}" y="${cardY + 114 + lIdx * opt.lineHeight}" fill="#0F172A" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="${opt.fontSize}" font-weight="700">${escapeXml(line)}</text>`
        )
        .join('\n');

      return `
      <rect x="${cardX}" y="${cardY}" width="428" height="292" rx="28" fill="#FFFFFF"/>
      <rect x="${cardX + 24}" y="${cardY + 24}" width="48" height="48" rx="14" fill="${cfg.accent}"/>
      <text x="${cardX + 48}" y="${cardY + 57}" fill="#FFFFFF" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="26" font-weight="900" text-anchor="middle">${opt.letter}</text>
      ${textSvg}`;
    })
    .join('\n');

  const questionSvg = qLines
    .map(
      (line, idx) =>
        `<text x="64" y="${qStartY + idx * qLineHeight}" fill="#FFFFFF" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="${qFontSize}" font-weight="800" letter-spacing="-0.5">${escapeXml(line)}</text>`
    )
    .join('\n');

  const svg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="cornerGlow" cx="88%" cy="10%" r="55%">
        <stop offset="0%" stop-color="${cfg.darkGlow}" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="${cfg.darkGlow}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="bottomGlow" cx="15%" cy="90%" r="55%">
        <stop offset="0%" stop-color="${cfg.accent}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${cfg.accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="1000" height="1500" fill="#0C101C"/>
    <rect width="1000" height="1500" fill="url(#cornerGlow)"/>
    <rect width="1000" height="1500" fill="url(#bottomGlow)"/>

    <!-- Top Badge & Circular Mascot Seal -->
    <rect x="64" y="84" width="380" height="50" rx="25" fill="${cfg.accent}"/>
    <text x="254" y="116" fill="#FFFFFF" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="900" letter-spacing="1.2" text-anchor="middle">
      ${escapeXml(badgeLabel)}
    </text>

    <circle cx="870" cy="118" r="64" fill="#1E293B" stroke="${cfg.accent}" stroke-width="4"/>

    <!-- Question Prompt -->
    ${questionSvg}

    <!-- 2x2 Option Grid -->
    ${optionCardsSvg}

    <!-- Bottom Hook & CTA -->
    <text x="500" y="1184" fill="#CBD5E1" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="26" font-weight="700" text-anchor="middle">
      ${escapeXml(stripEmojis(hookText))}
    </text>

    <rect x="165" y="1238" width="670" height="94" rx="47" fill="${cfg.accent}"/>
    <text x="500" y="1296" fill="#FFFFFF" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="30" font-weight="900" letter-spacing="1" text-anchor="middle">
      ${escapeXml(stripEmojis(ctaText))}
    </text>

    <text x="500" y="1408" fill="#94A3B8" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="800" letter-spacing="3.5" text-anchor="middle">
      KPULSEQUIZ.COM
    </text>
  </svg>`;

  const filename = `quiz-${cfg.slug}-${lang}.png`;
  const relPath = `public/images/pinterest/questions/${filename}`;
  const outPath = path.join(OUTPUT_DIR, 'questions', filename);

  const mascotLeft = Math.round(870 - mascot.info.width / 2);
  const mascotTop = Math.round(118 - mascot.info.height / 2);

  await writePng(svg, [{ input: mascot.data, left: mascotLeft, top: mascotTop }], outPath);

  return {
    format: 'Quiz Hook (2x2)',
    lang,
    group: cfg.groupName,
    imageFile: relPath,
    targetBoard: getTargetBoard(cfg.groupKey, lang),
    pinTitle,
    pinDescription: pinDesc,
    destinationUrl: buildPinUrl({
      pathName: `/quiz/${cfg.slug}`,
      lang,
      campaign: `${cfg.groupKey}_${lang}`,
      content: 'question_hook',
    }),
  };
}

async function generateFormatCMemberCard(cfg, quiz, memberId, member, idx, totalMembers, lang) {
  const cardKey = cfg.cardGroupKey || cfg.groupKey;
  const palette = pickPaletteFromGradient(member.bgGradient);
  const displayName = shortMemberName(member.name);
  const initials = getMemberInitials(member.name);

  const rawTitle = lang === 'es' ? (member.titleEs || member.title) : member.title;
  const titleLines = wrapText(rawTitle, 32, 2);

  const twinPrefix = TWIN_PREFIX_BY_GROUP[cardKey] || cfg.groupName.toUpperCase();
  const rawTwin = lang === 'es' ? (member.skzooEs || member.skzoo || '') : (member.skzoo || '');
  const cleanTwin = stripEmojis(rawTwin);
  const twinBadgeText = cleanTwin ? `${twinPrefix}: ${cleanTwin}` : `${cfg.groupName} ARCHETYPE`;
  const twinFontSize = twinBadgeText.length > 36 ? 20 : 23;

  const rawTraits = lang === 'es' ? (member.traitsEs || member.traits || []) : (member.traits || []);
  const traits = rawTraits.slice(0, 3).map((t) => stripEmojis(t));

  const rawBest = lang === 'es' ? (member.bestMatchNameEs || member.bestMatchName) : member.bestMatchName;
  const bestClean = shortMemberName(rawBest);

  const serialNo = `NO. ${String(idx + 1).padStart(2, '0')}/${String(totalMembers).padStart(2, '0')}`;
  const headerTag = `${cfg.groupName.toUpperCase()}  •  PHOTOCARD`;
  const bestLabel =
    lang === 'es' ? `MEJOR QUÍMICA #1: ${bestClean.toUpperCase()}` : `#1 BEST CHEMISTRY: ${bestClean.toUpperCase()}`;
  const ctaText =
    lang === 'es'
      ? `¿ERES ${displayName.toUpperCase()}? HAZ EL TEST →`
      : `ARE YOU ${displayName.toUpperCase()}? TAKE QUIZ →`;

  const pinTitle =
    lang === 'es'
      ? `${cfg.groupName} Resultado: ${displayName} — ${stripEmojis(rawTitle)} ✨`
      : `${cfg.groupName} Soulmate Card: ${displayName} — ${stripEmojis(rawTitle)} ✨`;

  const pinDesc =
    lang === 'es'
      ? `Resultado de ${cfg.groupName}: ${displayName} ("${stripEmojis(rawTitle)}"). Rasgos clave: ${traits.join(', ')}. Mejor química: ${bestClean}. ¡Haz el test de 10 preguntas gratis y guarda tu card!`
      : `Got ${displayName} ("${stripEmojis(rawTitle)}") on the ${cfg.groupName} Personality Quiz! Traits: ${traits.join(', ')}. #1 Best Chemistry Match: ${bestClean}. Take the free 10-question test at K-Pulse!`;

  const mascot = await getResizedMascot(path.join(MASCOT_DIR, cfg.mascotFile), 76);

  const nameFontSize = displayName.length > 9 ? 66 : 78;
  const titleStartY = 588;
  const titleSvg = titleLines
    .map(
      (line, i) =>
        `<text x="500" y="${titleStartY + i * 40}" fill="${palette.accentDark}" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="31" font-weight="800" text-anchor="middle">${escapeXml(line)}</text>`
    )
    .join('\n');

  const twinPillY = titleLines.length > 1 ? 656 : 626;
  const traitsStartY = twinPillY + 86;

  const traitsSvg = traits
    .map((trait, tIdx) => {
      const boxY = traitsStartY + tIdx * 84;
      const tFontSize = trait.length > 34 ? 22 : 25;
      return `
      <rect x="112" y="${boxY}" width="776" height="68" rx="18" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2"/>
      <circle cx="150" cy="${boxY + 34}" r="9" fill="${palette.accent}"/>
      <text x="176" y="${boxY + 43}" fill="#1E293B" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="${tFontSize}" font-weight="700">#${escapeXml(trait)}</text>`;
    })
    .join('\n');

  const bestBoxY = traitsStartY + 270;

  const svg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${palette.top}"/>
        <stop offset="100%" stop-color="${palette.bottom}"/>
      </linearGradient>
    </defs>

    <!-- Vivid Member-Color Outer Photocard Frame -->
    <rect width="1000" height="1500" fill="url(#frameGrad)"/>

    <!-- Crisp Collector Card Body -->
    <rect x="44" y="44" width="912" height="1412" rx="40" fill="#FFFFFF"/>
    <rect x="64" y="64" width="872" height="1372" rx="30" fill="none" stroke="${palette.border}" stroke-width="2"/>

    <!-- Serial Header -->
    <rect x="100" y="96" width="380" height="44" rx="22" fill="${palette.softBg}" stroke="${palette.border}" stroke-width="1.5"/>
    <text x="290" y="125" fill="${palette.accentDark}" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="18" font-weight="900" letter-spacing="1.5" text-anchor="middle">
      ${escapeXml(headerTag)}
    </text>
    <text x="896" y="126" fill="#64748B" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="21" font-weight="800" letter-spacing="1.5" text-anchor="end">
      ${escapeXml(serialNo)}
    </text>

    <!-- Unique Member Crest Emblem + Small Mascot Seal -->
    <circle cx="500" cy="306" r="124" fill="${palette.softBg}" stroke="${palette.accent}" stroke-width="3" stroke-dasharray="10 8"/>
    <circle cx="500" cy="306" r="102" fill="url(#frameGrad)"/>
    <text x="500" y="335" fill="#FFFFFF" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="82" font-weight="900" text-anchor="middle" letter-spacing="2">
      ${escapeXml(initials)}
    </text>
    <circle cx="596" cy="396" r="48" fill="#FFFFFF" stroke="${palette.accent}" stroke-width="3"/>

    <!-- Member Name & Archetype -->
    <text x="500" y="520" fill="#0F172A" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="${nameFontSize}" font-weight="900" text-anchor="middle" letter-spacing="-1">
      ${escapeXml(displayName)}
    </text>
    ${titleSvg}

    <!-- Character Twin Pill -->
    <rect x="140" y="${twinPillY}" width="720" height="48" rx="24" fill="${palette.softBg}" stroke="${palette.border}" stroke-width="1.5"/>
    <text x="500" y="${twinPillY + 32}" fill="${palette.accentDark}" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="${twinFontSize}" font-weight="800" text-anchor="middle">
      ${escapeXml(twinBadgeText)}
    </text>

    <!-- 3 Trait Bars -->
    ${traitsSvg}

    <!-- #1 Best Chemistry Match Box -->
    <rect x="112" y="${bestBoxY}" width="776" height="84" rx="22" fill="${palette.softBg}" stroke="${palette.accent}" stroke-width="2.5"/>
    <text x="500" y="${bestBoxY + 52}" fill="${palette.accentDark}" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="25" font-weight="900" letter-spacing="0.8" text-anchor="middle">
      ${escapeXml(bestLabel)}
    </text>

    <!-- Bottom CTA Button -->
    <rect x="112" y="1244" width="776" height="90" rx="45" fill="${palette.accent}"/>
    <text x="500" y="1300" fill="#FFFFFF" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="28" font-weight="900" letter-spacing="0.8" text-anchor="middle">
      ${escapeXml(stripEmojis(ctaText))}
    </text>

    <!-- Footer -->
    <text x="500" y="1396" fill="#64748B" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="19" font-weight="800" letter-spacing="3.5" text-anchor="middle">
      KPULSEQUIZ.COM
    </text>
  </svg>`;

  const filename = `card-${cardKey}-${memberId}-${lang}.png`;
  const relPath = `public/images/pinterest/cards/${filename}`;
  const outPath = path.join(OUTPUT_DIR, 'cards', filename);

  const mascotLeft = Math.round(596 - mascot.info.width / 2);
  const mascotTop = Math.round(396 - mascot.info.height / 2);

  await writePng(svg, [{ input: mascot.data, left: mascotLeft, top: mascotTop }], outPath);

  return {
    format: 'Member Card',
    lang,
    group: cfg.groupName,
    imageFile: relPath,
    targetBoard: getTargetBoard(cardKey, lang),
    pinTitle,
    pinDescription: pinDesc,
    destinationUrl: buildPinUrl({
      pathName: `/quiz/${cfg.slug}`,
      lang,
      campaign: `${cardKey}_${lang}`,
      content: `card_${memberId}`,
    }),
  };
}

async function generateFormatDChemistry(chemGroup, accentCfg, lang) {
  const mascot = await getResizedMascot(path.join(MASCOT_DIR, chemGroup.mascotFile), 390);
  const accent = accentCfg ? accentCfg.accent : '#A855F7';

  const elementsByLang = {
    es: ['Madera', 'Fuego', 'Tierra', 'Metal', 'Agua'],
    en: ['Wood', 'Fire', 'Earth', 'Metal', 'Water'],
    pt: ['Madeira', 'Fogo', 'Terra', 'Metal', 'Água'],
  }[lang];

  const elementColors = ['#34D399', '#FB7185', '#FBBF24', '#CBD5E1', '#38BDF8'];
  const cx = 500;
  const cy = 625;
  const radius = 248;

  const elementNodesSvg = elementsByLang
    .map((elName, idx) => {
      const angle = (-90 + idx * 72) * (Math.PI / 180);
      const nx = Math.round(cx + radius * Math.cos(angle));
      const ny = Math.round(cy + radius * Math.sin(angle));
      return `
      <rect x="${nx - 72}" y="${ny - 24}" width="144" height="48" rx="24" fill="#17122B" stroke="${elementColors[idx]}" stroke-width="2.5"/>
      <text x="${nx}" y="${ny + 8}" fill="${elementColors[idx]}" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="21" font-weight="900" text-anchor="middle">${escapeXml(elName)}</text>`;
    })
    .join('\n');

  const top3Members = chemGroup.members.slice(0, 3);
  const samplePcts = [96, 91, 87];
  const memberBarsSvg = top3Members
    .map((m, idx) => {
      const barY = 950 + idx * 82;
      const pct = samplePcts[idx] || 85;
      const fillWidth = Math.round((740 * pct) / 100);
      return `
      <text x="130" y="${barY}" fill="#F8FAFC" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="800">${escapeXml(m.name)}  •  ${escapeXml(m.mbti)}</text>
      <text x="870" y="${barY}" fill="#F5C451" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="25" font-weight="900" text-anchor="end">${pct}%</text>
      <rect x="130" y="${barY + 14}" width="740" height="18" rx="9" fill="rgba(255,255,255,0.12)"/>
      <rect x="130" y="${barY + 14}" width="${fillWidth}" height="18" rx="9" fill="url(#goldBarGrad)"/>`;
    })
    .join('\n');

  const copy = {
    es: {
      headline1: '¿Tu % Real con',
      headline2: `${chemGroup.name}?`,
      stamp: '98% MATCH',
      cta: 'CALCULAR EN 10 SEG →',
      title: `Compatibilidad K-Saju × MBTI con ${chemGroup.name} ✨ Calcula Tu % Real`,
      desc: `Descubre tu porcentaje real de química con cada integrante de ${chemGroup.name} usando tu fecha de nacimiento (5 Elementos K-Saju) y tu MBTI. ¡Ranking completo en 10 segundos gratis!`,
    },
    en: {
      headline1: 'Your Real % Match',
      headline2: `With ${chemGroup.name}`,
      stamp: '98% MATCH',
      cta: 'CHECK IN 10 SEC →',
      title: `${chemGroup.name} K-Saju × MBTI Compatibility Calculator ✨ Real Birthdate %`,
      desc: `Check your real compatibility percentage with every ${chemGroup.name} member using Five Elements (K-Saju) + MBTI! Free full group ranking in 10 seconds at K-Pulse.`,
    },
    pt: {
      headline1: 'Seu % Real Com',
      headline2: `${chemGroup.name}`,
      stamp: '98% MATCH',
      cta: 'CALCULAR EM 10 SEG →',
      title: `Compatibilidade K-Saju × MBTI com ${chemGroup.name} ✨ Veja Seu % Real`,
      desc: `Descubra sua porcentagem real de química com cada membro do ${chemGroup.name} usando sua data de nascimento (Cinco Elementos K-Saju) e MBTI. Ranking completo em 10 segundos!`,
    },
  }[lang];

  const svg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mysticBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#070512"/>
        <stop offset="55%" stop-color="#130E2A"/>
        <stop offset="100%" stop-color="#1E143B"/>
      </linearGradient>
      <radialGradient id="auraGlow" cx="50%" cy="42%" r="45%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.38"/>
        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="goldBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${accent}"/>
        <stop offset="100%" stop-color="#F5C451"/>
      </linearGradient>
    </defs>

    <rect width="1000" height="1500" fill="url(#mysticBg)"/>
    <rect width="1000" height="1500" fill="url(#auraGlow)"/>
    <rect x="34" y="34" width="932" height="1432" rx="36" fill="none" stroke="rgba(245,196,81,0.28)" stroke-width="2"/>

    <!-- Top Celestial Pill -->
    <rect x="220" y="76" width="560" height="48" rx="24" fill="rgba(245,196,81,0.12)" stroke="#F5C451" stroke-width="1.5"/>
    <text x="500" y="108" fill="#F5C451" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="900" letter-spacing="2" text-anchor="middle">
      K-SAJU × MBTI COMPATIBILITY LAB
    </text>

    <!-- Headline -->
    <text x="500" y="206" fill="#FFFFFF" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="58" font-weight="800" text-anchor="middle">
      ${escapeXml(copy.headline1)}
    </text>
    <text x="500" y="294" fill="#F5C451" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="${chemGroup.name.length > 9 ? 74 : 84}" font-weight="900" text-anchor="middle" letter-spacing="-1">
      ${escapeXml(copy.headline2)}
    </text>

    <!-- Celestial 5-Element Ring -->
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="rgba(245,196,81,0.45)" stroke-width="2" stroke-dasharray="8 8"/>
    <circle cx="${cx}" cy="${cy}" r="185" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>
    ${elementNodesSvg}

    <!-- Gold Match Stamp -->
    <g transform="translate(745, 435) rotate(8)">
      <rect x="-105" y="-30" width="210" height="58" rx="14" fill="#F5C451"/>
      <text x="0" y="9" fill="#0B091A" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="26" font-weight="900" text-anchor="middle">
        ${escapeXml(copy.stamp)}
      </text>
    </g>

    <!-- Sample Top 3 Chemistry Bars -->
    ${memberBarsSvg}

    <!-- Gold Pill CTA -->
    <rect x="170" y="1244" width="660" height="94" rx="47" fill="#F5C451"/>
    <text x="500" y="1302" fill="#0B091A" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="31" font-weight="900" letter-spacing="1" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.cta))}
    </text>

    <text x="500" y="1408" fill="#94A3B8" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="800" letter-spacing="3.5" text-anchor="middle">
      KPULSEQUIZ.COM
    </text>
  </svg>`;

  const filename = `chem-${chemGroup.id}-${lang}.png`;
  const relPath = `public/images/pinterest/chemistry/${filename}`;
  const outPath = path.join(OUTPUT_DIR, 'chemistry', filename);

  const mascotLeft = Math.round(cx - mascot.info.width / 2);
  const mascotTop = Math.round(cy - mascot.info.height / 2);

  await writePng(svg, [{ input: mascot.data, left: mascotLeft, top: mascotTop }], outPath);

  return {
    format: 'K-Saju Chemistry',
    lang,
    group: chemGroup.name,
    imageFile: relPath,
    targetBoard: getTargetBoard(chemGroup.id, lang),
    pinTitle: copy.title,
    pinDescription: copy.desc,
    destinationUrl: buildPinUrl({
      pathName: `/chemistry/${chemGroup.id}`,
      lang,
      campaign: `${chemGroup.id}_chemistry_${lang}`,
      content: 'saju_mbti',
    }),
  };
}

const MAP_PIN_CONFIGS = [
  {
    id: 'bts',
    groupParam: 'bts',
    boardKey: 'bts',
    groupLabel: 'BTS',
    accent: '#7C3AED',
    mascotFile: 'hobi-bts-v2.png',
    hero: {
      file: 'bts-jumunjin-bus-stop/1.webp',
      label: {
        es: 'Parada BTS Jumunjin · Gangneung',
        en: 'Jumunjin BTS Bus Stop · Gangneung',
        pt: 'Ponto BTS Jumunjin · Gangneung',
      },
    },
    left: {
      file: 'bts-gyeongbokgung/1.webp',
      label: {
        es: 'Gyeongbokgung · Seúl',
        en: 'Gyeongbokgung · Seoul',
        pt: 'Gyeongbokgung · Seul',
      },
    },
    right: {
      file: 'bts-gamcheon-mural/1.webp',
      label: {
        es: 'Gamcheon · Busán',
        en: 'Gamcheon · Busan',
        pt: 'Gamcheon · Busan',
      },
    },
    spotsPreview: {
      es: 'HYBE HQ • Yoojung Sikdang • Jumunjin • Gamcheon +10 más',
      en: 'HYBE HQ • Yoojung Sikdang • Jumunjin • Gamcheon +10 more',
      pt: 'HYBE HQ • Yoojung Sikdang • Jumunjin • Gamcheon +10 locais',
    },
    copy: {
      es: {
        line1: 'Mapa de Lugares Reales de',
        line2: 'BTS en Corea del Sur',
        sub: '14 Lugares Verificados • Seúl, Busán y Gangneung',
        title: 'Mapa BTS en Corea 📍 14 Lugares Reales (Jumunjin, Yoojung, HYBE)',
        desc: 'Guarda este mapa interactivo de BTS para tu viaje a Corea: Parada de Jumunjin, Yoojung Sikdang, Palacio Gyeongbokgung, Aldea Gamcheon y HYBE con fotos reales y enlaces directos a Naver, Kakao y Google Maps.',
      },
      en: {
        line1: 'Real BTS Places to Visit',
        line2: 'Across South Korea',
        sub: '14 Verified Spots • Seoul, Busan & Gangneung',
        title: 'BTS Korea Travel Map 📍 14 Real ARMY Spots (Jumunjin, HYBE & Restaurants)',
        desc: 'Save this free BTS Korea bucket-list map! Explore 14 verified ARMY spots including Jumunjin BTS Bus Stop, Yoojung Sikdang, Gyeongbokgung Palace, Gamcheon Village, and HYBE HQ with 1-tap Naver, Kakao & Google Maps.',
      },
      pt: {
        line1: 'Lugares Reais do BTS',
        line2: 'Para Visitar na Coreia',
        sub: '14 Locais Verificados • Seul, Busan e Gangneung',
        title: 'Mapa BTS na Coreia 📍 14 Locais Reais (Jumunjin, Restaurantes e HYBE)',
        desc: 'Salve este mapa interativo do BTS para sua viagem à Coreia: Ponto de Ônibus em Jumunjin, Yoojung Sikdang, Palácio Gyeongbokgung, Vila Gamcheon e sede da HYBE com fotos reais e links para Naver e Google Maps.',
      },
    },
  },
  {
    id: 'blackpink',
    groupParam: 'blackpink',
    boardKey: 'blackpink',
    groupLabel: 'BLACKPINK',
    accent: '#DB2777',
    mascotFile: 'bomi-blackpink-v2.png',
    hero: {
      file: 'bp-bukchon-hanok/1.webp',
      label: {
        es: 'Aldea Bukchon Hanok · Seúl',
        en: 'Bukchon Hanok Village · Seoul',
        pt: 'Vila Bukchon Hanok · Seul',
      },
    },
    left: {
      file: 'bp-yg-hq/1.webp',
      label: {
        es: 'Sede YG · Hapjeong',
        en: 'YG HQ · Hapjeong',
        pt: 'Sede YG · Hapjeong',
      },
    },
    right: {
      file: 'bp-the-samee/1.webp',
      label: {
        es: 'Café the SameE · Seúl',
        en: 'the SameE Cafe · Seoul',
        pt: 'Café the SameE · Seul',
      },
    },
    spotsPreview: {
      es: 'YG HQ • the SameE • HAUS DOSAN • Bukchon +4 más',
      en: 'YG HQ • the SameE • HAUS DOSAN • Bukchon +4 more',
      pt: 'YG HQ • the SameE • HAUS DOSAN • Bukchon +4 locais',
    },
    copy: {
      es: {
        line1: 'Mapa de Lugares Reales de',
        line2: 'BLACKPINK en Seúl',
        sub: '8 Lugares Verificados • Hapjeong, Cheongdam y Bukchon',
        title: 'Mapa BLACKPINK en Seúl 📍 8 Lugares Reales (YG, Cafés y Fotos)',
        desc: 'Planea tu ruta BLINK por Seúl con fotos reales: sede de YG Entertainment, Café the SameE, HAUS DOSAN, restaurantes favoritos de las miembros y Aldea Bukchon Hanok con rutas directas en Naver y Google Maps.',
      },
      en: {
        line1: 'Real BLACKPINK Spots',
        line2: 'To Visit Across Seoul',
        sub: '8 Verified Spots • Hapjeong, Cheongdam & Bukchon',
        title: 'BLACKPINK Seoul Map 📍 8 Real BLINK Spots (YG HQ, Cafes & Filming Sites)',
        desc: 'Save this BLACKPINK Seoul travel guide! Explore 8 verified spots with real photos: YG Entertainment HQ, the SameE Cafe, HAUS DOSAN, Bukchon Hanok Village, and member-loved eateries with Naver & Google Maps links.',
      },
      pt: {
        line1: 'Lugares Reais BLACKPINK',
        line2: 'Para Visitar em Seul',
        sub: '8 Locais Verificados • Hapjeong, Cheongdam e Bukchon',
        title: 'Mapa BLACKPINK em Seul 📍 8 Locais Reais (YG, Cafés e Pontos de MV)',
        desc: 'Salve este roteiro BLINK em Seul com fotos reais: sede da YG Entertainment, Café the SameE, HAUS DOSAN, restaurantes favoritos das integrantes e Vila Bukchon Hanok com links diretos para Naver e Google Maps.',
      },
    },
  },
  {
    id: 'stray-kids',
    groupParam: 'stray-kids',
    boardKey: 'stray-kids',
    groupLabel: 'Stray Kids',
    accent: '#DC2626',
    mascotFile: 'hobi-skz-v2.png',
    hero: {
      file: 'skz-nodeul-island/1.webp',
      label: {
        es: 'Isla Nodeul · Río Han, Seúl',
        en: 'Nodeul Island · Han River, Seoul',
        pt: 'Ilha Nodeul · Rio Han, Seul',
      },
    },
    left: {
      file: 'skz-gimpo-laveniche/1.webp',
      label: {
        es: 'Canal Laveniche · Gimpo',
        en: 'Laveniche Canal · Gimpo',
        pt: 'Canal Laveniche · Gimpo',
      },
    },
    right: {
      file: 'skz-gwangalli-in/1.webp',
      label: {
        es: 'Playa Gwangalli · Busán',
        en: 'Gwangalli Beach · Busan',
        pt: 'Praia Gwangalli · Busan',
      },
    },
    spotsPreview: {
      es: 'JYP HQ • Mercado Gwangjang • Isla Nodeul • Gwangalli +4 más',
      en: 'JYP HQ • Gwangjang Market • Nodeul Island • Gwangalli +4 more',
      pt: 'JYP HQ • Mercado Gwangjang • Ilha Nodeul • Gwangalli +4 locais',
    },
    copy: {
      es: {
        line1: 'Mapa de Lugares Reales de',
        line2: 'Stray Kids en Corea',
        sub: '8 Lugares Verificados • Seúl, Gimpo y Busán',
        title: 'Mapa Stray Kids en Corea 📍 8 Lugares STAY Reales (JYP, Seúl y Busán)',
        desc: 'Descubre los 8 lugares reales de Stray Kids en Corea con fotos auténticas: sede de JYP, Isla Nodeul, Mercado Gwangjang, Myeongdong, Gimpo Laveniche y Playa Gwangalli en Busán con Naver y Google Maps.',
      },
      en: {
        line1: 'Real Stray Kids Spots',
        line2: 'Across Seoul & Busan',
        sub: '8 Verified Spots • JYP, Han River & Busan',
        title: 'Stray Kids Korea Map 📍 8 Real STAY Spots (JYP HQ, Nodeul Island & Foodie Picks)',
        desc: 'Save this Stray Kids Korea bucket-list map! Explore 8 verified SKZ locations with real photos: JYP Center, Nodeul Island, Gwangjang Market, Myeongdong Kalguksu, Gimpo Laveniche & Gwangalli Beach.',
      },
      pt: {
        line1: 'Lugares Reais Stray Kids',
        line2: 'Para Visitar na Coreia',
        sub: '8 Locais Verificados • Seul, Gimpo e Busan',
        title: 'Mapa Stray Kids na Coreia 📍 8 Locais Reais STAY (JYP, Seul e Busan)',
        desc: 'Salve este mapa de Stray Kids na Coreia com fotos reais: sede da JYP, Ilha Nodeul, Mercado Gwangjang, Myeongdong Kalguksu, Gimpo Laveniche e Praia Gwangalli com links diretos para Naver e Google Maps.',
      },
    },
  },
  {
    id: 'kpop-korea',
    groupParam: null,
    boardKey: 'multistan',
    groupLabel: 'All K-Pop',
    accent: '#DB2777',
    mascotFile: 'hobi-bts-v2.png',
    hero: {
      file: 'bp-bukchon-hanok/1.webp',
      label: {
        es: 'Seúl · Bukchon Hanok y N Tower',
        en: 'Seoul · Bukchon Hanok & N Tower',
        pt: 'Seul · Bukchon Hanok e N Tower',
      },
    },
    left: {
      file: 'bts-jumunjin-bus-stop/1.webp',
      label: {
        es: 'BTS · Parada Jumunjin',
        en: 'BTS · Jumunjin Bus Stop',
        pt: 'BTS · Ponto Jumunjin',
      },
    },
    right: {
      file: 'skz-gwangalli-in/1.webp',
      label: {
        es: 'Busán · Playa Gwangalli',
        en: 'Busan · Gwangalli Beach',
        pt: 'Busan · Praia Gwangalli',
      },
    },
    spotsPreview: {
      es: 'BTS (14) • BLACKPINK (8) • Stray Kids (8) · Fotos Reales',
      en: 'BTS (14) • BLACKPINK (8) • Stray Kids (8) · Real Photos',
      pt: 'BTS (14) • BLACKPINK (8) • Stray Kids (8) · Fotos Reais',
    },
    copy: {
      es: {
        line1: 'Guía y Mapa K-Pop en Corea',
        line2: 'BTS, BLACKPINK y Stray Kids',
        sub: '30 Lugares Reales • Agencias, Cafés y Sets de MV',
        title: 'Mapa Turístico K-Pop en Corea 📍 30 Lugares de BTS, BLACKPINK y Stray Kids',
        desc: 'Guarda el mapa definitivo para tu viaje a Corea: 30 lugares verificados de BTS, BLACKPINK y Stray Kids entre restaurantes, agencias (HYBE, YG, JYP), cafés y escenarios de MV con fotos reales y Naver/Google Maps.',
      },
      en: {
        line1: 'Ultimate Korea K-Pop Map',
        line2: 'BTS, BLACKPINK & Stray Kids',
        sub: '30 Real Spots • Agencies, Restaurants & MV Sites',
        title: 'Korea K-Pop Pilgrimage Map 📍 30 Verified BTS, BLACKPINK & Stray Kids Spots',
        desc: 'Planning a Korea trip? Save this free interactive map of 30 verified BTS, BLACKPINK, and Stray Kids spots across Seoul, Busan & Gangneung with real photos and 1-tap Naver, Kakao & Google Maps directions.',
      },
      pt: {
        line1: 'Guia e Mapa K-Pop na Coreia',
        line2: 'BTS, BLACKPINK e Stray Kids',
        sub: '30 Locais Reais • Agências, Restaurantes e MVs',
        title: 'Mapa de Viagem K-Pop na Coreia 📍 30 Locais de BTS, BLACKPINK e Stray Kids',
        desc: 'Planejando ir para a Coreia? Salve este mapa interativo grátis com 30 locais verificados do BTS, BLACKPINK e Stray Kids em Seul, Busan e Gangneung com fotos reais e rotas no Naver e Google Maps.',
      },
    },
  },
];

async function generateFormatEMap(mapCfg, lang) {
  const copy = mapCfg.copy[lang];
  const heroLabel = stripEmojis(mapCfg.hero.label[lang]);
  const leftLabel = stripEmojis(mapCfg.left.label[lang]);
  const rightLabel = stripEmojis(mapCfg.right.label[lang]);
  const spotsPreview = stripEmojis(mapCfg.spotsPreview[lang]);

  const badgeLabel =
    lang === 'es'
      ? 'GUARDA PARA TU VIAJE'
      : lang === 'pt'
      ? 'SALVE PARA SUA VIAGEM'
      : 'SAVE FOR KOREA TRIP';

  const featurePills =
    lang === 'es'
      ? ['FOTOS REALES', 'NAVER + GOOGLE MAPS', '100% GRATIS']
      : lang === 'pt'
      ? ['FOTOS REAIS', 'NAVER + GOOGLE MAPS', '100% GRÁTIS']
      : ['REAL PHOTOS', 'NAVER + GOOGLE MAPS', '100% FREE'];

  const ctaText =
    lang === 'es'
      ? 'ABRIR MAPA INTERACTIVO →'
      : lang === 'pt'
      ? 'ABRIR MAPA INTERATIVO →'
      : 'OPEN INTERACTIVE MAP →';

  const [heroBuf, leftBuf, rightBuf, mascot] = await Promise.all([
    makeRoundedPhotoBuffer(path.join(MAP_IMAGES_DIR, mapCfg.hero.file), 864, 372, 24),
    makeRoundedPhotoBuffer(path.join(MAP_IMAGES_DIR, mapCfg.left.file), 422, 282, 24),
    makeRoundedPhotoBuffer(path.join(MAP_IMAGES_DIR, mapCfg.right.file), 422, 282, 24),
    getResizedMascot(path.join(MASCOT_DIR, mapCfg.mascotFile), 76),
  ]);

  const heroPillW = Math.min(700, Math.max(250, Math.round(heroLabel.length * 12.6 + 48)));
  const leftPillW = Math.min(390, Math.max(190, Math.round(leftLabel.length * 11.2 + 40)));
  const rightPillW = Math.min(390, Math.max(190, Math.round(rightLabel.length * 11.2 + 40)));

  const line1Size = copy.line1.length > 26 ? 48 : 52;
  const line2Size = copy.line2.length > 25 ? 48 : 56;
  const spotsFontSize = spotsPreview.length > 55 ? 20 : 22;

  const featurePillsSvg = featurePills
    .map((label, idx) => {
      const pillX = 68 + idx * 295;
      return `
      <rect x="${pillX}" y="1062" width="274" height="54" rx="27" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
      <text x="${pillX + 137}" y="1096" fill="#0F172A" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="18" font-weight="800" letter-spacing="0.4" text-anchor="middle">
        ${escapeXml(stripEmojis(label))}
      </text>`;
    })
    .join('\n');

  const baseSvg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <rect width="1000" height="1500" fill="#FAF8F4"/>
    <rect x="0" y="0" width="1000" height="16" fill="${mapCfg.accent}"/>
    <rect x="32" y="36" width="936" height="1428" rx="34" fill="none" stroke="#E6DFD3" stroke-width="2.5"/>

    <!-- Top Masthead -->
    <text x="68" y="96" fill="#475569" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="3">
      K-PULSE TRAVEL MAP
    </text>
    <rect x="596" y="62" width="336" height="48" rx="24" fill="${mapCfg.accent}"/>
    <text x="764" y="93" fill="#FFFFFF" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="18" font-weight="900" letter-spacing="1" text-anchor="middle">
      ${escapeXml(stripEmojis(badgeLabel))}
    </text>

    <!-- Editorial 2-Line Headline -->
    <text x="500" y="192" fill="#0F172A" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="${line1Size}" font-weight="800" text-anchor="middle" letter-spacing="-0.5">
      ${escapeXml(stripEmojis(copy.line1))}
    </text>
    <text x="500" y="266" fill="${mapCfg.accent}" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="${line2Size}" font-weight="900" text-anchor="middle" letter-spacing="-1">
      ${escapeXml(stripEmojis(copy.line2))}
    </text>
    <text x="500" y="320" fill="#475569" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="23" font-weight="700" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.sub))}
    </text>

    <!-- Subtle Photo Frame Backdrops -->
    <rect x="64" y="352" width="872" height="380" rx="26" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    <rect x="64" y="744" width="430" height="290" rx="26" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    <rect x="506" y="744" width="430" height="290" rx="26" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>

    <!-- Feature Pills -->
    ${featurePillsSvg}

    <!-- Spots Summary Line -->
    <text x="500" y="1174" fill="#334155" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="${spotsFontSize}" font-weight="700" text-anchor="middle">
      ${escapeXml(spotsPreview)}
    </text>

    <!-- Dark Pill CTA -->
    <rect x="140" y="1222" width="720" height="94" rx="47" fill="#0F172A"/>
    <text x="500" y="1280" fill="#FFFFFF" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="30" font-weight="900" letter-spacing="0.8" text-anchor="middle">
      ${escapeXml(stripEmojis(ctaText))}
    </text>

    <!-- Footer -->
    <text x="500" y="1398" fill="#64748B" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="800" letter-spacing="3.5" text-anchor="middle">
      KPULSEQUIZ.COM/MAP
    </text>
  </svg>`;

  const overlaySvg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <!-- Hero Photo Location Pill -->
    <rect x="88" y="664" width="${heroPillW}" height="46" rx="23" fill="rgba(15,23,42,0.84)"/>
    <text x="112" y="694" fill="#FFFFFF" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="21" font-weight="800">
      ${escapeXml(heroLabel)}
    </text>

    <!-- Left Photo Location Pill -->
    <rect x="84" y="972" width="${leftPillW}" height="42" rx="21" fill="rgba(15,23,42,0.84)"/>
    <text x="104" y="1000" fill="#FFFFFF" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="18" font-weight="800">
      ${escapeXml(leftLabel)}
    </text>

    <!-- Right Photo Location Pill -->
    <rect x="526" y="972" width="${rightPillW}" height="42" rx="21" fill="rgba(15,23,42,0.84)"/>
    <text x="546" y="1000" fill="#FFFFFF" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="18" font-weight="800">
      ${escapeXml(rightLabel)}
    </text>

    <!-- Top-Right Circular Mascot Seal -->
    <circle cx="876" cy="412" r="50" fill="#FFFFFF" stroke="${mapCfg.accent}" stroke-width="3.5"/>
  </svg>`;

  const filename = `map-${mapCfg.id}-${lang}.png`;
  const relPath = `public/images/pinterest/maps/${filename}`;
  const outPath = path.join(OUTPUT_DIR, 'maps', filename);

  const mascotLeft = Math.round(876 - mascot.info.width / 2);
  const mascotTop = Math.round(412 - mascot.info.height / 2);

  await writePng(
    baseSvg,
    [
      { input: heroBuf, left: 68, top: 356 },
      { input: leftBuf, left: 68, top: 748 },
      { input: rightBuf, left: 510, top: 748 },
      { input: Buffer.from(overlaySvg), left: 0, top: 0 },
      { input: mascot.data, left: mascotLeft, top: mascotTop },
    ],
    outPath,
    88
  );

  return {
    format: 'Korea Travel Map',
    lang,
    group: mapCfg.groupLabel,
    imageFile: relPath,
    targetBoard: getTargetBoard(mapCfg.boardKey, lang),
    pinTitle: copy.title,
    pinDescription: copy.desc,
    destinationUrl: buildPinUrl({
      pathName: '/map',
      extraParams: mapCfg.groupParam ? { group: mapCfg.groupParam } : undefined,
      lang,
      campaign: `${mapCfg.id}_map_${lang}`,
      content: 'travel_map',
    }),
  };
}

const KOREAN_NAME_PIN_CONFIGS = [
  {
    id: 'celadon-studio',
    mode: 'specimen',
    bgStops: ['#064E3B', '#0F766E', '#0D9488'],
    cardStart: '#F0FDFA',
    cardEnd: '#CCFBF1',
    accent: '#0D9488',
    headerAccent: '#A7F3D0',
    ink: '#063B32',
    subInk: '#115E59',
    pillBg: '#CCFBF1',
    pillText: '#0F766E',
    dark: false,
    specimen: {
      origin: 'SOFIA  →',
      hangul: '한윤서',
      hanja: '韓潤瑞',
      roman: 'Han Yun-seo',
      phonetic: '/hahn yoon-suh/',
      aura: 'Celadon Saju · Water + Wood',
      seal: ['韓', '潤', '瑞', '印'],
      meaning: {
        es: 'Gracia brillante que nutre como la lluvia de primavera',
        en: 'Radiant grace that nourishes gently like spring rain',
        pt: 'Graça radiante que nutre como a chuva da primavera',
      },
    },
    copy: {
      es: {
        badge: 'GENERADOR K-SAJU · GRATIS',
        line1: '¿Cuál Sería Tu Nombre',
        line2: 'Coreano Según Tu Fecha?',
        sub: 'Con Significado Hanja, Audio Real y Sello 9:16',
        pills: ['AUDIO COREANO', 'SIGNIFICADO HANJA', 'TARJETA 9:16'],
        cta: 'CREAR MI NOMBRE COREANO →',
        title: '¿Cuál Es Tu Nombre Coreano Según Tu Cumpleaños? ✨ Generador K-Saju + Sello Hanja',
        desc: 'Ingresa tu fecha de nacimiento y descubre tus 3 nombres coreanos ideales equilibrados por los Cinco Elementos del K-Saju. Incluye significado real en Hanja, pronunciación en audio coreano, tarjeta ID 9:16 con sello tradicional y tu idol compatible.',
      },
      en: {
        badge: 'K-SAJU NAME STUDIO · FREE',
        line1: 'What Is Your Real',
        line2: 'Korean Name by Birthday?',
        sub: 'Authentic Hanja Meaning, Audio & 9:16 Seal ID Card',
        pills: ['KOREAN AUDIO', 'HANJA MEANING', '9:16 ID CARD'],
        cta: 'ISSUE MY KOREAN NAME →',
        title: 'What Is Your Korean Name? 🇰🇷 K-Saju Birthday Generator, Hanja Meaning & Seal Card',
        desc: 'Enter your birthday and style to get 3 authentic Korean names balanced by Korean Saju Five Elements. Hear native Korean pronunciation, unlock Hanja character meanings, save your 9:16 Hanji ID card, and match with 44 K-Pop idols.',
      },
      pt: {
        badge: 'ESTÚDIO K-SAJU · GRÁTIS',
        line1: 'Qual Seria Seu Nome',
        line2: 'Coreano Pelo Aniversário?',
        sub: 'Significado Hanja, Áudio em Coreano e Cartão 9:16',
        pills: ['ÁUDIO COREANO', 'HANJA AUTÊNTICO', 'CARTÃO 9:16'],
        cta: 'GERAR MEU NOME COREANO →',
        title: 'Qual É o Seu Nome Coreano? ✨ Gerador K-Saju com Hanja, Áudio e Cartão 9:16',
        desc: 'Informe sua data de nascimento para receber 3 nomes coreanos autênticos equilibrados pelos Cinco Elementos do K-Saju. Ouça a pronúncia em coreano, veja o significado em Hanja e baixe seu cartão 9:16 com selo tradicional.',
      },
    },
  },
  {
    id: 'rose-idol',
    mode: 'specimen',
    bgStops: ['#881337', '#BE123C', '#EA580C'],
    cardStart: '#FFF1F2',
    cardEnd: '#FFEDD5',
    accent: '#E11D48',
    headerAccent: '#FDE68A',
    ink: '#3B0A1A',
    subInk: '#881337',
    pillBg: '#FFE4E6',
    pillText: '#BE123C',
    dark: false,
    specimen: {
      origin: 'IDOL STAGE EDITION',
      hangul: '김서연',
      hanja: '金瑞妍',
      roman: 'Kim Seo-yeon',
      phonetic: '/kim suh-yun/',
      aura: 'Seoul Rose · Idol & Stage Aura',
      seal: ['金', '瑞', '妍', '印'],
      meaning: {
        es: 'Belleza luminosa y estrella afortunada sobre el escenario',
        en: 'Auspicious starlight with graceful and unforgettable charisma',
        pt: 'Beleza luminosa e brilho marcante de estrela no palco',
      },
    },
    copy: {
      es: {
        badge: 'EDICIÓN IDOL K-POP · GRATIS',
        line1: 'Tu Nombre Coreano',
        line2: 'Estilo Idol de K-Pop',
        sub: 'Elige Vibra Idol, Suave, Chic o K-Drama Clásico',
        pills: ['4 ESTILOS K-POP', 'TOP 3 NOMBRES', 'MATCH IDOL'],
        cta: 'DESCUBRIR MI NOMBRE →',
        title: 'Tu Nombre Coreano Estilo Idol K-Pop 💖 Prueba K-Saju + Hanja y Idol Compatible',
        desc: '¿Quieres saber cómo te llamarías si debutaras en Corea? Elige tu vibra (Idol, Suave, Chic o Clásico), ingresa tu cumpleaños y obtén 3 nombres coreanos con Hanja, pronunciación y tu compatibilidad con BTS, BLACKPINK y Stray Kids.',
      },
      en: {
        badge: 'K-POP IDOL EDITION · FREE',
        line1: 'Get Your K-Pop Idol',
        line2: 'Korean Stage Name',
        sub: 'Pick Idol, Soft, Chic, or Classic K-Drama Aura',
        pills: ['4 AURA STYLES', 'TOP 3 NAMES', 'IDOL MATCH'],
        cta: 'CREATE STAGE NAME →',
        title: 'Get Your K-Pop Idol Korean Name ✨ 4 Vibe Styles, Hanja & Soulmate Match',
        desc: 'Ever wondered what your Korean name would be as a K-Pop idol? Enter your birthday and vibe to unlock 3 curated Korean names with real Hanja meanings, Korean audio pronunciation, and your top matching K-Pop idol.',
      },
      pt: {
        badge: 'EDIÇÃO IDOL K-POP · GRÁTIS',
        line1: 'Seu Nome Coreano',
        line2: 'Estilo Idol de K-Pop',
        sub: 'Escolha a Vibe: Idol, Suave, Chic ou K-Drama',
        pills: ['4 ESTILOS', 'TOP 3 NOMES', 'IDOL MATCH'],
        cta: 'DESCOBRIR MEU NOME →',
        title: 'Descubra Seu Nome Coreano Estilo Idol K-Pop 💖 Hanja, Pronúncia e Match',
        desc: 'Escolha sua vibe (Idol, Suave, Chic ou Clássico) e informe seu aniversário para receber 3 nomes coreanos com significado em Hanja, áudio em coreano e seu idol mais compatível.',
      },
    },
  },
  {
    id: 'najeon-collector',
    mode: 'specimen',
    bgStops: ['#090D18', '#1E1B4B', '#134E4A'],
    cardStart: '#0F172A',
    cardEnd: '#0E2931',
    accent: '#5EEAD4',
    headerAccent: '#5EEAD4',
    ink: '#F8FAFC',
    subInk: '#CBD5E1',
    pillBg: 'rgba(94, 234, 212, 0.16)',
    pillText: '#99F6E4',
    dark: true,
    frameGrad: ['#2DD4BF', '#818CF8', '#F472B6'],
    specimen: {
      origin: 'NAJEON PEARL EDITION',
      hangul: '박지우',
      hanja: '朴智宇',
      roman: 'Park Ji-woo',
      phonetic: '/pahk jee-woo/',
      aura: 'Chic & Modern Seoul Edition',
      seal: ['朴', '智', '宇', '印'],
      meaning: {
        es: 'Sabiduría amplia como el universo en equilibrio nocturno',
        en: 'Clear wisdom and expansive spirit shining like mother-of-pearl',
        pt: 'Sabedoria ampla e brilho sereno em equilíbrio cósmico',
      },
    },
    copy: {
      es: {
        badge: 'EDICIÓN COLECCIONISTA 9:16',
        line1: 'Tu Tarjeta ID Coreana',
        line2: 'Con Sello Tradicional',
        sub: '6 Colores Incluyendo Nácar Najeon y Sello Rojo Hanja',
        pills: ['6 PALETAS COLOR', 'SELLO 2x2', 'PNG PARA STORIES'],
        cta: 'DESCARGAR MI TARJETA →',
        title: 'Tarjeta ID Coreana Personalizada 9:16 🇰🇷 Descarga Gratis en 6 Colores',
        desc: 'Personaliza tu tarjeta oficial con nombre coreano en Hangul, Hanja y sello rojo tradicional (낙관) en 6 estilos de color incluyendo Najeon Pearl oscuro. Perfecta para guardar en Pinterest o compartir en Instagram Stories.',
      },
      en: {
        badge: 'COLLECTOR EDITION · PNG 9:16',
        line1: 'Aesthetic Korean Name',
        line2: 'ID Card & Stamp Seal',
        sub: '6 Collector Color Themes Including Najeon Pearl',
        pills: ['6 COLOR THEMES', 'HANJA SEAL 2x2', 'FREE PNG'],
        cta: 'DESIGN MY ID CARD →',
        title: 'Custom Korean Name ID Card (9:16 Story PNG) 🖤 6 K-Saju Collector Palettes',
        desc: 'Create and download a printable 9:16 Korean Name ID card complete with Hangul, authentic Hanja characters, a traditional vermilion 2x2 seal stamp, and 6 colorful collector palettes including dark Najeon Pearl.',
      },
      pt: {
        badge: 'EDIÇÃO COLECIONADOR 9:16',
        line1: 'Seu Cartão ID Coreano',
        line2: 'Com Selo Tradicional',
        sub: '6 Paletas de Cores Incluindo Najeon Pearl Escuro',
        pills: ['6 PALETAS', 'SELO VERMELHO', 'PNG 9:16'],
        cta: 'BAIXAR MEU CARTÃO →',
        title: 'Cartão ID Coreano Personalizado 9:16 🇰🇷 6 Paletas K-Saju e Selo Hanja',
        desc: 'Gere seu nome coreano pelo K-Saju e baixe um cartão 9:16 de colecionador com escrita em Hangul, significado em Hanja, áudio real e carimbo vermelho tradicional em 6 cores.',
      },
    },
  },
  {
    id: 'iris-surnames',
    mode: 'surnames',
    bgStops: ['#1E1B4B', '#4338CA', '#7C3AED'],
    accent: '#6D28D9',
    headerAccent: '#C4B5FD',
    surnames: [
      { hangul: '김', roman: 'Kim', hanja: '金', idols: 'V, Jennie, RM, Jin' },
      { hangul: '이', roman: 'Lee', hanja: '李', idols: 'Felix, Heeseung' },
      { hangul: '박', roman: 'Park', hanja: '朴', idols: 'Jimin, Rosé, Sunghoon' },
      { hangul: '전', roman: 'Jeon', hanja: '全', idols: 'Jungkook, Soyeon' },
      { hangul: '최', roman: 'Choi', hanja: '崔', idols: 'San, Beomgyu, Yeonjun' },
      { hangul: '한', roman: 'Han', hanja: '韓', idols: 'HAN (Stray Kids)' },
    ],
    copy: {
      es: {
        badge: 'GUÍA DE APELLIDOS COREANOS',
        line1: 'Apellidos Coreanos y',
        line2: 'Qué Idols los Comparten',
        sub: 'Descubre qué apellido combina mejor con tu fecha K-Saju',
        pills: ['20 APELLIDOS REALES', '60 NOMBRES', 'ELEMENTOS SAJU'],
        cta: 'VER MI APELLIDO IDEAL →',
        title: 'Guía de Apellidos Coreanos y Idols de K-Pop ✨ Significado Hanja y K-Saju',
        desc: '¿Kim, Lee, Park, Jeon o Han? Guarda esta guía visual con los apellidos coreanos más famosos del K-Pop, sus caracteres Hanja y descubre gratis cuál armoniza con tu fecha de nacimiento en K-Saju.',
      },
      en: {
        badge: 'KOREAN SURNAMES CHEAT SHEET',
        line1: 'Korean Family Surnames',
        line2: 'Shared by K-Pop Idols',
        sub: 'Pair 20 traditional surnames with your Five Elements',
        pills: ['20 SURNAMES', '60 GIVEN NAMES', 'HANJA GUIDE'],
        cta: 'FIND MY SURNAME →',
        title: 'Korean Family Surnames & K-Pop Idols Guide 📌 Hanja Meanings & K-Saju Match',
        desc: 'Save this Korean surnames cheat sheet! Learn the Hanja meanings behind Kim, Lee, Park, Jeon, Choi, and Han—and generate a full Korean name balanced to your birthday.',
      },
      pt: {
        badge: 'GUIA DE SOBRENOMES COREANOS',
        line1: 'Sobrenomes Coreanos',
        line2: 'Mais Famosos no K-Pop',
        sub: 'Descubra qual sobrenome combina com seu aniversário',
        pills: ['20 SOBRENOMES', '60 NOMES', 'GUIA HANJA'],
        cta: 'DESCOBRIR MEU SOBRENOME →',
        title: 'Guia de Sobrenomes Coreanos e Idols K-Pop 📌 Hanja e Combinação K-Saju',
        desc: 'Kim, Lee, Park, Jeon, Choi ou Han? Salve este guia com o significado em Hanja dos sobrenomes coreanos e gere gratuitamente seu nome coreano completo pelo K-Saju.',
      },
    },
  },
  {
    id: 'water-elements',
    mode: 'elements',
    bgStops: ['#082F49', '#0369A1', '#0891B2'],
    accent: '#0284C7',
    headerAccent: '#67E8F9',
    elements: [
      { hanja: '木', dot: '#10B981', en: 'Wood · Creative & Warm', es: 'Madera · Creativa y Cálida', pt: 'Madeira · Criativa e Calorosa', rule: 'Water feeds Wood' },
      { hanja: '火', dot: '#F43F5E', en: 'Fire · Radiant & Bold', es: 'Fuego · Radiante y Audaz', pt: 'Fogo · Radiante e Intenso', rule: 'Wood fuels Fire' },
      { hanja: '土', dot: '#F59E0B', en: 'Earth · Steady & Noble', es: 'Tierra · Firme y Noble', pt: 'Terra · Firme e Leal', rule: 'Fire enriches Earth' },
      { hanja: '金', dot: '#8B5CF6', en: 'Metal · Crisp & Iconic', es: 'Metal · Claro y Sofisticado', pt: 'Metal · Brilhante e Único', rule: 'Earth yields Metal' },
      { hanja: '水', dot: '#0EA5E9', en: 'Water · Poetic & Deep', es: 'Agua · Poética y Profunda', pt: 'Água · Poética e Intuitiva', rule: 'Metal purifies Water' },
    ],
    copy: {
      es: {
        badge: 'ASTROLOGÍA COREANA · CINCO ELEMENTOS',
        line1: 'Tu Elemento K-Saju y',
        line2: 'Tu Nombre de la Suerte',
        sub: 'El método tradicional coreano de armonía 상생 por cumpleaños',
        pills: ['5 ELEMENTOS', 'SUERTE POR FECHA', 'AUDIO COREANO'],
        cta: 'CALCULAR MI ELEMENTO →',
        title: 'Los Cinco Elementos del K-Saju Coreano 🌊 Descubre Tu Nombre de la Suerte',
        desc: '¿Madera, Fuego, Tierra, Metal o Agua? En la tradición coreana del Saju, tu fecha de nacimiento revela qué elemento equilibra tu energía. Obtén gratis tus 3 nombres coreanos con significado Hanja.',
      },
      en: {
        badge: 'KOREAN SAJU FIVE ELEMENTS',
        line1: 'Balance Your Birthday',
        line2: 'With 5-Element Naming',
        sub: 'How traditional Korean Saju chooses auspicious Hanja',
        pills: ['5 ELEMENTS', 'BIRTHDAY SAJU', 'HANJA MEANING'],
        cta: 'CHECK MY ELEMENT →',
        title: 'Korean Saju Five Elements Name Guide 🌊 Wood, Fire, Earth, Metal & Water',
        desc: 'Learn how traditional Korean Saju naming balances your birthday Day Master element (Wood, Fire, Earth, Metal, or Water) with harmonizing Hanja characters and try our free name generator.',
      },
      pt: {
        badge: 'ASTROLOGIA COREANA · 5 ELEMENTOS',
        line1: 'Seu Elemento K-Saju e',
        line2: 'Nome da Sorte Coreano',
        sub: 'Como a tradição coreana equilibra sua data de nascimento',
        pills: ['5 ELEMENTOS', 'DATA DE NASCIMENTO', 'HANJA REAL'],
        cta: 'CALCULAR MEU ELEMENTO →',
        title: 'Cinco Elementos do K-Saju Coreano 🌊 Descubra Seu Elemento e Nome Ideal',
        desc: 'Madeira, Fogo, Terra, Metal ou Água? Veja como o K-Saju coreano combina os cinco elementos pela sua data de nascimento para criar um nome coreano autêntico e harmonioso.',
      },
    },
  },
  {
    id: 'amber-kdrama',
    mode: 'specimen',
    bgStops: ['#78350F', '#B45309', '#D97706'],
    cardStart: '#FFFBEB',
    cardEnd: '#FEF3C7',
    accent: '#B45309',
    headerAccent: '#FDE68A',
    ink: '#381E08',
    subInk: '#78350F',
    pillBg: '#FEF3C7',
    pillText: '#92400E',
    dark: false,
    specimen: {
      origin: 'CLASSIC K-DRAMA & UNISEX',
      hangul: '서지안',
      hanja: '徐智安',
      roman: 'Seo Ji-an',
      phonetic: '/suh jee-ahn/',
      aura: 'Classic & Noble Aesthetic',
      seal: ['徐', '智', '安', '印'],
      meaning: {
        es: 'Elegancia tranquila y sabiduría atemporal de protagonista',
        en: 'Calm wisdom and graceful poise worthy of a K-Drama lead',
        pt: 'Elegância clássica e sabedoria serena de protagonista',
      },
    },
    copy: {
      es: {
        badge: 'NOMBRES ESTÉTICOS DE K-DRAMA',
        line1: 'Nombres Coreanos Más',
        line2: 'Bonitos y Unisex en Hangul',
        sub: 'Opciones Femeninas, Masculinas y Unisex con Significado',
        pills: ['UNISEX Y GÉNERO', 'PRONUNCIACIÓN', '100% GRATIS'],
        cta: 'VER MIS 3 NOMBRES →',
        title: 'Nombres Coreanos Bonitos y Unisex ✨ Significado en Español y Audio K-Saju',
        desc: 'Explora nombres coreanos elegantes estilo K-Drama (femeninos, masculinos o unisex) personalizados con tu cumpleaños. Escucha su pronunciación real y guarda tu tarjeta coreana gratis.',
      },
      en: {
        badge: 'AESTHETIC K-DRAMA NAMES',
        line1: 'Pretty & Unisex',
        line2: 'Korean Names in Hangul',
        sub: 'Curated Feminine, Masculine & Unisex Picks by Saju',
        pills: ['UNISEX OPTIONS', 'AUDIO GUIDE', '100% FREE'],
        cta: 'GET 3 CURATED NAMES →',
        title: 'Pretty & Unisex Korean Names With Meanings ✨ K-Drama & Hangul Studio',
        desc: 'Looking for an aesthetic feminine, masculine, or unisex Korean name? Generate 3 curated Hangul names with real Hanja meanings, romanized phonetics, and Korean audio in seconds.',
      },
      pt: {
        badge: 'NOMES ESTÉTICOS DE K-DRAMA',
        line1: 'Nomes Coreanos Lindos',
        line2: 'e Unissex em Hangul',
        sub: 'Opções Femininas, Masculinas e Unissex pelo K-Saju',
        pills: ['OPÇÕES UNISSEX', 'PRONÚNCIA REAL', '100% GRÁTIS'],
        cta: 'VER MEUS 3 NOMES →',
        title: 'Nomes Coreanos Bonitos e Unissex ✨ Significado Hanja e Pronúncia Real',
        desc: 'Descubra nomes coreanos estilosos de K-Drama (femininos, masculinos ou unissex) gerados pela sua data de nascimento com áudio em coreano e cartão ID para salvar.',
      },
    },
  },
];

async function generateFormatFKoreanName(cfg, lang) {
  const copy = cfg.copy[lang];
  const pillsSvg = copy.pills
    .map((label, idx) => {
      const px = 68 + idx * 295;
      return `
      <rect x="${px}" y="1058" width="274" height="54" rx="27" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.28)" stroke-width="1.5"/>
      <text x="${px + 137}" y="1091" fill="#FFFFFF" font-family="${FONT_KOREAN}" font-size="18" font-weight="800" text-anchor="middle">
        ${escapeXml(stripEmojis(label))}
      </text>`;
    })
    .join('\n');

  let centerCardSvg = '';

  if (cfg.mode === 'specimen') {
    const sp = cfg.specimen;
    const meaningLines = wrapText(sp.meaning[lang], 38, 2);
    const frameFill = cfg.dark ? 'url(#frameGrad)' : 'rgba(255,255,255,0.28)';
    centerCardSvg = `
    <rect x="74" y="366" width="852" height="650" rx="34" fill="${frameFill}"/>
    <rect x="80" y="372" width="840" height="638" rx="30" fill="url(#cardGrad)" stroke="${cfg.dark ? 'rgba(129,140,248,0.45)' : 'rgba(255,255,255,0.85)'}" stroke-width="2"/>
    <path d="M 80 402 Q 80 372 110 372 L 890 372 Q 920 372 920 402 L 920 442 L 80 442 Z" fill="${cfg.accent}"/>
    <text x="120" y="414" fill="#FFFFFF" font-family="${FONT_KOREAN}" font-size="18" font-weight="800" letter-spacing="1.5">
      K-PULSE · OFFICIAL KOREAN NAME ID
    </text>
    <text x="880" y="414" fill="rgba(255,255,255,0.88)" font-family="${FONT_KOREAN}" font-size="17" font-weight="700" text-anchor="end">
      K-SAJU EDITION
    </text>

    <!-- Aura Pill -->
    <rect x="124" y="476" width="420" height="44" rx="22" fill="${cfg.pillBg}" stroke="${cfg.accent}" stroke-width="1.5"/>
    <text x="334" y="505" fill="${cfg.pillText}" font-family="${FONT_KOREAN}" font-size="19" font-weight="800" text-anchor="middle">
      ${escapeXml(stripEmojis(sp.aura))}
    </text>

    <!-- Origin -->
    <text x="128" y="564" fill="${cfg.subInk}" font-family="${FONT_KOREAN}" font-size="22" font-weight="800" letter-spacing="1.5">
      ${escapeXml(sp.origin)}
    </text>

    <!-- Hero Hangul -->
    <text x="124" y="694" fill="${cfg.ink}" font-family="${FONT_KOREAN}" font-size="118" font-weight="900">
      ${escapeXml(sp.hangul)}
    </text>

    <!-- Romanized + Phonetic + Hanja -->
    <text x="128" y="758" fill="${cfg.ink}" font-family="${FONT_KOREAN}" font-size="38" font-weight="800">
      ${escapeXml(sp.roman)}
    </text>
    <text x="128" y="802" fill="${cfg.subInk}" font-family="${FONT_KOREAN}" font-size="25" font-weight="700">
      ${escapeXml(sp.phonetic)}  ·  ${escapeXml(sp.hanja)}
    </text>

    <!-- Traditional 2x2 Vermilion Square Seal Stamp -->
    <g transform="translate(776, 622) rotate(-4)">
      <rect x="-86" y="-86" width="172" height="172" rx="16" fill="#C8322B" ${cfg.dark ? 'stroke="rgba(255,249,242,0.45)" stroke-width="3"' : ''}/>
      <rect x="-74" y="-74" width="148" height="148" rx="10" fill="none" stroke="rgba(255,249,242,0.88)" stroke-width="4"/>
      <line x1="0" y1="-64" x2="0" y2="64" stroke="rgba(255,249,242,0.28)" stroke-width="1.5"/>
      <line x1="-64" y1="0" x2="64" y2="0" stroke="rgba(255,249,242,0.28)" stroke-width="1.5"/>
      <text x="34" y="-20" fill="#FFF9F2" font-family="${FONT_KOREAN}" font-size="44" font-weight="900" text-anchor="middle">${escapeXml(sp.seal[0])}</text>
      <text x="34" y="48" fill="#FFF9F2" font-family="${FONT_KOREAN}" font-size="44" font-weight="900" text-anchor="middle">${escapeXml(sp.seal[1])}</text>
      <text x="-34" y="-20" fill="#FFF9F2" font-family="${FONT_KOREAN}" font-size="44" font-weight="900" text-anchor="middle">${escapeXml(sp.seal[2])}</text>
      <text x="-34" y="48" fill="#FFF9F2" font-family="${FONT_KOREAN}" font-size="44" font-weight="900" text-anchor="middle">${escapeXml(sp.seal[3])}</text>
    </g>

    <!-- Bottom Meaning -->
    <line x1="124" y1="844" x2="876" y2="844" stroke="${cfg.dark ? 'rgba(148,163,184,0.26)' : 'rgba(15,23,42,0.12)'}" stroke-width="2"/>
    ${meaningLines
      .map(
        (line, i) => `
    <text x="128" y="${896 + i * 40}" fill="${cfg.subInk}" font-family="${FONT_KOREAN}" font-size="25" font-weight="700">
      ${escapeXml(line)}
    </text>`
      )
      .join('')}
    `;
  } else if (cfg.mode === 'surnames') {
    centerCardSvg = cfg.surnames
      .map((item, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const cx = 78 + col * 432;
        const cy = 368 + row * 218;
        return `
        <rect x="${cx}" y="${cy}" width="412" height="198" rx="24" fill="#FFFFFF" stroke="rgba(255,255,255,0.65)" stroke-width="2"/>
        <text x="${cx + 32}" y="${cy + 78}" fill="#1E1B4B" font-family="${FONT_KOREAN}" font-size="56" font-weight="900">
          ${escapeXml(item.hangul)}
        </text>
        <text x="${cx + 106}" y="${cy + 74}" fill="#312E81" font-family="${FONT_KOREAN}" font-size="36" font-weight="800">
          ${escapeXml(item.roman)}
        </text>
        <rect x="${cx + 318}" y="${cy + 30}" width="64" height="58" rx="14" fill="#EDE9FE"/>
        <text x="${cx + 350}" y="${cy + 72}" fill="#5B21B6" font-family="${FONT_KOREAN}" font-size="36" font-weight="900" text-anchor="middle">
          ${escapeXml(item.hanja)}
        </text>
        <line x1="${cx + 28}" y1="${cy + 114}" x2="${cx + 384}" y2="${cy + 114}" stroke="#E2E8F0" stroke-width="1.5"/>
        <text x="${cx + 32}" y="${cy + 158}" fill="#475569" font-family="${FONT_KOREAN}" font-size="22" font-weight="700">
          ${escapeXml(item.idols)}
        </text>`;
      })
      .join('\n');
  } else {
    centerCardSvg = cfg.elements
      .map((el, idx) => {
        const ey = 368 + idx * 128;
        const labelText = lang === 'es' ? el.es : lang === 'pt' ? el.pt : el.en;
        return `
        <rect x="84" y="${ey}" width="832" height="112" rx="24" fill="#FFFFFF" stroke="rgba(255,255,255,0.65)" stroke-width="2"/>
        <circle cx="152" cy="${ey + 56}" r="36" fill="${el.dot}"/>
        <text x="152" y="${ey + 70}" fill="#FFFFFF" font-family="${FONT_KOREAN}" font-size="40" font-weight="900" text-anchor="middle">
          ${escapeXml(el.hanja)}
        </text>
        <text x="216" y="${ey + 48}" fill="#0F172A" font-family="${FONT_KOREAN}" font-size="28" font-weight="900">
          ${escapeXml(labelText)}
        </text>
        <text x="216" y="${ey + 86}" fill="#475569" font-family="${FONT_KOREAN}" font-size="21" font-weight="700">
          ${escapeXml(el.rule)}
        </text>`;
      })
      .join('\n');
  }

  const line1Size = copy.line1.length > 26 ? 44 : 50;
  const line2Size = copy.line2.length > 25 ? 46 : 54;
  const footerPath =
    lang === 'en'
      ? 'KPULSEQUIZ.COM/KOREAN-NAME'
      : `KPULSEQUIZ.COM/${lang.toUpperCase()}/KOREAN-NAME`;

  const svg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${cfg.bgStops[0]}"/>
        <stop offset="52%" stop-color="${cfg.bgStops[1]}"/>
        <stop offset="100%" stop-color="${cfg.bgStops[2]}"/>
      </linearGradient>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${cfg.cardStart || '#FFFFFF'}"/>
        <stop offset="100%" stop-color="${cfg.cardEnd || '#FFFFFF'}"/>
      </linearGradient>
      ${
        cfg.frameGrad
          ? `<linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${cfg.frameGrad[0]}"/>
              <stop offset="50%" stop-color="${cfg.frameGrad[1]}"/>
              <stop offset="100%" stop-color="${cfg.frameGrad[2]}"/>
            </linearGradient>`
          : ''
      }
    </defs>

    <rect width="1000" height="1500" fill="url(#bgGrad)"/>
    <rect x="28" y="28" width="944" height="1444" rx="38" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="2.5"/>

    <!-- Top Badge -->
    <rect x="220" y="64" width="560" height="46" rx="23" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.34)" stroke-width="1.5"/>
    <text x="500" y="94" fill="#FFFFFF" font-family="${FONT_KOREAN}" font-size="18" font-weight="900" letter-spacing="1.6" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.badge))}
    </text>

    <!-- Headline -->
    <text x="500" y="190" fill="#FFFFFF" font-family="${FONT_KOREAN}" font-size="${line1Size}" font-weight="800" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.line1))}
    </text>
    <text x="500" y="262" fill="${cfg.headerAccent}" font-family="${FONT_KOREAN}" font-size="${line2Size}" font-weight="900" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.line2))}
    </text>
    <text x="500" y="316" fill="rgba(255,255,255,0.88)" font-family="${FONT_KOREAN}" font-size="22" font-weight="700" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.sub))}
    </text>

    ${centerCardSvg}
    ${pillsSvg}

    <!-- Bright Contrast Pill CTA -->
    <rect x="140" y="1174" width="720" height="96" rx="48" fill="#FFFFFF"/>
    <text x="500" y="1233" fill="#0F172A" font-family="${FONT_KOREAN}" font-size="29" font-weight="900" letter-spacing="0.6" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.cta))}
    </text>

    <!-- Localized URL Footer -->
    <text x="500" y="1364" fill="rgba(255,255,255,0.85)" font-family="${FONT_KOREAN}" font-size="20" font-weight="800" letter-spacing="3" text-anchor="middle">
      ${escapeXml(footerPath)}
    </text>
  </svg>`;

  const filename = `kname-${cfg.id}-${lang}.png`;
  const relPath = `public/images/pinterest/korean-name/${filename}`;
  const outPath = path.join(OUTPUT_DIR, 'korean-name', filename);

  await writePng(svg, [], outPath, 90);

  return {
    isNewPack: true,
    format: 'Korean Name Studio',
    lang,
    group: 'Korean Name',
    imageFile: relPath,
    targetBoard: getTargetBoard('korean-name', lang),
    pinTitle: copy.title,
    pinDescription: copy.desc,
    destinationUrl: buildPinUrl({
      pathName: '/korean-name',
      lang,
      campaign: `korean_name_${cfg.id}_${lang}`,
      content: cfg.id,
    }),
  };
}

const COURSE_PIN_CONFIGS = [
  {
    id: 'bts-seoul-heritage',
    slug: 'bts-seoul-heritage-day',
    groupLabel: 'BTS',
    accent: '#7C3AED',
    durationHours: 6,
    photos: ['bts-hybe-hq/1.webp', 'bts-yoojung-sikdang/1.webp', 'bts-gyeongbokgung/1.webp'],
    stops: [
      { label: 'HYBE Yongsan HQ', sub: 'Yongsan-gu · Sinyongsan Exit 2' },
      { label: 'Yoojung Sikdang', sub: 'Nonhyeon · BTS Rookie Diner' },
      { label: 'Geumdwaeji (Gold Pig) BBQ', sub: 'Yaksu · Idol Favorite Pork' },
      { label: 'Gyeongbokgung Geunjeongjeon', sub: 'Jongno · BTS "IDOL" Stage' },
    ],
    copy: {
      es: {
        badge: '6H · 4 PARADAS EN SEÚL',
        line1: 'Ruta Completa BTS en Seúl',
        line2: 'HYBE, Yoojung y Palacio IDOL',
        sub: 'Itinerario paso a paso conectado en metro',
        cta: 'VER RUTA COMPLETA →',
        title: 'Itinerario BTS en Seúl 1 Día 💜 HYBE, Yoojung Sikdang, Gold Pig BBQ y Gyeongbokgung',
        desc: 'Guarda esta ruta BTS de 6 horas por Seúl paso a paso: Sede de HYBE en Yongsan, comedor clásico Yoojung Sikdang, Gold Pig BBQ en Yaksu y el Palacio Gyeongbokgung de IDOL con mapa y enlaces a Naver Maps.',
      },
      en: {
        badge: '6H · 4 STOPS IN SEOUL',
        line1: '1-Day BTS Seoul Itinerary',
        line2: 'HYBE, Yoojung & Palace IDOL',
        sub: 'Step-by-step ARMY walking & subway route',
        cta: 'OPEN COURSE ROUTE →',
        title: '1-Day BTS Seoul Itinerary 💜 HYBE HQ, Yoojung Sikdang, Gold Pig BBQ & Gyeongbokgung',
        desc: 'Save this 6-hour BTS Seoul pilgrimage itinerary! Connects HYBE Yongsan, BTS trainee diner Yoojung Sikdang, Gold Pig BBQ, and Gyeongbokgung Palace with numbered map pins and Naver Maps links.',
      },
      pt: {
        badge: '6H · 4 PARADAS EM SEUL',
        line1: 'Roteiro BTS 1 Dia em Seul',
        line2: 'HYBE, Yoojung e Palácio IDOL',
        sub: 'Roteiro passo a passo de metrô pela cidade',
        cta: 'VER ROTEIRO COMPLETO →',
        title: 'Roteiro BTS de 1 Dia em Seul 💜 HYBE, Yoojung Sikdang, Gold Pig BBQ e Gyeongbokgung',
        desc: 'Salve este roteiro ARMY de 6 horas em Seul: sede da HYBE em Yongsan, restaurante Yoojung Sikdang, Gold Pig BBQ e Palácio Gyeongbokgung com mapa numerado e links no Naver Maps.',
      },
    },
  },
  {
    id: 'bts-busan-ocean',
    slug: 'bts-busan-jimin-jungkook-tour',
    groupLabel: 'BTS',
    accent: '#0284C7',
    durationHours: 6.5,
    photos: ['bts-gamcheon-mural/1.webp', 'bts-busan-oryukdo/1.webp', 'bts-busan-dadaepo/1.webp'],
    stops: [
      { label: 'Gamcheon Culture Village Mural', sub: 'Saha-gu · Jimin & Jungkook' },
      { label: 'Oryukdo Skywalk', sub: 'Nam-gu · Ocean Glass Ledge' },
      { label: 'Dadaepo Beach Sunset', sub: 'Saha-gu · Jimin Vlog Spot' },
    ],
    copy: {
      es: {
        badge: '6.5H · 3 PARADAS EN BUSÁN',
        line1: 'Tour BTS en Busán de',
        line2: 'Jimin y Jungkook al Atardecer',
        sub: 'De los murales de Gamcheon a las playas de Oryukdo y Dadaepo',
        cta: 'ABRIR RUTA DE BUSÁN →',
        title: 'Tour BTS en Busán 🌊 Mural de Jimin y Jungkook en Gamcheon, Oryukdo y Playa Dadaepo',
        desc: 'Recorre la ciudad natal de Jimin y Jungkook en 1 día: el mural gigante de Gamcheon Culture Village, el mirador de cristal Oryukdo Skywalk y el atardecer en la playa Dadaepo.',
      },
      en: {
        badge: '6.5H · 3 STOPS IN BUSAN',
        line1: 'Busan Jimin & Jungkook',
        line2: 'Ocean Pilgrimage Itinerary',
        sub: 'Gamcheon Murals, Oryukdo Skywalk & Dadaepo Sunset',
        cta: 'OPEN BUSAN ROUTE →',
        title: 'Busan BTS Travel Itinerary 🌊 Gamcheon Mural, Oryukdo Skywalk & Dadaepo Beach',
        desc: 'Explore Jimin and Jungkook’s Busan in one coastal route! Includes Gamcheon Culture Village giant mural, Oryukdo Skywalk glass ocean ledge, and Dadaepo Beach sunset with Naver & Kakao directions.',
      },
      pt: {
        badge: '6.5H · 3 PARADAS EM BUSAN',
        line1: 'Roteiro BTS em Busan:',
        line2: 'Jimin e Jungkook no Litoral',
        sub: 'De Gamcheon ao mirante de vidro Oryukdo e Dadaepo',
        cta: 'ABRIR ROTEIRO BUSAN →',
        title: 'Roteiro BTS em Busan 🌊 Mural Gamcheon, Oryukdo Skywalk e Pôr do Sol em Dadaepo',
        desc: 'Visite a cidade natal de Jimin e Jungkook: o mural gigante de Gamcheon Culture Village, a passarela de vidro Oryukdo Skywalk e a praia de Dadaepo com mapa interativo.',
      },
    },
  },
  {
    id: 'bts-daegu-walk',
    slug: 'bts-daegu-v-suga-walk',
    groupLabel: 'BTS',
    accent: '#9333EA',
    durationHours: 3.5,
    photos: ['bts-daegu-v-mural/1.webp', 'bts-daegu-v-mural/2.webp', 'bts-daegu-dalseong-park/1.webp'],
    stops: [
      { label: 'Daegu BTS V Mural Street', sub: 'Seo-gu · Daeseong Elementary' },
      { label: 'Dalseong Park Earthen Wall', sub: 'Jung-gu · SUGA Hometown Walk' },
    ],
    copy: {
      es: {
        badge: '3.5H · 2 PARADAS EN DAEGU',
        line1: 'Caminata KTX en Daegu:',
        line2: 'Mural de V y Parque de SUGA',
        sub: 'Excursión fácil de medio día desde Seúl en KTX',
        cta: 'VER RUTA DE DAEGU →',
        title: 'Excursión BTS en Daegu 💜 Mural de V y Parque Dalseong de SUGA (Día en KTX)',
        desc: 'Descubre el mural artístico gigante de Taehyung (V) frente a la primaria Daeseong y camina por el Parque Dalseong vinculado a SUGA en un paseo de medio día desde la estación Dongdaegu.',
      },
      en: {
        badge: '3.5H · 2 STOPS IN DAEGU',
        line1: 'Daegu KTX Day Walk:',
        line2: 'V Mural Street & Dalseong Park',
        sub: 'Easy 3.5-hour Taehyung & SUGA hometown loop',
        cta: 'OPEN DAEGU ROUTE →',
        title: 'Daegu BTS V & SUGA Hometown Walk 💜 KTX Day-Trip Route & Map',
        desc: 'Pair Daegu’s BTS V Panorama Mural Street outside Daeseong Elementary with historic Dalseong Park connected to SUGA—just over 1 km apart for an easy half-day KTX excursion.',
      },
      pt: {
        badge: '3.5H · 2 PARADAS EM DAEGU',
        line1: 'Caminhada em Daegu:',
        line2: 'Mural do V e Parque de SUGA',
        sub: 'Bate-volta fácil de KTX saindo de Seul em meio dia',
        cta: 'VER ROTEIRO DAEGU →',
        title: 'Roteiro BTS em Daegu 💜 Mural do V e Parque Dalseong do SUGA (Bate-Volta KTX)',
        desc: 'Veja de perto o mural artístico de V perto da Escola Primária Daeseong e caminhe pelo histórico Parque Dalseong ligado a SUGA em um passeio leve de 3,5 horas.',
      },
    },
  },
  {
    id: 'blackpink-seoul-style',
    slug: 'blackpink-seoul-style-tour',
    groupLabel: 'BLACKPINK',
    accent: '#DB2777',
    durationHours: 6,
    photos: ['bp-yg-hq/1.webp', 'bp-the-samee/1.webp', 'bp-haus-dosan/1.webp'],
    stops: [
      { label: 'YG Entertainment HQ', sub: 'Hapjeong · Modern Agency Façade' },
      { label: 'the SameE Official Cafe', sub: 'Hapjeong · Opposite YG HQ' },
      { label: 'BLACKPINK House Area', sub: 'Hongdae · Seogyo-dong Filming' },
      { label: 'HAUS DOSAN & Downtowner', sub: 'Apgujeong · Jennie Collab & Burgers' },
    ],
    copy: {
      es: {
        badge: '6H · 5 PARADAS EN SEÚL',
        line1: 'Tour BLINK BLACKPINK',
        line2: 'De Hapjeong a Gangnam',
        sub: 'YG HQ, Café the SameE, Hongdae y HAUS DOSAN',
        cta: 'ABRIR RUTA BLINK →',
        title: 'Tour BLACKPINK 1 Día en Seúl 🖤💖 YG, Café the SameE, Hongdae y HAUS DOSAN',
        desc: 'Vive el mejor recorrido BLINK por Seúl: sede de YG Entertainment, Café the SameE justo enfrente, la zona de BLACKPINK House en Hongdae, HAUS DOSAN de Jennie y Downtowner Cheongdam.',
      },
      en: {
        badge: '6H · 5 STOPS IN SEOUL',
        line1: 'BLACKPINK Seoul Style',
        line2: 'Hapjeong to Cheongdam Route',
        sub: 'YG HQ, the SameE, Hongdae & HAUS DOSAN in 1 Day',
        cta: 'OPEN BLINK ROUTE →',
        title: 'BLACKPINK Seoul 1-Day Itinerary 🖤💖 YG HQ, the SameE Cafe, Hongdae & HAUS DOSAN',
        desc: 'Morning in Mapo exploring YG Entertainment HQ, official fan cafe the SameE, and Hongdae, followed by afternoon fashion stops at HAUS DOSAN and Downtowner Cheongdam.',
      },
      pt: {
        badge: '6H · 5 PARADAS EM SEUL',
        line1: 'Roteiro BLACKPINK Seul:',
        line2: 'De Hapjeong a Gangnam',
        sub: 'YG HQ, Café the SameE, Hongdae e HAUS DOSAN',
        cta: 'ABRIR ROTEIRO BLINK →',
        title: 'Roteiro BLACKPINK em Seul 🖤💖 YG, Café the SameE, Hongdae e HAUS DOSAN',
        desc: 'Siga este roteiro completo em Seul: sede da YG Entertainment, café oficial the SameE, região da BLACKPINK House em Hongdae, HAUS DOSAN e Downtowner Cheongdam.',
      },
    },
  },
  {
    id: 'stray-kids-seoul-stay',
    slug: 'stray-kids-seoul-stay-tour',
    groupLabel: 'Stray Kids',
    accent: '#DC2626',
    durationHours: 6.5,
    photos: ['skz-jyp-hq/1.webp', 'skz-gwangjang-market/1.webp', 'skz-nodeul-island/1.webp'],
    stops: [
      { label: 'JYP Entertainment Center', sub: 'Seongnae-dong · Subway Line 5/8' },
      { label: 'Olympic Park Lone Tree', sub: 'Across from JYP · Picnic Spot' },
      { label: 'Gwangjang & Myeongdong Food', sub: 'Street Food & Kalguksu Favorites' },
      { label: 'Nodeul Island Han River', sub: 'Yongsan · Sunset & Night View' },
    ],
    copy: {
      es: {
        badge: '6.5H · 5 PARADAS EN SEÚL',
        line1: 'Ruta STAY Stray Kids',
        line2: 'JYP, Comida y Río Han',
        sub: 'Sede JYP, Parque Olímpico, Gwangjang e Isla Nodeul',
        cta: 'ABRIR RUTA STAY →',
        title: 'Itinerario Stray Kids en Seúl 🐺 JYP Center, Parque Olímpico, Mercado Gwangjang e Isla Nodeul',
        desc: 'Empieza frente a JYP Entertainment y el Árbol Solitario del Parque Olímpico, prueba la comida callejera del Mercado Gwangjang y Myeongdong Kyoja, y termina con el atardecer en Isla Nodeul.',
      },
      en: {
        badge: '6.5H · 5 STOPS IN SEOUL',
        line1: 'Stray Kids STAY Seoul',
        line2: 'JYP, Foodie & Han River Loop',
        sub: 'JYP Center, Olympic Park, Gwangjang & Nodeul Island',
        cta: 'OPEN STAY ROUTE →',
        title: 'Stray Kids Seoul 1-Day Itinerary 🐺 JYP HQ, Olympic Park, Gwangjang Market & Nodeul Island',
        desc: 'Designed for STAYs visiting Korea: visit JYP Center and Olympic Park’s Lone Tree, feast at Gwangjang Market and Myeongdong Kyoja, then unwind at Nodeul Island for Han River sunset views.',
      },
      pt: {
        badge: '6.5H · 5 PARADAS EM SEUL',
        line1: 'Roteiro STAY Stray Kids',
        line2: 'JYP, Comidas e Rio Han',
        sub: 'JYP Center, Parque Olímpico, Gwangjang e Ilha Nodeul',
        cta: 'ABRIR ROTEIRO STAY →',
        title: 'Roteiro Stray Kids em Seul 🐺 Sede da JYP, Parque Olímpico, Mercado Gwangjang e Ilha Nodeul',
        desc: 'Comece na sede da JYP e no Parque Olímpico, prove as comidas de rua do Mercado Gwangjang e Myeongdong Kyoja, e termine vendo o pôr do sol na Ilha Nodeul no Rio Han.',
      },
    },
  },
  {
    id: 'seoul-big3-agencies',
    slug: 'seoul-big3-agencies-hanok-tour',
    groupLabel: 'All K-Pop',
    accent: '#0F766E',
    durationHours: 7.5,
    photos: ['bp-bukchon-hanok/1.webp', 'bts-hybe-hq/1.webp', 'skz-jyp-hq/1.webp'],
    stops: [
      { label: 'YG Entertainment (Hapjeong)', sub: 'West Seoul · Mapo District' },
      { label: 'HYBE Yongsan HQ', sub: 'Central Seoul · Line 4 Sinyongsan' },
      { label: 'Bukchon Hanok Village', sub: 'Jongno · Hanbok Cultural Walk' },
      { label: 'JYP Center (Olympic Park)', sub: 'East Seoul · Line 5/8 Finish' },
    ],
    copy: {
      es: {
        badge: '7.5H · TOUR MULTISTAN SEÚL',
        line1: 'Gran Tour K-Pop en 1 Día:',
        line2: 'YG, HYBE, Bukchon y JYP',
        sub: 'Cruza Seúl de oeste a este en un itinerario perfecto',
        cta: 'VER GRAN TOUR SEÚL →',
        title: 'Gran Ruta K-Pop en Seúl 📍 Visita YG, HYBE, Bukchon Hanok y JYP en 1 Día',
        desc: '¿Tienes pocos días en Seúl? Visita las 3 grandes agencias (YG en Hapjeong, HYBE en Yongsan y JYP en Seongnae) más una parada cultural en Bukchon Hanok Village en una sola línea de metro.',
      },
      en: {
        badge: '7.5H · CROSS-SEOUL ROUTE',
        line1: '1-Day K-Pop Grand Slam:',
        line2: 'YG, HYBE, Bukchon & JYP',
        sub: 'Cross Seoul from West to East hitting the Big 3',
        cta: 'OPEN GRAND SLAM MAP →',
        title: '1-Day Seoul K-Pop Grand Slam 📍 Visit YG, HYBE, Bukchon Hanok & JYP HQ',
        desc: 'Short on time in Seoul? Follow this west-to-east itinerary hitting YG Entertainment, HYBE Yongsan HQ, historic Bukchon Hanok Village, and JYP Center—complete with step distances and Naver links.',
      },
      pt: {
        badge: '7.5H · ROTEIRO MULTIFANDOM',
        line1: 'Grand Slam K-Pop Seul:',
        line2: 'YG, HYBE, Bukchon e JYP',
        sub: 'Atravesse Seul de oeste a leste em 1 único dia',
        cta: 'ABRIR ROTEIRO SEUL →',
        title: 'Roteiro Grand Slam K-Pop em Seul 📍 YG, HYBE, Bukchon Hanok e JYP em 1 Dia',
        desc: 'Poucos dias em Seul? Visite as 3 grandes agências (YG, HYBE e JYP) mais uma pausa cultural nas casas tradicionais de Bukchon Hanok Village em um roteiro contínuo de metrô.',
      },
    },
  },
];

async function generateFormatGCourse(cfg, lang) {
  const copy = cfg.copy[lang];
  const [heroBuf, leftBuf, rightBuf] = await Promise.all([
    makeRoundedPhotoBuffer(path.join(MAP_IMAGES_DIR, cfg.photos[0]), 864, 290, 22),
    makeRoundedPhotoBuffer(path.join(MAP_IMAGES_DIR, cfg.photos[1]), 422, 196, 20),
    makeRoundedPhotoBuffer(path.join(MAP_IMAGES_DIR, cfg.photos[2]), 422, 196, 20),
  ]);

  const stopHeader =
    lang === 'es'
      ? 'ITINERARIO PASO A PASO EN COREA'
      : lang === 'pt'
      ? 'ROTEIRO PASSO A PASSO NA COREIA'
      : 'STEP-BY-STEP KOREA ROUTE';

  const useTwoCol = cfg.stops.length >= 4;
  const stopsSvg = cfg.stops
    .map((stop, idx) => {
      let sx = 104;
      let sy = 944 + idx * 68;
      if (useTwoCol) {
        const col = idx < 2 ? 0 : 1;
        const row = col === 0 ? idx : idx - 2;
        sx = col === 0 ? 102 : 522;
        sy = 958 + row * 100;
      }
      return `
      <circle cx="${sx + 20}" cy="${sy + 20}" r="20" fill="${cfg.accent}"/>
      <text x="${sx + 20}" y="${sy + 28}" fill="#FFFFFF" font-family="${FONT_KOREAN}" font-size="20" font-weight="900" text-anchor="middle">
        ${idx + 1}
      </text>
      <text x="${sx + 54}" y="${sy + 18}" fill="#0F172A" font-family="${FONT_KOREAN}" font-size="22" font-weight="800">
        ${escapeXml(trimWords(stop.label, useTwoCol ? 24 : 42))}
      </text>
      <text x="${sx + 54}" y="${sy + 46}" fill="#64748B" font-family="${FONT_KOREAN}" font-size="18" font-weight="600">
        ${escapeXml(trimWords(stop.sub, useTwoCol ? 28 : 48))}
      </text>`;
    })
    .join('\n');

  const line1Size = copy.line1.length > 26 ? 44 : 50;
  const line2Size = copy.line2.length > 26 ? 46 : 52;
  const footerPath =
    lang === 'en'
      ? `KPULSEQUIZ.COM/MAP/COURSE/${cfg.slug.toUpperCase()}`
      : `KPULSEQUIZ.COM/${lang.toUpperCase()}/MAP/COURSE`;

  const svg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <rect width="1000" height="1500" fill="#FAF8F4"/>
    <rect x="0" y="0" width="1000" height="16" fill="${cfg.accent}"/>
    <rect x="32" y="36" width="936" height="1428" rx="34" fill="none" stroke="#E6DFD3" stroke-width="2.5"/>

    <!-- Top Masthead -->
    <text x="68" y="96" fill="#475569" font-family="${FONT_KOREAN}" font-size="22" font-weight="800" letter-spacing="3">
      K-PULSE ITINERARY
    </text>
    <rect x="596" y="62" width="336" height="48" rx="24" fill="${cfg.accent}"/>
    <text x="764" y="93" fill="#FFFFFF" font-family="${FONT_KOREAN}" font-size="18" font-weight="900" letter-spacing="0.8" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.badge))}
    </text>

    <!-- Headline -->
    <text x="500" y="182" fill="#0F172A" font-family="${FONT_KOREAN}" font-size="${line1Size}" font-weight="800" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.line1))}
    </text>
    <text x="500" y="250" fill="${cfg.accent}" font-family="${FONT_KOREAN}" font-size="${line2Size}" font-weight="900" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.line2))}
    </text>
    <text x="500" y="302" fill="#475569" font-family="${FONT_KOREAN}" font-size="22" font-weight="700" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.sub))}
    </text>

    <!-- Photo Collage Frame -->
    <rect x="64" y="332" width="872" height="298" rx="24" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    <rect x="64" y="638" width="430" height="204" rx="22" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    <rect x="506" y="638" width="430" height="204" rx="22" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>

    <!-- Numbered Route Timeline Panel -->
    <rect x="68" y="868" width="864" height="314" rx="28" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    <text x="102" y="914" fill="${cfg.accent}" font-family="${FONT_KOREAN}" font-size="18" font-weight="900" letter-spacing="1.8">
      ${escapeXml(stopHeader)}
    </text>
    <line x1="102" y1="932" x2="898" y2="932" stroke="#F1F5F9" stroke-width="2"/>
    ${stopsSvg}

    <!-- Dark Pill CTA -->
    <rect x="140" y="1220" width="720" height="94" rx="47" fill="#0F172A"/>
    <text x="500" y="1278" fill="#FFFFFF" font-family="${FONT_KOREAN}" font-size="30" font-weight="900" letter-spacing="0.8" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.cta))}
    </text>

    <!-- Footer -->
    <text x="500" y="1394" fill="#64748B" font-family="${FONT_KOREAN}" font-size="18" font-weight="800" letter-spacing="2" text-anchor="middle">
      ${escapeXml(footerPath.length > 42 ? footerPath.slice(0, 42) : footerPath)}
    </text>
  </svg>`;

  const filename = `course-${cfg.slug}-${lang}.png`;
  const relPath = `public/images/pinterest/courses/${filename}`;
  const outPath = path.join(OUTPUT_DIR, 'courses', filename);

  await writePng(
    svg,
    [
      { input: heroBuf, left: 68, top: 336 },
      { input: leftBuf, left: 68, top: 642 },
      { input: rightBuf, left: 510, top: 642 },
    ],
    outPath,
    88
  );

  return {
    isNewPack: true,
    format: 'Korea Itinerary Course',
    lang,
    group: cfg.groupLabel,
    imageFile: relPath,
    targetBoard: getTargetBoard('korea-travel', lang),
    pinTitle: copy.title,
    pinDescription: copy.desc,
    destinationUrl: buildPinUrl({
      pathName: `/map/course/${cfg.slug}`,
      lang,
      campaign: `course_${cfg.id}_${lang}`,
      content: 'itinerary_course',
    }),
  };
}

const SPOT_PIN_CONFIGS = [
  {
    id: 'bts-hybe-hq',
    slug: 'hybe-yongsan-headquarters',
    groupLabel: 'BTS',
    accent: '#7C3AED',
    photos: ['bts-hybe-hq/1.webp', 'bts-hybe-hq/2.webp'],
    address: '42 Hangang-daero, Yongsan-gu, Seoul (Sinyongsan Exit 2)',
    copy: {
      es: {
        badge: 'BTS · YONGSAN, SEÚL',
        line1: 'Sede de HYBE Yongsan:',
        line2: 'Cómo Llegar y Qué Ver',
        sub: 'Guía real ARMY con cafés de cumpleaños alrededor',
        tip: 'Tip: Recorre los cafés temáticos detrás de la salida 2 de la estación Sinyongsan.',
        cta: 'VER DIRECCIÓN Y FOTOS →',
        title: 'Sede de HYBE en Seúl 📍 Dirección Exacta, Cómo Llegar y Cafés ARMY (Yongsan)',
        desc: 'Guarda esta guía para visitar HYBE Yongsan Headquarters en Seúl: dirección exacta, salida de metro Sinyongsan, fotos reales, cafés de cumpleaños y enlace directo en Naver y Google Maps.',
      },
      en: {
        badge: 'BTS · YONGSAN, SEOUL',
        line1: 'HYBE Yongsan Headquarters',
        line2: 'Address, Subway & Fan Cafes',
        sub: 'Exact Korea travel directions & Sinyongsan alley guide',
        tip: 'Tip: Pair your photo stop with ARMY birthday event cafes behind Sinyongsan Exit 2.',
        cta: 'OPEN SPOT GUIDE →',
        title: 'HYBE Yongsan Seoul Address 📍 How to Get There, Photos & ARMY Fan Cafes',
        desc: 'Save this guide before going to HYBE in Seoul! Find exact Hangang-daero address, Sinyongsan Station exit directions, surrounding birthday cafe spots, and 1-tap Naver/Kakao Maps links.',
      },
      pt: {
        badge: 'BTS · YONGSAN, SEUL',
        line1: 'Sede da HYBE em Seul:',
        line2: 'Endereço e Como Chegar',
        sub: 'Guia completo em Yongsan com cafés temáticos ARMY',
        tip: 'Dica: Visite os cafés com eventos de aniversário atrás da saída 2 de Sinyongsan.',
        cta: 'ABRIR GUIA DO LOCAL →',
        title: 'Sede da HYBE em Seul 📍 Endereço Exato, Fotos e Cafés ARMY em Yongsan',
        desc: 'Planejando conhecer a HYBE em Yongsan, Seul? Confira o endereço exato, como chegar de metrô pela estação Sinyongsan, cafés ao redor e rota pronta para Naver e Google Maps.',
      },
    },
  },
  {
    id: 'bts-yoojung-sikdang',
    slug: 'yoojung-sikdang-bts',
    groupLabel: 'BTS',
    accent: '#9333EA',
    photos: ['bts-yoojung-sikdang/1.webp', 'bts-yoojung-sikdang/2.webp'],
    address: '14 Dosan-daero 28-gil, Gangnam-gu, Seoul (Hakdong Exit 7)',
    copy: {
      es: {
        badge: 'BTS · GANGNAM, SEÚL',
        line1: 'Yoojung Sikdang en Seúl:',
        line2: 'El Restaurante Favorito de BTS',
        sub: 'Qué pedir, fotos del local y cómo llegar en metro',
        tip: 'Tip: Pide el famoso Dolpan Bibimbap de cerdo negro frente a la estación Hakdong.',
        cta: 'VER MENÚ Y MAPA →',
        title: 'Yoojung Sikdang Seúl 🍜 El Restaurante de BTS Trainee (Dirección y Cómo Llegar)',
        desc: 'Visita el legendario Yoojung Sikdang en Nonhyeon-dong donde BTS almorzaba antes de debutar. Incluye dirección exacta, qué plato pedir y enlaces a Naver y Google Maps.',
      },
      en: {
        badge: 'BTS · GANGNAM, SEOUL',
        line1: 'Yoojung Sikdang Seoul:',
        line2: 'BTS Rookie Diner Guide',
        sub: 'Exact Gangnam address, signature dish & subway guide',
        tip: 'Tip: Order their famous hot-stone black pork bibimbap near Hakdong Station Exit 7.',
        cta: 'VIEW ADDRESS & TIPS →',
        title: 'BTS Yoojung Sikdang Address & Guide 🍜 How to Visit Their Rookie-Era Seoul Diner',
        desc: 'Where did BTS eat during their trainee days in Seoul? Save this Yoojung Sikdang travel guide with exact Nonhyeon-dong address, real interior photos, and Naver/Kakao directions.',
      },
      pt: {
        badge: 'BTS · GANGNAM, SEUL',
        line1: 'Yoojung Sikdang em Seul:',
        line2: 'O Restaurante Clássico do BTS',
        sub: 'Endereço em Gangnam, o que pedir e fotos reais',
        tip: 'Dica: Peça o famoso bibimbap na pedra com carne de porco perto da estação Hakdong.',
        cta: 'VER ENDEREÇO E DICAS →',
        title: 'Yoojung Sikdang Seul 🍜 Como Visitar o Restaurante Favorito do BTS (Endereço)',
        desc: 'Conheça o Yoojung Sikdang em Gangnam onde o BTS ia na época de trainee! Veja endereço completo, fotos reais, dica do prato clássico e link para Naver e Google Maps.',
      },
    },
  },
  {
    id: 'bts-jumunjin-bus-stop',
    slug: 'jumunjin-bts-bus-stop',
    groupLabel: 'BTS',
    accent: '#0284C7',
    photos: ['bts-jumunjin-bus-stop/1.webp', 'bts-jumunjin-bus-stop/2.webp'],
    address: '8-55 Hyangho-ri, Jumunjin-eup, Gangneung, Gangwon',
    copy: {
      es: {
        badge: 'BTS · GANGNEUNG',
        line1: 'Parada BTS de Jumunjin:',
        line2: 'Portada You Never Walk Alone',
        sub: 'Cómo ir desde Seúl en KTX o tour por Gangneung',
        tip: 'Tip: Llega temprano en la mañana para fotos con la luz azul del Mar del Este sin fila.',
        cta: 'VER CÓMO LLEGAR →',
        title: 'Parada de Autobús BTS en Jumunjin 📍 Gangneung: Cómo Llegar Desde Seúl y Fotos',
        desc: 'Guarda cómo llegar a la famosa parada de BTS en la playa Hyangho de Gangneung (Spring Day / You Never Walk Alone) desde Seúl en KTX o bus, con fotos reales y Naver Maps.',
      },
      en: {
        badge: 'BTS · GANGNEUNG COAST',
        line1: 'Jumunjin BTS Bus Stop',
        line2: 'Gangneung Travel Guide',
        sub: 'How to reach the "You Never Walk Alone" album spot from Seoul',
        tip: 'Tip: Morning sun hits the East Sea behind the stop for crisp Spring Day album cover photos.',
        cta: 'GET DIRECTIONS →',
        title: 'Jumunjin BTS Bus Stop Gangneung 📍 How to Get There From Seoul & Photo Tips',
        desc: 'Planning to recreate the You Never Walk Alone cover in Korea? Here is the exact Hyangho Beach address, KTX + Gangneung transit tips, and 1-tap Naver Maps link.',
      },
      pt: {
        badge: 'BTS · GANGNEUNG',
        line1: 'Ponto BTS em Jumunjin:',
        line2: 'Praia de Gangneung na Coreia',
        sub: 'Como ir saindo de Seul de KTX para o cenário icônico',
        tip: 'Dica: Vá pela manhã para fotografar com o mar azul ao fundo sem longas filas.',
        cta: 'COMO CHEGAR LÁ →',
        title: 'Ponto de Ônibus BTS em Jumunjin 📍 Como Ir de Seul a Gangneung + Dicas',
        desc: 'Saiba como visitar o icônico ponto do álbum You Never Walk Alone em Gangneung saindo de Seul, com endereço exato, fotos reais e link para Naver e Google Maps.',
      },
    },
  },
  {
    id: 'bts-gamcheon-mural',
    slug: 'busan-gamcheon-bts-mural',
    groupLabel: 'BTS',
    accent: '#2563EB',
    photos: ['bts-gamcheon-mural/1.webp', 'bts-gamcheon-mural/2.webp'],
    address: '203 Gamnae 2-ro, Saha-gu, Busan (Toseong Station Exit 6)',
    copy: {
      es: {
        badge: 'BTS · BUSÁN',
        line1: 'Mural de Jimin y Jungkook',
        line2: 'Aldea Cultural Gamcheon, Busán',
        sub: 'Ubicación exacta entre las casas coloridas de Gamcheon',
        tip: 'Tip: Toma el autobús local desde la salida 6 de la estación Toseong hasta la cima.',
        cta: 'VER UBICACIÓN EXACTA →',
        title: 'Mural BTS Jimin y Jungkook en Busán 🎨 Dónde Está en Gamcheon Culture Village',
        desc: 'Encuentra la calle exacta del mural gigante de Jimin y Jungkook dentro de Gamcheon Culture Village en Busán, cómo subir desde la estación Toseong y fotos reales.',
      },
      en: {
        badge: 'BTS · SAHA-GU, BUSAN',
        line1: 'Gamcheon BTS Mural Spot:',
        line2: 'Jimin & Jungkook in Busan',
        sub: 'Exact hillside street pin inside colorful Gamcheon Village',
        tip: 'Tip: Ride the green village bus from Toseong Station Exit 6 uphill then walk down.',
        cta: 'SEE BUSAN GUIDE →',
        title: 'Busan Gamcheon BTS Jimin & Jungkook Mural 🎨 Exact Pin, Bus Directions & Photos',
        desc: 'Visiting Busan? Pinpoint the huge Jimin and Jungkook wall mural in Gamcheon Culture Village with exact Gamnae 2-ro address, subway/bus tips, and nearby Busan BTS stops.',
      },
      pt: {
        badge: 'BTS · BUSAN',
        line1: 'Mural Jimin e Jungkook:',
        line2: 'Gamcheon Culture Village',
        sub: 'Onde encontrar a arte gigante nas ladeiras de Busan',
        tip: 'Dica: Pegue o ônibus verde na saída 6 da estação Toseong para subir sem cansar.',
        cta: 'VER LOCAL EXATO →',
        title: 'Mural BTS Jimin e Jungkook em Busan 🎨 Onde Fica em Gamcheon + Como Chegar',
        desc: 'Guia prático para achar o mural gigante de Jimin e Jungkook na Vila Cultural de Gamcheon em Busan com endereço exato, dica de ônibus e fotos reais.',
      },
    },
  },
  {
    id: 'bp-haus-dosan',
    slug: 'haus-dosan-jennie-tamburins',
    groupLabel: 'BLACKPINK',
    accent: '#DB2777',
    photos: ['bp-haus-dosan/1.webp', 'bp-haus-dosan/2.webp'],
    address: '50 Apgujeong-ro 46-gil, Gangnam-gu, Seoul (Apgujeong Rodeo)',
    copy: {
      es: {
        badge: 'BLACKPINK · GANGNAM, SEÚL',
        line1: 'HAUS DOSAN y Nudake:',
        line2: 'Icono de Jennie en Apgujeong',
        sub: 'Gentle Monster, Tamburins y postres esculturales',
        tip: 'Tip: Sube por todos los pisos para ver arte futurista y los croissants artísticos en B1.',
        cta: 'VER GUÍA EN GANGNAM →',
        title: 'HAUS DOSAN Seúl 🖤💖 Guía BLINK en Apgujeong Rodeo (Jennie x Tamburins y Nudake)',
        desc: 'Explora HAUS DOSAN en Apgujeong Rodeo, Seúl: instalaciones de Gentle Monster y Tamburins ligadas a Jennie de BLACKPINK más el famoso café Nudake, con mapa directo.',
      },
      en: {
        badge: 'BLACKPINK · APGUJEONG, SEOUL',
        line1: 'HAUS DOSAN & Nudake:',
        line2: 'Jennie Seoul Hotspot Guide',
        sub: 'Gentle Monster, Tamburins & iconic Apgujeong Rodeo cafe',
        tip: 'Tip: Explore the giant kinetic art floors first, then visit Nudake cafe on B1.',
        cta: 'OPEN SEOUL GUIDE →',
        title: 'HAUS DOSAN Seoul Travel Guide 🖤💖 Gentle Monster, Tamburins & Nudake Near Jennie Spots',
        desc: 'Visit HAUS DOSAN in Gangnam’s Apgujeong Rodeo—celebrated by BLACKPINK’s Jennie and fashion lovers—with exact directions, gallery tips, and nearby Cheongdam spots.',
      },
      pt: {
        badge: 'BLACKPINK · GANGNAM, SEUL',
        line1: 'HAUS DOSAN e Nudake:',
        line2: 'Roteiro Jennie em Apgujeong',
        sub: 'Gentle Monster, Tamburins e café artístico em Gangnam',
        tip: 'Dica: Visite os andares de instalação artística e prove os doces criativos do Nudake.',
        cta: 'VER GUIA APGUJEONG →',
        title: 'HAUS DOSAN em Seul 🖤💖 Guia BLINK em Apgujeong Rodeo (Gentle Monster & Nudake)',
        desc: 'Confira onde fica a HAUS DOSAN em Gangnam ligada às campanhas da Jennie (Tamburins & Gentle Monster) mais o café Nudake com fotos reais e links no Naver Maps.',
      },
    },
  },
  {
    id: 'skz-jyp-hq',
    slug: 'jyp-entertainment-seongnae',
    groupLabel: 'Stray Kids',
    accent: '#DC2626',
    photos: ['skz-jyp-hq/1.webp', 'skz-jyp-hq/2.webp'],
    address: '205 Gangdong-daero, Gangdong-gu, Seoul (Across Olympic Park)',
    copy: {
      es: {
        badge: 'STRAY KIDS · SEÚL',
        line1: 'Sede JYP Entertainment',
        line2: 'Frente al Parque Olímpico',
        sub: 'Guía STAY para visitar Seongnae-dong y el Árbol Solitario',
        tip: 'Tip: Cruza la calle hacia Olympic Park para fotos frente al famoso Árbol Solitario.',
        cta: 'ABRIR GUÍA STAY →',
        title: 'JYP Entertainment Seúl 📍 Cómo Llegar, Fotos y Parque Olímpico (Guía Stray Kids STAY)',
        desc: 'Guarda la dirección exacta de JYP Entertainment Center en Seongnae-dong, frente al Parque Olímpico de Seúl, con salida de metro, fotos reales y cafés cercanos.',
      },
      en: {
        badge: 'STRAY KIDS · GANGDONG, SEOUL',
        line1: 'JYP Entertainment Center',
        line2: 'Directions & Olympic Park',
        sub: 'Exact Seongnae-dong STAY stop right across from Lone Tree',
        tip: 'Tip: Walk straight into Olympic Park across the street to visit the iconic Lone Tree.',
        cta: 'OPEN JYP GUIDE →',
        title: 'JYP Entertainment Seoul Address 📍 How to Visit + Olympic Park Stray Kids Guide',
        desc: 'Visiting Seoul as a STAY or ONCE? Save JYP Center’s exact Gangdong-daero address, Subway Line 5/8 access, and the nearby Olympic Park Lone Tree route with Naver Maps.',
      },
      pt: {
        badge: 'STRAY KIDS · SEUL',
        line1: 'Sede da JYP Entertainment',
        line2: 'Frente ao Parque Olímpico',
        sub: 'Guia completo em Seongnae-dong para fãs STAY e ONCE',
        tip: 'Dica: Atravesse a rua até o Parque Olímpico para fotografar a famosa Árvore Solitária.',
        cta: 'ABRIR GUIA JYP →',
        title: 'Sede da JYP em Seul 📍 Endereço Exato, Metrô e Parque Olímpico (Stray Kids)',
        desc: 'Veja como visitar o prédio da JYP Entertainment em Seul, com estação de metrô mais próxima, fotos reais e combinação com a Árvore Solitária do Parque Olímpico.',
      },
    },
  },
];

async function generateFormatHSpot(cfg, lang) {
  const copy = cfg.copy[lang];
  const [heroBuf, insetBuf] = await Promise.all([
    makeRoundedPhotoBuffer(path.join(MAP_IMAGES_DIR, cfg.photos[0]), 864, 510, 26),
    makeRoundedPhotoBuffer(path.join(MAP_IMAGES_DIR, cfg.photos[1]), 268, 190, 20),
  ]);

  const tipLines = wrapText(copy.tip, 54, 2);
  const addressLabel =
    lang === 'es' ? 'DIRECCIÓN EXACTA' : lang === 'pt' ? 'ENDEREÇO EXATO' : 'EXACT KOREA ADDRESS';
  const line1Size = copy.line1.length > 26 ? 44 : 50;
  const line2Size = copy.line2.length > 26 ? 46 : 52;
  const footerPath =
    lang === 'en'
      ? `KPULSEQUIZ.COM/MAP/${cfg.slug.toUpperCase()}`
      : `KPULSEQUIZ.COM/${lang.toUpperCase()}/MAP/${cfg.slug.toUpperCase()}`;

  const baseSvg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <rect width="1000" height="1500" fill="#FAF8F4"/>
    <rect x="0" y="0" width="1000" height="16" fill="${cfg.accent}"/>
    <rect x="32" y="36" width="936" height="1428" rx="34" fill="none" stroke="#E6DFD3" stroke-width="2.5"/>

    <!-- Top Masthead -->
    <text x="68" y="96" fill="#475569" font-family="${FONT_KOREAN}" font-size="22" font-weight="800" letter-spacing="3">
      K-PULSE SPOT GUIDE
    </text>
    <rect x="596" y="62" width="336" height="48" rx="24" fill="${cfg.accent}"/>
    <text x="764" y="93" fill="#FFFFFF" font-family="${FONT_KOREAN}" font-size="18" font-weight="900" letter-spacing="0.8" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.badge))}
    </text>

    <!-- Headline -->
    <text x="500" y="182" fill="#0F172A" font-family="${FONT_KOREAN}" font-size="${line1Size}" font-weight="800" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.line1))}
    </text>
    <text x="500" y="250" fill="${cfg.accent}" font-family="${FONT_KOREAN}" font-size="${line2Size}" font-weight="900" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.line2))}
    </text>
    <text x="500" y="302" fill="#475569" font-family="${FONT_KOREAN}" font-size="22" font-weight="700" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.sub))}
    </text>

    <!-- Hero Frame Backdrop -->
    <rect x="64" y="338" width="872" height="518" rx="28" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>

    <!-- Address + Map Apps + Fan Tip Card -->
    <rect x="68" y="886" width="864" height="296" rx="28" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    <text x="104" y="934" fill="${cfg.accent}" font-family="${FONT_KOREAN}" font-size="18" font-weight="900" letter-spacing="1.8">
      ${escapeXml(addressLabel)}
    </text>
    <text x="104" y="976" fill="#0F172A" font-family="${FONT_KOREAN}" font-size="25" font-weight="800">
      ${escapeXml(trimWords(cfg.address, 56))}
    </text>

    <!-- 3 Map App Strip -->
    <rect x="104" y="1006" width="236" height="44" rx="12" fill="#059669"/>
    <text x="222" y="1034" fill="#FFFFFF" font-family="${FONT_KOREAN}" font-size="18" font-weight="800" text-anchor="middle">
      NAVER MAP
    </text>
    <rect x="358" y="1006" width="236" height="44" rx="12" fill="#FBBF24"/>
    <text x="476" y="1034" fill="#0F172A" font-family="${FONT_KOREAN}" font-size="18" font-weight="800" text-anchor="middle">
      KAKAOMAP
    </text>
    <rect x="612" y="1006" width="236" height="44" rx="12" fill="#0F172A"/>
    <text x="730" y="1034" fill="#FFFFFF" font-family="${FONT_KOREAN}" font-size="18" font-weight="800" text-anchor="middle">
      GOOGLE MAPS
    </text>

    <line x1="104" y1="1074" x2="896" y2="1074" stroke="#F1F5F9" stroke-width="2"/>
    ${tipLines
      .map(
        (line, i) => `
    <text x="104" y="${1114 + i * 34}" fill="#475569" font-family="${FONT_KOREAN}" font-size="22" font-weight="700">
      ${escapeXml(line)}
    </text>`
      )
      .join('')}

    <!-- Dark Pill CTA -->
    <rect x="140" y="1220" width="720" height="94" rx="47" fill="#0F172A"/>
    <text x="500" y="1278" fill="#FFFFFF" font-family="${FONT_KOREAN}" font-size="30" font-weight="900" letter-spacing="0.8" text-anchor="middle">
      ${escapeXml(stripEmojis(copy.cta))}
    </text>

    <!-- Footer -->
    <text x="500" y="1394" fill="#64748B" font-family="${FONT_KOREAN}" font-size="18" font-weight="800" letter-spacing="2" text-anchor="middle">
      ${escapeXml(footerPath.length > 42 ? footerPath.slice(0, 42) : footerPath)}
    </text>
  </svg>`;

  const insetFrameSvg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <rect x="634" y="636" width="284" height="206" rx="24" fill="#FFFFFF"/>
  </svg>`;

  const filename = `spot-${cfg.slug}-${lang}.png`;
  const relPath = `public/images/pinterest/spots/${filename}`;
  const outPath = path.join(OUTPUT_DIR, 'spots', filename);

  await writePng(
    baseSvg,
    [
      { input: heroBuf, left: 68, top: 342 },
      { input: Buffer.from(insetFrameSvg), left: 0, top: 0 },
      { input: insetBuf, left: 642, top: 644 },
    ],
    outPath,
    88
  );

  return {
    isNewPack: true,
    format: 'Korea Spot Guide',
    lang,
    group: cfg.groupLabel,
    imageFile: relPath,
    targetBoard: getTargetBoard('korea-travel', lang),
    pinTitle: copy.title,
    pinDescription: copy.desc,
    destinationUrl: buildPinUrl({
      pathName: `/map/${cfg.slug}`,
      lang,
      campaign: `spot_${cfg.id}_${lang}`,
      content: 'spot_guide',
    }),
  };
}

function writeManifestFiles(rows) {
  // Sort ES -> PT -> EN, then by format and group
  const langRank = { es: 0, pt: 1, en: 2 };
  const sorted = [...rows].sort((a, b) => {
    const lr = (langRank[a.lang] ?? 9) - (langRank[b.lang] ?? 9);
    if (lr !== 0) return lr;
    return a.imageFile.localeCompare(b.imageFile);
  });

  // 1. UTF-8 with BOM CSV (Excel safe)
  const csvHeader = ['Format', 'Language', 'Group', 'Image File', 'Target Board', 'Pin Title', 'Pin Description', 'Destination URL'];
  const csvLines = [
    csvHeader.join(','),
    ...sorted.map((r) =>
      [r.format, r.lang.toUpperCase(), r.group, r.imageFile, r.targetBoard, r.pinTitle, r.pinDescription, r.destinationUrl]
        .map(csvEscape)
        .join(',')
    ),
  ];
  fs.writeFileSync(path.join(OUTPUT_DIR, 'pinterest-pins-manifest.csv'), '\uFEFF' + csvLines.join('\r\n'), 'utf8');

  // 2. Markdown Index grouped ES -> PT -> EN
  const countsByLang = { es: 0, pt: 0, en: 0 };
  const countsByFormat = {};
  for (const r of sorted) {
    countsByLang[r.lang] = (countsByLang[r.lang] || 0) + 1;
    countsByFormat[r.format] = (countsByFormat[r.format] || 0) + 1;
  }

  const md = [];
  md.push('# 📌 K-Pulse 핀터레스트 업로드 매칭표 (1000×1500 · 정적 다국어 경로 + UTM 자동 적용)');
  md.push('');
  md.push(`> 총 **${sorted.length}장** 생성 완료 (\`ES: ${countsByLang.es}장\`, \`EN: ${countsByLang.en}장\`, \`PT: ${countsByLang.pt}장\`).`);
  md.push('> 스페인어(`/es/...`)·포르투갈어(`/pt/...`) 정적 경로와 `utm_source=pinterest&utm_medium=social&utm_campaign=...&utm_content=...`가 자동 포함됩니다.');
  md.push('> 신규 추가 54장만 바로 업로드하려면 [`NEW_PINS_GUIDE.md`](./NEW_PINS_GUIDE.md) / [`new-pins-manifest.csv`](./new-pins-manifest.csv)를 사용하세요.');
  md.push('> 엑셀에서 전체를 열려면 [`pinterest-pins-manifest.csv`](./pinterest-pins-manifest.csv)를 사용하세요.');
  md.push('');
  md.push('## 포맷별 수량 요약');
  md.push('');
  md.push('| 포맷 | 수량 | 특징 |');
  md.push('|---|---:|---|');
  for (const [fmt, cnt] of Object.entries(countsByFormat)) {
    md.push(`| ${fmt} | ${cnt}장 | 1000×1500 (2:3 세로형) |`);
  }
  md.push('');

  const sectionLabels = {
    es: '🇪🇸 스페인어 우선 업로드 (ES — 주력 성장 채널)',
    pt: '🇧🇷 포르투갈어 확장 업로드 (PT — 브라질 타깃)',
    en: '🇺🇸 영어 글로벌 업로드 (EN)',
  };

  for (const l of ['es', 'pt', 'en']) {
    const items = sorted.filter((r) => r.lang === l);
    md.push(`## ${sectionLabels[l]} (${items.length}장)`);
    md.push('');
    md.push('| 포맷 | 그룹 | 이미지 파일 | 추천 보드 | 핀 제목 | UTM 랜딩 URL |');
    md.push('|---|---|---|---|---|---|');
    for (const r of items) {
      const boardSafe = r.targetBoard.replace(/\|/g, '\\|');
      const titleSafe = r.pinTitle.replace(/\|/g, '\\|');
      md.push(
        `| ${r.format} | ${r.group} | \`${r.imageFile}\` | ${boardSafe} | ${titleSafe} | \`${r.destinationUrl}\` |`
      );
    }
    md.push('');
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'PINS_INDEX.md'), md.join('\n'), 'utf8');

  // 3. Dedicated New Pins Manifest & Quick Copy-Paste Guide (54 new pins)
  const newRows = sorted.filter((r) => r.isNewPack);
  const newCsvLines = [
    csvHeader.join(','),
    ...newRows.map((r) =>
      [r.format, r.lang.toUpperCase(), r.group, r.imageFile, r.targetBoard, r.pinTitle, r.pinDescription, r.destinationUrl]
        .map(csvEscape)
        .join(',')
    ),
  ];
  fs.writeFileSync(path.join(OUTPUT_DIR, 'new-pins-manifest.csv'), '\uFEFF' + newCsvLines.join('\r\n'), 'utf8');

  const newMd = [];
  newMd.push('# ✨ K-Pulse 신규 확장 기능 핀터레스트 빠른 업로드 가이드 (54장 · 복사-붙여넣기용)');
  newMd.push('');
  newMd.push(`> 이번에 새로 오픈한 **K-사주 한국 이름 스튜디오(18장)** + **추천 성지 코스 6종(18장)** + **핵심 스팟 개별 가이드 6종(18장)** = 총 **${newRows.length}장**입니다.`);
  newMd.push('> 모든 링크에 `/es/...` · `/pt/...` 정적 다국어 경로 + `utm_source=pinterest` 추적 파라미터가 포함되어 있습니다.');
  newMd.push('');

  for (const l of ['es', 'pt', 'en']) {
    const items = newRows.filter((r) => r.lang === l);
    newMd.push(`## ${sectionLabels[l]} (${items.length}장)`);
    newMd.push('');
    for (const r of items) {
      newMd.push(`### [${r.format}] ${r.pinTitle}`);
      newMd.push(`- **Image File**: \`${r.imageFile}\``);
      newMd.push(`- **Target Board**: \`${r.targetBoard}\``);
      newMd.push(`- **Pin Title**: \`${r.pinTitle}\``);
      newMd.push(`- **Pin Description**:`);
      newMd.push('```text');
      newMd.push(r.pinDescription);
      newMd.push('```');
      newMd.push(`- **Destination URL**: ${r.destinationUrl}`);
      newMd.push('');
    }
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'NEW_PINS_GUIDE.md'), newMd.join('\n'), 'utf8');

  return sorted;
}

async function validateOutputs(rows) {
  let totalBytes = 0;
  for (const r of rows) {
    const abs = path.join(ROOT_DIR, r.imageFile);
    if (!fs.existsSync(abs)) {
      throw new Error(`Missing generated image: ${abs}`);
    }
    const stat = fs.statSync(abs);
    if (stat.size <= 15000) {
      throw new Error(`Image suspiciously small (${stat.size}B): ${r.imageFile}`);
    }
    totalBytes += stat.size;

    const meta = await sharp(abs).metadata();
    if (meta.width !== 1000 || meta.height !== 1500) {
      throw new Error(`Invalid dimensions ${meta.width}x${meta.height} for ${r.imageFile}`);
    }

    if (!r.destinationUrl.includes('utm_source=pinterest&utm_medium=social&utm_campaign=')) {
      throw new Error(`Missing UTM parameters on URL: ${r.destinationUrl}`);
    }
    if (
      r.lang !== 'en' &&
      !r.destinationUrl.includes(`https://kpulsequiz.com/${r.lang}/`) &&
      !r.destinationUrl.startsWith(`https://kpulsequiz.com/${r.lang}?`)
    ) {
      throw new Error(`Missing /${r.lang}/ prefix on URL: ${r.destinationUrl}`);
    }
  }
  return totalBytes;
}

async function main() {
  cleanOutputDirectory();

  const quizzesBySlug = {};
  for (const cfg of QUIZ_CONFIGS) {
    const quizPath = path.join(QUIZZES_DIR, `${cfg.slug}.json`);
    quizzesBySlug[cfg.slug] = JSON.parse(fs.readFileSync(quizPath, 'utf8'));
  }

  const chemGroups = parseChemistryGroups();
  const cfgByChemId = {
    bts: QUIZ_CONFIGS.find((c) => c.groupKey === 'bts-soulmate'),
    'stray-kids': QUIZ_CONFIGS.find((c) => c.groupKey === 'skz'),
    blackpink: QUIZ_CONFIGS.find((c) => c.groupKey === 'blackpink'),
    twice: QUIZ_CONFIGS.find((c) => c.groupKey === 'twice'),
    enhypen: QUIZ_CONFIGS.find((c) => c.groupKey === 'enhypen'),
    aespa: QUIZ_CONFIGS.find((c) => c.groupKey === 'aespa'),
    'le-sserafim': QUIZ_CONFIGS.find((c) => c.groupKey === 'lsf'),
  };

  const rows = [];

  // Format A (Covers) + Format B (2x2 Quiz Hooks): 8 quizzes x 3 langs = 48 pins
  for (const cfg of QUIZ_CONFIGS) {
    const quiz = quizzesBySlug[cfg.slug];
    for (const lang of LANGS) {
      rows.push(await generateFormatACover(cfg, lang));
      rows.push(await generateFormatBQuestion(cfg, quiz, lang));
    }
  }

  // Format C (Member Cards): 4 top groups x 2 langs (es, en) = 56 pins
  for (const cfg of QUIZ_CONFIGS.filter((c) => c.cardGroup)) {
    const quiz = quizzesBySlug[cfg.slug];
    const entries = Object.entries(quiz.personalityResults || {});
    for (let idx = 0; idx < entries.length; idx++) {
      const [memberId, member] = entries[idx];
      for (const lang of ['es', 'en']) {
        rows.push(
          await generateFormatCMemberCard(cfg, quiz, memberId, member, idx, entries.length, lang)
        );
      }
    }
  }

  // Format D (K-Saju x MBTI Chemistry): 7 groups x 3 langs = 21 pins
  for (const chemGroup of chemGroups) {
    const accentCfg = cfgByChemId[chemGroup.id];
    for (const lang of LANGS) {
      rows.push(await generateFormatDChemistry(chemGroup, accentCfg, lang));
    }
  }

  // Format E (Korea Travel Map Bucket-List Pins): 4 map scopes x 3 langs = 12 pins
  for (const mapCfg of MAP_PIN_CONFIGS) {
    for (const lang of LANGS) {
      rows.push(await generateFormatEMap(mapCfg, lang));
    }
  }

  // Format F (K-Saju Korean Name Studio Pins): 6 designs x 3 langs = 18 pins
  for (const knameCfg of KOREAN_NAME_PIN_CONFIGS) {
    for (const lang of LANGS) {
      rows.push(await generateFormatFKoreanName(knameCfg, lang));
    }
  }

  // Format G (Curated Korea Itinerary Course Pins): 6 courses x 3 langs = 18 pins
  for (const courseCfg of COURSE_PIN_CONFIGS) {
    for (const lang of LANGS) {
      rows.push(await generateFormatGCourse(courseCfg, lang));
    }
  }

  // Format H (Individual Korea Spot Guide Pins): 6 hero spots x 3 langs = 18 pins
  for (const spotCfg of SPOT_PIN_CONFIGS) {
    for (const lang of LANGS) {
      rows.push(await generateFormatHSpot(spotCfg, lang));
    }
  }

  const sortedRows = writeManifestFiles(rows);
  const totalBytes = await validateOutputs(sortedRows);
  const totalMb = (totalBytes / (1024 * 1024)).toFixed(2);
  console.log(`Generated & validated ${sortedRows.length} Pinterest pins (${totalMb} MB).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
