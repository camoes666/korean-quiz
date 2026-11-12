import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { IDOL_GROUPS, getIdolGroupById } from '@/data/idolChemistry';
import { SAJU_ELEMENTS, ZODIAC_META } from '@/lib/chemistryEngine';
import ChemistryClient from '@/components/ChemistryClient';

interface GroupChemistryPageProps {
  params: Promise<{ group: string }>;
}

export async function generateStaticParams() {
  return IDOL_GROUPS.map((g) => ({
    group: g.id,
  }));
}

export async function generateMetadata({
  params,
}: GroupChemistryPageProps): Promise<Metadata> {
  const { group: groupId } = await params;
  const group = getIdolGroupById(groupId);

  if (!group) {
    return {
      title: 'Idol Chemistry Calculator | K-Pulse',
    };
  }

  const memberNames = group.members.map((m) => m.name.split(' ')[0]).join(', ');
  const title = `${group.name} Compatibility Calculator (K-Saju × MBTI × Zodiac) | K-Pulse`;
  const description = `What is your 1:1 compatibility % with ${group.name} (${memberNames})? Enter your birthday and MBTI to check your Korean Saju Five Elements destiny score and full ${group.name} soulmate ranking!`;
  const canonicalUrl = `https://kpulsequiz.com/chemistry/${group.id}`;
  const ogImage = `/images/og/${group.relatedQuizSlug}.png`;

  return {
    title,
    description,
    keywords: [
      `${group.name} compatibility test`,
      `${group.name} MBTI compatibility`,
      `${group.name} soulmate calculator`,
      `${group.name} birthday compatibility`,
      `${group.name} Saju compatibility`,
      `${group.nameKo} 궁합`,
      `${group.nameKo} 사주 MBTI 궁합`,
      ...group.members.map((m) => `${m.name} MBTI compatibility`),
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'K-Pulse',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${group.name} K-Saju × MBTI Compatibility Calculator`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function GroupChemistryPage({
  params,
}: GroupChemistryPageProps) {
  const { group: groupId } = await params;
  const group = getIdolGroupById(groupId);

  if (!group) {
    notFound();
  }

  const memberNames = group.members.map((m) => m.name).join(', ');

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${group.name} K-Saju × MBTI Compatibility Calculator`,
    url: `https://kpulsequiz.com/chemistry/${group.id}`,
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'All',
    description: `Calculate 1:1 compatibility with ${group.name} members (${memberNames}) using Korean Saju Five Elements, MBTI, and Western Zodiac signs.`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What are the MBTI types and birthdays of ${group.name} members?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: group.members
            .map(
              (m) =>
                `${m.name} (${m.birthDate}, MBTI: ${m.mbti}, Saju Element: ${SAJU_ELEMENTS[m.sajuElement].nameEn}, Zodiac: ${ZODIAC_META[m.zodiac].nameEn})`
            )
            .join('; '),
        },
      },
      {
        '@type': 'Question',
        name: `How does the ${group.name} K-Saju × MBTI Chemistry Calculator work?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The calculator combines Korean Saju Five Elements (Wood, Fire, Earth, Metal, Water) derived from your birth date with 16-type MBTI cognitive synergy and Zodiac harmony to compute a 1:1 compatibility score and rank all ${group.members.length} ${group.name} members for you.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://kpulsequiz.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Idol Chemistry Lab',
        item: 'https://kpulsequiz.com/chemistry',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${group.name} Compatibility`,
        item: `https://kpulsequiz.com/chemistry/${group.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] text-slate-500 font-bold text-sm">
            Loading {group.name} K-Saju × MBTI Chemistry Calculator...
          </div>
        }
      >
        <ChemistryClient initialGroupId={group.id} />
      </Suspense>

      {/* Crawlable SEO Reference Table for Google Search Console Indexing */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-black text-xs mb-2">
              {group.emoji} {group.name} Official Profile & Saju Reference
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {group.name} ({group.nameKo}) Member Birthdays, MBTI & K-Saju Five Elements Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Explore the verified birth dates, Korean Saju Five Elements (오행: 목·화·토·금·수), Western Zodiac signs, and MBTI personality types for all {group.members.length} members of {group.name} ({group.fandom}).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-black">
                  <th className="py-3 pr-4">Member</th>
                  <th className="py-3 px-4">Birth Date</th>
                  <th className="py-3 px-4">MBTI</th>
                  <th className="py-3 px-4">K-Saju Element (오행)</th>
                  <th className="py-3 pl-4">Zodiac Sign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {group.members.map((m) => {
                  const el = SAJU_ELEMENTS[m.sajuElement];
                  const zod = ZODIAC_META[m.zodiac];
                  return (
                    <tr key={m.id} className="hover:bg-slate-50/80">
                      <td className="py-3 pr-4 font-black text-slate-900">
                        {m.emoji} {m.name} ({m.nameKo})
                      </td>
                      <td className="py-3 px-4 tabular-nums">{m.birthDate}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-extrabold text-slate-800 text-xs">
                          {m.mbti}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold">
                        {el.emoji} {el.nameEn} ({el.nameKo})
                      </td>
                      <td className="py-3 pl-4">
                        {zod.emoji} {zod.nameEn} ({zod.nameKo})
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Internal Links to Other Groups for Crawler Discovery */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black text-slate-400 mr-1">
              More K-Pop Chemistry Calculators:
            </span>
            {IDOL_GROUPS.map((g) => (
              <Link
                key={g.id}
                href={`/chemistry/${g.id}`}
                className={`px-3 py-1 rounded-full text-xs font-extrabold border transition-colors ${
                  g.id === group.id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50 hover:border-purple-200'
                }`}
              >
                {g.emoji} {g.name} Compatibility
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
