import MapPageView from '@/components/pages/MapPageView';
import { getMapMetadata } from '@/lib/pageSeo';

export const dynamic = 'force-static';
export const metadata = getMapMetadata('en');

export default function KpopMapPage() {
  return <MapPageView locale="en" />;
}
