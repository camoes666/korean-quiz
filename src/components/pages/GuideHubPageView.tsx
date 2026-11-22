import {
  getAllQuizzes,
  getTotalTriviaQuestionCount,
  getTriviaQuizzes,
} from '@/data/quizzes';
import GuideHubClient from '@/components/guide/GuideHubClient';
import type { SiteLocale } from '@/lib/i18nRoutes';
import { generateGuideHubJsonLd } from '@/lib/pageSeo';

export default function GuideHubPageView({ locale }: { locale: SiteLocale }) {
  const triviaQuizzes = getTriviaQuizzes();
  const allQuizzes = getAllQuizzes();
  const personalityQuizzes = allQuizzes.filter((q) => q.quizType === 'personality');
  const totalQuestionCount = getTotalTriviaQuestionCount();
  const schemas = generateGuideHubJsonLd(locale);

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <GuideHubClient
        guides={triviaQuizzes}
        personalityQuizzes={personalityQuizzes}
        totalQuestionCount={totalQuestionCount}
      />
    </>
  );
}
