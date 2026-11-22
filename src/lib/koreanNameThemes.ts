import type { SajuElement } from '../data/idolChemistry';
import type { Language } from './translations';

export type KoreanNameCardThemeId = SajuElement | 'najeon';

export const KOREAN_NAME_CARD_THEME_IDS: KoreanNameCardThemeId[] = [
  'wood',
  'fire',
  'earth',
  'metal',
  'water',
  'najeon',
];

export interface KoreanNameCardTheme {
  id: KoreanNameCardThemeId;
  isDark: boolean;
  label: {
    en: string;
    ko: string;
    es: string;
    pt: string;
  };
  swatchGradient: string;
  outerFrameGradient: string;
  outerBorderColor: string;
  headerGradient: string;
  headerBorderColor: string;
  surfaceGradient: string;
  auraMeshCss: string;
  latticeColor: string;
  cornerTickColor: string;
  inkPrimary: string;
  inkSecondary: string;
  inkMuted: string;
  hanjaAccent: string;
  dividerColor: string;
  pillBg: string;
  pillBorder: string;
  pillText: string;
  controlBg: string;
  controlBorder: string;
  controlText: string;
  barcodeColor: string;
  ctaBg: string;
  ctaHoverBg: string;
  activePickBg: string;
  activePickBorder: string;
  activePickSubtext: string;
  badgeDotColor: string;
  chipBg: string;
  chipBorder: string;
  chipText: string;
  canvas: {
    bgStops: [string, string, string];
    cardStops: [string, string, string];
    headerStops: [string, string, string];
    glowColor: string;
    frameBorder: string;
    cardBorder: string;
    tickColor: string;
    inkPrimary: string;
    inkSecondary: string;
    inkMuted: string;
    hanjaAccent: string;
    pillBg: string;
    pillBorder: string;
    pillText: string;
    dividerColor: string;
    sylCardBg: string;
    sylCardBorder: string;
    sylTopAccent: string;
    sajuCardBg: string;
    sajuCardBorder: string;
    idolBgStops: [string, string];
    idolEyebrowColor: string;
    outerInkPrimary: string;
    outerInkMuted: string;
    outerAccent: string;
    outerBarcodeColor: string;
  };
}

