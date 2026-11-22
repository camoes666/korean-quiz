# 📌 K-Pulse 핀터레스트(Pinterest) 바이럴 & SEO 문구 모음집 (Copy & Paste Playbook)

> **목적**: 핀터레스트 검색 알고리즘(Visual SEO)과 K-Pop 팬들의 **'보드 저장(Save) 본능'**을 동시에 저격하여, 핀 1개가 수개월 동안 꾸준히 방문자를 데려오도록 설계된 실전 문구집입니다.  
> **최종 업데이트**: 2026-11-22  
> **공식 도메인**: `https://kpulsequiz.com`  
> **자동 생성 핀 시트**: `npm run generate:pins` 실행 시 [`public/images/pinterest/PINS_INDEX.md`](../public/images/pinterest/PINS_INDEX.md), [`pinterest-pins-manifest.csv`](../public/images/pinterest/pinterest-pins-manifest.csv) (191장 전체), 그리고 신규 54장 전용 빠른 업로드 가이드 [`NEW_PINS_GUIDE.md`](../public/images/pinterest/NEW_PINS_GUIDE.md) / [`new-pins-manifest.csv`](../public/images/pinterest/new-pins-manifest.csv)가 자동 생성됩니다.

---

## 🔗 필수 UTM + 정적 다국어 경로 규칙 (Dark Social / Direct 누수 방지)

핀터레스트 인앱 브라우저 클릭이 GA4에서 `Direct`로 섞이지 않고, 핀터레스트 크롤러가 각 언어 메타데이터를 정확히 읽을 수 있도록 **정적 다국어 경로(`/es/...`, `/pt/...`) + UTM 파라미터** 형식을 사용합니다:

```text
# 스페인어(es) / 포르투갈어(pt) 정적 경로
https://kpulsequiz.com/{es|pt}/{경로}?utm_source=pinterest&utm_medium=social&utm_campaign={캠페인}_{언어}&utm_content={콘텐츠}

# 영어(en) 기본 루트 경로
https://kpulsequiz.com/{경로}?utm_source=pinterest&utm_medium=social&utm_campaign={캠페인}_en&utm_content={콘텐츠}
```

- `PINS_INDEX.md`, `pinterest-pins-manifest.csv`, `NEW_PINS_GUIDE.md`, `new-pins-manifest.csv`에는 위 정적 다국어 경로와 UTM이 모두 자동 적용되어 있습니다.

---

## ⚠️ 핀터레스트 바이럴 4대 핵심 법칙 (올리기 전 필독!)

1. **핀터레스트는 SNS가 아니라 '이미지 검색엔진'입니다**:
   - X(트위터)와 달리 핀터레스트에서는 해시태그(`#`)가 거의 작동하지 않습니다.
   - 대신 **[보드 이름] + [핀 제목(Title)] + [핀 설명(Description)] + [이미지 안에 적힌 큰 글씨]**에 사람들이 실제로 검색하는 키워드(`Stray Kids Quiz`, `Which BTS Member Are You`, `K-Drama Aesthetic`)가 자연스럽게 들어가야 노출이 폭발합니다.
2. **퀴즈 1개당 핀 1개만 올리면 절대 안 됩니다 (1 URL = 10 Pins 법칙)**:
   - 예: `Which Stray Kids Member Are You?` 주소(`.../quiz/which-stray-kids-member-are-you`) 하나에 대해 **대표 핀 1개 + 멤버별 결과 카드 8개(Felix, Hyunjin 등) + `/record` 영상 핀 2개 = 최소 11개의 서로 다른 핀**을 올리고 모두 같은 링크를 걸어줍니다.
   - 팬들은 '퀴즈 홍보 배너'는 저장하지 않지만, **자기 최애(Bias)의 성격 분석 도감 카드(`Felix — The Pure Sunshine BbokAri 🐣`)는 자기 보드에 무조건 저장(Save)**합니다.
3. **황금 비율은 2:3 세로형 (1000×1500px 또는 1080×1350px)**:
   - 사이트 내 `[📸 결과 카드 이미지 저장]` 기능으로 나오는 **1080×1350 세로 카드**나 `/record` 모드로 찍은 **9:16 세로 영상**이 핀터레스트 모바일 피드를 꽉 채워 클릭률이 가장 높습니다.
