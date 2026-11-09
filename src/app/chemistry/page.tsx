import { Suspense } from 'react';
import type { Metadata } from 'next';
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
    </>
  );
}
