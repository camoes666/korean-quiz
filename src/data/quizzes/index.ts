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
import whichTwiceMemberAreYou from './which-twice-member-are-you.json';
import whichEnhypenMemberAreYou from './which-enhypen-member-are-you.json';

export const quizzes: Quiz[] = [
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

// Same-tag quizzes come first so e.g. the two BTS personality tests link to each other.
export function getRelatedQuizzes(currentSlug: string, limit = 2): Quiz[] {
  const current = getQuizBySlug(currentSlug);
  const others = quizzes.filter((q) => q.slug !== currentSlug);
  const sameTag = others.filter((q) => current?.tag && q.tag === current.tag);
  const rest = others.filter((q) => !sameTag.includes(q));
  return [...sameTag, ...rest].slice(0, limit);
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