4. **하루에 몰아서 올리지 말고 '매일 3~5개씩' 꾸준히 (Fresh Pins)**:
   - 하루에 30개를 한 번에 올리는 것보다, 매일 3~5개씩 (영문 3개 + 스페인어 1~2개) 나누어 올리는 계정을 핀터레스트 알고리즘이 우대합니다.

---

## 1. 🗂️ 핀터레스트 계정 & 필수 보드(Board) 12개 세팅 문구

핀을 올리기 전에 아래 **보드들을 먼저 생성**하고, 보드 설명(Description)까지 그대로 복사해 붙여넣으세요. 핀터레스트는 **보드의 설명문**을 읽고 내 핀을 누구에게 추천할지 결정합니다. (특히 **보드 11 스페인어 보드, 보드 12 포르투갈어 보드**는 우선 생성 권장!)

### 프로필 기본 세팅
- **Display Name**: `K-Pulse | K-Pop Quizzes, Soulmate Tests & Korean Culture 🐯✨`
- **Bio**:
  ```text
  Discover your K-Pop soulmate, test your fandom lore (BTS, Stray Kids, BLACKPINK), and explore Korean food & K-Drama aesthetics! 100% free interactive quizzes below ⬇️💜
  ```

### 보드 1: Stray Kids (SKZ & STAY)
- **Board Name**: `Stray Kids Quizzes & SKZOO Personality Tests 🐺✨`
- **Board Description**:
  ```text
  Stray Kids quizzes, STAY trivia challenges, and "Which Stray Kids Member Are You?" soulmate & SKZOO personality tests! Find out if you match with Bang Chan, Lee Know, Changbin, Hyunjin, HAN, Felix, Seungmin, or I.N. Aesthetic SKZ bias cards and fun facts for STAYs.
  ```

### 보드 2: BTS (ARMY & BT21)
- **Board Name**: `BTS Quizzes, Soulmate Tests & ARMY Trivia 💜🐨`
- **Board Description**:
  ```text
  Which BTS member is your soulmate? Take free BTS personality quizzes, discover your BT21 twin (KOYA, RJ, SHOOKY, MANG, CHIMMY, TATA, COOKY), and test your ARMY lore from debut to solo eras with RM, Jin, SUGA, J-Hope, Jimin, V, and Jungkook!
  ```

### 보드 3: BLACKPINK (BLINK Aesthetic)
- **Board Name**: `BLACKPINK Personality Tests & BLINK Quizzes 🖤💖`
- **Board Description**:
  ```text
  Which BLACKPINK member are you? Discover if your vibe matches Jisoo, Jennie, Rosé, or Lisa! Free BLACKPINK personality quizzes, BLINK trivia questions, Coachella milestones, and aesthetic K-Pop girl group cards.
  ```

### 보드 4: K-Pop Multistan & Idols
- **Board Name**: `K-Pop Quizzes, Personality Tests & Stan Challenges 🎤✨`
- **Board Description**:
  ```text
  Ultimate K-Pop quizzes, idol soulmate personality tests, and multistan trivia games! Test your K-Pop IQ across BTS, BLACKPINK, Stray Kids, TWICE, NewJeans, EXO, and iconic K-Pop moments.
  ```

### 보드 5: K-Drama & Korean Culture
- **Board Name**: `K-Drama Quizzes, Tropes & Korean Culture Aesthetics 🎬☔`
- **Board Description**:
  ```text
  How well do you know K-Dramas? Fun Korean drama trope quizzes, Squid Game & Crash Landing on You trivia, and Korean culture & dining etiquette tests for K-Drama lovers.
  ```

### 보드 6: Korean Food & Street Snacks
- **Board Name**: `Korean Food Quizzes, Spicy Ramen & Soul Food Tests 🍜🌶️`
- **Board Description**:
  ```text
  Which Korean food matches your soul? Discover your K-Food personality (Tteokbokki, Samgyeopsal, Kimchi Jjigae, Chimaek, Bingsu) and test your Korean spicy food & Buldak ramen tolerance level!
  ```

---

### 보드 7: aespa (MY & Kwangya Aesthetic)
- **Board Name**: `aespa Quizzes, Supernova & MY Personality Tests 💙✨`
- **Board Description**:
  ```text
  Which aespa member are you? Discover your Kwangya avatar, Supernova vibe, and idol soulmate (Karina, Winter, Giselle, Ningning)! Free aesthetic aespa personality tests, Whiplash quizzes, and K-Pop bias cards for MYs.
  ```

