import { Language } from './translations';

export interface ResultCardData {
  type: 'trivia' | 'personality';
  quizTitle: string;
  slug?: string;
  lang?: Language;
  /** Mascot art drawn as the card's hero image (same-origin URL). */
  mascotUrl?: string;
  /** Overrides the per-slug accent colour, e.g. the result's own colour. */
  accentColor?: string;
  // Trivia properties
  score?: number;
  totalQuestions?: number;
  totalPoints?: number;
  badgeTitle?: string;
  badgeEmoji?: string;
  userNickname?: string;
  timeFormatted?: string;
  // Personality properties
  memberName?: string;
  memberTitle?: string;
  memberSubtitle?: string;
  memberEmoji?: string;
  traits?: string[];
  bestMatchName?: string;
  twinLabel?: string;
  skzooName?: string;
  /** Group label for the "Your ___ soulmate" line, e.g. "BTS". */
  groupName?: string;
  /** Top results with score-based percentages, winner first (see getTopMatches). */
  topMatches?: { name: string; percent: number }[];
  bgGradient?: string;
}

// 9:16 so the card fills an Instagram / TikTok story, the main place people show results off.
const WIDTH = 1080;
const HEIGHT = 1920;
const FONT_STACK = 'system-ui, -apple-system, "Segoe UI", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';

function font(weight: number | string, size: number) {
  return `${weight} ${size}px ${FONT_STACK}`;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawFourPointStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string, alpha = 0.85) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - r);
  ctx.quadraticCurveTo(cx, cy, cx + r, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy + r);
  ctx.quadraticCurveTo(cx, cy, cx - r, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy - r);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// Separator that keeps multi-word items (hashtags) together when wrapping.
const ITEM_SEPARATOR = ' ';

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const separator = text.includes(ITEM_SEPARATOR) ? ITEM_SEPARATOR : text.includes(' ') ? ' ' : '';
  const tokens = separator ? text.split(separator) : Array.from(text);
  const joiner = separator;
  const lines: string[] = [];
  let line = '';
  for (const token of tokens) {
    const candidate = line ? line + joiner + token : token;
    if (ctx.measureText(candidate).width <= maxWidth || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = token;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  opts: { maxWidth: number; maxLines: number; maxSize: number; minSize: number; weight: number | string }
): { lines: string[]; size: number } {
  for (let size = opts.maxSize; size >= opts.minSize; size -= 4) {
    ctx.font = font(opts.weight, size);
    const lines = wrapLines(ctx, text, opts.maxWidth);
    if (lines.length <= opts.maxLines && lines.every((l) => ctx.measureText(l).width <= opts.maxWidth)) {
      return { lines, size };
    }
  }
  ctx.font = font(opts.weight, opts.minSize);
  const lines = wrapLines(ctx, text, opts.maxWidth).slice(0, opts.maxLines);
  let last = lines[lines.length - 1] ?? '';
  while (last.length > 1 && ctx.measureText(last + '…').width > opts.maxWidth) last = last.slice(0, -1);
  lines[lines.length - 1] = last + '…';
  return { lines, size: opts.minSize };
}

function drawFitted(
  ctx: CanvasRenderingContext2D,
  text: string,
  y: number,
  color: string,
  opts: { maxWidth: number; maxLines: number; maxSize: number; minSize: number; weight: number | string }
): number {
  const { lines, size } = fitText(ctx, text, opts);
  const lineHeight = Math.round(size * 1.15);
  ctx.font = font(opts.weight, size);
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  lines.forEach((line, i) => ctx.fillText(line, WIDTH / 2, y + i * lineHeight));
  return y + lines.length * lineHeight;
}

function drawPill(
  ctx: CanvasRenderingContext2D,
  text: string,
  y: number,
  opts: {
    size: number;
    weight: number | string;
    fill: string;
    color: string;
    padX?: number;
    height?: number;
    stroke?: string;
  }
): number {
  ctx.font = font(opts.weight, opts.size);
  const padX = opts.padX ?? 32;
  const h = opts.height ?? Math.round(opts.size * 2.05);
  const w = Math.min(WIDTH - 160, ctx.measureText(text).width + padX * 2);
  ctx.fillStyle = opts.fill;
  drawRoundedRect(ctx, (WIDTH - w) / 2, y, w, h, h / 2);
  ctx.fill();
  if (opts.stroke) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = opts.stroke;
    ctx.stroke();
  }
  ctx.fillStyle = opts.color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, WIDTH / 2, y + h / 2 + 1);
  return y + h;
}

