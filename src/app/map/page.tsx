import type { Metadata } from 'next';
import KpopMapClient from '@/components/map/KpopMapClient';
import { MAP_SPOTS } from '@/data/mapSpots';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'K-Pop Star Map: BTS, BLACKPINK & Stray Kids Spots in Korea | K-Pulse',
  description:
    'Interactive K-Pop pilgrimage map of verified BTS, BLACKPINK, and Stray Kids hometown landmarks, favorite restaurants, agency headquarters, and MV filming locations in Korea.',
  alternates: {
    canonical: 'https://kpulsequiz.com/map',
  },
  openGraph: {
    title: 'K-Pop Star Pilgrimage Map (BTS, BLACKPINK, Stray Kids) | K-Pulse',
    description:
      'Explore verified K-Pop restaurants, agencies, hometown landmarks, and filming locations with instant Naver, Kakao & Google Maps links.',
    url: 'https://kpulsequiz.com/map',
    siteName: 'K-Pulse',
    type: 'website',
    images: [
      {
        url: '/images/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'K-Pop Star Pilgrimage Map | K-Pulse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K-Pop Star Pilgrimage Map | K-Pulse',
    description:
      'Explore verified BTS, BLACKPINK & Stray Kids spots across Korea.',
    images: ['/images/og-banner.png'],
  },
};

export default function KpopMapPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'K-Pop Star Pilgrimage Map Spots',
    numberOfItems: MAP_SPOTS.length,
    itemListElement: MAP_SPOTS.map((spot, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: spot.name.en,
      description: spot.story.en,
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50/60 pb-16">
      <link rel="stylesheet" href="/vendor/leaflet.css" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <KpopMapClient />
    </main>
  );
}
