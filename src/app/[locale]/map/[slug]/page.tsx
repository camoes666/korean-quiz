import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MapSpotPageView from '@/components/pages/MapSpotPageView';
import { MAP_SPOTS } from '@/data/mapSpots';
import { PREFIX_LOCALES, isPrefixLocale } from '@/lib/i18nRoutes';
import { getSpotBySlug } from '@/lib/mapGeo';
import { getMapSpotMetadata } from '@/lib/pageSeo';

interface LocaleMapSpotPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return PREFIX_LOCALES.flatMap((locale) =>
    MAP_SPOTS.map((spot) => ({ locale, slug: spot.slug }))
  );
}

export async function generateMetadata({
  params,
}: LocaleMapSpotPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isPrefixLocale(locale)) return {};
  const spot = getSpotBySlug(slug);
  if (!spot) return {};
  return getMapSpotMetadata(spot, locale);
}

export default async function LocaleMapSpotPage({
  params,
}: LocaleMapSpotPageProps) {
  const { locale, slug } = await params;
  if (!isPrefixLocale(locale)) {
    notFound();
  }
  const spot = getSpotBySlug(slug);
  if (!spot) {
    notFound();
  }
  return <MapSpotPageView locale={locale} slug={slug} />;
}
