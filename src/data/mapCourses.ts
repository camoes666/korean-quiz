import type { MapCourse, MapSpot } from '../types/map';
import { calculateDistanceKm, getSpotById } from '../lib/mapGeo';

export const MAP_COURSES: MapCourse[] = [
  {
    id: 'bts-seoul-heritage',
    slug: 'bts-seoul-heritage-day',
    groupId: 'bts',
    region: 'seoul',
    durationHours: 6,
    transitMode: 'walk-subway',
    color: '#7c3aed',
    title: {
      en: 'BTS Seoul Classic Half-to-Full Day Route',
      ko: 'BTS 서울 하이브 · 유정식당 · 경복궁 데이 코스',
      es: 'Ruta BTS por Seúl: HYBE, Yoojung y Gyeongbokgung',
      pt: 'Roteiro BTS em Seul: HYBE, Yoojung e Gyeongbokgung',
    },
    subtitle: {
      en: '4 iconic Seoul ARMY stops from Yongsan to Gangnam barbecue & Gyeongbokgung',
      ko: '용산 하이브 사옥에서 학동역 연습생 맛집·약수·경복궁 근정전까지 잇는 정석 코스',
      es: '4 paradas ARMY imperdibles en Seúl desde Yongsan hasta el Palacio Gyeongbokgung',
      pt: '4 paradas ARMY imperdíveis em Seul de Yongsan até o Palácio Gyeongbokgung',
    },
    description: {
      en: 'Follow BTS from their global HYBE headquarters in Yongsan to their pre-debut diner Yoojung Sikdang in Nonhyeon, the famous Gold Pig BBQ in Yaksu, and the majestic Geunjeongjeon courtyard at Gyeongbokgung Palace where they filmed their iconic IDOL performance.',
      ko: '방탄소년단의 현재와 과거, 그리고 전 세계를 감동시킨 무대 배경을 하루에 돌아보는 서울 아미(ARMY) 성지순례 대표 동선입니다. 용산·강남·종로를 지하철로 막힘없이 연결합니다.',
      es: 'Recorre la historia de BTS en Seúl: desde su sede actual en HYBE Yongsan y su comedor de época trainee Yoojung Sikdang hasta Geumwaeji BBQ y el Palacio Gyeongbokgung del escenario de IDOL.',
      pt: 'Siga a trajetória do BTS por Seul: da sede da HYBE em Yongsan ao restaurante da época de trainee Yoojung Sikdang, Gold Pig BBQ e o Palácio Gyeongbokgung da performance de IDOL.',
    },
    spotIds: [
      'bts-hybe-hq',
      'bts-yoojung-sikdang',
      'bts-geumdwaeji-sikdang',
      'bts-gyeongbokgung',
    ],
    highlights: [
      {
        en: 'Photo walk around Sinyongsan ARMY birthday cafe alley right behind HYBE',
        ko: '하이브 사옥 & 신용산역 아미 생일 카페 거리 산책',
        es: 'Paseo por los cafés temáticos detrás de HYBE en Sinyongsan',
        pt: 'Passeio pelos cafés temáticos atrás da HYBE em Sinyongsan',
      },
      {
        en: 'Black pork bibimbap lunch at Yoojung Sikdang, BTS trainee-era diner',
        ko: '신인 시절 추억이 담긴 유정식당 흑돼지 돌솥비빔밥 식사',
        es: 'Almuerzo de bibimbap en Yoojung Sikdang, el clásico de sus días de trainee',
        pt: 'Almoço em Yoojung Sikdang, clássico dos tempos de trainee',
      },
      {
        en: 'Golden-hour Hanbok & heritage photos at Gyeongbokgung Geunjeongjeon',
        ko: '해 질 녘 경복궁 근정전("IDOL" 무대 배경) 인증샷 코스',
        es: 'Fotos al atardecer frente a Geunjeongjeon en el Palacio Gyeongbokgung',
        pt: 'Fotos ao entardecer em Geunjeongjeon no Palácio Gyeongbokgung',
      },
    ],
  },
  {
    id: 'bts-busan-ocean',
    slug: 'bts-busan-jimin-jungkook-tour',
    groupId: 'bts',
    region: 'busan',
    durationHours: 6.5,
    transitMode: 'subway-taxi',
    color: '#0284c7',
    title: {
      en: 'Busan Jimin & Jungkook Ocean Route',
      ko: '부산 지민 · 정국 바다 성지투어 (감천·다대포·오륙도)',
      es: 'Tour por Busan de Jimin y Jungkook: Gamcheon y Costas',
      pt: 'Roteiro Busan de Jimin e Jungkook: Gamcheon e Praias',
    },
    subtitle: {
      en: '3 coastal landmarks across Busan from colorful murals to sunset mudflats',
      ko: '감천문화마을 벽화부터 다대포 노을·오륙도 스카이워크까지 이어지는 부산 투어',
      es: '3 puntos costeros en Busan entre murales de fans, atardecer y acantilados',
      pt: '3 cenários costeiros em Busan entre murais, pôr do sol e passarelas no mar',
    },
    description: {
      en: 'Discover Busan through Jimin and Jungkook’s eyes. Start at the giant Gamcheon Culture Village mural overlooking the colorful hillside houses, head south to Dadaepo Beach for calm seaside boardwalks, and finish on the glass ledge at Oryukdo Skywalk.',
      ko: '부산 출신 멤버 지민과 정국의 발자취가 담긴 부산 대표 성지 3곳을 하루 코스로 묶었습니다. 낮에는 감천문화마을 벽화와 오륙도 절경을, 저녁에는 다대포 해변의 노을을 추천합니다.',
      es: 'Descubre la ciudad natal de Jimin y Jungkook combinando los murales gigantes de Gamcheon Culture Village, las olas de Oryukdo Skywalk y el atardecer en la playa Dadaepo.',
      pt: 'Conheça a cidade natal de Jimin e Jungkook combinando os murais gigantes de Gamcheon Culture Village, o penhasco de Oryukdo Skywalk e o pôr do sol na praia Dadaepo.',
    },
    spotIds: ['bts-gamcheon-mural', 'bts-busan-oryukdo', 'bts-busan-dadaepo'],
    highlights: [
      {
        en: 'Iconic Gamcheon Culture Village giant Jimin & Jungkook mural panorama',
        ko: '감천문화마을 지민·정국 대형 벽화 및 파노라마 포토 스팟',
        es: 'Mural panorámico de Jimin y Jungkook en Gamcheon Culture Village',
        pt: 'Mural panorâmico de Jimin e Jungkook na Vila Cultural de Gamcheon',
      },
      {
        en: 'Glass ocean walk at Oryukdo Skywalk featured in Jimin’s hometown vlog',
        ko: '지민 브이로그에 등장한 오륙도 스카이워크 유리 전망대',
        es: 'Mirador de cristal en Oryukdo Skywalk visto en vlogs de Jimin',
        pt: 'Passarela de vidro no Oryukdo Skywalk dos vlogs de Jimin',
      },
      {
        en: 'Dadaepo Beach sunset boardwalk & Dream Sunset Fountain',
        ko: '부산 다대포 해수욕장 모래사장 & 낙조 분수 산책',
        es: 'Pasarela al atardecer en la playa de Dadaepo',
        pt: 'Passarela do pôr do sol na praia de Dadaepo',
      },
    ],
  },
  {
    id: 'bts-daegu-walk',
    slug: 'bts-daegu-v-suga-walk',
    groupId: 'bts',
    region: 'daegu',
    durationHours: 3.5,
    transitMode: 'walk-subway',
    color: '#9333ea',
    title: {
      en: 'Daegu V & SUGA Hometown Walk',
      ko: '대구 뷔(V) 벽화거리 & 슈가 달성공원 산책 코스',
      es: 'Paseo por Daegu: Mural de V y Parque Dalseong de SUGA',
      pt: 'Caminhada em Daegu: Mural do V e Parque Dalseong do SUGA',
    },
    subtitle: {
      en: 'An easy KTX day trip linking Daegu’s V mural street and Dalseong Park',
      ko: 'KTX 당일치기로 가볍게 걸을 수 있는 대구 뷔·슈가 고향 성지 2곳 연결 동선',
      es: 'Excursión fácil en KTX por Daegu conectando el mural de V y Dalseong Park',
      pt: 'Bate-volta fácil de KTX por Daegu ligando o mural do V e o Dalseong Park',
    },
    description: {
      en: 'Just 1.5 km apart in Jung-gu and Seo-gu, Daegu’s V Panorama Mural Street outside Daeseong Elementary School and historic Dalseong Park—often visited in SUGA’s hometown stories—make an effortless half-day walk via Subway Line 3.',
      ko: '대구 도심에 약 1km 남짓 떨어져 있는 비산동 뷔 벽화거리와 달성공원을 함께 걷는 반나절 도보 코스입니다. 동대구역에서 KTX로 내려 지하철 3호선을 이용하면 쉽게 닿습니다.',
      es: 'Separados por poco más de 1 km en Daegu, el gran mural artístico de V junto a su escuela primaria y el histórico Parque Dalseong vinculado a SUGA forman una ruta perfecta de medio día.',
      pt: 'A apenas cerca de 1 km de distância em Daegu, o mural artístico do V perto de sua escola primária e o histórico Parque Dalseong ligado a SUGA formam um passeio leve de meio dia.',
    },
    spotIds: ['bts-daegu-v-mural', 'bts-daegu-dalseong-park'],
    highlights: [
      {
        en: 'Close-up artwork along Daegu V Mural Street outside Daeseong Elementary',
        ko: '대성초등학교 앞 방탄소년단 뷔 대형 벽화 거리 감상',
        es: 'Galería al aire libre en la calle del mural de V en Daegu',
        pt: 'Galeria a céu aberto na rua do mural do V em Daegu',
      },
      {
        en: 'Century-old earthen fortress loop at Dalseong Park',
        ko: '달성공원 토성 산책로 및 대구 근대 문화 골목 연계',
        es: 'Paseo tranquilo por el Parque Dalseong y sus senderos históricos',
        pt: 'Caminhada tranquila pelo Parque Dalseong',
      },
    ],
  },
  {
    id: 'blackpink-seoul-style',
    slug: 'blackpink-seoul-style-tour',
    groupId: 'blackpink',
    region: 'seoul',
    durationHours: 6,
    transitMode: 'walk-subway',
    color: '#db2777',
    title: {
      en: 'BLACKPINK Hapjeong-to-Cheongdam Style Tour',
      ko: '블랙핑크 합정 YG · 홍대 · 청담 스타일 투어',
      es: 'Tour BLACKPINK en Seúl: Hapjeong, Hongdae y Cheongdam',
      pt: 'Roteiro BLACKPINK em Seul: Hapjeong, Hongdae e Cheongdam',
    },
    subtitle: {
      en: '5 BLINK hotspots blending YG Hapjeong, Hongdae filming sites & Jennie fashion cafes',
      ko: '합정 YG 신사옥과 더세임 카페에서 홍대·압구정 하우스도산·청담까지 이어지는 블링크 코스',
      es: '5 paradas BLINK que combinan YG Hapjeong, Hongdae y los íconos de moda en Gangnam',
      pt: '5 pontos BLINK unindo YG Hapjeong, Hongdae e os ícones de moda em Gangnam',
    },
    description: {
      en: 'Experience both sides of BLACKPINK in Seoul: morning in Mapo visiting YG Entertainment’s sleek glass headquarters, official fan cafe the SameE, and Hongdae’s BLACKPINK House neighborhood, then cross the Han River to HAUS DOSAN and Downtowner Cheongdam.',
      ko: '오전에는 마포 합정동 YG 사옥·더세임 카페와 홍대 블핑하우스 거리를 구경하고, 오후에는 강남 압구정 로데오의 하우스 도산과 다운타우너 청담으로 넘어가는 서울 대표 블링크 투어입니다.',
      es: 'Vive las dos caras de BLACKPINK en Seúl: mañana en Hapjeong (YG HQ, café the SameE y Hongdae) y tarde fashion en Apgujeong HAUS DOSAN y Downtowner Cheongdam.',
      pt: 'Curta os dois lados do BLACKPINK em Seul: manhã em Hapjeong (sede da YG, café the SameE e Hongdae) e tarde fashion em HAUS DOSAN e Downtowner Cheongdam.',
    },
    spotIds: [
      'bp-yg-hq',
      'bp-the-samee',
      'bp-hongdae-house',
      'bp-haus-dosan',
      'bp-downtowner-cheongdam',
    ],
    highlights: [
      {
        en: 'Explore YG official merch & cafe seating looking straight across at YG HQ',
        ko: 'YG 신사옥 정면을 바라보는 더세임 카페 & MD 샵 관람',
        es: 'Café the SameE con vista directa al edificio futurista de YG',
        pt: 'Café the SameE com vista direta para o edifício futurista da YG',
      },
      {
        en: 'Visit Gentle Monster x Tamburins flagship HAUS DOSAN in Apgujeong Rodeo',
        ko: '제니 캠페인으로 유명한 압구정 하우스 도산 & 누데이크 디저트',
        es: 'Explora HAUS DOSAN y Nudake, íconos vinculados a Jennie en Gangnam',
        pt: 'Explore a HAUS DOSAN e Nudake em Apgujeong Rodeo',
      },
    ],
  },
  {
    id: 'stray-kids-seoul-stay',
    slug: 'stray-kids-seoul-stay-tour',
    groupId: 'stray-kids',
    region: 'seoul',
    durationHours: 6.5,
    transitMode: 'walk-subway',
    color: '#dc2626',
    title: {
      en: 'Stray Kids JYP, Foodie & Han River STAY Route',
      ko: '스트레이 키즈 JYP · 올림픽공원 · 광장시장 · 노들섬 코스',
      es: 'Ruta STAY de Stray Kids: JYP, Mercado Gwangjang e Isla Nodeul',
      pt: 'Roteiro STAY do Stray Kids: JYP, Mercado Gwangjang e Ilha Nodeul',
    },
    subtitle: {
      en: '5 Seoul spots linking JYP Center, Lone Tree picnic park, street food & Han River sunset',
      ko: '성내동 JYP 사옥과 나홀로나무 산책 후 광장시장·명동·노들섬 한강 야경까지 완주하는 STAY 루트',
      es: '5 lugares en Seúl desde JYP Center y Olympic Park hasta el mercado y el río Han',
      pt: '5 paradas em Seul de JYP e Olympic Park até comidas de rua e o pôr do sol no rio Han',
    },
    description: {
      en: 'Designed for STAYs visiting Seoul: start opposite Olympic Park at JYP Entertainment Center, snap photos by the Olympic Park Lone Tree, ride Subway Line 5/2 straight into Gwangjang Market and Myeongdong Kyoja for iconic meals, and end at Nodeul Island at sunset.',
      ko: '강동구 성내동 JYP 신사옥과 바로 길 건너 올림픽공원 나홀로나무로 시작해, 도심의 광장시장·명동교자에서 먹방 코스를 즐기고 노들섬 한강 일몰로 마무리하는 알찬 하루 동선입니다.',
      es: 'Empieza frente a JYP Entertainment Center y el árbol solitario del Parque Olímpico, prueba los clásicos de Gwangjang Market y Myeongdong Kyoja, y termina viendo el atardecer en Nodeul Island.',
      pt: 'Comece no JYP Entertainment Center e na árvore solitária do Parque Olímpico, prove os clássicos do Gwangjang Market e Myeongdong Kyoja, e termine vendo o pôr do sol na Ilha Nodeul.',
    },
    spotIds: [
      'skz-jyp-hq',
      'skz-olympic-park-tree',
      'skz-gwangjang-market',
      'skz-myeongdong-kalguksu',
      'skz-nodeul-island',
    ],
    highlights: [
      {
        en: 'Direct Subway Line 5 & 8 access around JYP Center and Olympic Park',
        ko: 'JYP 신사옥 & 올림픽공원 나홀로나무 도보 10분 연계',
        es: 'Conexión a pie entre el edificio de JYP y el Olympic Park',
        pt: 'Caminhada fácil entre a sede da JYP e o Parque Olímpico',
      },
      {
        en: 'Gwangjang Market street food mission + Nodeul Island skyline view',
        ko: '광장시장 길거리 먹방과 노들섬 63빌딩·한강철교 야경 감상',
        es: 'Gastronomía tradicional coreana y vista nocturna del río Han',
        pt: 'Gastronomia tradicional coreana e vista noturna do Rio Han',
      },
    ],
  },
  {
    id: 'seoul-big3-agencies',
    slug: 'seoul-big3-agencies-hanok-tour',
    groupId: 'all',
    region: 'seoul',
    durationHours: 7.5,
    transitMode: 'walk-subway',
    color: '#0f766e',
    title: {
      en: 'Seoul K-Pop Grand Slam: YG · HYBE · Bukchon · JYP',
      ko: '서울 K-Pop 빅3 소속사(YG·HYBE·JYP) & 북촌 종주 코스',
      es: 'Gran Tour K-Pop Seúl: YG, HYBE, Bukchon Hanok y JYP',
      pt: 'Grand Slam K-Pop Seul: YG, HYBE, Bukchon Hanok e JYP',
    },
    subtitle: {
      en: 'Cross Seoul from Mapo to Yongsan, historic Bukchon Hanok & Seongnae-dong in one day',
      ko: '하루 만에 YG(합정)·HYBE(용산)·북촌 한옥마을·JYP(성내) 4대 명소를 한 번에 도는 K-Pop 투어',
      es: 'Cruza Seúl de oeste a este visitando YG, HYBE, las casas tradicionales de Bukchon y JYP',
      pt: 'Atravesse Seul de oeste a leste visitando YG, HYBE, Bukchon Hanok Village e JYP em 1 dia',
    },
    description: {
      en: 'Short on time in Seoul? This west-to-east cross-city itinerary hits all three powerhouse headquarters (YG in Hapjeong, HYBE in Yongsan, JYP near Olympic Park) plus a cultural photostop in Bukchon Hanok Village along the way.',
      ko: '서울 체류 일정이 짧은 해외·국내 팬을 위해 하루 만에 YG·HYBE·JYP 3대 기획사 사옥과 북촌 한옥마을 포토존을 동쪽에서 서쪽(또는 역순)으로 효율적으로 연결한 핵심 1일 투어입니다.',
      es: '¿Tienes pocos días en Seúl? Esta ruta de oeste a este une las tres grandes agencias (YG, HYBE y JYP) junto a una parada tradicional en Bukchon Hanok Village.',
      pt: 'Com pouco tempo em Seul? Este roteiro de oeste a leste liga as três grandes agências (YG, HYBE e JYP) a uma parada cultural em Bukchon Hanok Village.',
    },
    spotIds: ['bp-yg-hq', 'bts-hybe-hq', 'bp-bukchon-hanok', 'skz-jyp-hq'],
    highlights: [
      {
        en: 'Visit all three iconic K-Pop headquarters in one organized transit line',
        ko: 'YG 합정 · 하이브 용산 · JYP 성내 사옥 인증샷 하루 완주',
        es: 'Fotos exteriores frente a las sedes de YG, HYBE y JYP en un solo día',
        pt: 'Fotos em frente às sedes de YG, HYBE e JYP em um único roteiro',
      },
      {
        en: 'Hanbok cultural walk through Bukchon Hanok Village mid-route',
        ko: '일정 중간 종로 북촌 한옥마을 전통 건축 & 한복 체험 연계',
        es: 'Pausa cultural en las calles históricas de Bukchon Hanok Village',
        pt: 'Parada cultural nas ruas históricas de Bukchon Hanok Village',
      },
    ],
  },
];

