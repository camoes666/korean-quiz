import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IDOL_GROUPS, getIdolGroupById } from '@/data/idolChemistry';
import ChemistryGroupPageView from '@/components/pages/ChemistryGroupPageView';
import { PREFIX_LOCALES, isPrefixLocale } from '@/lib/i18nRoutes';
import { getChemistryGroupMetadata } from '@/lib/pageSeo';

interface LocaleGroupChemistryProps {
  params: Promise<{ locale: string; group: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return PREFIX_LOCALES.flatMap((locale) =>
    IDOL_GROUPS.map((g) => ({
      locale,
      group: g.id,
    }))
  );
}

export async function generateMetadata({
  params,
}: LocaleGroupChemistryProps): Promise<Metadata> {
  const { locale, group: groupId } = await params;
  if (!isPrefixLocale(locale)) return {};
  const group = getIdolGroupById(groupId);
  if (!group) {
    return { title: 'Idol Chemistry Calculator | K-Pulse' };
  }
  return getChemistryGroupMetadata(group, locale);
}

export default async function LocaleGroupChemistryPage({
  params,
}: LocaleGroupChemistryProps) {
  const { locale, group: groupId } = await params;
  if (!isPrefixLocale(locale)) {
    notFound();
  }
  const group = getIdolGroupById(groupId);
  if (!group) {
    notFound();
  }
  return <ChemistryGroupPageView group={group} locale={locale} />;
}
