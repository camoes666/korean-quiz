import type { KoreanNameCandidate, KoreanNameResult } from './koreanNameEngine';
import { pickKoreanNameCopy } from './koreanNameEngine';
import type { Language } from './translations';
import { localizePath } from './i18nRoutes';
import { getElementDisplayName } from './chemistryEngine';
import {
  getKoreanNameCardTheme,
  type KoreanNameCardThemeId,
} from './koreanNameThemes';

const WIDTH = 1080;
const HEIGHT = 1920;
const FONT_SANS =
  'system-ui, -apple-system, "Segoe UI", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
const FONT_MONO =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

function zeroAlpha(rgba: string): string {
  return rgba.replace(/[\d.]+\)$/, '0)');
}

function fontSans(weight: number | string, size: number) {
  return `${weight} ${size}px ${FONT_SANS}`;
}

function fontMono(weight: number | string, size: number) {
  return `${weight} ${size}px ${FONT_MONO}`;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines = 2
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
      if (lines.length === maxLines) break;
    }
  }
  if (current && lines.length < maxLines) {
    lines.push(current);
  }
  if (lines.length > 0 && ctx.measureText(lines[lines.length - 1]).width > maxWidth) {
    let last = lines[lines.length - 1];
    while (last.length > 1 && ctx.measureText(`${last}…`).width > maxWidth) {
      last = last.slice(0, -1);
    }
    lines[lines.length - 1] = `${last}…`;
  }
  return lines;
}

async function loadImage(url: string): Promise<HTMLImageElement | null> {
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  } catch {
    return null;
  }
}

/**
 * Draws a traditional Korean vermilion square seal stamp (낙관 도장) in 2x2 classical Hanja layout.
 * Traditional vertical seal order: top-right, bottom-right, top-left, bottom-left.
 */
function drawVermilionSeal(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  sealChars: string,
  onDark = false
) {
  const chars = Array.from(sealChars).slice(0, 4);
  while (chars.length < 4) chars.push('印');

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((-4 * Math.PI) / 180);

  const half = size / 2;

  // Outer vermilion body
  ctx.fillStyle = '#C8322B';
  drawRoundedRect(ctx, -half, -half, size, size, 14);
  ctx.fill();

  if (onDark) {
    ctx.strokeStyle = 'rgba(255, 249, 242, 0.35)';
    ctx.lineWidth = 3;
    drawRoundedRect(ctx, -half, -half, size, size, 14);
    ctx.stroke();
  }

  // Inner carved border
  ctx.strokeStyle = 'rgba(255, 250, 244, 0.88)';
  ctx.lineWidth = 4;
  drawRoundedRect(ctx, -half + 8, -half + 8, size - 16, size - 16, 8);
  ctx.stroke();

  // Subtle cross guide
  ctx.strokeStyle = 'rgba(255, 250, 244, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, -half + 14);
  ctx.lineTo(0, half - 14);
  ctx.moveTo(-half + 14, 0);
  ctx.lineTo(half - 14, 0);
  ctx.stroke();

  // 2x2 Hanja characters in traditional Korean seal reading order (right column top->bottom, left column top->bottom)
  const positions: Array<[number, number]> = [
    [size * 0.19, -size * 0.17],
    [size * 0.19, size * 0.19],
    [-size * 0.19, -size * 0.17],
    [-size * 0.19, size * 0.19],
  ];

  ctx.fillStyle = '#FFF9F2';
  ctx.font = fontSans(900, Math.round(size * 0.31));
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  chars.forEach((ch, idx) => {
    const [px, py] = positions[idx];
    ctx.fillText(ch, px, py);
  });

  ctx.restore();
}

function drawBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  seedText: string,
  color = '#14151A'
) {
  let hash = 2166136261;
  for (let i = 0; i < seedText.length; i++) {
    hash ^= seedText.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  let cursor = x;
  const endX = x + width;
  let step = 0;

  ctx.fillStyle = color;
  while (cursor < endX - 6) {
    hash = Math.imul(hash ^ (step + 17), 16777619);
    const barW = (Math.abs(hash) % 3) * 2 + 2;
    const gapW = (Math.abs(hash >> 4) % 3) * 2 + 3;
    if (cursor + barW <= endX) {
      ctx.fillRect(cursor, y, barW, height);
    }
    cursor += barW + gapW;
    step++;
  }
}

export async function generateKoreanNameCardBlob(
  result: KoreanNameResult,
  candidate: KoreanNameCandidate,
  lang: Language = 'en',
  themeId?: KoreanNameCardThemeId
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  const theme = getKoreanNameCardTheme(themeId ?? result.luckyElement.element);
  const c = theme.canvas;
  const coreTheme = getKoreanNameCardTheme(result.coreElement.element);
  const luckyTheme = getKoreanNameCardTheme(result.luckyElement.element);

  // 1. Rich Multi-Stop Gradient Canvas Backdrop
  const bgGrad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  bgGrad.addColorStop(0, c.bgStops[0]);
  bgGrad.addColorStop(0.5, c.bgStops[1]);
  bgGrad.addColorStop(1, c.bgStops[2]);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Subtle translucent Korean diagonal lattice overlay
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)';
  ctx.lineWidth = 1;
  const latticeStep = 72;
  for (let offset = -HEIGHT; offset < WIDTH + HEIGHT; offset += latticeStep) {
    ctx.beginPath();
    ctx.moveTo(offset, 0);
    ctx.lineTo(offset + HEIGHT, HEIGHT);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(offset + HEIGHT, 0);
    ctx.lineTo(offset, HEIGHT);
    ctx.stroke();
  }
  ctx.restore();

  // Outer editorial frame
  ctx.strokeStyle = c.frameBorder;
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, 36, 36, WIDTH - 72, HEIGHT - 72, 36);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, 50, 50, WIDTH - 100, HEIGHT - 100, 28);
  ctx.stroke();

  // 2. Top Official Header Strip
  ctx.fillStyle = c.outerAccent;
  ctx.beginPath();
  ctx.arc(102, 114, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = c.outerInkPrimary;
  ctx.font = fontMono(700, 22);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('K-PULSE · OFFICIAL KOREAN NAME ID', 124, 115);

  ctx.fillStyle = c.outerInkMuted;
  ctx.font = fontMono(600, 22);
  ctx.textAlign = 'right';
  ctx.fillText(result.serialCode, WIDTH - 88, 115);

  // Divider line
  ctx.strokeStyle = c.frameBorder;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(88, 156);
  ctx.lineTo(WIDTH - 88, 156);
  ctx.stroke();

  // 3. Center Collector Specimen Card
  const cardX = 80;
  const cardY = 196;
  const cardW = WIDTH - 160;
  const cardH = 660;
  const ribbonH = 74;

  ctx.save();
  ctx.shadowColor = 'rgba(10, 12, 24, 0.28)';
  ctx.shadowBlur = 42;
  ctx.shadowOffsetY = 18;
  const cardGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
  cardGrad.addColorStop(0, c.cardStops[0]);
  cardGrad.addColorStop(0.48, c.cardStops[1]);
  cardGrad.addColorStop(1, c.cardStops[2]);
  ctx.fillStyle = cardGrad;
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 32);
  ctx.fill();
  ctx.restore();

  // Clipped interior overlays (aura glow + colored top ribbon)
  ctx.save();
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 32);
  ctx.clip();

  // Soft radial pearl glow
  const glowGrad = ctx.createRadialGradient(
    cardX + cardW * 0.85,
    cardY + cardH * 0.26,
    12,
    cardX + cardW * 0.85,
    cardY + cardH * 0.26,
    430
  );
  glowGrad.addColorStop(0, c.glowColor);
  glowGrad.addColorStop(1, zeroAlpha(c.glowColor));
  ctx.fillStyle = glowGrad;
  ctx.fillRect(cardX, cardY, cardW, cardH);

  // Colored top ribbon
  const ribbonGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + ribbonH);
  ribbonGrad.addColorStop(0, c.headerStops[0]);
  ribbonGrad.addColorStop(0.52, c.headerStops[1]);
  ribbonGrad.addColorStop(1, c.headerStops[2]);
  ctx.fillStyle = ribbonGrad;
  ctx.fillRect(cardX, cardY, cardW, ribbonH);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX, cardY + ribbonH);
  ctx.lineTo(cardX + cardW, cardY + ribbonH);
  ctx.stroke();

  // Ribbon header text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
  ctx.beginPath();
  ctx.arc(cardX + 48, cardY + ribbonH / 2, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = fontMono(700, 20);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('OFFICIAL KOREAN NAME ID', cardX + 68, cardY + ribbonH / 2 + 1);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.86)';
  ctx.font = fontMono(600, 19);
  ctx.textAlign = 'right';
  ctx.fillText(result.serialCode, cardX + cardW - 44, cardY + ribbonH / 2 + 1);

  ctx.restore();

  // Outer card border
  ctx.strokeStyle = c.cardBorder;
  ctx.lineWidth = 2.5;
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 32);
  ctx.stroke();

  // Card corner registration ticks (positioned cleanly inside card body below ribbon)
  ctx.strokeStyle = c.tickColor;
  ctx.lineWidth = 3;
  const corners: Array<[number, number, number, number]> = [
    [cardX + 26, cardY + ribbonH + 20, 1, 1],
    [cardX + cardW - 26, cardY + ribbonH + 20, -1, 1],
    [cardX + 26, cardY + cardH - 26, 1, -1],
    [cardX + cardW - 26, cardY + cardH - 26, -1, -1],
  ];
  for (const [cx, cy, dx, dy] of corners) {
    ctx.beginPath();
    ctx.moveTo(cx, cy + dy * 16);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + dx * 16, cy);
    ctx.stroke();
  }

  // Aura tag pill inside specimen card body
  const auraText = pickKoreanNameCopy(candidate.givenName.auraTag, lang);
  ctx.font = fontSans(700, 22);
  const auraW = Math.min(480, ctx.measureText(auraText).width + 44);
  ctx.fillStyle = c.pillBg;
  drawRoundedRect(ctx, cardX + 52, cardY + 98, auraW, 44, 22);
  ctx.fill();
  ctx.strokeStyle = c.pillBorder;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = c.pillText;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(auraText, cardX + 52 + auraW / 2, cardY + 121);

  // Origin name -> badge if provided
  let nameStartY = cardY + 174;
  if (result.input.realName) {
    const originText = `${result.input.realName.toUpperCase()}  →`;
    ctx.fillStyle = c.inkMuted;
    ctx.font = fontMono(700, 24);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(originText, cardX + 56, cardY + 160);
    nameStartY = cardY + 206;
  }

  // Massive Hangul Name
  ctx.fillStyle = c.inkPrimary;
  ctx.font = fontSans(900, 138);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(candidate.fullHangul, cardX + 52, nameStartY);

  // Vermilion Seal Stamp on right side of specimen card
  drawVermilionSeal(
    ctx,
    cardX + cardW - 146,
    cardY + 286,
    168,
    candidate.sealChars,
    theme.isDark
  );

  // Romanization + Phonetic + Hanja line
  const romanY = nameStartY + 162;
  ctx.fillStyle = c.inkPrimary;
  ctx.font = fontSans(800, 44);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(candidate.fullRomanized, cardX + 56, romanY);

  const phoneticPrefix = `/${candidate.phoneticGuide}/   ·   `;
  ctx.fillStyle = c.inkMuted;
  ctx.font = fontMono(600, 25);
  ctx.fillText(phoneticPrefix, cardX + 56, romanY + 56);
  const prefixW = ctx.measureText(phoneticPrefix).width;

  ctx.fillStyle = c.hanjaAccent;
  ctx.font = fontSans(800, 27);
  ctx.fillText(candidate.fullHanja, cardX + 56 + prefixW, romanY + 54);

  // Given name poetic meaning inside bottom of specimen card
  ctx.strokeStyle = c.dividerColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 52, cardY + cardH - 132);
  ctx.lineTo(cardX + cardW - 52, cardY + cardH - 132);
  ctx.stroke();

  const meaningText = pickKoreanNameCopy(candidate.givenName.meaning, lang);
  ctx.fillStyle = c.inkSecondary;
  ctx.font = fontSans(600, 26);
  const meaningLines = wrapText(ctx, meaningText, cardW - 112, 2);
  meaningLines.forEach((line, i) => {
    ctx.fillText(line, cardX + 56, cardY + cardH - 108 + i * 36);
  });

  // 4. Hanja & Syllable Breakdown (3-Column Grid)
  const sylY = 896;
  const sylGap = 20;
  const sylW = (WIDTH - 160 - sylGap * 2) / 3;
  const sylH = 228;

  const syllableBoxes = [
    {
      role: lang === 'ko' ? '성씨' : lang === 'es' ? 'Apellido' : lang === 'pt' ? 'Sobrenome' : 'Surname',
      hangul: candidate.surname.hangul,
      hanja: candidate.surname.hanja,
      meaning: pickKoreanNameCopy(candidate.surname.meaning, lang),
    },
    {
      role: lang === 'ko' ? '첫째 음절' : lang === 'es' ? '1.ª Sílaba' : lang === 'pt' ? '1ª Sílaba' : 'Syllable 1',
      hangul: candidate.givenName.syllables[0].hangul,
      hanja: candidate.givenName.syllables[0].hanja,
      meaning: pickKoreanNameCopy(candidate.givenName.syllables[0].meaning, lang),
    },
    {
      role: lang === 'ko' ? '둘째 음절' : lang === 'es' ? '2.ª Sílaba' : lang === 'pt' ? '2ª Sílaba' : 'Syllable 2',
      hangul: candidate.givenName.syllables[1].hangul,
      hanja: candidate.givenName.syllables[1].hanja,
      meaning: pickKoreanNameCopy(candidate.givenName.syllables[1].meaning, lang),
    },
  ];

  syllableBoxes.forEach((box, idx) => {
    const bx = 80 + idx * (sylW + sylGap);
    ctx.fillStyle = c.sylCardBg;
    drawRoundedRect(ctx, bx, sylY, sylW, sylH, 24);
    ctx.fill();

    // Clipped top color accent stripe
    ctx.save();
    drawRoundedRect(ctx, bx, sylY, sylW, sylH, 24);
    ctx.clip();
    ctx.fillStyle = c.sylTopAccent;
    ctx.fillRect(bx, sylY, sylW, 7);
    ctx.restore();

    ctx.strokeStyle = c.sylCardBorder;
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, bx, sylY, sylW, sylH, 24);
    ctx.stroke();

    ctx.fillStyle = c.inkMuted;
    ctx.font = fontMono(700, 19);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(box.role, bx + sylW / 2, sylY + 26);

    // Render Hangul in primary ink and Hanja in vibrant accent centered together
    ctx.font = fontSans(800, 42);
    const hangulPart = `${box.hangul} `;
    const hanjaPart = `(${box.hanja})`;
    const hangulW = ctx.measureText(hangulPart).width;
    const hanjaW = ctx.measureText(hanjaPart).width;
    const totalTitleW = hangulW + hanjaW;
    const titleStartX = bx + (sylW - totalTitleW) / 2;

    ctx.textAlign = 'left';
    ctx.fillStyle = c.inkPrimary;
    ctx.fillText(hangulPart, titleStartX, sylY + 62);
    ctx.fillStyle = c.hanjaAccent;
    ctx.fillText(hanjaPart, titleStartX + hangulW, sylY + 62);

    ctx.textAlign = 'center';
    ctx.fillStyle = c.inkSecondary;
    ctx.font = fontSans(600, 21);
    const lines = wrapText(ctx, box.meaning, sylW - 32, 2);
    lines.forEach((line, lIdx) => {
      ctx.fillText(line, bx + sylW / 2, sylY + 132 + lIdx * 28);
    });
  });

  // 5. K-Saju Five Elements Balance Box
  const sajuY = 1156;
  const sajuH = 192;
  ctx.fillStyle = c.sajuCardBg;
  drawRoundedRect(ctx, 80, sajuY, WIDTH - 160, sajuH, 28);
  ctx.fill();
  ctx.strokeStyle = c.sajuCardBorder;
  ctx.lineWidth = 2;
  ctx.stroke();

  const sajuHeader =
    lang === 'ko'
      ? 'K-사주 오행 밸런스'
      : lang === 'es'
      ? 'Equilibrio K-Saju (Cinco Elementos)'
      : lang === 'pt'
      ? 'Equilíbrio K-Saju (Cinco Elementos)'
      : 'K-Saju Five Elements Balance';
  ctx.fillStyle = c.inkMuted;
  ctx.font = fontMono(700, 20);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(sajuHeader, 118, sajuY + 26);

  const coreText = `${result.coreElement.hanja} ${getElementDisplayName(result.coreElement, lang)}`;
  const luckyText = `${result.luckyElement.hanja} ${getElementDisplayName(result.luckyElement, lang)}`;

  const coreLabel =
    lang === 'ko' ? '타고난 기운' : lang === 'es' ? 'Nacimiento' : lang === 'pt' ? 'Nascimento' : 'Birth Element';
  const luckyLabel =
    lang === 'ko' ? '보완 이름 기운' : lang === 'es' ? 'Suerte del Nombre' : lang === 'pt' ? 'Sorte do Nome' : 'Name Luck';

  // Core element dot + label + value
  ctx.fillStyle = coreTheme.badgeDotColor;
  ctx.beginPath();
  ctx.arc(125, sajuY + 83, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = c.inkSecondary;
  ctx.font = fontSans(600, 20);
  ctx.fillText(coreLabel, 142, sajuY + 72);
  ctx.fillStyle = c.inkPrimary;
  ctx.font = fontSans(800, 30);
  ctx.fillText(coreText, 118, sajuY + 106);

  // Connecting arrow
  ctx.fillStyle = c.hanjaAccent;
  ctx.font = fontSans(800, 34);
  ctx.textAlign = 'center';
  ctx.fillText('→', WIDTH / 2 - 12, sajuY + 104);

  // Lucky element dot + label + value
  ctx.fillStyle = luckyTheme.badgeDotColor;
  ctx.beginPath();
  ctx.arc(WIDTH / 2 + 51, sajuY + 83, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.textAlign = 'left';
  ctx.fillStyle = theme.isDark ? c.hanjaAccent : luckyTheme.chipText;
  ctx.font = fontSans(700, 20);
  ctx.fillText(luckyLabel, WIDTH / 2 + 68, sajuY + 72);
  ctx.fillStyle = c.inkPrimary;
  ctx.font = fontSans(800, 30);
  ctx.fillText(luckyText, WIDTH / 2 + 44, sajuY + 106);

  // 6. Matched K-Pop Idol Banner
  const idolY = 1380;
  const idolH = 228;
  const idolGrad = ctx.createLinearGradient(80, idolY, WIDTH - 80, idolY + idolH);
  idolGrad.addColorStop(0, c.idolBgStops[0]);
  idolGrad.addColorStop(1, c.idolBgStops[1]);
  ctx.fillStyle = idolGrad;
  drawRoundedRect(ctx, 80, idolY, WIDTH - 160, idolH, 28);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.lineWidth = 2;
  ctx.stroke();

  const idolEyebrow =
    lang === 'ko'
      ? '이름 사주 찰떡 K-Pop 소울메이트'
      : lang === 'es'
      ? 'Idol K-Pop Más Compatible con Tu Nombre'
      : lang === 'pt'
      ? 'Idol K-Pop Mais Compatível com Seu Nome'
      : 'Top K-Pop Soulmate Match';

  ctx.fillStyle = c.idolEyebrowColor;
  ctx.font = fontMono(700, 20);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(idolEyebrow, 118, idolY + 32);

  const idolName =
    lang === 'ko'
      ? result.matchedIdol.member.nameKo
      : result.matchedIdol.member.name;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = fontSans(900, 44);
  ctx.fillText(
    `${idolName} (${result.matchedIdol.group.name})`,
    118,
    idolY + 72
  );

  const compatText =
    lang === 'ko'
      ? `오행·운명 조화도 ${result.matchedIdol.totalScore}%`
      : lang === 'es'
      ? `Compatibilidad K-Saju ${result.matchedIdol.totalScore}%`
      : lang === 'pt'
      ? `Compatibilidade K-Saju ${result.matchedIdol.totalScore}%`
      : `${result.matchedIdol.totalScore}% K-Saju Chemistry Match`;
  ctx.fillStyle = '#E2E8F0';
  ctx.font = fontSans(600, 26);
  ctx.fillText(compatText, 118, idolY + 138);

  const mascotImg = await loadImage('/images/hobi01.png');
  if (mascotImg) {
    const mSize = 166;
    ctx.drawImage(
      mascotImg,
      WIDTH - 80 - mSize - 24,
      idolY + (idolH - mSize) / 2,
      mSize,
      mSize
    );
  }

  // 7. Bottom Barcode & Localized URL Footer
  drawBarcode(
    ctx,
    88,
    1660,
    440,
    74,
    `${result.serialCode}-${candidate.fullRomanized}`,
    c.outerBarcodeColor
  );

  ctx.fillStyle = c.outerInkMuted;
  ctx.font = fontMono(700, 22);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(result.serialCode, 88, 1750);

  const siteUrlLabel = `kpulsequiz.com${localizePath('/korean-name', lang)}`;
  const ctaLabel =
    lang === 'ko'
      ? '내 한국 이름 발급받기'
      : lang === 'es'
      ? 'Crea tu nombre coreano'
      : lang === 'pt'
      ? 'Crie seu nome coreano'
      : 'Get your Korean name';

  ctx.fillStyle = c.outerInkPrimary;
  ctx.font = fontSans(800, 26);
  ctx.textAlign = 'right';
  ctx.fillText(ctaLabel, WIDTH - 88, 1670);

  ctx.fillStyle = c.outerAccent;
  ctx.font = fontMono(700, 24);
  ctx.fillText(siteUrlLabel, WIDTH - 88, 1712);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to create Korean name card blob'));
    }, 'image/png');
  });
}

