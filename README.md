# 🐯 K-Pulse | Gamified K-Culture Quiz & Trivia Hub

> **Production**: [https://kpulsequiz.com](https://kpulsequiz.com)  
> **Official X**: [@JIlmong](https://x.com/JIlmong)  
> **Repository**: [camoes666/korean-quiz](https://github.com/camoes666/korean-quiz)

**K-Pulse** is a high-performance, gamified Korean culture & trivia platform built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**, deployed to the global edge via **Cloudflare Pages**.

---

## 📚 Living Documentation (지속 업데이트 문서)

프로젝트의 지속적인 개발과 운영을 위해 아주 상세한 2대 핵심 문서를 `docs/` 디렉토리에 관리하고 있습니다:

1. **[엔지니어링 & 기술 명세서 (Technical Specification)](./docs/TECHNICAL_SPECIFICATION.md)**
   - 전체 시스템 아키텍처 및 디렉토리 구조
   - 핵심 게임 엔진 (`QuizRunner`), 게이미피케이션 상태 (`GameContext`), 다국어 i18n 로직
   - 1200x630 Open Graph / Twitter Card 소셜 메타데이터 파이프라인
   - 신규 퀴즈 및 번역 추가 튜토리얼 (Step-by-Step)
   - Cloudflare Pages 정적 빌드 및 CI/CD 배포 매뉴얼

2. **[마케팅 & 그로스 운영 플레이북 (Marketing & Growth Playbook)](./docs/MARKETING_PLAYBOOK.md)**
   - 브랜드 아이덴티티 및 마스코트 '호비(Hobi)' 5대 감정 표정 활용 가이드
   - X(트위터) 바이럴 운영 매뉴얼: 280자 제한 규칙, 미국/유럽 타깃 골든아워, 브라우저 예약 발행 가이드
   - 실측 유입 데이터 분석 (런칭 첫날 미국 타깃 70%+ 유입 달성)
   - 퀴즈별 즉시 사용 가능한 검증된 영문 트윗 카피 템플릿
   - 레딧(Reddit) 안티스팸 필터 우회 및 카르마 육성(Karma Warming) 프로토콜
   - Cloudflare Web Analytics 핵심 지표 모니터링 및 수익화 로드맵

---

## 🚀 빠른 시작 (Getting Started)

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행 (http://localhost:3000)
npm run dev

# 정적 빌드 검증 (Cloudflare Pages 배포용 out/ 디렉토리 생성)
npm run build
```

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16.3.5 (App Router, Static Export `output: 'export'`)
- **UI & Styling**: React 19.2.8, Tailwind CSS v4, Lucide Icons
- **Effects**: Canvas Confetti, Web Audio API (Native synth sound fx)
- **Deployment**: Cloudflare Pages (Global CDN, Custom Domain SSL)
