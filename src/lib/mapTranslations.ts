import { Language } from './translations';
import { SpotCategory } from '../types/map';

export interface MapUIText {
  navLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  allGroups: string;
  allCategories: string;
  categories: Record<SpotCategory, string>;
  searchPlaceholder: string;
  savedOnly: string;
  savedCount: string;
  shareTrip: string;
  tripCopied: string;
  fitAll: string;
  mapView: string;
  listView: string;
  spotsFound: string;
  noSpotsFound: string;
  resetFilters: string;
  verifiedLabel: string;
  sourceLabel: string;
  tipLabel: string;
  openInMaps: string;
  saveSpot: string;
  savedSpot: string;
  relatedQuizCta: string;
  directoryTitle: string;
  directoryDesc: string;
  privacyNotice: string;
  watchVideo: string;
  photosCount: string;
  noPhotosYet: string;
}

export const MAP_TRANSLATIONS: Record<Language, MapUIText> = {
  en: {
    navLabel: 'K-Map',
    badge: 'INTERACTIVE K-POP PILGRIMAGE MAP',
    title: 'K-Pop Star Map: Hometowns, Foodie Spots & Agencies',
    subtitle:
      'Explore verified BTS, BLACKPINK & Stray Kids spots across Korea—with instant Naver, Kakao & Google Maps links.',
    allGroups: 'All Artists',
    allCategories: 'All Types',
    categories: {
      restaurant: 'Foodie & Cafes',
      agency: 'Agencies',
      hometown: 'Hometowns',
      filming: 'MV & Filming',
    },
    searchPlaceholder: 'Search spot, member, or district...',
    savedOnly: 'My Trip',
    savedCount: 'saved',
    shareTrip: 'Share Trip Link',
    tripCopied: 'Trip Link Copied!',
    fitAll: 'Fit All Pins',
    mapView: 'Map View',
    listView: 'List View',
    spotsFound: 'spots',
    noSpotsFound: 'No matching spots found.',
    resetFilters: 'Reset Filters',
    verifiedLabel: 'Verified',
    sourceLabel: 'Source',
    tipLabel: 'Fan Tip',
    openInMaps: 'Open Directions',
    saveSpot: 'Save to My Trip',
    savedSpot: 'Saved in My Trip',
    relatedQuizCta: 'Test your fandom knowledge',
    directoryTitle: 'Verified K-Pop Spots Directory',
    directoryDesc:
      'Browse all curated locations below. Every spot excludes private residences and links directly to Korean navigation apps.',
    privacyNotice:
      'Note: Only publicly disclosed businesses, agencies, filming sites, and official hometown landmarks are listed. Private residences are strictly excluded.',
    watchVideo: 'Official Video',
    photosCount: 'photos',
    noPhotosYet: 'Photos coming soon — use map links below to preview Street View.',
  },
  ko: {
    navLabel: 'K-지도',
    badge: 'K-POP 스타 성지순례 인터랙티브 맵',
    title: 'K-Pop 스타 지도: 고향 · 단골 맛집 · 소속사 사옥',
    subtitle:
      'BTS, 블랙핑크, 스트레이 키즈의 검증된 성지를 지도에서 탐색하고 네이버·카카오·구글 지도로 바로 길찾기하세요.',
    allGroups: '전체 아티스트',
    allCategories: '전체 유형',
    categories: {
      restaurant: '맛집/카페',
      agency: '소속사 사옥',
      hometown: '고향 성지',
      filming: '뮤비/촬영지',
    },
    searchPlaceholder: '장소, 멤버 이름, 지역 검색...',
    savedOnly: '내 코스',
    savedCount: '저장됨',
    shareTrip: '코스 링크 공유',
    tripCopied: '링크 복사 완료!',
    fitAll: '전체 핀 보기',
    mapView: '지도 보기',
    listView: '목록 보기',
    spotsFound: '개 스팟',
    noSpotsFound: '조건에 맞는 장소가 없습니다.',
    resetFilters: '필터 초기화',
    verifiedLabel: '검증됨',
    sourceLabel: '출처',
    tipLabel: '방문 팁',
    openInMaps: '지도 앱으로 길찾기',
    saveSpot: '내 코스에 저장',
    savedSpot: '내 코스에 저장됨',
    relatedQuizCta: '이 그룹 퀴즈 도전하기',
    directoryTitle: '검증된 K-Pop 성지 전체 목록',
    directoryDesc:
      '비공개 사적 거주지는 제외하고, 방송·공식 인터뷰·지자체로 검증된 장소만 엄선했습니다.',
    privacyNotice:
      '안내: 아티스트의 사생활 보호를 위해 현재 거주지 등 사적 공간은 제외되며, 공개된 매장·사옥·촬영지·공식 고향 랜드마크만 제공합니다.',
    watchVideo: '공식 영상',
    photosCount: '장',
    noPhotosYet: '현장 사진 준비 중 — 아래 지도 앱에서 거리뷰를 먼저 확인해보세요.',
  },
  es: {
    navLabel: 'K-Mapa',
    badge: 'MAPA INTERACTIVO K-POP',
    title: 'Mapa de Estrellas K-Pop: Ciudades Natales, Restaurantes y Agencias',
    subtitle:
      'Explora lugares verificados de BTS, BLACKPINK y Stray Kids en Corea con enlaces directos a Naver, Kakao y Google Maps.',
    allGroups: 'Todos',
    allCategories: 'Todas las categorías',
    categories: {
      restaurant: 'Comida y Cafés',
      agency: 'Agencias',
      hometown: 'Ciudad Natal',
      filming: 'MV y Rodaje',
    },
    searchPlaceholder: 'Buscar lugar, miembro o zona...',
    savedOnly: 'Mi Viaje',
    savedCount: 'guardados',
    shareTrip: 'Compartir Ruta',
    tripCopied: '¡Enlace copiado!',
    fitAll: 'Ver Todos',
    mapView: 'Ver Mapa',
    listView: 'Ver Lista',
    spotsFound: 'lugares',
    noSpotsFound: 'No se encontraron lugares.',
    resetFilters: 'Reiniciar Filtros',
    verifiedLabel: 'Verificado',
    sourceLabel: 'Fuente',
    tipLabel: 'Consejo Fan',
    openInMaps: 'Abrir en Mapas',
    saveSpot: 'Guardar en Mi Viaje',
    savedSpot: 'Guardado',
    relatedQuizCta: 'Pon a prueba tu conocimiento',
    directoryTitle: 'Directorio de Lugares K-Pop Verificados',
    directoryDesc:
      'Explora todos los lugares curados sin residencias privadas y con acceso directo a mapas coreanos.',
    privacyNotice:
      'Nota: Se excluyen residencias privadas. Solo se listan negocios públicos, agencias, sets de rodaje y puntos oficiales.',
    watchVideo: 'Video Oficial',
    photosCount: 'fotos',
    noPhotosYet: 'Fotos próximamente — usa los enlaces de mapas para ver Street View.',
  },
  pt: {
    navLabel: 'K-Mapa',
    badge: 'MAPA INTERATIVO K-POP',
    title: 'Mapa K-Pop: Cidades Natais, Restaurantes e Agências',
    subtitle:
      'Explore locais verificados de BTS, BLACKPINK e Stray Kids na Coreia com links diretos para Naver, Kakao e Google Maps.',
    allGroups: 'Todos',
    allCategories: 'Todas',
    categories: {
      restaurant: 'Comida e Cafés',
      agency: 'Agências',
      hometown: 'Cidade Natal',
      filming: 'MV e Gravações',
    },
    searchPlaceholder: 'Buscar local, membro ou bairro...',
    savedOnly: 'Minha Viagem',
    savedCount: 'salvos',
    shareTrip: 'Compartilhar Roteiro',
    tripCopied: 'Link copiado!',
    fitAll: 'Ver Todos',
    mapView: 'Mapa',
    listView: 'Lista',
    spotsFound: 'locais',
    noSpotsFound: 'Nenhum local encontrado.',
    resetFilters: 'Limpar Filtros',
    verifiedLabel: 'Verificado',
    sourceLabel: 'Fonte',
    tipLabel: 'Dica de Fã',
    openInMaps: 'Abrir Direções',
    saveSpot: 'Salvar na Viagem',
    savedSpot: 'Salvo',
    relatedQuizCta: 'Teste seus conhecimentos',
    directoryTitle: 'Diretório de Locais K-Pop Verificados',
    directoryDesc:
      'Locais verificados sem residências privadas e com links para aplicativos de navegação coreanos.',
    privacyNotice:
      'Nota: Residências privadas são estritamente excluídas. Apenas locais públicos e marcos oficiais são listados.',
    watchVideo: 'Vídeo Oficial',
    photosCount: 'fotos',
    noPhotosYet: 'Fotos em breve — use os links de mapa abaixo para ver o Street View.',
  },
  ru: {
    navLabel: 'K-Карта',
    badge: 'ИНТЕРАКТИВНАЯ K-POP КАРТА',
    title: 'Карта K-Pop: родные города, рестораны и агентства',
    subtitle:
      'Исследуйте проверенные места BTS, BLACKPINK и Stray Kids в Корее со ссылками на Naver, Kakao и Google Maps.',
    allGroups: 'Все артисты',
    allCategories: 'Все типы',
    categories: {
      restaurant: 'Еда и кафе',
      agency: 'Агентства',
      hometown: 'Родные места',
      filming: 'Клипы и съёмки',
    },
    searchPlaceholder: 'Поиск места, участника или района...',
    savedOnly: 'Мой маршрут',
    savedCount: 'сохранено',
    shareTrip: 'Поделиться маршрутом',
    tripCopied: 'Ссылка скопирована!',
    fitAll: 'Показать все',
    mapView: 'Карта',
    listView: 'Список',
    spotsFound: 'мест',
    noSpotsFound: 'Места не найдены.',
    resetFilters: 'Сбросить фильтры',
    verifiedLabel: 'Проверено',
    sourceLabel: 'Источник',
    tipLabel: 'Совет фанатам',
    openInMaps: 'Открыть маршрут',
    saveSpot: 'Сохранить',
    savedSpot: 'Сохранено',
    relatedQuizCta: 'Пройти квиз о группе',
    directoryTitle: 'Каталог проверенных K-Pop мест',
    directoryDesc:
      'Все локации проверены, частные адреса исключены, доступны быстрые ссылки на корейские карты.',
    privacyNotice:
      'Примечание: частные жилые адреса строго исключены; указаны только публичные заведения, агентства и официальные точки.',
    watchVideo: 'Офиц. видео',
    photosCount: 'фото',
    noPhotosYet: 'Фото скоро появятся — откройте карты ниже для просмотра улиц.',
  },
  zh: {
    navLabel: 'K-地图',
    badge: 'K-POP 圣地巡礼互动地图',
    title: 'K-Pop 明星地图：故乡地标 · 爱豆同款美食 · 经纪公司',
    subtitle:
      '探索 BTS、BLACKPINK、Stray Kids 在韩国的打卡圣地，一键跳转 Naver、Kakao 与 Google 地图导航。',
    allGroups: '全部艺人',
    allCategories: '全部分类',
    categories: {
      restaurant: '美食/咖啡',
      agency: '经纪公司',
      hometown: '故乡圣地',
      filming: 'MV/拍摄地',
    },
    searchPlaceholder: '搜索地点、成员或地区...',
    savedOnly: '我的行程',
    savedCount: '已收藏',
    shareTrip: '分享行程链接',
    tripCopied: '链接已复制！',
    fitAll: '查看全部',
    mapView: '地图模式',
    listView: '列表模式',
    spotsFound: '个地点',
    noSpotsFound: '未找到符合条件的地点。',
    resetFilters: '重置筛选',
    verifiedLabel: '已核实',
    sourceLabel: '来源',
    tipLabel: '打卡贴士',
    openInMaps: '打开地图导航',
    saveSpot: '收藏到行程',
    savedSpot: '已收藏',
    relatedQuizCta: '挑战该组合趣味问答',
    directoryTitle: '已核实 K-Pop 打卡地点目录',
    directoryDesc: '严格排除私人住宅，仅收录公开营业场所、经纪公司与官方地标。',
    privacyNotice: '提示：为保护艺人隐私，本站严格排除私人住址，仅收录公开场所与官方地标。',
    watchVideo: '官方视频',
    photosCount: '张照片',
    noPhotosYet: '现场照片即将上线 — 可通过下方地图链接查看街景。',
  },
};
