import HomeClient from '@/components/HomeClient';
import { getFeaturedArticleSummaries } from '@/lib/articles';
import { getHomeMetadata } from '@/lib/pageSeo';

export const metadata = getHomeMetadata('en');

export default function HomePage() {
  const featuredArticles = getFeaturedArticleSummaries(6);
  return <HomeClient featuredArticles={featuredArticles} />;
}
