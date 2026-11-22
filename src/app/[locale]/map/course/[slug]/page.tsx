import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MapCoursePageView from '@/components/pages/MapCoursePageView';
import { MAP_COURSES, getCourseBySlug, getCourseSpots } from '@/data/mapCourses';
import { PREFIX_LOCALES, isPrefixLocale } from '@/lib/i18nRoutes';
import { getMapCourseMetadata } from '@/lib/pageSeo';

interface LocaleMapCoursePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return PREFIX_LOCALES.flatMap((locale) =>
    MAP_COURSES.map((course) => ({ locale, slug: course.slug }))
  );
}

export async function generateMetadata({
  params,
}: LocaleMapCoursePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isPrefixLocale(locale)) return {};
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return getMapCourseMetadata(course, getCourseSpots(course), locale);
}

export default async function LocaleMapCoursePage({
  params,
}: LocaleMapCoursePageProps) {
  const { locale, slug } = await params;
  if (!isPrefixLocale(locale)) {
    notFound();
  }
  const course = getCourseBySlug(slug);
  if (!course) {
    notFound();
  }
  return <MapCoursePageView locale={locale} slug={slug} />;
}
