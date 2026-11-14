# K-Pop Star Map 로컬 사진 수급 리스트 & 저장 위치 가이드

## 1. 저장 위치 및 파일 규칙

모든 스팟 사진은 정적 에셋 폴더인 **`public/images/map/<spot-id>/`** 아래에 저장합니다.

```text
public/
└── images/
    └── map/
        ├── bts-hybe-hq/
        │   ├── 1.webp   # 사옥 외관
        │   └── 2.webp   # 신용산역 생일 카페 골목
        ├── bts-yoojung-sikdang/
        │   ├── 1.webp   # 식당 외관
        │   ├── 2.webp   # 유정쌈밥 메뉴
        │   └── 3.webp   # 내부 팬 사인/굿즈 벽면
        ...
```

- **권장 포맷 및 크기**: `.webp` (또는 `.jpg`), 가로 `1200px` 내외 (16:9 비율 `1200x675` 권장), 파일당 **150KB 이하**
- **코드 연결**: `src/data/mapSpots.ts`의 각 스팟 객체 `photos` 배열에 `/images/map/<spot-id>/1.webp` 경로를 추가하면 자동으로 캐러셀 + 라이트박스에 노출됩니다.
- **저작권 안전 팁**:
  - 랜드마크·궁궐·해변·공원·사옥 외관은 **Wikimedia Commons (CC BY / CC0)** 또는 **한국관광공사 포토코리아(공공누리)**에서 무료로 안전하게 구할 수 있습니다.
  - 식당 음식·내부 사진은 직접 촬영하거나 팬 제보/사장님 허락 사진, 또는 공식 보도자료를 사용하는 것이 안전합니다.

---

## 2. 전체 24개 스팟별 구할 사진 리스트 & 저장 경로

### 💜 BTS (8곳)

| 스팟 ID | 장소명 | 저장 폴더 (`public/images/map/...`) | 구할 사진 목록 (권장 2~3장) | 추천 수급처 |
|---|---|---|---|---|
| `bts-hybe-hq` | 하이브(HYBE) 용산 사옥 | `bts-hybe-hq/` | `1.webp`: 사옥 전면 외관<br>`2.webp`: 신용산역 2번 출구 생일카페 거리 | Wikimedia Commons / 직접 촬영 |
| `bts-yoojung-sikdang` | 유정식당 (논현동) | `bts-yoojung-sikdang/` | `1.webp`: 식당 간판/외관<br>`2.webp`: 유정쌈밥 한상<br>`3.webp`: 매장 내 아미 포토존 벽면 | 직접 촬영 / 팬 제보 |
| `bts-geumdwaeji-sikdang` | 금돼지식당 (약수역) | `bts-geumdwaeji-sikdang/` | `1.webp`: 흰 타일 외관 & 간판<br>`2.webp`: 본삼겹 굽는 사진 | 직접 촬영 / 팬 제보 |
| `bts-gamcheon-mural` | 부산 감천문화마을 벽화 | `bts-gamcheon-mural/` | `1.webp`: 지민·정국 대형 벽화 정면<br>`2.webp`: 감천문화마을 전경 | Wikimedia Commons / 포토코리아 |
| `bts-daegu-v-mural` | 대구 BTS 뷔 벽화거리 | `bts-daegu-v-mural/` | `1.webp`: 대성초 담장 타일 벽화 전경<br>`2.webp`: 벽화 아트워크 클로즈업 | 포토코리아 / 팬 제보 |
| `bts-ilsan-lake-park` | 일산 호수공원 | `bts-ilsan-lake-park/` | `1.webp`: 호수공원 산책로/자전거길<br>`2.webp`: 호수 야경 또는 노을 | Wikimedia Commons / 포토코리아 |
| `bts-gyeongbokgung` | 경복궁 근정전 | `bts-gyeongbokgung/` | `1.webp`: 근정전 정면 전경<br>`2.webp`: 야간 또는 한복 스냅 구도 | Wikimedia Commons / 포토코리아 |
| `bts-jumunjin-bus-stop` | 강릉 주문진 BTS 버스정류장 | `bts-jumunjin-bus-stop/` | `1.webp`: 바다 배경 버스정류장 정면<br>`2.webp`: 향호해변 모래사장 풍경 | 포토코리아 / Wikimedia Commons |

### 🖤 BLACKPINK (8곳)

