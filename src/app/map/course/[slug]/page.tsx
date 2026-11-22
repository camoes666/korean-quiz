import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MapCoursePageView from '@/components/pages/MapCoursePageView';
import { MAP_COURSES, getCourseBySlug, getCourseSpots } from '@/data/mapCourses';
import { getMapCourseMetadata } from '@/lib/pageSeo';

interface MapCoursePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return MAP_COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: MapCoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return getMapCourseMetadata(course, getCourseSpots(course), 'en');
}

export default async function MapCoursePage({ params }: MapCoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) {
    notFound();
  }
  return <MapCoursePageView locale="en" slug={slug} />;
}
