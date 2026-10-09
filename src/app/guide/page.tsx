import { Metadata } from 'next';
import {
  getTriviaQuizzes,
  getTotalTriviaQuestionCount,
  getAllQuizzes,
} from '@/data/quizzes';
import GuideHubClient from '@/components/guide/GuideHubClient';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'K-Culture & K-Pop Knowledge Guides | 230+ Curated Facts & Lore | K-Pulse',
  description:
    'Explore 230+ verified facts, deep fandom lore, and cultural insights across BTS, Stray Kids, BLACKPINK, Korean Spicy Food, Culture IQ, and KDrama.',
  openGraph: {
    title: 'K-Culture & K-Pop Knowledge & Lore Guides | K-Pulse',
    description:
      'Master 230+ verified Q&A facts, deep fandom lore, and cultural insights with K-Pulse Knowledge Guides.',
    url: 'https://kpulsequiz.com/guide',
    siteName: 'K-Pulse',
    type: 'website',
    images: [
      {
        url: '/images/og/bts-army-trivia.png',
        width: 1200,
        height: 630,
        alt: 'K-Pulse Knowledge & Lore Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K-Culture & K-Pop Knowledge Guides | K-Pulse',
    description:
      'Master 230+ verified Q&A facts, deep fandom lore, and cultural insights with K-Pulse Knowledge Guides.',
    images: ['/images/og/bts-army-trivia.png'],
  },
};

export default function GuideHubPage() {
  const triviaQuizzes = getTriviaQuizzes();
  const allQuizzes = getAllQuizzes();
  const personalityQuizzes = allQuizzes.filter(
    (q) => q.quizType === 'personality'
  );
  const totalQuestionCount = getTotalTriviaQuestionCount();

  // ItemList Schema for SEO
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: triviaQuizzes.map((guide, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: guide.title,
      description: guide.description,
      url: `https://kpulsequiz.com/guide/${guide.slug}`,
    })),
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://kpulsequiz.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Knowledge & Lore Guides',
        item: 'https://kpulsequiz.com/guide',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GuideHubClient
        guides={triviaQuizzes}
        personalityQuizzes={personalityQuizzes}
        totalQuestionCount={totalQuestionCount}
      />
    </>
  );
}
