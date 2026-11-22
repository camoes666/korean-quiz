'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  Heart,
  Loader2,
  Share2,
  Stamp,
  Volume2,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';
import type { Language } from '@/lib/translations';
import type { NameGender, NameVibe } from '@/data/koreanNames';
import { KOREAN_SURNAMES } from '@/data/koreanNames';
import {
  buildKoreanNameShareQuery,
  generateKoreanName,
  parseKoreanNameQuery,
  pickKoreanNameCopy,
} from '@/lib/koreanNameEngine';
import {
  getElementDisplayName,
  getZodiacDisplayName,
  SAJU_ELEMENTS,
} from '@/lib/chemistryEngine';
import {
  KOREAN_NAME_CARD_THEME_IDS,
  getKoreanNameCardTheme,
  getKoreanNameThemeLabel,
  type KoreanNameCardThemeId,
} from '@/lib/koreanNameThemes';
import { downloadKoreanNameCard } from '@/lib/renderKoreanNameCard';
import { localizePath, toSiteLocale } from '@/lib/i18nRoutes';
import { getKoreanNameFaq } from '@/lib/pageSeo';
import { readUserProfile, saveUserProfile } from '@/lib/userProfile';
import {
  trackKoreanNameAudioPlay,
  trackKoreanNameCardDownload,
  trackKoreanNameChemistryClick,
  trackKoreanNameGenerate,
  trackKoreanNameShare,
} from '@/lib/analytics';

interface CopyStrings {
  eyebrow: string;
  headline: string;
  subhead: string;
  birthDateLabel: string;
  yearLabel: string;
  monthLabel: string;
  dayLabel: string;
  genderLabel: string;
  genders: Record<NameGender, string>;
  vibeLabel: string;
  vibes: Record<NameVibe, { label: string; hint: string }>;
  realNameLabel: string;
  realNamePlaceholder: string;
  submitLabel: string;
  reissueLabel: string;
  specimenBadge: string;
  issuedBadge: string;
  listenLabel: string;
  listeningLabel: string;
  copyHangul: string;
  copiedHangul: string;
  cardPaletteLabel: string;
  sajuAutoTag: string;
  picksHeading: string;
  pickPrimary: string;
  pickAlt: string;
  saveCard: string;
  savingCard: string;
  savedCard: string;
  copyLink: string;
  copiedLink: string;
  shareWhatsapp: string;
  shareX: string;
  hanjaHeading: string;
  surnameRole: string;
  syllable1Role: string;
  syllable2Role: string;
  sharedByIdols: string;
  sajuHeading: string;
  birthElementLabel: string;
  luckyElementLabel: string;
  zodiacLabel: string;
  idolBannerEyebrow: string;
  idolBannerCta: string;
  surnameTableHeading: string;
  surnameTableDesc: string;
  colSurname: string;
  colHanja: string;
  colElement: string;
  colIdols: string;
  faqHeading: string;
}