### 보드 8: LE SSERAFIM (FEARNOT Aesthetic)
- **Board Name**: `LE SSERAFIM Quizzes, FEARLESS & CRAZY Personality Tests 🔥👑`
- **Board Description**:
  ```text
  Which LE SSERAFIM member are you? Discover your FEARLESS archetype and unnie-maknae chemistry with Chaewon, Sakura, Yunjin, Kazuha, and Eunchae! Free interactive K-Pop quizzes, aesthetic bias cards, and EASY/CRAZY trivia for FEARNOTs.
  ```

### 보드 9: TWICE (ONCE & Lovelys)
- **Board Name**: `TWICE Quizzes & Lovelys Personality Tests 🍭✨`
- **Board Description**:
  ```text
  Which TWICE member are you? Discover your TWICE soulmate and Lovelys character twin among Nayeon, Jeongyeon, Momo, Sana, Jihyo, Mina, Dahyun, Chaeyoung, and Tzuyu! Free interactive ONCE personality quizzes, aesthetic photocards, and K-Saju MBTI compatibility tests.
  ```

### 보드 10: ENHYPEN (ENGENE & Dark Moon)
- **Board Name**: `ENHYPEN Quizzes & Dark Moon Personality Tests 🧛🔥`
- **Board Description**:
  ```text
  Which ENHYPEN member are you? Find your ENGENE soulmate match with Jungwon, Heeseung, Jay, Jake, Sunghoon, Sunoo, and Ni-ki! Free vampire-concept personality quizzes, K-Saju compatibility calculators, and aesthetic K-Pop cards.
  ```

### 보드 11: 스페인어 전용 보드 (ES 주력 성장 채널)
- **Board Name**: `Tests de K-Pop en Español | BTS, BLACKPINK, Stray Kids ✨`
- **Board Description**:
  ```text
  Tests de personalidad K-Pop gratis en español: descubre qué integrante de BTS, BLACKPINK, Stray Kids, TWICE, ENHYPEN, aespa o LE SSERAFIM es tu alma gemela. ¡Guarda tu photocard estética, compárate por WhatsApp con tus amigos y calcula tu compatibilidad K-Saju y MBTI!
  ```

### 보드 12: 포르투갈어 전용 보드 (PT 브라질 타깃)
- **Board Name**: `Testes de K-Pop em Português | BTS, BLACKPINK, TWICE 💜`
- **Board Description**:
  ```text
  Testes de personalidade K-Pop grátis em português para ARMY, BLINK, STAY, ONCE e ENGENE! Descubra qual membro do BTS, BLACKPINK, Stray Kids, TWICE, ENHYPEN, aespa ou LE SSERAFIM é a sua alma gêmea e veja sua química K-Saju e MBTI.
  ```

### 보드 13: K-사주 한국 이름 & 한글 보드 (`korean-name/` 18장 전용)
- **Board Name (ES)**: `Tu Nombre Coreano, Significado Hanja y Cultura Coreana 🇰🇷✨`
- **Board Description (ES)**:
  ```text
  Descubre tu nombre coreano auténtico equilibrado con los Cinco Elementos del K-Saju según tu fecha de nacimiento. Aprende el significado en Hanja, escucha la pronunciación en coreano, explora apellidos de idols K-Pop y descarga tu tarjeta ID 9:16 con sello tradicional.
  ```
- **Board Name (PT)**: `Seu Nome Coreano, Significado Hanja e Cultura Coreana 🇰🇷✨`
- **Board Description (PT)**:
  ```text
  Qual seria seu nome coreano pela data de nascimento? Gere nomes autênticos pelo K-Saju com significado em Hanja, pronúncia em coreano, guia de sobrenomes dos idols e cartão 9:16 com selo tradicional para salvar e compartilhar.
  ```
- **Board Name (EN)**: `Korean Name Generator, Hangul Aesthetic & K-Saju Meanings 🇰🇷✨`
- **Board Description (EN)**:
  ```text
  Discover your real Korean name balanced by Korean Saju Five Elements from your birthday! Authentic Hanja meanings, Korean audio pronunciation guides, famous Korean surnames cheat sheets, and printable 9:16 Hanji seal ID cards.
  ```

