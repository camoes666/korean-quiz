import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTriviaQuizBySlug, getTriviaQuizzes } from '@/data/quizzes';
import GuideDetailPageView from '@/components/pages/GuideDetailPageView';
import { PREFIX_LOCALES, isPrefixLocale } from '@/lib/i18nRoutes';
import { getGuideDetailMetadata } from '@/lib/pageSeo';

interface LocaleGuideDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const triviaQuizzes = getTriviaQuizzes();
  return PREFIX_LOCALES.flatMap((locale) =>
    triviaQuizzes.map((quiz) => ({
      locale,
      slug: quiz.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: LocaleGuideDetailProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isPrefixLocale(locale)) return {};
  const quiz = getTriviaQuizBySlug(slug);
  if (!quiz) {
    return { title: 'Guide Not Found | K-Pulse' };
  }
  return getGuideDetailMetadata(quiz, locale);
}

export default async function LocaleGuideDetailPage({
  params,
}: LocaleGuideDetailProps) {
  const { locale, slug } = await params;
  if (!isPrefixLocale(locale)) {
    notFound();
  }
  const quiz = getTriviaQuizBySlug(slug);
  if (!quiz) {
    notFound();
  }
  return <GuideDetailPageView quiz={quiz} locale={locale} />;
}
