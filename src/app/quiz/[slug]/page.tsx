import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getQuizBySlug, getRelatedQuizzes, getAllQuizzes } from '@/data/quizzes';
import QuizRunner from '@/components/QuizRunner';
import { getQuizThemeGroup } from '@/lib/theme';

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
      title: `${quiz.title} - Can You Score 10/10? | K-Pulse`,
      description: quiz.description,
      url: `https://kpulsequiz.com/quiz/${quiz.slug}`,
      siteName: 'K-Pulse',
      type: 'website',
      images: [
        {
          url: `/images/og/${quiz.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${quiz.title} - K-Pulse Trivia Challenge`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${quiz.title} - Can You Score 10/10? | K-Pulse`,
      description: quiz.description,
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

  return (
    <main data-group={themeGroup} className="min-h-screen pb-16 transition-colors duration-300">
      <QuizRunner quiz={quiz} relatedQuizzes={relatedQuizzes} />
    </main>
  );
}