### 보드 14: 한국 성지순례 여행 & 코스 보드 (`courses/` 18장 + `spots/` 18장 전용)
- **Board Name (ES)**: `Guía de Viaje a Corea y Mapa K-Pop (Seúl, Busán y Gangneung) 📍🇰🇷`
- **Board Description (ES)**:
  ```text
  Rutas paso a paso e itinerarios K-Pop para viajar a Corea del Sur: HYBE Yongsan, Yoojung Sikdang, parada BTS Jumunjin en Gangneung, Gamcheon en Busán, YG, HAUS DOSAN y JYP con fotos reales, direcciones exactas y enlaces directos a Naver, Kakao y Google Maps.
  ```
- **Board Name (PT)**: `Guia de Viagem para Coreia e Mapa K-Pop (Seul e Busan) 📍🇰🇷`
- **Board Description (PT)**:
  ```text
  Roteiros completos e locais reais de K-Pop na Coreia do Sul: sede da HYBE, Yoojung Sikdang, ponto BTS em Jumunjin, mural em Gamcheon Busan, YG, HAUS DOSAN e JYP com fotos reais, endereços exatos e links para Naver e Google Maps.
  ```
- **Board Name (EN)**: `Korea Travel Guide & K-Pop Pilgrimage Map (Seoul & Busan) 📍🇰🇷`
- **Board Description (EN)**:
  ```text
  Save curated Korea K-Pop travel itineraries and verified spot guides! Step-by-step half-day and full-day routes across Seoul, Busan, Daegu, and Gangneung featuring HYBE, Yoojung Sikdang, Jumunjin Bus Stop, Gamcheon Village, YG, HAUS DOSAN, and JYP with Naver Maps directions.
  ```

---

## 2. 🔮 [성격 테스트] 대표 핀 + 멤버별 도감 핀 문구 (가장 저장이 잘 되는 핵심)

> **활용법**: 각 성격 테스트마다 사이트에서 **멤버별 결과 카드 PNG를 다운로드**하여, 멤버 하나당 핀 1개씩 등록합니다.

---

### 2.1. Stray Kids 소울메이트 테스트 (`which-stray-kids-member-are-you`)
- **연결할 랜딩 URL (영문)**: `https://kpulsequiz.com/quiz/which-stray-kids-member-are-you`
- **연결할 랜딩 URL (스페인어)**: `https://kpulsequiz.com/quiz/which-stray-kids-member-are-you?lang=es`

#### 📌 [대표 핀 1] 전체 테스트 소개용
- **Pin Title**:
  ```text
  Which Stray Kids Member Are You? 🐺✨ Soulmate & SKZOO Personality Quiz
  ```
- **Pin Description**:
  ```text
  Which Stray Kids member matches your soul? Take this 10-question SKZ personality test to discover your Stray Kids archetype, SKZOO twin, and best member chemistry! Are you sunshine Felix, protective captain Bang Chan, artistic Hyunjin, tsundere Lee Know, HAN Quokka, Changbin, Seungmin, or I.N? 100% free interactive quiz for STAYs!
  ```

#### 📌 [멤버 도감 핀 2] Felix 결과 카드 이미지 첨부용
- **Pin Title**:
  ```text
  Stray Kids Soulmate Result: Felix (BbokAri 🐣☀️) | SKZ Personality Test
  ```
- **Pin Description**:
  ```text
  Got Felix on the Stray Kids Soulmate Quiz! "The Pure Sunshine & Gentle Angel" (SKZOO: BbokAri 🐣) with Bang Chan as your best chemistry match. Warm, deeply empathetic, and spreading happiness everywhere! Which Stray Kids member matches your personality? Click to take the 10-question STAY test!
  ```

#### 📌 [멤버 도감 핀 3] Hyunjin 결과 카드 이미지 첨부용
- **Pin Title**:
  ```text
  Stray Kids Soulmate Result: Hyunjin (Jiniret 🥟🎨) | Which SKZ Member Are You?
  ```
- **Pin Description**:
  ```text
  Got Hyunjin on the Stray Kids Personality Quiz! "The Passionate & Dramatic Artist" (SKZOO: Jiniret 🥟) with Bang Chan as your best chemistry match. Expressive, romantic, and full of artistic charisma! Find out which Stray Kids member is your true soulmate at K-Pulse.
  ```

#### 📌 [멤버 도감 핀 4] Bang Chan 결과 카드 이미지 첨부용
- **Pin Title**:
  ```text
  Stray Kids Soulmate Result: Bang Chan (Wolf Chan 🐺🛡️) | SKZ Soulmate Quiz
  ```