export const KOREAN_NAME_CARD_THEMES: Record<KoreanNameCardThemeId, KoreanNameCardTheme> = {
  wood: {
    id: 'wood',
    isDark: false,
    label: {
      en: 'Celadon Jade',
      ko: '청자 민트',
      es: 'Jade Celadón',
      pt: 'Jade Celadon',
    },
    swatchGradient: 'linear-gradient(135deg, #059669, #2DD4BF)',
    outerFrameGradient: 'linear-gradient(135deg, #0D9488 0%, #34D399 48%, #A7F3D0 100%)',
    outerBorderColor: 'rgba(13, 148, 136, 0.35)',
    headerGradient: 'linear-gradient(90deg, #065F46 0%, #0D9488 55%, #10B981 100%)',
    headerBorderColor: 'rgba(255, 255, 255, 0.22)',
    surfaceGradient: 'linear-gradient(155deg, #ECFDF5 0%, #FFFFFF 44%, #CCFBF1 100%)',
    auraMeshCss:
      'radial-gradient(circle at 86% 20%, rgba(45, 212, 191, 0.24), transparent 52%), radial-gradient(circle at 12% 88%, rgba(16, 185, 129, 0.16), transparent 48%)',
    latticeColor: '#0D9488',
    cornerTickColor: 'rgba(13, 148, 136, 0.65)',
    inkPrimary: '#063B32',
    inkSecondary: '#115E59',
    inkMuted: '#4D7C74',
    hanjaAccent: '#0D9488',
    dividerColor: 'rgba(13, 148, 136, 0.18)',
    pillBg: '#CCFBF1',
    pillBorder: '#5EEAD4',
    pillText: '#0F766E',
    controlBg: 'rgba(255, 255, 255, 0.85)',
    controlBorder: 'rgba(13, 148, 136, 0.26)',
    controlText: '#064E3B',
    barcodeColor: '#064E3B',
    ctaBg: '#0F766E',
    ctaHoverBg: '#0D645D',
    activePickBg: '#064E3B',
    activePickBorder: '#064E3B',
    activePickSubtext: '#A7F3D0',
    badgeDotColor: '#10B981',
    chipBg: '#ECFDF5',
    chipBorder: '#A7F3D0',
    chipText: '#065F46',
    canvas: {
      bgStops: ['#064E3B', '#0F766E', '#0D9488'],
      cardStops: ['#F0FDFA', '#FFFFFF', '#CCFBF1'],
      headerStops: ['#065F46', '#0D9488', '#10B981'],
      glowColor: 'rgba(45, 212, 191, 0.26)',
      frameBorder: 'rgba(255, 255, 255, 0.24)',
      cardBorder: '#99F6E4',
      tickColor: '#0D9488',
      inkPrimary: '#063B32',
      inkSecondary: '#115E59',
      inkMuted: '#4D7C74',
      hanjaAccent: '#0D9488',
      pillBg: '#CCFBF1',
      pillBorder: '#5EEAD4',
      pillText: '#0F766E',
      dividerColor: '#CCFBF1',
      sylCardBg: '#FFFFFF',
      sylCardBorder: '#A7F3D0',
      sylTopAccent: '#10B981',
      sajuCardBg: '#FFFFFF',
      sajuCardBorder: '#A7F3D0',
      idolBgStops: ['#042F2E', '#0F172A'],
      idolEyebrowColor: '#5EEAD4',
      outerInkPrimary: '#FFFFFF',
      outerInkMuted: '#CCFBF1',
      outerAccent: '#99F6E4',
      outerBarcodeColor: '#FFFFFF',
    },
  },
  fire: {
    id: 'fire',
    isDark: false,
    label: {
      en: 'Seoul Rose',
      ko: '홍매 코랄',
      es: 'Rosa Seúl',
      pt: 'Rosa Seul',
    },
    swatchGradient: 'linear-gradient(135deg, #E11D48, #FB923C)',
    outerFrameGradient: 'linear-gradient(135deg, #E11D48 0%, #FB7185 48%, #FDBA74 100%)',
    outerBorderColor: 'rgba(225, 29, 72, 0.35)',
    headerGradient: 'linear-gradient(90deg, #9F1239 0%, #E11D48 54%, #F97316 100%)',
    headerBorderColor: 'rgba(255, 255, 255, 0.22)',
    surfaceGradient: 'linear-gradient(155deg, #FFF1F2 0%, #FFFFFF 44%, #FFEDD5 100%)',
    auraMeshCss:
      'radial-gradient(circle at 86% 20%, rgba(251, 113, 133, 0.24), transparent 52%), radial-gradient(circle at 12% 88%, rgba(251, 146, 60, 0.18), transparent 48%)',
    latticeColor: '#E11D48',
    cornerTickColor: 'rgba(225, 29, 72, 0.6)',
    inkPrimary: '#3B0A1A',
    inkSecondary: '#881337',
    inkMuted: '#9A5A6B',
    hanjaAccent: '#E11D48',
    dividerColor: 'rgba(225, 29, 72, 0.16)',
    pillBg: '#FFE4E6',
    pillBorder: '#FDA4AF',
    pillText: '#BE123C',
    controlBg: 'rgba(255, 255, 255, 0.88)',
    controlBorder: 'rgba(225, 29, 72, 0.24)',
    controlText: '#881337',
    barcodeColor: '#4C0519',
    ctaBg: '#BE123C',
    ctaHoverBg: '#9F1239',
    activePickBg: '#881337',
    activePickBorder: '#881337',
    activePickSubtext: '#FECDD3',
    badgeDotColor: '#F43F5E',
    chipBg: '#FFF1F2',
    chipBorder: '#FECDD3',
    chipText: '#9F1239',
    canvas: {
      bgStops: ['#881337', '#BE123C', '#EA580C'],
      cardStops: ['#FFF1F2', '#FFFFFF', '#FFEDD5'],
      headerStops: ['#9F1239', '#E11D48', '#F97316'],
      glowColor: 'rgba(251, 113, 133, 0.26)',
      frameBorder: 'rgba(255, 255, 255, 0.24)',
      cardBorder: '#FECDD3',
      tickColor: '#E11D48',
      inkPrimary: '#3B0A1A',
      inkSecondary: '#881337',
      inkMuted: '#9A5A6B',
      hanjaAccent: '#E11D48',
      pillBg: '#FFE4E6',
      pillBorder: '#FDA4AF',
      pillText: '#BE123C',
      dividerColor: '#FFE4E6',
      sylCardBg: '#FFFFFF',
      sylCardBorder: '#FECDD3',
      sylTopAccent: '#F43F5E',
      sajuCardBg: '#FFFFFF',
      sajuCardBorder: '#FECDD3',
      idolBgStops: ['#4C0519', '#1F1221'],
      idolEyebrowColor: '#FDBA74',
      outerInkPrimary: '#FFFFFF',
      outerInkMuted: '#FFE4E6',
      outerAccent: '#FDE68A',
      outerBarcodeColor: '#FFFFFF',
    },
  },
  earth: {
    id: 'earth',
    isDark: false,
    label: {
      en: 'Royal Amber',
      ko: '황금 살구',
      es: 'Ámbar Real',
      pt: 'Âmbar Real',
    },
    swatchGradient: 'linear-gradient(135deg, #D97706, #FACC15)',
    outerFrameGradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 48%, #FDE047 100%)',
    outerBorderColor: 'rgba(217, 119, 6, 0.35)',
    headerGradient: 'linear-gradient(90deg, #92400E 0%, #D97706 54%, #EA580C 100%)',
    headerBorderColor: 'rgba(255, 255, 255, 0.22)',
    surfaceGradient: 'linear-gradient(155deg, #FFFBEB 0%, #FFFFFF 44%, #FEF3C7 100%)',
    auraMeshCss:
      'radial-gradient(circle at 86% 20%, rgba(251, 191, 36, 0.26), transparent 52%), radial-gradient(circle at 12% 88%, rgba(251, 146, 60, 0.18), transparent 48%)',
    latticeColor: '#D97706',
    cornerTickColor: 'rgba(217, 119, 6, 0.65)',
    inkPrimary: '#381E08',
    inkSecondary: '#78350F',
    inkMuted: '#926843',
    hanjaAccent: '#B45309',
    dividerColor: 'rgba(217, 119, 6, 0.18)',
    pillBg: '#FEF3C7',
    pillBorder: '#FCD34D',
    pillText: '#92400E',
    controlBg: 'rgba(255, 255, 255, 0.88)',
    controlBorder: 'rgba(217, 119, 6, 0.28)',
    controlText: '#78350F',
    barcodeColor: '#451A03',
    ctaBg: '#B45309',
    ctaHoverBg: '#92400E',
    activePickBg: '#78350F',
    activePickBorder: '#78350F',
    activePickSubtext: '#FDE68A',
    badgeDotColor: '#F59E0B',
    chipBg: '#FFFBEB',
    chipBorder: '#FDE68A',
    chipText: '#92400E',
    canvas: {
      bgStops: ['#78350F', '#B45309', '#D97706'],
      cardStops: ['#FFFBEB', '#FFFFFF', '#FEF3C7'],
      headerStops: ['#92400E', '#D97706', '#EA580C'],
      glowColor: 'rgba(251, 191, 36, 0.28)',
      frameBorder: 'rgba(255, 255, 255, 0.24)',
      cardBorder: '#FDE68A',
      tickColor: '#D97706',
      inkPrimary: '#381E08',
      inkSecondary: '#78350F',
      inkMuted: '#926843',
      hanjaAccent: '#B45309',
      pillBg: '#FEF3C7',
      pillBorder: '#FCD34D',
      pillText: '#92400E',
      dividerColor: '#FEF3C7',
      sylCardBg: '#FFFFFF',
      sylCardBorder: '#FDE68A',
      sylTopAccent: '#F59E0B',
      sajuCardBg: '#FFFFFF',
      sajuCardBorder: '#FDE68A',
      idolBgStops: ['#451A03', '#1C1917'],
      idolEyebrowColor: '#FCD34D',
      outerInkPrimary: '#FFFFFF',
      outerInkMuted: '#FEF3C7',
      outerAccent: '#FDE047',
      outerBarcodeColor: '#FFFFFF',
    },
  },
  metal: {
    id: 'metal',
    isDark: false,
    label: {
      en: 'Iris Prism',
      ko: '자수정 프리즘',
      es: 'Prisma Iris',
      pt: 'Prisma Íris',
    },
    swatchGradient: 'linear-gradient(135deg, #4F46E5, #A855F7, #38BDF8)',
    outerFrameGradient: 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 50%, #38BDF8 100%)',
    outerBorderColor: 'rgba(79, 70, 229, 0.35)',
    headerGradient: 'linear-gradient(90deg, #312E81 0%, #4F46E5 52%, #7C3AED 100%)',
    headerBorderColor: 'rgba(255, 255, 255, 0.22)',
    surfaceGradient: 'linear-gradient(155deg, #EEF2FF 0%, #FFFFFF 44%, #F3E8FF 100%)',
    auraMeshCss:
      'radial-gradient(circle at 86% 20%, rgba(139, 92, 246, 0.22), transparent 52%), radial-gradient(circle at 12% 88%, rgba(56, 189, 248, 0.18), transparent 48%)',
    latticeColor: '#6D28D9',
    cornerTickColor: 'rgba(79, 70, 229, 0.65)',
    inkPrimary: '#1E1B4B',
    inkSecondary: '#4338CA',
    inkMuted: '#63668E',
    hanjaAccent: '#6D28D9',
    dividerColor: 'rgba(99, 102, 241, 0.18)',
    pillBg: '#EDE9FE',
    pillBorder: '#C4B5FD',
    pillText: '#5B21B6',
    controlBg: 'rgba(255, 255, 255, 0.88)',
    controlBorder: 'rgba(99, 102, 241, 0.26)',
    controlText: '#312E81',
    barcodeColor: '#1E1B4B',
    ctaBg: '#4F46E5',
    ctaHoverBg: '#4338CA',
    activePickBg: '#312E81',
    activePickBorder: '#312E81',
    activePickSubtext: '#C7D2FE',
    badgeDotColor: '#7C3AED',
    chipBg: '#EEF2FF',
    chipBorder: '#C7D2FE',
    chipText: '#3730A3',
    canvas: {
      bgStops: ['#1E1B4B', '#4338CA', '#7C3AED'],
      cardStops: ['#EEF2FF', '#FFFFFF', '#F3E8FF'],
      headerStops: ['#312E81', '#4F46E5', '#7C3AED'],
      glowColor: 'rgba(139, 92, 246, 0.24)',
      frameBorder: 'rgba(255, 255, 255, 0.24)',
      cardBorder: '#C7D2FE',
      tickColor: '#6D28D9',
      inkPrimary: '#1E1B4B',
      inkSecondary: '#4338CA',
      inkMuted: '#63668E',
      hanjaAccent: '#6D28D9',
      pillBg: '#EDE9FE',
      pillBorder: '#C4B5FD',
      pillText: '#5B21B6',
      dividerColor: '#E0E7FF',
      sylCardBg: '#FFFFFF',
      sylCardBorder: '#C7D2FE',
      sylTopAccent: '#7C3AED',
      sajuCardBg: '#FFFFFF',
      sajuCardBorder: '#C7D2FE',
      idolBgStops: ['#1E1B4B', '#0F172A'],
      idolEyebrowColor: '#C4B5FD',
      outerInkPrimary: '#FFFFFF',
      outerInkMuted: '#E0E7FF',
      outerAccent: '#7DD3FC',
      outerBarcodeColor: '#FFFFFF',
    },
  },
  water: {
    id: 'water',
    isDark: false,
    label: {
      en: 'Jeju Indigo',
      ko: '쪽빛 아쿠아',
      es: 'Índigo Jeju',
      pt: 'Índigo Jeju',
    },
    swatchGradient: 'linear-gradient(135deg, #0284C7, #22D3EE)',
    outerFrameGradient: 'linear-gradient(135deg, #0369A1 0%, #0EA5E9 50%, #2DD4BF 100%)',
    outerBorderColor: 'rgba(2, 132, 199, 0.35)',
    headerGradient: 'linear-gradient(90deg, #0C4A6E 0%, #0284C7 55%, #06B6D4 100%)',
    headerBorderColor: 'rgba(255, 255, 255, 0.22)',
    surfaceGradient: 'linear-gradient(155deg, #F0F9FF 0%, #FFFFFF 44%, #CFFAFE 100%)',
    auraMeshCss:
      'radial-gradient(circle at 86% 20%, rgba(14, 165, 233, 0.24), transparent 52%), radial-gradient(circle at 12% 88%, rgba(45, 212, 191, 0.18), transparent 48%)',
    latticeColor: '#0284C7',
    cornerTickColor: 'rgba(2, 132, 199, 0.65)',
    inkPrimary: '#082F49',
    inkSecondary: '#075985',
    inkMuted: '#4E7A94',
    hanjaAccent: '#0284C7',
    dividerColor: 'rgba(2, 132, 199, 0.18)',
    pillBg: '#E0F2FE',
    pillBorder: '#7DD3FC',
    pillText: '#0369A1',
    controlBg: 'rgba(255, 255, 255, 0.88)',
    controlBorder: 'rgba(2, 132, 199, 0.26)',
    controlText: '#0C4A6E',
    barcodeColor: '#082F49',
    ctaBg: '#0369A1',
    ctaHoverBg: '#075985',
    activePickBg: '#0C4A6E',
    activePickBorder: '#0C4A6E',
    activePickSubtext: '#BAE6FD',
    badgeDotColor: '#0EA5E9',
    chipBg: '#F0F9FF',
    chipBorder: '#BAE6FD',
    chipText: '#075985',
    canvas: {
      bgStops: ['#082F49', '#0369A1', '#0891B2'],
      cardStops: ['#F0F9FF', '#FFFFFF', '#CFFAFE'],
      headerStops: ['#0C4A6E', '#0284C7', '#06B6D4'],
      glowColor: 'rgba(14, 165, 233, 0.24)',
      frameBorder: 'rgba(255, 255, 255, 0.24)',
      cardBorder: '#BAE6FD',
      tickColor: '#0284C7',
      inkPrimary: '#082F49',
      inkSecondary: '#075985',
      inkMuted: '#4E7A94',
      hanjaAccent: '#0284C7',
      pillBg: '#E0F2FE',
      pillBorder: '#7DD3FC',
      pillText: '#0369A1',
      dividerColor: '#E0F2FE',
      sylCardBg: '#FFFFFF',
      sylCardBorder: '#BAE6FD',
      sylTopAccent: '#0EA5E9',
      sajuCardBg: '#FFFFFF',
      sajuCardBorder: '#BAE6FD',
      idolBgStops: ['#082F49', '#0F172A'],
      idolEyebrowColor: '#67E8F9',
      outerInkPrimary: '#FFFFFF',
      outerInkMuted: '#E0F2FE',
      outerAccent: '#67E8F9',
      outerBarcodeColor: '#FFFFFF',
    },
  },
  najeon: {
    id: 'najeon',
    isDark: true,
    label: {
      en: 'Najeon Pearl',
      ko: '나전 자개',
      es: 'Perla Najeon',
      pt: 'Pérola Najeon',
    },
    swatchGradient: 'linear-gradient(135deg, #0F172A 15%, #2DD4BF 52%, #F472B6 95%)',
    outerFrameGradient: 'linear-gradient(135deg, #2DD4BF 0%, #818CF8 50%, #F472B6 100%)',
    outerBorderColor: 'rgba(129, 140, 248, 0.45)',
    headerGradient: 'linear-gradient(90deg, #0F172A 0%, #312E81 52%, #115E59 100%)',
    headerBorderColor: 'rgba(94, 234, 212, 0.28)',
    surfaceGradient: 'linear-gradient(155deg, #0F172A 0%, #1B1838 50%, #0E2931 100%)',
    auraMeshCss:
      'radial-gradient(circle at 84% 18%, rgba(45, 212, 191, 0.24), transparent 50%), radial-gradient(circle at 16% 85%, rgba(244, 114, 182, 0.20), transparent 48%), radial-gradient(circle at 52% 46%, rgba(129, 140, 248, 0.14), transparent 60%)',
    latticeColor: '#5EEAD4',
    cornerTickColor: 'rgba(94, 234, 212, 0.6)',
    inkPrimary: '#F8FAFC',
    inkSecondary: '#CBD5E1',
    inkMuted: '#94A3B8',
    hanjaAccent: '#5EEAD4',
    dividerColor: 'rgba(148, 163, 184, 0.22)',
    pillBg: 'rgba(94, 234, 212, 0.14)',
    pillBorder: 'rgba(94, 234, 212, 0.4)',
    pillText: '#99F6E4',
    controlBg: 'rgba(255, 255, 255, 0.08)',
    controlBorder: 'rgba(255, 255, 255, 0.2)',
    controlText: '#F8FAFC',
    barcodeColor: '#E2E8F0',
    ctaBg: '#1E1B4B',
    ctaHoverBg: '#312E81',
    activePickBg: '#1E1B4B',
    activePickBorder: '#818CF8',
    activePickSubtext: '#99F6E4',
    badgeDotColor: '#2DD4BF',
    chipBg: '#EEF2FF',
    chipBorder: '#C7D2FE',
    chipText: '#312E81',
    canvas: {
      bgStops: ['#090D18', '#1E1B4B', '#134E4A'],
      cardStops: ['#0F172A', '#1B1838', '#0E2931'],
      headerStops: ['#090D18', '#312E81', '#115E59'],
      glowColor: 'rgba(45, 212, 191, 0.24)',
      frameBorder: 'rgba(94, 234, 212, 0.35)',
      cardBorder: 'rgba(129, 140, 248, 0.45)',
      tickColor: '#5EEAD4',
      inkPrimary: '#F8FAFC',
      inkSecondary: '#CBD5E1',
      inkMuted: '#94A3B8',
      hanjaAccent: '#5EEAD4',
      pillBg: 'rgba(94, 234, 212, 0.16)',
      pillBorder: 'rgba(94, 234, 212, 0.48)',
      pillText: '#99F6E4',
      dividerColor: 'rgba(148, 163, 184, 0.25)',
      sylCardBg: 'rgba(15, 23, 42, 0.78)',
      sylCardBorder: 'rgba(129, 140, 248, 0.35)',
      sylTopAccent: '#2DD4BF',
      sajuCardBg: 'rgba(15, 23, 42, 0.78)',
      sajuCardBorder: 'rgba(129, 140, 248, 0.35)',
      idolBgStops: ['#1E1B4B', '#0F172A'],
      idolEyebrowColor: '#F472B6',
      outerInkPrimary: '#F8FAFC',
      outerInkMuted: '#CBD5E1',
      outerAccent: '#5EEAD4',
      outerBarcodeColor: '#E2E8F0',
    },
  },
};

/**
 * Resolves a Korean Name ID Card theme by id, falling back safely to 'wood'.
 */
export function getKoreanNameCardTheme(
  id: KoreanNameCardThemeId | SajuElement | string | null | undefined
): KoreanNameCardTheme {
  if (id && id in KOREAN_NAME_CARD_THEMES) {
    return KOREAN_NAME_CARD_THEMES[id as KoreanNameCardThemeId];
  }
  return KOREAN_NAME_CARD_THEMES.wood;
}

/**
 * Returns the localized display label for a Korean Name ID Card theme.
 */
export function getKoreanNameThemeLabel(
  theme: KoreanNameCardTheme,
  lang: Language
): string {
  if (lang === 'ko') return theme.label.ko;
  if (lang === 'es') return theme.label.es;
  if (lang === 'pt') return theme.label.pt;
  return theme.label.en;
}
