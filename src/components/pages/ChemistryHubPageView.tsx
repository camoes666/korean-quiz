import Link from 'next/link';
import { IDOL_GROUPS } from '@/data/idolChemistry';
import ChemistryClient from '@/components/ChemistryClient';
import { localizePath, type SiteLocale } from '@/lib/i18nRoutes';
import { generateChemistryHubJsonLd } from '@/lib/pageSeo';

export default function ChemistryHubPageView({ locale }: { locale: SiteLocale }) {
  const schemas = generateChemistryHubJsonLd(locale, IDOL_GROUPS);
  const heading =
    locale === 'es'
      ? 'Páginas de Compatibilidad por Grupo K-Pop'
      : locale === 'pt'
      ? 'Páginas de Compatibilidade por Grupo K-Pop'
      : locale === 'ko'
      ? 'K-Pop 그룹별 1:1 궁합 페이지'
      : 'Dedicated K-Pop Group Compatibility Pages';

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <ChemistryClient />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs">
          <h2 className="text-sm font-black tracking-wide text-slate-500 mb-3">
            {heading}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {IDOL_GROUPS.map((g) => (
              <Link
                key={g.id}
                href={localizePath(`/chemistry/${g.id}`, locale)}
                className="p-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 hover:bg-slate-100 text-center transition-colors"
              >
                <div className="text-xl mb-1">{g.emoji}</div>
                <div className="text-xs font-black text-slate-900">{g.name}</div>
                <div className="text-[10px] font-bold text-slate-500 mt-0.5">
                  Saju × MBTI
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
