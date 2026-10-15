import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllQuizzes, getQuizBySlug } from '@/data/quizzes';
import RecordModeRunner from '@/components/RecordModeRunner';
import { getQuizThemeGroup } from '@/lib/theme';

interface RecordPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllQuizzes().map((quiz) => ({ slug: quiz.slug }));
}

export const metadata: Metadata = {
  title: 'Record Mode | K-Pulse',
  robots: { index: false, follow: false },
};

export default async function RecordPage({ params }: RecordPageProps) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);

  if (!quiz) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="fixed inset-0 z-[100] bg-black" />}>
      <RecordModeRunner
        key={quiz.slug}
        quiz={quiz}
        themeGroup={getQuizThemeGroup(quiz.slug, quiz.tag)}
        quizOptions={getAllQuizzes().map(({ slug, title, coverEmoji }) => ({ slug, title, coverEmoji }))}
      />
    </Suspense>
  );
}
