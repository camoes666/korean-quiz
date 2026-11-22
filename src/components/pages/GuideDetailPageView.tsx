import GuideDetailClient from '@/components/guide/GuideDetailClient';
import { getRelatedTriviaQuizzes } from '@/data/quizzes';
import type { Quiz } from '@/types/quiz';
import type { SiteLocale } from '@/lib/i18nRoutes';
import { generateGuideDetailJsonLd } from '@/lib/pageSeo';

export default function GuideDetailPageView({
  quiz,
  locale,
}: {
  quiz: Quiz;
  locale: SiteLocale;
}) {
  const relatedGuides = getRelatedTriviaQuizzes(quiz.slug, 3);
  const schemas = generateGuideDetailJsonLd(quiz, locale);

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <GuideDetailClient quiz={quiz} relatedGuides={relatedGuides} />
    </>
  );
}
