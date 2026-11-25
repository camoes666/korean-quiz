import type { EditorialArticle } from '../../types/article';

export const FOOD_CULTURE_ARTICLES: EditorialArticle[] = [
  {
    slug: 'korean-spicy-food-scoville-guide',
    locale: 'en',
    title:
      'Korean Spicy Food Scale Explained: From Shin Ramyun to Buldak 2x & Yeopgi Tteokbokki',
    subtitle:
      'Why Korean chili dishes hit differently from jalapeños or habaneros, realistic Scoville Heat Unit comparisons, side dishes that cool the burn, and exact phrases to lower spice levels.',
    description:
      'Compare Scoville heat levels across Kimchi, Shin Ramyun, Samyang Buldak 2x, and Yeopgi Tteokbokki—plus traditional Korean cooling sides and ordering phrases.',
    category: 'Food & Culture',
    tags: ['Korean Food', 'Spicy Food', 'Scoville', 'Ramen'],
    keywords: [
      'Korean spicy food Scoville scale',
      'Buldak 2x Scoville units',
      'Shin Ramyun spice level',
      'Yeopgi Tteokbokki spice levels',
      'how to make Korean food less spicy',
    ],
    publishedAt: '2026-10-04',
    updatedAt: '2026-11-18',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '🌶️',
    accentBg: 'bg-orange-50',
    featured: true,
    keyTakeaways: [
      'Traditional Korean heat comes from sun-dried gochugaru (chili flakes) and fermented gochujang, giving warm, savory sweetness before the burn builds.',
      'By contrast, viral instant noodles like Samyang Buldak and extreme street tteokbokki chains concentrate oleoresin capsicum extract, spiking faster and lingering longer.',
      'Even at "mild" (착한맛), spicy chains like Yeopgi Tteokbokki can overwhelm mild palates; always order cooling companions like steamed egg (gyeranjjim) and rice balls (jumeokbap).',
      'Saying "An maepge haejuseyo" (안 맵게 해주세요 — please make it not spicy) or "Deol maepge" (덜 맵게 — less spicy) at casual diners prevents unpleasant surprises.',
    ],
    intro: [
      'Many travelers arrive in Seoul confident because they regularly eat spicy buffalo wings or jalapeño salsa at home, only to be humbled by a humble bowl of red rice cakes on day two. Conversely, others steer clear of anything bright red out of fear, missing comforting everyday staples like soft tofu stew or aged kimchi that barely register as scorching.',
      'Understanding Korean spice is less about chasing daredevil pain and more about distinguishing two completely different heat profiles: slow, fermented gochugaru warmth versus modern concentrated capsaicin extract.',
      'Here is how the Scoville scale translates onto actual Korean grocery shelves and restaurant menus, along with the cooling dishes locals pair right beside them.',
    ],
    sections: [
      {
        id: 'two-types-of-korean-heat',
        heading: '1. Gochugaru Warmth vs. Capsaicin Extract Heat',
        paragraphs: [
          'Traditional Korean cooking centers on gochugaru (고춧가루)—mildly fruity, smoky red chili flakes made from dried Korean Cheongyang or Taecho peppers—and gochujang (고추장), a fermented chili paste sweetened naturally by glutinous rice malt. Standard Korean chili powder usually measures fairly gently around 1,500 to 4,000 Scoville Heat Units (SHU), which is why everyday baechu kimchi tastes bright and savory rather than numbing.',
          'What catches newcomers off guard is modern Korean "stress-relief spice" (스트레스 푸는 매운맛). Chain tteokbokki brands, extra-spicy chicken feet (buldakbal), and viral instant ramyeon use concentrated capsicum oleoresin extract alongside Cheongyang chili peppers (~4,000–10,000 SHU fresh). Extract-based heat coats sauce densely onto chewy rice cakes and wheat noodles, sticking to your palate far longer than watery broth.',
        ],
      },
      {
        id: 'scoville-comparison-table',
        heading: '2. Scoville Heat Unit (SHU) Comparison Across Iconic Dishes',
        paragraphs: [
          'Measured Scoville values vary slightly by batch and domestic versus export recipes, yet the relative ladder below gives you an accurate benchmark before tearing open a seasoning packet or picking a menu tier.',
        ],
        table: {
          caption: 'Korean Spice Benchmark: From Everyday Pantry to Challenge Tier',
          headers: ['Food / Product', 'Approx. SHU Range', 'Heat Profile', 'First-Timer Verdict'],
          rows: [
            ['Napa Cabbage Kimchi (배추김치)', '500 – 1,500 SHU', 'Tangy, fermented garlic & light chili warmth', 'Very approachable daily staple'],
            ['Jin Ramyun Mild (진라면 순한맛)', '600 – 1,000 SHU', 'Savory beef-soy broth with gentle pepper tickle', 'Safe baseline for low spice tolerance'],
            ['Shin Ramyun Original (신라면)', '~3,400 SHU', 'Peppery, bold mushroom-garlic beef broth', 'Korea’s standard medium-spicy benchmark'],
            ['Samyang Buldak Original (불닭볶음면)', '~4,404 SHU', 'Thick sweet-soy glaze + sharp extract heat (no soup)', 'Intense; feels hotter than Shin Ramyun because sauce clings'],
            ['Samyang Buldak 2x Spicy (핵불닭)', '~8,800 – 10,000 SHU', 'Immediate tongue sting and prolonged capsaicin burn', 'True endurance challenge; keep milk ready'],
            ['Yeopgi Tteokbokki (엽기떡볶이)', '5 tiers (Mild to Extreme)', 'Cheongyang pepper + extract sauce over chewy rice cakes', 'Order "Chakhan-mat" (Mild) or "Chobo-mat" (Beginner) first'],
          ],
        },
        callout: {
          tone: 'note',
          title: 'Why 4,404 SHU Buldak Feels Hotter Than Jalapeño (5,000 SHU)',
          body: 'Don’t let raw SHU numbers fool you. In stir-fried dry noodles like Buldak, concentrated capsaicin oil coats every strand evenly and hits your tongue hot off the stove without broth to dilute it, creating a stronger burn than chewing a raw slice of jalapeño.',
        },
      },
      {
        id: 'cooling-companions',
        heading: '3. Traditional Korean Side Dishes Built to Rescue Your Palate',
        paragraphs: [
          'Koreans rarely eat blazing spicy dishes alone—restaurants design entire side menus specifically to neutralize capsaicin between bites. Water barely helps because capsaicin is fat-soluble rather than water-soluble; dairy, starchy rice, and cool pickled radish work infinitely better.',
        ],
        bullets: [
          'Gyeranjjim (계란찜 — Steamed Egg Soufflé): Served bubbling in an earthen pot (ttukbaegi), fluffy savory egg coats your throat and breaks up chili oil immediately.',
          'Jumeokbap (주먹밥 — Seaweed & Mayo Rice Balls): Crumbled toasted gim seaweed, sesame oil, pickled radish bits, and mayonnaise rolled with warm rice absorb fiery sauce effortlessly.',
          'Coolpis (쿨피스 — Peach or Pineapple Yogurt Drink): The iconic ₩1,500–₩2,000 juice-carton staple found in nearly every tteokbokki shop, engineered specifically to soothe fiery street food.',
          'Danmuji (단무지 — Sweet Pickled Yellow Radish) & Baek-kimchi (White Kimchi): Crisp, sweet-tart bites reset taste buds between hot mouthfuls.',
        ],
      },
      {
        id: 'ordering-phrases',
        heading: '4. Practical Phrases to Adjust Spice in Korean Restaurants',
        paragraphs: [
          'At specialized single-pot chains (like Dakgalbi, Jjigae, or Budae Jjigae spots), kitchens prepare sauces in advance, so dishes cannot always be made completely spice-free—but staff gladly adjust garnish peppers or steer you toward milder broths when asked politely.',
        ],
        bullets: [
          '"An maepge haejuseyo." (안 맵게 해주세요) — "Please make it not spicy."',
          '"Deol maepge haejuseyo." (덜 맵게 해주세요) — "Please make it less spicy."',
          '"Igeo mani maewoyo?" (이거 많이 매워요?) — "Is this very spicy?" (Staff may say "jogeum" = a little, or "mani" = very.)',
          '"Gochujang ttaro juseyo." (고추장 따로 주세요) — "Please serve the chili paste on the side" (ideal for bibimbap!).',
        ],
      },
      {
        id: 'regional-spice-and-convenience-hacks',
        heading: '5. Regional Heat Styles & Convenience-Store Pairing Hacks',
        paragraphs: [
          'Spice traditions shift noticeably as you travel south across Korea. Daegu is famous nationwide for bold, garlicky "jjimdak" (braised soy-chili glass-noodle chicken) and fiery "makchang" grilled pork intestines dipped in fermented soybean sauce spiked with chopped green chilies, while Jeonju and the surrounding Jeolla provinces lean toward deep, complex umami built on fermented seafood pastes and mellow sun-cured chili powders.',
          'Meanwhile, Korean convenience stores (CU, GS25, 7-Eleven, Emart24) function as late-night spicy-noodle laboratories. Locals soften fiery Buldak noodles by dropping in a single slice of processed cheddar cheese, mixing a ₩1,200 triangle gimbap (such as tuna-mayo samgak gimbap) straight into leftover sauce after finishing the noodles, and keeping a carton of Binggrae Banana Flavored Milk beside the cup.',
        ],
        bullets: [
          'Cheese + tuna-mayo upgrade: Stirring mozzarella string cheese and a tuna-mayo triangle gimbap into Buldak cuts heat sharply while doubling protein and texture.',
          'Broth control rule: At budae jjigae or kalguksu tables, ask if raw Cheongyang green chilies are sliced on top—leaving those thin green rings aside lowers heat without altering broth flavor.',
        ],
      },
    ],
    companionCta: {
      eyebrow: 'Test Your Tolerance',
      title: 'Take the 30-Question Korean Spicy Food Quiz',
      description:
        'Challenge yourself on Scoville rankings, famous Seoul street snacks, and K-Pop idol spice lore across three difficulty levels.',
      href: '/quiz/korean-spicy-food',
      buttonLabel: 'Play Korean Spicy Food Quiz',
    },
    relatedQuizSlugs: ['korean-spicy-food', 'which-korean-food-are-you'],
    sources: [
      {
        label: 'Samyang Foods Official Product Specifications',
        detail: 'Published Scoville Heat Unit benchmarks for Buldak Ramen Original and 2x Spicy editions.',
        url: 'https://www.samyangfoods.com',
      },
      {
        label: 'Korea Agro-Fisheries & Food Trade Corporation (aT)',
        detail: 'Traditional gochujang fermentation standards and Korean pepper varietal guides.',
      },
    ],
  },
  {
    slug: 'korean-dining-etiquette-complete-guide',
    locale: 'en',
    title:
      'Korean Dining Etiquette for First-Time Visitors: Chopsticks, Drinking Rules, Banchan & Tipping',
    subtitle:
      'Why flat metal chopsticks require a slightly different grip, why rice bowls stay on the table, how free banchan refills work, and why leaving cash tips confuses servers.',
    description:
      'Master Korean table manners before visiting Seoul: flat metal chopsticks, rice spoon etiquette, pouring drinks for elders, free banchan refills, and zero-tipping.',
    category: 'Food & Culture',
    tags: ['Etiquette', 'Korean Food', 'Korea Travel', 'Table Manners'],
    keywords: [
      'Korean dining etiquette',
      'Korean chopstick manners',
      'why Korean chopsticks are flat',
      'tipping in South Korea',
      'Korean drinking etiquette elders',
    ],
    publishedAt: '2026-10-18',
    updatedAt: '2026-11-18',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '🥢',
    accentBg: 'bg-emerald-50',
    featured: true,
    keyTakeaways: [
      'Never lift your rice or soup bowl off the table to eat—in Korea, bowls stay flat while your spoon (sutgarak) brings rice and broth up to you.',
      'Never stick chopsticks upright into a bowl of rice, as this resembles ceremonial incense offerings (jesa) for ancestors.',
      'Side dishes (banchan) and chilled drinking water are complimentary and refillable; check for a "셀프" (Self) station before waving down staff.',
      'South Korea has NO tipping culture—service is included in menu prices, and leaving loose won on a table often leads servers to chase you down thinking you forgot your change.',
    ],
    intro: [
      'Sharing a meal is at the center of Korean hospitality, yet dining rooms in Seoul follow unwritten rhythms that look noticeably different from both Western restaurants and neighboring Japanese or Chinese table customs. Visitors who politely mimic Japanese manners—such as lifting a rice bowl close to their chin—sometimes get surprised glances in Korea without knowing why.',
      'Most Korean dining etiquette isn’t fussy or intimidating once you see the practical logic behind it: communal sharing, smooth table pacing, and showing quiet deference to elders or hosts.',
      'Learn these essentials once and you will feel completely comfortable everywhere from alley kimbap diners to business barbecue dinners.',
    ],
    sections: [
      {
        id: 'chopsticks-and-spoon',
        heading: '1. Flat Metal Chopsticks & Why the Spoon Does Half the Work',
        paragraphs: [
          'First-timers immediately notice two traits about Korean utensils: chopsticks (jeotgarak) are made of stainless steel or brass rather than wood, and they are flat rather than round. Historically rooted in royal brass sets (said to tarnish on contact with certain toxins) and durable hygienic washing, metal chopsticks grip slippery pickled radish slices and braised beans precisely once you rest the lower stick firmly against your ring finger.',
          'Just as important: Korea uses the spoon (sutgarak) far more than Japan or China. Rice and soups are eaten strictly with the spoon, while chopsticks handle side dishes (banchan), noodles, and meat. Never hold both spoon and chopsticks in the same hand at the same time—set your spoon down on your napkin or side plate before picking up chopsticks, and vice versa.',
          'Also check the side of the table before waving at staff: many casual Korean restaurants tuck napkins, extra spoons, and metal chopsticks neatly inside a pull-out drawer built right under the tabletop edge.',
        ],
        table: {
          caption: 'Korean Table Manners Cheat Sheet: Do vs. Don’t',
          headers: ['Situation', 'Expected Custom (Do)', 'Faux Pas to Avoid (Don’t)'],
          rows: [
            ['Eating rice & soup', 'Leave bowls flat on the table and use your metal spoon', 'Lifting rice or soup bowls up to your mouth'],
            ['Resting chopsticks', 'Lay flat beside your bowl or on the paper wrapper/rest', 'Sticking chopsticks vertically upright into rice (funeral/ancestral imagery)'],
            ['Elders at table', 'Wait until the oldest person picks up their spoon to start', 'Digging in first or leaving the table while elders still eat'],
            ['Pouring drinks', 'Hold bottle or glass with two hands when serving/receiving from seniors', 'Pouring one-handed for elders or topping up your own empty glass first'],
            ['Banchan refills', 'Eat what you take and look for a "Self Bar" (셀프 코너)', 'Ordering extra plates then leaving half untouched (food waste)'],
            ['Paying the bill', 'Walk to the counter near the exit after eating (or tap table kiosk)', 'Leaving cash tips on the table'],
          ],
        },
      },
      {
        id: 'drinking-and-hierarchy',
        heading: '2. Soju, Beer & Drinking Etiquette Around Seniors',
        paragraphs: [
          'Drinking culture around Korean barbecue or pojangmacha tents carries clear gestures of respect whenever seniors, older friends, or business hosts sit at the table. Even if nobody expects strict formality from foreign travelers, using two hands automatically wins smiles across Korea.',
          'When pouring soju, makgeolli, or beer for someone older, hold the bottle with both hands—either gripping with your right hand while supporting your right wrist or forearm lightly with your left hand. When someone pours for you, hold your glass with both hands too.',
          'If dining with noticeably older Koreans, turn your head slightly to the side (away from the senior) when taking a sip of alcohol rather than drinking straight toward their face. Wait until your glass is completely empty before accepting a refill—Korean custom prefers topping up an empty glass rather than topping off a half-full one.',
        ],
        callout: {
          tone: 'tip',
          title: 'How to Decline Alcohol Gracefully',
          body: 'If you don’t drink alcohol, there is zero need to force yourself. Say "Jeo sul mot masyeoyo" (저 술 못 마셔요 — "I can’t drink alcohol") or hold up a soft drink/water glass during toasts ("Geonbae!"). Ordering Cider (Korean Sprite) or barley tea keeps the convivial mood intact.',
        },
      },
      {
        id: 'banchan-bells-self-service',
        heading: '3. Call Buttons, Self-Service Water & Banchan Refills',
        paragraphs: [
          'Two modern conveniences confuse tourists inside busy Korean diners. First, don’t wait passively for a waiter to check if you need anything—Korean service avoids hovering. Look on the table edge or wall for a small plastic push-button labeled "호출" or "벨" (Call Bell). Pressing it chimes at the kitchen counter; staff come right over when summoned, or you can calmly say "Yeogiyo!" (여기요 — "Excuse me!").',
          'Second, chilled water and extra side dishes are frequently self-service. Look for stainless-steel water coolers marked "물 셀프" (Water Self) and chilled side-dish counters marked "추가 반찬 셀프" (Extra Banchan Self). Refill small kimchi or pickled radish bowls freely—just take amounts you genuinely plan to finish.',
          'Many modern eateries also mount tablet ordering screens directly at each booth with English, Japanese, and Chinese menus, allowing you to reorder meat or request water without speaking Korean.',
        ],
      },
      {
        id: 'paying-and-tipping',
        heading: '4. Counter Payment & Why Korea Doesn’t Tip',
        paragraphs: [
          'When you finish eating, do not ask for the check at the table unless you are at a Western-style hotel bar. At 95% of Korean restaurants, simply gather your belongings, walk to the front register near the exit, and state your table number or hand over the printed paper receipt placed on your table during the meal.',
          'Do not leave a tip. Value-added tax and service charges are built into the listed menu prices across South Korea. Leaving extra cash beside plates creates awkward confusion because servers assume you accidentally left money behind.',
        ],
        subsections: [
          {
            heading: 'Barbecue Ventilation, Table Scissors & Solo Dining (Honbap)',
            paragraphs: [
              'If you dine at Korean BBQ, pull down the retractable silver exhaust hood roughly 15–20 centimeters above the grill once meat hits the grate, and hang coats or bags inside the hollow barrel stool seat (if available) or slip them inside large plastic garment bags offered by servers so smoke doesn’t cling to jackets.',
              'Expect kitchen scissors (가위, gawi) at nearly every Korean table—not only for cutting thick pork belly and grilled ribs into bite-sized pieces, but also for snipping long buckwheat naengmyeon noodles or whole cabbage kimchi leaves cleanly.',
              'Solo travelers looking for "honbap" (혼밥, eating alone) should stick to single-portion gukbap soup houses, kimbap shops, kalguksu noodle parlors, food courts, or marked 1-person BBQ counters rather than traditional group-only barbecue halls during peak dinner hours.',
            ],
          },
        ],
      },
    ],
    companionCta: {
      eyebrow: 'Culture IQ Challenge',
      title: 'Test Your Korean Etiquette & Custom Smarts',
      description:
        'Try our 30-question Korean Culture IQ Quiz covering dining manners, honorifics, traditional holidays, and everyday local habits.',
      href: '/quiz/korean-culture-iq',
      buttonLabel: 'Play Korean Culture Quiz',
    },
    relatedQuizSlugs: ['korean-culture-iq', 'korean-spicy-food'],
    sources: [
      {
        label: 'Visit Korea (Korea Tourism Organization) — Dining Guide',
        detail: 'Official visitor overview on Korean table settings, tipping policy, and self-service customs.',
        url: 'https://english.visitkorea.or.kr',
      },
      {
        label: 'Korean Food Promotion Institute (KFPI)',
        detail: 'Traditional Hansik utensil history (sutgarak and jeotgarak) and banchan dining structure.',
        url: 'https://www.hansik.or.kr',
      },
    ],
  },
  {
    slug: 'korean-age-honorifics-speech-levels-guide',
    locale: 'en',
    title:
      'Korean Age, Honorifics & Speech Levels (Jondaetmal vs. Banmal) Made Simple',
    subtitle:
      'What changed after South Korea’s 2023 age-standardization law, why birth years still matter in social settings, and how to use -yo endings, -nim, unnie, oppa, hyung, and sunbae correctly.',
    description:
      'Understand South Korea’s 2023 man-nai age system, why birth years still shape Korean honorifics, and how jondaetmal, banmal, unnie/oppa, and -nim work.',
    category: 'Food & Culture',
    tags: ['Korean Language', 'Honorifics', 'Korean Age', 'Etiquette'],
    keywords: [
      'Korean age system 2023 law',
      'jondaetmal vs banmal explained',
      'unnie oppa noona hyung meaning',
      'Korean honorifics beginner guide',
      'why Koreans ask your birth year',
    ],
    publishedAt: '2026-11-01',
    updatedAt: '2026-11-20',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '🙇',
    accentBg: 'bg-indigo-50',
    featured: false,
    keyTakeaways: [
      'In June 2023, South Korea legally standardized official documents and everyday contracts to the international "man-nai" (만 나이) age system, ending the old "+1 or +2 years" confusion on paper.',
      'Socially, Koreans still often compare birth years (e.g., "97-liner" or "00-liner") because Korean grammar requires knowing whether to use polite speech (jondaetmal) or casual speech (banmal).',
      'Never switch to casual banmal with someone you just met—even if they seem younger—unless both sides agree to "drop speech" (mal notgi).',
      'Outside close friends or family, avoid calling strangers "oppa" or "unnie"; default to polite titles like "-ssi", "-nim", or simply calling servers "Sajangnim" or "Yeogiyo".',
    ],
    intro: [
      'Anyone who watches K-Dramas or follows K-Pop interviews quickly encounters a puzzle: a character turns "one year older" on January 1st, two members born three months apart call each other "hyung" or "friend," and a single dropped syllable ("-yo") causes sudden drama on screen.',
      'Korean is not simply polite or rude in tone—relative age and social closeness are wired directly into verb endings and pronouns. Before you can choose the right greeting at a cafe or decode subtle tension in a drama scene, you need two pieces of the puzzle: how Koreans count birth years and how speech levels work.',
      'Here is a straightforward guide to Korean age after the 2023 legal reform, plus practical rules for everyday honorifics.',
    ],
    sections: [
      {
        id: 'korean-age-2023-reform',
        heading: '1. Korean Age After the June 2023 Law Change',
        paragraphs: [
          'Before June 2023, South Korea famously juggled three age systems simultaneously: traditional Korean age ("se-neun nai"—where a newborn started at 1 at birth and added a year every January 1, often making someone 1 to 2 years older than their passport age), "year age" ("yeonna-i"—current year minus birth year, used for military conscription and legal drinking/smoking cutoffs), and international age ("man-nai").',
          'On June 28, 2023, South Korea enacted a major civil law reform standardizing official administrative, medical, and legal age calculations to international "man-nai" (만 나이): you start at 0 at birth and turn one year older strictly on your actual birthday.',
          'Wait—does that mean Koreans stopped asking birth years? Not socially. Drinking eligibility and certain school-cohort thresholds still track calendar year ("year age"), and friends born in the same calendar year (like "97-line" or "2000-line" classmates) continue to treat one another as same-age peers regardless of whether one birthday falls in March and the other in November.',
        ],
        callout: {
          tone: 'note',
          title: 'What "Early-Year Birth" (빠른 년생) Used to Mean',
          body: 'Before 2009 school-cutoff changes, babies born in January or February often entered elementary school a year early with kids born the previous calendar year—which is why some older K-Pop idols born in Jan/Feb 1995 call 1994-liners "friend" rather than "hyung/oppa." Modern cohorts go strictly by calendar year.',
        },
      },
      {
        id: 'jondaetmal-vs-banmal',
        heading: '2. Jondaetmal (Polite) vs. Banmal (Casual Speech)',
        paragraphs: [
          'Every Korean verb ending carries a built-in social stance. As a beginner or traveler, you only need to keep two broad registers clear: jondaetmal (존댓말 — polite, respectful speech) and banmal (반말 — casual, intimate speech).',
          'Jondaetmal typically ends verbs in "-yo" (요, polite conversational) or "-seumnida / -mnida" (습니다/ㅂ니다, formal broadcast/business speech). For instance, "Thank you" is "Gamsahamnida" (감사합니다) or "Gomawoyo" (고마워요). When you speak jondaetmal to waiters, taxi drivers, hotel clerks, or new acquaintances, you are always safe and respectful.',
          'Banmal strips away that "-yo" ending ("Gomawo" = thanks, "Annyeong" = hi/bye). Speaking banmal uninvited to an adult stranger, older peer, or service worker comes across as shockingly rude—similar to snapping fingers or barking orders. In Korean dramas, when two characters finally agree "Shall we speak comfortably?" (말 편하게 할까요?), shifting from jondaetmal to banmal signals genuine friendship or romantic intimacy.',
        ],
      },
      {
        id: 'kinship-and-titles',
        heading: '3. Unnie, Oppa, Noona, Hyung, Sunbae & -Nim',
        paragraphs: [
          'Koreans rarely call anyone older—or even close older friends—by their raw given name alone. Instead, Korean borrows warm family kinship words and professional honorifics depending on the speaker’s own gender and the social setting.',
        ],
        table: {
          caption: 'Essential Korean Honorifics & Titles by Context',
          headers: ['Term (Hangul)', 'Used By → Toward', 'Appropriate Context & Travel Tip'],
          rows: [
            ['Unnie (언니)', 'Female → slightly older female', 'Sisters, close older female friends, or warm casual market clerks (not formal business)'],
            ['Oppa (오빠)', 'Female → slightly older male', 'Older brother, boyfriend, or close male friend (NEVER use for strangers or older bosses)'],
            ['Noona (누나)', 'Male → slightly older female', 'Older sister or close older female friend'],
            ['Hyung (형)', 'Male → slightly older male', 'Older brother or close older male friend / senior teammate'],
            ['-ssi (씨)', 'Anyone → peer / acquaintance', 'Attached to full or given name ("Jimin-ssi"); polite neutral standard for equals'],
            ['-nim (님)', 'Anyone → customer / respected role', 'Highest everyday suffix ("Sonnim" = guest/customer, "Seonsaengnim" = teacher, "Sajangnim" = shop owner)'],
            ['Sunbae / Hoobae (선배 / 후배)', 'School / work / idol industry', 'Senior vs. junior by entry year in a school, office, or debut hierarchy'],
          ],
        },
      },
      {
        id: 'safe-starter-phrases',
        heading: '4. Four Bulletproof Polite Phrases for Any Traveler',
        paragraphs: [
          'Don’t freeze worrying about grammar nuances—native Koreans deeply appreciate visitors who make an effort with polite "-yo" or "-seyo" endings. Memorizing these four expressions handles nearly every sidewalk and shop interaction.',
        ],
        bullets: [
          '"Annyeonghaseyo" (안녕하세요) — Hello / Good morning / Good afternoon (universal polite greeting).',
          '"Kamsahamnida" (감사합니다) — Thank you politely in shops, buses, and restaurants.',
          '"Joesonghamnida" (죄송합니다) or "Sillyehamnida" (실례합니다) — "I’m sorry" / "Excuse me" when squeezing past someone on the subway.',
          '"Yeogiyo" (여기요) or "Juseyo" (주세요) — "Excuse me (over here)" / "Please give me [item]" when ordering politely.',
        ],
      },
      {
        id: 'kpop-group-hierarchy-and-foreign-learner-tips',
        heading: '5. How Age & Respect Play Out Inside K-Pop Groups',
        paragraphs: [
          'Watching K-Pop variety content becomes twice as revealing once you listen for speech levels. Inside seven- or eight-member groups, teammates often span four to six birth years—so a 1997-liner leader uses polite or protective big-brother warmth with a 2001-liner maknae, while younger members naturally call older teammates "hyung" or "unnie" even when joking nonstop.',
          'Occasionally, members born in the same calendar year ("95z" like BTS’s Jimin and V, or "00z" like Stray Kids’ Hyunjin, HAN, Felix, and Seungmin) drop formal titles and speak pure banmal with one another as same-age chingu (친구, friend)—creating noticeably playful, unfiltered banter compared to cross-age pairings. Meanwhile, soloists or actors meeting senior idols in hallways bow slightly while speaking formal "-seumnida" greetings out of industry sunbae/hoobae courtesy.',
        ],
        bullets: [
          'Mistake to avoid with "-ssi": Attaching "-ssi" to a full name ("Kim Nam-joon-ssi") sounds polite yet distant, like "Mr. Kim Nam-joon." Calling a close friend by "-ssi" can sound cold or sarcastic, whereas calling an elder professor or supervisor only by "-ssi" without their title feels disrespectful.',
          'Safe title for business owners & staff: "Sajangnim" (사장님, literally "president/boss") works warmly for small shop owners, cafe managers, market stall cooks, and taxi drivers alike.',
        ],
      },
    ],
    companionCta: {
      eyebrow: 'Interactive Culture Quiz',
      title: 'How High Is Your Korean Etiquette & Culture IQ?',
      description:
        'Test yourself on Korean age rules, speech levels, gift-giving customs, and everyday social habits across 30 explained questions.',
      href: '/quiz/korean-culture-iq',
      buttonLabel: 'Start Culture IQ Quiz',
    },
    relatedQuizSlugs: ['korean-culture-iq'],
    sources: [
      {
        label: 'Ministry of Government Legislation (South Korea)',
        detail: 'Official guidance on the June 28, 2023 Man-nai (international age) standardization act.',
        url: 'https://www.moleg.go.kr/english/',
      },
      {
        label: 'National Institute of Korean Language (NIKL)',
        detail: 'Standard Korean honorific classifications and standard speech etiquette references.',
        url: 'https://www.korean.go.kr/front_eng/main.do',
      },
    ],
  },
  {
    slug: 'seoul-street-food-gwangjang-myeongdong-guide',
    locale: 'en',
    title:
      'Gwangjang Market vs. Myeongdong Street Food Guide: Must-Try Dishes, Prices & Korean Phrases',
    subtitle:
      'Compare Seoul’s two most famous street-food destinations—a century-old covered market versus a lively neon pedestrian strip—with realistic budgets, cash rules, and exact dishes to order.',
    description:
      'Compare Gwangjang Market and Myeongdong street food in Seoul: signature snacks, typical KRW prices, cash vs card rules, seating tips, and ordering phrases.',
    category: 'Food & Culture',
    tags: ['Street Food', 'Seoul', 'Gwangjang Market', 'Myeongdong'],
    keywords: [
      'Gwangjang Market vs Myeongdong street food',
      'Gwangjang Market must eat prices',
      'Myeongdong night market food guide',
      'Seoul street food cash or card',
      'Korean street food phrases',
    ],
    publishedAt: '2026-11-12',
    updatedAt: '2026-11-22',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '🥟',
    accentBg: 'bg-amber-50',
    featured: false,
    keyTakeaways: [
      'Gwangjang Market (Jongno-gu) is a historic daytime covered market best for seated traditional meals—bindaetteok mung-bean pancakes, knife-cut kalguksu noodles, and mayak gimbap.',
      'Myeongdong Night Street Food (Jung-gu) comes alive from roughly 4:30 PM onward with portable handheld snacks—sweet hotteok pancakes, egg bread (gyeranppang), and spicy skewers.',
      'Carry KRW cash (₩1,000, ₩5,000, and ₩10,000 bills) for small street carts and market stalls, as many mobile carts cannot process foreign cards.',
      'Check posted menu prices before ordering and finish food near the stall trash bags rather than walking into clothing stores with saucy skewers.',
    ],
    intro: [
      'Ask ten Seoul travelers where to try Korean street food first and nine will name either Gwangjang Market or Myeongdong. Though often lumped together on itinerary checklists, the two places deliver completely different dining experiences—and visiting them at the wrong time of day leaves visitors disappointed.',
      'Gwangjang Market, established in 1905 near Jongno 5-ga, is a bustling all-weather arcade where grandmothers ladle steaming anchovy broth and fry golden mung-bean pancakes right beside narrow wooden benches. Myeongdong, by contrast, is a sleek pedestrian cosmetics-and-fashion grid where glowing food carts roll out onto the pavement in the late afternoon.',
      'Knowing what each specializes in, how much individual dishes realistically cost, and when cash is mandatory lets you enjoy both like a local.',
    ],
    sections: [
      {
        id: 'market-comparison',
        heading: '1. Gwangjang Market vs. Myeongdong at a Glance',
        paragraphs: [
          'The easiest way to schedule both without duplicating food is visiting Gwangjang Market for an early lunch (around 11:00 AM–1:30 PM, before peak tour crowds pack the center aisle) and wandering Myeongdong’s food carts after 5:30 PM while shopping.',
        ],
        table: {
          caption: 'Side-by-Side Guide: Gwangjang Market vs. Myeongdong Food Carts',
          headers: ['Feature', 'Gwangjang Market (광장시장)', 'Myeongdong Street Food (명동)'],
          rows: [
            ['Subway Access', 'Line 1 Jongno 5-ga Exit 8 / Line 2 Euljiro 4-ga Exit 4', 'Line 4 Myeongdong Exit 6 or 7'],
            ['Peak Hours', '10:30 AM – 6:30 PM (many sit-down stalls close by 8 PM)', '4:30 PM – 10:30 PM nightly'],
            ['Dining Style', 'Seated wooden benches at covered counter stalls', 'Standing / walking handheld paper cups & skewers'],
            ['Signature Dishes', 'Bindaetteok, Kalguksu, Mayak Gimbap, Yukhoe, Tteokbokki', 'Hotteok, Gyeranppang, Tteokbokki, Tornado Potato, Bungeoppang'],
            ['Payment & Budget', 'Cash + some cards; ~₩8,000 – ₩15,000 fills you up', 'Mostly KRW cash; ~₩3,000 – ₩7,000 per snack'],
          ],
        },
      },
      {
        id: 'gwangjang-must-eats',
        heading: '2. What to Eat at Gwangjang Market (Featured on Variety & K-Pop Missions)',
        paragraphs: [
          'Gwangjang Market sits along the Cheonggyecheon stream in central Jongno and regularly hosts K-Pop variety food missions—including Stray Kids’ memorable street-food episodes. Rather than sticking only to the busiest central intersection, walk down the quieter side arcades for identical traditional recipes with shorter waits.',
        ],
        bullets: [
          'Nokdu Bindaetteok (녹두빈대떡 — Crispy Mung-Bean Pancake, ~₩5,000–₩7,000): Ground mung beans fried thick in a cast-iron skillet with bean sprouts and kimchi until lacy and crisp outside. Often paired with meat-filled Wanja.',
          'Mayak Gimbap (마약김밥 — Bite-Size Seaweed Rice Rolls, ~₩3,500–₩4,000): Mini gimbap filled simply with carrot, spinach, and pickled radish, dipped into punchy sweet-soy mustard sauce.',
          'Kalguksu & Mandu (칼국수 — Hand-Cut Knife Noodles & Dumplings, ~₩7,000–₩9,000): Fresh wheat noodles sliced by hand and boiled in rich anchovy or beef broth with plump steamed dumplings.',
          'Tteokbokki & Sundae (떡볶이 & 순대, ~₩4,000–₩6,000): Thick cylindrical rice cakes simmered in sweet-spicy gochujang glaze, traditionally ordered alongside chewy glass-noodle blood sausage or crunchy fried mandu.',
        ],
        callout: {
          tone: 'tip',
          title: 'Check Displayed Price Boards & Seating',
          body: 'Look for clear printed price menus posted at eye level above the stall counter before sitting down. Many stalls welcome solo diners happily; simply point to the posted dish name and hold up one finger ("Hana juseyo" = one, please).',
        },
      },
      {
        id: 'myeongdong-snacks',
        heading: '3. Best Handheld Snacks in Myeongdong (Plus Kalguksu Bonus)',
        paragraphs: [
          'In Myeongdong, street carts target quick grazing while you browse K-Beauty shops and K-Pop album basements. Because tourist crowds run dense, prices per skewer run slightly higher than outer-district markets—aim for classic Korean snacks rather than oversized novelty lobster tails.',
        ],
        bullets: [
          'Hotteok (호떡 — Cinnamon Brown Sugar Griddle Pancake, ~₩2,000–₩3,000): Yeasted dough stuffed with dark brown sugar, cinnamon, and crushed walnuts, pressed flat on oiled griddles. Bite carefully—the molten syrup inside burns!',
          'Gyeranppang (계란빵 — Warm Egg Bread, ~₩2,000–₩3,000): Slightly sweet, savory mini loaf baked with a whole warm egg inside—especially comforting in autumn and winter.',
          'Odeng / Eomuk (어묵 — Fish Cake Skewers, ~₩1,500–₩2,000): Folded fish cakes simmered in steaming radish broth; grab a small paper cup of free hot broth right beside the pot.',
          'Sit-down classic nearby: Walk 3 minutes off the cart strip to Myeongdong Kyoja Main Branch (29 Myeongdong 10-gil) for legendary silky chicken-broth kalguksu noodles and garlic kimchi (~₩11,000; pay upon ordering).',
        ],
      },
      {
        id: 'cash-trash-phrases',
        heading: '4. Practical Rules: Cash, Trash Bags & Polite Phrases',
        paragraphs: [
          'Even though 99% of brick-and-mortar Seoul cafes are practically cashless, street carts and small traditional market counters rely heavily on KRW cash (and domestic bank-app QR transfers unavailable to tourists). Stop at a convenience store or bank ATM to withdraw ₩30,000–₩50,000 in ₩10,000 notes before heading to either market.',
          'Never walk into Olive Young or clothing boutiques while holding messy spicy tteokbokki cups or dripping skewers. Eat beside the cart—virtually every Myeongdong vendor hangs a small black trash bag or cup-collection bin right at the corner of their stall—and use a wet wipe afterward.',
        ],
        bullets: [
          '"Eolmayeyo?" (얼마예요?) — "How much is it?"',
          '"Hana juseyo." (하나 주세요) — "One, please."',
          '"Yeogiseo meogeo doeyo?" (여기서 먹어도 돼요?) — "Can I eat here?" (Good when pointing at bench seats.)',
          '"Po-jang haejuseyo." (포장 해주세요) — "Please pack it to go."',
        ],
      },
      {
        id: 'seasons-and-dietary-notes',
        heading: '5. Seasonal Street Snacks & Dietary Notes (Seafood, Pork & Spicy Broth)',
        paragraphs: [
          'Seoul’s street-cart menus shift noticeably with the weather. From November through March, golden carp-shaped bungeoppang pastries (filled with sweet red bean paste or warm custard cream) and steamed custard hoppang buns pop up outside subway exits alongside paper cups of clear odeng broth. During humid summer months, street carts pivot toward fresh watermelon/pineapple skewers, iced green-grape ade, and shaved-ice patbingsu topped with sweetened red beans and chewy rice cake cubes.',
          'Travelers following halal, vegetarian, or shellfish-free diets should read market broth ingredients carefully before grabbing skewers. Even mildly flavored clear fish-cake broth and kimchi frequently contain anchovy stock, shrimp paste (saeujeot), or clams, while traditional sundae and meat mandu use pork. Vegetarian-friendly picks at both Gwangjang and Myeongdong include sweet walnut/brown-sugar hotteok, plain egg bread (check whether bacon toppings are optional), sweet-potato tornado snacks, and fresh fruit cups.',
        ],
      },
    ],
    companionCta: {
      eyebrow: 'Find Your Food Match',
      title: 'Which Korean Comfort Food Matches Your Personality?',
      description:
        'Discover whether your vibe matches Crispy Bindaetteok, Spicy Tteokbokki, Samgyeopsal, or Kimchi Jjigae—then check our Seoul Map spots.',
      href: '/quiz/which-korean-food-are-you',
      buttonLabel: 'Take the Korean Food Quiz',
    },
    relatedQuizSlugs: ['korean-spicy-food', 'which-korean-food-are-you'],
    sources: [
      {
        label: 'Visit Seoul — Gwangjang Market & Myeongdong Guides',
        detail: 'Subway exits, traditional arcade history (founded 1905), and market hours.',
        url: 'https://english.visitseoul.net',
      },
      {
        label: 'Seoul Tourism Organization — Street Food Safety & Etiquette',
        detail: 'Transparent pricing initiatives and waste disposal guidelines in tourist shopping zones.',
      },
    ],
  },
  {
    slug: 'korean-convenience-store-food-guide-cu-gs25',
    locale: 'en',
    title:
      'Korean Convenience Store (CU, GS25 & 7-Eleven) Food Guide: Iced Drinks, Gimbap Tricks & Han River Ramyeon',
    subtitle:
      'How Korea’s 24-hour convenience stores double as late-night kitchens—including the 1-2-3 triangle gimbap peel, 1+1 discount rules, Han River induction ramen machines, and viral idol combos.',
    description:
      'Master Korean convenience stores (CU, GS25, 7-Eleven, Emart24): 1+1 promo rules, opening triangle gimbap, pouch iced drinks, Han River ramen machines, and etiquette.',
    category: 'Food & Culture',
    tags: ['Convenience Store', 'Korean Food', 'Budget Travel', 'Seoul'],
    keywords: [
      'Korean convenience store food guide',
      'CU GS25 7-Eleven Korea',
      'how to open triangle gimbap',
      'Han River ramen machine guide',
      'Korean convenience store 1+1 rule',
    ],
    publishedAt: '2026-11-19',
    updatedAt: '2026-11-25',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '🏪',
    accentBg: 'bg-sky-50',
    featured: false,
    keyTakeaways: [
      'South Korea’s four major chains—CU, GS25, 7-Eleven, and Emart24—pack fresh daily lunchboxes, hot water dispensers, microwaves, and T-Money kiosks on nearly every city block.',
      'For "1+1" (buy one get one) or "2+1" tags, you MUST physically bring all two or three items up to the cash register; leaving the free extra behind still charges regular price.',
      'Open triangle gimbap (samgak gimbap) strictly in 1-2-3 numbered order so crisp seaweed wraps smoothly around seasoned rice without tearing.',
      'Convenience stores along Hangang Parks (Yeouido, Banpo, Nodeul Island) stock foil ramen bowls made specifically for outdoor induction cookers—never put metallic foil bowls inside a microwave.',
    ],
    intro: [
      'In Seoul, you are rarely more than a two-minute walk from glowing blue, purple, green, or gold convenience-store signage. Known locally as "pyeonuijeom" (편의점), South Korea’s 24-hour stores operate less like basic corner gas marts and more like ultra-efficient neighborhood pantries, snack bars, ATM booths, and picnic prep stations rolled into one.',
      'Whether you arrive late after an international flight into Incheon, need an affordable ₩4,000 breakfast before riding the subway, or plan to join locals cooking bubbling noodles along the Han River at dusk, learning a handful of local pyeonuijeom habits unlocks half the fun of Korean street culture.',
      'Here is how the major chains compare, what everyday items realistically cost, how to unwrap tricky packaging cleanly, and which viral idol combos are actually worth ordering.',
    ],
    sections: [
      {
        id: 'chains-and-promo-rules',
        heading: '1. Korea’s Big Four Chains & How "1+1" / "2+1" Tags Actually Work',
        paragraphs: [
          'Four nationwide chains dominate Korean blocks: CU (purple-and-green, strong bakery/dessert collaborations and iconic Yonsei Cream Bread), GS25 (sky-blue, famous for rich "Youus" house-brand meals and viral idol snack tie-ins), 7-Eleven (ubiquitous across Jongno and tourism hubs), and Emart24 (deep golden-yellow, stocked with popular "No Brand" budget snacks).',
          'Because stores refresh refrigerator shelves multiple times a day via cold-chain trucks, short-dated bento meals and sandwiches taste remarkably fresh—even at 2:00 AM. Look closely at shelf price tags before checking out: yellow or red "1+1" and "2+1" stickers signal promotional bundles that rotate on the first day of every month.',
        ],
        callout: {
          tone: 'tip',
          title: 'Do Not Leave the Free "1+1" Item on the Shelf',
          body: 'Unlike Western supermarkets that automatically discount a single bottle by 50%, Korean convenience stores require you to carry BOTH items (for 1+1) or ALL THREE items (for 2+1) up to the register—the POS system deducts the free unit only when all barcodes scan together. Watch for "교차 가능" (mix-and-match allowed) tags if you want different flavors!',
        },
      },
      {
        id: 'staples-and-prices-table',
        heading: '2. Essential Korean Convenience Store Staples & Realistic Prices',
        paragraphs: [
          'Eating well inside CU or GS25 costs a fraction of sit-down dining, making these shelves a lifesaver between sightseeing stops or late after concerts.',
        ],
        table: {
          caption: 'Top Korean Convenience Store Items: Realistic KRW Prices & Prep Tips',
          headers: ['Item (Korean Name)', 'Typical KRW Price', 'How to Prepare / Serve', 'Visitor Favorite Pick'],
          rows: [
            ['Samgak Gimbap (삼각김밥)', '₩1,200 – ₩1,800', 'Peel 1-2-3 wrapper; eat cold or microwave 15s', 'Tuna Mayo (참치마요) or Jeonju Bibim'],
            ['Pouch Drink + Ice Cup (파우치 음료)', '₩1,800 – ₩2,800 total', 'Grab sealed ice cup from freezer + pour foil pouch', 'Iced Americano, Peach Iced Tea, Ade'],
            ['Dosirak Meal Box (도시락)', '₩4,900 – ₩6,500', 'Remove lid/sauce packet; microwave 1m 30s – 2m', 'Pork Bulgogi or Baek Jong-won series'],
            ['Cup / Foil Pack Ramyeon (라면)', '₩1,200 – ₩4,500', 'Store hot water tap OR Han River foil induction', 'Shin Ramyun, Jin Mild, Buldak Cream Carbo'],
            ['Binggrae Banana Milk (바나나맛 우유)', '₩1,700 – ₩1,800', 'Peel foil cap & sip chilled with thin straw', 'Original yellow bottle (plus Strawberry/Melon)'],
            ['Cup Tteokbokki / Crispy Chicken', '₩3,000 – ₩4,500', 'Add sauce + splash water; microwave ~2m', 'Giant Tteokbokki + mozzarella string cheese'],
            ['Winter Hoppang / Sweet Potato', '₩1,500 – ₩2,500', 'Ask cashier or grab warm from heated glass case', 'Red bean or pizza hoppang; baked goguma'],
          ],
        },
      },
      {
        id: 'triangle-gimbap-and-pouch-drinks',
        heading: '3. Mastering Triangle Gimbap (1-2-3 Peel) & Pouch Iced Drinks',
        paragraphs: [
          'Two iconic convenience-store rituals trip up nearly every first-timer until someone demonstrates them once. First is triangle gimbap (samgak gimbap)—a plump rice pyramid kept separated from toasted gim seaweed by a thin plastic sleeve so the nori stays crisp rather than soggy.',
          'Look at the bright number "1" printed at the top tip of the triangle. Pull that tab straight down the back seam all the way around the bottom crease without unwrapping the sides yet. Next, hold the top rice triangle firmly with one hand while sliding tab "2" gently outward to the left, then slide tab "3" outward to the right. The plastic slips cleanly away, leaving a crisp, unbroken seaweed triangle in your palm.',
          'Second is Korea’s beloved iced pouch corner. Beside chilled juice fridges sits a sliding-door upright freezer stacked with plastic cups filled with solid clear ice cubes (in Regular and large "Venti" sizes) paired with colorful liquid drink pouches—from hazelnut coffee and sweet black Americano to green-grape ade and pomegranate iced tea. Pay for both the pouch and matching cup size at the counter, peel the cup’s foil seal, tear open the pouch spout, and pour!',
        ],
      },
      {
        id: 'han-river-ramyeon-and-combos',
        heading: '4. Han River Ramyeon Machines & Viral Idol Snack Combos',
        paragraphs: [
          'One unforgettable Seoul evening tradition happens inside CU, GS25, and 7-Eleven kiosks built along Hangang River parks—including Yeouido, Banpo, Ttukseom, and Nodeul Island. At the register, purchase a "Han River Ramyeon" combo (typically ₩3,500–₩4,500, bundling a noodle packet, seasoning, disposable chopsticks, and a specially coated aluminum-foil paper bowl).',
          'Carry your bowl outside to the row of digital induction stations along the park terrace. Pour noodles and seasoning flakes inside the dry foil bowl, scan its barcode (or select standard vs. cheese soup buttons depending on the machine), and set the bowl squarely atop the heating ring. The machine dispenses the exact measured hot water automatically and boils for roughly four minutes—watch closely so broth doesn’t boil over before topping it with raw egg or sliced cheese!',
          'Inside city stores, fans also love assembling three classic convenience-store mashups:',
        ],
        bullets: [
          '"Mark’s Meal" (마크정식 — GOT7 fan-born classic): Combine Giant Tteokbokki with instant Spaghetti cup noodles, chopped convenience-store sausage, and shredded mozzarella cheese for a creamy, savory-spicy feast.',
          'Buldak Taming Combo: Pair spicy Carbonara or Original Buldak noodles with a ₩1,500 tuna-mayo triangle gimbap, two sticks of string cheese, and a carton of Binggrae Banana Milk on the side.',
          '"Ashotchu" (아샷추 — Peach Iced Tea + Espresso Shot): Buy one Lipton/peach iced tea pouch plus one chilled espresso shot pouch and pour both into a large Venti ice cup for a crisp, sweet caffeine kick.',
        ],
      },
      {
        id: 'etiquette-trash-and-tmoney',
        heading: '5. Store Seating, Trash Sorting & T-Money Services',
        paragraphs: [
          'Not every neighborhood store allows cooking ramyeon inside—compact city branches sometimes restrict hot water to cup noodles only or lack seating counters during late hours. Check for small window bar stools or outdoor plastic tables before peeling lids open, and note that under South Korean convenience-store regulations, drinking alcohol is permitted only at clearly marked exterior tables or designated store zones rather than walking down sidewalks.',
          'Equally handy: practically every CU, GS25, and 7-Eleven sells physical T-Money transit cards (~₩3,000–₩5,000 empty) and reloads cash onto existing T-Money cards right at the cashier counter in seconds. Simply lay your card and KRW bills on the small counter tray and say "Chung-jeon haejuseyo" (충전 해주세요 — "Please top up").',
        ],
        callout: {
          tone: 'etiquette',
          title: 'Always Drain Leftover Broth & Ice Before Trashing',
          body: 'Korean convenience stores sort waste strictly into liquids, plastics, cans, and general wrappers. Never toss a half-full ice cup or noodle soup bowl straight into a dry trash bag—pour leftover ice and broth down the small metal strainer sink built into the bin station first, rinse lightly if needed, and stack empty plastic cups neatly.',
        },
      },
    ],
    companionCta: {
      eyebrow: 'Korean Food Personality',
      title: 'Which Korean Comfort Food Matches Your Vibe?',
      description:
        'Find out whether your personality matches Spicy Tteokbokki, Savory Samgyeopsal, Warm Kimchi Jjigae, or Crispy Bindaetteok in under two minutes.',
      href: '/quiz/which-korean-food-are-you',
      buttonLabel: 'Take the Korean Food Quiz',
    },
    relatedQuizSlugs: ['which-korean-food-are-you', 'korean-spicy-food'],
    sources: [
      {
        label: 'Visit Korea (Korea Tourism Organization) — Convenience Store Guide',
        detail: 'Overview of Korean convenience store food prep, T-Money top-up services, and 1+1 discounts.',
        url: 'https://english.visitkorea.or.kr',
      },
      {
        label: 'Seoul Metropolitan Government — Hangang Park Visitor Facilities',
        detail: 'Guidelines on riverside park convenience stores, waste sorting, and picnic zones.',
        url: 'https://english.seoul.go.kr',
      },
    ],
  },
  {
    slug: 'korean-cafe-culture-iced-americano-ordering-guide',
    locale: 'en',
    title:
      'Korean Cafe Culture Guide: Iced Americano ("Eoljuka"), Kiosk Ordering, Desserts & Seoul Neighborhoods',
    subtitle:
      'Why South Korea runs on iced coffee in sub-zero winters, how to decode Korean specialty cafe menus, what to press on touchscreen kiosks, and which Seoul neighborhoods define modern cafe design.',
    description:
      'Navigate Korean cafe culture like a local: why Koreans love Iced Americano ("eoljuka"), menu translations, kiosk dine-in rules, Seoul cafe districts, and 1-drink etiquette.',
    category: 'Food & Culture',
    tags: ['Korean Cafes', 'Coffee Culture', 'Seoul', 'Etiquette'],
    keywords: [
      'Korean cafe culture guide',
      'why Koreans drink iced americano winter',
      'eoljuka meaning Korea',
      'Korean cafe ordering phrases',
      'best cafe neighborhoods Seoul',
    ],
    publishedAt: '2026-11-22',
    updatedAt: '2026-11-25',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '🧋',
    accentBg: 'bg-amber-50',
    featured: false,
    keyTakeaways: [
      'Seoul supports two distinct cafe tiers side by side: mega-value takeout chains (Mega Coffee, Compose, Paik’s) selling giant Iced Americanos for ₩1,500–₩2,000, and architectural dessert cafes averaging ₩6,000–₩8,500 per cup.',
      'Koreans joke proudly about "Eoljuka" (얼죽아 — freezing to death yet drinking Iced Americano) because crisp chilled coffee cuts post-lunch heaviness fast.',
      'At ordering kiosks, always distinguish between "매장" (Dine-in, served in reusable glass or ceramic mugs) and "포장" (Takeout in disposable cups).',
      'Respect the "1인 1메뉴" (one drink per person) rule inside seated cafes and clear your own tray to the Return Zone before leaving.',
    ],
    intro: [
      'Take ten steps down almost any side street in Seoul—from corporate Yeouido office towers to narrow residential hills in Mapo—and you pass three coffee shops before reaching the corner crosswalk. With tens of thousands of cafes packed across South Korea, coffee spaces function far beyond morning caffeine stops: they serve as living rooms for cramped apartment dwellers, quiet study halls for university students, meeting spots for friends, and curated architectural galleries.',
      'Yet stepping inside your first Korean cafe brings subtle surprises. Touchscreen ordering kiosks rarely pause for small talk, drink names mix English loanwords with playful Korean acronyms, and customers wearing heavy winter puffers happily clutch frost-rimmed cups of Iced Americano even during January snowstorms.',
      'Decoding Korean cafe slang, menu favorites, neighborhood personalities, and unspoken table manners lets you order comfortably in seconds.',
    ],
    sections: [
      {
        id: 'eoljuka-and-two-tier-cafes',
        heading: '1. The "Eoljuka" (얼죽아) Phenomenon & Two-Tier Cafe Scene',
        paragraphs: [
          'Perhaps the single funniest Korean coffee idiom for visitors is "Eoljuka" (얼죽아)—short for "얼어 죽어도 아이스 아메리카노" ("Iced Americano even if I freeze to death"). Walk outside Gangnam Station in minus-five-degree winter wind and half of Seoul’s office workers still carry tall iced coffees rather than hot mugs. Locals favor Iced Americano (nicknamed simply "Ah-Ah", 아아) because it goes down fast during tight lunch breaks, refreshes palates after garlicky stews or barbecue, and never burns your tongue before jumping back onto a warm heated subway car.',
          'Behind that obsession sits a dramatic two-tier industry. On one side stand hyper-efficient budget takeout chains—Mega MGC Coffee, Compose Coffee, and Paik’s Coffee—serving oversized 24-ounce Iced Americanos for ₩1,500 to ₩2,000 outside practically every subway exit. On the opposite side thrive multi-story design cafes and concept bakeries charging ₩6,000 to ₩8,500 per signature latte because you are also paying for sculptural interiors, natural sunlight, plush seating, and hours of relaxed conversation.',
        ],
      },
      {
        id: 'korean-cafe-menu-table',
        heading: '2. Decoding a Korean Cafe Menu (Drinks & Bakery Classics)',
        paragraphs: [
          'Even when menus include English subtitles, several Korean cafe signatures don’t translate literally without context. Use the guide below to order with confidence.',
        ],
        table: {
          caption: 'Korean Cafe Menu Essentials: Hangul, Flavor Profile & Realistic Prices',
          headers: ['Menu Item (Hangul)', 'What It Actually Is', 'Typical KRW Price'],
          rows: [
            ['Iced Americano / "Ah-Ah" (아이스 아메리카노)', 'Double espresso over cold water & ice (ask "yeonhage" for lighter roast)', '₩1,500 (budget) – ₩6,000 (indie)'],
            ['Einspanner (아인슈페너)', 'Rich espresso or latte topped with thick chilled whipped sweet cream', '₩5,500 – ₩7,000'],
            ['Ashotchu (아샷추)', 'Sweet iced peach tea topped with a crisp espresso shot ("ah-shot-chu")', '₩3,000 – ₩5,000'],
            ['Misugaru / Grain Latte (미숫가루 라떼)', 'Nutty roasted multi-grain powder shaken into sweet chilled milk', '₩4,500 – ₩6,000'],
            ['Sogeum-ppang / Salt Bread (소금빵)', 'Crispy-bottomed butter roll baked around salted butter and flaky sea salt', '₩3,000 – ₩4,500'],
            ['Bingsu (빙수 · 인절미 / 망고)', 'Snow-fine shaved milk ice topped with roasted soybean powder, mochi, or mango', '₩11,000 – ₩18,000 (shareable)'],
            ['Croffle & Yakgwa Desserts (크로플 · 약과)', 'Croissant dough waffle-pressed crisp, or honey-glazed traditional pastry cookies', '₩4,000 – ₩6,000'],
          ],
        },
      },
      {
        id: 'kiosk-ordering-and-phrases',
        heading: '3. Kiosk Ordering, Vibrating Pagers & Essential Korean Phrases',
        paragraphs: [
          'At budget chains and busy city bakeries, staff often point customers toward a tall touchscreen kiosk near the doorway (switchable via an English flag icon in the corner). Pay careful attention to the very first screen prompt: "매장" (Maejang — Eating inside) versus "포장" (Pojang — Takeout). Because South Korea strictly regulates single-use plastics for seated patrons, selecting Dine-in serves your iced drink in a reusable glass or ceramic cup; never select Dine-in if you intend to walk out the door five minutes later.',
          'Once paid, check your paper receipt for your order number—or, at larger cafes, pick up the palm-sized vibrating disc pager ("진동벨", jindongbel) handed to you. When it buzzes and flashes red, carry the buzzer back to the pickup counter to collect your tray.',
        ],
        bullets: [
          '"Aiseu Amerikano han jan juseyo." (아이스 아메리카노 한 잔 주세요) — "One Iced Americano, please."',
          '"Yeogiseo meokgo galgeyo." (여기서 먹고 갈게요) — "I’ll have it here (dine-in)."',
          '"Pojang haejuseyo." (포장 해주세요) — "To go, please."',
          '"Hwajangsil bimilbeonho mwoyeyo?" (화장실 비밀번호 뭐예요?) — "What is the restroom passcode?" (Many cafe receipts print a 4-digit restroom door code right at the bottom!)',
        ],
      },
      {
        id: 'four-seoul-cafe-districts',
        heading: '4. Seoul’s Four Distinct Cafe Neighborhoods',
        paragraphs: [
          'If you love exploring neighborhoods by aesthetic mood, Seoul separates its cafe culture neatly across four signature districts:',
        ],
        subsections: [
          {
            heading: 'Seongsu-dong & Yeonnam-dong (Industrial Chic vs. Indie Alleyways)',
            paragraphs: [
              'Seongsu-dong—often dubbed Seoul’s Brooklyn—converts former brick shoe factories and mechanic warehouses into soaring sun-drenched roasteries and flagship bakery spaces near Line 2 Seongsu and Ttukseom stations.',
              'Over in Mapo-gu beside Hongik University Exit 3, Yeonnam-dong (and neighboring Hapjeong/Yongsan alleys) packs cozy two-story pastel townhouses, specialty cheesecake shops, and rotating K-Pop idol birthday cup-sleeve cafes along leafy park paths.',
            ],
          },
          {
            heading: 'Ikseon-dong / Seochon & Apgujeong Dosan (Traditional Wood vs. Avant-Garde)',
            paragraphs: [
              'North of Jongno, century-old hanok courtyards in Ikseon-dong and Seochon wrap glass skylights over curved tiled roofs for tranquil roasted-tea lattes and soufflé pancakes. Across the river in Apgujeong Rodeo and Cheongdam, sculptural dessert galleries like Nudake inside HAUS DOSAN treat pastries like museum installations.',
            ],
          },
        ],
      },
      {
        id: 'unspoken-cafe-etiquette',
        heading: '5. Unspoken Korean Cafe Rules: One Drink Per Person & Tray Returns',
        paragraphs: [
          'While Koreans regularly leave laptops, wallets, or phones on a table for two minutes while stepping up to use the restroom—a famous sign of low petty-theft rates—cafes still maintain clear house rules so seats turn over fairly in dense neighborhoods.',
          'Check counter signs before settling in for a two-hour remote work session: some quiet neighborhood roasteries hang small "No Study Zone" (노스터디존) or "Wi-Fi / Outlet Limit 2 Hours" stickers near power strips to keep tables available for socializing guests.',
        ],
        callout: {
          tone: 'etiquette',
          title: 'Respect "1인 1메뉴" (One Drink Per Guest) & Return Your Tray',
          body: 'Virtually every Korean cafe expects "1인 1메뉴" (il-in il-menyu)—one beverage ordered per seated person, rather than two guests sharing one latte while occupying a table. When finished, do not leave cups on the table; carry your tray to the "Return / 반납" counter, pour leftover liquid into the sink drain, and slide dirty glassware onto the rack.',
        },
      },
    ],
    companionCta: {
      eyebrow: 'Everyday Culture Test',
      title: 'Test Your Korean Culture & Daily Etiquette IQ',
      description:
        'Challenge yourself on everyday Korean manners, cafe customs, honorifics, and local travel habits across 30 explained questions.',
      href: '/quiz/korean-culture-iq',
      buttonLabel: 'Play Korean Culture Quiz',
    },
    relatedQuizSlugs: ['korean-culture-iq', 'which-korean-food-are-you'],
    sources: [
      {
        label: 'Visit Seoul — Seoul Cafe & Dessert Districts Guide',
        detail: 'Neighborhood overviews for Seongsu-dong, Yeonnam-dong, Ikseon-dong, and Apgujeong Rodeo.',
        url: 'https://english.visitseoul.net',
      },
      {
        label: 'Visit Korea (Korea Tourism Organization) — Korean Coffee & Dessert Culture',
        detail: 'Overview of Korean cafe menu favorites (bingsu, grain lattes) and visitor ordering norms.',
        url: 'https://english.visitkorea.or.kr',
      },
      {
        label: 'Ministry of Environment (Republic of Korea)',
        detail: 'Regulations restricting single-use disposable cups for seated dine-in cafe guests.',
      },
    ],
  },
];
