import type {
  MapCourse,
  MapRegion,
  MapSpot,
  TravelAffiliateOffer,
} from '../types/map';
import type { Language } from './translations';

export const TRAVEL_PARTNER_CONFIG = {
  klookAid: process.env.NEXT_PUBLIC_KLOOK_AID?.trim() || '',
  kkdayCid: process.env.NEXT_PUBLIC_KKDAY_CID?.trim() || '',
  tripAllianceId: process.env.NEXT_PUBLIC_TRIP_ALLIANCE_ID?.trim() || '',
  tripSid: process.env.NEXT_PUBLIC_TRIP_SID?.trim() || '',
} as const;

function getKlookLocalePath(lang: Language): string {
  if (lang === 'ko') return 'ko';
  if (lang === 'es') return 'es-ES';
  if (lang === 'pt') return 'pt-BR';
  return 'en-US';
}

function getKkdayLocalePath(lang: Language): string {
  if (lang === 'ko') return 'ko';
  if (lang === 'es') return 'es';
  if (lang === 'pt') return 'pt';
  return 'en';
}

function getTripHost(lang: Language): string {
  if (lang === 'ko') return 'kr.trip.com';
  if (lang === 'es') return 'es.trip.com';
  if (lang === 'pt') return 'br.trip.com';
  return 'www.trip.com';
}

export function buildKlookUrl(query: string, lang: Language): {
  url: string;
  isPartnerTracked: boolean;
} {
  const params = new URLSearchParams({ query });
  const hasAid = TRAVEL_PARTNER_CONFIG.klookAid.length > 0;
  if (hasAid) {
    params.set('aid', TRAVEL_PARTNER_CONFIG.klookAid);
  }
  return {
    url: `https://www.klook.com/${getKlookLocalePath(lang)}/search/result/?${params.toString()}`,
    isPartnerTracked: hasAid,
  };
}

export function buildKkdayUrl(keyword: string, lang: Language): {
  url: string;
  isPartnerTracked: boolean;
} {
  const params = new URLSearchParams({ keyword });
  const hasCid = TRAVEL_PARTNER_CONFIG.kkdayCid.length > 0;
  if (hasCid) {
    params.set('cid', TRAVEL_PARTNER_CONFIG.kkdayCid);
  }
  return {
    url: `https://www.kkday.com/${getKkdayLocalePath(lang)}/product/productlist?${params.toString()}`,
    isPartnerTracked: hasCid,
  };
}

export function buildTripHotelUrl(keyword: string, lang: Language): {
  url: string;
  isPartnerTracked: boolean;
} {
  const params = new URLSearchParams({ keyword });
  const hasAlliance = TRAVEL_PARTNER_CONFIG.tripAllianceId.length > 0;
  if (hasAlliance) {
    params.set('Allianceid', TRAVEL_PARTNER_CONFIG.tripAllianceId);
  }
  if (TRAVEL_PARTNER_CONFIG.tripSid.length > 0) {
    params.set('SID', TRAVEL_PARTNER_CONFIG.tripSid);
  }
  return {
    url: `https://${getTripHost(lang)}/hotels/list?${params.toString()}`,
    isPartnerTracked: hasAlliance,
  };
}

function isLongDistanceRegion(region: MapRegion): boolean {
  return (
    region === 'busan' ||
    region === 'daegu' ||
    region === 'gangwon' ||
    region === 'other'
  );
}

function getHotelKeywordForRegion(region: MapRegion, fallbackDistrictEn: string): string {
  if (region === 'busan') return 'Busan';
  if (region === 'daegu') return 'Daegu';
  if (region === 'gangwon') return 'Gangneung';
  if (region === 'incheon') return 'Incheon';
  return fallbackDistrictEn || 'Seoul';
}

