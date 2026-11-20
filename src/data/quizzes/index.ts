import { Quiz, Category } from '@/types/quiz';
import koreanCultureIq from './korean-culture-iq.json';
import kpopFandomTrivia from './kpop-fandom-trivia.json';
import kdramaTropeTrivia from './kdrama-trope-trivia.json';
import btsArmyTrivia from './bts-army-trivia.json';
import koreanSpicyFood from './korean-spicy-food.json';
import blackpinkBlinkTrivia from './blackpink-blink-trivia.json';
import strayKidsStayTrivia from './stray-kids-stay-trivia.json';
import whichStrayKidsMemberAreYou from './which-stray-kids-member-are-you.json';
import whichBtsMemberAreYou from './which-bts-member-are-you.json';
import whichBlackpinkMemberAreYou from './which-blackpink-member-are-you.json';
import whichKoreanFoodAreYou from './which-korean-food-are-you.json';
import whichAespaMemberAreYou from './which-aespa-member-are-you.json';
import whichLeSserafimMemberAreYou from './which-le-sserafim-member-are-you.json';
import whichBtsMemberIsYourSoulmate from './which-bts-member-is-your-soulmate.json';
import whichDoctorXCharacterAreYou from './which-doctor-x-character-are-you.json';
import doctorXWhiteMafiaTrivia from './doctor-x-white-mafia-trivia.json';
import whichTwiceMemberAreYou from './which-twice-member-are-you.json';
import whichEnhypenMemberAreYou from './which-enhypen-member-are-you.json';

export const quizzes: Quiz[] = [
  whichDoctorXCharacterAreYou as unknown as Quiz,
  doctorXWhiteMafiaTrivia as unknown as Quiz,
  whichTwiceMemberAreYou as unknown as Quiz,
  whichEnhypenMemberAreYou as unknown as Quiz,
  whichBtsMemberIsYourSoulmate as unknown as Quiz,
  whichAespaMemberAreYou as unknown as Quiz,
  whichLeSserafimMemberAreYou as unknown as Quiz,
  whichKoreanFoodAreYou as unknown as Quiz,
  whichBtsMemberAreYou as unknown as Quiz,
  whichStrayKidsMemberAreYou as unknown as Quiz,
  whichBlackpinkMemberAreYou as unknown as Quiz,
  btsArmyTrivia as Quiz,
  strayKidsStayTrivia as Quiz,
  blackpinkBlinkTrivia as Quiz,
  koreanSpicyFood as Quiz,
  koreanCultureIq as Quiz,
  kpopFandomTrivia as Quiz,
  kdramaTropeTrivia as Quiz,
];

export function getAllQuizzes(): Quiz[] {
  return quizzes;
}

export function getQuizBySlug(slug: string): Quiz | undefined {
  return quizzes.find((q) => q.slug === slug);
}

// Home hero carousel slides, in display order: newest test, top search entry, the long-time featured test.
const HERO_SLIDES = [
  { slug: 'which-bts-member-is-your-soulmate', badge: 'new' },
  { slug: 'which-stray-kids-member-are-you', badge: 'trending' },
  { slug: 'which-blackpink-member-are-you', badge: 'featured' },
] as const;

export function getHeroQuizzes(): { quiz: Quiz; badge: (typeof HERO_SLIDES)[number]['badge'] }[] {
  return HERO_SLIDES.flatMap(({ slug, badge }) => {
    const quiz = getQuizBySlug(slug);
    return quiz ? [{ quiz, badge }] : [];
  });
}

export function getFeaturedQuizzes(): Quiz[] {
  return quizzes.filter((q) => q.featured);
}

export function getQuizzesByCategory(category: Category): Quiz[] {
  if (category === 'All') return quizzes;
  return quizzes.filter((q) => q.category === category);
}

// High-appeal K-Pop personality tests ordered to encourage multi-quiz sessions.
const PERSONALITY_PRIORITY_ORDER = [
  'which-blackpink-member-are-you',
  'which-stray-kids-member-are-you',
  'which-bts-member-is-your-soulmate',
  'which-bts-member-are-you',
  'which-twice-member-are-you',
  'which-aespa-member-are-you',
  'which-enhypen-member-are-you',
  'which-le-sserafim-member-are-you',
];

function sortByPersonalityPriority(list: Quiz[]): Quiz[] {
  return [...list].sort((a, b) => {
    const idxA = PERSONALITY_PRIORITY_ORDER.indexOf(a.slug);
    const idxB = PERSONALITY_PRIORITY_ORDER.indexOf(b.slug);
    const rankA = idxA === -1 ? Number.MAX_SAFE_INTEGER : idxA;
    const rankB = idxB === -1 ? Number.MAX_SAFE_INTEGER : idxB;
    return rankA - rankB;
  });
}

// Rank related quizzes so personality tests stay within same-category personality tests
// before falling back to trivia or other categories, avoiding duplicate or off-topic leaks.
export function getRelatedQuizzes(
  currentSlug: string,
  limit = 4,
  excludeSlugs: string[] = []
): Quiz[] {
  const excluded = new Set([currentSlug, ...excludeSlugs]);
  const current = getQuizBySlug(currentSlug);
  const others = quizzes.filter((q) => !excluded.has(q.slug));
  if (!current) {
    return others.slice(0, limit);
  }

  const currentIsPersonality = current.quizType === 'personality';
  const tiers: Quiz[][] = currentIsPersonality
    ? [
        others.filter((q) => Boolean(current.tag && q.tag === current.tag && q.quizType === 'personality')),
        sortByPersonalityPriority(
          others.filter((q) => q.category === current.category && q.quizType === 'personality')
        ),
        others.filter((q) => Boolean(current.tag && q.tag === current.tag && q.quizType !== 'personality')),
        others.filter((q) => q.category === current.category && q.quizType !== 'personality'),
        sortByPersonalityPriority(others.filter((q) => q.quizType === 'personality')),
        others,
      ]
    : [
        others.filter((q) => Boolean(current.tag && q.tag === current.tag && q.quizType === 'personality')),
        others.filter((q) => q.category === current.category && q.quizType !== 'personality'),
        sortByPersonalityPriority(
          others.filter((q) => q.category === current.category && q.quizType === 'personality')
        ),
        others.filter((q) => q.quizType !== 'personality'),
        sortByPersonalityPriority(others.filter((q) => q.quizType === 'personality')),
      ];

  const seen = new Set<string>();
  const result: Quiz[] = [];
  for (const tier of tiers) {
    for (const item of tier) {
      if (seen.has(item.slug)) continue;
      seen.add(item.slug);
      result.push(item);
      if (result.length >= limit) {
        return result;
      }
    }
  }
  return result;
}

export function getTriviaQuizzes(): Quiz[] {
  return quizzes.filter((q) => q.quizType !== 'personality' && q.questions && q.questions.length > 0);
}

export function getTriviaQuizBySlug(slug: string): Quiz | undefined {
  return getTriviaQuizzes().find((q) => q.slug === slug);
}

export function getTotalTriviaQuestionCount(): number {
  return getTriviaQuizzes().reduce((total, q) => total + (q.questions?.length || 0), 0);
}

export function getRelatedTriviaQuizzes(currentSlug: string, limit = 3): Quiz[] {
  return getTriviaQuizzes().filter((q) => q.slug !== currentSlug).slice(0, limit);
}
