import HomeClient from '@/components/HomeClient';
import { getHomeMetadata } from '@/lib/pageSeo';

export const metadata = getHomeMetadata('en');

export default function HomePage() {
  return <HomeClient />;
}