- **Pin Description**:
  ```text
  Got Bang Chan on the Stray Kids Soulmate Test! "The Reliable & Protective Captain" (SKZOO: Wolf Chan 🐺) with Felix as your best chemistry match. Night-owl hard worker, warm leader, and everyone's safe harbor. Which SKZ member are you? Take the free quiz now!
  ```

#### 📌 [멤버 도감 핀 5] Lee Know & HAN (Minsung 케미 저격용)
- **Pin Title**:
  ```text
  Stray Kids Soulmate Match: Lee Know 🐰 & HAN 🐿️ Chemistry | SKZ Quiz
  ```
- **Pin Description**:
  ```text
  Are you "The Tsundere Dancing Cat Master" Lee Know (Leebit 🐰) or "The Introverted Sunshine Genius" HAN (HAN Quokka 🐿️)? In our Stray Kids personality test, Lee Know and HAN are each other's #1 best chemistry match! Take the 10-question quiz to see who you get.
  ```

#### 📌 [스페인어 전용 핀 6] LATAM STAY 타깃 (`?lang=es` 링크 연결!)
- **Pin Title**:
  ```text
  ¿Qué Miembro de Stray Kids es tu Alma Gemela? 🐺✨ Test de Personalidad SKZ en Español
  ```
- **Pin Description**:
  ```text
  ¡Descubre con cuál de los 8 integrantes de Stray Kids compartes tu personalidad y quién es tu pareja de química perfecta! ¿Eres Felix, Bang Chan, Hyunjin, Lee Know, HAN, Changbin, Seungmin o I.N? Haz este test interactivo de 10 preguntas 100% en español para STAY.
  ```

---

### 2.2. BTS 소울메이트 테스트 (`which-bts-member-are-you`)
- **연결할 랜딩 URL (영문)**: `https://kpulsequiz.com/quiz/which-bts-member-are-you`
- **연결할 랜딩 URL (스페인어)**: `https://kpulsequiz.com/quiz/which-bts-member-are-you?lang=es`

#### 📌 [대표 핀 1] 전체 테스트 소개용
- **Pin Title**:
  ```text
  Which BTS Member Is Your Soulmate? 💜✨ BTS Personality & BT21 Quiz
  ```
- **Pin Description**:
  ```text
  Which BTS member are you? Take this 10-question BTS soulmate & personality test to discover your Bangtan twin, BT21 character, and ideal member chemistry! Will you match with RM (KOYA), Jin (RJ), SUGA (SHOOKY), J-Hope (MANG), Jimin (CHIMMY), V (TATA), or Jungkook (COOKY)? Play free now!
  ```

#### 📌 [멤버 도감 핀 2] Jungkook 결과 카드 이미지 첨부용
- **Pin Title**:
  ```text
  BTS Soulmate Result: Jungkook (COOKY 🐰💜) | Which BTS Member Are You Quiz
  ```
- **Pin Description**:
  ```text
  Got Jungkook on the BTS Soulmate Quiz! "The Golden Maknae & Limitless Achiever" (BT21: COOKY 🐰) with RM as your best chemistry match. Passionate, action-oriented, and endlessly talented! Curious which BTS member matches your soul? Click to take the 10-question ARMY test!
  ```

#### 📌 [멤버 도감 핀 3] V (Taehyung) & Jimin 결과 카드 이미지 첨부용
- **Pin Title**:
  ```text
  BTS Soulmate Result: V (TATA 🐻🎨) & Jimin (CHIMMY 🐥) | BTS Personality Test
  ```
- **Pin Description**:
  ```text
  Are you a free-spirited romantic artist like V (Kim Taehyung) or an angelic empath like Jimin? Take the viral 10-question BTS Soulmate & Archetype Quiz to get your downloadable Bangtan result card and see your #1 best chemistry member!
  ```

#### 📌 [멤버 도감 핀 4] SUGA (Min Yoongi) 결과 카드 이미지 첨부용
- **Pin Title**:
  ```text
  BTS Soulmate Result: SUGA / Min Yoongi (SHOOKY 🐱🎹) | BTS Soulmate Quiz
  ```
- **Pin Description**:
  ```text
  Got SUGA on the BTS Personality Test! "The Quiet Genius & Warm Realist" — cat energy, deep creative focus, and lowkey affectionate caring soul. Find out which of the 7 BTS members matches your personality in 2 minutes!
  ```

