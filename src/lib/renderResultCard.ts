import { Language } from './translations';

export interface ResultCardData {
  type: 'trivia' | 'personality';
  quizTitle: string;
  slug?: string;
  lang?: Language;
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
  bgGradient?: string;
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

export async function generateResultCardBlob(data: ResultCardData): Promise<Blob> {
  const width = 1080;
  const height = 1350; // 4:5 Instagram feed / story standard
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  const lang = data.lang || 'en';

  // 1. Background Gradient Selection
  const isBlackpink = data.slug?.includes('blackpink');
  const isBts = data.slug?.includes('bts');
  const isFood = data.slug?.includes('food');
  const isDrama = data.slug?.includes('drama');

  let bgStart = '#0f172a';
  let bgMid = '#1e1b4b';
  let bgEnd = '#4f46e5';
  let accentColor = '#a855f7';

  if (isBlackpink) {
    bgStart = '#090106';
    bgMid = '#2c061b';
    bgEnd = '#db2777';
    accentColor = '#f472b6';
  } else if (isBts) {
    bgStart = '#070114';
    bgMid = '#220b45';
    bgEnd = '#7c3aed';
    accentColor = '#c084fc';
  } else if (isFood) {
    bgStart = '#180404';
    bgMid = '#450a0a';
    bgEnd = '#ea580c';
    accentColor = '#fb923c';
  } else if (isDrama) {
    bgStart = '#022c22';
    bgMid = '#064e3b';
    bgEnd = '#0f766e';
    accentColor = '#2dd4bf';
  }

  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, bgStart);
  bgGrad.addColorStop(0.45, bgMid);
  bgGrad.addColorStop(1, bgEnd);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft glowing ambient circles
  const glowGrad = ctx.createRadialGradient(width * 0.8, height * 0.2, 50, width * 0.8, height * 0.2, 500);
  glowGrad.addColorStop(0, accentColor + '44');
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Glassmorphism Inner Card
  const pad = 60;
  const cardW = width - pad * 2;
  const cardH = height - pad * 2;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
  drawRoundedRect(ctx, pad, pad, cardW, cardH, 48);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.stroke();

  // 3. Top Header: Brand & Tag
  const brandPillY = pad + 60;
  ctx.fillStyle = accentColor;
  drawRoundedRect(ctx, width / 2 - 200, brandPillY, 400, 52, 26);
  ctx.fill();

  const headerPillText =
    lang === 'ko'
      ? '✨ K-PULSE 공식 결과 카드 ✨'
      : lang === 'es'
      ? '✨ RESULTADO OFICIAL K-PULSE ✨'
      : lang === 'pt'
      ? '✨ RESULTADO OFICIAL K-PULSE ✨'
      : '✨ K-PULSE OFFICIAL RESULT ✨';

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(headerPillText, width / 2, brandPillY + 27);

  // Quiz Title
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
  let displayTitle = data.quizTitle;
  if (displayTitle.length > 36) {
    displayTitle = displayTitle.slice(0, 34) + '...';
  }
  ctx.fillText(displayTitle, width / 2, brandPillY + 115);

  // 4. Center Content based on Quiz Type
  if (data.type === 'personality') {
    // Member Emoji
    ctx.font = '110px system-ui, -apple-system, sans-serif';
    ctx.fillText(data.memberEmoji || '💖', width / 2, height * 0.38);

    // Subtitle Badge
    const soulMatchLabel =
      lang === 'ko'
        ? '⭐ 나의 소울메이트 ⭐'
        : lang === 'es'
        ? '⭐ TU ALMA GEMELA ⭐'
        : lang === 'pt'
        ? '⭐ SUA ALMA GÊMEA ⭐'
        : '⭐ YOUR SOUL MATCH ⭐';
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
    ctx.fillText(soulMatchLabel, width / 2, height * 0.46);

    // Member Name
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 68px system-ui, -apple-system, sans-serif';
    ctx.fillText(data.memberName || 'Idol Match', width / 2, height * 0.54);

    // Title / Archetype
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.font = 'bold 34px system-ui, -apple-system, sans-serif';
    ctx.fillText(data.memberTitle || '', width / 2, height * 0.61);

    // Subtitle quote
    if (data.memberSubtitle) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.font = 'italic 26px system-ui, -apple-system, sans-serif';
      ctx.fillText(`"${data.memberSubtitle}"`, width / 2, height * 0.67);
    }

    // Traits Box
    if (data.traits && data.traits.length > 0) {
      const traitsText = data.traits.map((t) => `#${t}`).join('   ');
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      drawRoundedRect(ctx, width / 2 - 380, height * 0.72, 760, 64, 32);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
      ctx.fillText(traitsText, width / 2, height * 0.72 + 33);
    }

