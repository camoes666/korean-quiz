const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'pinterest');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const BOMI_PATH = path.join(__dirname, '..', 'public', 'images', 'mascot', 'bomi-blackpink-v2.png');
const HOBI_PATH = path.join(__dirname, '..', 'public', 'images', 'mascot', 'hobi-bts-v2.png');

async function createBlackpinkPin() {
  const bomiBuffer = fs.readFileSync(BOMI_PATH);
  const bomiResized = await sharp(bomiBuffer)
    .resize(520, null)
    .toBuffer();

  const svg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#090106"/>
        <stop offset="35%" stop-color="#2a061a"/>
        <stop offset="70%" stop-color="#500730"/>
        <stop offset="100%" stop-color="#db2777"/>
      </linearGradient>
      <radialGradient id="topGlow" cx="50%" cy="20%" r="45%">
        <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#f43f5e" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="bottomGlow" cx="50%" cy="75%" r="50%">
        <stop offset="0%" stop-color="#ec4899" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#ec4899" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <!-- Background -->
    <rect width="1000" height="1500" fill="url(#bpGrad)"/>
    <rect width="1000" height="1500" fill="url(#topGlow)"/>
    <rect width="1000" height="1500" fill="url(#bottomGlow)"/>

    <!-- Stylish Inner Border -->
    <rect x="30" y="30" width="940" height="1440" rx="40" fill="none" stroke="rgba(255, 255, 255, 0.2)" stroke-width="3"/>

    <!-- Top Badge -->
    <g transform="translate(500, 120)">
      <rect x="-240" y="-30" width="480" height="60" rx="30" fill="#f43f5e" filter="drop-shadow(0 10px 20px rgba(244, 63, 94, 0.4))"/>
      <text x="0" y="10" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="900" letter-spacing="3" text-anchor="middle">
        ✨ 10-QUESTION SOUL MATCH ✨
      </text>
    </g>

    <!-- Main Title -->
    <text x="500" y="270" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="74" font-weight="900" text-anchor="middle" letter-spacing="-1">
      Which BLACKPINK
    </text>
    <text x="500" y="355" fill="#f472b6" font-family="'Helvetica Neue', Arial, sans-serif" font-size="78" font-weight="900" text-anchor="middle" letter-spacing="-1">
      Member Are You?
    </text>

    <!-- Subtitle Card -->
    <g transform="translate(500, 430)">
      <text x="0" y="0" fill="rgba(255, 255, 255, 0.85)" font-family="'Helvetica Neue', Arial, sans-serif" font-size="28" font-weight="500" text-anchor="middle">
        Jisoo 🐰 · Jennie 🥟 · Rosé 🐿️ · Lisa 🐥
      </text>
      <text x="0" y="40" fill="rgba(255, 255, 255, 0.7)" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="400" text-anchor="middle">
        Discover your style aura &amp; sisterly chemistry!
      </text>
    </g>

    <!-- Interactive Teaser Cards -->
    <g transform="translate(500, 1070)">
      <rect x="-380" y="0" width="760" height="150" rx="24" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.25)" stroke-width="2"/>
      <text x="0" y="50" fill="#fbcfe8" font-family="'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="700" text-anchor="middle">
        &quot;If you were at Paris Fashion Week, what's your vibe?&quot;
      </text>
      <text x="0" y="100" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="500" text-anchor="middle">
        A) Classic Elegance   B) Trendsetter   C) Grunge Rock   D) Cool Edgy
      </text>
    </g>

    <!-- Bottom CTA Button -->
    <g transform="translate(500, 1310)">
      <rect x="-300" y="-45" width="600" height="90" rx="45" fill="#ffffff" filter="drop-shadow(0 15px 30px rgba(0,0,0,0.5))"/>
      <text x="0" y="15" fill="#db2777" font-family="'Helvetica Neue', Arial, sans-serif" font-size="34" font-weight="900" text-anchor="middle" letter-spacing="1">
        TAP TO PLAY FREE ➔
      </text>
    </g>
    
    <text x="500" y="1410" fill="rgba(255, 255, 255, 0.6)" font-family="'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="600" text-anchor="middle" letter-spacing="2">
      KPULSEQUIZ.COM
    </text>
  </svg>
  `;

  await sharp(Buffer.from(svg))
    .composite([
      {
        input: bomiResized,
        top: 510,
        left: 240,
      },
    ])
    .png()
    .toFile(path.join(OUTPUT_DIR, 'pin-which-blackpink-member-are-you.png'));

  console.log('Generated Blackpink Pinterest Pin!');
}

async function createBtsPin() {
  const hobiBuffer = fs.readFileSync(HOBI_PATH);
  const hobiResized = await sharp(hobiBuffer)
    .resize(500, null)
    .toBuffer();

  const svg = `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="btsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#060111"/>
        <stop offset="35%" stop-color="#1e0b3d"/>
        <stop offset="70%" stop-color="#4c1d95"/>
        <stop offset="100%" stop-color="#7c3aed"/>
      </linearGradient>
      <radialGradient id="topGlow" cx="50%" cy="20%" r="45%">
        <stop offset="0%" stop-color="#a855f7" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="bottomGlow" cx="50%" cy="75%" r="50%">
        <stop offset="0%" stop-color="#c084fc" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#c084fc" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <!-- Background -->
    <rect width="1000" height="1500" fill="url(#btsGrad)"/>
    <rect width="1000" height="1500" fill="url(#topGlow)"/>
    <rect width="1000" height="1500" fill="url(#bottomGlow)"/>

    <!-- Stylish Inner Border -->
    <rect x="30" y="30" width="940" height="1440" rx="40" fill="none" stroke="rgba(255, 255, 255, 0.2)" stroke-width="3"/>

    <!-- Top Badge -->
    <g transform="translate(500, 120)">
      <rect x="-240" y="-30" width="480" height="60" rx="30" fill="#9333ea" filter="drop-shadow(0 10px 20px rgba(147, 51, 234, 0.4))"/>
      <text x="0" y="10" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="900" letter-spacing="3" text-anchor="middle">
        💜 10-QUESTION SOULMATE TEST 💜
      </text>
    </g>

    <!-- Main Title -->
    <text x="500" y="270" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="74" font-weight="900" text-anchor="middle" letter-spacing="-1">
      Which BTS Member
    </text>
    <text x="500" y="355" fill="#c084fc" font-family="'Helvetica Neue', Arial, sans-serif" font-size="78" font-weight="900" text-anchor="middle" letter-spacing="-1">
      Is Your Soulmate?
    </text>

    <!-- Subtitle Card -->
    <g transform="translate(500, 430)">
      <text x="0" y="0" fill="rgba(255, 255, 255, 0.85)" font-family="'Helvetica Neue', Arial, sans-serif" font-size="26" font-weight="500" text-anchor="middle">
        RM 🐨 · Jin 🐹 · SUGA 🐱 · J-Hope 🐿️ · Jimin 🐥 · V 🐻 · JK 🐰
      </text>
      <text x="0" y="40" fill="rgba(255, 255, 255, 0.7)" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="400" text-anchor="middle">
        Discover your Bangtan archetype &amp; twin chemistry!
      </text>
    </g>

    <!-- Interactive Teaser Cards -->
    <g transform="translate(500, 1070)">
      <rect x="-380" y="0" width="760" height="150" rx="24" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.25)" stroke-width="2"/>
      <text x="0" y="50" fill="#e9d5ff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="700" text-anchor="middle">
        &quot;On a free Sunday in Seoul, what would you do?&quot;
      </text>
      <text x="0" y="100" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="500" text-anchor="middle">
        A) Quiet Art Museum   B) Studio Music   C) Boxing &amp; Gym   D) Cozy Cafe
      </text>
    </g>

    <!-- Bottom CTA Button -->
    <g transform="translate(500, 1310)">
      <rect x="-300" y="-45" width="600" height="90" rx="45" fill="#ffffff" filter="drop-shadow(0 15px 30px rgba(0,0,0,0.5))"/>
      <text x="0" y="15" fill="#7c3aed" font-family="'Helvetica Neue', Arial, sans-serif" font-size="34" font-weight="900" text-anchor="middle" letter-spacing="1">
        TAP TO PLAY FREE ➔
      </text>
    </g>
    
    <text x="500" y="1410" fill="rgba(255, 255, 255, 0.6)" font-family="'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="600" text-anchor="middle" letter-spacing="2">
      KPULSEQUIZ.COM
    </text>
  </svg>
  `;

  await sharp(Buffer.from(svg))
    .composite([
      {
        input: hobiResized,
        top: 510,
        left: 250,
      },
    ])
    .png()
    .toFile(path.join(OUTPUT_DIR, 'pin-which-bts-member-are-you.png'));

  console.log('Generated BTS Pinterest Pin!');
}

async function main() {
  await createBlackpinkPin();
  await createBtsPin();
}

main().catch(console.error);