#### 📌 [스페인어 전용 핀 5] LATAM ARMY 타깃 (`?lang=es` 링크 연결!)
- **Pin Title**:
  ```text
  ¿Qué Miembro de BTS es tu Alma Gemela? 💜 Test de Personalidad BTS en Español
  ```
- **Pin Description**:
  ```text
  ¿Con qué integrante de BTS eres más compatible según tu personalidad? Descubre tu arquetipo de Bangtan, tu personaje BT21 y tu química ideal entre RM, Jin, SUGA, J-Hope, Jimin, V y Jungkook con este test gratis de 10 preguntas en español para ARMY.
  ```

---

### 2.3. BLACKPINK 페르소나 테스트 (`which-blackpink-member-are-you`)
- **연결할 랜딩 URL (영문)**: `https://kpulsequiz.com/quiz/which-blackpink-member-are-you`
- **연결할 랜딩 URL (스페인어)**: `https://kpulsequiz.com/quiz/which-blackpink-member-are-you?lang=es`

#### 📌 [대표 핀 1] 전체 테스트 소개용
- **Pin Title**:
  ```text
  Which BLACKPINK Member Are You? 🖤💖 Jisoo, Jennie, Rosé or Lisa Quiz
  ```
- **Pin Description**:
  ```text
  Discover your iconic BLACKPINK persona and style aura! Are you 4D humor queen Jisoo, runway trendsetter Jennie, soulful romantic Rosé, or electrifying dance dynamo Lisa? Take the free 10-question BLACKPINK personality test and get your aesthetic BLINK result card!
  ```

#### 📌 [멤버 도감 핀 2] Jennie & Rosé 결과 카드 이미지 첨부용
- **Pin Title**:
  ```text
  BLACKPINK Personality Result: Iconic Jennie 🥟🖤 & Rosé 🌹 | BLINK Test
  ```
- **Pin Description**:
  ```text
  Got Jennie ("Iconic Trendsetter & Sweet Homebody") with Rosé as my Chaennie best chemistry match! Which BLACKPINK member matches your real-life personality and aesthetic vibe? Click to take the 10-question BLACKPINK test!
  ```

#### 📌 [스페인어 전용 핀 3] LATAM BLINK 타깃 (`?lang=es` 링크 연결!)
- **Pin Title**:
  ```text
  ¿Qué Miembro de BLACKPINK Eres? 🖤💖 Test de Personalidad en Español (Jisoo, Jennie, Rosé, Lisa)
  ```
- **Pin Description**:
  ```text
  ¡Descubre qué integrante de BLACKPINK va con tu personalidad y estilo! ¿Eres Jisoo, Jennie, Rosé o Lisa? Responde 10 preguntas sobre tus gustos y descubre tu aura BLINK y tu dupla ideal en español.
  ```

---

### 2.4. 한국 음식 소울푸드 테스트 (`which-korean-food-are-you`)
- **연결할 랜딩 URL**: `https://kpulsequiz.com/quiz/which-korean-food-are-you`

#### 📌 [대표 핀 1] K-Food 성격 테스트
- **Pin Title**:
  ```text
  Which Korean Food Matches Your Soul? 🍜🌶️ Fun K-Food Personality Quiz
  ```
- **Pin Description**:
  ```text
  What is your Korean soul food archetype? Take this delicious 10-question personality quiz to see if you are Fiery Spicy Tteokbokki, Sizzling K-BBQ Samgyeopsal, Cozy Winter Bungeoppang, Crispy Chimaek, Han River Ramen, or Aesthetic Mango Bingsu! Plus discover your best food pairing match.
  ```

---

## 3. 🧠 [트리비아 퀴즈 & 정적 가이드] 인포그래픽/치트시트 핀 문구

> **활용법**: 트리비아 퀴즈는 **'퀴즈 링크(`/quiz/...`)'**로 올리는 핀과 **'해설 가이드 링크(`/guide/...`)'**로 올리는 핀 2가지를 병행하면 검색 유입이 배가됩니다.

### 3.1. 한국 매운 음식 & 라면 등급 (`korean-spicy-food`)
- **퀴즈 URL**: `https://kpulsequiz.com/quiz/korean-spicy-food`
- **가이드 URL**: `https://kpulsequiz.com/guide/korean-spicy-food`

