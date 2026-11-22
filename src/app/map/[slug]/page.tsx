import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MapSpotPageView from '@/components/pages/MapSpotPageView';
import { MAP_SPOTS } from '@/data/mapSpots';
import { getSpotBySlug } from '@/lib/mapGeo';
import { getMapSpotMetadata } from '@/lib/pageSeo';

interface MapSpotPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return MAP_SPOTS.map((spot) => ({ slug: spot.slug }));
}

export async function generateMetadata({
  params,
}: MapSpotPageProps): Promise<Metadata> {
  const { slug } = await params;
  const spot = getSpotBySlug(slug);
  if (!spot) return {};
  return getMapSpotMetadata(spot, 'en');
}

export default async function MapSpotPage({ params }: MapSpotPageProps) {
  const { slug } = await params;
  const spot = getSpotBySlug(slug);
  if (!spot) {
    notFound();
  }
  return <MapSpotPageView locale="en" slug={slug} />;
}
