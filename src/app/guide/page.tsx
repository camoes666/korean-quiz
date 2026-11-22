import GuideHubPageView from '@/components/pages/GuideHubPageView';
import { getGuideHubMetadata } from '@/lib/pageSeo';

export const dynamic = 'force-static';
export const metadata = getGuideHubMetadata('en');

export default function GuideHubPage() {
  return <GuideHubPageView locale="en" />;
}
