# K-Pop 성지순례 지도 (K-Pop Star Map) 기획 및 기술 명세서

> **문서 상태**: 살아있는 문서 (Living Document)  
> **최종 업데이트**: 2026-11-13  
> **서비스 경로**: `/map` (`https://kpulsequiz.com/map`)  
> **타깃 아티스트 (MVP)**: BTS, BLACKPINK, Stray Kids  

---

## 1. 서비스 개요 및 기획 의도

**K-Pop Star Map (K-Map)**은 글로벌 및 국내 K-POP 팬덤이 아티스트의 **고향 랜드마크, 단골 맛집, 소속사 사옥, 뮤비/자켓 촬영지**를 한눈에 탐색하고 실제 한국 여행 동선(성지순례)으로 활용할 수 있는 인터랙티브 지도 서비스입니다.

### 핵심 전략
1. **기존 K-Pulse 생태계 통합 (`/map`)**:
   - 퀴즈/가이드 유저의 자연 유입 및 지도 내 그룹별 퀴즈(`/quiz/bts-army-trivia`, `/quiz/blackpink-blink-trivia`, `/quiz/stray-kids-stay-trivia`) 역유입.
   - `LanguageContext`의 6개 언어(`en`, `es`, `ko`, `pt`, `ru`, `zh`)를 그대로 계승하여 글로벌 팬덤 접근성 극대화.
2. **하이브리드 지도 아키텍처**:
   - **웹 탐색**: API 키 및 트래픽 과금이 없는 **Leaflet + CartoDB Voyager 타일**을 사용하여 정적 빌드(`output: 'export'`) 환경에서 무료로 글로벌 고속 렌더링.
   - **현장 길찾기**: 한국 내 도보/대중교통 길찾기 정확도를 위해 스팟 상세 패널에 **Naver Map / KakaoMap / Google Maps 3종 원클릭 딥링크** 제공.
3. **신뢰도와 사생활 보호의 균형**:
   - **맛집 · 사옥 · 촬영지**: 방송(`달려라 방탄`, `블핑하우스`, `SKZ-CODE`), 공식 인터뷰, 아티스트 SNS, 지자체 공식 조형물 등 검증된 출처를 기반으로 정확한 좌표/주소 제공.
   - **고향(`hometown`)**: 사적 거주지(현재 자택·아파트 등)는 엄격히 제외하고, 아티스트가 공식 언급한 모교·기념 벽화·가족 운영 공개 매장·지역 대표 성지 등 팬들이 실제 방문 가능한 스팟으로 구체화.

---

## 2. MVP 기능 명세

### 2.1 카테고리 (4종)
| ID | 영문 | 한국어 | 설명 |
|---|---|---|---|
| `restaurant` | Foodie Spots | 맛집/카페 | 아티스트가 방문·인증한 식당 및 카페 (추천 메뉴 포함) |
| `agency` | Agencies | 소속사 사옥 | HYBE, YG, JYP 등 공식 사옥 및 팬 포토존 |
| `hometown` | Hometowns | 고향 성지 | 출신 도시 공식 벽화, 기념 공간, 공개 모교/가족 매장 |
| `filming` | MV & Filming | 촬영지 | 뮤직비디오, 앨범 자켓, 자체 콘텐츠 촬영 장소 |

### 2.2 인터랙션 & UI 구성
- **필터링**: 그룹별(`All`, `BTS`, `BLACKPINK`, `Stray Kids`), 카테고리별(`All` + 4종), 키워드 검색(장소명/멤버명/지역/스토리), 저장한 스팟만 보기(`Saved`).
- **반응형 레이아웃**:
  - **데스크톱**: 좌측 스크롤 가능한 스팟 리스트 + 우측 풀스크린 지도 + 상세 드로어/카드.
  - **모바일**: 상단 필터 칩 + 지도/리스트 뷰 전환 토글 + 선택 시 하단 상세 카드.
- **내 성지순례 리스트 (`My Pilgrimage`)**: `localStorage`에 관심 스팟 저장 및 `?spots=id1,id2` 쿼리 파라미터로 친구와 코스 링크 공유.
- **SEO 정적 디렉토리**: 지도 하단에 검색엔진 크롤링이 가능한 정적 스팟 카드 목록 및 FAQ 섹션 배치.

---

## 3. 데이터 스키마 (`src/types/map.ts`)

```typescript
export type GroupId = 'bts' | 'blackpink' | 'stray-kids';
export type SpotCategory = 'hometown' | 'restaurant' | 'agency' | 'filming';
export type SpotStatus = 'verified' | 'closed' | 'relocated';

export interface MapSpot {
  id: string;
  slug: string;
  groupIds: GroupId[];
  memberNames: string[];
  category: SpotCategory;
  region: 'seoul' | 'busan' | 'daegu' | 'gyeonggi' | 'incheon' | 'gangwon' | 'other';
  name: LocalizedMapText;
  district: LocalizedMapText;
  address: LocalizedMapText;
  story: LocalizedMapText;
  recommendedTip?: LocalizedMapText;
  sourceNote: LocalizedMapText;
  coordinates: { lat: number; lng: number };
  status: SpotStatus;
  lastVerifiedAt: string; // YYYY-MM-DD
  mapQueries: {
    naver: string;
    kakao: string;
    google: string;
  };
}
```

---

## 4. 검증 기준 (Verification)

1. **데이터 무결성 (`Vitest`)**:
   - 모든 스팟의 `id`, `slug` 중복 없음.
   - 모든 좌표가 대한민국 유효 범위(lat `33.0~38.7`, lng `124.5~131.9`) 내 존재.
   - 모든 스팟에 `en`, `ko` 필수 다국어 텍스트 존재.
2. **정적 빌드 (`output: 'export'`)**:
   - `npm run build` 시 Leaflet의 `window` 객체 참조로 인한 SSR 에러가 발생하지 않아야 함 (`next/dynamic` + `ssr: false` 적용).
   - `npm run lint` 및 `npm test` 전체 통과.
