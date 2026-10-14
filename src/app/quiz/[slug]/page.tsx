import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getQuizBySlug, getRelatedQuizzes, getAllQuizzes } from '@/data/quizzes';
import QuizRunner from '@/components/QuizRunner';
import PersonalityTestRunner from '@/components/PersonalityTestRunner';
import { getQuizThemeGroup } from '@/lib/theme';
import { getQuizSeoData, generateQuizJsonLd } from '@/lib/seo';

interface QuizPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const quizzes = getAllQuizzes();
  return quizzes.map((quiz) => ({
    slug: quiz.slug,
  }));
}

export async function generateMetadata({
  params,
}: QuizPageProps): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);

  if (!quiz) {
    return {
      title: 'Quiz Not Found | K-Pulse',
    };
  }

  const seo = getQuizSeoData(quiz);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `https://kpulsequiz.com/quiz/${quiz.slug}`,
    },
    openGraph: {
      title: seo.ogTitle,
      description: seo.description,
      url: `https://kpulsequiz.com/quiz/${quiz.slug}`,
      siteName: 'K-Pulse',
      type: 'website',
      images: [
        {
          url: `/images/og/${quiz.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${quiz.title} - K-Pulse`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.ogTitle,
      description: seo.description,
      images: [`/images/og/${quiz.slug}.png`],
    },
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);

  if (!quiz) {
    notFound();
  }

  const relatedQuizzes = getRelatedQuizzes(quiz.slug, 4);
  const themeGroup = getQuizThemeGroup(quiz.slug, quiz.tag);
  const jsonLdSchemas = generateQuizJsonLd(quiz);

  return (
    <>
      {jsonLdSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {quiz.quizType === 'personality' ? (
        <main data-group={themeGroup} className="min-h-screen pb-16 transition-colors duration-300">
          <PersonalityTestRunner quiz={quiz} relatedQuizzes={relatedQuizzes} />
        </main>
      ) : (
        <main data-group={themeGroup} className="min-h-screen pb-16 transition-colors duration-300">
          <Suspense
            fallback={
              <div className="max-w-3xl mx-auto px-4 py-12 text-center animate-pulse">
                <div className="h-64 rounded-3xl bg-slate-100" />
              </div>
            }
          >
            <QuizRunner quiz={quiz} relatedQuizzes={relatedQuizzes} />
          </Suspense>
        </main>
      )}
    </>
  );
}
