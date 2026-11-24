import type { EditorialArticle } from '../../types/article';
import { TRAVEL_ARTICLES } from './travelArticles';
import { LANGUAGE_SAJU_ARTICLES } from './languageSajuArticles';
import { FOOD_CULTURE_ARTICLES } from './foodCultureArticles';
import { KPOP_KDRAMA_ARTICLES } from './kpopKdramaArticles';

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  ...TRAVEL_ARTICLES,
  ...LANGUAGE_SAJU_ARTICLES,
  ...FOOD_CULTURE_ARTICLES,
  ...KPOP_KDRAMA_ARTICLES,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