function buildRailOrEsimOffer(
  region: MapRegion,
  lang: Language,
  idSuffix: string
): TravelAffiliateOffer {
  if (isLongDistanceRegion(region)) {
    const query =
      region === 'gangwon'
        ? 'Korail Pass Gangneung KTX'
        : region === 'busan'
        ? 'Korail Pass Busan KTX'
        : region === 'daegu'
        ? 'Korail Pass Daegu KTX'
        : 'Korail Pass Korea Rail KTX';
    const klook = buildKlookUrl(query, lang);

    return {
      id: `rail-${idSuffix}`,
      provider: 'klook',
      providerName: 'Klook',
      category: 'rail',
      badge: {
        en: 'Fast KTX Rail',
        ko: 'KTX 교통 패스',
        es: 'Tren Rápido KTX',
        pt: 'Trem Rápido KTX',
      },
      title: {
        en: 'KORAIL Pass & Regional KTX Tickets',
        ko: '코레일 패스 & KTX 고속열차 예매',
        es: 'KORAIL Pass y Billetes KTX',
        pt: 'KORAIL Pass e Bilhetes KTX',
      },
      subtitle: {
        en: 'Reach regional K-Pop cities from Seoul in under 2.5 hours.',
        ko: '서울에서 부산·대구·강릉 성지까지 KTX로 빠르게 이동하세요.',
        es: 'Viaja desde Seúl a Busán, Daegu o Gangneung en tren bala KTX.',
        pt: 'Chegue de Seul a Busan, Daegu ou Gangneung de trem-bala KTX.',
      },
      ctaLabel: {
        en: 'Check KTX Pass',
        ko: 'KTX 패스 보기',
        es: 'Ver Pases KTX',
        pt: 'Ver Passes KTX',
      },
      url: klook.url,
      isPartnerTracked: klook.isPartnerTracked,
    };
  }

  const klook = buildKlookUrl('South Korea eSIM T-money AREX', lang);
  return {
    id: `esim-${idSuffix}`,
    provider: 'klook',
    providerName: 'Klook',
    category: 'esim',
    badge: {
      en: 'Seoul Essential',
      ko: '서울 필수템',
      es: 'Esencial Seúl',
      pt: 'Essencial Seul',
    },
    title: {
      en: 'Korea 5G eSIM + T-money / AREX',
      ko: '한국 무제한 5G eSIM + 티머니/공항철도',
      es: 'eSIM 5G Corea + Tarjeta T-money',
      pt: 'eSIM 5G Coreia + Cartão T-money',
    },
    subtitle: {
      en: 'Instant Naver Map data and Seoul subway tap-to-ride pass.',
      ko: '네이버 지도 실시간 길찾기와 서울 지하철 교통카드까지 한 번에.',
      es: 'Datos ilimitados para usar Naver Map y metro sin complicaciones.',
      pt: 'Internet rápida para o Naver Map e metrô de Seul com praticidade.',
    },
    ctaLabel: {
      en: 'View eSIM & Transit',
      ko: 'eSIM·교통카드 보기',
      es: 'Ver eSIM y Metro',
      pt: 'Ver eSIM e Metrô',
    },
    url: klook.url,
    isPartnerTracked: klook.isPartnerTracked,
  };
}

