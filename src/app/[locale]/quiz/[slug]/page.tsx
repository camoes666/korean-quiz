import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllQuizzes, getQuizBySlug } from '@/data/quizzes';
import QuizPageView from '@/components/pages/QuizPageView';
import { PREFIX_LOCALES, isPrefixLocale } from '@/lib/i18nRoutes';
import { getQuizMetadata } from '@/lib/pageSeo';

interface LocaleQuizPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const quizzes = getAllQuizzes();
  return PREFIX_LOCALES.flatMap((locale) =>
    quizzes.map((quiz) => ({
      locale,
      slug: quiz.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: LocaleQuizPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isPrefixLocale(locale)) return {};
  const quiz = getQuizBySlug(slug);
  if (!quiz) {
    return { title: 'Quiz Not Found | K-Pulse' };
  }
  return getQuizMetadata(quiz, locale);
}

export default async function LocaleQuizPage({ params }: LocaleQuizPageProps) {
  const { locale, slug } = await params;
  if (!isPrefixLocale(locale)) {
    notFound();
  }
  const quiz = getQuizBySlug(slug);
  if (!quiz) {
    notFound();
  }
  return <QuizPageView quiz={quiz} locale={locale} />;
}
