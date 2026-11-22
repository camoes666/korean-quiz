import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTriviaQuizBySlug, getTriviaQuizzes } from '@/data/quizzes';
import GuideDetailPageView from '@/components/pages/GuideDetailPageView';
import { getGuideDetailMetadata } from '@/lib/pageSeo';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getTriviaQuizzes().map((quiz) => ({
    slug: quiz.slug,
  }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getTriviaQuizBySlug(slug);
  if (!quiz) {
    return { title: 'Guide Not Found | K-Pulse' };
  }
  return getGuideDetailMetadata(quiz, 'en');
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const quiz = getTriviaQuizBySlug(slug);
  if (!quiz) {
    notFound();
  }
  return <GuideDetailPageView quiz={quiz} locale="en" />;
}
