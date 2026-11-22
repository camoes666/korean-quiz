import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IDOL_GROUPS, getIdolGroupById } from '@/data/idolChemistry';
import ChemistryGroupPageView from '@/components/pages/ChemistryGroupPageView';
import { getChemistryGroupMetadata } from '@/lib/pageSeo';

interface GroupChemistryPageProps {
  params: Promise<{ group: string }>;
}

export async function generateStaticParams() {
  return IDOL_GROUPS.map((g) => ({
    group: g.id,
  }));
}

export async function generateMetadata({
  params,
}: GroupChemistryPageProps): Promise<Metadata> {
  const { group: groupId } = await params;
  const group = getIdolGroupById(groupId);
  if (!group) {
    return { title: 'Idol Chemistry Calculator | K-Pulse' };
  }
  return getChemistryGroupMetadata(group, 'en');
}

export default async function GroupChemistryPage({
  params,
}: GroupChemistryPageProps) {
  const { group: groupId } = await params;
  const group = getIdolGroupById(groupId);
  if (!group) {
    notFound();
  }
  return <ChemistryGroupPageView group={group} locale="en" />;
}
