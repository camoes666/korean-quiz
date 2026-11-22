import { notFound } from 'next/navigation';
import MapSpotDetailClient from '@/components/map/MapSpotDetailClient';
import { getCoursesContainingSpot } from '@/data/mapCourses';
import { getNearbySpots, getSpotBySlug } from '@/lib/mapGeo';
import { generateMapSpotJsonLd, getMapSpotFaq } from '@/lib/pageSeo';
import type { SiteLocale } from '@/lib/i18nRoutes';

export default function MapSpotPageView({
  locale,
  slug,
}: {
  locale: SiteLocale;
  slug: string;
}) {
  const spot = getSpotBySlug(slug);
  if (!spot) {
    notFound();
  }

  const nearbySpots = getNearbySpots(spot);
  const nearbySpotList = nearbySpots.map((entry) => entry.spot);
  const courses = getCoursesContainingSpot(spot.id);
  const faqs = getMapSpotFaq(spot, nearbySpotList, locale);
  const schemas = generateMapSpotJsonLd(spot, nearbySpotList, locale);

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
      <MapSpotDetailClient
        spot={spot}
        nearbySpots={nearbySpots}
        courses={courses}
        faqs={faqs}
      />
    </main>
  );
}