export async function downloadKoreanNameCard(
  result: KoreanNameResult,
  candidate: KoreanNameCandidate,
  lang: Language = 'en',
  themeId?: KoreanNameCardThemeId
): Promise<void> {
  const blob = await generateKoreanNameCardBlob(result, candidate, lang, themeId);
  const safeName = candidate.fullRomanized.toLowerCase().replace(/\s+/g, '-');
  const fileName = `kpulse-korean-name-${safeName}.png`;

  if (typeof navigator !== 'undefined' && 'canShare' in navigator) {
    try {
      const file = new File([blob], fileName, { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${candidate.fullHangul} (${candidate.fullRomanized}) — K-Pulse`,
          text:
            lang === 'ko'
              ? `내 K-사주 한국 이름은 ${candidate.fullHangul}! https://kpulsequiz.com/ko/korean-name`
              : lang === 'es'
              ? `¡Mi nombre coreano según mi K-Saju es ${candidate.fullHangul} (${candidate.fullRomanized})! https://kpulsequiz.com/es/korean-name`
              : lang === 'pt'
              ? `Meu nome coreano segundo o K-Saju é ${candidate.fullHangul} (${candidate.fullRomanized})! https://kpulsequiz.com/pt/korean-name`
              : `My K-Saju Korean name is ${candidate.fullHangul} (${candidate.fullRomanized})! https://kpulsequiz.com/korean-name`,
        });
        return;
      }
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') return;
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