const UI_COPY: Record<'en' | 'es' | 'pt' | 'ko', CopyStrings> = {
  en: {
    eyebrow: 'K-Saju Name Studio',
    headline: 'Your Korean name, balanced by Five Elements',
    subhead:
      'Enter your birthday and preferred style to receive three curated Korean names with authentic Hanja meanings, native audio pronunciation, and a printable Hanji ID card.',
    birthDateLabel: 'Birth date',
    yearLabel: 'Year',
    monthLabel: 'Month',
    dayLabel: 'Day',
    genderLabel: 'Name style',
    genders: { female: 'Feminine', male: 'Masculine', unisex: 'Unisex' },
    vibeLabel: 'Aura & vibe',
    vibes: {
      idol: { label: 'Idol & Stage', hint: 'Bright, rhythmic star aura' },
      soft: { label: 'Soft & Poetic', hint: 'Gentle, lyrical warmth' },
      chic: { label: 'Chic & Modern', hint: 'Crisp Seoul editorial edge' },
      classic: { label: 'Classic & Noble', hint: 'Timeless K-Drama elegance' },
    },
    realNameLabel: 'Your name (optional)',
    realNamePlaceholder: 'e.g. Sofia, Mateo, Maya',
    submitLabel: 'Issue my Korean name',
    reissueLabel: 'Update my Korean name',
    specimenBadge: 'SPECIMEN',
    issuedBadge: 'OFFICIAL ISSUED',
    listenLabel: 'Listen',
    listeningLabel: 'Playing',
    copyHangul: 'Copy Hangul',
    copiedHangul: 'Copied',
    cardPaletteLabel: 'Card palette',
    sajuAutoTag: 'Saju',
    picksHeading: 'Top 3 curated picks for your Saju',
    pickPrimary: 'Best match',
    pickAlt: 'Option',
    saveCard: 'Save 9:16 ID Card (PNG)',
    savingCard: 'Rendering card…',
    savedCard: 'ID Card saved',
    copyLink: 'Copy link',
    copiedLink: 'Copied',
    shareWhatsapp: 'WhatsApp',
    shareX: 'Post on X',
    hanjaHeading: 'Hanja character breakdown',
    surnameRole: 'Family surname',
    syllable1Role: 'First syllable',
    syllable2Role: 'Second syllable',
    sharedByIdols: 'Shared by',
    sajuHeading: 'K-Saju Five Elements balance',
    birthElementLabel: 'Birth Day Master',
    luckyElementLabel: 'Nurturing Name Element',
    zodiacLabel: 'Zodiac',
    idolBannerEyebrow: 'Highest K-Saju idol synergy',
    idolBannerCta: 'Open 1:1 Chemistry Report',
    surnameTableHeading: 'Korean surnames & Five Elements reference',
    surnameTableDesc:
      'Every name recommendation pairs one of twenty traditional Korean family surnames with a harmonizing given name.',
    colSurname: 'Surname',
    colHanja: 'Hanja',
    colElement: 'Element',
    colIdols: 'Notable artists',
    faqHeading: 'Frequently asked questions',
  },
  es: {
    eyebrow: 'Estudio K-Saju de Nombres',
    headline: 'Tu nombre coreano, equilibrado por los Cinco Elementos',
    subhead:
      'Ingresa tu fecha de nacimiento y estilo para recibir tres nombres coreanos auténticos con significado en Hanja, audio real y tu tarjeta coreana 9:16 con sello.',
    birthDateLabel: 'Fecha de nacimiento',
    yearLabel: 'Año',
    monthLabel: 'Mes',
    dayLabel: 'Día',
    genderLabel: 'Estilo de nombre',
    genders: { female: 'Femenino', male: 'Masculino', unisex: 'Unisex' },
    vibeLabel: 'Vibra y estilo',
    vibes: {
      idol: { label: 'Idol & Escenario', hint: 'Brillo rítmico y carisma' },
      soft: { label: 'Suave & Poético', hint: 'Ternura y calidez lírica' },
      chic: { label: 'Chic & Moderno', hint: 'Estilo urbano de Seúl' },
      classic: { label: 'Clásico & Noble', hint: 'Elegancia de K-Drama' },
    },
    realNameLabel: 'Tu nombre real (opcional)',
    realNamePlaceholder: 'ej. Sofía, Mateo, Valentina',
    submitLabel: 'Emitir mi nombre coreano',
    reissueLabel: 'Actualizar nombre coreano',
    specimenBadge: 'MUESTRA',
    issuedBadge: 'EMITIDO OFICIAL',
    listenLabel: 'Escuchar',
    listeningLabel: 'Sonando',
    copyHangul: 'Copiar Hangul',
    copiedHangul: 'Copiado',
    cardPaletteLabel: 'Color de tarjeta',
    sajuAutoTag: 'Saju',
    picksHeading: 'Tus 3 mejores nombres según tu Saju',
    pickPrimary: 'Mejor match',
    pickAlt: 'Opción',
    saveCard: 'Guardar Tarjeta ID 9:16 (PNG)',
    savingCard: 'Generando tarjeta…',
    savedCard: 'Tarjeta guardada',
    copyLink: 'Copiar enlace',
    copiedLink: 'Copiado',
    shareWhatsapp: 'WhatsApp',
    shareX: 'Publicar en X',
    hanjaHeading: 'Desglose de caracteres Hanja',
    surnameRole: 'Apellido',
    syllable1Role: 'Primera sílaba',
    syllable2Role: 'Segunda sílaba',
    sharedByIdols: 'Compartido por',
    sajuHeading: 'Equilibrio K-Saju de los Cinco Elementos',
    birthElementLabel: 'Elemento de nacimiento',
    luckyElementLabel: 'Elemento del nombre',
    zodiacLabel: 'Zodíaco',
    idolBannerEyebrow: 'Mayor afinidad K-Saju con idols',
    idolBannerCta: 'Ver reporte 1:1 de Química',
    surnameTableHeading: 'Guía de apellidos coreanos y Cinco Elementos',
    surnameTableDesc:
      'Cada recomendación combina uno de los veinte apellidos coreanos tradicionales con un nombre equilibrado.',
    colSurname: 'Apellido',
    colHanja: 'Hanja',
    colElement: 'Elemento',
    colIdols: 'Artistas conocidos',
    faqHeading: 'Preguntas frecuentes',
  },
  pt: {
    eyebrow: 'Estúdio K-Saju de Nomes',
    headline: 'Seu nome coreano, equilibrado pelos Cinco Elementos',
    subhead:
      'Informe seu aniversário e estilo para receber três nomes coreanos autênticos com significado em Hanja, áudio real e seu cartão coreano 9:16 com selo tradicional.',
    birthDateLabel: 'Data de nascimento',
    yearLabel: 'Ano',
    monthLabel: 'Mês',
    dayLabel: 'Dia',
    genderLabel: 'Estilo do nome',
    genders: { female: 'Feminino', male: 'Masculino', unisex: 'Unissex' },
    vibeLabel: 'Vibe e estilo',
    vibes: {
      idol: { label: 'Idol & Palco', hint: 'Brilho rítmico e carisma' },
      soft: { label: 'Suave & Poético', hint: 'Ternura e calor lírico' },
      chic: { label: 'Chic & Moderno', hint: 'Estilo urbano de Seul' },
      classic: { label: 'Clássico & Nobre', hint: 'Elegância de K-Drama' },
    },
    realNameLabel: 'Seu nome real (opcional)',
    realNamePlaceholder: 'ex. Sofia, Lucas, Júlia',
    submitLabel: 'Emitir meu nome coreano',
    reissueLabel: 'Atualizar nome coreano',
    specimenBadge: 'AMOSTRA',
    issuedBadge: 'EMITIDO OFICIAL',
    listenLabel: 'Ouvir',
    listeningLabel: 'Tocando',
    copyHangul: 'Copiar Hangul',
    copiedHangul: 'Copiado',
    cardPaletteLabel: 'Cor do cartão',
    sajuAutoTag: 'Saju',
    picksHeading: 'Suas 3 melhores opções no Saju',
    pickPrimary: 'Melhor match',
    pickAlt: 'Opção',
    saveCard: 'Salvar Cartão ID 9:16 (PNG)',
    savingCard: 'Gerando cartão…',
    savedCard: 'Cartão salvo',
    copyLink: 'Copiar link',
    copiedLink: 'Copiado',
    shareWhatsapp: 'WhatsApp',
    shareX: 'Postar no X',
    hanjaHeading: 'Significado de cada Hanja',
    surnameRole: 'Sobrenome',
    syllable1Role: 'Primeira sílaba',
    syllable2Role: 'Segunda sílaba',
    sharedByIdols: 'Usado por',
    sajuHeading: 'Equilíbrio K-Saju dos Cinco Elementos',
    birthElementLabel: 'Elemento de nascimento',
    luckyElementLabel: 'Elemento do nome',
    zodiacLabel: 'Signo',
    idolBannerEyebrow: 'Maior afinidade K-Saju com idols',
    idolBannerCta: 'Abrir relatório 1:1 de Química',
    surnameTableHeading: 'Referência de sobrenomes coreanos e Elementos',
    surnameTableDesc:
      'Cada recomendação combina um dos vinte sobrenomes coreanos tradicionais com um nome harmonizado.',
    colSurname: 'Sobrenome',
    colHanja: 'Hanja',
    colElement: 'Elemento',
    colIdols: 'Artistas notáveis',
    faqHeading: 'Perguntas frequentes',
  },
  ko: {
    eyebrow: 'K-사주 한글 작명소',
    headline: '생년월일 오행으로 완성하는 나만의 한국 이름',
    subhead:
      '타고난 사주 오행을 보완해 주는 정통 한자 한국 이름 3가지와 발음 듣기, 어울리는 K-Pop 소울메이트 아이돌, 9:16 전통 낙관 ID 카드를 무료로 발급받으세요.',
    birthDateLabel: '생년월일',
    yearLabel: '연도',
    monthLabel: '월',
    dayLabel: '일',
    genderLabel: '이름 스타일',
    genders: { female: '여성형', male: '남성형', unisex: '중성형' },
    vibeLabel: '이름 분위기',
    vibes: {
      idol: { label: '아이돌 & 센터', hint: '세련되고 빛나는 무드' },
      soft: { label: '감성 & 서정', hint: '따뜻하고 부드러운 여운' },
      chic: { label: '시크 & 모던', hint: '도시적인 성수동 감각' },
      classic: { label: '클래식 & 품격', hint: '단아한 드라마 주연상' },
    },
    realNameLabel: '원래 이름 (선택)',
    realNamePlaceholder: '예: Sofia, Alex (카드에 표기)',
    submitLabel: '한국 이름 발급받기',
    reissueLabel: '새 조건으로 다시 발급',
    specimenBadge: '미리보기',
    issuedBadge: '공식 발급 완료',
    listenLabel: '발음 듣기',
    listeningLabel: '재생 중',
    copyHangul: '한글 복사',
    copiedHangul: '복사됨',
    cardPaletteLabel: '카드 컬러',
    sajuAutoTag: '사주',
    picksHeading: '사주 오행 맞춤 추천 이름 TOP 3',
    pickPrimary: '1순위 추천',
    pickAlt: '대안',
    saveCard: '9:16 낙관 ID 카드 저장 (PNG)',
    savingCard: '카드 생성 중…',
    savedCard: '카드 저장 완료',
    copyLink: '결과 링크 복사',
    copiedLink: '복사됨',
    shareWhatsapp: 'WhatsApp',
    shareX: 'X에 공유',
    hanjaHeading: '성씨 · 이름 한자 뜻풀이',
    surnameRole: '성씨 (Family)',
    syllable1Role: '첫째 글자',
    syllable2Role: '둘째 글자',
    sharedByIdols: '같은 성씨 아티스트',
    sajuHeading: 'K-사주 오행 상생 리포트',
    birthElementLabel: '타고난 일간 오행',
    luckyElementLabel: '이름으로 채우는 기운',
    zodiacLabel: '별자리',
    idolBannerEyebrow: '이름 사주 찰떡 K-Pop 소울메이트',
    idolBannerCta: '1:1 궁합 리포트 바로 보기',
    surnameTableHeading: '한국 대표 20대 성씨 & 오행 도감',
    surnameTableDesc:
      'K-사주 작명소는 검증된 한국 전통 20개 성씨와 현대적인 2음절 한자 이름 풀을 조합해 추천합니다.',
    colSurname: '성씨',
    colHanja: '한자',
    colElement: '오행',
    colIdols: '대표 아티스트',
    faqHeading: '자주 묻는 질문',
  },
};

