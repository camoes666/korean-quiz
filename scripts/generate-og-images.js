const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const QUIZZES_DIR = path.join(__dirname, '..', 'src', 'data', 'quizzes');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'og');
const HOBI_PATH = path.join(__dirname, '..', 'public', 'images', 'hobi01.png');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Color schemes per slug
const THEMES = {
  'blackpink-blink-trivia': {
    bgStart: '#14030d',
    bgMid: '#380922',
    bgEnd: '#db2777',
    accent: '#f43f5e',
    pillBg: '#f43f5e',
    pillText: '#ffffff',
    tag: 'K-POP · BLACKPINK 🖤💖',
  },
  'stray-kids-stay-trivia': {
    bgStart: '#0f0728',
    bgMid: '#2e1065',
    bgEnd: '#be123c',
    accent: '#fb7185',
    pillBg: '#e11d48',
    pillText: '#ffffff',
    tag: 'K-POP · STRAY KIDS 🐺',
  },
  'bts-army-trivia': {
    bgStart: '#0b0217',
    bgMid: '#2e1065',
    bgEnd: '#7c3aed',
    accent: '#c084fc',
    pillBg: '#9333ea',
    pillText: '#ffffff',
    tag: 'K-POP · BTS ARMY 💜',
  },
  'korean-spicy-food': {
    bgStart: '#1a0404',
    bgMid: '#7c2d12',
    bgEnd: '#ea580c',
    accent: '#fb923c',
    pillBg: '#dc2626',
    pillText: '#ffffff',
    tag: 'K-FOOD · SPICY CHALLENGE 🌶️',
  },
  'korean-culture-iq': {
    bgStart: '#020617',
    bgMid: '#1e1b4b',
    bgEnd: '#4338ca',
    accent: '#818cf8',
    pillBg: '#4f46e5',
    pillText: '#ffffff',
    tag: 'CULTURE · ETIQUETTE & IQ 🥢',
  },
  'kpop-fandom-trivia': {
    bgStart: '#09090b',
    bgMid: '#3b0764',
    bgEnd: '#a21caf',
    accent: '#e879f9',
    pillBg: '#c026d3',
    pillText: '#ffffff',
    tag: 'K-POP · ALL FANDOMS 🎤',
  },
  'kdrama-trope-trivia': {
    bgStart: '#022c22',
    bgMid: '#064e3b',
    bgEnd: '#0f766e',
    accent: '#2dd4bf',
    pillBg: '#0d9488',
    pillText: '#ffffff',
    tag: 'K-DRAMA · TROPES & SQUID GAME 🎬',
  },
  'which-stray-kids-member-are-you': {
    bgStart: '#110726',
    bgMid: '#3b0764',
    bgEnd: '#be123c',
    accent: '#fb7185',
    pillBg: '#e11d48',
    pillText: '#ffffff',
    tag: 'PERSONALITY TEST · STRAY KIDS 🔮🐺',
  },
};

const files = fs.readdirSync(QUIZZES_DIR).filter((f) => f.endsWith('.json'));

