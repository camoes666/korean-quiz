import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllQuizzes, getQuizBySlug } from '@/data/quizzes';
import QuizPageView from '@/components/pages/QuizPageView';
import { getQuizMetadata } from '@/lib/pageSeo';

interface QuizPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllQuizzes().map((quiz) => ({
    slug: quiz.slug,
  }));
}

export async function generateMetadata({
  params,
}: QuizPageProps): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) {
    return { title: 'Quiz Not Found | K-Pulse' };
  }
  return getQuizMetadata(quiz, 'en');
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) {
    notFound();
  }
  return <QuizPageView quiz={quiz} locale="en" />;
}
