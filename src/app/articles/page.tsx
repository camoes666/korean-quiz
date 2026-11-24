import ArticlesHubClient from '@/components/articles/ArticlesHubClient';
import { getAllArticles, getArticleSummaries } from '@/lib/articles';
import {
  generateArticlesHubJsonLd,
  getArticlesHubMetadata,
} from '@/lib/pageSeo';

export const dynamic = 'force-static';
export const metadata = getArticlesHubMetadata();

export default function ArticlesHubPage() {
  const articles = getAllArticles();
  const summaries = getArticleSummaries();
  const schemas = generateArticlesHubJsonLd(articles);

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ArticlesHubClient articles={summaries} />
    </>
  );
}
