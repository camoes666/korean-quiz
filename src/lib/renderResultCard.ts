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

// Separator that keeps multi-word items (hashtags) together when wrapping.
const ITEM_SEPARATOR = ' ';

/**
 * Greedy line wrap. Breaks between ITEM_SEPARATOR-joined items if present, else on spaces,
 * else per character (CJK text without spaces).
 */
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

/**
 * Largest font size (stepping down from maxSize) at which the text fits in maxLines lines of
 * maxWidth. At minSize it still overflows, the last line is ellipsised instead of spilling
 * past the card edge.
 */
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

/** Draws fitted, centred text starting at top y; returns the y just below it. */
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

/** Centred pill with text; returns the y just below it. */
function drawPill(
  ctx: CanvasRenderingContext2D,
  text: string,
  y: number,
  opts: { size: number; weight: number | string; fill: string; color: string; padX?: number; height?: number }
): number {
  ctx.font = font(opts.weight, opts.size);
  const padX = opts.padX ?? 32;
  const h = opts.height ?? Math.round(opts.size * 2.1);
  const w = Math.min(WIDTH - 160, ctx.measureText(text).width + padX * 2);
  ctx.fillStyle = opts.fill;
  drawRoundedRect(ctx, (WIDTH - w) / 2, y, w, h, h / 2);
  ctx.fill();
  ctx.fillStyle = opts.color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, WIDTH / 2, y + h / 2 + 1);
  return y + h;
}

async function loadImage(url: string): Promise<HTMLImageElement | null> {
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  } catch {
    return null; // Card still renders without the mascot.
  }
}