function buildSpotTourOffer(
  spot: MapSpot,
  lang: Language
): TravelAffiliateOffer {
  if (spot.id === 'bts-jumunjin-bus-stop') {
    const kkday = buildKkdayUrl('Gangneung BTS Bus Stop Jumunjin Day Tour', lang);
    return {
      id: `tour-${spot.id}`,
      provider: 'kkday',
      providerName: 'KKday',
      category: 'tour',
      badge: {
        en: 'Best Seller',
        ko: '인기 당일 투어',
        es: 'Tour Más Buscado',
        pt: 'Mais Procurado',
      },
      title: {
        en: 'Gangneung BTS Bus Stop Day Tour',
        ko: '강릉 주문진 BTS 버스정류장 · 도깨비 투어',
        es: 'Tour de 1 Día a la Parada BTS de Gangneung',
        pt: 'Passeio de 1 Dia à Parada BTS em Gangneung',
      },
      subtitle: {
        en: 'Round-trip shuttle from Seoul covering Jumunjin beach & filming spots.',
        ko: '대중교통 이동이 까다로운 주문진 해변·도깨비 촬영지 왕복 일일 투어.',
        es: 'Traslado ida y vuelta desde Seúl sin preocuparte por buses locales.',
        pt: 'Transporte ida e volta saindo de Seul até a praia de Jumunjin.',
      },
      ctaLabel: {
        en: 'Browse Day Tours',
        ko: '강릉 투어 찾기',
        es: 'Ver Tours en KKday',
        pt: 'Ver Tours na KKday',
      },
      url: kkday.url,
      isPartnerTracked: kkday.isPartnerTracked,
    };
  }

  if (spot.region === 'busan') {
    const kkday = buildKkdayUrl('Busan Gamcheon Culture Village One Day Tour', lang);
    return {
      id: `tour-${spot.id}`,
      provider: 'kkday',
      providerName: 'KKday',
      category: 'tour',
      badge: {
        en: 'Coastal Tour',
        ko: '부산 명소 투어',
        es: 'Tour Costero',
        pt: 'Roteiro Costeiro',
      },
      title: {
        en: 'Busan Gamcheon & Coastal Highlights Tour',
        ko: '부산 감천문화마을 · 해안 명소 원데이 투어',
        es: 'Tour por Busan: Gamcheon y Costa Sur',
        pt: 'Tour em Busan: Gamcheon e Litoral',
      },
      subtitle: {
        en: 'Cover hillside murals, skywalks, and seaside photo stops effortlessly.',
        ko: '언덕길과 해안 스팟을 차량·가이드로 편하게 한 번에 둘러보세요.',
        es: 'Conecta los miradores costeros y Gamcheon en una sola jornada.',
        pt: 'Conecte os mirantes costeiros e Gamcheon em um único dia.',
      },
      ctaLabel: {
        en: 'View Busan Tours',
        ko: '부산 투어 보기',
        es: 'Ver Tours Busán',
        pt: 'Ver Tours Busan',
      },
      url: kkday.url,
      isPartnerTracked: kkday.isPartnerTracked,
    };
  }

  if (spot.region === 'daegu' || spot.region === 'other') {
    const keyword =
      spot.region === 'daegu' ? 'Daegu Day Tour' : 'Korea Local Day Tour';
    const kkday = buildKkdayUrl(keyword, lang);
    return {
      id: `tour-${spot.id}`,
      provider: 'kkday',
      providerName: 'KKday',
      category: 'tour',
      badge: {
        en: 'Local Experience',
        ko: '로컬 투어',
        es: 'Experiencia Local',
        pt: 'Experiência Local',
      },
      title: {
        en: 'Regional Korea Day Tours & Transport',
        ko: '지방 도시 일일 투어 · 셔틀 예약',
        es: 'Tours Regionales y Traslados en Corea',
        pt: 'Tours Regionais e Traslados na Coreia',
      },
      subtitle: {
        en: 'Day tours and shuttle passes outside Seoul for smoother travel.',
        ko: '서울 외 지방 성지 방문을 편하게 해주는 당일 투어 상품.',
        es: 'Excursiones organizadas fuera de Seúl sin barreras de idioma.',
        pt: 'Passeios organizados fora de Seul sem complicação no transporte.',
      },
      ctaLabel: {
        en: 'Explore Local Tours',
        ko: '투어 둘러보기',
        es: 'Explorar Tours',
        pt: 'Explorar Tours',
      },
      url: kkday.url,
      isPartnerTracked: kkday.isPartnerTracked,
    };
  }

  const kkday = buildKkdayUrl('Seoul K-Pop Tour Studio Palace Hanbok', lang);
  return {
    id: `tour-${spot.id}`,
    provider: 'kkday',
    providerName: 'KKday',
    category: 'tour',
    badge: {
      en: 'K-Pop Experience',
      ko: 'K-Pop 체험',
      es: 'Experiencia K-Pop',
      pt: 'Experiência K-Pop',
    },
    title: {
      en: 'Seoul K-Pop Filming Tour & Hanbok Pass',
      ko: '서울 K-Pop 성지 투어 & 경복궁 한복 체험',
      es: 'Tour K-Pop en Seúl y Alquiler de Hanbok',
      pt: 'Tour K-Pop em Seul e Aluguel de Hanbok',
    },
    subtitle: {
      en: 'Studio visits, K-Pop dance classes, and palace Hanbok passes.',
      ko: 'K-Pop 댄스 클래스, 방송국 투어, 고궁 한복 패스까지 한눈에.',
      es: 'Tours temáticos K-Pop, clases de baile y pase Hanbok en Seúl.',
      pt: 'Tours temáticos K-Pop, aulas de dança e Hanbok no palácio.',
    },
    ctaLabel: {
      en: 'See Seoul Experiences',
      ko: '서울 투어 보기',
      es: 'Ver Experiencias',
      pt: 'Ver Experiências',
    },
    url: kkday.url,
    isPartnerTracked: kkday.isPartnerTracked,
  };
}

function buildDistrictHotelOffer(
  hotelKeyword: string,
  displayAreaEn: string,
  displayAreaKo: string,
  lang: Language,
  idSuffix: string
): TravelAffiliateOffer {
  const trip = buildTripHotelUrl(hotelKeyword, lang);

  return {
    id: `hotel-${idSuffix}`,
    provider: 'trip',
    providerName: 'Trip.com',
    category: 'hotel',
    badge: {
      en: 'Nearby Stays',
      ko: '주변 숙소 추천',
      es: 'Alojamiento Cercano',
      pt: 'Hotéis Próximos',
    },
    title: {
      en: `Hotels Near ${displayAreaEn}`,
      ko: `${displayAreaKo} 주변 인기 호텔 · 숙소`,
      es: `Hoteles cerca de ${displayAreaEn}`,
      pt: `Hotéis perto de ${displayAreaEn}`,
    },
    subtitle: {
      en: 'Compare subway-connected hotels with instant English/Spanish support.',
      ko: '지하철 역세권 호텔과 최저가 객실을 바로 비교해 보세요.',
      es: 'Compara hoteles bien conectados por metro con precios en tiempo real.',
      pt: 'Compare hotéis perto do metrô com diárias e avaliações atualizadas.',
    },
    ctaLabel: {
      en: 'Compare Stays',
      ko: '주변 숙소 보기',
      es: 'Ver Hoteles',
      pt: 'Ver Hotéis',
    },
    url: trip.url,
    isPartnerTracked: trip.isPartnerTracked,
  };
}

