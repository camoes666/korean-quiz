import type { EditorialArticle } from '../../types/article';

export const TRAVEL_ARTICLES: EditorialArticle[] = [
  {
    slug: 'bts-seoul-1-day-pilgrimage-itinerary',
    locale: 'en',
    title:
      'Complete 1-Day BTS Seoul Itinerary: HYBE Yongsan, Yoojung Sikdang, Gold Pig BBQ & Gyeongbokgung',
    subtitle:
      'A practical, subway-first route linking BTS’s agency headquarters, trainee-era dining rooms, and royal palace stage with real walking times, waiting strategies, and etiquette tips.',
    description:
      'Plan a smooth 1-day BTS Seoul itinerary covering HYBE Yongsan, Yoojung Sikdang, Geumdwaeji Sikdang (Gold Pig BBQ), and Gyeongbokgung Palace with subway exits and budgets.',
    category: 'Korea Travel',
    tags: ['BTS', 'Seoul', 'Itinerary', 'K-Pop Map'],
    keywords: [
      'BTS Seoul itinerary',
      'HYBE Yongsan visit guide',
      'Yoojung Sikdang BTS',
      'Geumdwaeji Sikdang BTS',
      'Gyeongbokgung BTS IDOL',
    ],
    publishedAt: '2026-10-02',
    updatedAt: '2026-11-18',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '🚇',
    accentBg: 'bg-purple-50',
    featured: true,
    keyTakeaways: [
      'Run the route west-to-north: Yongsan (morning coffee) → Nonhyeon (early lunch at Yoojung Sikdang) → Yaksu (mid-afternoon Gold Pig BBQ queue) → Gyeongbokgung Palace (late-afternoon golden hour).',
      'Use Naver Map or KakaoMap instead of Google Maps for subway exits and walking transfers between Hangang-daero, Hakdong, and Yaksu.',
      'Geumdwaeji Sikdang does not accept advance reservations; register on the CatchTable tablet outside the door or arrive 45 minutes before meal rushes.',
      'HYBE Yongsan is a working corporate office with no public museum or interior tour—plan photos from the public sidewalk and spend time in the surrounding Sinyongsan cafe alley.',
    ],
    intro: [
      'Most first-time visitors who try to see every BTS landmark in Seoul in a single day make the same mistake: they zigzag across the Han River during rush hour and spend two hours waiting outside a barbecue restaurant after missing the lunch cutoff. Seoul’s metro network is remarkably punctual, yet the city rewards travelers who group stops by line transfer logic rather than fandom chronology.',
      'This one-day itinerary sequences four verified public landmarks—HYBE’s Yongsan headquarters, pre-debut diner Yoojung Sikdang in Nonhyeon-dong, Michelin Bib Gourmand favorite Geumdwaeji Sikdang (Gold Pig BBQ) near Yaksu, and Geunjeongjeon courtyard inside Gyeongbokgung Palace. Together, they cover roughly 18 kilometers of city travel in a clean loop using Seoul Metro Lines 4, 7, and 3.',
      'Every stop below includes the exact Korean street address for Naver Map, the fastest subway exit, expected out-of-pocket costs in Korean won (KRW), and local etiquette rules so you move through working neighborhoods smoothly.',
    ],
    sections: [
      {
        id: 'route-overview',
        heading: 'Route Timing, Subway Exits & Estimated Budget',
        paragraphs: [
          'Timing dictates the success of this route. Yoojung Sikdang draws heavy office-worker traffic between 12:00 PM and 1:00 PM on weekdays, while Geumdwaeji Sikdang regularly accumulates 60- to 90-minute dinner waits after 5:30 PM. Shifting lunch slightly early and barbecue into an early dinner window cuts waiting time by more than half.',
          'Gyeongbokgung Palace is closed every Tuesday, and evening hours vary by season. If your trip falls on a Tuesday, swap the palace stop to Changdeokgung (closed Mondays) or pair the afternoon with the National Museum of Korea one station south of HYBE at Ichon Station.',
        ],
        table: {
          caption: '1-Day BTS Seoul Loop: Timing, Transit & Cost Breakdown',
          headers: ['Time Window', 'Stop & Address', 'Subway Exit', 'Estimated Spend (KRW)'],
          rows: [
            [
              '09:30 – 11:00',
              'HYBE Yongsan HQ & Sinyongsan Cafe Alley (42 Hangang-daero)',
              'Line 4 Sinyongsan Exit 2 (3-min walk)',
              '₩6,000 – ₩12,000 (coffee/pastry)',
            ],
            [
              '11:30 – 12:45',
              'Yoojung Sikdang (14 Dosan-daero 28-gil, Gangnam-gu)',
              'Line 7 Hakdong Exit 7 (7-min walk)',
              '₩11,000 – ₩15,000 (meal)',
            ],
            [
              '14:15 – 16:00',
              'Geumdwaeji Sikdang / Gold Pig BBQ (149 Dasan-ro, Jung-gu)',
              'Line 3/6 Yaksu Exit 2 (4-min walk)',
              '₩25,000 – ₩40,000 per person',
            ],
            [
              '16:30 – 18:00',
              'Gyeongbokgung Palace Geunjeongjeon (161 Sajik-ro, Jongno-gu)',
              'Line 3 Gyeongbokgung Exit 5',
              '₩3,000 entry (free in Hanbok)',
            ],
          ],
        },
        callout: {
          tone: 'tip',
          title: 'Tuesdays & Public Holidays Check',
          body: 'Gyeongbokgung Palace closes every Tuesday. Before riding Line 3 north from Yaksu, verify opening hours on the Royal Palaces and Tombs Center portal, especially between November and February when last admission shifts to 4:00 PM.',
        },
      },
      {
        id: 'hybe-yongsan',
        heading: 'Morning: HYBE Yongsan Headquarters & Sinyongsan Backstreets',
        paragraphs: [
          'Take Seoul Metro Line 4 to Sinyongsan Station and exit via Exit 2. Walking south down Hangang-daero toward Yongsan Station brings you directly to HYBE’s glass facade at 42 Hangang-daero. Since the company relocated from Samseong-dong in 2021, this block has anchored daily fan meetups and seasonal member birthday projects.',
          'Before setting expectations, note that the former HYBE Insight exhibition basement at Yongsan closed permanently in early 2023. Today, the ground floor is strictly a security-controlled corporate lobby for staff and artists. You cannot enter for tours or merchandise shopping; respect building security lines and keep tripods off the narrow commuter sidewalk.',
          'What makes Yongsan worthwhile is the neighborhood right behind the building. Turn into the grid of streets labeled Hangang-daero 10-gil and 40-gil—locally known as "Yongridan-gil." Dozens of independent roasteries, bakeries, and specialty fan cafes run member anniversary cup-sleeve events here nearly every month, displaying curated photo exhibits and fan-made stationery.',
        ],
        bullets: [
          'Best photo angle: Stand across the Hangang-daero pedestrian crosswalk near Yongsan Trade Center for an unobstructed full-building shot without blocking office commuters.',
          'Morning coffee picks: Several multi-story roasteries along Hangang-daero 40-gil open by 9:30 AM and accept foreign Visa/Mastercard without issue.',
          'Optional detour: Walk 10 minutes west to Yongsan I’Park Mall if you need a weatherproof lunch backup or K-Pop album shop.',
        ],
      },
      {
        id: 'yoojung-sikdang',
        heading: 'Midday: Yoojung Sikdang (BTS’s Pre-Debut Dining Room)',
        paragraphs: [
          'From Sinyongsan, ride Line 4 two stops north to Samgakji, transfer to Line 6, or walk to Ichon/Yongsan and connect via Express Bus Terminal to Line 7 Hakdong Station (roughly 25–30 minutes door-to-door). Exit 7 puts you within a quiet residential-office walk of Yoojung Sikdang at 14 Dosan-daero 28-gil in Nonhyeon-dong.',
          'During BTS’s trainee and early debut years when Big Hit Entertainment’s studio stood just uphill, the members ate here almost daily. The restaurant’s walls remain covered in framed debut posters, fan letters, and memorabilia accumulated over more than a decade, yet it continues to operate as an authentic working Korean neighborhood diner.',
          'The signature order is Heukdwaeji Dolsot Bibimbap (black pork sizzling stone-pot rice, often ordered alongside Yoojung Ssambap lettuce wraps). Because the dining room is compact, arriving around 11:30 AM before surrounding design offices break at noon lets you sit immediately without crowding the narrow alley entrance.',
        ],
        subsections: [
          {
            heading: 'What to Order & Solo-Diner Tips',
            paragraphs: [
              'Korean barbecue restaurants frequently require a two-portion minimum, which can catch solo travelers off guard. Yoojung Sikdang is unusually friendly for single diners because its dolsot bibimbap and kimchi jjigae are served as individual meals.',
              'Expect self-service chilled water and complimentary banchan side dishes including seasoned bean sprouts, pickled radish, and aged kimchi. Gochujang (chili paste) sits on the table so you can control the spice level yourself—start with half a spoon if you have a mild palate.',
            ],
          },
        ],
      },
      {
        id: 'geumdwaeji-sikdang',
        heading: 'Afternoon: Geumdwaeji Sikdang (Gold Pig BBQ) Near Yaksu',
        paragraphs: [
          'Walk back toward Hakdong or Sinsa and take Line 3 north across the Han River directly to Yaksu Station (about 15 minutes on the train). Step out of Exit 2 and walk four minutes uphill along Dasan-ro to spot the white-tiled storefront of Geumdwaeji Sikdang (149 Dasan-ro, Jung-gu).',
          'Recognized repeatedly in the Michelin Guide Seoul Bib Gourmand list, this three-story pork barbecue restaurant was famously frequented by Jimin, Jungkook, and other artists long before viral queues formed outside. Staff grill thick cuts of bone-in YBD-breed pork belly (bon samgyeop) and collar (moksal) directly over briquette charcoal at your table, ensuring the fat renders crisp without burning.',
          'The biggest logistical hurdle here is the waitlist. Between 2:15 PM and 4:15 PM on weekdays, the line drops dramatically compared to peak dinner hours. If a queue exists when you arrive, walk up to the CatchTable kiosk tablet outside the front door. Foreign visitors without a Korean 010 phone number can tap the English language toggle and enter an email address to receive virtual queue alerts while browsing nearby Yaksu bakeries.',
        ],
        callout: {
          tone: 'etiquette',
          title: 'Two-Portion Minimum & Charcoal Etiquette',
          body: 'Like most specialist Seoul BBQ houses, Geumdwaeji Sikdang expects at least two meat orders per table. Let the server handle turning the pork over the briquettes—touching the grill tongs yourself disrupts their timing. Adding a pot of basil-topped kimchi jjigae alongside scallion dipping sauce completes the house pairing.',
        },
      },
      {
        id: 'gyeongbokgung-finale',
        heading: 'Late Afternoon: Gyeongbokgung Palace Geunjeongjeon Stage',
        paragraphs: [
          'From Yaksu Station, stay on Line 3 going northwest for seven stops straight to Gyeongbokgung Station—no transfers required. Exit 5 leads directly into the palace plaza in front of Gwanghwamun Gate. Admission costs ₩3,000 for adults (free if you rent traditional Hanbok at one of the nearby shops).',
          'Inside the palace grounds, walk straight past Heungnyemun Gate to reach Geunjeongjeon, the grand throne hall built during the Joseon Dynasty and rebuilt in 1867. This expansive stone courtyard served as the monumental performance backdrop for BTS’s "IDOL" appearance during their 2020 Fallon "BTS Week" special—an image of modern Korean pop set against 600-year-old royal architecture.',
          'Arriving around 4:30 PM gives you softer late-day light across Bugaksan Mountain behind the throne hall and noticeably thinner tour-bus crowds. After walking the courtyard perimeter and adjacent Gyeonghoeru Pavilion over the pond, exit through the eastern gate toward Samcheong-dong or Insadong for evening tea and souvenirs.',
        ],
      },
    ],
    companionCta: {
      eyebrow: 'Interactive Route Planner',
      title: 'Open These 4 BTS Stops on the K-Pulse Korea Map',
      description:
        'Check verified coordinates, real exterior photos, walking distances, and 1-tap Naver Map, KakaoMap, and Google Maps deep links for our BTS Seoul Heritage Day Course.',
      href: '/map/course/bts-seoul-heritage-day',
      buttonLabel: 'Launch BTS Seoul Route Map',
    },
    relatedQuizSlugs: ['bts-army-trivia', 'which-bts-member-are-you'],
    sources: [
      {
        label: 'Visit Seoul Official Travel Guide',
        detail: 'Gyeongbokgung Palace admission hours, Tuesday closure rules, and Line 3 station access.',
        url: 'https://english.visitseoul.net',
      },
      {
        label: 'Michelin Guide Seoul',
        detail: 'Geumdwaeji Sikdang Bib Gourmand listing and location details in Yaksu-dong, Jung-gu.',
        url: 'https://guide.michelin.com',
      },
      {
        label: 'Seoul Metro Route Information',
        detail: 'Line 3, Line 4, and Line 7 station exit numbers and inter-district transfer times.',
      },
    ],
  },
  {
    slug: 'blackpink-seoul-style-tour-guide',
    locale: 'en',
    title:
      'BLACKPINK Seoul Style & Architecture Guide: From YG Hapjeong to Apgujeong HAUS DOSAN',
    subtitle:
      'Explore two distinct sides of Seoul in one afternoon—Mapo’s indie music alleys around YG Entertainment and Hongdae, followed by Gangnam’s sculptural concept stores and gourmet spots.',
    description:
      'Discover a complete BLACKPINK Seoul guide connecting YG HQ and the SameE cafe in Hapjeong, Hongdae’s BLACKPINK House area, HAUS DOSAN, and Downtowner Cheongdam.',
    category: 'Korea Travel',
    tags: ['BLACKPINK', 'Seoul', 'Fashion', 'Cafes'],
    keywords: [
      'BLACKPINK Seoul tour',
      'YG Entertainment Hapjeong visit',
      'the SameE cafe Seoul',
      'HAUS DOSAN Jennie',
      'BLACKPINK House Hongdae',
    ],
    publishedAt: '2026-10-08',
    updatedAt: '2026-11-18',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '🖤',
    accentBg: 'bg-pink-50',
    featured: false,
    keyTakeaways: [
      'Start in Mapo-gu (Hapjeong Station Exit 8) where YG’s headquarters faces its official fan cafe and merch store, the SameE, directly across a quiet residential lane.',
      'Walk 15–20 minutes east from Hapjeong through Sangsu into Hongdae’s Wausan-ro alleys to see the former BLACKPINK House exterior and indie fashion boutiques.',
      'Take Line 2 to Dangsan/Seoul Forest or transfer to the Suin-Bundang Line for Apgujeong Rodeo Station (Exit 5) to reach HAUS DOSAN and Downtowner Cheongdam.',
      'Check business privacy rules: YG HQ and the Hongdae filming site are active workplaces and private retail properties—photograph only from public streets.',
    ],
    intro: [
      'If BTS’s Seoul highlights traditional heritage and comforting neighborhood diners, a BLACKPINK-focused itinerary showcases Seoul’s modern design culture. The group’s footprint bridges two contrasting halves of the capital: Mapo-gu on the north bank of the Han River, known for indie music venues and concrete studio architecture, and Cheongdam/Apgujeong-rodeo on the south bank, where flagship fashion houses commission gallery-like retail spaces.',
      'Because Mapo and Gangnam sit diagonally across the city, bundling Hapjeong and Hongdae into your late morning before riding across the river to Apgujeong Rodeo keeps transit simple. You avoid afternoon highway congestion and arrive in Gangnam right when concept bakeries and flagship showrooms are fully stocked.',
      'Below is the step-by-step walking and subway breakdown covering YG Entertainment’s Hapjeong complex, the SameE fan cafe, the Hongdae BLACKPINK House block, HAUS DOSAN, and Downtowner Cheongdam.',
    ],
    sections: [
      {
        id: 'mapo-vs-gangnam',
        heading: 'Planning the Split: Mapo Morning & Gangnam Afternoon',
        paragraphs: [
          'Seoul’s creative neighborhoods operate on noticeably later schedules than its business districts. Almost every fashion flagship and dessert bar in Hapjeong, Hongdae, and Apgujeong opens between 10:30 AM and 11:30 AM rather than early morning. Starting around 10:30 AM ensures the SameE merch counter and Hongdae storefronts are open when you arrive.',
          'The subway ride between Hongik University / Hapjeong and Apgujeong Rodeo takes roughly 35 to 40 minutes via Line 2 (transferring to the Suin-Bundang Line at Wangsimni or Seolleung) or Line 6 + Line 3. Carrying a T-Money transit card makes these transfers seamless and costs around ₩1,500.',
        ],
        table: {
          caption: 'BLACKPINK Seoul Style Route: Stops, Hours & Transit',
          headers: ['Stop', 'Address', 'Nearest Subway Exit', 'Typical Hours'],
          rows: [
            [
              'YG Entertainment New HQ',
              '7 Huiujeong-ro 1-gil, Mapo-gu',
              'Line 2/6 Hapjeong Exit 8 (7-min walk)',
              'Exterior viewing 24h (private office)',
            ],
            [
              'the SameE Cafe & MD Shop',
              '6-3 Huiujeong-ro 1-gil, Mapo-gu',
              'Directly across from YG HQ',
              '10:30 – 20:00 (verify seasonal hours)',
            ],
            [
              'BLACKPINK House Site (Hongdae)',
              '48 Wausan-ro 17-gil, Mapo-gu',
              'Line 6 Sangsu Exit 1 (6-min walk)',
              'Street exterior; surrounding shops 12:00+',
            ],
            [
              'HAUS DOSAN (Gentle Monster / Tamburins / Nudake)',
              '50 Apgujeong-ro 46-gil, Gangnam-gu',
              'Suin-Bundang Apgujeong Rodeo Exit 5',
              '11:00 – 21:00 daily',
            ],
            [
              'Downtowner Cheongdam',
              '14 Dosan-daero 53-gil, Gangnam-gu',
              '8-min walk from HAUS DOSAN',
              '11:00 – 21:00 daily',
            ],
          ],
        },
      },
      {
        id: 'hapjeong-yg-samee',
        heading: 'Stop 1 & 2: YG Entertainment HQ & the SameE Cafe',
        paragraphs: [
          'Exit Hapjeong Station through Exit 8 and walk west past residential villas toward the Han River embankment. Seven minutes on foot reveals YG Entertainment’s 2020 headquarters at 7 Huiujeong-ro 1-gil—a futuristic glass-and-slate building that rises conspicuously above surrounding low-rise apartment blocks.',
          'Immediately across the narrow street at 6-3 Huiujeong-ro 1-gil sits the SameE ("The Same" / fan space), YG’s official multi-story cafe and merchandise showroom built specifically so fans have a dedicated space near the agency. Upstairs seating overlooks YG’s main glass atrium, while the lower level stocks official albums, lightsticks (BI-Ping-Bong), and artist stationery.',
          'Because Hapjeong-dong remains a residential area right next to active recording studios, keep voices low outside the agency gates and avoid loitering on apartment steps. Grabbing a drink inside the SameE gives you an air-conditioned spot to rest, browse official releases, and sign visitor walls legally.',
        ],
        callout: {
          tone: 'tip',
          title: 'Combine With Mangwon Market for Lunch',
          body: 'Before leaving Mapo-gu, walk 10 minutes north from YG HQ to Mangwon Market (망원시장). Famous among Seoul locals for crispy dakgangjeong (sweet-spicy fried chicken bites), croquettes, and fruit smoothies at half of Gangnam prices, it makes an ideal budget lunch stop.',
        },
      },
      {
        id: 'hongdae-house',
        heading: 'Stop 3: Walking Through Hongdae’s Wausan-ro & Former BLACKPINK House',
        paragraphs: [
          'From Hapjeong, cut east through Sangsu-dong’s indie cafe streets to 48 Wausan-ro 17-gil in Hongdae. In 2018, this corner building was painted signature pastel pink and black to serve as the filming set for the reality series "BLACKPINK House." Since filming wrapped, the building has returned to normal commercial retail use with new exterior styling.',
          'Even without the temporary pink facade, this pocket of Hongdae—between Sangsu Station and Hongik University’s main playground—is worth exploring on foot. Independent vintage shops, Korean cosmetic flagship stores, and four-cut photo booth studios line Wausan-ro and Eoulmadang-ro, making it easy to pick up accessories or film-style photo strips with friends.',
        ],
      },
      {
        id: 'haus-dosan-cheongdam',
        heading: 'Stop 4 & 5: HAUS DOSAN & Downtowner Cheongdam',
        paragraphs: [
          'Take the subway across the Han River to Apgujeong Rodeo Station (Exit 5) and walk south into Dosan Park’s luxury fashion alleys. At 50 Apgujeong-ro 46-gil stands HAUS DOSAN, the striking concrete concept space housing eyewear brand Gentle Monster, fragrance label Tamburins, and avant-garde dessert cafe Nudake—three brands heavily associated with Jennie’s global fashion campaigns.',
          'Rather than displaying shelves stacked with boxes, each floor functions like a contemporary art installation featuring kinetic sculptures, oversized architectural lighting, and scent rooms. Head down to the B1 Nudake counter to see their signature Peak matcha-cream black croissant pastry or seasonal cake sculptures, though expect 15- to 25-minute afternoon queues on weekends.',
          'Finish eight minutes east at Downtowner Cheongdam (14 Dosan-daero 53-gil), a retro burger diner whose avocado and truffle burgers gained a cult following after members mentioned ordering them. Seating turns over quickly; if the Cheongdam dining room is packed, walk north toward Rodeo Street’s cafe terraces or end your evening along the Han River at Apgujeong Hangang Park.',
        ],
        subsections: [
          {
            heading: 'Budgeting Gangnam vs. Mapo',
            paragraphs: [
              'Expect prices in Apgujeong and Cheongdam to run roughly 30% to 50% higher than in Hapjeong or Mangwon. A specialty pastry and latte at Nudake typically costs ₩15,000–₩22,000, while a burger and fries combo at Downtowner runs around ₩15,000–₩18,000.',
              'If you want tax refunds on eyewear, skincare, or fragrance purchases over ₩15,000 at HAUS DOSAN, carry your physical passport—many Gangnam flagship counters process instant duty-free deductions right at checkout.',
            ],
          },
        ],
      },
    ],
    companionCta: {
      eyebrow: 'Interactive Map Course',
      title: 'View the 5-Stop BLACKPINK Seoul Style Course',
      description:
        'Open the interactive route line on our K-Pop Star Map with distance markers, gallery photos, and instant Naver & Kakao directions.',
      href: '/map/course/blackpink-seoul-style-tour',
      buttonLabel: 'Open BLACKPINK Route',
    },
    relatedQuizSlugs: ['blackpink-blink-trivia', 'which-blackpink-member-are-you'],
    sources: [
      {
        label: 'Visit Korea (KTO) — Apgujeong & Cheongdam Guide',
        detail: 'Dosan Park fashion district hours, Apgujeong Rodeo Station access, and tourist tax-refund thresholds.',
        url: 'https://english.visitkorea.or.kr',
      },
      {
        label: 'HAUS DOSAN Official Store Guide',
        detail: 'Floor directory for Gentle Monster, Tamburins, and Nudake in Gangnam-gu.',
      },
      {
        label: 'Mapo-gu Cultural Tourism Portal',
        detail: 'Hapjeong and Sangsu-dong walking routes near Huiujeong-ro and Wausan-ro.',
      },
    ],
  },
  {
    slug: 'bts-busan-daegu-ktx-travel-guide',
    locale: 'en',
    title:
      'Seoul to Busan & Daegu by KTX: Complete BTS Hometown Pilgrimage Guide',
    subtitle:
      'How to plan high-speed rail tickets, regional transit, and realistic schedules to visit Jimin and Jungkook’s Busan coastal landmarks and V and SUGA’s hometown spots in Daegu.',
    description:
      'Step-by-step KTX travel guide from Seoul to Busan (Gamcheon Culture Village, Oryukdo, Dadaepo) and Daegu (V Mural Street, Dalseong Park) with fares and transit tips.',
    category: 'Korea Travel',
    tags: ['BTS', 'Busan', 'Daegu', 'KTX'],
    keywords: [
      'Seoul to Busan KTX guide',
      'Busan Gamcheon BTS mural',
      'Daegu V mural street',
      'BTS hometown tour Korea',
      'Dadaepo Beach Jimin',
    ],
    publishedAt: '2026-10-15',
    updatedAt: '2026-11-18',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '🚄',
    accentBg: 'bg-sky-50',
    featured: false,
    keyTakeaways: [
      'High-speed KTX trains connect Seoul Station to Dongdaegu in roughly 1 hour 40 minutes and to Busan Station in 2 hours 30–50 minutes.',
      'Unless you ride at least 3 long-distance KTX legs within 2–5 days, point-to-point KTX tickets via LetsKorail are usually cheaper than a Korail Pass.',
      'In Busan, group Gamcheon Culture Village and Dadaepo Beach together on the west side (Orange Line 1), and visit Oryukdo Skywalk separately on the eastern peninsula.',
      'Daegu’s V Mural Street and SUGA-linked Dalseong Park sit only 1.5 km apart along Daegu Metro Line 3—easy to cover as a half-day stopover on your rail ride back to Seoul.',
    ],
    intro: [
      'A surprising amount of Korean pop history starts outside Seoul. Four of BTS’s seven members grew up in the southern cities of Busan (Jimin and Jungkook) and Daegu (SUGA and V), and both municipalities feature publicly accessible neighborhoods, murals, and coastal parks closely tied to their early lives and vlogs.',
      'Because South Korea’s Gyeongbu High-Speed Rail corridor runs directly from Seoul Station through Daejeon and Dongdaegu straight down to Busan, visiting both cities on a single multi-day loop requires zero domestic flights. The key is organizing rail segments properly and understanding how spread out Busan’s coastline is compared to compact central Daegu.',
      'This guide covers ticket pricing, Korail Pass math, local bus routes in Busan, and how to connect Daegu’s Line 3 landmarks without wasting half a day in city traffic.',
    ],
    sections: [
      {
        id: 'ktx-tickets-math',
        heading: 'KTX Logistics: Single Tickets vs. Korail Pass',
        paragraphs: [
          'KTX trains depart Seoul Station for Busan every 15 to 30 minutes throughout the day. One-way standard economy seats cost roughly ₩59,800 from Seoul to Busan and ₩43,500 from Seoul to Dongdaegu; the shorter middle leg between Dongdaegu and Busan runs about ₩17,100.',
          'International travelers often buy a 2-day or 3-day Korail Pass assuming it automatically saves money. Run the math first: a single Seoul → Busan → Dongdaegu → Seoul triangle in standard class totals roughly ₩120,400 in individual tickets. Compare that against the current Korail Pass adult rate (especially if you book SRT from Suseo or travel off-peak)—pass savings usually kick in only when you add a third major city such as Gangneung or Gwangju.',
          'Weekend Friday-evening and Sunday-afternoon trains between Seoul and Busan routinely sell out several days ahead. Reserve seats up to one month in advance on the official English LetsKorail website using a foreign credit card.',
        ],
        table: {
          caption: 'Gyeongbu KTX Corridor: Travel Times & Approximate Economy Fares',
          headers: ['Rail Segment', 'Fastest Duration', 'Approx. KTX Fare (KRW)', 'Arrival Station'],
          rows: [
            ['Seoul Station → Busan', '2h 30m – 2h 50m', '₩59,800', 'Busan Station (Line 1)'],
            ['Busan → Dongdaegu', '45m – 55m', '₩17,100', 'Dongdaegu Station (Line 1)'],
            ['Dongdaegu → Seoul Station', '1h 40m – 1h 55m', '₩43,500', 'Seoul Station'],
            ['Seoul → Dongdaegu (Direct)', '1h 40m – 1h 55m', '₩43,500', 'Dongdaegu Station'],
          ],
        },
        callout: {
          tone: 'tip',
          title: 'Keep Your Luggage Off Busan’s Steep Hills',
          body: 'Do not carry wheeled suitcases to Gamcheon Culture Village. Coin lockers inside Busan Station (and major Line 1 stations like Nampo) cost ₩4,000–₩8,000 per day, or you can store bags at your hotel near Seomyeon or Nampo-dong before boarding local hillside buses.',
        },
      },
      {
        id: 'busan-spots',
        heading: 'Busan Route: Gamcheon Village, Oryukdo Skywalk & Dadaepo Sunset',
        paragraphs: [
          'Busan stretches across rugged hills and peninsulas, so subway distances look deceptive on paper. Plan a full day if you want to reach all three Jimin and Jungkook spots comfortably without rushing.',
        ],
        subsections: [
          {
            heading: '1. Gamcheon Culture Village (Jimin & Jungkook Giant Mural)',
            paragraphs: [
              'Ride Busan Metro Line 1 to Toseong Station, walk out Exit 6, turn right around Pusan National University Hospital, and catch green neighborhood mini-bus Saha 1-1, Seo-gu 2, or Seo-gu 2-2 up the steep ridge (about 10 minutes). Alight at Gamcheon Elementary School / Gamcheon Culture Village.',
              'At 203 Gamnae 2-ro stands a towering building-side mural honoring hometown members Jimin and Jungkook, overlooking terraced pastel houses sloping toward Busan Port. Arrive before 10:00 AM for soft morning light on the artwork and quieter lanes, as tour buses crowd the main alley by midday. Remember that Gamcheon is a living neighborhood—keep voices down beside residential doorways.',
            ],
          },
          {
            heading: '2. Oryukdo Skywalk (Jimin Vlog Coastal Cliff)',
            paragraphs: [
              'Situated on the eastern Nam-gu headland (137 Oryukdo-ro), Oryukdo Skywalk cantilevers a glass-bottomed U-shaped walkway over churning coastal cliffs—featured in Jimin’s hometown Busan vlog. Entry is free; visitors slip provided cloth shoe covers over sneakers before stepping onto the glass deck.',
              'Reach it from Busan Station or Kyungsung Univ.·Pukyong Nat’l Univ. Station (Line 2) via local bus #24, #27, or #131 right to the Oryukdo SK View terminus. Because it sits across town from Saha-gu, visit Oryukdo around midday or pair it with Gwangalli Beach rather than doubling back at rush hour.',
            ],
          },
          {
            heading: '3. Dadaepo Beach (Sunset Boardwalk)',
            paragraphs: [
              'Finish at the southwestern tip of Line 1 at Dadaepo Beach Station (Exit 4, 14 Morundae 1-gil). Unlike high-rise Haeundae, Dadaepo offers wide tidal sandbars, wooden marsh boardwalks (Gouni Eco-Trail), and calm sunset reflections.',
              'If you travel between late April and October, check the evening schedule for the Dadaepo Sunset Fountain of Dream, which runs synchronized water and light shows near the plaza after dusk.',
            ],
          },
        ],
      },
      {
        id: 'daegu-half-day',
        heading: 'Daegu Stopover: V Mural Street & SUGA’s Dalseong Park',
        paragraphs: [
          'On the northbound KTX ride back toward Seoul, step off at Dongdaegu Station and stash luggage in the station lockers. Central Daegu is remarkably compact: transferring from Line 1 to Line 3 monorail at Myeongdeok Station drops you directly into Seo-gu and Jung-gu.',
          'First, ride the elevated Daegu Line 3 monorail to Dalseong Park Station or Buk-gu Office Station, then walk to Daegu Daeseong Elementary School (544 Dalseo-ro, Seo-gu)—V’s childhood elementary school. Along the school’s brick perimeter runs a massive, colorful panoramic mural wall depicting V across multiple eras, maintained respectfully alongside public school pathways.',
          'Just 1.5 kilometers southeast sits historic Dalseong Park (35 Dalseonggongwon-ro, Jung-gu), a serene green loop built atop an ancient Three Kingdoms-era earthen fortress that SUGA frequently referenced in early interviews about growing up in Daegu. Walking between the mural street and the park takes roughly 20 minutes, passing traditional neighborhood markets and modern Seomun Market—one of Korea’s largest street-food markets, ideal for flat dumplings (napjak mandu) and kalguksu noodles before catching your evening KTX back to Seoul.',
        ],
        callout: {
          tone: 'etiquette',
          title: 'Active Public School Perimeter',
          body: 'Daeseong Elementary School in Daegu is an active elementary campus. Photograph only the public exterior perimeter wall along Dalseo-ro—never enter school gates or photograph students during arrival or dismissal hours.',
        },
      },
      {
        id: 'busan-daegu-food-pacing',
        heading: '2-Day vs. 3-Day Pacing & Hometown Food Stops',
        paragraphs: [
          'Although an ambitious traveler could technically dash through Gamcheon Village and Dadaepo on a single whirlwind day-trip from Seoul, sleeping one or two nights in Busan makes the coastal loop far more enjoyable. Base yourself near Nampo-dong (Orange Line 1) if your main goal is Gamcheon Village and Dadaepo Sunset, or choose Seomyeon (Lines 1 & 2 transfer hub) if you plan to balance Oryukdo Skywalk with central KTX access.',
          'Both cities reward travelers who pause between landmarks to eat regional specialties rather than defaulting to Seoul chain franchises. In Busan, warm up after morning breezes on Gamcheon’s ridges with dwaeji gukbap (simmered pork soup served with chives and salted shrimp paste) or grab brown-sugar seed pancakes (ssiat hotteok) down in BIFF Square before hopping on Line 1 to Dadaepo.',
          'When you transfer through Daegu on the return afternoon, build an extra 60 minutes around Seomun Market or central Jung-gu. Daegu is celebrated nationwide for wafer-thin griddled flat dumplings (napjak mandu), spicy braised beef ribs along Dongin-dong Jjimgalbi Alley, and lively independent bakeries tucked beside traditional medicine streets near Yakryeongsi.',
        ],
        bullets: [
          'Recommended 2-night split: Day 1 morning KTX Seoul → Busan (Oryukdo Skywalk + Gwangalli waterfront); Day 2 Gamcheon Culture Village morning + Dadaepo Beach sunset; Day 3 morning KTX to Dongdaegu for V Mural Street, Dalseong Park, and an early evening train back to Seoul.',
          'Local transit payment: Your regular Seoul T-Money card works identically on Busan’s metro gates, village mini-buses, and Daegu’s Line 3 monorail—just top up KRW cash at any station machine before boarding.',
        ],
      },
    ],
    companionCta: {
      eyebrow: 'Coastal & Hometown Courses',
      title: 'Explore Busan & Daegu BTS Courses on the Interactive Map',
      description:
        'See stop-by-stop distances, real street photos, and direct Korean navigation links for both the Busan Ocean Route and Daegu Hometown Walk.',
      href: '/map/course/bts-busan-jimin-jungkook-tour',
      buttonLabel: 'Open Busan & Daegu Routes',
    },
    relatedQuizSlugs: ['bts-army-trivia', 'which-bts-member-is-your-soulmate'],
    sources: [
      {
        label: 'KORAIL (LetsKorail) English Portal',
        detail: 'Gyeongbu Line KTX schedules, Korail Pass terms, and Seoul–Dongdaegu–Busan transit times.',
        url: 'https://www.letskorail.com',
      },
      {
        label: 'Visit Busan Official Tourism Portal',
        detail: 'Gamcheon Culture Village bus routes, Oryukdo Skywalk hours, and Dadaepo Fountain season.',
        url: 'https://www.visitbusan.net',
      },
      {
        label: 'Daegu Metropolitan Transit & Tourism',
        detail: 'Daegu Line 3 monorail stops, Dalseong Park access, and Seomun Market hours.',
      },
    ],
  },
  {
    slug: 'korea-travel-apps-etiquette-for-kpop-fans',
    locale: 'en',
    title:
      'First-Time K-Pop Fan’s Guide to Navigating Korea: Naver Map, T-Money, Birthday Cafes & Etiquette',
    subtitle:
      'Why Google Maps breaks down in Seoul, how to pick the right transit card, how Korean idol birthday cafes actually work, and the unspoken rules every visiting fan should know.',
    description:
      'Essential South Korea travel setup for K-Pop fans: Naver Map vs KakaoMap, T-Money vs Climate Card vs WOWPASS, birthday cafe etiquette, and privacy rules.',
    category: 'Korea Travel',
    tags: ['Korea Travel', 'Etiquette', 'Naver Map', 'Birthday Cafes'],
    keywords: [
      'Naver Map Korea guide',
      'Korea travel apps for Kpop fans',
      'how Korean birthday cafes work',
      'T-Money vs Climate Card Seoul',
      'Kpop pilgrimage etiquette Korea',
    ],
    publishedAt: '2026-10-22',
    updatedAt: '2026-11-18',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '🧭',
    accentBg: 'bg-emerald-50',
    featured: true,
    keyTakeaways: [
      'Google Maps cannot calculate reliable turn-by-turn walking or driving directions inside South Korea—install Naver Map and KakaoMap before landing at Incheon.',
      'Choose your transit card by itinerary: Seoul’s Climate Card covers unlimited subway/bus rides inside Seoul, whereas T-Money or WOWPASS works nationwide including Busan and Daegu.',
      'Korean idol birthday cafes ("생일 카페") are fan-organized pop-ups held in real coffee shops—always buy at least one drink per cup-sleeve set and ask before photographing other patrons.',
      'Respect Korea’s strict portrait-rights culture and never visit private residences, dorms, or hospital clinics.',
    ],
    intro: [
      'Touching down at Incheon International Airport with a pinned Google Maps list is the quickest way to get lost in Seoul. Because of long-standing South Korean restrictions on exporting high-precision government map vector data to overseas servers, Google Maps cannot give accurate walking routes, live bus arrivals, or subway transfer exits across most of the country.',
      'At the same time, K-Pop fan travel comes with local customs that aren’t obvious from standard guidebooks—from how prepaid transit passes work outside Seoul to the unspoken rules inside idol birthday cafes and quiet residential streets around entertainment agencies.',
      'Setting up the right four apps, choosing the right transit card at the airport, and knowing basic Korean street etiquette turns chaotic logistics into an effortless trip.',
    ],
    sections: [
      {
        id: 'essential-apps',
        heading: '1. Navigation Setup: Naver Map vs. KakaoMap',
        paragraphs: [
          'Download both Naver Map and KakaoMap before you depart and switch their interface language to English in Settings. Naver Map tends to handle English search queries, restaurant reviews, and subway exit numbering slightly better for visitors; KakaoMap excels at clean bus-arrival countdowns and bike paths.',
          'One crucial habit: search places using their Korean Hangul name or Korean road-name address rather than phonetic English spellings. Spelling "Yoojung Sikdang" slightly differently in English can fail to match, whereas pasting "유정식당" or "서울특별시 강남구 도산대로28길 14" locates the pin instantly. Our K-Pulse Korea Map buttons pre-fill those exact Korean queries for both apps.',
          'Also install Papago (Naver’s Korean translation app, noticeably more natural for Korean signage and menus than generic translators) and Kakao T if you plan to hail taxis late at night—you can select "Pay to Driver" at checkout so a Korean bank card isn’t mandatory.',
        ],
        callout: {
          tone: 'tip',
          title: 'Pay Attention to Subway Car & Exit Numbers',
          body: 'When Naver Map tells you "Exit 2" and "Fastest Transfer: Car 4-2," follow that number on the platform screen doors. Major Seoul hubs like Express Bus Terminal and Wangsimni have massive underground walkways; boarding the suggested car saves up to five minutes per transfer.',
        },
      },
      {
        id: 'transit-payment-cards',
        heading: '2. Transit & Payments: T-Money vs. WOWPASS vs. Climate Card',
        paragraphs: [
          'Korean subways and city buses run on tap-in, tap-out smartcards, and every passenger needs their own card (you cannot tap twice on one card for a friend on subways). Cash is accepted only at KTX/subway single-ticket machines or small market stalls—almost all cafes, convenience stores, and taxis take foreign Visa or Mastercard.',
          'Picking between the three main tourist cards depends on whether you stay inside Seoul or ride rails down to Busan, Daegu, or Gangneung.',
        ],
        table: {
          caption: 'Comparing Korea Transit & Prepaid Cards for Tourists',
          headers: ['Card Option', 'Coverage Area', 'Where to Buy / Top Up', 'Best Fit For'],
          rows: [
            [
              'Standard T-Money Card',
              'Nationwide (Seoul, Busan, Daegu, Gangneung buses & subways)',
              'Any GS25, CU, 7-Eleven; reload with KRW cash',
              'Multi-city K-Pop travelers & short visits',
            ],
            [
              'Climate Card (기후동행카드 Tourist Pass)',
              'Unlimited Seoul Metro & Seoul green/blue buses (excludes Shinbundang Line & AREX express)',
              'Seoul convenience stores / subway info desks (1, 2, 3, 5, 7-day tourist passes)',
              'Heavy Seoul-only sightseeing (4+ rides/day)',
            ],
            [
              'WOWPASS / NAMANE',
              'T-Money transit chip + prepaid Visa/KRW debit wallet in one card',
              'Airport & major subway kiosks; load via foreign currency or app',
              'Travelers whose home debit cards incur steep FX fees or fail at Korean kiosks',
            ],
          ],
        },
      },
      {
        id: 'birthday-cafe-etiquette',
        heading: '3. How Korean Idol Birthday Cafes (생일 카페) Work',
        paragraphs: [
          'If your trip overlaps with a K-Pop idol’s birthday or debut anniversary, you will likely encounter "saengil cafes" (생일 카페)—ordinary independent coffee shops rented or decorated for 2–4 days by fanbases, particularly around HYBE in Yongsan, Hongdae/Hapjeong, and Seongsu-dong.',
          'To find active events, search X (Twitter) using the idol’s Korean name + "생카" (short for 생일 카페) or "컵홀더" (cup holder) along with the neighborhood name like "용산" or "홍대". Fan organizers post exact dates, cafe names, and bonus gift sets (photocards, stickers, postcards) ahead of time.',
        ],
        bullets: [
          'Order first, browse second: Birthday cafes are still real businesses. Every person entering is expected to purchase at least one drink (often a special set menu) to receive the cup sleeve and fan gifts.',
          'Check queue rules: Popular morning openings distribute numbered paper tickets or require pre-booking slots on Google Forms/Naver. Never cut lines or linger at tables for hours without ordering if a queue is outside.',
          'Respect other fans’ privacy: South Korea enforces strong portrait-rights norms. Photograph displays, banners, and drinks freely, but blur faces or ask permission before posting photos containing other visitors.',
        ],
      },
      {
        id: 'privacy-and-filming',
        heading: '4. Filming Manners, Portrait Rights & Public-Only Boundaries',
        paragraphs: [
          'Two golden rules govern respectful K-Pop travel in Korea. First, understand the strict boundary between public landmarks and private life: agency exteriors, official fan cafes, public parks, filming sets, and restaurants are welcoming public destinations, whereas private apartments, idol dormitories, gyms, and family homes are strictly off-limits.',
          'Second, remember how Korea treats public photography and subway decorum. You will notice Korean phone cameras emit an audible shutter sound by law; avoid pointing lenses directly at strangers in cafes, public baths, or narrow alleys. On subways, speak quietly, keep backpacks off crowded seats during rush hour, and never sit in the marked pink pregnancy seats or end-of-car priority seats reserved for elderly and disabled riders.',
        ],
        callout: {
          tone: 'etiquette',
          title: 'Trash Cans & Street Recycling Rules',
          body: 'Public trash bins are intentionally rare on Korean sidewalks. Do not carry open iced coffee cups onto buses (drivers will stop you from boarding with unsealed cups) and carry a small tote pouch for wrappers until you find recycling stations inside subway platforms or convenience stores.',
        },
      },
      {
        id: 'connectivity-late-night-transit',
        heading: '5. Connectivity, Late-Night Buses & Practical Day-One Checklist',
        paragraphs: [
          'Nearly every convenience store, cafe, and CatchTable restaurant queue in Seoul expects live mobile data. Pick up a prepaid Korean 5G eSIM or physical data SIM (KT, SK Telecom, or LG U+) before clearing arrivals at Incheon Airport, and enable roaming SMS on your home line if your bank sends one-time authentication codes.',
          'Keep an eye on the clock after concerts or Hongdae dinners: most Seoul Metro lines stop running between 11:30 PM and midnight. Instead of waiting for surge-priced street cabs, check Naver Map for blue late-night "Owl Buses" (올빼미버스, numbered N13, N15, N26, N37, and similar N-routes) that run roughly every 20–40 minutes through major hubs until trains resume at 5:30 AM.',
        ],
        bullets: [
          'Airport rail choice: The AREX All-Stop Train takes ~59–66 minutes to Seoul Station for around ₩4,450 using T-Money, while the reserved AREX Express takes 43 minutes non-stop (~₩11,000).',
          'ATM withdrawals: Look for "Global ATM" machines inside KB, Shinhan, Woori, or Hana bank branches (or 24-hour convenience stores) if your foreign debit card fails at local-only kiosks.',
          'Voltage & plugs: South Korea uses 220V Type C/F two-round-pin outlets (identical to continental Europe), so North American and UK travelers need a round-pin plug adapter.',
        ],
      },
    ],
    companionCta: {
      eyebrow: 'Verified Korea Map',
      title: 'Browse All 30 Public-Only K-Pop Spots Across Korea',
      description:
        'Explore verified addresses in Seoul, Busan, Daegu, and Gangneung with pre-filled Naver Map, KakaoMap, and Google Maps links.',
      href: '/map',
      buttonLabel: 'Open Interactive K-Pop Map',
    },
    relatedQuizSlugs: ['korean-culture-iq', 'kpop-fandom-trivia'],
    sources: [
      {
        label: 'Visit Korea (Korea Tourism Organization)',
        detail: 'Navigation app recommendations, T-Money usage, and Seoul tourist guidance.',
        url: 'https://english.visitkorea.or.kr',
      },
      {
        label: 'Seoul Metropolitan Government — Climate Card Guide',
        detail: 'Tourist short-term pass pricing, covered lines, and Shinbundang/airport exclusions.',
        url: 'https://english.seoul.go.kr',
      },
      {
        label: 'Seoul Metro Passenger Etiquette Guidelines',
        detail: 'Priority seating, food/beverage restrictions on buses, and station locker info.',
      },
    ],
  },
  {
    slug: 'stray-kids-seoul-1-day-stay-itinerary',
    locale: 'en',
    title:
      'Complete 1-Day Stray Kids Seoul Itinerary: JYP Center, Olympic Park, Gwangjang Market & Nodeul Island',
    subtitle:
      'An east-to-west Seoul route linking JYP Entertainment in Seongnae-dong, Olympic Park’s Lone Tree and KSPO Dome, classic variety food markets, and Han River sunset ramen.',
    description:
      'Plan a 1-day Stray Kids Seoul itinerary covering JYP Entertainment Center, Olympic Park Lone Tree, Gwangjang Market, Myeongdong Kyoja, and Nodeul Island with subway tips.',
    category: 'Korea Travel',
    tags: ['Stray Kids', 'Seoul', 'Itinerary', 'K-Pop Map'],
    keywords: [
      'Stray Kids Seoul itinerary',
      'JYP Entertainment Seongnae visit',
      'Olympic Park Lone Tree Stray Kids',
      'Nodeul Island Han River ramen',
      'STAY Seoul tour',
    ],
    publishedAt: '2026-11-21',
    updatedAt: '2026-11-25',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '🧭',
    accentBg: 'bg-red-50',
    featured: false,
    keyTakeaways: [
      'Start on Seoul’s eastern edge before noon so JYP Entertainment Center and Olympic Park’s Lone Tree sit together in one easy 45-minute walking loop.',
      'Ride Subway Line 5 directly from Dunchon-dong or Olympic Park straight into Euljiro 4-ga for Gwangjang Market—no complicated Han River transfers needed.',
      'At Myeongdong Kyoja Main Branch, servers collect payment right when food arrives and offer free extra noodles and rice upon request.',
      'Finish at Nodeul Island on Line 9 before dusk to cook convenience-store Han River ramyeon on the grass lawn while watching the sun drop behind the 63 Building.',
    ],
    intro: [
      'Planning a Stray Kids day in Seoul quickly shows how spread out the group’s landmarks look on paper. JYP Entertainment’s headquarters anchors Gangdong-gu on the far eastern edge of the capital, traditional markets cluster inside historic Jongno and Jung-gu in the center, and Nodeul Island floats mid-river toward Yongsan. If you tackle those stops out of sequence, you burn an hour bouncing back and forth across subway transfers.',
      'Thankfully, Seoul Metro Line 5 and Line 9 stitch this itinerary together into a surprisingly natural east-to-west progression. Beginning in quiet Seongnae-dong alongside Olympic Park gives you morning space for exterior agency photos and tree-lined walks before riding straight downtown for lunch at Gwangjang Market and Myeongdong Kyoja.',
      'Every stop below relies on verified public street addresses, exact subway exits, realistic Korean won budgets, and neighborhood etiquette so visiting STAYs move smoothly through working studios, markets, and riverside parks.',
    ],
    sections: [
      {
        id: 'stay-route-overview',
        heading: '1. Route Timing, Subway Exits & Estimated Budget',
        paragraphs: [
          'Seoul’s eastern neighborhoods wake gently compared with central shopping grids. Arriving outside JYP Entertainment around 10:00 AM gives you soft morning light across the building signage and open paths inside Olympic Park before lunchtime picnickers spread blankets on the grass.',
          'For lunch, decide whether you want to graze small market bites at Gwangjang Market first and sit down later for hot kalguksu in Myeongdong, or split them across a late brunch and an early afternoon bowl. Pacing both prevents showing up too full for spicy noodles at the Han River.',
        ],
        table: {
          caption: '1-Day Stray Kids Seoul Course: Timing, Addresses & Subway Access',
          headers: ['Time Window', 'Stop & Korean Address', 'Subway Exit', 'Estimated Budget (KRW)'],
          rows: [
            [
              '10:00 – 10:45',
              'JYP Entertainment Center (205 Gangdong-daero, Gangdong-gu)',
              'Line 5 Dunchon-dong Exit 3 (10-min walk)',
              '₩5,000 – ₩9,000 (nearby cafe drink)',
            ],
            [
              '10:50 – 11:45',
              'Olympic Park Lone Tree & KSPO Dome (424 Olympic-ro, Songpa-gu)',
              'Walk across street from JYP / Line 5·9 Olympic Park Exit 3',
              'Free park entry',
            ],
            [
              '12:30 – 13:45',
              'Gwangjang Market (88 Changgyeonggung-ro, Jongno-gu)',
              'Line 2·5 Euljiro 4-ga Exit 4 or Line 1 Jongno 5-ga Exit 8',
              '₩8,000 – ₩14,000 (shared street food)',
            ],
            [
              '14:15 – 15:15',
              'Myeongdong Kyoja Main Branch (29 Myeongdong 10-gil, Jung-gu)',
              'Line 4 Myeongdong Exit 8 (3-min walk)',
              '₩11,000 – ₩12,000 (kalguksu or mandu)',
            ],
            [
              '16:45 – 18:30',
              'Nodeul Island Han River Lawn (445 Yangnyeong-ro, Yongsan-gu)',
              'Line 9 Nodeul Exit 2 (8-min bridge walk)',
              '₩5,000 – ₩10,000 (ramyeon & drink)',
            ],
          ],
        },
        callout: {
          tone: 'tip',
          title: 'Check KSPO Dome Concert Schedules Before Going',
          body: 'Olympic Park hosts major weekend K-Pop concerts and arena festivals almost every Friday through Sunday. On concert days, merchandise queues and banner setups make KSPO Dome electric to see, though cafes near Olympic Park Station fill up fast—grab your coffee closer to Dunchon-dong or Seongnae-dong first.',
        },
      },
      {
        id: 'jyp-center-and-olympic-park',
        heading: '2. Morning: JYP Entertainment Center & Olympic Park Loop',
        paragraphs: [
          'Ride Seoul Metro Line 5 to Dunchon-dong Station (Exit 3) or Line 9 to Hanseong Baekje Station, then follow Gangdong-daero along the edge of Olympic Park until you reach JYP Entertainment Center at 205 Gangdong-daero in Seongnae-dong. Home to Stray Kids, TWICE, and ITZY since the agency moved from Cheongdam in 2018, the building sits conspicuously across from the park’s north-east treeline.',
          'Just like HYBE and YG, JYP Center is an active corporate workplace and studio building—its organic cafe and interior floors are closed to the general public. Snap photos respectfully from the wide public sidewalk across or beside the crosswalk without blocking staff vehicles entering the underground garage or leaning on security barriers.',
          'Once you have your exterior photos, cross Gangdong-daero directly into Olympic Park (424 Olympic-ro, Songpa-gu). Follow the paved ridge paths into the center lawn to spot the iconic Olympic Park Lone Tree ("나홀로나무", Nahollo Namu), a solitary broad-crowned tree crowning a rolling grassy hill that regularly appears in Stray Kids outdoor vlogs and K-Pop photo shoots. From the hill, walk 15 minutes southeast past the Olympic Gymnastics Arena—KSPO Dome—where Stray Kids have headlined packed Seoul arena nights.',
        ],
        bullets: [
          'Seongnae-dong cafe side streets: Behind JYP Center along Seongan-ro, independent bakeries and quiet brunch spots cater to neighborhood locals and often host Stray Kids comeback or member birthday cup-sleeve events.',
          'Footwear note: Olympic Park spans more than 1.4 million square meters—wear cushioned walking sneakers rather than flat fashion boots if you plan to loop from the Lone Tree past Mongchon Earthen Fortress.',
        ],
      },
      {
        id: 'gwangjang-and-myeongdong-feast',
        heading: '3. Midday: Gwangjang Market Missions & Myeongdong Kyoja',
        paragraphs: [
          'Walk back to Olympic Park Station or Dunchon-dong Station and ride Line 5 straight west without changing lines to Euljiro 4-ga Station (Exit 4), then stroll five minutes north to Gwangjang Market (88 Changgyeonggung-ro, Jongno-gu). This covered 1905 market gained extra love among international STAYs after Stray Kids filmed energetic street-food challenges winding between its sizzling griddles and steaming noodle counters.',
          'After sampling market bites, ride one quick subway leg or walk 20 minutes southwest past Euljiro into central Myeongdong to visit Myeongdong Kyoja Main Branch (29 Myeongdong 10-gil, Jung-gu), tucked just off Exit 8 of Line 4 Myeongdong Station. Mentioned warmly by Stray Kids members including Felix and Seungmin as well as BTS’s RM, this Michelin-listed institution focuses on a tight four-item menu anchored by silky chicken-broth kalguksu (knife-cut wheat noodles) topped with minced pork wontons and plump steamed mandu.',
        ],
        subsections: [
          {
            heading: 'Pacing Both Meals Without Over-Ordering',
            paragraphs: [
              'Eating two full lunches back-to-back catches many travelers off guard. At Gwangjang Market, share one crispy mung-bean pancake (nokdu bindaetteok) and one tray of bite-sized mayak gimbap rather than ordering heavy stews, keeping room for a warm bowl at Myeongdong Kyoja afterward.',
              'Inside Myeongdong Kyoja, notice two local quirks: staff collect your payment right when they drop off your tray (around ₩11,000 per dish), and the complimentary house cabbage kimchi packs an unusually punchy raw-garlic heat. Ask staff gently for "Myeon sari juseyo" (면 사리 주세요) if you want free extra noodles or steamed rice.',
            ],
          },
        ],
      },
      {
        id: 'nodeul-island-sunset',
        heading: '4. Late Afternoon: Nodeul Island Sunset & Han River Ramyeon',
        paragraphs: [
          'From Myeongdong, take Line 4 two stops south to Dongjak Station and transfer to Line 9 one stop west to Nodeul Station (Exit 2), or hop on a southbound bus from Seoul Station directly onto the Hangang Bridge pedestrian deck. Both routes drop you onto Nodeul Island (445 Yangnyeong-ro, Yongsan-gu), a serene green cultural island anchored midway across the Han River.',
          'Featured across K-Pop outdoor live clips and Stray Kids behind-the-scenes shoots, Nodeul Island pairs low brick music halls and bookstores with wide west-facing lawns overlooking Yeouido’s 63 Building and railway bridge trusses. As dusk settles, clouds turn pink and purple behind the skyline while cyclists cruise along the river deck.',
          'Stop inside the island convenience store near the plaza steps to buy a paper-bowl ramyeon packet, bottled green tea, and an optional boiled egg or slice of cheese. Using the store’s outdoor induction hot-plate counter, tap your foil bowl onto the sensor button for four minutes of boiling broth, then carry the steaming tray out onto the tiered grass steps for a classic Seoul sunset picnic.',
        ],
        bullets: [
          'Bring small tissues or wet wipes and a light windbreaker—river breezes cool down noticeably once the sun dips behind Yeouido, even in late spring.',
          'Dispose of broth dregs properly at the convenience store liquid drain funnel before stacking empty paper bowls in the recycling rack.',
        ],
      },
      {
        id: 'optional-stay-extensions',
        heading: '5. Optional Extra STAY Stops Around Greater Seoul & Beyond',
        paragraphs: [
          'If you have a second morning or plan regional train travel, three additional Stray Kids spots extend this itinerary cleanly without guesswork. Inside southwestern Seoul on Line 1/7 (Onsu Station) sits the School of Performing Arts Seoul—SOPA (14-1 Ori-ro 22ga-gil, Guro-gu)—famous for its mustard-yellow uniforms and attended by Hyunjin and I.N alongside BTS’s Jungkook.',
          'On a relaxed evening outside central Seoul, ride the Gimpo Goldline out to Janggi Station to walk Gimpo Laveniche March Avenue (26 Taejang-ro 795beon-gil, Gimpo-si), the illuminated canal promenade in Lee Know’s hometown lined with waterfront cafes and dessert spots. And if you ride the KTX south to Busan, save an evening for I.N’s hometown favorite, Gwangalli Beach (219 Gwanganhaebyeon-ro, Suyeong-gu), especially on Saturday nights when drone light shows reflect off Gwangan Bridge.',
        ],
        callout: {
          tone: 'etiquette',
          title: 'Active High School Etiquette at SOPA',
          body: 'SOPA is a working high school attended by teenagers every weekday. If you visit for a quick souvenir snapshot of the building sign, stand strictly outside the main gate along the public street—never walk onto campus grounds, peer through fences, or photograph students in uniform.',
        },
      },
    ],
    companionCta: {
      eyebrow: 'Interactive Route Planner',
      title: 'Open All 5 Stray Kids Stops on the K-Pulse Map',
      description:
        'Check verified pins, exterior gallery photos, leg-by-leg distances, and one-tap Naver Map, KakaoMap, and Google Maps links for the Stray Kids Seoul route.',
      href: '/map/course/stray-kids-seoul-stay-tour',
      buttonLabel: 'Launch Stray Kids Seoul Map',
    },
    relatedQuizSlugs: ['stray-kids-stay-trivia', 'which-stray-kids-member-are-you'],
    sources: [
      {
        label: 'Visit Seoul Official Travel Guide',
        detail: 'Olympic Park, Gwangjang Market, Myeongdong, and Nodeul Island transit and visitor access.',
        url: 'https://english.visitseoul.net',
      },
      {
        label: 'Michelin Guide Seoul',
        detail: 'Myeongdong Kyoja Main Branch Bib Gourmand profile and menu notes.',
        url: 'https://guide.michelin.com',
      },
      {
        label: 'Korea Sports Promotion Foundation (KSPO) — Olympic Park',
        detail: 'Walking grounds, Lone Tree hillside access, and KSPO Dome event area info.',
      },
    ],
  },
  {
    slug: 'gangneung-gyeonggi-kpop-day-trips-from-seoul',
    locale: 'en',
    title:
      'Best K-Pop Day Trips From Seoul: Jumunjin BTS Bus Stop (Gangneung), Ilsan Lake Park & Iryeong Station',
    subtitle:
      'How to reach South Korea’s iconic coastal album-cover stop by KTX-Eum plus half-day metro excursions into Gyeonggi-do for RM’s Ilsan bike loop, Spring Day’s railway, and idol hometowns.',
    description:
      'Plan easy K-Pop day trips from Seoul to the Jumunjin BTS Bus Stop in Gangneung, Ilsan Lake Park (RM), Iryeong Station (Spring Day MV), Gimpo Laveniche, and Sanbon.',
    category: 'Korea Travel',
    tags: ['Day Trips', 'Gangneung', 'BTS', 'K-Pop Map'],
    keywords: [
      'Jumunjin BTS bus stop from Seoul',
      'Gangneung KTX BTS guide',
      'Ilsan Lake Park RM Namjooning',
      'Iryeong Station Spring Day MV',
      'Korea K-Pop day trips from Seoul',
    ],
    publishedAt: '2026-11-25',
    updatedAt: '2026-11-25',
    author: {
      name: 'K-Pulse Editorial Team',
      role: 'Korean Culture & K-Pop Research Desk',
    },
    coverEmoji: '🏖️',
    accentBg: 'bg-sky-50',
    featured: false,
    keyTakeaways: [
      'The Jumunjin BTS Bus Stop sits along Gangneung’s Hyangho Beach—easily visited in a single day from Seoul via the 2-hour KTX-Eum high-speed train plus a 35-minute local coastal bus or cab.',
      'Closer to Seoul, Ilsan Lake Park (RM’s hometown "Namjooning" trail) and Sanbon Central Park (Jisoo’s hometown) require no train reservation—just a regular T-Money subway tap on Lines 3 and 4.',
      'Iryeong Station in Yangju (famous from BTS’s "Spring Day" MV) sits along the restored Gyooe suburban rail corridor—always stay off active tracks and shoot strictly from permitted public platforms or exterior crossings.',
      'Gimpo Laveniche March Avenue (Lee Know’s hometown) comes alive after sunset when canal bridges glow—making it a relaxed late-afternoon detour even on departure or arrival days near Gimpo Airport.',
    ],
    intro: [
      'Once you check off HYBE, YG, and JYP inside Seoul, some of the most memorable K-Pop filming locations and idol hometown parks sit just outside city limits. On the east coast, deep turquoise waves crash steps behind the wooden bus shelter recreated for BTS’s "You Never Walk Alone" album jacket; north and south of Seoul across Gyeonggi-do, leafy lake paths, retro train platforms, and lantern-lit canals preserve quieter chapters of Korean pop history.',
      'Many overseas visitors skip these stops thinking provincial Korea demands a rental car or guided bus tour. In reality, South Korea’s KTX-Eum eastbound rail corridor and suburban metro lines connect almost all of them cleanly on a regular transit card or single reserved train ticket.',
      'Compare transit times, ticket costs, local bus connections, and essential safety rules below to pick the right half-day or full-day escape from Seoul.',
    ],
    sections: [
      {
        id: 'day-trip-comparison',
        heading: '1. East Coast KTX vs. Suburban Metro Day Trips at a Glance',
        paragraphs: [
          'Match your choice to the hours you have free. Gangneung demands a dedicated full day (roughly 8 to 10 hours door-to-door), whereas Ilsan, Iryeong, Gimpo, and Sanbon fit effortlessly into a crisp morning or sunset half-day without packing an overnight bag.',
        ],
        table: {
          caption: 'Five Verified K-Pop Day Trips From Central Seoul',
          headers: ['Destination & Address', 'Artist / Era Tie-In', 'Transit From Seoul', 'Ideal Time Window'],
          rows: [
            [
              'Jumunjin BTS Bus Stop (8-55 Hyangho-ri, Jumunjin-eup, Gangneung)',
              'BTS "You Never Walk Alone" jacket cover',
              'KTX-Eum to Gangneung (~2h, ~₩27,600) + Bus #300/#302 or taxi (~35m)',
              'Full day (leave Seoul ~07:30–08:30)',
            ],
            [
              'Ilsan Lake Park (595 Hosu-ro, Ilsandong-gu, Goyang)',
              'RM hometown & original "Namjooning" trail',
              'Seoul Metro Line 3 → Jeongbalsan Exit 1/2 (~45–55m)',
              'Half day (morning or golden hour)',
            ],
            [
              'Iryeong Station (647-5 Samsang-ri, Jangheung-myeon, Yangju)',
              'BTS "Spring Day" MV snow-covered railway',
              'Line 3 Gupabal/Daegok → suburban bus or Gyooe Line (~60–75m)',
              'Half day (pair with Bukhansan foothills)',
            ],
            [
              'Gimpo Laveniche March Ave (26 Taejang-ro 795beon-gil, Gimpo)',
              'Stray Kids Lee Know hometown canal walk',
              'Airport Railroad/Line 5 → Gimpo Goldline Janggi (~55m)',
              'Late afternoon into evening lights',
            ],
            [
              'Sanbon Central Park & Rodeo St (20 Sanbon-ro 323beon-gil, Gunpo)',
              'BLACKPINK Jisoo school-days hometown',
              'Seoul Metro Line 4 → Sanbon Exit 3 (~45m)',
              'Afternoon stroll + local dinner',
            ],
          ],
        },
        callout: {
          tone: 'tip',
          title: 'Book Weekend Gangneung KTX-Eum Seats Early',
          body: 'East Coast KTX-Eum trains departing Seoul Station and Cheongnyangni Station routinely sell out on Friday evenings, Saturday mornings, and Sunday afternoons. Reserve round-trip tickets via LetsKorail 2–3 weeks in advance—or target Tuesday through Thursday for quiet beach queues and effortless seat choice.',
        },
      },
      {
        id: 'gangneung-jumunjin-full-day',
        heading: '2. Full Day in Gangneung: Jumunjin BTS Bus Stop & Coffee Coastline',
        paragraphs: [
          'Board an early morning KTX-Eum train at Seoul Station or Cheongnyangni Station bound for Gangneung Station (roughly 1 hour 50 minutes to 2 hours 10 minutes, around ₩27,600 each way in standard class). From the plaza outside Gangneung Station, ride city bus #300 or #302 north toward Jumunjin—or split a 30-minute metered taxi (roughly ₩22,000–₩28,000) straight to Hyangho Beach (8-55 Hyangho-ri, Jumunjin-eup).',
          'Because the original prop shelter installed during BTS’s 2017 "You Never Walk Alone" jacket shoot was temporary, Gangneung City rebuilt and permanently maintained an exact wooden bus-stop replica overlooking the East Sea dunes—no buses actually stop at this commemorative shelter, meaning you can photograph freely beside the bright ocean horizon. On clear weekdays, expect a friendly 5- to 15-minute photo turn queue where fellow travelers happily swap camera duties.',
          'Rather than boarding a train back immediately after ten minutes on the sand, turn Gangneung into a full coastal day. Ride south along the shoreline to Yeongjin Beach’s famous breakwater (featured in the K-Drama "Goblin"), visit Jumunjin Fish Market for fresh grilled fish or spicy seafood stew, and finish your afternoon along Anmok Beach Coffee Street—Korea’s celebrated oceanfront strip lined with three-story roasteries right beside Gangneung Station before catching an evening KTX back to Seoul.',
        ],
      },
      {
        id: 'ilsan-lake-park-rm',
        heading: '3. Half-Day Escape: RM’s Ilsan Lake Park & "Namjooning" Route',
        paragraphs: [
          'Long before "Namjooning"—slowing down to bike beside water, read poetry, and visit quiet art spaces—became global ARMY vocabulary, RM grew up in Ilsan and spent teenage afternoons writing lyrics and cycling around Ilsan Lake Park (595 Hosu-ro, Ilsandong-gu, Goyang-si). Reaching it requires zero advance reservations: ride Seoul Metro Line 3 northwest straight to Jeongbalsan Station (Exits 1 or 2) and stroll five minutes across Lake Park Plaza.',
          'The park loops nearly 4.7 kilometers around a vast artificial lake framed by weeping willows, lotus ponds, and paved red bicycle lanes. Download Goyang’s public bike app ("Tajo" or check rental kiosks near the main square in warmer months) or walk clockwise around Singing Fountain Plaza toward the traditional wooden Jeongja pavilion for peaceful greenery far calmer than central Myeongdong.',
          'When you finish your loop, cross back toward Lafesta or Western Dom pedestrian streets beside Jeongbalsan Station, or pair the afternoon with the serene Baekseok and Jeongbalsan-dong book cafes that give Goyang its famously unhurried literary atmosphere.',
        ],
      },
      {
        id: 'iryeong-station-spring-day',
        heading: '4. Yangju Iryeong Station: Retro "Spring Day" Railway & Safety Rules',
        paragraphs: [
          'North of Seoul in the forested valley between Bukhansan and Yangju lies Iryeong Station (647-5 Samsang-ri, Jangheung-myeon, Yangju-si)—the weathered green-and-white country train station featured in the snow-swept opening scenes of BTS’s 2017 "Spring Day" music video where V bends down along the iron tracks.',
          'For nearly two decades after passenger trains paused in 2004, Iryeong stood silent as a nostalgic filming backdrop. Following regional revitalization of the suburban Gyooe Line linking Daegok, Iryeong, and Uijeongbu, visitors can check local Gyooe Line train timetables from Daegok Station (where Line 3 meets the GTX-A and Gyeongui-Jungang lines) or take suburban buses (#15-1 or #360 series from Gupabal Station Exit 2) directly through Jangheung’s mountain valley.',
        ],
        callout: {
          tone: 'etiquette',
          title: 'Active Railway Safety: Stay Off the Tracks',
          body: 'Never step past yellow safety lines or stand between iron rails to recreate "Spring Day" poses. Following the Gyooe Line’s revival, diesel passenger trains and inspection cars run along this track corridor—keep all cameras strictly on designated station platforms, exterior pedestrian crossings, and public roadside viewpoints.',
        },
      },
      {
        id: 'gimpo-and-sanbon-suburbs',
        heading: '5. Quick Sunset & Foodie Detours: Gimpo Laveniche & Sanbon',
        paragraphs: [
          'Two overlooked Gyeonggi-do towns reward fans staying near western Seoul or looking for authentic neighborhood food far from tourist menus. In Gimpo—Stray Kids dancer Lee Know’s hometown—board the sleek Gimpo Goldline light rail from Gimpo International Airport Station to Janggi Station and walk ten minutes to Gimpo Laveniche March Avenue (26 Taejang-ro 795beon-gil). Styled after European canal promenades, water channels reflect glowing pedestrian footbridges while families stroll past dessert cafes and casual restaurants at dusk.',
          'On Seoul’s southern Line 4 corridor, 45 minutes from Myeongdong, sits Sanbon Station—center of Jisoo’s school-days hometown in Gunpo. Step out of Exit 3 onto Sanbon Rodeo Street and adjacent Sanbon Central Park (20 Sanbon-ro 323beon-gil), a lively pedestrian hub packed with budget Korean BBQ spots, student snack stalls, and quiet neighborhood benches where few overseas tour groups ever wander.',
        ],
        bullets: [
          'Smart Gimpo Airport pairing: Because Gimpo Laveniche sits just ~25 minutes from Gimpo Airport on the Goldline, it makes an effortless evening meal walk if you fly domestically to Busan or Jeju the next morning.',
          'Transit check: Your standard Seoul T-Money card covers Line 3 to Ilsan, Line 4 to Sanbon, and the Gimpo Goldline seamlessly with automatic subway transfer discounts.',
        ],
      },
    ],
    companionCta: {
      eyebrow: 'Verified Regional Spots',
      title: 'Explore All 30 K-Pop Spots Across Seoul, Gangwon & Gyeonggi',
      description:
        'Browse real photos, verified Korean road addresses, and one-tap Naver Map, KakaoMap, and Google Maps pins across every region.',
      href: '/map',
      buttonLabel: 'Open Interactive K-Pop Map',
    },
    relatedQuizSlugs: ['bts-army-trivia', 'stray-kids-stay-trivia', 'which-blackpink-member-are-you'],
    sources: [
      {
        label: 'KORAIL (LetsKorail) — Gyeonggang Line KTX-Eum',
        detail: 'Seoul/Cheongnyangni to Gangneung express train schedules, fares, and Gyooe Line regional updates.',
        url: 'https://www.letskorail.com',
      },
      {
        label: 'Visit Korea (Korea Tourism Organization) — Gangneung & Gyeonggi Guides',
        detail: 'Hyangho Beach BTS Bus Stop location, Anmok Coffee Street, and Ilsan Lake Park visitor details.',
        url: 'https://english.visitkorea.or.kr',
      },
      {
        label: 'Gyeonggi Tourism Organization',
        detail: 'Transit routes for Goyang Ilsan Lake Park, Yangju Jangheung valley, and Gimpo Laveniche.',
      },
    ],
  },
];
