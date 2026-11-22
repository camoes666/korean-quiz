import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ChemistryHubPageView from '@/components/pages/ChemistryHubPageView';
import { PREFIX_LOCALES, isPrefixLocale } from '@/lib/i18nRoutes';
import { getChemistryHubMetadata } from '@/lib/pageSeo';

interface LocaleChemistryProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return PREFIX_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleChemistryProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isPrefixLocale(locale)) return {};
  return getChemistryHubMetadata(locale);
}

export default async function LocaleChemistryPage({
  params,
}: LocaleChemistryProps) {
  const { locale } = await params;
  if (!isPrefixLocale(locale)) {
    notFound();
  }
  return <ChemistryHubPageView locale={locale} />;
}
