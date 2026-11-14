'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  Share2,
  Download,
  Check,
  ArrowRight,
  Trophy,
  Flame,
  Calendar,
  Brain,
  Compass,
  Users,
} from 'lucide-react';
import {
  IDOL_GROUPS,
  IdolGroupProfile,
  IdolMemberProfile,
  MbtiType,
  getIdolGroupById,
} from '@/data/idolChemistry';
import {
  ALL_MBTI_TYPES,
  UserMbtiInput,
  analyzeIdolChemistry,
  getElementDisplayName,
  getGroupChemistryRanking,
  getZodiacDisplayName,
  SAJU_ELEMENTS,
} from '@/lib/chemistryEngine';
import { downloadResultCard } from '@/lib/renderResultCard';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';

interface ChemistryClientProps {
  initialGroupId?: string;
}

export default function ChemistryClient({ initialGroupId }: ChemistryClientProps = {}) {
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const { addXP } = useGame();

  const defaultGroup = getIdolGroupById(initialGroupId || 'bts') || IDOL_GROUPS[0];

  // State for selected group & member
  const [selectedGroupId, setSelectedGroupId] = useState<string>(defaultGroup.id);
  const [selectedMemberId, setSelectedMemberId] = useState<string>(
    defaultGroup.id === 'bts' ? 'jungkook' : defaultGroup.members[0].id
  );

  // State for user profile inputs
  const [nickname, setNickname] = useState<string>('');
  const [birthYear, setBirthYear] = useState<number>(2002);
  const [birthMonth, setBirthMonth] = useState<number>(5);
  const [birthDay, setBirthDay] = useState<number>(15);
  const [mbti, setMbti] = useState<UserMbtiInput>('ENFP');

  // View state
  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isDownloadingCard, setIsDownloadingCard] = useState<boolean>(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const initializedFromUrl = useRef<boolean>(false);

  // Hydrate from URL query params on mount
  useEffect(() => {
    if (initializedFromUrl.current) return;
    initializedFromUrl.current = true;

    const gParam = searchParams.get('g') || initialGroupId;
    const mParam = searchParams.get('m');
    const yParam = searchParams.get('y');
    const moParam = searchParams.get('mo');
    const dParam = searchParams.get('d');
    const mbtiParam = searchParams.get('mbti');
    const nParam = searchParams.get('n');

    let targetGroup = defaultGroup;
    if (gParam) {
      const foundGroup = getIdolGroupById(gParam);
      if (foundGroup) {
        targetGroup = foundGroup;
        setSelectedGroupId(foundGroup.id);
      }
    }

    if (mParam) {
      const foundMember = targetGroup.members.find((mem) => mem.id === mParam);
      if (foundMember) {
        setSelectedMemberId(foundMember.id);
      } else {
        setSelectedMemberId(targetGroup.members[0].id);
      }
    } else if (gParam) {
      setSelectedMemberId(
        targetGroup.id === 'bts' ? 'jungkook' : targetGroup.members[0].id
      );
    }

    if (yParam && !Number.isNaN(Number(yParam))) {
      setBirthYear(Math.max(1950, Math.min(2025, Number(yParam))));
    }
    if (moParam && !Number.isNaN(Number(moParam))) {
      setBirthMonth(Math.max(1, Math.min(12, Number(moParam))));
    }
    if (dParam && !Number.isNaN(Number(dParam))) {
      setBirthDay(Math.max(1, Math.min(31, Number(dParam))));
    }
    if (mbtiParam) {
      const upper = mbtiParam.toUpperCase();
      if (upper === 'UNKNOWN' || ALL_MBTI_TYPES.includes(upper as MbtiType)) {
        setMbti(upper as UserMbtiInput);
      }
    }
    if (nParam) {
      setNickname(nParam.slice(0, 24));
    }

    // If shared link contains birthday parameters, auto-open the result!
    if (moParam && dParam) {
      setHasAnalyzed(true);
    }
  }, [searchParams, initialGroupId, defaultGroup]);

  const currentGroup: IdolGroupProfile = useMemo(
    () => getIdolGroupById(selectedGroupId) || IDOL_GROUPS[0],
    [selectedGroupId]
  );

  const currentMember: IdolMemberProfile = useMemo(
    () =>
      currentGroup.members.find((m) => m.id === selectedMemberId) ||
      currentGroup.members[0],
    [currentGroup, selectedMemberId]
  );

  const userInput = useMemo(
    () => ({
      nickname,
      birthYear,
      birthMonth,
      birthDay,
      mbti,
    }),
    [nickname, birthYear, birthMonth, birthDay, mbti]
  );

  const analysis = useMemo(
    () => analyzeIdolChemistry(userInput, currentGroup, currentMember, lang),
    [userInput, currentGroup, currentMember, lang]
  );

  const groupRanking = useMemo(
    () => getGroupChemistryRanking(userInput, currentGroup, lang),
    [userInput, currentGroup, lang]
  );

  const playSuccessChime = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
      });
    } catch {
      // Ignore audio errors if blocked by browser autoplay policy
    }
  };

  const triggerAnalysis = () => {
    setHasAnalyzed(true);
    playSuccessChime();
    addXP(50);

    if (analysis.totalScore >= 88) {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
      });
    }

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleSelectGroup = (groupId: string) => {
    const grp = getIdolGroupById(groupId);
    if (!grp) return;
    setSelectedGroupId(grp.id);
    setSelectedMemberId(grp.members[0].id);
  };

  const handleQuickMemberSwitch = (memberId: string) => {
    setSelectedMemberId(memberId);
    playSuccessChime();
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const getShareUrl = () => {
    if (typeof window === 'undefined') {
      return `https://kpulsequiz.com/chemistry/${currentGroup.id}`;
    }
    const params = new URLSearchParams({
      m: currentMember.id,
      y: String(birthYear),
      mo: String(birthMonth),
      d: String(birthDay),
      mbti,
    });
    if (nickname.trim()) {
      params.set('n', nickname.trim());
    }
    return `${window.location.origin}/chemistry/${currentGroup.id}?${params.toString()}`;
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleShareTwitter = () => {
    const url = getShareUrl();
    const memberLocal = lang === 'ko' ? currentMember.nameKo : currentMember.name;
    const uEl = getElementDisplayName(analysis.userElement, lang);
    const mEl = getElementDisplayName(analysis.memberElement, lang);

    const text =
      lang === 'ko'
        ? `🔮 K-사주 × MBTI 아이돌 궁합 결과!\n나 × ${memberLocal} (${currentGroup.name}) 궁합 점수는 【${analysis.totalScore}%】💖\n${analysis.userElement.emoji} ${uEl} × ${analysis.memberElement.emoji} ${mEl}\n\n내 최애와의 사주·MBTI 궁합 확인하기 👇`
        : lang === 'es'
        ? `🔮 ¡Mi Química K-Saju × MBTI con ${currentMember.name} (${currentGroup.name}) es del 【${analysis.totalScore}%】! 💖\n${analysis.userElement.emoji} ${uEl} × ${analysis.memberElement.emoji} ${mEl}\n\nDescubre tu compatibilidad con tu bias 👇`
        : lang === 'pt'
        ? `🔮 Minha Química K-Saju × MBTI com ${currentMember.name} (${currentGroup.name}) é de 【${analysis.totalScore}%】! 💖\n${analysis.userElement.emoji} ${uEl} × ${analysis.memberElement.emoji} ${mEl}\n\nDescubra sua compatibilidade com seu bias 👇`
        : `🔮 My K-Saju × MBTI Chemistry with ${currentMember.name} (${currentGroup.name}) is 【${analysis.totalScore}%】! 💖\n${analysis.userElement.emoji} ${uEl} × ${analysis.memberElement.emoji} ${mEl}\n\nCheck your destiny match with your bias 👇`;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadStoryCard = async () => {
    if (isDownloadingCard) return;
    setIsDownloadingCard(true);
    try {
      const memberLocal = lang === 'ko' ? currentMember.nameKo : currentMember.name;
      const charms =
        lang === 'ko'
          ? currentMember.charmKo
          : lang === 'es'
          ? currentMember.charmEs
          : lang === 'pt'
          ? currentMember.charmPt
          : currentMember.charmEn;

      const top3 = groupRanking.slice(0, 3).map((entry) => ({
        name: lang === 'ko' ? entry.member.nameKo.split(' ')[0] : entry.member.name.split(' ')[0],
        percent: entry.totalScore,
      }));

      // Ensure currently selected member is displayed first on the card's sync stamp
      const cardMatches = [
        {
          name: lang === 'ko' ? currentMember.nameKo.split(' ')[0] : currentMember.name.split(' ')[0],
          percent: analysis.totalScore,
        },
        ...top3.filter(
          (t) =>
            t.name !==
            (lang === 'ko' ? currentMember.nameKo.split(' ')[0] : currentMember.name.split(' ')[0])
        ),
      ].slice(0, 3);

      await downloadResultCard(
        {
          type: 'personality',
          quizTitle:
            lang === 'ko'
              ? `${currentGroup.name} 사주 × MBTI 궁합 리포트`
              : `${currentGroup.name} K-Saju × MBTI Chemistry`,
          slug: currentGroup.relatedQuizSlug,
          lang,
          mascotUrl: currentGroup.mascotUrl,
          accentColor: currentMember.colorHex,
          groupName: currentGroup.name,
          memberName: `${memberLocal} (${analysis.totalScore}%)`,
          memberTitle: analysis.tierBadge,
          memberSubtitle: analysis.sajuHeadline,
          memberEmoji: currentMember.emoji,
          skzooName:
            lang === 'ko' ? currentMember.characterNameKo : currentMember.characterName,
          twinLabel: lang === 'ko' ? '상징 캐릭터' : 'Iconic Character',
          traits: charms,
          topMatches: cardMatches,
          bestMatchName:
            lang === 'ko'
              ? `${analysis.userElement.emoji}${analysis.userElement.hanja} × ${analysis.memberElement.emoji}${analysis.memberElement.hanja} (${mbti === 'UNKNOWN' ? currentMember.mbti : `${mbti}×${currentMember.mbti}`})`
              : `${analysis.userElement.emoji} ${analysis.userElement.element.toUpperCase()} × ${analysis.memberElement.emoji} ${analysis.memberElement.element.toUpperCase()} (${mbti === 'UNKNOWN' ? currentMember.mbti : `${mbti}×${currentMember.mbti}`})`,
        },
        `kpulse-chemistry-${currentGroup.id}-${currentMember.id}`
      );
    } finally {
      setIsDownloadingCard(false);
    }
  };

  const memberCharms =
    lang === 'ko'
      ? currentMember.charmKo
      : lang === 'es'
      ? currentMember.charmEs
      : lang === 'pt'
      ? currentMember.charmPt
      : currentMember.charmEn;

  const years = Array.from({ length: 46 }, (_, i) => 2015 - i); // 2015 down to 1970
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* 1. HERO HEADER */}
      <section className="border-b border-slate-800 bg-slate-950 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3.5 py-1 text-xs font-medium text-slate-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>
              {lang === 'ko'
                ? 'K-사주 오행 × MBTI × 별자리 1:1 정밀 분석'
                : lang === 'es'
                ? 'K-Saju Cinco Elementos × MBTI × Zodiaco'
                : lang === 'pt'
                ? 'K-Saju Cinco Elementos × MBTI × Zodíaco'
                : 'K-Saju Five Elements × MBTI × Zodiac Lab'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            {lang === 'ko'
              ? '나와 최애 아이돌의 운명 궁합 연구소'
              : lang === 'es'
              ? 'Calculadora de Química K-Pop y Saju'
              : lang === 'pt'
              ? 'Calculadora de Química K-Pop & Saju'
              : 'K-Pop Idol Soulmate & Saju Chemistry'}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            {lang === 'ko'
              ? '7개 그룹 44명 멤버의 실제 생년월일(사주 오행)과 MBTI 데이터를 기반으로, 나와 최애의 1:1 궁합 점수와 그룹 내 매치 순위를 분석합니다.'
              : lang === 'es'
              ? 'Basado en las fechas de nacimiento reales (Cinco Elementos del Saju) y el MBTI de 44 idols de K-Pop. Descubre tu porcentaje de compatibilidad 1:1.'
              : lang === 'pt'
              ? 'Baseado nas datas de nascimento reais (Cinco Elementos do Saju coreano) e MBTI de 44 idols de K-Pop. Descubra sua compatibilidade 1:1.'
              : 'Powered by real birth dates (Korean Saju Five Elements), Zodiac signs, and MBTIs of 44 K-Pop idols across 7 groups. Discover your 1:1 compatibility.'}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 relative z-10 space-y-6">
        {/* 2. INPUT & SELECTION CARD */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-6">
          {/* STEP 1: SELECT GROUP */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-md bg-slate-900 text-white text-[11px] font-mono font-medium flex items-center justify-center">
                1
              </span>
              <h2 className="text-sm font-semibold text-slate-900">
                {lang === 'ko'
                  ? '아이돌 그룹 선택'
                  : lang === 'es'
                  ? 'Elige el Grupo de K-Pop'
                  : lang === 'pt'
                  ? 'Escolha o Grupo de K-Pop'
                  : 'Select K-Pop Group'}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {IDOL_GROUPS.map((group) => {
                const isSelected = group.id === currentGroup.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => handleSelectGroup(group.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-colors active:scale-98 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="text-xl mb-1">{group.emoji}</span>
                    <span className="text-xs font-semibold tracking-tight leading-tight">
                      {group.name}
                    </span>
                    <span
                      className={`text-[10px] mt-0.5 font-medium ${
                        isSelected ? 'text-slate-300' : 'text-slate-400'
                      }`}
                    >
                      {group.members.length}{' '}
                      {lang === 'ko' ? '명' : lang === 'pt' ? 'membros' : 'members'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: SELECT BIAS MEMBER */}
          <div className="pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-slate-900 text-white text-[11px] font-mono font-medium flex items-center justify-center">
                  2
                </span>
                <h2 className="text-sm font-semibold text-slate-900">
                  {lang === 'ko'
                    ? `${currentGroup.nameKo} 멤버 선택`
                    : lang === 'es'
                    ? `Elige tu miembro de ${currentGroup.name}`
                    : lang === 'pt'
                    ? `Escolha seu bias de ${currentGroup.name}`
                    : `Choose Your ${currentGroup.name} Bias`}
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-normal">
                {lang === 'ko'
                  ? '결과 화면에서 다른 멤버로 바로 전환 가능'
                  : lang === 'pt'
                  ? 'Mude de membro a qualquer momento'
                  : 'Switch members anytime'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {currentGroup.members.map((member) => {
                const isSelected = member.id === currentMember.id;
                const elMeta = SAJU_ELEMENTS[member.sajuElement];
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => setSelectedMemberId(member.id)}
                    className={`relative flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-colors active:scale-98 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-50 border-slate-900 ring-1 ring-slate-900/10'
                        : 'bg-white hover:bg-slate-50/80 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl shrink-0">
                      {member.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-xs sm:text-sm text-slate-900 truncate">
                        {lang === 'ko' ? member.nameKo : member.name}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                          {member.mbti}
                        </span>
                        <span
                          className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium border ${elMeta.badgeBg}`}
                        >
                          {elMeta.emoji} {elMeta.hanja}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: USER BIRTHDATE & MBTI */}
          <div className="pt-5 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-5 rounded-md bg-slate-900 text-white text-[11px] font-mono font-medium flex items-center justify-center">
                3
              </span>
              <h2 className="text-sm font-semibold text-slate-900">
                {lang === 'ko'
                  ? '내 생년월일 & MBTI 입력'
                  : lang === 'es'
                  ? 'Tu Fecha de Nacimiento y MBTI'
                  : lang === 'pt'
                  ? 'Sua Data de Nascimento e MBTI'
                  : 'Your Birth Date & MBTI'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Nickname + Birth Date */}
              <div className="md:col-span-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    {lang === 'ko'
                      ? '내 이름 / 닉네임 (선택)'
                      : lang === 'es'
                      ? 'Tu Nombre / Apodo (Opcional)'
                      : lang === 'pt'
                      ? 'Seu Nome / Apelido (Opcional)'
                      : 'Your Name / Nickname (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder={
                      lang === 'ko'
                        ? '예: 지민러버, 아미공주'
                        : lang === 'es'
                        ? 'Ej. Sofia'
                        : lang === 'pt'
                        ? 'Ex: Ana, Bia'
                        : 'e.g. Alex, Mia'
                    }
                    maxLength={24}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                      {lang === 'ko'
                        ? '생년월일 (사주 일간·오행 및 별자리 자동 계산)'
                        : lang === 'es'
                        ? 'Fecha de Nacimiento (Calcula tu Saju y Zodiaco)'
                        : lang === 'pt'
                        ? 'Data de Nascimento (Calcula seu Saju e Zodíaco)'
                        : 'Birth Date (Calculates K-Saju Element & Zodiac)'}
                    </span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      aria-label="Birth Year"
                      value={birthYear}
                      onChange={(e) => setBirthYear(Number(e.target.value))}
                      className="rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    >
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                          {lang === 'ko' ? '년' : ''}
                        </option>
                      ))}
                    </select>

                    <select
                      aria-label="Birth Month"
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(Number(e.target.value))}
                      className="rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    >
                      {months.map((m) => (
                        <option key={m} value={m}>
                          {m}
                          {lang === 'ko' ? '월' : ` (M${m})`}
                        </option>
                      ))}
                    </select>

                    <select
                      aria-label="Birth Day"
                      value={birthDay}
                      onChange={(e) => setBirthDay(Number(e.target.value))}
                      className="rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    >
                      {days.map((d) => (
                        <option key={d} value={d}>
                          {d}
                          {lang === 'ko' ? '일' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Live Preview of User's Saju Element & Zodiac */}
                  <div className="mt-2.5 flex items-center gap-2 flex-wrap text-xs">
                    <span className="text-slate-400 font-medium">
                      {lang === 'ko' ? '기운:' : 'Aura:'}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium border ${analysis.userElement.badgeBg}`}
                    >
                      {analysis.userElement.emoji}{' '}
                      {getElementDisplayName(analysis.userElement, lang)}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {analysis.userZodiac.emoji}{' '}
                      {getZodiacDisplayName(analysis.userZodiac, lang)}
                    </span>
                  </div>
                </div>
              </div>

              {/* MBTI Grid */}
              <div className="md:col-span-7">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <Brain className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                      {lang === 'ko'
                        ? '내 MBTI 선택'
                        : lang === 'es'
                        ? 'Tu MBTI'
                        : lang === 'pt'
                        ? 'Seu MBTI'
                        : 'Select Your MBTI'}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setMbti('UNKNOWN')}
                    className={`text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                      mbti === 'UNKNOWN'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {lang === 'ko'
                      ? 'MBTI 모름 (사주로만 분석)'
                      : lang === 'pt'
                      ? 'Não sei meu MBTI (Apenas Saju)'
                      : 'Skip MBTI (Saju Only)'}
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                  {ALL_MBTI_TYPES.map((type) => {
                    const isSelected = mbti === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setMbti(type)}
                        className={`py-2 px-1 rounded-lg text-xs font-medium border transition-colors active:scale-95 cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-2xs font-semibold'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ANALYZE CTA BUTTON */}
          <div className="pt-2">
            <button
              type="button"
              onClick={triggerAnalysis}
              className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base shadow-xs flex items-center justify-center gap-2 transition-colors active:scale-98 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current text-rose-400" />
              <span>
                {lang === 'ko'
                  ? `나 × ${currentMember.nameKo} 궁합 분석하기`
                  : lang === 'es'
                  ? `Analizar Química con ${currentMember.name}`
                  : lang === 'pt'
                  ? `Analisar Química com ${currentMember.name}`
                  : `Analyze Chemistry with ${currentMember.name}`}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* 3. CHEMISTRY RESULT REPORT */}
        {hasAnalyzed && (
          <div ref={resultRef} className="space-y-6 animate-fadeIn scroll-mt-20">
            {/* MAIN HERO REPORT CARD */}
            <div
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${currentMember.bgGradient} text-white p-6 sm:p-8 shadow-xl`}
            >
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
                {/* Left: Duo Profiles & Tier Title */}
                <div className="flex-1 text-center lg:text-left space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-xs font-semibold text-white">
                    <span>{analysis.tierBadge}</span>
                  </div>

                  {/* User x Idol Pairing Header */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-3.5">
                    <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-left">
                      <div className="text-[10px] font-medium text-white/70">
                        {lang === 'ko' ? '나' : 'YOU'}
                      </div>
                      <div className="text-base font-semibold">
                        {nickname.trim() || (lang === 'ko' ? '당신' : 'You')}
                      </div>
                      <div className="text-xs font-medium text-white/80 mt-0.5">
                        {analysis.userElement.emoji} {analysis.userElement.hanja} ·{' '}
                        {mbti === 'UNKNOWN' ? analysis.userZodiac.emoji : mbti}
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-sm font-semibold">
                      ×
                    </div>

                    <div className="px-3.5 py-2 rounded-xl bg-white/15 backdrop-blur-xs border border-white/25 text-left">
                      <div className="text-[10px] font-medium text-white/70">
                        {currentGroup.name} · {currentMember.characterName}
                      </div>
                      <div className="text-base font-semibold flex items-center gap-1.5">
                        <span>{currentMember.emoji}</span>
                        <span>
                          {lang === 'ko' ? currentMember.nameKo : currentMember.name}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-white/80 mt-0.5">
                        {analysis.memberElement.emoji} {analysis.memberElement.hanja} ·{' '}
                        {currentMember.mbti} · {currentMember.birthDate}
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold leading-snug">
                    {analysis.tierTitle}
                  </h2>

                  {/* Member Charm Pills */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-1">
                    {memberCharms.map((charm) => (
                      <span
                        key={charm}
                        className="px-2.5 py-0.5 rounded-md bg-black/20 border border-white/15 text-xs font-normal text-white/90"
                      >
                        {charm}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Compatibility Score Badge */}
                <div className="shrink-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-xs border border-white/20 rounded-2xl p-6 sm:p-7 min-w-[200px]">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-white/70">
                    {lang === 'ko' ? '운명 싱크로율' : 'COMPATIBILITY'}
                  </span>
                  <div className="text-5xl sm:text-6xl font-bold tracking-tight text-white my-1 tabular-nums">
                    {analysis.totalScore}%
                  </div>
                  <span className="text-xs font-medium text-white/80">
                    {lang === 'ko'
                      ? `${currentGroup.name} 내 나의 궁합 ${
                          groupRanking.findIndex((r) => r.member.id === currentMember.id) + 1
                        }위`
                      : `#${
                          groupRanking.findIndex((r) => r.member.id === currentMember.id) + 1
                        } Match in ${currentGroup.name}`}
                  </span>
                </div>
              </div>

              {/* 4 SUB-STATS BARS */}
              <div className="relative z-10 mt-8 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    label:
                      lang === 'ko'
                        ? '사주 오행 상생'
                        : lang === 'es'
                        ? 'Destino K-Saju'
                        : lang === 'pt'
                        ? 'Destino K-Saju'
                        : 'K-Saju Five Elements',
                    score: analysis.stats.sajuScore,
                  },
                  {
                    label:
                      lang === 'ko'
                        ? 'MBTI 티키타카'
                        : lang === 'es'
                        ? 'Sinergia MBTI'
                        : lang === 'pt'
                        ? 'Sinergia MBTI'
                        : 'MBTI Tiki-Taka',
                    score: analysis.stats.mbtiScore,
                  },
                  {
                    label:
                      lang === 'ko'
                        ? '별자리 주파수'
                        : lang === 'es'
                        ? 'Vibra Zodiacal'
                        : lang === 'pt'
                        ? 'Vibração Zodiacal'
                        : 'Zodiac Frequency',
                    score: analysis.stats.vibeScore,
                  },
                  {
                    label:
                      lang === 'ko'
                        ? '설렘 & 데이트 텐션'
                        : lang === 'es'
                        ? 'Tensión Romántica'
                        : lang === 'pt'
                        ? 'Tensão Romântica'
                        : 'Heartbeat Tension',
                    score: analysis.stats.dateScore,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-black/20 backdrop-blur-xs rounded-xl p-3 border border-white/10"
                  >
                    <div className="flex items-center justify-between text-xs font-medium mb-2">
                      <span className="text-white/80">{stat.label}</span>
                      <span className="text-white tabular-nums font-semibold">
                        {stat.score}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/15 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white/90 rounded-full transition-all duration-700"
                        style={{ width: `${stat.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 DEEP ANALYSIS CARDS (K-SAJU + MBTI + DATE SCENARIO) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Card 1: K-Saju Five Elements */}
              <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium mb-3">
                    <Flame className="w-3.5 h-3.5 text-slate-600" />
                    <span>
                      {lang === 'ko'
                        ? '사주 오행 궁합 풀이'
                        : 'K-Saju Five Elements Reading'}
                    </span>
                  </div>

                  {/* Element Duo Box */}
                  <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200/70 mb-3">
                    <div className="text-center flex-1">
                      <div className="text-xl">{analysis.userElement.emoji}</div>
                      <div className="text-xs font-semibold text-slate-800 mt-0.5">
                        {getElementDisplayName(analysis.userElement, lang)}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        {lang === 'ko' ? '나의 일간' : 'Your Element'}
                      </div>
                    </div>
                    <div className="text-xs font-mono font-medium text-slate-400">
                      ×
                    </div>
                    <div className="text-center flex-1">
                      <div className="text-xl">{analysis.memberElement.emoji}</div>
                      <div className="text-xs font-semibold text-slate-800 mt-0.5">
                        {getElementDisplayName(analysis.memberElement, lang)}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        {lang === 'ko' ? currentMember.nameKo : currentMember.name}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-semibold text-sm sm:text-base text-slate-900 mb-1.5 leading-snug">
                    {analysis.sajuHeadline}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {analysis.sajuDetail}
                  </p>
                </div>
              </div>

              {/* Card 2: MBTI & Zodiac Synergy */}
              <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium mb-3">
                    <Brain className="w-3.5 h-3.5 text-slate-600" />
                    <span>
                      {lang === 'ko'
                        ? 'MBTI & 별자리 시너지'
                        : 'MBTI & Zodiac Chemistry'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200/70 mb-3">
                    <div className="text-center flex-1">
                      <div className="text-sm font-semibold text-slate-800">
                        {mbti === 'UNKNOWN' ? analysis.userZodiac.emoji : mbti}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5 font-medium">
                        {analysis.userZodiac.emoji}{' '}
                        {getZodiacDisplayName(analysis.userZodiac, lang)}
                      </div>
                    </div>
                    <div className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                      SYNC
                    </div>
                    <div className="text-center flex-1">
                      <div className="text-sm font-semibold text-slate-800">
                        {currentMember.mbti}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5 font-medium">
                        {analysis.memberZodiac.emoji}{' '}
                        {getZodiacDisplayName(analysis.memberZodiac, lang)}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-semibold text-sm sm:text-base text-slate-900 mb-1.5 leading-snug">
                    {lang === 'ko'
                      ? '대화가 끊이지 않는 티키타카 주파수'
                      : 'Effortless Tiki-Taka & Emotional Sync'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {analysis.mbtiDetail}
                  </p>
                </div>
              </div>

              {/* Card 3: Ideal Date / Bestie Scenario */}
              <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium mb-3">
                    <Compass className="w-3.5 h-3.5 text-slate-600" />
                    <span>
                      {lang === 'ko'
                        ? '추천 케미 시나리오'
                        : 'Ideal Date & Bestie Scenario'}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 mb-3 flex items-center gap-3">
                    <span className="text-2xl">{currentMember.emoji}</span>
                    <div>
                      <div className="text-xs font-semibold text-slate-800">
                        {lang === 'ko'
                          ? `${currentMember.nameKo} 맞춤형 데이트`
                          : `Hangout with ${currentMember.name}`}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {lang === 'ko'
                          ? `텐션 지수 ${analysis.stats.dateScore}%`
                          : `Heartbeat Score: ${analysis.stats.dateScore}%`}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    “{analysis.dateScenario}”
                  </p>
                </div>
              </div>
            </div>

            {/* SHARE & STORY CARD ACTION BAR */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <img
                  src={currentGroup.mascotUrl}
                  alt="Mascot"
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0 hidden sm:block"
                />
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm text-slate-900">
                    {lang === 'ko'
                      ? '내 궁합 인증샷 카드를 저장하거나 친구에게 공유해보세요'
                      : lang === 'es'
                      ? '¡Guarda tu tarjeta 9:16 o compártela con tus amigos!'
                      : lang === 'pt'
                      ? 'Salve seu card de Story 9:16 ou compartilhe com amigos'
                      : 'Save your 9:16 Story Card or share your result'}
                  </h3>
                  <p className="text-xs text-slate-400 font-normal mt-0.5">
                    {lang === 'ko'
                      ? '인스타 스토리·X 맞춤형 고화질 궁합 카드 이미지가 즉시 생성됩니다.'
                      : lang === 'pt'
                      ? 'Gera instantaneamente um card 1080×1920 com seus melhores matches.'
                      : 'Generates an instant 1080×1920 image card with your top matches.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={handleDownloadStoryCard}
                  disabled={isDownloadingCard}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>
                    {isDownloadingCard
                      ? lang === 'ko'
                        ? '생성 중...'
                        : lang === 'pt'
                        ? 'Gerando...'
                        : 'Creating...'
                      : lang === 'ko'
                      ? '스토리 카드 저장'
                      : lang === 'pt'
                      ? 'Salvar Card'
                      : 'Save Story Card'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleShareTwitter}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-medium transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lang === 'ko' ? 'X 공유' : lang === 'pt' ? 'Postar no X' : 'Post on X'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-slate-900" />
                      <span className="text-slate-900 font-medium">
                        {lang === 'ko' ? '복사됨' : lang === 'pt' ? 'Copiado' : 'Copied'}
                      </span>
                    </>
                  ) : (
                    <span>{lang === 'ko' ? '링크 복사' : lang === 'pt' ? 'Copiar Link' : 'Copy Link'}</span>
                  )}
                </button>
              </div>
            </div>

            {/* FULL GROUP RANKING & INSTANT 1-CLICK MEMBER SWITCHER */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1">
                    <Trophy className="w-3.5 h-3.5 text-slate-600" />
                    <span>
                      {lang === 'ko'
                        ? '클릭 한 번으로 다른 멤버와 궁합 비교'
                        : lang === 'pt'
                        ? 'Clique em qualquer membro para ver o resultado 1:1'
                        : 'Click any member below to view your 1:1 report'}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                    {lang === 'ko'
                      ? `${currentGroup.nameKo} 전 멤버 궁합 랭킹`
                      : lang === 'pt'
                      ? `Ranking de Compatibilidade em ${currentGroup.name}`
                      : `${currentGroup.name} Compatibility Ranking`}
                  </h3>
                </div>

                {/* Quick Group Switcher Pills inside Result */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {IDOL_GROUPS.map((grp) => (
                    <button
                      key={grp.id}
                      type="button"
                      onClick={() => handleSelectGroup(grp.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                        grp.id === currentGroup.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {grp.emoji} {grp.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {groupRanking.map((entry, idx) => {
                  const isCurrent = entry.member.id === currentMember.id;
                  const elMeta = SAJU_ELEMENTS[entry.member.sajuElement];
                  return (
                    <button
                      key={entry.member.id}
                      type="button"
                      onClick={() => handleQuickMemberSwitch(entry.member.id)}
                      className={`flex items-center justify-between gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-purple-50/90 border-purple-500 ring-2 ring-purple-400/30 shadow-xs'
                          : 'bg-slate-50/60 hover:bg-white border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shrink-0 ${
                            idx === 0
                              ? 'bg-amber-400 text-slate-950'
                              : idx === 1
                              ? 'bg-slate-300 text-slate-900'
                              : idx === 2
                              ? 'bg-amber-700/80 text-white'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="text-2xl shrink-0">{entry.member.emoji}</span>
                        <div className="min-w-0">
                          <div className="font-black text-sm text-slate-900 truncate flex items-center gap-1.5">
                            <span>
                              {lang === 'ko' ? entry.member.nameKo : entry.member.name}
                            </span>
                            {idx === 0 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-black">
                                BEST
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] font-bold text-slate-500 mt-0.5">
                            {elMeta.emoji} {elMeta.hanja} · {entry.member.mbti}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-lg font-black text-purple-700 tabular-nums">
                          {entry.totalScore}%
                        </div>
                        <div className="text-[10px] font-extrabold text-slate-400">
                          {isCurrent
                            ? lang === 'ko'
                              ? '현재 보고 있음'
                              : 'Viewing'
                            : lang === 'ko'
                            ? '클릭해서 보기 →'
                            : 'View report →'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RELATED PERSONALITY QUIZ CTA */}
            <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl shrink-0">
                  {currentGroup.emoji}
                </div>
                <div>
                  <div className="text-xs font-extrabold text-pink-300 uppercase tracking-wider">
                    {lang === 'ko' ? '추천 성향 테스트' : 'Recommended Personality Quiz'}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black mt-0.5">
                    {lang === 'ko'
                      ? `${currentGroup.nameKo} 질문형 성향 & 소울메이트 테스트도 해볼까요?`
                      : `Take the Full 10-Question ${currentGroup.name} Personality Quiz!`}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    {lang === 'ko'
                      ? '사주·MBTI 궁합과 실제 나의 선택으로 나온 소울메이트 결과가 일치하는지 확인해보세요!'
                      : 'See if your 10-question personality match agrees with your K-Saju destiny!'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
                <Link
                  href={`/quiz/${currentGroup.relatedQuizSlug}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-950 hover:bg-pink-100 font-black text-xs sm:text-sm transition-all active:scale-95"
                >
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>
                    {lang === 'ko'
                      ? `${currentGroup.name} 테스트 하러가기`
                      : `Play ${currentGroup.name} Quiz`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
