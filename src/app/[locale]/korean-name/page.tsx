import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import KoreanNamePageView from '@/components/pages/KoreanNamePageView';
import { PREFIX_LOCALES, isPrefixLocale } from '@/lib/i18nRoutes';
import { getKoreanNameMetadata } from '@/lib/pageSeo';

interface LocaleKoreanNameProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return PREFIX_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleKoreanNameProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isPrefixLocale(locale)) return {};
  return getKoreanNameMetadata(locale);
}

export default async function LocaleKoreanNamePage({
  params,
}: LocaleKoreanNameProps) {
  const { locale } = await params;
  if (!isPrefixLocale(locale)) {
    notFound();
  }
  return <KoreanNamePageView locale={locale} />;
}
