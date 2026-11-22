import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MapPageView from '@/components/pages/MapPageView';
import { PREFIX_LOCALES, isPrefixLocale } from '@/lib/i18nRoutes';
import { getMapMetadata } from '@/lib/pageSeo';

interface LocaleMapProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return PREFIX_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleMapProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isPrefixLocale(locale)) return {};
  return getMapMetadata(locale);
}

export default async function LocaleMapPage({ params }: LocaleMapProps) {
  const { locale } = await params;
  if (!isPrefixLocale(locale)) {
    notFound();
  }
  return <MapPageView locale={locale} />;
}