function getTheme(slug: string | undefined, accentOverride?: string) {
  const s = slug || '';
  let theme = { bgStart: '#0f172a', bgMid: '#1e1b4b', bgEnd: '#4f46e5', accent: '#a855f7' };
  if (s.includes('blackpink')) theme = { bgStart: '#090106', bgMid: '#2c061b', bgEnd: '#db2777', accent: '#f472b6' };
  else if (s.includes('bts')) theme = { bgStart: '#070114', bgMid: '#220b45', bgEnd: '#7c3aed', accent: '#c084fc' };
  else if (s.includes('stray-kids') || s.includes('skz')) theme = { bgStart: '#0b0410', bgMid: '#2a0a1f', bgEnd: '#be123c', accent: '#fb7185' };
  else if (s.includes('aespa')) theme = { bgStart: '#030712', bgMid: '#1e1b4b', bgEnd: '#0e7490', accent: '#67e8f9' };
  else if (s.includes('sserafim')) theme = { bgStart: '#020617', bgMid: '#0f172a', bgEnd: '#047857', accent: '#6ee7b7' };
  else if (s.includes('food')) theme = { bgStart: '#180404', bgMid: '#450a0a', bgEnd: '#ea580c', accent: '#fb923c' };
  else if (s.includes('drama')) theme = { bgStart: '#022c22', bgMid: '#064e3b', bgEnd: '#0f766e', accent: '#2dd4bf' };
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
  const theme = getTheme(data.slug, data.accentColor);
  const mascot = data.mascotUrl ? await loadImage(data.mascotUrl) : null;
  const contentWidth = WIDTH - 200;
  const pad = 56;
  const footerTop = HEIGHT - pad - 130;

  // Paints everything above the footer and returns where the content ends. Run once on a
  // scratch canvas to measure, then for real with the mascot sized to fill leftover space.
  const paint = (ctx: CanvasRenderingContext2D, heroBox: number, final: boolean, heroOffset = 0): number => {
    // 1. Background gradient + accent glow behind the mascot
    const bgGrad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    bgGrad.addColorStop(0, theme.bgStart);
    bgGrad.addColorStop(0.45, theme.bgMid);
    bgGrad.addColorStop(1, theme.bgEnd);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const heroCenterY = 290 + heroOffset + heroBox / 2; // header is ~260px tall
    const glow = ctx.createRadialGradient(WIDTH / 2, heroCenterY, 40, WIDTH / 2, heroCenterY, 460);
    glow.addColorStop(0, theme.accent + '66');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // 2. Glass inner card
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    drawRoundedRect(ctx, pad, pad, WIDTH - pad * 2, HEIGHT - pad * 2, 56);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.stroke();

    // 3. Header: brand pill + quiz title
    let y = pad + 64;
    y = drawPill(ctx, 'K-PULSE', y, { size: 26, weight: 900, fill: theme.accent, color: '#0f0a1a', padX: 36 });
    y = drawFitted(ctx, data.quizTitle, y + 28, 'rgba(255, 255, 255, 0.92)', {
      maxWidth: contentWidth,
      maxLines: 2,
      maxSize: 46,
      minSize: 30,
      weight: 800,
    });

    // 4. Hero mascot (contain-fit into the box)
    const heroTop = y + 28 + heroOffset;
    // Stage spotlight under the mascot (also blends the light floor patch baked into hobi01).
    const floorY = heroTop + heroBox - 14;
    ctx.save();
    ctx.translate(WIDTH / 2, floorY);
    ctx.scale(1, 0.16);
    const spot = ctx.createRadialGradient(0, 0, 0, 0, 0, heroBox * 0.48);
    spot.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
    spot.addColorStop(0.55, 'rgba(255, 255, 255, 0.22)');
    spot.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = spot;
    ctx.beginPath();
    ctx.arc(0, 0, heroBox * 0.48, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (mascot) {
      const scale = Math.min(heroBox / mascot.naturalWidth, heroBox / mascot.naturalHeight);
      const w = mascot.naturalWidth * scale;
      const h = mascot.naturalHeight * scale;
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 18;
      ctx.drawImage(mascot, (WIDTH - w) / 2, heroTop + (heroBox - h), w, h);
      ctx.restore();
    } else {
      ctx.font = font(400, 220);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText((data.type === 'personality' ? data.memberEmoji : data.badgeEmoji) || '✨', WIDTH / 2, heroTop + heroBox / 2);
    }
    y = heroTop + heroBox + 36;

    if (data.type === 'personality') {
      const label = data.groupName
        ? localized(lang, {
            ko: `나의 ${data.groupName} 소울메이트`,
            es: `Tu alma gemela de ${data.groupName}`,
            pt: `Sua alma gêmea do ${data.groupName}`,
            en: `My ${data.groupName} soulmate is`,
          })
        : localized(lang, { ko: '나의 소울메이트', es: 'Tu alma gemela', pt: 'Sua alma gêmea', en: 'My soul match is' });
      y = drawPill(ctx, label, y, { size: 28, weight: 800, fill: 'rgba(255, 255, 255, 0.14)', color: '#fef08a' });

      y = drawFitted(ctx, data.memberName || 'Idol Match', y + 18, '#ffffff', {
        maxWidth: contentWidth,
        maxLines: 2,
        maxSize: 116,
        minSize: 60,
        weight: 900,
      });
      if (data.memberTitle) {
        y = drawFitted(ctx, data.memberTitle, y + 10, 'rgba(255, 255, 255, 0.9)', {
          maxWidth: contentWidth,
          maxLines: 2,
          maxSize: 40,
          minSize: 28,
          weight: 700,
        });
      }

      // Top-3 match bars (score-based, see getTopMatches)
      const matches = (data.topMatches ?? []).slice(0, 3);
      if (matches.length > 0) {
        y += 36;
        const barX = 270;
        const barW = WIDTH - barX - 230;
        const rowH = 64;
        // Long names (e.g. food results) don't fit the label column: put each name above its bar.
        ctx.font = font(700, 24);
        const stacked = matches.some((m) => ctx.measureText(m.name).width > barX - 90);
        if (stacked) {
          const left = 130;
          const right = WIDTH - 130;
          const stackH = 96;
          matches.forEach((m, i) => {
            const rowY = y + i * stackH;
            const isWinner = i === 0;
            const weight = isWinner ? 900 : 700;
            ctx.textBaseline = 'top';
            ctx.fillStyle = isWinner ? '#ffffff' : 'rgba(255, 255, 255, 0.75)';
            ctx.font = font(900, isWinner ? 34 : 28);
            const pctText = `${m.percent}%`;
            const pctW = ctx.measureText(pctText).width;
            ctx.textAlign = 'right';
            ctx.fillText(pctText, right, rowY);
            const name = fitText(ctx, m.name, { maxWidth: right - left - pctW - 24, maxLines: 1, maxSize: isWinner ? 30 : 26, minSize: 20, weight });
            ctx.font = font(weight, name.size);
            ctx.textAlign = 'left';
            ctx.fillText(name.lines[0], left, rowY + 2);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
            drawRoundedRect(ctx, left, rowY + 50, right - left, 24, 12);
            ctx.fill();
            ctx.fillStyle = isWinner ? theme.accent : 'rgba(255, 255, 255, 0.45)';
            drawRoundedRect(ctx, left, rowY + 50, Math.max(24, ((right - left) * Math.min(100, m.percent)) / 100), 24, 12);
            ctx.fill();
          });
          y += matches.length * stackH - 16;
        } else {
          matches.forEach((m, i) => {
            const rowY = y + i * rowH;
            const isWinner = i === 0;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'right';
            ctx.font = font(isWinner ? 900 : 700, isWinner ? 32 : 28);
            ctx.fillStyle = isWinner ? '#ffffff' : 'rgba(255, 255, 255, 0.75)';
            const name = fitText(ctx, m.name, { maxWidth: barX - 90, maxLines: 1, maxSize: isWinner ? 32 : 28, minSize: 20, weight: isWinner ? 900 : 700 });
            ctx.font = font(isWinner ? 900 : 700, name.size);
            ctx.fillText(name.lines[0], barX - 20, rowY + rowH / 2);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
            drawRoundedRect(ctx, barX, rowY + 18, barW, 28, 14);
            ctx.fill();
            const fillW = Math.max(28, (barW * Math.min(100, m.percent)) / 100);
            ctx.fillStyle = isWinner ? theme.accent : 'rgba(255, 255, 255, 0.45)';
            drawRoundedRect(ctx, barX, rowY + 18, fillW, 28, 14);
            ctx.fill();

            ctx.textAlign = 'left';
            ctx.font = font(900, isWinner ? 34 : 28);
            ctx.fillStyle = isWinner ? '#ffffff' : 'rgba(255, 255, 255, 0.75)';
            ctx.fillText(`${m.percent}%`, barX + barW + 22, rowY + rowH / 2);
          });
          y += matches.length * rowH;
        }
      }

      if (data.traits && data.traits.length > 0) {
        y = drawFitted(ctx, data.traits.map((t) => `#${t}`).join(ITEM_SEPARATOR), y + 30, 'rgba(255, 255, 255, 0.85)', {
          maxWidth: contentWidth,
          maxLines: 2,
          maxSize: 30,
          minSize: 22,
          weight: 700,
        });
      }

      // On the final pass, skip it if it would still hit the footer pill.
      if (data.bestMatchName && (!final || y + 34 + 80 < footerTop)) {
        const cta = localized(lang, {
          ko: `👇 ${data.bestMatchName} 같은 친구를 태그해!`,
          es: `👇 ¡Etiqueta a tu amigo ${data.bestMatchName}!`,
          pt: `👇 Marque seu amigo ${data.bestMatchName}!`,
          en: `👇 Tag your ${data.bestMatchName} friend!`,
        });
        y = drawFitted(ctx, cta, y + 34, theme.accent, { maxWidth: contentWidth, maxLines: 2, maxSize: 34, minSize: 24, weight: 800 });
      }
    } else {
      const defaultBadge = localized(lang, { ko: '글로벌 레전드', es: 'Leyenda Global', pt: 'Lenda Global', en: 'Global Legend' });
      y = drawPill(ctx, data.badgeTitle || defaultBadge, y, { size: 32, weight: 900, fill: 'rgba(255, 255, 255, 0.14)', color: '#fef08a' });

      if (data.userNickname?.trim()) {
        const player = localized(lang, {
          ko: `도전자: ${data.userNickname.trim()}`,
          es: `Jugador: ${data.userNickname.trim()}`,
          pt: `Jogador: ${data.userNickname.trim()}`,
          en: `Player: ${data.userNickname.trim()}`,
        });
        y = drawFitted(ctx, player, y + 18, 'rgba(255, 255, 255, 0.85)', { maxWidth: contentWidth, maxLines: 1, maxSize: 32, minSize: 22, weight: 700 });
      }

      const pts = data.totalPoints ?? (data.score ?? 0) * 1000;
      const ptsUnit = lang === 'ko' ? '점' : 'PTS';
      y = drawFitted(ctx, `${pts.toLocaleString()} ${ptsUnit}`, y + 16, '#ffffff', { maxWidth: contentWidth, maxLines: 1, maxSize: 120, minSize: 64, weight: 900 });

      const scoreSummary = localized(lang, {
        ko: `${data.totalQuestions ?? 5}문제 중 ${data.score ?? 0}개 정답`,
        es: `${data.score ?? 0} / ${data.totalQuestions ?? 5} correctas`,
        pt: `${data.score ?? 0} / ${data.totalQuestions ?? 5} corretas`,
        en: `${data.score ?? 0} / ${data.totalQuestions ?? 5} correct`,
      });
      y = drawFitted(ctx, scoreSummary, y + 14, 'rgba(255, 255, 255, 0.9)', { maxWidth: contentWidth, maxLines: 1, maxSize: 44, minSize: 28, weight: 800 });

      if (data.timeFormatted) {
        const timePrefix = localized(lang, { ko: '소요 시간', es: 'Tiempo', pt: 'Tempo', en: 'Time' });
        y = drawFitted(ctx, `⏱️ ${timePrefix}: ${data.timeFormatted}`, y + 12, 'rgba(255, 255, 255, 0.7)', { maxWidth: contentWidth, maxLines: 1, maxSize: 30, minSize: 22, weight: 600 });
      }

      const cta = localized(lang, {
        ko: '⚔️ 내 기록을 깰 수 있나요?',
        es: '⚔️ ¿Puedes superar mi récord?',
        pt: '⚔️ Consegue superar meu recorde?',
        en: '⚔️ Can you beat my score?',
      });
      y = drawFitted(ctx, cta, y + 40, theme.accent, { maxWidth: contentWidth, maxLines: 1, maxSize: 38, minSize: 26, weight: 800 });
    }
    return y;
  };

  // Mascot grows into spare space (short names) or shrinks so long names keep the CTA visible.
  const BASE_HERO = 540;
  const scratch = document.createElement('canvas');
  scratch.width = WIDTH;
  scratch.height = HEIGHT;
  const scratchCtx = scratch.getContext('2d');
  const contentEnd = scratchCtx ? paint(scratchCtx, BASE_HERO, false) : footerTop - 48;
  const spare = footerTop - 48 - contentEnd;
  const heroBox = Math.round(Math.min(760, Math.max(380, BASE_HERO + spare)));
  // Space left once the mascot hits its cap is split above and below the content.
  const leftover = Math.max(0, spare - (heroBox - BASE_HERO));
  paint(ctx, heroBox, true, Math.round(leftover / 2));

  // 5. Footer: where to play
  const footer = localized(lang, {
    ko: 'kpulsequiz.com 에서 무료 플레이',
    es: 'Juega gratis en kpulsequiz.com',
    pt: 'Jogue grátis em kpulsequiz.com',
    en: 'Play free at kpulsequiz.com',
  });
  drawPill(ctx, footer, footerTop, { size: 30, weight: 900, fill: '#ffffff', color: '#0f172a', padX: 44, height: 76 });

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

  // Try native navigator.share with files first (iOS / Android Safari / Chrome)
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
        return; // User cancelled share sheet
      }
      // Fallback to direct anchor download
    }
  }

  // Fallback: standard file download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
