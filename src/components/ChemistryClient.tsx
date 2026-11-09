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
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden border-b border-purple-100 bg-gradient-to-br from-purple-950 via-fuchsia-900 to-indigo-950 text-white py-10 sm:py-14">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#f472b6 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3.5 py-1.5 text-xs font-extrabold text-pink-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>
              {lang === 'ko'
                ? 'K-사주 오행 × MBTI × 별자리 1:1 정밀 분석'
                : lang === 'es'
                ? 'K-Saju Cinco Elementos × MBTI × Zodiaco'
                : 'K-Saju Five Elements × MBTI × Zodiac Lab'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {lang === 'ko' ? (
              <>
                나와 최애 아이돌의{' '}
                <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-purple-200 bg-clip-text text-transparent">
                  운명 궁합 연구소
                </span>
              </>
            ) : lang === 'es' ? (
              <>
                Calculadora de{' '}
                <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-purple-200 bg-clip-text text-transparent">
                  Química K-Pop y Saju
                </span>
              </>
            ) : (
              <>
                K-Pop Idol{' '}
                <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-purple-200 bg-clip-text text-transparent">
                  Soulmate & Saju Chemistry
                </span>
              </>
            )}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-purple-100/90 max-w-2xl mx-auto font-medium">
            {lang === 'ko'
              ? '7개 인기 그룹 44명 멤버의 실제 생년월일(사주 오행)과 MBTI 데이터를 기반으로, 나와 내 최애의 1:1 궁합 점수와 그룹 내 천생연분 랭킹을 10초 만에 확인하세요!'
              : lang === 'es'
              ? 'Basado en las fechas de nacimiento reales (Cinco Elementos del Saju coreano) y el MBTI de 44 idols de K-Pop. ¡Descubre tu porcentaje de compatibilidad en 10 segundos!'
              : 'Powered by real birth dates (Korean Saju Five Elements), Zodiac signs, and MBTIs of 44 K-Pop idols across 7 groups. Discover your 1:1 compatibility in 10 seconds!'}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6 relative z-10 space-y-8">
        {/* 2. INPUT & SELECTION CARD */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-purple-950/5 p-5 sm:p-8 space-y-7">
          {/* STEP 1: SELECT GROUP */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center">
                1
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {lang === 'ko'
                  ? '아이돌 그룹 선택'
                  : lang === 'es'
                  ? 'Elige el Grupo de K-Pop'
                  : 'Select K-Pop Group'}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {IDOL_GROUPS.map((group) => {
                const isSelected = group.id === currentGroup.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => handleSelectGroup(group.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-purple-400/50'
                        : 'bg-slate-50/80 hover:bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="text-2xl mb-1">{group.emoji}</span>
                    <span className="text-xs font-black tracking-tight leading-tight">
                      {group.name}
                    </span>
                    <span
                      className={`text-[10px] mt-0.5 font-bold ${
                        isSelected ? 'text-purple-300' : 'text-slate-400'
                      }`}
                    >
                      {group.members.length}{' '}
                      {lang === 'ko' ? '명' : 'members'}
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
                <span className="w-6 h-6 rounded-full bg-pink-600 text-white text-xs font-black flex items-center justify-center">
                  2
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {lang === 'ko'
                    ? `${currentGroup.nameKo} 멤버 선택`
                    : lang === 'es'
                    ? `Elige tu miembro de ${currentGroup.name}`
                    : `Choose Your ${currentGroup.name} Bias`}
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-400">
                {lang === 'ko'
                  ? '결과 화면에서도 다른 멤버로 바로 전환 가능!'
                  : 'Switch members anytime with 1 click!'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {currentGroup.members.map((member) => {
                const isSelected = member.id === currentMember.id;
                const elMeta = SAJU_ELEMENTS[member.sajuElement];
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => setSelectedMemberId(member.id)}
                    className={`relative flex items-center gap-3 p-3 rounded-2xl border text-left transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-gradient-to-br from-purple-50 via-pink-50 to-white border-purple-500 shadow-md ring-2 ring-purple-400/40'
                        : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                      {member.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-black text-xs sm:text-sm text-slate-900 truncate">
                        {lang === 'ko' ? member.nameKo : member.name}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-slate-100 text-slate-700">
                          {member.mbti}
                        </span>
                        <span
                          className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-extrabold border ${elMeta.badgeBg}`}
                        >
                          {elMeta.emoji} {elMeta.hanja}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
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
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center">
                3
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {lang === 'ko'
                  ? '내 생년월일 & MBTI 입력'
                  : lang === 'es'
                  ? 'Tu Fecha de Nacimiento y MBTI'
                  : 'Your Birth Date & MBTI'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Nickname + Birth Date */}
              <div className="md:col-span-5 space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 mb-1.5">
                    {lang === 'ko'
                      ? '내 이름 / 닉네임 (선택)'
                      : lang === 'es'
                      ? 'Tu Nombre / Apodo (Opcional)'
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
                        : 'e.g. Alex, Mia'
                    }
                    maxLength={24}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-extrabold text-slate-600 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-600" />
                    <span>
                      {lang === 'ko'
                        ? '생년월일 (사주 일간·오행 및 별자리 자동 계산)'
                        : lang === 'es'
                        ? 'Fecha de Nacimiento (Calcula tu Saju y Zodiaco)'
                        : 'Birth Date (Calculates K-Saju Element & Zodiac)'}
                    </span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      aria-label="Birth Year"
                      value={birthYear}
                      onChange={(e) => setBirthYear(Number(e.target.value))}
                      className="rounded-xl border border-slate-200 bg-white px-2.5 py-2.5 text-xs sm:text-sm font-extrabold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                      className="rounded-xl border border-slate-200 bg-white px-2.5 py-2.5 text-xs sm:text-sm font-extrabold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                      className="rounded-xl border border-slate-200 bg-white px-2.5 py-2.5 text-xs sm:text-sm font-extrabold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    <span className="text-slate-400 font-bold">
                      {lang === 'ko' ? '내 타고난 기운:' : 'Your Aura:'}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-extrabold border ${analysis.userElement.badgeBg}`}
                    >
                      {analysis.userElement.emoji}{' '}
                      {getElementDisplayName(analysis.userElement, lang)}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-extrabold bg-purple-50 text-purple-700 border border-purple-200">
                      {analysis.userZodiac.emoji}{' '}
                      {getZodiacDisplayName(analysis.userZodiac, lang)}
                    </span>
                  </div>
                </div>
              </div>

              {/* MBTI Grid */}
              <div className="md:col-span-7">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-extrabold text-slate-600">
                    <Brain className="w-3.5 h-3.5 text-pink-600" />
                    <span>
                      {lang === 'ko'
                        ? '내 MBTI 선택'
                        : lang === 'es'
                        ? 'Tu MBTI'
                        : 'Select Your MBTI'}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setMbti('UNKNOWN')}
                    className={`text-xs font-extrabold px-2.5 py-1 rounded-lg border transition-all ${
                      mbti === 'UNKNOWN'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {lang === 'ko'
                      ? '🤷 MBTI 모름 (사주·별자리로만 보기)'
                      : '🤷 Skip MBTI (Use Saju Only)'}
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
                        className={`py-2 px-1 rounded-xl text-xs font-black border transition-all active:scale-95 ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-600 shadow-xs'
                            : 'bg-slate-50/80 hover:bg-white text-slate-700 border-slate-200'
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
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-500 hover:via-pink-500 hover:to-rose-400 text-white font-black text-base sm:text-lg shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-current animate-pulse" />
              <span>
                {lang === 'ko'
                  ? `나 × ${currentMember.nameKo} 궁합 결과 확인하기`
                  : lang === 'es'
                  ? `Ver Mi Química con ${currentMember.name}`
                  : `Reveal My Chemistry with ${currentMember.name}`}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3. CHEMISTRY RESULT REPORT */}
        {hasAnalyzed && (
          <div ref={resultRef} className="space-y-6 animate-fadeIn scroll-mt-20">
            {/* MAIN HERO REPORT CARD */}
            <div
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${currentMember.bgGradient} text-white p-6 sm:p-9 shadow-2xl`}
            >
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Left: Duo Profiles & Tier Title */}
                <div className="flex-1 text-center lg:text-left space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-black text-amber-300">
                    <span>{analysis.tierBadge}</span>
                  </div>

                  {/* User x Idol Pairing Header */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                    <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-left">
                      <div className="text-[11px] font-bold text-white/70">
                        {lang === 'ko' ? '나 (YOU)' : 'YOU'}
                      </div>
                      <div className="text-base sm:text-lg font-black">
                        {nickname.trim() || (lang === 'ko' ? '당신' : 'You')}
                      </div>
                      <div className="text-xs font-bold text-amber-200 mt-0.5">
                        {analysis.userElement.emoji} {analysis.userElement.hanja} ·{' '}
                        {mbti === 'UNKNOWN' ? analysis.userZodiac.emoji : mbti}
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-pink-500/30 border border-pink-300/40 flex items-center justify-center text-xl shadow-inner">
                      💞
                    </div>

                    <div className="px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-left">
                      <div className="text-[11px] font-bold text-pink-200">
                        {currentGroup.name} · {currentMember.characterName}
                      </div>
                      <div className="text-base sm:text-lg font-black flex items-center gap-1.5">
                        <span>{currentMember.emoji}</span>
                        <span>
                          {lang === 'ko' ? currentMember.nameKo : currentMember.name}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-amber-200 mt-0.5">
                        {analysis.memberElement.emoji} {analysis.memberElement.hanja} ·{' '}
                        {currentMember.mbti} · {currentMember.birthDate}
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black leading-snug">
                    {analysis.tierTitle}
                  </h2>

                  {/* Member Charm Pills */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                    {memberCharms.map((charm) => (
                      <span
                        key={charm}
                        className="px-3 py-1 rounded-full bg-black/25 border border-white/20 text-xs font-extrabold text-white/95"
                      >
                        ✦ {charm}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Giant Compatibility Score Badge */}
                <div className="shrink-0 flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-3xl p-6 sm:p-7 min-w-[210px] shadow-xl">
                  <span className="text-xs font-black uppercase tracking-widest text-pink-200">
                    {lang === 'ko' ? '운명 싱크로율' : 'DESTINY SYNC'}
                  </span>
                  <div className="text-6xl sm:text-7xl font-black tracking-tight text-amber-300 my-1 tabular-nums drop-shadow-md">
                    {analysis.totalScore}%
                  </div>
                  <span className="text-xs font-extrabold text-white/90">
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
              <div className="relative z-10 mt-8 pt-6 border-t border-white/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label:
                      lang === 'ko'
                        ? '☯️ K-사주 오행 상생'
                        : lang === 'es'
                        ? '☯️ Destino K-Saju'
                        : '☯️ K-Saju Five Elements',
                    score: analysis.stats.sajuScore,
                    barColor: 'from-amber-300 to-orange-400',
                  },
                  {
                    label:
                      lang === 'ko'
                        ? '🧠 MBTI 티키타카'
                        : lang === 'es'
                        ? '🧠 Sinergia MBTI'
                        : '🧠 MBTI Tiki-Taka',
                    score: analysis.stats.mbtiScore,
                    barColor: 'from-pink-300 to-rose-400',
                  },
                  {
                    label:
                      lang === 'ko'
                        ? '✨ 별자리 감성 주파수'
                        : lang === 'es'
                        ? '✨ Vibra Zodiacal'
                        : '✨ Zodiac Frequency',
                    score: analysis.stats.vibeScore,
                    barColor: 'from-cyan-300 to-sky-400',
                  },
                  {
                    label:
                      lang === 'ko'
                        ? '💖 설렘 & 데이트 텐션'
                        : lang === 'es'
                        ? '💖 Tensión Romántica'
                        : '💖 Heartbeat Tension',
                    score: analysis.stats.dateScore,
                    barColor: 'from-purple-300 to-fuchsia-400',
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-black/25 backdrop-blur-xs rounded-2xl p-3.5 border border-white/15"
                  >
                    <div className="flex items-center justify-between text-xs font-extrabold mb-2">
                      <span className="text-white/90">{stat.label}</span>
                      <span className="text-amber-300 tabular-nums font-black">
                        {stat.score}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-white/15 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${stat.barColor} transition-all duration-700`}
                        style={{ width: `${stat.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 DEEP ANALYSIS CARDS (K-SAJU + MBTI + DATE SCENARIO) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Card 1: K-Saju Five Elements */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black mb-3">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>
                      {lang === 'ko'
                        ? 'K-사주 오행(五行) 궁합 풀이'
                        : 'K-Saju Five Elements Reading'}
                    </span>
                  </div>

                  {/* Element Duo Box */}
                  <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 mb-3">
                    <div className="text-center flex-1">
                      <div className="text-2xl">{analysis.userElement.emoji}</div>
                      <div className="text-xs font-black text-slate-800 mt-0.5">
                        {getElementDisplayName(analysis.userElement, lang)}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400">
                        {lang === 'ko' ? '나의 일간 오행' : 'Your Element'}
                      </div>
                    </div>
                    <div className="text-xs font-black px-2 py-1 rounded-lg bg-purple-100 text-purple-700">
                      ×
                    </div>
                    <div className="text-center flex-1">
                      <div className="text-2xl">{analysis.memberElement.emoji}</div>
                      <div className="text-xs font-black text-slate-800 mt-0.5">
                        {getElementDisplayName(analysis.memberElement, lang)}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400">
                        {lang === 'ko' ? currentMember.nameKo : currentMember.name}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-black text-sm sm:text-base text-slate-900 mb-2 leading-snug">
                    {analysis.sajuHeadline}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {analysis.sajuDetail}
                  </p>
                </div>
              </div>

              {/* Card 2: MBTI & Zodiac Synergy */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-black mb-3">
                    <Brain className="w-3.5 h-3.5 text-purple-600" />
                    <span>
                      {lang === 'ko'
                        ? 'MBTI & 별자리 성향 시너지'
                        : 'MBTI & Zodiac Chemistry'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 mb-3">
                    <div className="text-center flex-1">
                      <div className="text-base font-black text-purple-700">
                        {mbti === 'UNKNOWN' ? analysis.userZodiac.emoji : mbti}
                      </div>
                      <div className="text-xs font-bold text-slate-600 mt-0.5">
                        {analysis.userZodiac.emoji}{' '}
                        {getZodiacDisplayName(analysis.userZodiac, lang)}
                      </div>
                    </div>
                    <div className="text-xs font-black px-2 py-1 rounded-lg bg-pink-100 text-pink-700">
                      SYNC
                    </div>
                    <div className="text-center flex-1">
                      <div className="text-base font-black text-pink-600">
                        {currentMember.mbti}
                      </div>
                      <div className="text-xs font-bold text-slate-600 mt-0.5">
                        {analysis.memberZodiac.emoji}{' '}
                        {getZodiacDisplayName(analysis.memberZodiac, lang)}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-black text-sm sm:text-base text-slate-900 mb-2 leading-snug">
                    {lang === 'ko'
                      ? '대화가 끊이지 않는 티키타카 주파수'
                      : 'Effortless Tiki-Taka & Emotional Sync'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {analysis.mbtiDetail}
                  </p>
                </div>
              </div>

              {/* Card 3: Ideal Date / Bestie Scenario */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-800 text-xs font-black mb-3">
                    <Compass className="w-3.5 h-3.5 text-pink-600" />
                    <span>
                      {lang === 'ko'
                        ? '우리가 만난다면? 추천 시나리오'
                        : 'Ideal Date & Bestie Scenario'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-pink-50/80 to-purple-50/80 border border-pink-200/60 mb-3 flex items-center gap-3">
                    <span className="text-3xl">{currentMember.emoji}</span>
                    <div>
                      <div className="text-xs font-black text-pink-700">
                        {lang === 'ko'
                          ? `${currentMember.nameKo} 맞춤형 로망 데이트`
                          : `Dream Hangout with ${currentMember.name}`}
                      </div>
                      <div className="text-[11px] font-bold text-slate-500">
                        {lang === 'ko'
                          ? `설렘 텐션 지수 ${analysis.stats.dateScore}%`
                          : `Heartbeat Score: ${analysis.stats.dateScore}%`}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-bold">
                    “{analysis.dateScenario}”
                  </p>
                </div>
              </div>
            </div>

            {/* SHARE & STORY CARD ACTION BAR */}
            <div className="bg-white rounded-3xl border border-purple-200/90 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 text-center sm:text-left">
                <img
                  src={currentGroup.mascotUrl}
                  alt="Mascot"
                  className="w-12 h-12 rounded-2xl object-cover border border-purple-200 shrink-0 hidden sm:block"
                />
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">
                    {lang === 'ko'
                      ? '내 궁합 인증샷 카드를 저장하거나 친구에게 공유해보세요!'
                      : lang === 'es'
                      ? '¡Guarda tu tarjeta de historia 9:16 o compártela con tus amigos!'
                      : 'Save your 9:16 Story Card or share your chemistry result!'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {lang === 'ko'
                      ? '인스타 스토리·X(트위터) 맞춤형 고화질 궁합 카드 이미지가 즉시 생성됩니다.'
                      : 'Generates an instant 1080×1920 image card with your top matches in the group.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={handleDownloadStoryCard}
                  disabled={isDownloadingCard}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-black shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-60"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isDownloadingCard
                      ? lang === 'ko'
                        ? '이미지 생성 중...'
                        : 'Creating...'
                      : lang === 'ko'
                      ? '스토리 결과 카드 저장'
                      : 'Save Story Card'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleShareTwitter}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all active:scale-95 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{lang === 'ko' ? 'X(트위터) 공유' : 'Post on X'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-extrabold transition-all active:scale-95 cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">
                        {lang === 'ko' ? '링크 복사됨!' : 'Copied!'}
                      </span>
                    </>
                  ) : (
                    <span>{lang === 'ko' ? '🔗 결과 링크 복사' : '🔗 Copy Link'}</span>
                  )}
                </button>
              </div>
            </div>

            {/* FULL GROUP RANKING & INSTANT 1-CLICK MEMBER SWITCHER */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-black text-purple-600 mb-1">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span>
                      {lang === 'ko'
                        ? '재입력 없이 클릭 한 번으로 다른 멤버와 궁합 비교!'
                        : 'Click any member below to view your 1:1 report immediately!'}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    {lang === 'ko'
                      ? `${currentGroup.nameKo} 전 멤버 × 나 궁합 랭킹`
                      : `Your Full ${currentGroup.name} Compatibility Ranking`}
                  </h3>
                </div>

                {/* Quick Group Switcher Pills inside Result */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {IDOL_GROUPS.map((grp) => (
                    <button
                      key={grp.id}
                      type="button"
                      onClick={() => handleSelectGroup(grp.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-extrabold border transition-all cursor-pointer ${
                        grp.id === currentGroup.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
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
