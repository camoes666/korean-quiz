import { notFound } from 'next/navigation';
import MapCourseClient from '@/components/map/MapCourseClient';
import {
  MAP_COURSES,
  getCourseBySlug,
  getCourseLegDistancesKm,
  getCourseSpots,
  getCourseTotalDistanceKm,
} from '@/data/mapCourses';
import { generateMapCourseJsonLd } from '@/lib/pageSeo';
import type { SiteLocale } from '@/lib/i18nRoutes';

export default function MapCoursePageView({
  locale,
  slug,
}: {
  locale: SiteLocale;
  slug: string;
}) {
  const course = getCourseBySlug(slug);
  if (!course) {
    notFound();
  }

  const spots = getCourseSpots(course);
  const legDistancesKm = getCourseLegDistancesKm(course);
  const totalDistanceKm = getCourseTotalDistanceKm(course);
  const otherCourses = MAP_COURSES.filter((c) => c.slug !== course.slug).slice(
    0,
    3
  );
  const schemas = generateMapCourseJsonLd(course, spots, locale);

  return (
    <main className="min-h-screen bg-[#FAF8F5] pb-16">
      <link rel="stylesheet" href="/vendor/leaflet.css" />
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <MapCourseClient
        course={course}
        spots={spots}
        legDistancesKm={legDistancesKm}
        totalDistanceKm={totalDistanceKm}
        otherCourses={otherCourses}
      />
    </main>
  );
}
