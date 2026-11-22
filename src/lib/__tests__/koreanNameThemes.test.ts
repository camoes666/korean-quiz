import { describe, it, expect } from 'vitest';
import {
  KOREAN_NAME_CARD_THEMES,
  KOREAN_NAME_CARD_THEME_IDS,
  getKoreanNameCardTheme,
  getKoreanNameThemeLabel,
} from '../koreanNameThemes';

describe('koreanNameThemes', () => {
  it('defines all 6 collector themes including 5 Saju elements and najeon', () => {
    expect(KOREAN_NAME_CARD_THEME_IDS).toEqual([
      'wood',
      'fire',
      'earth',
      'metal',
      'water',
      'najeon',
    ]);
    expect(Object.keys(KOREAN_NAME_CARD_THEMES)).toHaveLength(6);
  });

  it('provides 4-language labels, non-empty gradients, and 3-stop canvas palettes for every theme', () => {
    for (const id of KOREAN_NAME_CARD_THEME_IDS) {
      const theme = KOREAN_NAME_CARD_THEMES[id];
      expect(theme.id).toBe(id);

      expect(theme.label.en).toBeTruthy();
      expect(theme.label.ko).toBeTruthy();
      expect(theme.label.es).toBeTruthy();
      expect(theme.label.pt).toBeTruthy();

      expect(theme.swatchGradient).toContain('gradient(');
      expect(theme.outerFrameGradient).toContain('gradient(');
      expect(theme.headerGradient).toContain('gradient(');
      expect(theme.surfaceGradient).toContain('gradient(');

      expect(theme.canvas.bgStops).toHaveLength(3);
      expect(theme.canvas.cardStops).toHaveLength(3);
      expect(theme.canvas.headerStops).toHaveLength(3);
      expect(theme.canvas.idolBgStops).toHaveLength(2);
    }
  });

  it('resolves valid theme ids and falls back safely to wood for unknown or nullish input', () => {
    for (const id of KOREAN_NAME_CARD_THEME_IDS) {
      expect(getKoreanNameCardTheme(id)).toBe(KOREAN_NAME_CARD_THEMES[id]);
    }
    expect(getKoreanNameCardTheme('unknown-theme')).toBe(KOREAN_NAME_CARD_THEMES.wood);
    expect(getKoreanNameCardTheme(null)).toBe(KOREAN_NAME_CARD_THEMES.wood);
    expect(getKoreanNameCardTheme(undefined)).toBe(KOREAN_NAME_CARD_THEMES.wood);
  });

  it('returns localized theme labels for en, es, pt, ko and falls back to en for other languages', () => {
    const najeon = KOREAN_NAME_CARD_THEMES.najeon;
    expect(getKoreanNameThemeLabel(najeon, 'en')).toBe(najeon.label.en);
    expect(getKoreanNameThemeLabel(najeon, 'es')).toBe(najeon.label.es);
    expect(getKoreanNameThemeLabel(najeon, 'pt')).toBe(najeon.label.pt);
    expect(getKoreanNameThemeLabel(najeon, 'ko')).toBe(najeon.label.ko);
    expect(getKoreanNameThemeLabel(najeon, 'ru')).toBe(najeon.label.en);
    expect(getKoreanNameThemeLabel(najeon, 'zh')).toBe(najeon.label.en);
  });
});