| 스팟 ID | 장소명 | 저장 폴더 (`public/images/map/...`) | 구할 사진 목록 (권장 2~3장) | 추천 수급처 |
|---|---|---|---|---|
| `bp-yg-hq` | YG 엔터테인먼트 신사옥 | `bp-yg-hq/` | `1.webp`: 합정동 유리 신사옥 외관<br>`2.webp`: 맞은편에서 본 전체 건물 뷰 | Wikimedia Commons / 직접 촬영 |
| `bp-the-samee` | 더세임 카페 (YG 앞) | `bp-the-samee/` | `1.webp`: 카페 외관<br>`2.webp`: 지하 MD샵(응원봉/앨범 전시) | 직접 촬영 / 팬 제보 |
| `bp-haus-dosan` | 하우스 도산 & 누데이크 | `bp-haus-dosan/` | `1.webp`: 건물 외관<br>`2.webp`: 누데이크 피크 케이크(말차) | 직접 촬영 / 팬 제보 |
| `bp-downtowner-cheongdam` | 다운타우너 청담 | `bp-downtowner-cheongdam/` | `1.webp`: 매장 외관<br>`2.webp`: 아보카도 버거 & 갈릭프라이 | 직접 촬영 / 팬 제보 |
| `bp-sanbon-jisoo` | 산본 로데오거리 & 중앙공원 | `bp-sanbon-jisoo/` | `1.webp`: 산본 중앙공원 전경<br>`2.webp`: 산본 로데오거리 분수대 광장 | Wikimedia Commons / 지자체 |
| `bp-cheongdam-jennie` | 청담동 일대 (모교 인근) | `bp-cheongdam-jennie/` | `1.webp`: 청담동 거리 전경<br>`2.webp`: 인근 청담 명품거리/카페가 | Wikimedia Commons / 직접 촬영 |
| `bp-hongdae-house` | 블핑하우스 촬영지 (홍대) | `bp-hongdae-house/` | `1.webp`: 서교동 골목 전경<br>`2.webp`: 홍대 상상마당/버스킹 거리 | Wikimedia Commons / 포토코리아 |
| `bp-bukchon-hanok` | 북촌 한옥마을 | `bp-bukchon-hanok/` | `1.webp`: 북촌 8경 한옥 골목<br>`2.webp`: 서울 시내가 내려다보이는 언덕 뷰 | Wikimedia Commons / 포토코리아 |

### 🧭 Stray Kids (8곳)

| 스팟 ID | 장소명 | 저장 폴더 (`public/images/map/...`) | 구할 사진 목록 (권장 2~3장) | 추천 수급처 |
|---|---|---|---|---|
| `skz-jyp-hq` | JYP 엔터테인먼트 신사옥 | `skz-jyp-hq/` | `1.webp`: JYP 센터 전면 외관<br>`2.webp`: 건물 측면 JYP 로고 포토존 | Wikimedia Commons / 직접 촬영 |
| `skz-gwangjang-market` | 광장시장 | `skz-gwangjang-market/` | `1.webp`: 시장 먹자골목 전경<br>`2.webp`: 녹두빈대떡 & 마약김밥 | Wikimedia Commons / 포토코리아 |
| `skz-myeongdong-kalguksu` | 명동교자 본점 | `skz-myeongdong-kalguksu/` | `1.webp`: 매장 입구/간판<br>`2.webp`: 칼국수 & 만두 한 그릇 | 직접 촬영 / 팬 제보 |
| `skz-gimpo-laveniche` | 김포 라베니체 수변공원 | `skz-gimpo-laveniche/` | `1.webp`: 수변 상가 낮 풍경<br>`2.webp`: 다리 조명 야경 | 포토코리아 / 지자체 홍보사진 |
| `skz-gwangalli-in` | 부산 광안리 해수욕장 | `skz-gwangalli-in/` | `1.webp`: 백사장과 광안대교 낮 전경<br>`2.webp`: 광안대교 야경 | Wikimedia Commons / 포토코리아 |
| `skz-sopa-school` | 서울공연예술고등학교 | `skz-sopa-school/` | `1.webp`: 학교 정문 간판 외부 전경 (학생 얼굴 노출 금지) | Wikimedia Commons / 직접 촬영 |
| `skz-olympic-park-tree` | 올림픽공원 나홀로나무 | `skz-olympic-park-tree/` | `1.webp`: 나홀로나무 언덕 전경<br>`2.webp`: KSPO DOME 외관 | Wikimedia Commons / 포토코리아 |
| `skz-nodeul-island` | 노들섬 (한강) | `skz-nodeul-island/` | `1.webp`: 노들섬 잔디마당 & 한강뷰<br>`2.webp`: 한강철교 노을 야경 | Wikimedia Commons / 포토코리아 |

---

## 3. 사진 추가 후 `src/data/mapSpots.ts` 연결 예시

파일을 `public/images/map/bts-yoojung-sikdang/1.webp`, `2.webp`로 저장한 뒤, `src/data/mapSpots.ts`에서 해당 스팟 객체에 아래와 같이 추가하면 됩니다.

```ts
photos: [
  {
    url: '/images/map/bts-yoojung-sikdang/1.webp',
    caption: {
      en: 'Yoojung Sikdang Entrance',
      ko: '유정식당 입구 전경',
    },
    credit: 'K-Pulse Team',
    kind: 'exterior',
  },
  {
    url: '/images/map/bts-yoojung-sikdang/2.webp',
    caption: {
      en: 'Signature Yoojung Ssambap',
      ko: '대표 메뉴 유정쌈밥',
    },
    credit: 'K-Pulse Team',
    kind: 'food',
  },
],
```
