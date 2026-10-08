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

export const quizzes: Quiz[] = [
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

export function getFeaturedQuizzes(): Quiz[] {
  return quizzes.filter((q) => q.featured);
}

export function getQuizzesByCategory(category: Category): Quiz[] {
  if (category === 'All') return quizzes;
  return quizzes.filter((q) => q.category === category);
}

export function getRelatedQuizzes(currentSlug: string, limit = 2): Quiz[] {
  return quizzes.filter((q) => q.slug !== currentSlug).slice(0, limit);
}