- **Pin Title**:
  ```text
  Korean Spicy Food & Buldak Ramen Tier List Quiz 🌶️🔥 How Spicy Can You Go?
  ```
- **Pin Description**:
  ```text
  Could you survive real Korean spicy food? From mild Jin Ramen and Shin Ramyun to Buldak 2x Spicy and fiery street Tteokbokki, test your Korean food & spice tolerance IQ with 20 fun trivia questions! Includes Scoville heat facts and Korean street food lore.
  ```

---

### 3.2. K-Drama 클리셰 & 명장면 퀴즈 (`kdrama-trope-trivia`)
- **퀴즈 URL**: `https://kpulsequiz.com/quiz/kdrama-trope-trivia`
- **가이드 URL**: `https://kpulsequiz.com/guide/kdrama-trope-trivia`

- **Pin Title**:
  ```text
  Ultimate K-Drama Quiz: Iconic Tropes, OSTs & Netflix Korean Dramas 🎬☔
  ```
- **Pin Description**:
  ```text
  How many K-Dramas have you actually watched? Test your K-Drama addict IQ on Crash Landing on You, Squid Game, Goblin, Queen of Tears, Twenty-Five Twenty-One, and classic Korean drama cliches (yellow umbrellas, wrist grabs, subway PPL, and chaebol heirs)!
  ```

---

### 3.3. 한국 문화 & 식사 예절 IQ (`korean-culture-iq`)
- **퀴즈 URL**: `https://kpulsequiz.com/quiz/korean-culture-iq`
- **가이드 URL**: `https://kpulsequiz.com/guide/korean-culture-iq`

- **Pin Title**:
  ```text
  Korean Culture & Etiquette Quiz: Would You Survive Dinner in Korea? 🥢🇰🇷
  ```
- **Pin Description**:
  ```text
  Planning a trip to Seoul or learning Korean? Test your knowledge on Korean dining table etiquette, chopsticks taboos, Korean age & honorifics, Nunchi, and traditional customs with our interactive 20-question Korean Culture IQ quiz!
  ```

---

### 3.4. Stray Kids 60문제 트리비아 & 팩트 가이드 (`stray-kids-stay-trivia`)
- **퀴즈 URL**: `https://kpulsequiz.com/quiz/stray-kids-stay-trivia`
- **가이드 URL**: `https://kpulsequiz.com/guide/stray-kids-stay-trivia`

- **Pin Title**:
  ```text
  Hardcore Stray Kids STAY Quiz: 60 Questions Across 3 Levels 🐺🔥
  ```
- **Pin Description**:
  ```text
  Think you know everything about Stray Kids? Test your STAY knowledge across 60 questions covering 3RACHA, SKZOO characters, God's Menu, MANIAC, Billboard #1 records, and inside fandom jokes! Play solo with a 15-second speed timer or send a 1v1 challenge link to your STAY friends.
  ```

---

### 3.5. BTS 35문제 아미 트리비아 (`bts-army-trivia`)
- **퀴즈 URL**: `https://kpulsequiz.com/quiz/bts-army-trivia`
- **가이드 URL**: `https://kpulsequiz.com/guide/bts-army-trivia`

- **Pin Title**:
  ```text
  BTS ARMY Trivia Quiz: 35 Questions From Debut Lore to Billboard Records 💜🏆
  ```
- **Pin Description**:
  ```text
  How well do you really know BTS? Challenge yourself with 35 questions across 3 difficulty levels (Rookie, Fan, Hardcore ARMY). Covers 2013 debut days, HYYH era, Run BTS memes, UN speeches, and historic solo milestones!
  ```

---

### 3.6. BLACKPINK 50문제 블링크 트리비아 (`blackpink-blink-trivia`)
- **퀴즈 URL**: `https://kpulsequiz.com/quiz/blackpink-blink-trivia`
- **가이드 URL**: `https://kpulsequiz.com/guide/blackpink-blink-trivia`

- **Pin Title**:
  ```text
  BLACKPINK Quiz: 50 BLINK Trivia Questions (Debut, Coachella & Solo Hits) 🖤💖
  ```
- **Pin Description**:
  ```text
  Are you a true BLINK? Test your BLACKPINK knowledge across 50 questions covering Whistle, DDU-DU DDU-DU, Born Pink World Tour, Coachella history, pet names, and iconic solo eras (ROSÉ APT., Jennie Mantra, Lisa Rockstar, Jisoo Flower)!
  ```

