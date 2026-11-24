import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HomeClient from '@/components/HomeClient';
import { getFeaturedArticleSummaries } from '@/lib/articles';
import { PREFIX_LOCALES, isPrefixLocale } from '@/lib/i18nRoutes';
import { getHomeMetadata } from '@/lib/pageSeo';

interface LocaleHomeProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return PREFIX_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleHomeProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isPrefixLocale(locale)) return {};
  return getHomeMetadata(locale);
}

export default async function LocaleHomePage({ params }: LocaleHomeProps) {
  const { locale } = await params;
  if (!isPrefixLocale(locale)) {
    notFound();
  }
  const featuredArticles = getFeaturedArticleSummaries(6);
  return <HomeClient featuredArticles={featuredArticles} />;
}
