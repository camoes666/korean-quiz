import { describe, it, expect } from 'vitest';
import { MAP_SPOTS } from '../../data/mapSpots';
import {
  MAP_COURSES,
  getCourseBySlug,
  getCourseLegDistancesKm,
  getCourseSpots,
  getCourseTotalDistanceKm,
} from '../../data/mapCourses';
import {
  calculateDistanceKm,
  getNearbySpots,
  getSpotBySlug,
  getSpotsForMember,
} from '../mapGeo';
import {
  getTravelOffersForCourse,
  getTravelOffersForSpot,
  hasActiveTravelPartner,
} from '../travelAffiliateBuilder';
import {
  generateMapCourseJsonLd,
  generateMapSpotJsonLd,
  getMapCourseMetadata,
  getMapSpotMetadata,
} from '../pageSeo';
import { BASE_URL, SITE_LOCALES } from '../i18nRoutes';

describe('mapCourses dataset integrity', () => {
  it('defines 6 unique curated courses with 4-language copy and valid spot references', () => {
    expect(MAP_COURSES).toHaveLength(6);

    const ids = new Set(MAP_COURSES.map((c) => c.id));
    const slugs = new Set(MAP_COURSES.map((c) => c.slug));
    expect(ids.size).toBe(6);
    expect(slugs.size).toBe(6);

    const spotIds = new Set(MAP_SPOTS.map((s) => s.id));

    for (const course of MAP_COURSES) {
      expect(course.spotIds.length).toBeGreaterThanOrEqual(2);
      expect(course.title.en.trim().length).toBeGreaterThan(0);
      expect(course.title.ko.trim().length).toBeGreaterThan(0);
      expect((course.title.es ?? '').trim().length).toBeGreaterThan(0);
      expect((course.title.pt ?? '').trim().length).toBeGreaterThan(0);
      expect(course.description.en.trim().length).toBeGreaterThan(0);
      expect(course.description.ko.trim().length).toBeGreaterThan(0);
      expect((course.description.es ?? '').trim().length).toBeGreaterThan(0);
      expect((course.description.pt ?? '').trim().length).toBeGreaterThan(0);

      for (const id of course.spotIds) {
        expect(spotIds.has(id)).toBe(true);
      }

      const resolved = getCourseSpots(course);
      expect(resolved).toHaveLength(course.spotIds.length);
      expect(getCourseLegDistancesKm(course)).toHaveLength(course.spotIds.length - 1);
      expect(getCourseTotalDistanceKm(course)).toBeGreaterThan(0);
    }
  });
});

describe('mapGeo distance & matching helpers', () => {
  it('calculates sensible Haversine distances and nearby spots excluding self', () => {
    const hybe = getSpotBySlug('hybe-yongsan-headquarters')!;
    const busan = getSpotBySlug('busan-gamcheon-bts-mural')!;
    expect(hybe).toBeDefined();
    expect(busan).toBeDefined();

    // Seoul to Busan is ~320-335 km straight line
    const seoulToBusanKm = calculateDistanceKm(hybe.coordinates, busan.coordinates);
    expect(seoulToBusanKm).toBeGreaterThan(300);
    expect(seoulToBusanKm).toBeLessThan(360);

    const nearbySeoul = getNearbySpots(hybe);
    expect(nearbySeoul.length).toBeGreaterThanOrEqual(2);
    expect(nearbySeoul.every((n) => n.spot.id !== hybe.id)).toBe(true);
    expect(nearbySeoul[0].distanceKm).toBeLessThanOrEqual(nearbySeoul[1].distanceKm);
  });

  it('finds BTS Jimin spots accurately for chemistry cross-linking', () => {
    const jiminSpots = getSpotsForMember('Jimin', 'bts', 3);
    expect(jiminSpots.length).toBeGreaterThanOrEqual(1);
    expect(jiminSpots.every((s) => s.groupIds.includes('bts'))).toBe(true);
    expect(
      jiminSpots.some((s) => s.memberNames.includes('Jimin'))
    ).toBe(true);
  });
});