function getCopy(lang: Language): CopyStrings {
  if (lang === 'es' || lang === 'pt' || lang === 'ko') {
    return UI_COPY[lang];
  }
  return UI_COPY.en;
}

const YEARS = Array.from({ length: 76 }, (_, i) => 2015 - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

/**
 * Deterministic vertical barcode strip rendered in pure CSS spans for the tactile ID card.
 */
function CardBarcode({ seed, color = '#14151A' }: { seed: string; color?: string }) {
  const bars = useMemo(() => {
    let hash = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      hash ^= seed.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    const list: number[] = [];
    for (let i = 0; i < 28; i++) {
      hash = Math.imul(hash ^ (i + 11), 16777619);
      list.push((Math.abs(hash) % 3) + 1);
    }
    return list;
  }, [seed]);

  return (
    <div className="flex items-stretch gap-[2px] h-7" aria-hidden="true">
      {bars.map((widthPx, idx) => (
        <span
          key={idx}
          className="rounded-[0.5px]"
          style={{
            backgroundColor: color,
            width: `${widthPx}px`,
            opacity: idx % 5 === 0 ? 0.45 : 0.88,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Traditional 2x2 Korean vermilion seal stamp (낙관 도장) rendered as crisp SVG.
 */
function VermilionSealStamp({
  sealChars,
  stamped,
  onDark = false,
}: {
  sealChars: string;
  stamped: boolean;
  onDark?: boolean;
}) {
  const chars = Array.from(sealChars).slice(0, 4);
  while (chars.length < 4) chars.push('印');

  return (
    <div
      className={`relative select-none shrink-0 transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none ${
        stamped ? 'scale-100 opacity-100 -rotate-3' : 'scale-95 opacity-75 -rotate-2'
      }`}
      aria-label={`Traditional Hanja seal stamp ${chars.join('')}`}
    >
      <svg
        viewBox="0 0 88 88"
        className={`w-20 h-20 sm:w-24 sm:h-24 drop-shadow-xs ${
          onDark ? 'ring-1 ring-[#FFF9F2]/30 rounded-[11px]' : ''
        }`}
        role="img"
      >
        <rect x="2" y="2" width="84" height="84" rx="10" fill="#C8322B" />
        <rect
          x="7"
          y="7"
          width="74"
          height="74"
          rx="6"
          fill="none"
          stroke="rgba(255, 249, 242, 0.88)"
          strokeWidth="2"
        />
        <line
          x1="44"
          y1="11"
          x2="44"
          y2="77"
          stroke="rgba(255, 249, 242, 0.25)"
          strokeWidth="1"
        />
        <line
          x1="11"
          y1="44"
          x2="77"
          y2="44"
          stroke="rgba(255, 249, 242, 0.25)"
          strokeWidth="1"
        />
        {/* Traditional reading order: right column top->bottom, left column top->bottom */}
        <text
          x="60"
          y="31"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#FFF9F2"
          fontSize="22"
          fontWeight="800"
        >
          {chars[0]}
        </text>
        <text
          x="60"
          y="59"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#FFF9F2"
          fontSize="22"
          fontWeight="800"
        >
          {chars[1]}
        </text>
        <text
          x="28"
          y="31"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#FFF9F2"
          fontSize="22"
          fontWeight="800"
        >
          {chars[2]}
        </text>
        <text
          x="28"
          y="59"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#FFF9F2"
          fontSize="22"
          fontWeight="800"
        >
          {chars[3]}
        </text>
      </svg>
    </div>
  );
}

export default function KoreanNameClient() {
  const { lang } = useLanguage();
  const { addXP } = useGame();
  const copy = getCopy(lang);
  const siteLocale = toSiteLocale(lang);
  const faqs = useMemo(() => getKoreanNameFaq(siteLocale), [siteLocale]);

  const [birthYear, setBirthYear] = useState<number>(2002);
  const [birthMonth, setBirthMonth] = useState<number>(5);
  const [birthDay, setBirthDay] = useState<number>(15);
  const [gender, setGender] = useState<NameGender>('female');
  const [vibe, setVibe] = useState<NameVibe>('idol');
  const [realName, setRealName] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [customThemeId, setCustomThemeId] = useState<KoreanNameCardThemeId | null>(null);

  const [hasIssued, setHasIssued] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copiedHangul, setCopiedHangul] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isSavingCard, setIsSavingCard] = useState<boolean>(false);
  const [savedCardNotice, setSavedCardNotice] = useState<boolean>(false);

  const initializedRef = useRef(false);
  const awardedXpRef = useRef(false);
  const cardSectionRef = useRef<HTMLDivElement>(null);

  // Hydrate from window.location.search first (keeping full SSR HTML intact for SEO),
  // falling back to stored user profile in localStorage.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (initializedRef.current) return;
      initializedRef.current = true;

      const params = new URLSearchParams(window.location.search);
      const parsed = parseKoreanNameQuery(params);
      const saved = readUserProfile();

      if (parsed.input.birthYear) setBirthYear(parsed.input.birthYear);
      else if (saved?.birthYear) setBirthYear(saved.birthYear);

      if (parsed.input.birthMonth) setBirthMonth(parsed.input.birthMonth);
      else if (saved?.birthMonth) setBirthMonth(saved.birthMonth);

      if (parsed.input.birthDay) setBirthDay(parsed.input.birthDay);
      else if (saved?.birthDay) setBirthDay(saved.birthDay);

      if (parsed.input.gender) setGender(parsed.input.gender);
      if (parsed.input.vibe) setVibe(parsed.input.vibe);

      if (parsed.input.realName) setRealName(parsed.input.realName);
      else if (saved?.realName) setRealName(saved.realName);

      setSelectedIndex(parsed.pickIndex);
      if (parsed.autoGenerate) {
        setHasIssued(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const input = useMemo(
    () => ({
      birthYear,
      birthMonth,
      birthDay,
      gender,
      vibe,
      realName,
    }),
    [birthYear, birthMonth, birthDay, gender, vibe, realName]
  );

  const result = useMemo(() => generateKoreanName(input, lang), [input, lang]);
  const activeCandidate = result.candidates[selectedIndex] || result.candidates[0];
  const activeThemeId: KoreanNameCardThemeId = customThemeId ?? result.luckyElement.element;
  const activeTheme = getKoreanNameCardTheme(activeThemeId);
  const coreElementTheme = getKoreanNameCardTheme(result.coreElement.element);
  const luckyElementTheme = getKoreanNameCardTheme(result.luckyElement.element);

  const playChime = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.22);
      });
    } catch {
      // Ignore browser autoplay restrictions
    }
  };

  const handleIssueName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSelectedIndex(0);
    setHasIssued(true);
    playChime();

    if (!awardedXpRef.current) {
      awardedXpRef.current = true;
      addXP(50);
    }

    const primary = result.candidates[0];
    saveUserProfile({
      birthYear,
      birthMonth,
      birthDay,
      realName: realName.trim() || undefined,
      lastKoreanName: primary.fullHangul,
      lastKoreanRomanized: primary.fullRomanized,
    });

    trackKoreanNameGenerate({
      gender,
      vibe,
      coreElement: result.coreElement.element,
      luckyElement: result.luckyElement.element,
      fullHangul: primary.fullHangul,
      lang,
    });

    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      window.setTimeout(() => {
        cardSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 90);
    }
  };

  const handleListenAudio = () => {
    trackKoreanNameAudioPlay({ fullHangul: activeCandidate.fullHangul, lang });
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeCandidate.fullHangul);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.85;
      const voices = window.speechSynthesis.getVoices();
      const koVoice = voices.find((v) => v.lang.toLowerCase().startsWith('ko'));
      if (koVoice) utterance.voice = koVoice;

      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  const handleCopyHangul = async () => {
    try {
      await navigator.clipboard.writeText(activeCandidate.fullHangul);
      setCopiedHangul(true);
      setTimeout(() => setCopiedHangul(false), 2000);
    } catch {
      // Ignore clipboard failures
    }
  };

  const getShareUrl = () => {
    const query = buildKoreanNameShareQuery(input, selectedIndex);
    const localizedRoute = localizePath('/korean-name', lang);
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://kpulsequiz.com';
    return `${origin}${localizedRoute}?${query}`;
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    trackKoreanNameShare({
      method: 'link_copy',
      fullHangul: activeCandidate.fullHangul,
      lang,
    });
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    } catch {
      // Ignore clipboard failure
    }
  };

  const getShareHeadline = () => {
    if (lang === 'ko') {
      return `내 K-사주 한국 이름은 [${activeCandidate.fullHangul} (${activeCandidate.fullHanja})] · ${activeCandidate.fullRomanized}`;
    }
    if (lang === 'es') {
      return `Mi nombre coreano según mi K-Saju es ${activeCandidate.fullHangul} (${activeCandidate.fullRomanized})`;
    }
    if (lang === 'pt') {
      return `Meu nome coreano segundo o K-Saju é ${activeCandidate.fullHangul} (${activeCandidate.fullRomanized})`;
    }
    return `My K-Saju Korean name is ${activeCandidate.fullHangul} (${activeCandidate.fullRomanized})`;
  };

  const handleShareWhatsapp = () => {
    trackKoreanNameShare({
      method: 'whatsapp',
      fullHangul: activeCandidate.fullHangul,
      lang,
    });
    const url = getShareUrl();
    const text = `${getShareHeadline()}\n${url}`;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleShareX = () => {
    trackKoreanNameShare({
      method: 'twitter',
      fullHangul: activeCandidate.fullHangul,
      lang,
    });
    const url = getShareUrl();
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        getShareHeadline()
      )}&url=${encodeURIComponent(url)}&hashtags=KoreanName,KSaju,KPulse`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleDownloadCard = async () => {
    if (isSavingCard) return;
    setIsSavingCard(true);
    trackKoreanNameCardDownload({
      fullHangul: activeCandidate.fullHangul,
      rank: activeCandidate.rank,
      lang,
    });
    try {
      await downloadKoreanNameCard(result, activeCandidate, lang, activeThemeId);
      setSavedCardNotice(true);
      setTimeout(() => setSavedCardNotice(false), 3000);
    } catch (err) {
      console.error('Failed to render Korean name ID card:', err);
    } finally {
      setIsSavingCard(false);
    }
  };

  const matchedIdolHref = useMemo(() => {
    const params = new URLSearchParams({
      m: result.matchedIdol.member.id,
      y: String(birthYear),
      mo: String(birthMonth),
      d: String(birthDay),
    });
    if (realName.trim()) {
      params.set('n', realName.trim());
    }
    return localizePath(
      `/chemistry/${result.matchedIdol.group.id}?${params.toString()}`,
      lang
    );
  }, [result.matchedIdol, birthYear, birthMonth, birthDay, realName, lang]);

  const matchedIdolName =
    lang === 'ko' ? result.matchedIdol.member.nameKo : result.matchedIdol.member.name;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#14151A] pb-20">
      {/* 1. STUDIO WORKSPACE SPLIT */}
      <section className="border-b border-stone-200/80 bg-[#FAF8F5] py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT 5 COLS: Studio Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-md border border-stone-200 bg-white px-2.5 py-1 text-xs font-mono font-medium text-stone-700">
                  <span className="w-2 h-2 rounded-xs bg-[#C8322B]" />
                  <span>{copy.eyebrow}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#14151A] leading-[1.15]">
                  {copy.headline}
                </h1>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {copy.subhead}
                </p>
              </div>

              <form
                onSubmit={handleIssueName}
                className="rounded-2xl bg-white border border-stone-200 p-5 sm:p-6 shadow-xs space-y-5"
              >
                {/* Birth Date */}
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-2">
                    {copy.birthDateLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="sr-only">{copy.yearLabel}</span>
                      <select
                        value={birthYear}
                        onChange={(e) => setBirthYear(Number(e.target.value))}
                        aria-label={copy.yearLabel}
                        className="w-full rounded-lg border border-stone-200 bg-[#FAF8F5] px-3 py-2.5 text-sm font-medium text-[#14151A] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#14151A]/15"
                      >
                        {YEARS.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <span className="sr-only">{copy.monthLabel}</span>
                      <select
                        value={birthMonth}
                        onChange={(e) => setBirthMonth(Number(e.target.value))}
                        aria-label={copy.monthLabel}
                        className="w-full rounded-lg border border-stone-200 bg-[#FAF8F5] px-3 py-2.5 text-sm font-medium text-[#14151A] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#14151A]/15"
                      >
                        {MONTHS.map((m) => (
                          <option key={m} value={m}>
                            {String(m).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <span className="sr-only">{copy.dayLabel}</span>
                      <select
                        value={birthDay}
                        onChange={(e) => setBirthDay(Number(e.target.value))}
                        aria-label={copy.dayLabel}
                        className="w-full rounded-lg border border-stone-200 bg-[#FAF8F5] px-3 py-2.5 text-sm font-medium text-[#14151A] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#14151A]/15"
                      >
                        {DAYS.map((d) => (
                          <option key={d} value={d}>
                            {String(d).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Gender Style */}
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-2">
                    {copy.genderLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['female', 'male', 'unisex'] as NameGender[]).map((g) => {
                      const active = gender === g;
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGender(g)}
                          className={`rounded-lg py-2 px-3 text-xs font-medium border transition-colors ${
                            active
                              ? 'bg-[#14151A] text-white border-[#14151A]'
                              : 'bg-[#FAF8F5] text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {copy.genders[g]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name Vibe */}
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-2">
                    {copy.vibeLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['idol', 'soft', 'chic', 'classic'] as NameVibe[]).map((v) => {
                      const active = vibe === v;
                      const meta = copy.vibes[v];
                      return (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setVibe(v)}
                          className={`text-left rounded-lg p-3 border transition-colors ${
                            active
                              ? 'bg-[#FAF8F5] border-[#14151A] ring-1 ring-[#14151A]'
                              : 'bg-white border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          <div className="text-xs font-semibold text-[#14151A]">
                            {meta.label}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                            {meta.hint}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Real Name */}
                <div>
                  <label
                    htmlFor="kpulse-real-name"
                    className="block text-xs font-medium text-stone-700 mb-2"
                  >
                    {copy.realNameLabel}
                  </label>
                  <input
                    id="kpulse-real-name"
                    type="text"
                    value={realName}
                    onChange={(e) => setRealName(e.target.value.slice(0, 24))}
                    placeholder={copy.realNamePlaceholder}
                    maxLength={24}
                    className="w-full rounded-lg border border-stone-200 bg-[#FAF8F5] px-3.5 py-2.5 text-sm font-medium text-[#14151A] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#14151A]/15"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#14151A] hover:bg-stone-800 text-white py-3.5 px-5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
                >
                  <Stamp className="w-4 h-4 text-[#F87171]" strokeWidth={1.5} />
                  <span>{hasIssued ? copy.reissueLabel : copy.submitLabel}</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </form>
            </div>

            {/* RIGHT 7 COLS: Tactile Korean Name ID Card + Actions */}
            <div ref={cardSectionRef} className="lg:col-span-7 space-y-4">
              {/* Card Palette Swatch Bar */}
              <div className="flex items-center justify-between gap-3 flex-wrap rounded-xl bg-white border border-stone-200 px-3.5 py-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-medium text-stone-500">
                    {copy.cardPaletteLabel}
                  </span>
                  <span className="text-xs font-semibold text-[#14151A]">
                    {getKoreanNameThemeLabel(activeTheme, lang)}
                  </span>
                  {activeThemeId === result.luckyElement.element && (
                    <span
                      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: luckyElementTheme.chipBg,
                        borderColor: luckyElementTheme.chipBorder,
                        color: luckyElementTheme.chipText,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: luckyElementTheme.badgeDotColor }}
                      />
                      <span>{copy.sajuAutoTag}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2" role="group" aria-label={copy.cardPaletteLabel}>
                  {KOREAN_NAME_CARD_THEME_IDS.map((id) => {
                    const themeOption = getKoreanNameCardTheme(id);
                    const themeLabel = getKoreanNameThemeLabel(themeOption, lang);
                    const isActive = activeThemeId === id;
                    const isSajuMatch = id === result.luckyElement.element;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() =>
                          setCustomThemeId(isSajuMatch ? null : id)
                        }
                        aria-label={themeLabel}
                        aria-pressed={isActive}
                        title={
                          isSajuMatch
                            ? `${themeLabel} (${copy.sajuAutoTag})`
                            : themeLabel
                        }
                        className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-[transform,box-shadow] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14151A] ${
                          isActive
                            ? 'ring-2 ring-offset-2 ring-[#14151A] scale-105'
                            : 'hover:scale-105 opacity-90 hover:opacity-100'
                        }`}
                        style={{ background: themeOption.swatchGradient }}
                      >
                        {isSajuMatch && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Collector ID Card Bevel Frame */}
              <div
                className="relative rounded-2xl p-[3px] sm:p-1 border shadow-md transition-colors duration-300"
                style={{
                  background: activeTheme.outerFrameGradient,
                  borderColor: activeTheme.outerBorderColor,
                }}
              >
                {/* Inner Collector Card Surface */}
                <div
                  className="relative rounded-[14px] overflow-hidden"
                  style={{ background: activeTheme.surfaceGradient }}
                >
                  {/* Soft Aura Color-Wash Mesh */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ background: activeTheme.auraMeshCss }}
                  />

                  {/* Subtle Traditional Korean Diamond-Lattice Watermark */}
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.055]"
                  >
                    <defs>
                      <pattern
                        id="kpulse-lattice-pattern"
                        width="32"
                        height="32"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M16 0 L32 16 L16 32 L0 16 Z"
                          fill="none"
                          stroke={activeTheme.latticeColor}
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#kpulse-lattice-pattern)" />
                  </svg>

                  {/* Top Official Colored Header Ribbon */}
                  <div
                    className="relative z-10 flex items-center justify-between gap-3 px-5 sm:px-7 py-3 text-white"
                    style={{
                      background: activeTheme.headerGradient,
                      borderBottom: `1px solid ${activeTheme.headerBorderColor}`,
                    }}
                  >
                    <div className="flex items-center gap-2 text-[11px] font-mono font-semibold tracking-wide text-white/95">
                      <span className="w-2 h-2 rounded-xs bg-white/90" />
                      <span>K-PULSE · KOREAN NAME ID</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-white/80 tabular-nums hidden sm:inline">
                        {result.serialCode}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold border bg-white/15 border-white/30 text-white">
                        {hasIssued ? copy.issuedBadge : copy.specimenBadge}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="relative z-10 p-5 sm:p-7">
                    {/* Corner registration marks */}
                    <span
                      aria-hidden="true"
                      className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2"
                      style={{ borderColor: activeTheme.cornerTickColor }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2"
                      style={{ borderColor: activeTheme.cornerTickColor }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2"
                      style={{ borderColor: activeTheme.cornerTickColor }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2"
                      style={{ borderColor: activeTheme.cornerTickColor }}
                    />

                    {/* Hero Hangul + Vermilion Seal Layout */}
                    <div className="py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="space-y-2 min-w-0 flex-1">
                        {realName.trim() && (
                          <div
                            className="text-xs font-mono tracking-wide"
                            style={{ color: activeTheme.inkMuted }}
                          >
                            {realName.trim().toUpperCase()} →
                          </div>
                        )}

                        <div className="flex items-baseline gap-3 flex-wrap">
                          <h2
                            className="text-5xl sm:text-6xl font-bold tracking-tight leading-none"
                            style={{ color: activeTheme.inkPrimary }}
                          >
                            {activeCandidate.fullHangul}
                          </h2>
                          <span
                            className="text-xl sm:text-2xl font-semibold"
                            style={{ color: activeTheme.hanjaAccent }}
                          >
                            {activeCandidate.fullHanja}
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 flex-wrap pt-1">
                          <span
                            className="text-lg sm:text-xl font-semibold"
                            style={{ color: activeTheme.inkPrimary }}
                          >
                            {activeCandidate.fullRomanized}
                          </span>
                          <span
                            className="text-xs font-mono"
                            style={{ color: activeTheme.inkMuted }}
                          >
                            /{activeCandidate.phoneticGuide}/
                          </span>
                        </div>

                        {/* Audio + Copy + Aura Pill */}
                        <div className="flex items-center gap-2 flex-wrap pt-2">
                          <button
                            type="button"
                            onClick={handleListenAudio}
                            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-90"
                            style={{
                              backgroundColor: activeTheme.controlBg,
                              borderColor: activeTheme.controlBorder,
                              color: activeTheme.controlText,
                            }}
                          >
                            <Volume2
                              className="w-4 h-4"
                              strokeWidth={1.5}
                              style={{
                                color: isSpeaking
                                  ? activeTheme.hanjaAccent
                                  : activeTheme.inkMuted,
                              }}
                            />
                            <span>
                              {isSpeaking ? copy.listeningLabel : copy.listenLabel}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={handleCopyHangul}
                            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-90"
                            style={{
                              backgroundColor: activeTheme.controlBg,
                              borderColor: activeTheme.controlBorder,
                              color: activeTheme.controlText,
                            }}
                          >
                            {copiedHangul ? (
                              <Check className="w-4 h-4 text-emerald-500" strokeWidth={1.5} />
                            ) : (
                              <Copy
                                className="w-4 h-4"
                                strokeWidth={1.5}
                                style={{ color: activeTheme.inkMuted }}
                              />
                            )}
                            <span>
                              {copiedHangul ? copy.copiedHangul : copy.copyHangul}
                            </span>
                          </button>

                          <span
                            className="inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium"
                            style={{
                              backgroundColor: activeTheme.pillBg,
                              borderColor: activeTheme.pillBorder,
                              color: activeTheme.pillText,
                            }}
                          >
                            {pickKoreanNameCopy(activeCandidate.givenName.auraTag, lang)}
                          </span>
                        </div>
                      </div>

                      {/* Signature Detail: Vermilion Square Hanja Seal Stamp */}
                      <div className="self-end sm:self-center">
                        <VermilionSealStamp
                          sealChars={activeCandidate.sealChars}
                          stamped={hasIssued}
                          onDark={activeTheme.isDark}
                        />
                      </div>
                    </div>

                    {/* Card Meaning & Barcode Footer */}
                    <div
                      className="pt-4 border-t flex flex-col sm:flex-row sm:items-end justify-between gap-4"
                      style={{ borderColor: activeTheme.dividerColor }}
                    >
                      <div className="space-y-1 max-w-md">
                        <p
                          className="text-sm font-medium leading-snug"
                          style={{ color: activeTheme.inkPrimary }}
                        >
                          {pickKoreanNameCopy(activeCandidate.givenName.meaning, lang)}
                        </p>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: activeTheme.inkSecondary }}
                        >
                          {pickKoreanNameCopy(activeCandidate.givenName.story, lang)}
                        </p>
                      </div>

                      <div className="shrink-0 flex flex-col sm:items-end gap-1">
                        <CardBarcode
                          seed={`${result.serialCode}-${activeCandidate.fullRomanized}`}
                          color={activeTheme.barcodeColor}
                        />
                        <span
                          className="text-[10px] font-mono tabular-nums"
                          style={{ color: activeTheme.inkMuted }}
                        >
                          {result.serialCode} · {activeCandidate.harmonyScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top 3 Candidates Switcher */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-stone-600">
                  <span>{copy.picksHeading}</span>
                  <span
                    className="font-mono tabular-nums font-semibold"
                    style={{ color: luckyElementTheme.chipText }}
                  >
                    {result.luckyElement.hanja} · {getElementDisplayName(result.luckyElement, lang)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {result.candidates.map((cand, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={`${cand.surname.id}-${cand.givenName.id}`}
                        type="button"
                        onClick={() => {
                          setSelectedIndex(idx);
                          setHasIssued(true);
                        }}
                        className={`text-left rounded-xl p-3 border transition-colors ${
                          isSelected
                            ? 'text-white'
                            : 'bg-white text-[#14151A] border-stone-200 hover:bg-stone-50'
                        }`}
                        style={
                          isSelected
                            ? {
                                backgroundColor: activeTheme.activePickBg,
                                borderColor: activeTheme.activePickBorder,
                              }
                            : undefined
                        }
                      >
                        <div
                          className={`text-[10px] font-mono ${
                            isSelected ? '' : 'text-stone-500'
                          }`}
                          style={
                            isSelected ? { color: activeTheme.activePickSubtext } : undefined
                          }
                        >
                          {idx === 0 ? copy.pickPrimary : `${copy.pickAlt} ${idx + 1}`}
                        </div>
                        <div className="text-base font-bold mt-0.5 truncate">
                          {cand.fullHangul}
                        </div>
                        <div
                          className={`text-xs truncate ${
                            isSelected ? '' : 'text-stone-500'
                          }`}
                          style={
                            isSelected ? { color: activeTheme.activePickSubtext } : undefined
                          }
                        >
                          {cand.fullRomanized}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Bar: PNG Export + Share Links */}
              <div className="grid grid-cols-3 sm:grid-cols-12 gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadCard}
                  disabled={isSavingCard}
                  className="col-span-3 sm:col-span-6 rounded-xl text-white py-3 px-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-[filter,opacity] hover:brightness-95 disabled:opacity-70"
                  style={{ background: activeTheme.headerGradient }}
                >
                  {isSavingCard ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                      <span>{copy.savingCard}</span>
                    </>
                  ) : savedCardNotice ? (
                    <>
                      <Check className="w-4 h-4" strokeWidth={1.5} />
                      <span>{copy.savedCard}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" strokeWidth={1.5} />
                      <span>{copy.saveCard}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="col-span-1 sm:col-span-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-[#14151A] py-3 px-2 sm:px-3 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedLink ? (
                    <Check className="w-4 h-4 text-emerald-600" strokeWidth={1.5} />
                  ) : (
                    <Share2 className="w-4 h-4 text-stone-600" strokeWidth={1.5} />
                  )}
                  <span className="truncate">{copiedLink ? copy.copiedLink : copy.copyLink}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareWhatsapp}
                  className="col-span-1 sm:col-span-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-[#14151A] py-3 px-2 sm:px-3 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="truncate">{copy.shareWhatsapp}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareX}
                  className="col-span-1 sm:col-span-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-[#14151A] py-3 px-2 sm:px-3 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="truncate">{copy.shareX}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HANJA SYLLABLE BREAKDOWN + SAJU FIVE ELEMENTS + IDOL SOULMATE LINK */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        {/* Hanja Syllable Cards */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#14151A]">
            {copy.hanjaHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden">
              <div className="h-[3px] w-full" style={{ background: activeTheme.headerGradient }} />
              <div className="p-5 space-y-2">
                <div className="text-xs font-mono text-stone-500">{copy.surnameRole}</div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-bold text-[#14151A]">
                    {activeCandidate.surname.hangul}
                  </span>
                  <span
                    className="text-2xl font-medium"
                    style={{ color: activeTheme.hanjaAccent }}
                  >
                    {activeCandidate.surname.hanja}
                  </span>
                  <span className="text-sm font-medium text-stone-500">
                    ({activeCandidate.surname.romanized})
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {pickKoreanNameCopy(activeCandidate.surname.meaning, lang)}
                </p>
                <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                  {copy.sharedByIdols}: {activeCandidate.surname.famousIdols.join(', ')}
                </p>
              </div>
            </div>

            {activeCandidate.givenName.syllables.map((syl, sIdx) => (
              <div
                key={`${activeCandidate.givenName.id}-${sIdx}`}
                className="rounded-2xl bg-white border border-stone-200 overflow-hidden"
              >
                <div className="h-[3px] w-full" style={{ background: activeTheme.headerGradient }} />
                <div className="p-5 space-y-2">
                  <div className="text-xs font-mono text-stone-500">
                    {sIdx === 0 ? copy.syllable1Role : copy.syllable2Role}
                  </div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl font-bold text-[#14151A]">
                      {syl.hangul}
                    </span>
                    <span
                      className="text-2xl font-medium"
                      style={{ color: activeTheme.hanjaAccent }}
                    >
                      {syl.hanja}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {pickKoreanNameCopy(syl.meaning, lang)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saju Five Elements Balance & Matched Idol Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 rounded-2xl bg-white border border-stone-200 p-6 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-semibold text-[#14151A]">
                {copy.sajuHeading}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  className="rounded-xl border p-3.5"
                  style={{
                    backgroundColor: coreElementTheme.chipBg,
                    borderColor: coreElementTheme.chipBorder,
                  }}
                >
                  <div
                    className="flex items-center gap-1.5 text-[11px] font-mono font-medium"
                    style={{ color: coreElementTheme.chipText }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: coreElementTheme.badgeDotColor }}
                    />
                    <span>{copy.birthElementLabel}</span>
                  </div>
                  <div className="text-sm font-semibold text-[#14151A] mt-1">
                    {result.coreElement.hanja} ·{' '}
                    {getElementDisplayName(result.coreElement, lang)}
                  </div>
                </div>
                <div
                  className="rounded-xl border p-3.5"
                  style={{
                    backgroundColor: luckyElementTheme.chipBg,
                    borderColor: luckyElementTheme.chipBorder,
                  }}
                >
                  <div
                    className="flex items-center gap-1.5 text-[11px] font-mono font-medium"
                    style={{ color: luckyElementTheme.chipText }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: luckyElementTheme.badgeDotColor }}
                    />
                    <span>{copy.luckyElementLabel}</span>
                  </div>
                  <div className="text-sm font-semibold text-[#14151A] mt-1">
                    {result.luckyElement.hanja} ·{' '}
                    {getElementDisplayName(result.luckyElement, lang)}
                  </div>
                </div>
                <div className="rounded-xl bg-[#FAF8F5] border border-stone-200 p-3.5">
                  <div className="text-[11px] font-mono text-stone-500">
                    {copy.zodiacLabel}
                  </div>
                  <div className="text-sm font-semibold text-[#14151A] mt-1">
                    {getZodiacDisplayName(result.zodiac, lang)}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">
              {pickKoreanNameCopy(result.sajuStory, lang)}
            </p>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[#14151A] text-white p-6 flex flex-col justify-between gap-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-300">
                <Heart className="w-3.5 h-3.5 text-[#F87171]" strokeWidth={1.5} />
                <span>{copy.idolBannerEyebrow}</span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-2xl font-semibold text-white">
                  {matchedIdolName}
                </h3>
                <span className="text-xl font-mono font-semibold text-[#F87171] tabular-nums">
                  {result.matchedIdol.totalScore}%
                </span>
              </div>
              <p className="text-xs text-stone-300">
                {result.matchedIdol.group.name} · {result.matchedIdol.member.mbti} ·{' '}
                {result.matchedIdol.member.birthDate}
              </p>
            </div>

            <Link
              href={matchedIdolHref}
              onClick={() =>
                trackKoreanNameChemistryClick({
                  targetGroup: result.matchedIdol.group.id,
                  matchedMember: result.matchedIdol.member.id,
                  lang,
                })
              }
              className="w-full rounded-xl bg-white hover:bg-stone-100 text-[#14151A] py-3 px-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>{copy.idolBannerCta}</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CRAWLABLE EDITORIAL REFERENCE & FAQ SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 space-y-8">
        {/* Surname Reference Table */}
        <div className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#14151A]">
              {copy.surnameTableHeading}
            </h2>
            <p className="text-sm text-stone-600 mt-1">{copy.surnameTableDesc}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-medium">
                  <th className="py-2.5 pr-4">{copy.colSurname}</th>
                  <th className="py-2.5 px-4">{copy.colHanja}</th>
                  <th className="py-2.5 px-4">{copy.colElement}</th>
                  <th className="py-2.5 pl-4">{copy.colIdols}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {KOREAN_SURNAMES.slice(0, 10).map((sur) => {
                  const elTheme = getKoreanNameCardTheme(sur.element);
                  const elMeta = SAJU_ELEMENTS[sur.element];
                  return (
                    <tr key={sur.id}>
                      <td className="py-2.5 pr-4 font-semibold text-[#14151A]">
                        {sur.hangul} ({sur.romanized})
                      </td>
                      <td className="py-2.5 px-4 font-mono">{sur.hanja}</td>
                      <td className="py-2.5 px-4">
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap"
                          style={{
                            backgroundColor: elTheme.chipBg,
                            borderColor: elTheme.chipBorder,
                            color: elTheme.chipText,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: elTheme.badgeDotColor }}
                          />
                          <span>
                            {elMeta.hanja} · {getElementDisplayName(elMeta, lang)}
                          </span>
                        </span>
                      </td>
                      <td className="py-2.5 pl-4 text-stone-500">
                        {sur.famousIdols.join(', ')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Mirroring JSON-LD FAQPage 1:1 */}
        <div className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#14151A]">
            {copy.faqHeading}
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((item) => (
              <div key={item.question} className="space-y-1.5">
                <dt className="text-sm font-semibold text-[#14151A]">
                  {item.question}
                </dt>
                <dd className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