/** Draws a row of individual glass capsule pills for #traits. */
function drawTraitPills(
  ctx: CanvasRenderingContext2D,
  traits: string[],
  y: number,
  accent: string
): number {
  const pillH = 48;
  const padX = 24;
  const gapX = 14;
  const gapY = 12;
  const maxRowW = WIDTH - 180;
  ctx.font = font(800, 23);

  const items = traits.slice(0, 4).map((t) => `#${t}`);
  const rows: { text: string; w: number }[][] = [];
  let currentRow: { text: string; w: number }[] = [];
  let currentW = 0;

  for (const item of items) {
    const w = Math.min(maxRowW, ctx.measureText(item).width + padX * 2);
    if (currentRow.length > 0 && currentW + gapX + w > maxRowW) {
      rows.push(currentRow);
      currentRow = [{ text: item, w }];
      currentW = w;
    } else {
      currentRow.push({ text: item, w });
      currentW += (currentRow.length > 1 ? gapX : 0) + w;
    }
  }
  if (currentRow.length > 0) rows.push(currentRow);

  rows.slice(0, 2).forEach((row, rIdx) => {
    const rowTotalW = row.reduce((acc, it) => acc + it.w, 0) + (row.length - 1) * gapX;
    let x = (WIDTH - rowTotalW) / 2;
    const rowY = y + rIdx * (pillH + gapY);

    for (const it of row) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.13)';
      drawRoundedRect(ctx, x, rowY, it.w, pillH, pillH / 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = accent + '88';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(it.text, x + it.w / 2, rowY + pillH / 2 + 1);
      x += it.w + gapX;
    }
  });

  return y + Math.min(2, rows.length) * (pillH + gapY) - gapY;
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

function getTheme(slug: string | undefined, bgGradient?: string, accentOverride?: string) {
  const s = (slug || '').toLowerCase();
  const g = (bgGradient || '').toLowerCase();

  let theme = { bgStart: '#0b0418', bgMid: '#1e1b4b', bgEnd: '#4f46e5', accent: '#c084fc', secondary: '#f472b6' };
  if (s.includes('blackpink')) {
    theme = { bgStart: '#090106', bgMid: '#2c061b', bgEnd: '#be185d', accent: '#f472b6', secondary: '#fb7185' };
  } else if (s.includes('twice')) {
    theme = { bgStart: '#180416', bgMid: '#500724', bgEnd: '#db2777', accent: '#f9a8d4', secondary: '#fb923c' };
  } else if (s.includes('enhypen')) {
    theme = { bgStart: '#080312', bgMid: '#2e1065', bgEnd: '#9f1239', accent: '#fb7185', secondary: '#c084fc' };
  } else if (s.includes('bts')) {
    theme = { bgStart: '#070114', bgMid: '#220b45', bgEnd: '#6d28d9', accent: '#c084fc', secondary: '#f472b6' };
  } else if (s.includes('stray-kids') || s.includes('skz')) {
    theme = { bgStart: '#0b0410', bgMid: '#2a0a1f', bgEnd: '#be123c', accent: '#fb7185', secondary: '#a855f7' };
  } else if (s.includes('aespa')) {
    theme = { bgStart: '#030712', bgMid: '#1e1b4b', bgEnd: '#0e7490', accent: '#67e8f9', secondary: '#c084fc' };
  } else if (s.includes('sserafim')) {
    theme = { bgStart: '#020617', bgMid: '#1e1b4b', bgEnd: '#be123c', accent: '#fb7185', secondary: '#38bdf8' };
  } else if (s.includes('food')) {
    theme = { bgStart: '#180404', bgMid: '#450a0a', bgEnd: '#ea580c', accent: '#fb923c', secondary: '#fde047' };
  } else if (s.includes('drama')) {
    theme = { bgStart: '#022c22', bgMid: '#064e3b', bgEnd: '#0f766e', accent: '#2dd4bf', secondary: '#f472b6' };
  }

  // Tint accent slightly if member's bgGradient has a distinctive hue
  if (!accentOverride && g) {
    if (g.includes('amber') || g.includes('yellow')) theme.accent = '#fbbf24';
    else if (g.includes('emerald') || g.includes('teal')) theme.accent = '#34d399';
    else if (g.includes('cyan') || g.includes('sky')) theme.accent = '#38bdf8';
    else if (g.includes('rose') || g.includes('pink')) theme.accent = '#f472b6';
  }

  return accentOverride ? { ...theme, accent: accentOverride } : theme;
}

