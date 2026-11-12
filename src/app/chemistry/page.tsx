import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { IDOL_GROUPS } from '@/data/idolChemistry';
import ChemistryClient from '@/components/ChemistryClient';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'K-Pop Idol Soulmate & K-Saju × MBTI Chemistry Calculator | K-Pulse',
  description:
    'Calculate your 1:1 compatibility with 44 K-Pop idols (BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa, LE SSERAFIM) using Korean Saju Five Elements, MBTI, and Zodiac signs!',
  alternates: {
    canonical: 'https://kpulsequiz.com/chemistry',
  },
  openGraph: {
    title: 'K-Pop Idol Soulmate & K-Saju × MBTI Chemistry Calculator | K-Pulse',
    description:
      'Discover your destiny match % with BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa, and LE SSERAFIM using Korean Saju Five Elements & MBTI!',
    url: 'https://kpulsequiz.com/chemistry',
    siteName: 'K-Pulse',
    type: 'website',
    images: [
      {
        url: '/images/og/which-bts-member-is-your-soulmate.png',
        width: 1200,
        height: 630,
        alt: 'K-Pop Idol Soulmate & K-Saju Chemistry Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K-Pop Idol Soulmate & K-Saju × MBTI Chemistry Calculator | K-Pulse',
    description:
      'Discover your destiny match % with 44 K-Pop idols using Korean Saju Five Elements, Zodiac & MBTI!',
    images: ['/images/og/which-bts-member-is-your-soulmate.png'],
  },
};

export default function ChemistryPage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'K-Pulse Idol K-Saju × MBTI Chemistry Calculator',
    url: 'https://kpulsequiz.com/chemistry',
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'All',
    description:
      'Interactive K-Pop idol compatibility calculator combining Korean Saju Five Elements (Wood, Fire, Earth, Metal, Water), 16 MBTI types, and Zodiac signs across 44 members of BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa, and LE SSERAFIM.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] text-slate-500 font-bold text-sm">
            Loading K-Saju × MBTI Chemistry Lab...
          </div>
        }
      >
        <ChemistryClient />
      </Suspense>

      {/* Crawlable Group Hub Links for Search Engines */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3">
            Dedicated K-Pop Group Compatibility Pages
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {IDOL_GROUPS.map((g) => (
              <Link
                key={g.id}
                href={`/chemistry/${g.id}`}
                className="p-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 hover:bg-purple-50 hover:border-purple-200 text-center transition-colors"
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
