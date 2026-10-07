# 📚 K-Pulse Quiz Review & Audit Master Catalog

> **목적**: 서비스 중인 모든 퀴즈의 문항, 정답, 해설, 팩트체크 데이터를 개발 코드가 아닌 읽기 쉬운 마크다운 문서로 통합 관리합니다.  
> **생성일자**: 2026-10-07  
> **총 퀴즈 수**: 7개

---

## 📊 전체 퀴즈 현황 요약

| 퀴즈 명 (한국어 / English) | 슬러그 (Slug) | 카테고리 | 문항 수 | 난이도 | 바로가기 |
| :--- | :--- | :--- | :---: | :---: | :---: |
| **블랙핑크 블링크(BLINK) 덕력고사 & 얼티밋 퀴즈**<br>_BLACKPINK Fandom Lore & Ultimate Trivia_ | `blackpink-blink-trivia` | K-Pop | **50문항** | Medium | [검토 문서 보기](./blackpink-blink-trivia.md) |
| **방탄소년단(BTS) 아미 공식 덕력 모의고사**<br>_The Ultimate BTS ARMY Knowledge Test_ | `bts-army-trivia` | K-Pop | **35문항** | Medium | [검토 문서 보기](./bts-army-trivia.md) |
| **K-드라마 명장면 클리셰 & 명대사 마스터 챌린지**<br>_The Iconic K-Drama Tropes & Lore Challenge_ | `kdrama-trope-trivia` | K-Drama | **10문항** | Easy | [검토 문서 보기](./kdrama-trope-trivia.md) |
| **한국 문화 & 일상 예절 상식 IQ 테스트**<br>_The Ultimate Korean Culture & Etiquette IQ Test_ | `korean-culture-iq` | Culture | **10문항** | Medium | [검토 문서 보기](./korean-culture-iq.md) |
| **한국 길거리 음식 & 맵부심 지수 테스트**<br>_Korean Spicy Food & Street Bites IQ Test_ | `korean-spicy-food` | Food | **8문항** | Easy | [검토 문서 보기](./korean-spicy-food.md) |
| **궁극의 K-Pop 팬덤 & 아이돌 역사 상식 퀴즈**<br>_The Ultimate K-Pop Fandom & Lore Trivia_ | `kpop-fandom-trivia` | K-Pop | **10문항** | Medium | [검토 문서 보기](./kpop-fandom-trivia.md) |
| **스트레이 키즈(Stray Kids) 공식 스테이 덕력 모의고사**<br>_The Ultimate Stray Kids (SKZ) STAY Knowledge Challenge_ | `stray-kids-stay-trivia` | K-Pop | **60문항** | Medium | [검토 문서 보기](./stray-kids-stay-trivia.md) |

---

**총 누적 문항 수**: **183문제**

### 💡 검토 및 수정 팁
1. **문항 오류나 번역 개선**: 위 표에서 해당 퀴즈의 문서를 열어 질문, 정답, 해설을 확인합니다.
2. **수정 반영**: `src/data/quizzes/[slug].json` 파일을 직접 수정하거나 프롬프트로 "OO 퀴즈 Q3번 정답 수정해줘"라고 요청하면 즉시 반영됩니다.
3. **최신화 동기화**: `npm run export:quizzes` 명령어로 모든 문서를 최신 JSON 상태로 다시 일괄 갱신할 수 있습니다.
