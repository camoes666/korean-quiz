import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getQuizBySlug, getRelatedQuizzes, getAllQuizzes } from '@/data/quizzes';
import QuizRunner from '@/components/QuizRunner';

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

  return {
    title: `${quiz.title} | K-Pulse`,
    description: quiz.description,
    openGraph: {
      title: `${quiz.title} - Can You Score 10/10?`,
      description: quiz.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${quiz.title} - K-Pulse Trivia Challenge`,
      description: quiz.description,
    },
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);

  if (!quiz) {
    notFound();
  }

  const relatedQuizzes = getRelatedQuizzes(quiz.slug, 2);

  return (
    <main className="min-h-screen pb-16">
      <QuizRunner quiz={quiz} relatedQuizzes={relatedQuizzes} />
    </main>
  );
}
