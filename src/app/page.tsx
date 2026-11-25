import HomeClient from '@/components/HomeClient';
import { getAllArticles, getFeaturedArticleSummaries } from '@/lib/articles';
import { getHomeMetadata } from '@/lib/pageSeo';

export const metadata = getHomeMetadata('en');

export default function HomePage() {
  const featuredArticles = getFeaturedArticleSummaries(6);
  const totalArticleCount = getAllArticles().length;
  return (
    <HomeClient
      featuredArticles={featuredArticles}
      totalArticleCount={totalArticleCount}
    />
  );
}