    // Chemistry Match
    if (data.bestMatchName) {
      const chemLabel =
        lang === 'ko'
          ? `💖 최고의 궁합: ${data.bestMatchName}`
          : lang === 'es'
          ? `💖 Mejor Dúo: ${data.bestMatchName}`
          : lang === 'pt'
          ? `💖 Melhor Dupla: ${data.bestMatchName}`
          : `💖 Best Chemistry Match: ${data.bestMatchName}`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
      ctx.fillText(chemLabel, width / 2, height * 0.81);
    }
  } else {
    // Trivia Quiz Card Content
    // Badge Emoji
    ctx.font = '110px system-ui, -apple-system, sans-serif';
    ctx.fillText(data.badgeEmoji || '🏆', width / 2, height * 0.37);

    // Rank Badge Title
    const defaultBadge =
      lang === 'ko'
        ? '글로벌 레전드'
        : lang === 'es'
        ? 'Leyenda Global'
        : lang === 'pt'
        ? 'Lenda Global'
        : 'Global Legend';
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 34px system-ui, -apple-system, sans-serif';
    ctx.fillText(`[ ${data.badgeTitle || defaultBadge} ]`, width / 2, height * 0.45);

    // User Nickname if available
    if (data.userNickname?.trim()) {
      const playerLabel =
        lang === 'ko'
          ? `도전자: ${data.userNickname.trim()}`
          : lang === 'es' || lang === 'pt'
          ? `Jugador: ${data.userNickname.trim()}`
          : `Player: ${data.userNickname.trim()}`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
      ctx.fillText(playerLabel, width / 2, height * 0.51);
    }

    // Huge Total Points
    const pts = data.totalPoints ?? (data.score ?? 0) * 1000;
    const ptsUnit = lang === 'ko' ? '점' : 'PTS';
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 84px system-ui, -apple-system, sans-serif';
    ctx.fillText(`${pts.toLocaleString()} ${ptsUnit}`, width / 2, height * 0.60);

    // Score / Correct Answers Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    drawRoundedRect(ctx, width / 2 - 380, height * 0.66, 760, 110, 32);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.stroke();

    const scoreSummary =
      lang === 'ko'
        ? `정답 기록: ${data.totalQuestions ?? 5}문제 중 ${data.score ?? 0}개 정답`
        : lang === 'es'
        ? `Aciertos: ${data.score ?? 0} / ${data.totalQuestions ?? 5} Correctas`
        : lang === 'pt'
        ? `Acertos: ${data.score ?? 0} / ${data.totalQuestions ?? 5} Corretas`
        : `Score: ${data.score ?? 0} / ${data.totalQuestions ?? 5} Correct`;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    ctx.fillText(scoreSummary, width / 2, height * 0.66 + 45);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '500 24px system-ui, -apple-system, sans-serif';
    const timePrefix =
      lang === 'ko' ? '소요 시간' : lang === 'es' || lang === 'pt' ? 'Tiempo' : 'Time';
    const timeText = data.timeFormatted ? `⏱️ ${timePrefix}: ${data.timeFormatted}   •   ` : '';
    const speedTag =
      lang === 'ko'
        ? '⚡ 15초 스피드 퀴즈'
        : lang === 'es'
        ? '⚡ Test Rápido de 15s'
        : lang === 'pt'
        ? '⚡ Quiz Rápido de 15s'
        : '⚡ 15s Lightning Speed Test';
    ctx.fillText(`${timeText}${speedTag}`, width / 2, height * 0.66 + 85);

    // Call to Action
    const ctaText =
      lang === 'ko'
        ? '⚔️ 내 기록을 깰 수 있나요? ⚔️'
        : lang === 'es'
        ? '⚔️ ¿PUEDES SUPERAR MI RÉCORD? ⚔️'
        : lang === 'pt'
        ? '⚔️ CONSEGUE SUPERAR MEU RECORDE? ⚔️'
        : '⚔️ CAN YOU BEAT MY SCORE? ⚔️';
    ctx.fillStyle = accentColor;
    ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
    ctx.fillText(ctaText, width / 2, height * 0.81);
  }

  // 5. Bottom Watermark & Verification
  const bottomBoxY = height - pad - 120;
  ctx.fillStyle = '#ffffff';
  drawRoundedRect(ctx, width / 2 - 280, bottomBoxY, 560, 64, 32);
  ctx.fill();

  const footerWatermark =
    lang === 'ko'
      ? 'KPULSEQUIZ.COM 무료 플레이 ➔'
      : lang === 'es'
      ? 'JUEGA GRATIS EN KPULSEQUIZ.COM ➔'
      : lang === 'pt'
      ? 'JOGUE GRÁTIS EM KPULSEQUIZ.COM ➔'
      : 'PLAY FREE AT KPULSEQUIZ.COM ➔';

  ctx.fillStyle = '#0f172a';
  ctx.font = '900 24px system-ui, -apple-system, sans-serif';
  ctx.fillText(footerWatermark, width / 2, bottomBoxY + 34);

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