---

## 4. 🎬 `/record` 모드로 녹화한 '비디오 핀(Video Pin)' 전용 문구

> **활용법**: 사이트의 `https://kpulsequiz.com/record` 페이지에서 3문제 또는 5문제 자동 재생 화면을 녹화한 뒤, **핀터레스트에 동영상으로 업로드**할 때 쓰는 문구입니다. 비디오 핀은 일반 이미지 핀보다 피드에서 시선을 훨씬 강하게 끕니다.

### 4.1. 트리비아 3문제/5문제 스피드 영상 핀
- **Pin Title**:
  ```text
  Can You Get 5/5 Before the 3-Second Timer Runs Out? ⚡👀 K-Pop Speed Quiz
  ```
- **Pin Description**:
  ```text
  Test your K-Pop reflex before the timer hits zero! How many did you get right out of 5? Comment your score below and tap the link to play all 3 difficulty levels and unlock your Global Legend badge at K-Pulse!
  ```

### 4.2. 성격 테스트 자동 시연 영상 핀
- **Pin Title**:
  ```text
  Watch How Accurate This K-Pop Soulmate Test Is 👀🔮 (Link to Play!)
  ```
- **Pin Description**:
  ```text
  Pick what resonates with your heart across 10 aesthetic scenario questions and unlock your K-Pop idol soulmate + downloadable result card! Tap the link to take the full test in English, Spanish, or Korean.
  ```

---

## 5. 📍 [Format E] 한국 K-Pop 성지순례 여행 지도 핀 (`maps/` 폴더 · 12장)

> **왜 여행 버킷리스트 핀이 중요한가?**: 퀴즈 핀보다 **"나중에 한국 여행 가면 가봐야지"** 하고 보드에 **저장(Save)** 되는 비율이 훨씬 높아, 한 번 올리면 수개월~수년 동안 검색 유입을 데려오는 에버그린(Evergreen) 트래픽 엔진 역할을 합니다.

- **생성 파일 위치**: `public/images/pinterest/maps/` (총 12장: `bts`, `blackpink`, `stray-kids`, `kpop-korea` × `es / en / pt`)
- **그룹별 바로가기 URL**:
  - BTS (14곳): `https://kpulsequiz.com/map?group=bts`
  - BLACKPINK (8곳): `https://kpulsequiz.com/map?group=blackpink`
  - Stray Kids (8곳): `https://kpulsequiz.com/map?group=stray-kids`
  - 전체 30곳: `https://kpulsequiz.com/map`
- **필수 UTM 규칙**: 스페인어(`/es/...`)·포르투갈어(`/pt/...`) 정적 경로 + `utm_source=pinterest&utm_medium=social&utm_campaign={map_id}_map_{lang}&utm_content=travel_map`이 포함된 URL을 사용합니다 (`PINS_INDEX.md` 및 `pinterest-pins-manifest.csv`에 자동 반영됨).

---

## 6. ✨ [신규 54장 패키지] K-사주 이름 스튜디오 · 추천 여행 코스 · 스팟 개별 가이드 (`korean-name/`, `courses/`, `spots/`)

> **바로 복사해서 업로드하려면**: `npm run generate:pins` 실행 시 생성되는 [`NEW_PINS_GUIDE.md`](../public/images/pinterest/NEW_PINS_GUIDE.md)와 [`new-pins-manifest.csv`](../public/images/pinterest/new-pins-manifest.csv)에 **신규 54장**의 이미지 경로·보드·제목·설명·정적 다국어 UTM URL이 정리되어 있습니다.

- **Format F — K-사주 한국 이름 스튜디오 (`korean-name/`, 18장)**: 6가지 카드 에디션(Celadon, Seoul Rose, Najeon Dark, 성씨 도감, 오행 가이드, K-드라마) × `ES / EN / PT`
- **Format G — 추천 성지순례 일일 코스 (`courses/`, 18장)**: BTS 서울·부산·대구, BLACKPINK 서울, Stray Kids 서울, BIG3 소속사+북촌 6개 코스 × `ES / EN / PT`
- **Format H — 핵심 스팟 개별 주소 가이드 (`spots/`, 18장)**: HYBE, 유정식당, 주문진 정류장, 감천벽화, 하우스 도산, JYP 6곳 × `ES / EN / PT`
