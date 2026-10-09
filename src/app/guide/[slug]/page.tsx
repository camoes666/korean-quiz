import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getTriviaQuizBySlug,
  getTriviaQuizzes,
  getRelatedTriviaQuizzes,
} from '@/data/quizzes';
import GuideDetailClient from '@/components/guide/GuideDetailClient';
import Script from 'next/script';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const triviaQuizzes = getTriviaQuizzes();
  return triviaQuizzes.map((quiz) => ({
    slug: quiz.slug,
  }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getTriviaQuizBySlug(slug);

  if (!quiz) {
    return {
      title: 'Guide Not Found | K-Pulse',
    };
  }

  const title = `${quiz.title} - Complete Fan Lore & Knowledge Guide (${quiz.questions.length} Facts) | K-Pulse`;
  const description = `Study guide & verified explanations for ${quiz.title}. Explore ${quiz.questions.length} questions, correct answers, cultural context, and insider fun facts.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://kpulsequiz.com/guide/${quiz.slug}`,
      siteName: 'K-Pulse',
      type: 'article',
      images: [
        {
          url: `/images/og/${quiz.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${quiz.title} Guide - K-Pulse`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/images/og/${quiz.slug}.png`],
    },
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const quiz = getTriviaQuizBySlug(slug);

  if (!quiz) {
    notFound();
  }

  const relatedGuides = getRelatedTriviaQuizzes(quiz.slug, 3);

  // Construct FAQPage Schema JSON-LD for rich snippet indexing
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: quiz.questions.map((q) => {
      const correctOpt = q.options.find((opt) => opt.id === q.correctAnswer);
      const ansText = correctOpt ? correctOpt.text : '';
      const fullAnswer = `${ansText}. ${q.explanation} ${
        q.funFact ? `Did You Know: ${q.funFact}` : ''
      }`.trim();

      return {
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: fullAnswer,
        },
      };
    }),
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
        name: 'Knowledge Guides',
        item: 'https://kpulsequiz.com/guide',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: quiz.title,
        item: `https://kpulsequiz.com/guide/${quiz.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GuideDetailClient quiz={quiz} relatedGuides={relatedGuides} />
    </>
  );
}
