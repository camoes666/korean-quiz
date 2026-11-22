import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuideHubPageView from '@/components/pages/GuideHubPageView';
import { PREFIX_LOCALES, isPrefixLocale } from '@/lib/i18nRoutes';
import { getGuideHubMetadata } from '@/lib/pageSeo';

interface LocaleGuideHubProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return PREFIX_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleGuideHubProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isPrefixLocale(locale)) return {};
  return getGuideHubMetadata(locale);
}

export default async function LocaleGuideHubPage({
  params,
}: LocaleGuideHubProps) {
  const { locale } = await params;
  if (!isPrefixLocale(locale)) {
    notFound();
  }
  return <GuideHubPageView locale={locale} />;
}
