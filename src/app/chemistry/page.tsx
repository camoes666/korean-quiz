import ChemistryHubPageView from '@/components/pages/ChemistryHubPageView';
import { getChemistryHubMetadata } from '@/lib/pageSeo';

export const dynamic = 'force-static';
export const metadata = getChemistryHubMetadata('en');

export default function ChemistryPage() {
  return <ChemistryHubPageView locale="en" />;
}