describe('travelAffiliateBuilder', () => {
  it('disables affiliate box by default until partner env vars are configured', () => {
    expect(hasActiveTravelPartner()).toBe(false);
    const hybe = getSpotBySlug('hybe-yongsan-headquarters')!;
    const offers = getTravelOffersForSpot(hybe, 'en');
    expect(offers.every((offer) => offer.isPartnerTracked === false)).toBe(true);
  });

  it('generates 3 localized high-intent offers for Seoul (eSIM+Tour+Hotel) and regional Korea spots (Rail+Tour+Hotel)', () => {
    const hybe = getSpotBySlug('hybe-yongsan-headquarters')!;
    const seoulOffers = getTravelOffersForSpot(hybe, 'es');
    expect(seoulOffers).toHaveLength(3);
    expect(seoulOffers.map((o) => o.category)).toEqual(['esim', 'tour', 'hotel']);
    seoulOffers.forEach((offer) => {
      expect(offer.url.startsWith('https://')).toBe(true);
      expect(offer.title.es).toBeTruthy();
      expect(offer.ctaLabel.es).toBeTruthy();
    });
    expect(seoulOffers[2].url).toContain('es.trip.com');

    const jumunjin = getSpotBySlug('jumunjin-bts-bus-stop')!;
    const regionalOffers = getTravelOffersForSpot(jumunjin, 'pt');
    expect(regionalOffers).toHaveLength(3);
    expect(regionalOffers.map((o) => o.category)).toEqual(['rail', 'tour', 'hotel']);
    expect(regionalOffers[0].url).toContain('pt-BR');
    expect(regionalOffers[2].url).toContain('br.trip.com');

    const btsCourse = getCourseBySlug('bts-seoul-heritage-day')!;
    const courseOffers = getTravelOffersForCourse(btsCourse, 'ko');
    expect(courseOffers).toHaveLength(3);
    expect(courseOffers[2].url).toContain('kr.trip.com');
  });
});

describe('map SEO metadata & JSON-LD schemas', () => {
  it('generates valid canonical URLs, noindex robots without hreflang, and GeoCoordinates / TouristTrip schemas across all 4 locales', () => {
    const hybe = getSpotBySlug('hybe-yongsan-headquarters')!;
    const nearby = getNearbySpots(hybe).map((n) => n.spot);
    const course = getCourseBySlug('bts-seoul-heritage-day')!;
    const courseSpots = getCourseSpots(course);

    for (const locale of SITE_LOCALES) {
      const spotMeta = getMapSpotMetadata(hybe, locale);
      const expectedSpotUrl =
        locale === 'en'
          ? `${BASE_URL}/map/${hybe.slug}`
          : `${BASE_URL}/${locale}/map/${hybe.slug}`;
      expect(spotMeta.alternates?.canonical).toBe(expectedSpotUrl);
      expect(spotMeta.alternates?.languages).toBeUndefined();
      expect(spotMeta.robots).toEqual({ index: false, follow: true });

      const spotJsonLd = generateMapSpotJsonLd(hybe, nearby, locale);
      expect(spotJsonLd).toHaveLength(3);
      expect(spotJsonLd[0]).toMatchObject({
        '@type': 'TouristAttraction',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: hybe.coordinates.lat,
          longitude: hybe.coordinates.lng,
        },
      });
      expect(spotJsonLd[2]).toMatchObject({ '@type': 'FAQPage' });

      const courseMeta = getMapCourseMetadata(course, courseSpots, locale);
      const expectedCourseUrl =
        locale === 'en'
          ? `${BASE_URL}/map/course/${course.slug}`
          : `${BASE_URL}/${locale}/map/course/${course.slug}`;
      expect(courseMeta.alternates?.canonical).toBe(expectedCourseUrl);
      expect(courseMeta.alternates?.languages).toBeUndefined();
      expect(courseMeta.robots).toEqual({ index: false, follow: true });

      const courseJsonLd = generateMapCourseJsonLd(course, courseSpots, locale);
      expect(courseJsonLd).toHaveLength(3);
      expect(courseJsonLd[0]).toMatchObject({ '@type': 'TouristTrip' });
    }
  });
});
