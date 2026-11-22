import { Suspense } from 'react';
import Link from 'next/link';
import { IDOL_GROUPS, type IdolGroupProfile } from '@/data/idolChemistry';
import { SAJU_ELEMENTS, ZODIAC_META, getElementDisplayName, getZodiacDisplayName } from '@/lib/chemistryEngine';
import ChemistryClient from '@/components/ChemistryClient';
import { localizePath, type SiteLocale } from '@/lib/i18nRoutes';
import { generateChemistryGroupJsonLd } from '@/lib/pageSeo';

export default function ChemistryGroupPageView({
  group,
  locale,
}: {
  group: IdolGroupProfile;
  locale: SiteLocale;
}) {
  const schemas = generateChemistryGroupJsonLd(group, locale);
  const groupDisplay = locale === 'ko' ? group.nameKo : group.name;

  const badgeLabel =
    locale === 'es'
      ? `${group.emoji} Perfil Oficial K-Saju de ${group.name}`
      : locale === 'pt'
      ? `${group.emoji} Perfil Oficial K-Saju de ${group.name}`
      : locale === 'ko'
      ? `${group.emoji} ${group.nameKo} 공식 사주·MBTI 프로필`
      : `${group.emoji} ${group.name} Official Profile & Saju Reference`;

  const tableHeading =
    locale === 'es'
      ? `Cumpleaños, MBTI y Cinco Elementos K-Saju de ${group.name}`
      : locale === 'pt'
      ? `Aniversários, MBTI e Cinco Elementos K-Saju de ${group.name}`
      : locale === 'ko'
      ? `${group.nameKo} (${group.name}) 멤버 생년월일 · MBTI · 사주 오행 가이드`
      : `${group.name} (${group.nameKo}) Member Birthdays, MBTI & K-Saju Five Elements Guide`;

  const tableDesc =
    locale === 'es'
      ? `Consulta las fechas de nacimiento verificadas, elementos K-Saju, signos del zodíaco y tipos MBTI de los ${group.members.length} miembros de ${group.name}.`
      : locale === 'pt'
      ? `Confira datas de nascimento verificadas, elementos K-Saju, signos e tipos MBTI de todos os ${group.members.length} membros de ${group.name}.`
      : locale === 'ko'
      ? `${groupDisplay} (${group.fandom}) 멤버 ${group.members.length}명의 생년월일, 사주 오행, 별자리, MBTI 정보를 한눈에 확인하세요.`
      : `Explore the verified birth dates, Korean Saju Five Elements (오행: 목·화·토·금·수), Western Zodiac signs, and MBTI personality types for all ${group.members.length} members of ${group.name} (${group.fandom}).`;

  const headers =
    locale === 'es'
      ? ['Miembro', 'Nacimiento', 'MBTI', 'Elemento K-Saju', 'Signo']
      : locale === 'pt'
      ? ['Membro', 'Nascimento', 'MBTI', 'Elemento K-Saju', 'Signo']
      : locale === 'ko'
      ? ['멤버', '생년월일', 'MBTI', '사주 오행', '별자리']
      : ['Member', 'Birth Date', 'MBTI', 'K-Saju Element (오행)', 'Zodiac Sign'];

  const moreLabel =
    locale === 'es'
      ? 'Más calculadoras de compatibilidad K-Pop:'
      : locale === 'pt'
      ? 'Mais calculadoras de compatibilidade K-Pop:'
      : locale === 'ko'
      ? '다른 그룹 궁합 보기:'
      : 'More K-Pop Chemistry Calculators:';

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] text-slate-500 font-bold text-sm">
            Loading {group.name} K-Saju × MBTI Chemistry Calculator...
          </div>
        }
      >
        <ChemistryClient initialGroupId={group.id} />
      </Suspense>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs mb-2">
              {badgeLabel}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {tableHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              {tableDesc}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-black">
                  <th className="py-3 pr-4">{headers[0]}</th>
                  <th className="py-3 px-4">{headers[1]}</th>
                  <th className="py-3 px-4">{headers[2]}</th>
                  <th className="py-3 px-4">{headers[3]}</th>
                  <th className="py-3 pl-4">{headers[4]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {group.members.map((m) => {
                  const el = SAJU_ELEMENTS[m.sajuElement];
                  const zod = ZODIAC_META[m.zodiac];
                  return (
                    <tr key={m.id} className="hover:bg-slate-50/80">
                      <td className="py-3 pr-4 font-black text-slate-900">
                        {m.emoji} {locale === 'ko' ? m.nameKo : `${m.name} (${m.nameKo})`}
                      </td>
                      <td className="py-3 px-4 tabular-nums">{m.birthDate}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-extrabold text-slate-800 text-xs">
                          {m.mbti}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold">
                        {el.emoji} {getElementDisplayName(el, locale)}
                      </td>
                      <td className="py-3 pl-4">
                        {zod.emoji} {getZodiacDisplayName(zod, locale)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black text-slate-400 mr-1">
              {moreLabel}
            </span>
            {IDOL_GROUPS.map((g) => (
              <Link
                key={g.id}
                href={localizePath(`/chemistry/${g.id}`, locale)}
                className={`px-3 py-1 rounded-full text-xs font-extrabold border transition-colors ${
                  g.id === group.id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {g.emoji} {g.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