function localized(lang: Language, t: { ko: string; es: string; pt: string; en: string }): string {
  return lang === 'ko' ? t.ko : lang === 'es' ? t.es : lang === 'pt' ? t.pt : t.en;
}

export async function generateResultCardBlob(data: ResultCardData): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  const lang = data.lang || 'en';
  const theme = getTheme(data.slug, data.bgGradient, data.accentColor);
  const mascot = data.mascotUrl ? await loadImage(data.mascotUrl) : null;
  const contentWidth = WIDTH - 190;
  const pad = 48;
  const footerTop = HEIGHT - pad - 118;

  const paint = (ctx: CanvasRenderingContext2D, heroBox: number, final: boolean, heroOffset = 0): number => {
    // 1. Deep Aurora Background + Dual Radial Spotlights
    const bgGrad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    bgGrad.addColorStop(0, theme.bgStart);
    bgGrad.addColorStop(0.5, theme.bgMid);
    bgGrad.addColorStop(1, theme.bgEnd);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const heroCenterY = 270 + heroOffset + heroBox / 2;
    const glow = ctx.createRadialGradient(WIDTH / 2, heroCenterY, 30, WIDTH / 2, heroCenterY, 520);
    glow.addColorStop(0, theme.accent + '77');
    glow.addColorStop(0.6, theme.secondary + '28');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // 2. Diagonal Holographic Foil Sheen Bands
    ctx.save();
    const sheenGrad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    sheenGrad.addColorStop(0, 'rgba(255,255,255,0)');
    sheenGrad.addColorStop(0.32, 'rgba(244,114,182,0.07)');
    sheenGrad.addColorStop(0.5, 'rgba(56,189,248,0.09)');
    sheenGrad.addColorStop(0.68, 'rgba(250,204,21,0.07)');
    sheenGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();

    // 3. Holographic Outer Frame + Inner Glass Card
    ctx.fillStyle = 'rgba(15, 10, 30, 0.36)';
    drawRoundedRect(ctx, pad, pad, WIDTH - pad * 2, HEIGHT - pad * 2, 56);
    ctx.fill();

    const borderGrad = ctx.createLinearGradient(pad, pad, WIDTH - pad, HEIGHT - pad);
    borderGrad.addColorStop(0, '#f472b6');
    borderGrad.addColorStop(0.35, '#c084fc');
    borderGrad.addColorStop(0.7, '#38bdf8');
    borderGrad.addColorStop(1, '#fde047');
    ctx.lineWidth = 4.5;
    ctx.strokeStyle = borderGrad;
    ctx.stroke();

    // Inner subtle frame line
    drawRoundedRect(ctx, pad + 14, pad + 14, WIDTH - (pad + 14) * 2, HEIGHT - (pad + 14) * 2, 44);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    ctx.stroke();

    // Sparkle Stars around frame
    drawFourPointStar(ctx, 130, 140, 16, '#fde047', 0.85);
    drawFourPointStar(ctx, WIDTH - 135, 165, 14, '#67e8f9', 0.8);
    drawFourPointStar(ctx, 150, heroCenterY - 90, 20, '#f472b6', 0.75);
    drawFourPointStar(ctx, WIDTH - 140, heroCenterY + 60, 18, '#fde047', 0.85);

    // 4. Header: Official Photocard Badge + Quiz Title
    let y = pad + 52;
    const headerBadge =
      data.type === 'personality'
        ? '✦ K-PULSE SOULMATE PHOTOCARD ✦'
        : '✦ K-PULSE OFFICIAL RANK CARD ✦';
    y = drawPill(ctx, headerBadge, y, {
      size: 22,
      weight: 900,
      fill: 'rgba(255, 255, 255, 0.14)',
      color: '#fde047',
      padX: 34,
      height: 50,
      stroke: theme.accent + '88',
    });

    y = drawFitted(ctx, data.quizTitle, y + 20, 'rgba(255, 255, 255, 0.94)', {
      maxWidth: contentWidth,
      maxLines: 2,
      maxSize: 40,
      minSize: 28,
      weight: 800,
    });

    // 5. Hero Mascot Stage
    const heroTop = y + 20 + heroOffset;
    const floorY = heroTop + heroBox - 12;
    ctx.save();
    ctx.translate(WIDTH / 2, floorY);
    ctx.scale(1, 0.16);
    const spot = ctx.createRadialGradient(0, 0, 0, 0, 0, heroBox * 0.5);
    spot.addColorStop(0, theme.accent + 'aa');
    spot.addColorStop(0.55, 'rgba(255, 255, 255, 0.25)');
    spot.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = spot;
    ctx.beginPath();
    ctx.arc(0, 0, heroBox * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (mascot) {
      const scale = Math.min(heroBox / mascot.naturalWidth, heroBox / mascot.naturalHeight);
      const w = mascot.naturalWidth * scale;
      const h = mascot.naturalHeight * scale;
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 42;
      ctx.shadowOffsetY = 18;
      ctx.drawImage(mascot, (WIDTH - w) / 2, heroTop + (heroBox - h), w, h);
      ctx.restore();
    } else {
      ctx.font = font(400, 200);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        (data.type === 'personality' ? data.memberEmoji : data.badgeEmoji) || '✨',
        WIDTH / 2,
        heroTop + heroBox / 2
      );
    }

    // Floating Member Emoji Orb (bottom-left of hero) & Top Match % Stamp (top-right of hero)
    if (data.type === 'personality') {
      if (data.memberEmoji) {
        const orbX = WIDTH / 2 - heroBox * 0.36;
        const orbY = heroTop + heroBox * 0.72;
        ctx.save();
        ctx.fillStyle = 'rgba(15, 23, 42, 0.78)';
        ctx.beginPath();
        ctx.arc(orbX, orbY, 54, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = theme.accent;
        ctx.stroke();
        ctx.font = font(400, 54);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(data.memberEmoji, orbX, orbY + 4);
        ctx.restore();
      }

      const winnerPct = data.topMatches?.[0]?.percent;
      if (winnerPct) {
        const stampX = WIDTH / 2 + heroBox * 0.35;
        const stampY = heroTop + 64;
        ctx.save();
        ctx.translate(stampX, stampY);
        ctx.rotate(-0.08);
        ctx.fillStyle = '#fde047';
        drawRoundedRect(ctx, -105, -36, 210, 72, 36);
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
        ctx.fillStyle = '#0f172a';
        ctx.font = font(900, 30);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${winnerPct}% SYNC`, 0, 2);
        ctx.restore();
      }
    }

    y = heroTop + heroBox + 24;

    if (data.type === 'personality') {
      const label = data.groupName
        ? localized(lang, {
            ko: `나의 ${data.groupName} 소울메이트`,
            es: `Tu alma gemela de ${data.groupName}`,
            pt: `Sua alma gêmea do ${data.groupName}`,
            en: `Your ${data.groupName} Soulmate`,
          })
        : localized(lang, {
            ko: '나의 소울메이트',
            es: 'Tu alma gemela',
            pt: 'Sua alma gêmea',
            en: 'Your Soulmate Match',
          });
      y = drawPill(ctx, label, y, {
        size: 25,
        weight: 800,
        fill: theme.accent + '33',
        color: '#fef08a',
        height: 50,
        stroke: theme.accent + '88',
      });

      y = drawFitted(ctx, data.memberName || 'Idol Match', y + 14, '#ffffff', {
        maxWidth: contentWidth,
        maxLines: 2,
        maxSize: 98,
        minSize: 56,
        weight: 900,
      });

      if (data.memberTitle) {
        y = drawFitted(ctx, data.memberTitle, y + 6, '#fde047', {
          maxWidth: contentWidth,
          maxLines: 2,
          maxSize: 36,
          minSize: 26,
          weight: 800,
        });
      }

      if (data.memberSubtitle) {
        y = drawFitted(ctx, `"${data.memberSubtitle}"`, y + 8, 'rgba(255, 255, 255, 0.85)', {
          maxWidth: contentWidth - 40,
          maxLines: 2,
          maxSize: 25,
          minSize: 20,
          weight: 600,
        });
      }

      if (data.skzooName) {
        const tLabel = data.twinLabel || 'Character Twin';
        y = drawPill(ctx, `✨ ${tLabel}: ${data.skzooName}`, y + 14, {
          size: 23,
          weight: 800,
          fill: 'rgba(0, 0, 0, 0.38)',
          color: '#fde047',
          padX: 28,
          height: 46,
          stroke: 'rgba(255,255,255,0.25)',
        });
      }

      if (data.traits && data.traits.length > 0) {
        y = drawTraitPills(ctx, data.traits, y + 18, theme.accent);
      }

      // Top-3 Match Bars inside a sleek glass panel
      const matches = (data.topMatches ?? []).slice(0, 3);
      if (matches.length > 0) {
        y += 22;
        const panelX = 96;
        const panelW = WIDTH - panelX * 2;
        const rowH = 54;
        const panelH = matches.length * rowH + 34;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        drawRoundedRect(ctx, panelX, y, panelW, panelH, 28);
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
        ctx.stroke();

        const barX = panelX + 220;
        const barW = panelW - 220 - 135;

        matches.forEach((m, i) => {
          const rowY = y + 17 + i * rowH;
          const isWinner = i === 0;
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'right';
          const nameFit = fitText(ctx, m.name, {
            maxWidth: 195,
            maxLines: 1,
            maxSize: isWinner ? 28 : 24,
            minSize: 18,
            weight: isWinner ? 900 : 700,
          });
          ctx.font = font(isWinner ? 900 : 700, nameFit.size);
          ctx.fillStyle = isWinner ? '#ffffff' : 'rgba(255, 255, 255, 0.78)';
          ctx.fillText(nameFit.lines[0], barX - 18, rowY + rowH / 2);

          ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
          drawRoundedRect(ctx, barX, rowY + 14, barW, 24, 12);
          ctx.fill();

          const fillW = Math.max(24, (barW * Math.min(100, m.percent)) / 100);
          ctx.fillStyle = isWinner ? theme.accent : 'rgba(255, 255, 255, 0.48)';
          drawRoundedRect(ctx, barX, rowY + 14, fillW, 24, 12);
          ctx.fill();

          ctx.textAlign = 'left';
          ctx.font = font(900, isWinner ? 28 : 24);
          ctx.fillStyle = isWinner ? '#fde047' : 'rgba(255, 255, 255, 0.78)';
          ctx.fillText(`${m.percent}%`, barX + barW + 18, rowY + rowH / 2);
        });

        y += panelH;
      }

      // Dedicated Best Chemistry Match Duo Box
      if (data.bestMatchName && (!final || y + 18 + 86 < footerTop)) {
        y += 18;
        const boxX = 96;
        const boxW = WIDTH - boxX * 2;
        const boxH = 82;
        ctx.fillStyle = 'rgba(244, 63, 94, 0.18)';
        drawRoundedRect(ctx, boxX, y, boxW, boxH, 24);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#fb718588';
        ctx.stroke();

        const duoLine = localized(lang, {
          ko: `💖 환상의 짝꿍 케미: ${data.bestMatchName}`,
          es: `💖 Mejor Dúo / Química: ${data.bestMatchName}`,
          pt: `💖 Melhor Dupla / Química: ${data.bestMatchName}`,
          en: `💖 Best Chemistry Duo: ${data.bestMatchName}`,
        });
        drawFitted(ctx, duoLine, y + 22, '#ffffff', {
          maxWidth: boxW - 48,
          maxLines: 1,
          maxSize: 30,
          minSize: 22,
          weight: 900,
        });
        y += boxH;
      }
    } else {
      // TRIVIA OFFICIAL RANK CERTIFICATE CARD
      const defaultBadge = localized(lang, {
        ko: '글로벌 레전드',
        es: 'Leyenda Global',
        pt: 'Lenda Global',
        en: 'Global Legend',
      });
      y = drawPill(ctx, data.badgeTitle || defaultBadge, y, {
        size: 30,
        weight: 900,
        fill: theme.accent + '33',
        color: '#fde047',
        height: 58,
        stroke: theme.accent,
      });

      if (data.userNickname?.trim()) {
        const player = localized(lang, {
          ko: `도전자: ${data.userNickname.trim()}`,
          es: `Jugador: ${data.userNickname.trim()}`,
          pt: `Jogador: ${data.userNickname.trim()}`,
          en: `Challenger: ${data.userNickname.trim()}`,
        });
        y = drawFitted(ctx, player, y + 16, 'rgba(255, 255, 255, 0.88)', {
          maxWidth: contentWidth,
          maxLines: 1,
          maxSize: 32,
          minSize: 22,
          weight: 700,
        });
      }

      const pts = data.totalPoints ?? (data.score ?? 0) * 1000;
      const ptsUnit = lang === 'ko' ? '점' : 'PTS';
      y = drawFitted(ctx, `${pts.toLocaleString()} ${ptsUnit}`, y + 14, '#ffffff', {
        maxWidth: contentWidth,
        maxLines: 1,
        maxSize: 116,
        minSize: 64,
        weight: 900,
      });

      // 3-Column Glass Stat Grid (Correct / Accuracy / Time)
      y += 24;
      const gridX = 96;
      const gridW = WIDTH - gridX * 2;
      const colW = (gridW - 28) / 3;
      const boxH = 126;
      const totalQ = data.totalQuestions ?? 5;
      const correctQ = data.score ?? 0;
      const accPct = Math.round((correctQ / Math.max(1, totalQ)) * 100);

      const statCols = [
        {
          label: localized(lang, { ko: '정답 기록', es: 'ACIERTOS', pt: 'ACERTOS', en: 'CORRECT' }),
          value: `${correctQ} / ${totalQ}`,
        },
        {
          label: localized(lang, { ko: '정답률', es: 'PRECISIÓN', pt: 'PRECISÃO', en: 'ACCURACY' }),
          value: `${accPct}%`,
        },
        {
          label: localized(lang, { ko: '소요 시간', es: 'TIEMPO', pt: 'TEMPO', en: 'SPEED' }),
          value: data.timeFormatted || '45s',
        },
      ];

      statCols.forEach((col, idx) => {
        const cx = gridX + idx * (colW + 14);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        drawRoundedRect(ctx, cx, y, colW, boxH, 24);
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.font = font(800, 20);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillText(col.label, cx + colW / 2, y + 22);

        ctx.font = font(900, 38);
        ctx.fillStyle = '#fde047';
        ctx.fillText(col.value, cx + colW / 2, y + 58);
      });
      y += boxH;

      const cta = localized(lang, {
        ko: '⚔️ 내 점수를 깰 수 있나요? 지금 도전!',
        es: '⚔️ ¿Puedes superar mi récord?',
        pt: '⚔️ Consegue superar meu recorde?',
        en: '⚔️ Can you beat my score?',
      });
      y = drawFitted(ctx, cta, y + 32, theme.accent, {
        maxWidth: contentWidth,
        maxLines: 1,
        maxSize: 36,
        minSize: 26,
        weight: 800,
      });
    }
    return y;
  };

  // Mascot dynamically sizes to balance the layout
  const BASE_HERO = 460;
  const scratch = document.createElement('canvas');
  scratch.width = WIDTH;
  scratch.height = HEIGHT;
  const scratchCtx = scratch.getContext('2d');
  const contentEnd = scratchCtx ? paint(scratchCtx, BASE_HERO, false) : footerTop - 36;
  const spare = footerTop - 36 - contentEnd;
  const heroBox = Math.round(Math.min(640, Math.max(330, BASE_HERO + spare)));
  const leftover = Math.max(0, spare - (heroBox - BASE_HERO));
  paint(ctx, heroBox, true, Math.round(leftover / 2));

  // Footer CTA Pill
  const footer = localized(lang, {
    ko: 'kpulsequiz.com 에서 무료 플레이 ✦',
    es: 'Juega gratis en kpulsequiz.com ✦',
    pt: 'Jogue grátis em kpulsequiz.com ✦',
    en: 'Play free at kpulsequiz.com ✦',
  });
  drawPill(ctx, footer, footerTop, {
    size: 28,
    weight: 900,
    fill: '#ffffff',
    color: '#0f172a',
    padX: 44,
    height: 72,
  });

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to create canvas blob'));
      }
    }, 'image/png');
  });
}

export async function downloadResultCard(data: ResultCardData, fileNamePrefix = 'kpulse-result'): Promise<void> {
  const blob = await generateResultCardBlob(data);
  const fileName = `${fileNamePrefix}-${Date.now()}.png`;
  const lang = data.lang || 'en';

  if (typeof navigator !== 'undefined' && 'canShare' in navigator) {
    try {
      const file = new File([blob], fileName, { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title:
            lang === 'ko'
              ? `나의 K-Pulse 결과: ${data.quizTitle}`
              : lang === 'es'
              ? `Mi Resultado K-Pulse: ${data.quizTitle}`
              : lang === 'pt'
              ? `Meu Resultado K-Pulse: ${data.quizTitle}`
              : `My K-Pulse Result: ${data.quizTitle}`,
          text:
            lang === 'ko'
              ? `K-Pulse에서 내 기록을 확인해보세요! https://kpulsequiz.com`
              : lang === 'es'
              ? `¡Mira mi resultado en K-Pulse! ¿Puedes superarme? https://kpulsequiz.com`
              : lang === 'pt'
              ? `Veja meu resultado no K-Pulse! Consegue me superar? https://kpulsequiz.com`
              : `Check out my score on K-Pulse! Can you beat me? https://kpulsequiz.com`,
        });
        return;
      }
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') {
        return;
      }
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