async function generateAll() {
  for (const file of files) {
    const quiz = JSON.parse(fs.readFileSync(path.join(QUIZZES_DIR, file), 'utf-8'));
    const theme = THEMES[quiz.slug] || {
      bgStart: '#0f172a',
      bgMid: '#1e293b',
      bgEnd: '#4f46e5',
      accent: '#818cf8',
      pillBg: '#6366f1',
      pillText: '#ffffff',
      tag: 'K-PULSE TRIVIA ✨',
    };

    const tagEscaped = (theme.tag || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const questionCount = quiz.questions ? quiz.questions.length : 10;
    const titleEscaped = (quiz.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const descEscaped = (quiz.subtitle || quiz.description || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    // Wrap title if long
    let titleLine1 = titleEscaped;
    let titleLine2 = '';
    if (titleEscaped.length > 32) {
      const words = titleEscaped.split(' ');
      let mid = Math.ceil(words.length / 2);
      titleLine1 = words.slice(0, mid).join(' ');
      titleLine2 = words.slice(mid).join(' ');
    }

    const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.bgStart}"/>
          <stop offset="50%" stop-color="${theme.bgMid}"/>
          <stop offset="100%" stop-color="${theme.bgEnd}"/>
        </linearGradient>
        <radialGradient id="glow" cx="80%" cy="30%" r="50%">
          <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="bottomGlow" cx="20%" cy="80%" r="40%">
          <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Background with Rich Glows -->
      <rect width="1200" height="630" fill="url(#bgGrad)"/>
      <rect width="1200" height="630" fill="url(#glow)"/>
      <rect width="1200" height="630" fill="url(#bottomGlow)"/>

      <!-- Border Stroke -->
      <rect x="16" y="16" width="1168" height="598" rx="28" fill="none" stroke="rgba(255, 255, 255, 0.15)" stroke-width="2"/>

      <!-- Category Pill -->
      <g transform="translate(80, 80)">
        <rect width="320" height="46" rx="23" fill="${theme.pillBg}"/>
        <text x="24" y="29" fill="${theme.pillText}" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="900" letter-spacing="1">
          ${tagEscaped}
        </text>
      </g>

      <!-- Question Count & Difficulty Badges -->
      <g transform="translate(420, 80)">
        <rect width="170" height="46" rx="23" fill="rgba(255, 255, 255, 0.12)" stroke="rgba(255, 255, 255, 0.25)" stroke-width="1.5"/>
        <text x="85" y="29" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold" text-anchor="middle">
          ⚡ ${questionCount} Questions
        </text>
      </g>

      <!-- Big Main Title -->
      <text x="80" y="220" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="900" letter-spacing="-0.5">
        ${titleLine1}
      </text>
      ${titleLine2 ? `
      <text x="80" y="285" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="900" letter-spacing="-0.5">
        ${titleLine2}
      </text>` : ''}

      <!-- Subtitle Description -->
      <text x="80" y="${titleLine2 ? 360 : 310}" fill="rgba(255, 255, 255, 0.85)" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="500">
        ${descEscaped.slice(0, 75)}${descEscaped.length > 75 ? '...' : ''}
      </text>

      <!-- Bottom Card: Branding & CTA -->
      <g transform="translate(80, 480)">
        <rect width="260" height="60" rx="30" fill="#ffffff"/>
        <text x="130" y="38" fill="#0f172a" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="900" text-anchor="middle">
          Play Free Now →
        </text>
      </g>

      <text x="370" y="520" fill="rgba(255, 255, 255, 0.9)" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="bold">
        kpulsequiz.com
      </text>
    </svg>
    `;

    const outputPath = path.join(OUTPUT_DIR, `${quiz.slug}.png`);

    let mascotFile = HOBI_PATH;
    if (quiz.slug === 'blackpink-blink-trivia') {
      const bpMascot = path.join(__dirname, '..', 'public', 'images', 'mascot', 'bomi-blackpink.png');
      if (fs.existsSync(bpMascot)) mascotFile = bpMascot;
    } else if (quiz.slug === 'bts-army-trivia') {
      const btsMascot = path.join(__dirname, '..', 'public', 'images', 'mascot', 'hobi-bts.png');
      if (fs.existsSync(btsMascot)) mascotFile = btsMascot;
    } else if (quiz.slug === 'stray-kids-stay-trivia' || quiz.slug === 'which-stray-kids-member-are-you') {
      const skzMascot = path.join(__dirname, '..', 'public', 'images', 'mascot', 'hobi-skz.png');
      if (fs.existsSync(skzMascot)) mascotFile = skzMascot;
    }

    // If mascot exists, resize and composite onto right side of image
    if (fs.existsSync(mascotFile)) {
      const mascotBuffer = await sharp(mascotFile)
        .resize(360, 360, { fit: 'inside' })
        .toBuffer();

      await sharp(Buffer.from(svg))
        .composite([
          {
            input: mascotBuffer,
            top: 135,
            left: 780,
          },
        ])
        .png({ quality: 90 })
        .toFile(outputPath);
    } else {
      await sharp(Buffer.from(svg))
        .png({ quality: 90 })
        .toFile(outputPath);
    }

    console.log(`Generated OG Image for ${quiz.slug} -> ${outputPath}`);
  }
}

generateAll().catch(console.error);
