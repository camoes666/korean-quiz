import QuizRunner from '@/components/QuizRunner';
import PersonalityTestRunner from '@/components/PersonalityTestRunner';
import QuizSeoContent from '@/components/QuizSeoContent';
import { getRelatedQuizzes } from '@/data/quizzes';
import type { Quiz } from '@/types/quiz';
import { getQuizThemeGroup } from '@/lib/theme';
import { generateQuizJsonLd } from '@/lib/seo';
import type { SiteLocale } from '@/lib/i18nRoutes';

export default function QuizPageView({
  quiz,
  locale,
}: {
  quiz: Quiz;
  locale: SiteLocale;
}) {
  const relatedQuizzes = getRelatedQuizzes(quiz.slug, 5);
  const themeGroup = getQuizThemeGroup(quiz.slug, quiz.tag);
  const jsonLdSchemas = generateQuizJsonLd(quiz, locale);

  return (
    <>
      {jsonLdSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {quiz.quizType === 'personality' ? (
        <main
          data-group={themeGroup}
          className="min-h-screen pb-16 transition-colors duration-300"
        >
          <PersonalityTestRunner quiz={quiz} relatedQuizzes={relatedQuizzes} />
          <QuizSeoContent quiz={quiz} />
        </main>
      ) : (
        <main
          data-group={themeGroup}
          className="min-h-screen pb-16 transition-colors duration-300"
        >
          <QuizRunner quiz={quiz} relatedQuizzes={relatedQuizzes} />
          <QuizSeoContent quiz={quiz} />
        </main>
      )}
    </>
  );
}
