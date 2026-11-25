import type { EditorialArticle } from '../../types/article';

export const LANGUAGE_SAJU_ARTICLES: EditorialArticle[] = [
  {
    slug: 'how-korean-names-work-surnames-hanja-guide',
    locale: 'en',
    title:
      'How Korean Names Actually Work: Family Surnames, Hanja Meanings, Bon-gwan & Romanization',
    subtitle:
      'Why half of South Korea shares five family names, how clan origins distinguish unrelated Kims, what Hanja characters add to two-syllable names, and why Lee is pronounced "Yi".',
    description:
      'Learn how Korean names are structured: surname-first order, bon-gwan clan roots, generational dollimja syllables, Hanja meanings, and Romanization quirks.',
    category: 'Names & Saju',
    tags: ['Korean Names', 'Hanja', 'Korean Language', 'Culture'],
    keywords: [
      'how Korean names work',
      'Korean surnames bon-gwan',
      'Hanja Korean name meaning',
      'Korean name romanization guide',
      'Kim Lee Park surname origin',
    ],
    publishedAt: '2026-09-28',
    updatedAt: '2026-11-16',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '📛',
    accentBg: 'bg-stone-100',
    featured: true,
    keyTakeaways: [
      'Traditional Korean names place the one-syllable family surname first, followed by a two-syllable given name (e.g., Kim Nam-joon: family name Kim, given name Nam-joon).',
      'Just five surnames—Kim (김), Lee (이), Park (박), Choi (최), and Jung (정)—account for slightly over half of South Korea’s population, distinguished historically by clan origin (bon-gwan, 본관).',
      'Most Korean given names use Hanja (Sino-Korean characters) with specific poetic meanings, though pure native Korean names (sun-urimal) without Hanja have grown steadily since the late 20th century.',
      'Real-life passport spellings (Lee, Park, Woo, Jungkook) follow legacy family conventions rather than South Korea’s official 2000 Revised Romanization standard.',
    ],
    intro: [
      'Spend ten minutes reading K-Pop liner notes or K-Drama credits and you quickly notice two patterns: almost everyone seems to be named Kim, Lee, or Park, and English spellings rarely match how the names actually sound out loud. Why is "이" spelled "Lee" in passports yet pronounced like a short "Ee"? Why do two unrelated idols share the same surname and given-name syllable without being cousins?',
      'Korean personal naming blends East Asian classical Chinese character scholarship with strictly Korean clan history and modern phonetics. Understanding those three layers—family clan origin, Hanja meaning, and spoken Hangul—explains almost everything from why Koreans rarely call older acquaintances by their first name alone to why parents consult naming studios before registering a birth.',
      'Here is a clear breakdown of how Korean names are constructed, registered, and pronounced in real life.',
    ],
    sections: [
      {
        id: 'name-order-structure',
        heading: '1. Surname First, Two Syllables Second',
        paragraphs: [
          'In Korean, the family name (성, seong) always comes first and the given name (이름, ireum) comes second, with no middle name. For example, in "박지민" (Park Ji-min), "박" (Park) is the surname and "지민" (Ji-min) is the entire given name—not "first name Ji, middle name Min." Calling someone solely by half of their given name sounds unnatural unless shortened affectionately with a suffix like "-아" or "-이".',
          'Roughly 97% of Korean surnames are a single syllable—such as 김 (Kim), 이 (Lee), 박 (Park), 최 (Choi), 정 (Jung), 강 (Kang), 조 (Cho), or 윤 (Yoon). Two-syllable surnames exist—most famously 남궁 (Namgung), 황보 (Hwangbo), 제갈 (Jegal), and 선우 (Seonu)—but they represent less than 0.1% of the population.',
          'Married Korean women retain their birth surname throughout life. Historically, children inherited their father’s surname automatically, though since 2008 South Korean civil law allows parents to register a child under the mother’s surname if both agree at marriage registration.',
        ],
      },
      {
        id: 'top-surnames-bongwan',
        heading: '2. Why Five Surnames Cover Half of Korea—and How Bon-gwan Works',
        paragraphs: [
          'According to Statistics Korea census figures, the top three surnames alone—Kim (21.5%), Lee (14.7%), and Park (8.4%)—cover roughly 44.6% of all South Koreans. Adding Choi (4.7%) and Jung (4.3%) pushes the top five past 53%. Historically, commoners and formerly enslaved households adopted prestigious royal or aristocratic surnames during the late Joseon period and early modern census reforms, concentrating the surname pool dramatically.',
          'To track actual bloodlines inside such massive surname groups, Koreans rely on bon-gwan (본관)—the ancestral clan seat. Two people named Kim are considered completely unrelated if one belongs to the Gimhae Kim clan (originating in Gimhae, near Busan) and the other belongs to the Gyeongju Kim clan (descended from Silla nobility). Even today, formal introductions among older Koreans sometimes ask "What is your bon-gwan?" right after hearing a shared surname.',
        ],
        table: {
          caption: 'Major Korean Surnames: Hangul, Hanja, Major Clans & Romanization',
          headers: ['Hangul & Common Spelling', 'Hanja', 'Share of Population (Approx.)', 'Major Bon-gwan & Pronunciation Note'],
          rows: [
            ['김 (Kim)', '金', '~21.5%', 'Gimhae, Gyeongju, Andong · Officially "Gim", spelled "Kim" on passports'],
            ['이 (Lee / Yi)', '李', '~14.7%', 'Jeonju, Gyeongju · Initial "R/L" dropped in South Korea (sounds like "Ee")'],
            ['박 (Park / Bak)', '朴', '~8.4%', 'Miryang, Bannam · Silent final "r"; sounds closer to "Bahk"'],
            ['최 (Choi / Choe)', '崔', '~4.7%', 'Gyeongju, Jeonju · Sounds closer to "Chweh", not "Choy"'],
            ['정 (Jung / Jeong)', '鄭 / 丁', '~4.3%', 'Dongnae, Yeonil · Rounded "uh/eo" vowel ("Juhng")'],
            ['강 (Kang / Gang)', '姜 / 康', '~2.4%', 'Jinju · Hard "G/K" sound ("Gahng")'],
            ['윤 (Yoon / Yun)', '尹', '~2.1%', 'Papyeong, Haenam · Long "oo" vowel ("Yoon")'],
          ],
        },
      },
      {
        id: 'hanja-and-dollimja',
        heading: '3. Hanja Meanings, Generational Syllables & Pure Korean Names',
        paragraphs: [
          'The majority of Korean given names pair two Sino-Korean syllables, each tied to a specific Hanja character listed on South Korea’s Supreme Court approved list of over 8,200 naming characters (인명용 한자). Because Hangul is purely phonetic, two people named "Min-jun" (민준) can write their names with entirely different Hanja—one meaning "clever and talented" (敏俊) and another meaning "gentle and honorable" (旼俊).',
          'Older generations frequently practiced dollimja (돌림자), a clan naming custom where every sibling and cousin in the same generation shared one predetermined Hanja syllable—for instance, all brothers carrying "석" (Seok) or "현" (Hyun) alongside a unique personal syllable. Today, many urban parents skip strict clan dollimja in favor of smooth acoustics and positive Hanja pairings, though twin siblings still often share one syllable.',
          'Not every name uses Hanja. Pure Korean names (순우리말 이름, sun-urimal ireum)—written strictly in Hangul with native Korean vocabulary—became widely loved from the 1980s onward. Familiar examples include 하늘 (Ha-neul, "sky"), 슬기 (Seul-gi, "wisdom"), 보라 (Bo-ra, "purple"), 바다 (Ba-da, "ocean"), 여름 (Yeo-reum, "summer"), and 나래 (Na-rae, "wing").',
        ],
        callout: {
          tone: 'note',
          title: 'Why Names Are Almost Always Two Syllables',
          body: 'One-syllable given names like 진 (Jin) or 호 (Ho) exist, and three-syllable given names are legally permitted (capped at five syllables total for new registrations since 1993), yet roughly 95% of Korean given names remain two syllables because they balance rhythm, Hanja meaning pairs, and conversational honorific endings cleanly.',
        },
      },
      {
        id: 'romanization-gap',
        heading: '4. Why Korean Passports Don’t Match Official Romanization',
        paragraphs: [
          'If you study Korean textbooks, you learn the Ministry of Culture’s 2000 Revised Romanization system: 김 is "Gim", 박 is "Bak", 최 is "Choe", and 정 is "Jeong". Yet almost nobody spells their own surname that way on Instagram or international passports.',
          'The gap exists because South Korean passport rules allow citizens to keep traditional family spellings established decades earlier under the older McCune–Reischauer system or English approximations. Switching to "Gim" would separate a traveler’s passport surname from parents and siblings already spelled "Kim", so legacy forms stick.',
          'For given names, parents and artists also adapt spellings for English readability: "서" (officially "Seo") sometimes becomes "Suh"; "우" ("U") becomes "Woo"; "유" ("Yu") becomes "Yoo"; and hyphenation varies freely between "Ji-min", "Jimin", and "Ji Min". When writing someone’s name in English, always follow the personal spelling they use rather than forcing strict dictionary rules.',
        ],
      },
    ],
    companionCta: {
      eyebrow: 'Interactive Naming Studio',
      title: 'Generate Your Balanced Korean Name & Hanja Breakdown',
      description:
        'Test how real Korean surnames and two-syllable Hanja names pair with your birth date’s Five Elements, hear native Korean pronunciation, and view your ID card.',
      href: '/korean-name',
      buttonLabel: 'Open Korean Name Studio',
    },
    relatedQuizSlugs: ['korean-culture-iq'],
    sources: [
      {
        label: 'Statistics Korea — Population and Housing Census',
        detail: 'Official distribution of Korean family surnames and bon-gwan clan counts.',
        url: 'https://kostat.go.kr/ansk/',
      },
      {
        label: 'National Institute of Korean Language (NIKL)',
        detail: 'Official Revised Romanization of Korean rules and personal name guidelines.',
        url: 'https://www.korean.go.kr/front_eng/main.do',
      },
      {
        label: 'Supreme Court of Korea — Electronic Family Relations Registry',
        detail: 'Regulations on permitted Hanja characters for birth registration and given-name syllable limits.',
      },
    ],
  },
  {
    slug: 'korean-saju-five-elements-ohaeng-beginners-guide',
    locale: 'en',
    title:
      'Korean Saju (Four Pillars) & Five Elements (Ohaeng) Explained for Beginners',
    subtitle:
      'How traditional Korean birth charts turn your birthday into Wood, Fire, Earth, Metal, or Water—and why Korean parents still consider Five Elements when choosing baby names.',
    description:
      'Understand Korean Saju Palja (Four Pillars of Destiny), your Day Master element, and how Wood, Fire, Earth, Metal, and Water interact in Korean naming culture.',
    category: 'Names & Saju',
    tags: ['K-Saju', 'Five Elements', 'Korean Culture', 'Naming'],
    keywords: [
      'Korean Saju explained',
      'Four Pillars of Destiny Korea',
      'Ohaeng Five Elements Korea',
      'Saju Korean name meaning',
      'Sangsaeng Sanggeuk elements',
    ],
    publishedAt: '2026-10-11',
    updatedAt: '2026-11-16',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '☯️',
    accentBg: 'bg-amber-50',
    featured: false,
    keyTakeaways: [
      '"Saju Palja" (사주팔자) literally means "Four Pillars, Eight Characters"—two characters each for your birth year, month, day, and hour.',
      'Your core anchor in a Saju chart is the "Day Master" (일간, Ilgan), the Heavenly Stem of your birth day, which maps to one of Five Elements: Wood, Fire, Earth, Metal, or Water.',
      'Rather than declaring any element "good" or "bad," Saju focuses on equilibrium through the Generating cycle (상생, Sangsaeng) and Controlling cycle (상극, Sanggeuk).',
      'In Korean naming traditions (성명학), choosing syllables or Hanja carrying a supporting element helps round out whatever energy a birth chart lacks.',
    ],
    intro: [
      'Walk down almost any busy university street in Seoul—Hongdae, Sinchon, or Konkuk University—and alongside photo booths and waffle stands you will spot cozy booths labeled "사주·타로" (Saju & Tarot). While Western horoscopes divide people into twelve Sun signs by month, traditional Korean fortune reading relies on Saju (사주), an astronomical-philosophical framework rooted in East Asian Yin-Yang and Five Elements theory.',
      'Even among young South Koreans who treat fortune cafes as lighthearted entertainment with friends or partners, Saju concepts quietly appear everywhere in daily life: in wedding compatibility talks (궁합, gunghap), New Year resolutions, and especially baby naming.',
      'You do not need classical Chinese astrology training to grasp the core idea. Once you understand the Four Pillars and how the Five Elements feed and check one another, the entire system becomes surprisingly intuitive.',
    ],
    sections: [
      {
        id: 'what-is-saju-palja',
        heading: '1. What "Four Pillars, Eight Characters" Means',
        paragraphs: [
          'The full Korean term is Saju Palja (사주팔자, 四柱八字). "Saju" means Four Pillars—representing the Year, Month, Day, and Hour of your birth. Each pillar is written with two classical characters: one Heavenly Stem (천간, Cheongan, cycling through ten symbols) on top and one Earthly Branch (지지, Jiji, cycling through the twelve zodiac animals) underneath. Four pillars × two characters equals eight characters ("Palja").',
          'Of those eight characters, the top character of your Day Pillar—called the Day Master (일간, Ilgan)—serves as the anchor representing "you." Every other character in your chart is interpreted by how its element interacts with your Day Master.',
          'Because Earthly Branches cycle through twelve animals (Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Sheep, Monkey, Rooster, Dog, Pig), your Chinese/Korean zodiac animal is actually just the bottom character of your Year Pillar—one-eighth of a complete Saju chart.',
        ],
      },
      {
        id: 'five-elements-ohaeng',
        heading: '2. The Five Elements (오행, Ohaeng): More Than Physical Matter',
        paragraphs: [
          'In Korean philosophy, Ohaeng (오행) does not mean static substances sitting in a beaker; the word literally translates to "Five Movements" or "Five Phases" of energy. Each element carries seasonal rhythms, temperaments, directions, and traditional Hanja radicals.',
        ],
        table: {
          caption: 'The Five Elements (Ohaeng) in Korean Saju & Naming',
          headers: ['Element (Korean / Hanja)', 'Core Energy & Personality Archetype', 'Nurtures (Produces)', 'Balanced By (Nurtured From)'],
          rows: [
            ['Wood (목 · 木)', 'Upward growth, curiosity, empathy, creative vision', 'Fire (wood fuels flame)', 'Water (rain nourishes roots)'],
            ['Fire (화 · 火)', 'Radiance, passion, expressiveness, warmth, charisma', 'Earth (ash enriches soil)', 'Wood (timber sustains fire)'],
            ['Earth (토 · 土)', 'Stability, reliability, practicality, mediating calm', 'Metal (minerals form in rock)', 'Fire (warmth enlivens soil)'],
            ['Metal (금 · 金)', 'Clarity, precision, loyalty, decisive boundaries', 'Water (condensation/streams)', 'Earth (ore is born in earth)'],
            ['Water (수 · 水)', 'Adaptability, wisdom, intuition, quiet depth', 'Wood (water grows forests)', 'Metal (mineral springs feed rivers)'],
          ],
        },
      },
      {
        id: 'sangsaeng-vs-sanggeuk',
        heading: '3. Harmony Cycles: Sangsaeng (Generating) vs. Sanggeuk (Controlling)',
        paragraphs: [
          'A frequent misconception among newcomers is assuming "Fire vs. Water" means automatic conflict or failure. In practice, Saju prizes balance over uniformity. If a chart already overflows with scorching Fire, adding more Fire leads to burnout—whereas a calming touch of Water restores equilibrium.',
          'Elements interact through two primary loops:',
        ],
        bullets: [
          'Sangsaeng (상생 · 相生 — Generating Cycle): Wood feeds Fire → Fire creates Earth (ash) → Earth bears Metal → Metal collects Water → Water nourishes Wood. In compatibility or naming, the element that generates yours is called "Inseong" (인성), representing mentorship, protection, and steady support.',
          'Sanggeuk (상극 · 相克 — Controlling Cycle): Wood parts Earth → Earth dams Water → Water quenches Fire → Fire melts Metal → Metal chops Wood. Far from purely negative, healthy control acts like pruning a tree or forging steel—shaping raw energy into focus and discipline.',
        ],
        callout: {
          tone: 'note',
          title: 'Why Opposite Elements Can Have Strong Chemistry',
          body: 'In Korean gunghap (compatibility) readings, two people with identical elements sometimes clash over the exact same blind spots, whereas two complementary or gently contrasting elements fill what the other lacks—provided communication (often compared alongside MBTI today) remains open.',
        },
      },
      {
        id: 'saju-in-korean-naming',
        heading: '4. How Saju Connects to Traditional Korean Naming',
        paragraphs: [
          'In traditional Korean naming (성명학, Seongmyeonghak), a child’s given name isn’t chosen solely for pretty sound. Naming scholars first map the child’s birth date and hour to spot which of the Five Elements is missing or over-represented in the Four Pillars.',
          'Next, they pair the family surname with Hanja characters linked to the beneficial element (용신, Yongsin)—both by literal character radical (for example, 潤 or 海 containing the three-dot water radical 氵, or 林 and 樹 carrying the wood radical 木) and by traditional Korean phonetic sound-element theory (발음오행), which maps Hangul initial consonants to Wood (ㄱ, ㅋ), Fire (ㄴ, ㄷ, ㄹ, ㅌ), Earth (ㅇ, ㅎ), Metal (ㅅ, ㅈ, ㅊ), and Water (ㅁ, ㅂ, ㅍ).',
          'Whether modern parents follow strict classical rules or treat them as cultural heritage, choosing a name whose meaning and sound balance your natural temperament remains one of Korea’s oldest artistic traditions.',
        ],
      },
      {
        id: 'solar-terms-birth-time',
        heading: '5. Solar Calendar Terms, Birth Hour & Common Saju Myths',
        paragraphs: [
          'One frequent surprise for beginners is that Saju runs primarily on the East Asian solar calendar (24 Solar Terms, 24절기), not the lunar month used for Lunar New Year holidays—and certainly not the simple January 1st Western boundary. In traditional Saju, the Year Pillar actually turns at Ipchun (입춘, the Beginning of Spring around February 4), not January 1. Someone born in mid-January 1995 still carries the previous year’s Dog branch in a formal Saju reading even though modern pop culture calls them a Pig.',
          'Another nuance involves the Hour Pillar (시주, Siju), which splits each day into twelve two-hour blocks starting from 11:30 PM (or 11:00 PM depending on Korea Standard Time meridian adjustments). While full eight-character life forecasts rely heavily on exact birth time, modern cultural and compatibility comparisons use the Year, Month, and Day Master pillars—giving accurate elemental insight even when someone doesn’t know the exact minute on their birth certificate.',
        ],
        bullets: [
          'Myth 1 — "Saju predicts fixed fate": Traditional Korean scholars treat Saju like weather forecasting—identifying natural temperament and favorable seasons rather than removing personal choice.',
          'Myth 2 — "Missing an element means bad luck": Almost nobody has all five elements evenly distributed; knowing which element is quiet helps guide career, habits, and complementary partnerships.',
        ],
      },
    ],
    companionCta: {
      eyebrow: 'Try It Yourself',
      title: 'See Your Birth Element & Balanced Korean Name',
      description:
        'Enter your birthday in the K-Pulse Korean Name Studio to calculate your Day Master element and preview three authentic Korean names that nourish your chart.',
      href: '/korean-name',
      buttonLabel: 'Calculate My K-Saju Name',
    },
    relatedQuizSlugs: ['korean-culture-iq'],
    sources: [
      {
        label: 'Encyclopedia of Korean Culture (Academy of Korean Studies)',
        detail: 'Historical background on Saju Palja, Ohaeng cosmology, and Seongmyeonghak naming.',
        url: 'https://encykorea.aks.ac.kr',
      },
      {
        label: 'National Folk Museum of Korea',
        detail: 'Traditional Korean zodiac, seasonal solar terms (24 절기), and birth-custom archives.',
        url: 'https://www.nfm.go.kr/english/index.do',
      },
    ],
  },
  {
    slug: 'why-korea-loves-mbti-vs-saju-culture',
    locale: 'en',
    title:
      'Why South Korea Is Obsessed With MBTI: How Locals & K-Pop Idols Pair MBTI With Saju',
    subtitle:
      'From 2000s blood-type personality charts to today’s "Are you a T?" memes, explore why four-letter personality labels became Korea’s favorite social shorthand—and how they coexist with Saju.',
    description:
      'Explore South Korea’s MBTI phenomenon: how it replaced blood types, why K-Pop idols update their MBTI on live streams, and how MBTI compares to traditional Saju.',
    category: 'Names & Saju',
    tags: ['MBTI', 'K-Saju', 'K-Pop Culture', 'Society'],
    keywords: [
      'why Korea loves MBTI',
      'Korean MBTI vs Saju',
      'Kpop idols MBTI culture',
      '너 T야 Korean meme',
      'blood type personality Korea',
    ],
    publishedAt: '2026-10-27',
    updatedAt: '2026-11-18',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '🧠',
    accentBg: 'bg-indigo-50',
    featured: false,
    keyTakeaways: [
      'MBTI surged in South Korea around 2020 when remote social life pushed Gen Z and millennials toward fast, shareable icebreakers online.',
      'In a hierarchical language culture where age and social formality normally dictate distance, MBTI gives Koreans a playful shortcut to discuss communication styles without awkwardness.',
      'Rather than discarding older frameworks like Saju or blood types, Korean pop culture blends MBTI ("Are you T or F?") alongside Saju compatibility for dating, team dynamics, and fandom talk.',
      'K-Pop idols routinely retake the test on Weverse, Bubble, and variety shows because four-letter traits spark instant fan banter—even though psychologists caution against treating it as fixed science.',
    ],
    intro: [
      'If you meet young South Koreans for coffee in Hongdae or watch a K-Pop variety show, one question tends to surface right after learning your name: "What is your MBTI?" While Western workplaces largely treat the Myers–Briggs Type Indicator as a dusty corporate seminar worksheet, in South Korea those sixteen four-letter acronyms—ENFP, ISTP, INFJ, ESTJ—evolved into mainstream conversational grammar.',
      'Friends tease logical companions with "너 T야?" ("Are you a Thinking type?"), cafes sell pastries labeled by I vs. E energy, and idol fan communities memorize member MBTI updates alongside birthdays and blood types.',
      'Behind the playful memes lies a uniquely Korean cultural pattern: using structured personality frameworks as gentle social lubrication—a tradition stretching from classic Saju to 2000s blood-type quizzes to today’s MBTI boom.',
    ],
    sections: [
      {
        id: 'from-blood-type-to-mbti',
        heading: '1. From 2000s Blood Types to the 2020s MBTI Boom',
        paragraphs: [
          'South Korea did not invent personality-typing small talk overnight. Throughout the 1990s and 2000s, blood-type personality theory (혈액형 성격설)—A for careful perfectionism, B for free-spirited spontaneity, O for outgoing leadership, AB for quirky originality—dominated magazine columns, blind dates, and early K-Pop variety bios.',
          'By the late 2010s, younger Koreans began dismissing blood types as overly broad stereotypes—four buckets could barely capture nuanced social habits. Around 2020, as pandemic lockdowns moved social interactions onto KakaoTalk, Instagram Stories, and YouTube, simplified online 16-type quizzes went viral nationwide.',
          'Sixteen types offered far richer vocabulary. Calling someone an "E" (extrovert) who loves spontaneous plans ("P") versus a homebody "I" who schedules itineraries down to the minute ("J") felt immediately recognizable—and infinitely memeable.',
        ],
      },
      {
        id: 'why-mbti-fits-korean-society',
        heading: '2. Why Four Letters Work So Well in Korean Social Culture',
        paragraphs: [
          'Korean social etiquette traditionally emphasizes group harmony (nunchi, 눈치—reading the room) and age-based honorifics. Asking someone directly "Why are you being so blunt?" or "Do you dislike crowds?" can sound confrontational.',
          'MBTI acts as an accepted buffer. Saying "Oh, that’s my T side talking, I actually care!" or "As an I, I need Sunday at home to recharge" lets people state boundaries and emotional needs lightly without offending peers or seniors.',
          'It also fits South Korea’s rapid digital communication pace. Four letters communicate volumes in a dating app bio, group project chat, or fan Q&A within half a second—though Korean recruiters drawing criticism for listing preferred MBTIs in job postings prompted public debates reminding companies that personality quizzes are not valid hiring metrics.',
        ],
        table: {
          caption: 'Three Eras of Personality Frameworks in Korean Pop Culture',
          headers: ['Framework', 'Peak Era', 'Categories', 'Typical Use Today'],
          rows: [
            [
              'Blood Type (혈액형)',
              '1990s – late 2000s',
              '4 types (A, B, O, AB)',
              'Mostly nostalgic retro trivia; listed on older idol profiles',
            ],
            [
              'K-Saju (사주 오행)',
              'Traditional – Ongoing',
              'Five Elements + 12 Zodiacs + Four Pillars',
              'New Year readings, wedding gunghap, baby naming, fortune cafes',
            ],
            [
              'MBTI',
              '2020 – Present',
              '16 types (E/I, S/N, T/F, J/P)',
              'Daily icebreakers, meme culture, dating banter, K-Pop group dynamics',
            ],
          ],
        },
      },
      {
        id: 'idols-mbti-and-saju',
        heading: '3. How K-Pop Idols & Fans Combine MBTI and Saju',
        paragraphs: [
          'Inside K-Pop fandoms, MBTI quickly became part of group storytelling. Variety shows film entire episodes testing members’ reactions—watching calm ISTP/INTP members react deadpan while high-energy ENFP/ESFP teammates bounce off the walls, or pairing "F" empathy types against pragmatic "T" types in hidden-camera skits.',
          'Idols frequently mention retaking the test as their careers shift: rookies who tested as cautious introverts sometimes drift toward E or J after years of touring, while high-energy trainees mellow into quieter I types off camera. BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa, and LE SSERAFIM members regularly joke with fans when a single letter flips.',
          'Interestingly, Saju never disappeared during this MBTI wave—instead, fans now pair them together. Where MBTI describes how you talk, plan, and recharge day-to-day, Korean Saju looks at birth-chart temperament and elemental chemistry. Pairing the two lets fans explore both sides: "Do our communication styles click, and do our birth elements balance each other out?"',
        ],
        callout: {
          tone: 'tip',
          title: 'Quick Korean Meme Decoder: "너 T야?" (Are You a T?)',
          body: 'If you tell a Korean friend "I had a rough day and bought expensive cake" and they reply "How much was it?" instead of "Aw, are you okay?", expect someone to tease them with "너 T야?" ("Are you a Thinking type?"). Here, T jokes about analytical honesty, while F ("너 F구나") celebrates warm emotional empathy.',
        },
      },
      {
        id: 'dating-workplace-boundaries',
        heading: '4. From Blind Dates to Job Applications: Where Korea Draws the Line',
        paragraphs: [
          'On Korean blind dates (소개팅, sogaeting) and university freshman mixers, exchanging MBTI letters often happens alongside discussing favorite cafes or neighborhood hobbies. Friends tease mismatched pairs—such as hyper-spontaneous ENFPs trying to travel with strict timetable-loving ISTJs—turning minor friction into self-aware comedy instead of quiet resentment.',
          'At the same time, Korean psychologists and labor regulators have pushed back when corporations began filtering job applicants by preferred four-letter profiles ("No INFP or ISFP candidates"). Major Korean psychological associations repeatedly reminded companies that popular free online questionnaires measure shifting self-perception rather than clinical competence—a healthy reminder for K-Pop fans, too, when idol members announce their letters flipped from INFP to ENFJ between tours.',
        ],
        bullets: [
          'E vs. I in Korean slang: "완전 E" ("Total extrovert") describes someone energized by group dinners, whereas "집순이/집돌이 I" describes cheerful homebodies.',
          'J vs. P travel styles: "파워 J" travelers build spreadsheet itineraries with subway exit numbers; "파워 P" travelers wander Seongsu-dong without pins.',
        ],
      },
    ],
    companionCta: {
      eyebrow: 'K-Saju × MBTI Lab',
      title: 'Test Your K-Saju & MBTI Chemistry Against 44 K-Pop Idols',
      description:
        'Combine your birthday’s Five Elements with your 4-letter MBTI type to see your compatibility breakdown with BTS, Stray Kids, BLACKPINK, TWICE, ENHYPEN, aespa, and LE SSERAFIM.',
      href: '/chemistry',
      buttonLabel: 'Open Idol Chemistry Lab',
    },
    relatedQuizSlugs: ['which-stray-kids-member-are-you', 'which-bts-member-are-you'],
    sources: [
      {
        label: 'Korea JoongAng Daily — Culture & Society Archives',
        detail: 'Reporting on South Korea’s post-2020 MBTI cultural wave and workplace debates.',
        url: 'https://koreajoongangdaily.joins.com',
      },
      {
        label: 'The Korea Herald — Pop Culture Features',
        detail: 'Coverage of K-Pop variety MBTI segments and youth communication trends.',
        url: 'https://www.koreaherald.com',
      },
    ],
  },
  {
    slug: 'modern-korean-names-and-hanja-meanings-guide',
    locale: 'en',
    title:
      'Popular Modern Korean Given Names & Their Authentic Hanja Meanings (2020–2026 Trends)',
    subtitle:
      'How Korean naming tastes shifted from 1980s consonant-heavy classics to today’s soft, melodic favorites—complete with real Hanja characters and clear pronunciation tips for English speakers.',
    description:
      'Explore popular modern Korean boy, girl, and unisex names with real Hangul, Hanja meanings, and accurate English pronunciation tips.',
    category: 'Names & Saju',
    tags: ['Korean Names', 'Hanja', 'Pronunciation', 'Trends'],
    keywords: [
      'popular Korean names 2026',
      'modern Korean girl names Hanja',
      'modern Korean boy names meaning',
      'unisex Korean names Hangul',
      'how to pronounce Korean names',
    ],
    publishedAt: '2026-11-05',
    updatedAt: '2026-11-20',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '✒️',
    accentBg: 'bg-rose-50',
    featured: false,
    keyTakeaways: [
      'Contemporary Korean names favor open, liquid sounds using syllables like 서 (Seo), 하 (Ha), 윤 (Yoon), 준 (Jun), 아 (Ah), and 도 (Do) over heavier mid-century endings like -ja, -sook, or -cheol.',
      'Soft unisex names—such as 지안 (Ji-an), 하율 (Ha-yul), 시우 (Si-woo), and 연우 (Yeon-woo)—have surged across birth registries and dramas alike.',
      'Learning three vowel tricks ("eo" = open "uh", "eu" = tight flat "eu", "ae/e" = crisp "eh") eliminates 90% of English mispronunciations.',
      'Checking real Supreme Court Hanja pairings ensures a chosen name carries genuine cultural resonance rather than random Hangul syllables.',
    ],
    intro: [
      'Every era of Korean society leaves a distinct signature in its baby names. During the 1950s and 1960s, names ending in "-ja" (자), "-ok" (옥), or "-cheol" (철) were commonplace. By the 1980s and 1990s—the generation behind many second- and third-gen K-Pop stars—melodic classics like Ji-hoon (지훈), Min-ji (민지), Tae-hyung (태형), and Ji-eun (지은) topped registries.',
      'Walk into an elementary school or check South Korea’s Supreme Court Electronic Family Relations Registry today, and the sonic landscape has shifted again. Modern parents overwhelmingly gravitate toward airy, vowel-rich syllables that flow effortlessly across both Korean conversation and international English.',
      'Below is a curated guide to popular modern Korean names across masculine, feminine, and unisex categories—paired with authentic Hanja meanings and practical pronunciation cues.',
    ],
    sections: [
      {
        id: 'generational-sound-shift',
        heading: '1. Why Modern Korean Names Sound Softer & Lighter',
        paragraphs: [
          'Linguists tracking Korean birth registries highlight two clear aesthetic trends over the past decade. First, parents avoid harsh double consonants or heavy final stop consonants in favor of liquid endings like "-n" (ㄴ), "-l" (ㄹ), or open vowels ("서아" Seo-ah, "이서" Yi-seo, "시아" Si-ah).',
          'Second, global awareness shapes choices directly. Families frequently test how a Korean name sounds when spoken in English without awkward homophones—favoring globally smooth names like 하윤 (Ha-yoon), 서준 (Seo-jun), 지안 (Ji-an), or 리안 (Ri-an).',
          'Traditional values haven’t vanished underneath the modern sound: parents still carefully select Hanja characters signifying wisdom (지/智), grace and benevolence (은/恩, 인/仁), prosperity and auspiciousness (서/瑞, 윤/潤), and radiant clarity (하/夏 or 河, 윤/允).',
        ],
      },
      {
        id: 'curated-modern-names-table',
        heading: '2. 12 Modern Korean Names With Authentic Hanja & Meanings',
        paragraphs: [
          'Notice how the same Hangul syllable can carry distinct meanings depending on which Hanja the family selects. The pairings below reflect authentic, widely registered character combinations.',
        ],
        table: {
          caption: 'Modern Korean Given Names: Hangul, Hanja, Style & Pronunciation',
          headers: ['Hangul (Romanized)', 'Sample Hanja', 'Literal Meaning', 'Style & Spoken Guide'],
          rows: [
            ['이서 (Yi-seo)', '怡瑞', 'Joyful and auspicious starlight', 'Feminine · "Ee-suh"'],
            ['서아 (Seo-ah)', '瑞雅', 'Auspicious grace and elegance', 'Feminine · "Suh-ah"'],
            ['하윤 (Ha-yoon)', '夏潤', 'Summer warmth and gentle blessing', 'Feminine · "Ha-yoon"'],
            ['지유 (Ji-yoo)', '智宥', 'Wise heart and generous spirit', 'Feminine · "Jee-yoo"'],
            ['서준 (Seo-jun)', '瑞俊', 'Auspicious talent and noble mind', 'Masculine · "Suh-joon"'],
            ['하준 (Ha-joon)', '河俊', 'Vast as a river, bright and capable', 'Masculine · "Ha-joon"'],
            ['도윤 (Do-yoon)', '道允', 'Walking a truthful, upright path', 'Masculine · "Doh-yoon"'],
            ['은우 (Eun-woo)', '恩宇', 'Graceful generosity vast as the sky', 'Masculine · "Eun-oo"'],
            ['지안 (Ji-an)', '智安', 'Wisdom bringing steady peace', 'Unisex · "Jee-ahn"'],
            ['시우 (Si-woo)', '時雨', 'Timely rain nourishing all life', 'Unisex · "Shee-oo"'],
            ['하율 (Ha-yul)', '河律', 'Flowing harmony like music and water', 'Unisex · "Ha-yool"'],
            ['연우 (Yeon-woo)', '延宇', 'Expanding grace and bright fortune', 'Unisex · "Yuh-noo"'],
          ],
        },
      },
      {
        id: 'pronunciation-guide',
        heading: '3. Pronunciation Guide: Avoiding the 4 Most Common Mistakes',
        paragraphs: [
          'Romanized Korean often misleads English speakers because two-letter combinations represent single Korean vowels rather than English diphthongs.',
        ],
        bullets: [
          '"Eo" (ㅓ) as in Seo-jun or Seok-jin: Do NOT pronounce it like "see-oh." Say a relaxed, open "uh" sound, close to the "u" in "sun" or "aw" in "saw" ("Suh-joon", "Suhk-jin").',
          '"Eu" (ㅡ) as in Eun-woo or Seung-min: Do NOT say "yoo" or "ee-oo." Pull the corners of your lips flat as if smiling slightly and say a tight "uh" from the back of the mouth.',
          '"Si" (시) as in Si-woo or Si-yeon: In Korean, "ㅅ" before "ㅣ" softens naturally toward an English "sh" sound—pronounced "Shee-oo", not "See-oo".',
          '"Ae" (애) and "E" (ㅔ) as in Tae-hyung or Hye-in: In modern Seoul speech, both sound very close to the crisp "e" in "bet" ("Teh-hyung", "Hyeh-in"), never like a hard "ay/eye".',
        ],
        callout: {
          tone: 'tip',
          title: 'How to Hear Authentic Spoken Rhythm',
          body: 'Korean names rarely place heavy English-style stress on one syllable. Keep all three syllables (surname + two-syllable given name) relatively even in rhythm: "Kim · Seo · jun", rather than "kim-suh-JOON".',
        },
      },
      {
        id: 'choosing-for-yourself',
        heading: '4. What Makes a Good Korean Name for Learners & Global Fans',
        paragraphs: [
          'If you are studying Korean, traveling to Seoul regularly, or choosing a Korean name for classes and social profiles, avoid literally transliterating English words syllable by syllable (like forced 4-syllable phonetics that sound awkward to native ears). Instead, follow the real two-part pattern: pick a genuine Korean surname plus a meaningful two-syllable given name whose Hanja meaning and sound match your birthday or personal vibe.',
          'You can even verify pronunciation directly with native speech audio and keep the matching Hanja seal on hand so when Korean friends ask "What does your Korean name mean?", you have a real, culturally accurate story to share.',
        ],
        subsections: [
          {
            heading: 'Pure Korean Names (순우리말) Growing Alongside Hanja',
            paragraphs: [
              'While Hanja pairings remain the statistical majority across South Korea’s birth registries, pure native Korean names—carrying zero Chinese characters—continue to hold an enduring appeal for families seeking poetic, earthy simplicity. Names such as 별 (Byeol, "star"), 봄 (Bom, "spring"), 솔 (Sol, "pine tree"), 다솜 (Da-som, "affection"), 아름 (A-reum, "beauty"), and 하루 (Ha-ru, "day") appear regularly across novels, dramas, and elementary school rosters.',
              'South Korea’s Supreme Court maintains an official register of approved personal-name Hanja (Inmyeong-yong Hanja) so family registers, national IDs, and academic transcripts remain legible across generations without obscure archaic variants.',
              'For travelers, language learners, or international fans choosing a Korean name outside legal registration, phonetic clarity across scripts matters just as much as literary symbolism: test how both given-name syllables sound together aloud, check for unintended everyday homophones, and choose one consistent Romanization style (such as Ji-min or Jimin) for easy recognition.',
              'Whether written in Hangul alone or anchored with classical Hanja, modern Korean naming demonstrates how language evolves without severing its cultural roots: honoring family memory, clear sound, and hopeful intention in just three syllables.',
            ],
          },
        ],
      },
    ],
    companionCta: {
      eyebrow: 'Audio + Hanja Seal Studio',
      title: 'Discover Your Personal Korean Name & Hear It Spoken Aloud',
      description:
        'Pick your preferred vibe, balance your birth date’s Five Elements, listen to native Korean pronunciation, and save your Hanja ID card.',
      href: '/korean-name',
      buttonLabel: 'Try the Korean Name Generator',
    },
    relatedQuizSlugs: ['korean-culture-iq'],
    sources: [
      {
        label: 'Supreme Court of Korea — Birth Registration Statistics',
        detail: 'Annual top newborn given-name rankings published through the Electronic Family Relations Registry.',
        url: 'https://efamily.scourt.go.kr',
      },
      {
        label: 'National Institute of Korean Language (NIKL)',
        detail: 'Hangul vowel/consonant phonetics and official Romanization standards.',
        url: 'https://www.korean.go.kr/front_eng/main.do',
      },
    ],
  },
  {
    slug: 'korean-zodiac-12-animals-ddi-compatibility-guide',
    locale: 'en',
    title:
      'Korean Zodiac (12 Ddi / 띠) Explained: Animals, Birth Years, Compatibility & Samjae',
    subtitle:
      'How Korea’s 12 zodiac animals cycle with the Five Elements every 60 years, why January–February birthdays need extra care, and what "4-year age gap," Samhap, and Samjae actually mean.',
    description:
      'Learn the 12 Korean zodiac animals (ddi), birth-year chart, 60-year color-animal cycle (including 2026 Red Horse), Samhap compatibility, and Samjae folklore.',
    category: 'Names & Saju',
    tags: ['Korean Zodiac', 'K-Saju', 'Compatibility', 'Culture'],
    keywords: [
      'Korean zodiac 12 animals ddi',
      'Korean zodiac compatibility samhap',
      'what is ddi-donggap Korea',
      'Korean samjae meaning',
      'Year of the Red Horse 2026 Korea',
    ],
    publishedAt: '2026-11-20',
    updatedAt: '2026-11-25',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '🐯',
    accentBg: 'bg-amber-50',
    featured: false,
    keyTakeaways: [
      'Korean "ddi" (띠) assigns one of 12 zodiac animals to your birth year—cycling in fixed order from Rat (쥐띠) through Pig (돼지띠).',
      'Combining the 12 animals with the 10 Heavenly Stems creates a 60-year color-animal cycle (Yukship Gapja), marking milestone 60th birthdays called Hwangap (환갑) and making 2026 the Year of the Red Horse (병오년).',
      'For January and early-February birthdays, casual conversation switches animals at Lunar New Year (Seollal), whereas classical Korean Saju readings switch at Ipchun (around February 4).',
      'Compatibility sayings like "Samhap" (four-year triads) and "Samjae" (three cautious years) remain lively conversation starters rather than strict modern rules.',
    ],
    intro: [
      'Ask a Korean friend when they were born and instead of giving a Western zodiac sign like Leo or Scorpio, they are just as likely to answer, "I’m a Dragon" or "We’re both Tigers." Known in Korean as "ddi" (띠, literally a sash or belt), the 12-animal zodiac cycle sits quietly underneath everything from family Lunar New Year small talk to idol birthday nicknames.',
      'Although Korea shares the same foundational 12 animals seen across East Asia, Korean culture attaches distinct idioms, birthday customs, and compatibility proverbs to them. You will regularly hear older relatives praise a four-year age gap as ideal harmony ("사주에 딱 맞는 궁합"), joke about friends born twelve years apart sharing the same animal ("띠동갑"), or check whether their animal enters a traditional three-year caution cycle known as "Samjae."',
      'Here is how the 12 Korean zodiac animals work, how to locate your birth year accurately, and what those colorful traditional pairings mean in real life.',
    ],
    sections: [
      {
        id: 'how-korean-ddi-works',
        heading: '1. How Korean Ddi Works (Plus the January–February Cutoff)',
        paragraphs: [
          'Western horoscopes cycle through twelve constellations across twelve calendar months inside a single year. Korean ddi cycles across twelve consecutive years instead—meaning everyone born in the same cohort (such as Korea’s "97-line" Oxen or "00-line" Dragons) shares the exact same zodiac animal.',
          'The tricky catch arrives every January and early February. On social calendar cards, most Koreans treat Seollal (Korean Lunar New Year, falling between late January and mid-February) as the day the zodiac animal hands off. However, formal Saju fortune-tellers and naming studios switch the Year Pillar strictly at Ipchun (입춘, Beginning of Spring), one of the 24 solar terms that consistently falls around February 3–5.',
          'As a result, someone born on January 22, 1995 (before Seollal and Ipchun) is technically classified as a Dog (1994 cohort) under classical Saju even though pop-culture profiles often list them alongside 1995 Pigs. Checking both dates clears up why two astrology apps occasionally give early-year babies different animals.',
        ],
      },
      {
        id: 'twelve-animals-table',
        heading: '2. All 12 Korean Zodiac Animals & Compatibility Triads',
        paragraphs: [
          'Korean names add "-ddi" (-띠) directly after each animal word—for example, "Horangi-ddi" (호랑이띠, Year of the Tiger) or "Yong-ddi" (용띠, Year of the Dragon). Notice also the eighth sign: while English translations split between "Sheep," "Goat," and "Ram," Korean uses one clear word, "Yang" (양띠).',
        ],
        table: {
          caption: 'The 12 Korean Zodiac Animals (십이지신): Birth Years, Archetypes & Samhap Partners',
          headers: ['Animal (Korean Ddi)', 'Recent Birth Years', 'Traditional Archetype', 'Classic Samhap Triad'],
          rows: [
            ['Rat (쥐띠 · 자)', '1972, 1984, 1996, 2008, 2020', 'Quick-witted, resourceful, observant planner', 'Rat · Dragon · Monkey'],
            ['Ox (소띠 · 축)', '1973, 1985, 1997, 2009, 2021', 'Steady, patient, loyal, quietly resilient', 'Ox · Snake · Rooster'],
            ['Tiger (호랑이띠 · 인)', '1974, 1986, 1998, 2010, 2022', 'Bold, protective, charismatic natural starter', 'Tiger · Horse · Dog'],
            ['Rabbit (토끼띠 · 묘)', '1975, 1987, 1999, 2011, 2023', 'Gentle, tactful, artistic, perceptive diplomat', 'Rabbit · Sheep · Pig'],
            ['Dragon (용띠 · 진)', '1976, 1988, 2000, 2012, 2024', 'Ambitious, magnetic, imaginative trailblazer', 'Dragon · Rat · Monkey'],
            ['Snake (뱀띠 · 사)', '1977, 1989, 2001, 2013, 2025', 'Intuitive, calm, strategic, refined thinker', 'Snake · Ox · Rooster'],
            ['Horse (말띠 · 오)', '1978, 1990, 2002, 2014, 2026', 'Energetic, expressive, freedom-loving traveler', 'Horse · Tiger · Dog'],
            ['Sheep / Goat (양띠 · 미)', '1979, 1991, 2003, 2015, 2027', 'Warm-hearted, creative, empathetic peacemaker', 'Sheep · Rabbit · Pig'],
            ['Monkey (원숭이띠 · 신)', '1980, 1992, 2004, 2016, 2028', 'Clever, playful, adaptable problem-solver', 'Monkey · Rat · Dragon'],
            ['Rooster (닭띠 · 유)', '1981, 1993, 2005, 2017, 2029', 'Punctual, candid, detail-focused perfectionist', 'Rooster · Ox · Snake'],
            ['Dog (개띠 · 술)', '1982, 1994, 2006, 2018, 2030', 'Sincere, protective, steadfast, fair-minded', 'Dog · Tiger · Horse'],
            ['Pig (돼지띠 · 해)', '1983, 1995, 2007, 2019, 2031', 'Generous, warm, sincere, abundance-linked', 'Pig · Rabbit · Sheep'],
          ],
        },
      },
      {
        id: 'sixty-year-color-cycle',
        heading: '3. The 60-Year Color Cycle & Why 2026 Is the "Red Horse"',
        paragraphs: [
          'If you follow Korean New Year news, headlines rarely say simply "Year of the Horse." They say "2026 Byeong-o-nyeon: Year of the Red Horse" (병오년 붉은 말의 해). That color prefix comes from merging the 12 zodiac animals (Earthly Branches) with the 10 Heavenly Stems anchored to the Five Elements—Wood (Blue/Green, 청), Fire (Red, 적), Earth (Yellow, 황), Metal (White, 백), and Water (Black, 흑).',
          'Because 10 stems and 12 animals advance together one step each year, it takes exactly 60 years (the least common multiple of 10 and 12) for the exact stem-and-animal combination to return. When a Korean reaches their 60th birthday (actually 61 in traditional counting, 60 completed international years), families celebrate Hwangap (환갑)—literally "returning to the starting stem and branch"—marking a full completed circle of life.',
          'Inside the current stretch of the decade, 2024 was Gap-jin (Blue Dragon), 2025 was Eul-sa (Blue Snake), 2026 enters Byeong-o (Red Horse), and 2027 follows as Jeong-mi (Red Sheep)—linking energetic Fire-element vibrancy with each animal’s traits.',
        ],
      },
      {
        id: 'compatibility-samhap-and-samjae',
        heading: '4. Compatibility Myths: Four-Year Age Gaps, Ddi-donggap & Samjae',
        paragraphs: [
          'Korean elders and matchmaking columns love tossing around three zodiac terms that sound mysterious until you see their simple wheel geometry:',
        ],
        bullets: [
          'Samhap (삼합 · Four-Year Harmony Triads): Animals spaced four years apart on the 12-year wheel—like Tiger, Horse, and Dog, or Rat, Dragon, and Monkey—share complementary elemental energy. That geometric spacing inspired the famous old Korean saying, "Don’t even look at compatibility if you have a four-year age gap" (4살 차이는 궁합도 안 본다)!',
          'Ddi-donggap (띠동갑 · 12-Year Same-Animal Bond): Two people born exactly 12, 24, or 36 years apart share the same ddi—often forming warm mentor-mentee rapport across generations.',
          'Sangchung (상충 · Six-Year Opposites): Animals directly opposite each other across the 12-animal wheel (six years apart, like Rat and Horse or Rabbit and Rooster) traditionally represent contrasting instincts that require extra communication.',
          'Samjae (삼재 · Three Cautious Years): Every 12 years, each Samhap triad passes through a three-year period traditionally regarded as a time to slow down major risks and look after health before stepping into a fresh cycle.',
        ],
        callout: {
          tone: 'note',
          title: 'How Modern Koreans Actually Treat Zodiac Rules',
          body: 'Don’t worry if your birth year clashes on paper with a partner, friend, or favorite idol! Modern Korean astrologers remind people that Year-Pillar animals represent only one-eighth of a full Saju chart—real compatibility weighs your Day Master Five Element, month season, and personal communication habits far more than a simple animal proverb.',
        },
      },
      {
        id: 'ddi-in-kpop-and-daily-korea',
        heading: '5. How Zodiac Lore Shows Up in K-Pop & Everyday Seoul',
        paragraphs: [
          'In everyday South Korea, zodiac animals remain affectionate shorthand. Friends joke proudly about belonging to the "Golden Pig" cohort (2007, celebrated for lucky abundance) or "Black Dragon" cohort (2012), while bakeries, stationery chains, and K-Beauty brands release limited-edition animal motifs every January ahead of Seollal.',
          'K-Pop fandoms extend that animal lore right onto stage intros and merchandise. Same-year idol cliques ("95z" Pigs like BTS’s Jimin and V, "97z" Oxen including Jungkook, or "00z" Dragons like Stray Kids’ Hyunjin, HAN, Felix, and Seungmin) routinely sport official plush mascots or signature animal emojis in fan chats—making Korean zodiac literacy an unexpectedly fun lens for following group dynamics.',
        ],
      },
    ],
    companionCta: {
      eyebrow: 'K-Saju × MBTI Compatibility',
      title: 'Check Your Saju, MBTI & Zodiac Chemistry With 44 K-Pop Idols',
      description:
        'See how your birth year’s Korean Zodiac animal, Day Master Five Element, and MBTI type match up across BTS, BLACKPINK, Stray Kids, TWICE, ENHYPEN, aespa, and LE SSERAFIM.',
      href: '/chemistry',
      buttonLabel: 'Open Idol Chemistry Lab',
    },
    relatedQuizSlugs: ['korean-culture-iq', 'which-bts-member-is-your-soulmate'],
    sources: [
      {
        label: 'Encyclopedia of Korean Culture (Academy of Korean Studies)',
        detail: 'Traditional Sibijisin (12 Earthly Branches), Yukship Gapja 60-year cycle, and Hwangap customs.',
        url: 'https://encykorea.aks.ac.kr',
      },
      {
        label: 'National Folk Museum of Korea',
        detail: 'Korean New Year (Seollal) zodiac traditions, Samhap compatibility lore, and Samjae folk beliefs.',
        url: 'https://www.nfm.go.kr/english/index.do',
      },
    ],
  },
  {
    slug: 'pure-korean-names-sun-urimal-meaning-guide',
    locale: 'en',
    title:
      'Pure Korean Names (Sun-urimal / 순우리말) Explained: 16 Beautiful Native Names Without Hanja',
    subtitle:
      'Discover how native Hangul names with zero Chinese characters became modern Korean favorites—from timeless classics like Ha-neul and Seul-gi to poetic contemporary picks like Da-on and Ga-on.',
    description:
      'Explore 16 authentic pure Korean (sun-urimal) names without Hanja, their literal Hangul meanings, surname pairing tips, and pronunciation guide.',
    category: 'Names & Saju',
    tags: ['Korean Names', 'Pure Korean', 'Hangul', 'Language'],
    keywords: [
      'pure Korean names sun-urimal',
      'Korean names without Hanja',
      'native Korean name meanings',
      'beautiful Hangul names',
      'Korean nature names',
    ],
    publishedAt: '2026-11-23',
    updatedAt: '2026-11-25',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '🌸',
    accentBg: 'bg-rose-50',
    featured: false,
    keyTakeaways: [
      'Pure Korean names ("순우리말 이름", sun-urimal ireum) come strictly from native Korean vocabulary—carrying zero Sino-Korean Hanja characters on official birth registries.',
      'Even without Hanja, pure Korean given names still attach to traditional family surnames (like Kim, Lee, or Park), leaving the Hanja field blank only on the given-name section.',
      'Nature motifs—sky (Ha-neul), ocean (Ba-da), star (Byeol), spring (Bom), and morning dew (Yi-seul)—remain the most enduring native names across real school rosters and dramas.',
      'Distinguish established given names from poetic words used mostly for bakeries, novels, or pets so your chosen Korean name sounds natural to native ears.',
    ],
    intro: [
      'Roughly seven or eight out of ten South Koreans can write their given name in classical Hanja characters—each syllable drawn from Sino-Korean roots meaning wisdom, brightness, or grace. Yet listen closely to Korean classrooms, sports broadcasts, and idol profiles, and you steadily encounter names that need no Chinese character dictionary at all: Ha-neul ("sky"), Ba-da ("ocean"), Seul-gi ("wisdom"), Bo-ra ("purple"), or single-syllable Bom ("spring").',
      'Known as "sun-urimal" (순우리말, literally "pure our language"), these native Korean names grew steadily from the 1970s Hangul pride movement into mainstream modern choices beloved for their lyrical warmth and immediate clarity in spoken Korean.',
      'Whether you are curious about famous Korean names you hear in K-Pop and K-Dramas or picking an authentic Hangul name for yourself, understanding how pure Korean names work helps you spot real gems versus awkward inventions.',
    ],
    sections: [
      {
        id: 'what-is-sun-urimal-name',
        heading: '1. What Makes a Pure Korean (Sun-urimal) Name Different?',
        paragraphs: [
          'Korean vocabulary resembles English in having two broad layers: native Korean words (like "물" mul for water or "해" hae for sun) and Sino-Korean words built from classical Chinese roots (like "수" 水 or "일" 日). Traditional Korean naming relied heavily on Sino-Korean Hanja so clan genealogies could track generational syllables and stroke counts.',
          'Choosing a sun-urimal given name flips that tradition gently. On South Korea’s Electronic Family Relations Registry, parents enter the family surname with its usual Hanja (such as 金 for Kim or 李 for Lee) and register the given name strictly in Hangul with an empty Hanja field. Rather than translating abstract scholarly virtues, native names evoke sensory images Koreans feel instantaneously the moment they hear the word.',
        ],
      },
      {
        id: 'sixteen-authentic-pure-korean-names',
        heading: '2. 16 Authentic Pure Korean Given Names & Real Meanings',
        paragraphs: [
          'Every entry below reflects genuine native Korean vocabulary actively used as personal names across South Korea—never literal translations of English words.',
        ],
        table: {
          caption: '16 Pure Korean (Sun-urimal) Names: Hangul, Literal Meaning & Spoken Guide',
          headers: ['Hangul (Romanized)', 'Native Korean Root Meaning', 'Common Vibe / Usage', 'Pronunciation Cue'],
          rows: [
            ['하늘 (Ha-neul)', 'Sky / Heavens', 'Unisex · Timeless classic', '"Ha-neul" (flat tight "eu")'],
            ['바다 (Ba-da)', 'Ocean / Wide Sea', 'Mostly feminine / unisex', '"Bah-dah" (even cadence)'],
            ['슬기 (Seul-gi)', 'Wisdom & resourcefulness', 'Feminine · Classic since 1980s', '"Seul-gee" (hard "g")'],
            ['보라 (Bo-ra)', 'Purple / Violet hue', 'Feminine · Warm literary classic', '"Boh-rah"'],
            ['하루 (Ha-ru)', 'A single precious day', 'Unisex · Gentle modern favorite', '"Ha-roo"'],
            ['가온 (Ga-on)', 'The center / balanced heart of things', 'Unisex · Popular modern name', '"Gah-ohn"'],
            ['다온 (Da-on)', 'All good things coming toward you', 'Unisex · Beloved 2010s–2020s pick', '"Dah-ohn"'],
            ['봄 (Bom)', 'Springtime', 'Feminine · Crisp 1-syllable charm', '"Bohm" (also Bom-i with suffix)'],
            ['별 (Byeol)', 'Bright star', 'Feminine / affectionate nickname', '"Byuhl"'],
            ['나래 (Na-rae)', 'Wing (poetic literary form)', 'Feminine · Graceful sound', '"Nah-reh"'],
            ['아름 (A-reum)', 'Beauty (from "areumdapda")', 'Feminine · Warm classic', '"Ah-reum"'],
            ['다솜 (Da-som)', 'Deep affection / love (archaic root)', 'Feminine · Poetic heritage', '"Dah-sohm"'],
            ['노을 (No-eul)', 'Evening sunset glow in the sky', 'Unisex · Lyric & artistic', '"Noh-eul"'],
            ['마루 (Ma-ru)', 'Mountain crest / highest ridge', 'Masculine / unisex · Strong tone', '"Mah-roo"'],
            ['소라 (So-ra)', 'Spiral conch shell by the sea', 'Feminine · Nostalgic classic', '"Soh-rah"'],
            ['이슬 (Yi-seul)', 'Clear morning dew', 'Feminine · Pure imagery', '"Ee-seul" (soft initial "y")'],
          ],
        },
      },
      {
        id: 'everyday-names-vs-poetic-nouns',
        heading: '3. Everyday Human Names vs. Poetic Nouns for Cafes & Pets',
        paragraphs: [
          'Not every pretty pure Korean dictionary word sounds right as a person’s legal name. Overseas learners browsing aesthetic word lists often fall in love with words like "윤슬" (yunseul — sunlight sparkling on ripples), "미리내" (mirinae — Milky Way), "꽃비" (kkotbi — flower-petal rain), or "아라" (ara — archaic poetic word for sea).',
        ],
        subsections: [
          {
            heading: 'How Native Speakers Hear Poetic Words',
            paragraphs: [
              'While words like Yunseul or Ara occasionally appear as modern baby names or artist stage names, ultra-figurative compound nouns such as Kkotbi ("flower rain"), Nabi ("butterfly"), or Bori ("barley") usually strike Korean ears as boutique brand names, book titles, or beloved pet names rather than everyday office colleagues.',
              'Two-syllable native words ending cleanly in a vowel or soft consonant—such as Ha-neul, Ga-on, Da-on, Ha-ru, Seul-gi, or Ma-ru—integrate seamlessly with Korean family surnames and conversational suffixes ("Ha-neul-ssi", "Ha-ru-ya") without sounding theatrical.',
            ],
          },
        ],
      },
      {
        id: 'pairing-surnames-and-legal-rules',
        heading: '4. Pairing Surnames, Legal Limits & Acoustic Balance',
        paragraphs: [
          'Because roughly half of South Koreans carry single-syllable surnames like Kim (김), Lee (이), Park (박), Choi (최), or Jung (정), pure Korean given names pair effortlessly into the classic three-syllable rhythm: Kim Ha-neul (김하늘), Park Bo-ra (박보라), Kang Seul-gi (강슬기), or Lee Ha-ru (이하루).',
          'Under South Korean birth registration rules established by the Supreme Court in 1993, newly registered given names are limited to five syllables total (excluding the surname)—though nearly every pure Korean given name sticks to two syllables (or occasionally one syllable like Bom or Byeol) for balanced everyday pronunciation.',
        ],
        callout: {
          tone: 'tip',
          title: 'Watch Out for Unintended Surname + Given Name Homophones',
          body: 'Always read the surname and pure Korean given name aloud together before committing! For example, pairing the surname "고" (Go) with a cute word or pairing "신" (Shin) with certain nouns can accidentally form everyday words like "고구마" or "신발". Testing the full three-syllable flow aloud prevents awkward puns.',
        },
      },
      {
        id: 'pure-korean-names-in-pop-culture',
        heading: '5. Pure Korean Names Across K-Pop, K-Dramas & Personal Study',
        paragraphs: [
          'Pop culture helped reintroduce sun-urimal names worldwide. Red Velvet’s Seulgi (Kang Seul-gi), S.E.S. trailblazer Bada (and choreographer Bada Lee), actress Han Ga-in and Kim Ha-neul characters across beloved dramas, plus stage names like IU collaborator Ha-neul or K-Pop mascot themes keep native Hangul names bright in global playlists.',
          'If you want a Korean name for language class, travel reservations, or creative profiles, deciding between a classic Hanja name and a pure Korean name is strictly a question of personality: Hanja shines when you want historical character symbolism and a traditional red ink seal, while pure Korean shines when you love crisp nature imagery that every Korean speaker recognizes in half a heartbeat.',
        ],
        bullets: [
          'Check Hangul sound harmony: Native names rich in open vowels (아, 오, 우) feel bright and approachable, while soft final consonants (ㄴ, ㄹ, ㅁ) add calm warmth.',
          'Keep one consistent Romanization: Write "Ha-neul" or "Haneul" consistently on class badges and travel bookings so friends recognize your name instantly.',
        ],
      },
    ],
    companionCta: {
      eyebrow: 'Interactive Naming Studio',
      title: 'Generate Your Authentic Korean Name With Audio & Hanja Seal',
      description:
        'Test how traditional Korean surnames, Five Elements, and authentic two-syllable names pair with your birthday—and hear native Korean speech pronunciation aloud.',
      href: '/korean-name',
      buttonLabel: 'Open Korean Name Studio',
    },
    relatedQuizSlugs: ['korean-culture-iq'],
    sources: [
      {
        label: 'National Institute of Korean Language (NIKL)',
        detail: 'Standard native Korean vocabulary definitions (sun-urimal) and Hangul pronunciation rules.',
        url: 'https://www.korean.go.kr/front_eng/main.do',
      },
      {
        label: 'Supreme Court of Korea — Electronic Family Relations Registry',
        detail: 'Rules on Hangul-only birth registration and five-syllable given-name length limits.',
        url: 'https://efamily.scourt.go.kr',
      },
    ],
  },
];
