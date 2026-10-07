import { Quiz, Category } from '@/types/quiz';
import koreanCultureIq from './korean-culture-iq.json';
import kpopFandomTrivia from './kpop-fandom-trivia.json';
import kdramaTropeTrivia from './kdrama-trope-trivia.json';
import btsArmyTrivia from './bts-army-trivia.json';
import koreanSpicyFood from './korean-spicy-food.json';
import blackpinkBlinkTrivia from './blackpink-blink-trivia.json';
import strayKidsStayTrivia from './stray-kids-stay-trivia.json';

export const quizzes: Quiz[] = [
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
