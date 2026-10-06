# K-Pulse 엔지니어링 & 기술 명세서 (Technical Specification)

> **문서 상태**: 살아있는 문서 (Living Document)  
> **최종 업데이트**: 2026-10-06  
> **프로덕션 서비스 URL**: [https://kpulsequiz.com](https://kpulsequiz.com)  
> **깃허브 저장소**: [https://github.com/camoes666/korean-quiz](https://github.com/camoes666/korean-quiz)  
> **배포 플랫폼**: Cloudflare Pages (Git 연동 무중단 자동 배포)

---

## 1. 프로젝트 개요 (Overview)

**K-Pulse**는 글로벌 K-Culture(K-Pop, K-Drama, 한식, 한국 문화) 팬덤을 타깃으로 제작된 **게이미피케이션 기반 고성능 반응형 웹 퀴즈 플랫폼**입니다.
서버 비용 0원(Serverless Static Architecture)을 지향하며, Cloudflare의 글로벌 엣지 CDN을 통해 전 세계(미국, 유럽, 라틴아메리카, 동남아 등)에서 밀리초(ms) 단위의 초고속 로딩 속도를 보장합니다.

### 핵심 시스템 특징
- **완전 정적 빌드(SSG / Static Export)**: Next.js의 `output: 'export'` 설정을 활용하여 완전한 HTML/CSS/JS 번들로 빌드되어 서버 부하 없이 무제한 트래픽을 처리합니다.
- **게이미피케이션 엔진**: 레벨 시스템(Trainee ➔ Debut Stage ➔ Rising Star ➔ Hallyu Icon ➔ Global Legend), 콤보 스트릭, 파워업 3종(50:50, 힌트, 스킵), 동적 타이머, Web Audio API 사운드 효과, 파티클 폭죽(Confetti) 내장.
- **다국어(i18n) 시스템**: 글로벌 타깃을 위해 **영어(en, 기본 fallback 1순위) ➔ 스페인어(es, 2순위) ➔ 한국어(ko, 3순위)** 계층 구조를 구현.
- **최적화된 소셜 메타데이터**: 트위터(X), 페이스북, 디스코드, 카카오톡 등에 최적화된 1200x630 규격의 Open Graph 및 `summary_large_image` 트위터 카드 파이프라인 탑재.

---

## 2. 시스템 아키텍처 및 기술 스택 (Tech Stack)

```
[ Git Push to origin/main ]
           │
           ▼
[ Cloudflare Pages CI/CD Pipeline ]
           │ (Build: npm run build -> out/)
           ▼
[ Cloudflare Global Edge Network (CDN) ] ── (SSL / DNS: kpulsequiz.com)
           │
           ▼
[ Global Users (US, LATAM, KR, EU) ]
```

| 구분 | 사용 기술 / 패키지 | 선정 이유 및 역할 |
|---|---|---|
| **프레임워크** | Next.js 16.3.5 (App Router) | 최신 정적 빌드 최적화 및 메타데이터 동적 생성 지원 |
| **라이브러리** | React 19.2.8 | 최신 React 동시성 및 최적화된 렌더링 파이프라인 |
| **언어** | TypeScript 5 | 엄격한 타입 체킹으로 퀴즈 JSON 스키마 및 런타임 오류 방지 |
| **스타일링** | Tailwind CSS v4, `@tailwindcss/postcss` | 초경량 CSS 유틸리티 및 반응형 모바일 퍼스트 UI 구성 |
| **아이콘** | Lucide React 1.46.0 | 깔끔하고 통일된 SVG 모던 UI 아이콘 |
| **이펙트** | Canvas-Confetti 1.9.4 | 퀴즈 완주 및 고득점 시 파티클 폭죽 시각 효과 |
| **호스팅 & CDN** | Cloudflare Pages | 글로벌 엣지 캐싱, 무료 SSL 자동 관리, 커스텀 도메인 연동 |

---

## 3. 디렉토리 구조 및 핵심 파일 역할 (Directory Structure)

```
c:\Users\USER\code\quiz_site/
├── docs/                             # [Living Docs] 프로젝트 명세 및 마케팅 플레이북
│   ├── TECHNICAL_SPECIFICATION.md    # 엔지니어링 및 개발 가이드 (본 문서)
│   └── MARKETING_PLAYBOOK.md         # 소셜 미디어, 바이럴, 운영 전략 가이드
├── public/                           # 정적 에셋 (CDN 직접 서빙)
│   ├── images/
│   │   ├── og-banner.png             # 1200x630 공식 오픈그래프 배너 (PNG)
│   │   ├── og-banner.jpg             # 1200x630 공식 오픈그래프 배너 (JPG)
│   │   ├── hobi01 ~ 05.png / webp    # 마스코트 '호비(Hobi)' 감정별 표정 이미지
│   │   └── hobby01 ~ 05.png / webp   # 마스코트 고해상도 원본 에셋
│   └── favicon.ico
├── src/
│   ├── app/                          # Next.js App Router 디렉토리
│   │   ├── layout.tsx                # 전역 루트 레이아웃 (OG 메타데이터, 폰트, Provider)
│   │   ├── page.tsx                  # 메인 홈 화면 (퀴즈 목록, 카테고리 필터, 퀘스트/리더보드)
│   │   ├── sitemap.ts                # 검색엔진용 sitemap.xml 자동 생성기 (Next.js MetadataRoute)
│   │   ├── robots.ts                 # 검색엔진 크롤러 지침 robots.txt 생성기
│   │   ├── globals.css               # 전역 Tailwind CSS v4 지시어
│   │   └── quiz/
│   │       └── [slug]/
│   │           └── page.tsx          # 퀴즈 상세 페이지 (SSG 정적 파라미터 생성 & 동적 메타데이터)
│   ├── components/                   # UI 및 기능 컴포넌트
│   │   ├── QuizRunner.tsx            # [핵심] 게임 엔진 (타이머, 파워업, 점수계산, 사운드, 공유)
│   │   ├── Navbar.tsx                # 상단 헤더 네비게이션 및 다국어 언어 변경 드롭다운
│   │   ├── Footer.tsx                # 하단 푸터 (저작권, 브랜드 설명)
│   │   ├── QuizCard.tsx              # 홈 화면 퀴즈 썸네일 카드
│   │   ├── DailyQuestCard.tsx        # 일일 퀘스트 및 스트릭 보상 카드
│   │   ├── LeaderboardCard.tsx       # 글로벌 명예의 전당 / 모의 랭킹 카드
│   │   ├── PlayerLevelCard.tsx       # 유저 현재 레벨 및 누적 XP 바
│   │   ├── ShareButtons.tsx          # X, 페이스북, 카카오톡, 링크 복사 공유 컴포넌트
│   │   ├── AffiliateBox.tsx          # 퀴즈 결과 하단 관련 상품/제휴 마케팅 추천 박스
│   │   └── AdPlaceholder.tsx         # 구글 애드센스 등 광고 배너 사전 배치 슬롯
│   ├── context/                      # 전역 상태 관리 (React Context API)
│   │   ├── GameContext.tsx           # 유저 XP, 레벨(1~5), 일일 퀘스트, 연속 출석일 관리
│   │   └── LanguageContext.tsx       # 언어 상태('en', 'es', 'ko') 및 사전 로더
│   ├── data/
│   │   └── quizzes/                  # 퀴즈 데이터 저장소 (JSON)
│   │       ├── index.ts              # 퀴즈 데이터 로더 & 슬러그 검색 유틸리티 함수
│   │       ├── bts-army-trivia.json  # BTS 아미 퀴즈
│   │       ├── korean-spicy-food.json# 한국 매운맛 음식 챌린지 퀴즈
│   │       ├── korean-culture-iq.json# 한국 문화 IQ 테스트
│   │       ├── kpop-fandom-trivia.json# K-Pop 팬덤 퀴즈
│   │       └── kdrama-trope-trivia.json# K-드라마 클리셰 퀴즈
│   ├── lib/
│   │   └── translations.ts           # UI 다국어 사전 (en, es, ko)
│   └── types/
│       └── quiz.ts                   # 퀴즈, 문제, 옵션, 점수티어 인터페이스 & 언어 유틸
├── next.config.ts                    # Next.js 설정 (`output: 'export'`)
├── package.json                      # 패키지 의존성 및 실행 스크립트
└── tsconfig.json                     # TypeScript 컴파일 설정
```

---

## 4. 핵심 모듈 상세 분석 (Core Module Details)

### 4.1. 게임 엔진: `src/components/QuizRunner.tsx`
`QuizRunner`는 퀴즈의 전 과정을 관장하는 상태 머신(State Machine)입니다.

1. **게임 라이프사이클**:
   - `START` (퀴즈 시작 대기 및 규칙 안내) ➔ `PLAYING` (질문 진행 및 타이머 작동) ➔ `RESULT` (최종 점수, 티어 뱃지, 공유, 오답 복습).
2. **타이머 & 스트릭 배율**:
   - 문제당 15초 제한시간 카운트다운 (시간 초과 시 자동 오답 처리).
   - 연속 정답(Streak) 시 콤보 배율 적용 (`x1` ➔ `x1.2` ➔ `x1.5` ➔ `x2.0`) 및 보너스 점수 가산.
3. **3종 파워업 아이템 (Power-ups)**:
   - **50:50 (하프 찬스)**: 오답 2개를 즉시 비활성화하여 정답 확률 50%로 향상 (게임당 1회).
   - **Hint (힌트)**: 문제 해설의 핵심 키워드를 모달/툴팁으로 미리 엿보기 (게임당 1회).
   - **Skip (스킵)**: 감점 없이 다음 문제로 패스 (게임당 1회).
4. **마스코트 호비(Hobi) 반응 시스템**:
   - 정답/오답/시간임박/완주 상태에 따라 `hobi01.webp` ~ `hobi05.webp` 이미지를 전환하며 실시간 반응 애니메이션 표출.
5. **Web Audio API 내장 효과음 (무외부 의존성)**:
   - 외부 mp3 파일 다운로드 딜레이나 404 위험을 제거하기 위해, 브라우저 표준 `AudioContext`의 오실레이터(Oscillator)를 사용하여 정답 딩동댕(Sine 523Hz ➔ 659Hz) 및 오답 웅(Sawtooth 200Hz ➔ 130Hz) 효과음을 순수 코드로 합성.

### 4.2. 게이미피케이션 상태: `src/context/GameContext.tsx`
유저의 세션 및 로컬 플레이 진행 상태를 브라우저 `localStorage`에 영구 보존합니다.

- **레벨 테이블**:
  - Lv 1: Trainee (0 ~ 99 XP)
  - Lv 2: Debut Stage (100 ~ 249 XP)
  - Lv 3: Rising Star (250 ~ 499 XP)
  - Lv 4: Hallyu Icon (500 ~ 999 XP)
  - Lv 5: Global Legend (1,000+ XP)
- **일일 퀘스트 & Streak**:
  - 하루 1회 퀴즈 완주 시 `completeDailyQuest()` 호출.
  - Streak +1 증가 및 보너스 XP (+100 XP) 지급.
  - Floating XP 애니메이션 팝업 (`+XX XP!`) 표시.

### 4.3. 다국어 로직: `src/types/quiz.ts`의 `getLocalizedText()`
글로벌 트래픽을 고려하여 다국어 폴백(Fallback) 구조가 철저히 설계되어 있습니다.

```typescript
export function getLocalizedText<T extends Record<string, any>>(
  item: T,
  prop: string,
  lang: Language
): string {
  // 1. 요청된 언어 키 (예: propEs, propKo) 존재 시 반환
  const langKey = lang === 'en' ? prop : `${prop}${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  if (item[langKey]) return String(item[langKey]);

  // 2. 한국어 선택 상태라면 한국어 필드 우선 탐색
  if (lang === 'ko' && item[`${prop}Ko`]) return String(item[`${prop}Ko`]);

  // 3. 글로벌 표준 기본값인 영어(base property) 반환
  if (item[prop]) return String(item[prop]);

  // 4. 최후의 수단으로 한국어 필드 fallback
  if (item[`${prop}Ko`]) return String(item[`${prop}Ko`]);

  return '';
}
```

---

## 5. SEO & Open Graph (소셜 공유 메타데이터) 설계

소셜 미디어(X, Reddit, 페이스북, 인스타그램)에서 링크 공유 시 **클릭률(CTR)을 결정짓는 핵심 규격**입니다.

### 5.1. 도메인 및 메타데이터 베이스
`src/app/layout.tsx`에 `metadataBase`가 명시되어 있어 모든 상대 경로(`/images/og-banner.png`)가 배포 환경에서 완전한 절대 URL(`https://kpulsequiz.com/images/og-banner.png`)로 자동 치환됩니다.

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://kpulsequiz.com'),
  title: 'K-Pulse | Gamified K-Culture & Trivia Quiz Hub',
  // ...
  openGraph: {
    images: [{ url: '/images/og-banner.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-banner.png'],
  },
};
```

### 5.2. 개별 퀴즈 정적 메타데이터: `src/app/quiz/[slug]/page.tsx`
각 퀴즈 URL(`https://kpulsequiz.com/quiz/bts-army-trivia`)마다 고유한 Title과 Description이 적용되며, 1200x630 카드 이미지가 표시되도록 설정되어 있습니다.

---

## 6. 신규 퀴즈 추가 가이드 (Step-by-Step Tutorial)

새로운 퀴즈를 시스템에 추가할 때는 다음 3단계만 진행하면 됩니다.

### [Step 1] JSON 데이터 파일 생성
`src/data/quizzes/` 경로에 새로운 JSON 파일(예: `squid-game-trivia.json`)을 생성합니다.

```json
{
  "slug": "squid-game-trivia",
  "title": "Squid Game Season 2 Survival Quiz",
  "titleKo": "오징어 게임 시즌 2 생존 퀴즈",
  "titleEs": "Quiz de Supervivencia de El Juego del Calamar",
  "subtitle": "Can you survive all 6 lethal rounds?",
  "subtitleKo": "당신은 6개의 데스매치에서 살아남을 수 있을까요?",
  "subtitleEs": "¿Podrás sobrevivir a las 6 rondas letales?",
  "description": "Test your knowledge on Korean traditional games and iconic Squid Game lore!",
  "descriptionKo": "오징어 게임과 한국 전통 골목 놀이에 대한 모든 것을 풀어보세요!",
  "descriptionEs": "¡Demuestra cuánto sabes sobre los juegos tradicionales y la serie!",
  "category": "K-Drama",
  "tag": "Squid Game",
  "coverEmoji": "🦑",
  "gradient": "from-pink-600 via-rose-500 to-emerald-600",
  "difficulty": "Medium",
  "estimatedMinutes": 3,
  "totalPlays": "1.2k",
  "featured": true,
  "questions": [
    {
      "id": 1,
      "level": 1,
      "question": "What is the very first game played in Squid Game Season 1?",
      "questionKo": "오징어 게임 시즌 1에서 펼쳐진 첫 번째 게임은?",
      "questionEs": "¿Cuál es el primer juego en la temporada 1?",
      "options": [
        { "id": "A", "text": "Dalgona Candy", "textKo": "달고나 뽑기", "textEs": "Dalgona Candy" },
        { "id": "B", "text": "Red Light, Green Light", "textKo": "무궁화 꽃이 피었습니다", "textEs": "Luz Roja, Luz Verde" },
        { "id": "C", "text": "Tug of War", "textKo": "줄다리기", "textEs": "Tira y afloja" },
        { "id": "D", "text": "Glass Bridge", "textKo": "징검다리 건너기", "textEs": "Puente de cristal" }
      ],
      "correctAnswer": "B",
      "explanation": "The giant animatronic doll Young-hee hosted 'Red Light, Green Light' (Mugunghwa kkochi pieot seumnida).",
      "explanationKo": "영희 인형이 지휘한 '무궁화 꽃이 피었습니다'가 첫 게임이었습니다.",
      "explanationEs": "La muñeca Young-hee dirigió 'Luz Roja, Luz Verde'.",
      "funFact": "The chant literally translates to 'The Rose of Sharon has bloomed'.",
      "funFactKo": "무궁화는 대한민국의 국화(나라꽃)입니다."
    }
  ],
  "scoreTiers": [
    {
      "minScore": 0,
      "maxScore": 3,
      "title": "Eliminated in Round 1",
      "titleKo": "1라운드 탈락자",
      "badge": "💀",
      "description": "You moved when Young-hee turned around! Try again!",
      "funQuote": "VIPs are not impressed..."
    },
    {
      "minScore": 4,
      "maxScore": 7,
      "title": "Front Man's Favorite",
      "titleKo": "프론트맨의 주목",
      "badge": "🎭",
      "description": "Impressive survival skills! You reached the final glass bridge.",
      "funQuote": "Good instincts!"
    },
    {
      "minScore": 8,
      "maxScore": 10,
      "title": "45.6 Billion Won Winner",
      "titleKo": "456억 원 최종 우승자",
      "badge": "🏆",
      "description": "Flawless victory! You outsmarted all traps.",
      "funQuote": "You conquered the entire game!"
    }
  ]
}
```

### [Step 2] 인덱스 파일에 등록
`src/data/quizzes/index.ts` 파일을 열고 새로 만든 JSON을 import하여 `quizzes` 배열에 추가합니다.

```typescript
import squidGameTrivia from './squid-game-trivia.json';

export const quizzes: Quiz[] = [
  btsArmyTrivia as Quiz,
  koreanSpicyFood as Quiz,
  koreanCultureIq as Quiz,
  kpopFandomTrivia as Quiz,
  kdramaTropeTrivia as Quiz,
  squidGameTrivia as Quiz, // <-- 신규 추가
];
```

### [Step 3] 빌드 및 검증
터미널에서 아래 명령어를 실행하여 타입 에러가 없는지 확인하고 정적 페이지 생성을 검증합니다.
```bash
npm run build
```
빌드 성공 시 `.next` 및 `out/quiz/squid-game-trivia/index.html`이 자동 생성됩니다.

---

## 7. 배포 및 운영 파이프라인 (Build & Deployment)

### 7.1. Cloudflare Pages 연동 구조
본 프로젝트는 GitHub의 `camoes666/korean-quiz` 저장소 `main` 브랜치와 직결되어 있습니다.
- 개발자가 로컬에서 커밋 후 `git push origin main`을 실행하면,
- Cloudflare Pages가 webhook을 수신하여 즉시 컨테이너에서 `npm run build`를 실행합니다.
- 빌드 결과물인 `out/` 정적 디렉토리가 글로벌 200+ 개 엣지 데이터센터로 동기화됩니다 (배포 소요시간: 약 40~60초).

### 7.2. Cloudflare 대시보드 프로젝트 설정 기준
- **Framework Preset**: Next.js (Static HTML Export)
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Node.js Version**: `20.x` 이상
- **Custom Domains**: `kpulsequiz.com`, `www.kpulsequiz.com` (SSL 자동 발급 완료)

### 7.3. 긴급 롤백 및 캐시 삭제
- 빌드 오류 발생 시 Cloudflare Pages 대시보드의 **Deployments** 탭에서 직전 정상 빌드의 **Rollback to this deployment** 버튼을 클릭하면 5초 이내에 직전 버전으로 복구됩니다.
- 변경된 정적 에셋(이미지 등)이 브라우저에 즉시 반영되지 않을 경우 Cloudflare 대시보드 -> Caching -> **Purge Everything**을 실행합니다.

---

## 8. 기술 부채 및 향후 로드맵 (Engineering Roadmap)

1. **실시간 글로벌 리더보드 (Global Real-time Leaderboard)**:
   - 현재: Mock 데이터 기반
   - 계획: Cloudflare Workers + Cloudflare D1 (Serverless SQLite) 또는 Supabase를 연동하여 실제 전 세계 플레이어의 실시간 닉네임과 최고 점수를 집계.
2. **동적 오픈그래프 결과 이미지 생성 (Dynamic OG Social Image Generation)**:
   - 현재: 정적 1200x630 대표 배너 공유
   - 계획: 유저가 획득한 점수(예: "I scored 9/10 on BTS Trivia!")와 호비 캐릭터가 합성된 맞춤형 PNG를 캔버스(Canvas) 기반으로 즉석 생성하여 X에 첨부할 수 있도록 개선.
3. **PWA (Progressive Web App) 오프라인 지원**:
   - `manifest.json` 및 Service Worker를 추가하여 모바일 홈 화면 추가 및 지하철/비행기 오프라인 환경에서도 퀴즈 풀이가 가능하도록 캐싱 구성.
