const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = path.join(__dirname, '..');
const QUIZZES_DIR = path.join(ROOT_DIR, 'src', 'data', 'quizzes');
const CHEMISTRY_FILE = path.join(ROOT_DIR, 'src', 'data', 'idolChemistry.ts');
const MASCOT_DIR = path.join(ROOT_DIR, 'public', 'images', 'mascot');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public', 'images', 'pinterest');

const FORMAT_DIRS = ['covers', 'questions', 'cards', 'chemistry'];
const LEGACY_DIRS = ['main', 'es'];

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

function buildPinUrl({ pathName, lang, campaign, content }) {
  const url = new URL(`https://kpulsequiz.com${pathName}`);
  if (lang !== 'en') {
    url.searchParams.set('lang', lang);
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

async function writePng(svgString, composites, outPath) {
  await sharp(Buffer.from(svgString))
    .composite(composites)
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(outPath);
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
      ? `Test ${cfg.groupName}: "${stripEmojis(qRaw).slice(0, 58)}" ⚡ Descubre tu Miembro`
      : lang === 'pt'
      ? `Teste ${cfg.groupName}: "${stripEmojis(qRaw).slice(0, 56)}" ⚡ Descubra Seu Membro`
      : `${cfg.groupName} Quiz: "${stripEmojis(qRaw).slice(0, 58)}" ⚡ Find Your Match`;

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
  md.push('# 📌 K-Pulse 핀터레스트 업로드 매칭표 (1000×1500 · UTM 자동 적용)');
  md.push('');
  md.push(`> 총 **${sorted.length}장** 생성 완료 (\`ES: ${countsByLang.es}장\`, \`EN: ${countsByLang.en}장\`, \`PT: ${countsByLang.pt}장\`).`);
  md.push('> 모든 링크에 `?lang=` 및 `utm_source=pinterest&utm_medium=social&utm_campaign=...&utm_content=...`가 자동 포함됩니다.');
  md.push('> 엑셀에서 바로 열려면 같은 폴더의 [`pinterest-pins-manifest.csv`](./pinterest-pins-manifest.csv)를 사용하세요.');
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
    if (r.lang !== 'en' && !r.destinationUrl.includes(`lang=${r.lang}`)) {
      throw new Error(`Missing lang=${r.lang} on URL: ${r.destinationUrl}`);
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

  const sortedRows = writeManifestFiles(rows);
  const totalBytes = await validateOutputs(sortedRows);
  const totalMb = (totalBytes / (1024 * 1024)).toFixed(2);
  console.log(`Generated & validated ${sortedRows.length} Pinterest pins (${totalMb} MB).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