/**
 * Generates 3 high-intent travel affiliate offers tailored to a spot's region and district.
 */
export function getTravelOffersForSpot(
  spot: MapSpot,
  lang: Language
): TravelAffiliateOffer[] {
  const hotelKeyword = getHotelKeywordForRegion(spot.region, spot.district.en);
  return [
    buildRailOrEsimOffer(spot.region, lang, spot.id),
    buildSpotTourOffer(spot, lang),
    buildDistrictHotelOffer(
      hotelKeyword,
      spot.district.en,
      spot.district.ko,
      lang,
      spot.id
    ),
  ];
}

/**
 * Generates 3 high-intent travel affiliate offers tailored to a multi-stop pilgrimage course.
 */
export function getTravelOffersForCourse(
  course: MapCourse,
  lang: Language
): TravelAffiliateOffer[] {
  const areaMap: Record<MapRegion, { en: string; ko: string; keyword: string }> = {
    seoul: { en: 'Seoul City Center', ko: '서울 주요 역세권', keyword: 'Seoul' },
    busan: { en: 'Busan', ko: '부산', keyword: 'Busan' },
    daegu: { en: 'Daegu', ko: '대구', keyword: 'Daegu' },
    gangwon: { en: 'Gangneung', ko: '강릉', keyword: 'Gangneung' },
    gyeonggi: { en: 'Seoul & Gyeonggi', ko: '서울·경기', keyword: 'Seoul' },
    incheon: { en: 'Incheon', ko: '인천', keyword: 'Incheon' },
    other: { en: 'Korea', ko: '한국 주요 도시', keyword: 'Seoul' },
  };
  const area = areaMap[course.region] || areaMap.seoul;

  const tourQuery =
    course.region === 'busan'
      ? 'Busan One Day K-Pop Gamcheon Tour'
      : course.region === 'daegu'
      ? 'Daegu City Tour'
      : 'Seoul K-Pop Tour';
  const kkday = buildKkdayUrl(tourQuery, lang);

  return [
    buildRailOrEsimOffer(course.region, lang, course.id),
    {
      id: `course-tour-${course.id}`,
      provider: 'kkday',
      providerName: 'KKday',
      category: 'tour',
      badge: {
        en: 'Guided Option',
        ko: '일일 투어 옵션',
        es: 'Tour Guiado',
        pt: 'Tour Guiado',
      },
      title: {
        en:
          course.region === 'busan'
            ? 'Busan Guided Sightseeing & Shuttle Pass'
            : course.region === 'daegu'
            ? 'Daegu Half-Day City Shuttle & Experiences'
            : 'Seoul K-Pop Studio, Palace & Walking Tours',
        ko:
          course.region === 'busan'
            ? '부산 원데이 투어 & 시티 셔틀'
            : course.region === 'daegu'
            ? '대구 도심 시티투어 & 로컬 체험'
            : '서울 K-Pop 스튜디오 · 고궁 가이드 투어',
        es:
          course.region === 'busan'
            ? 'Tours Guiados y Traslados en Busán'
            : course.region === 'daegu'
            ? 'Excursiones y Paseos en Daegu'
            : 'Tours K-Pop y Palacio en Seúl',
        pt:
          course.region === 'busan'
            ? 'Passeios Guiados e Traslados em Busan'
            : course.region === 'daegu'
            ? 'Passeios e Roteiros em Daegu'
            : 'Tours K-Pop e Palácios em Seul',
      },
      subtitle: {
        en: 'Pair your self-guided route with curated tickets and group shuttles.',
        ko: '자유 여행 코스에 현지 셔틀·체험 티켓을 더해 더 편하게 완주하세요.',
        es: 'Combina esta ruta autoguiada con entradas rápidas y traslados.',
        pt: 'Combine este roteiro autoguiado com ingressos e traslados locais.',
      },
      ctaLabel: {
        en: 'Browse Tours',
        ko: '투어 찾기',
        es: 'Ver Tours',
        pt: 'Ver Tours',
      },
      url: kkday.url,
      isPartnerTracked: kkday.isPartnerTracked,
    },
    buildDistrictHotelOffer(area.keyword, area.en, area.ko, lang, course.id),
  ];
}