/**
 * Looks up a curated pilgrimage course by its URL slug.
 */
export function getCourseBySlug(slug: string): MapCourse | undefined {
  return MAP_COURSES.find((course) => course.slug === slug);
}

/**
 * Looks up a curated pilgrimage course by its ID.
 */
export function getCourseById(id: string): MapCourse | undefined {
  return MAP_COURSES.find((course) => course.id === id);
}

/**
 * Resolves ordered MapSpot objects for a course, omitting any missing IDs safely.
 */
export function getCourseSpots(course: MapCourse): MapSpot[] {
  return course.spotIds
    .map((id) => getSpotById(id))
    .filter((spot): spot is MapSpot => Boolean(spot));
}

/**
 * Returns all courses that include the given spot ID.
 */
export function getCoursesContainingSpot(spotId: string): MapCourse[] {
  return MAP_COURSES.filter((course) => course.spotIds.includes(spotId));
}

/**
 * Computes great-circle distances (km) for each consecutive leg between course stops.
 */
export function getCourseLegDistancesKm(course: MapCourse): number[] {
  const spots = getCourseSpots(course);
  const legs: number[] = [];
  for (let i = 0; i < spots.length - 1; i++) {
    legs.push(calculateDistanceKm(spots[i].coordinates, spots[i + 1].coordinates));
  }
  return legs;
}

/**
 * Computes the total straight-line distance (km) across all consecutive stops in a course.
 */
export function getCourseTotalDistanceKm(course: MapCourse): number {
  const sum = getCourseLegDistancesKm(course).reduce((acc, km) => acc + km, 0);
  return Math.round(sum * 10) / 10;
}
