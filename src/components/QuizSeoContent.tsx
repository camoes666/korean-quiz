import type { Quiz } from '@/types/quiz';
import { getQuizFaq, getSampleQuestions } from '@/lib/seo';

const LEVEL_LABEL: Record<number, string> = { 1: 'Level 1 · Rookie', 2: 'Level 2 · Fan', 3: 'Level 3 · Hardcore' };

/**
 * Server-rendered text below the quiz. The quiz itself renders on the client, so without
 * this the static HTML has almost nothing for search engines to read. English only: it
 * targets English search, and the FAQ must match the FAQPage structured data verbatim.
 */
export default function QuizSeoContent({ quiz }: { quiz: Quiz }) {
  const isPersonality = quiz.quizType === 'personality';
  const samples = isPersonality ? [] : getSampleQuestions(quiz);
  const results = Object.values(quiz.personalityResults || {});
  const faq = getQuizFaq(quiz);

  return (
    <section data-seo-content className="max-w-3xl mx-auto px-4 mt-4 space-y-6">
      <div className="qz-card rounded-3xl border-2 border-purple-100 bg-white p-6">
        <h2 className="qz-card-title text-xl font-black">About this {isPersonality ? 'test' : 'quiz'}</h2>
        <p className="qz-card-muted mt-3 leading-relaxed">{quiz.description}</p>
        <p className="qz-card-muted mt-2 leading-relaxed">{quiz.subtitle}</p>
      </div>

      {quiz.titleEs && quiz.descriptionEs && (
        <div className="qz-card rounded-3xl border-2 border-pink-100 bg-white p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 tracking-wide uppercase">
              Español
            </span>
            <h2 className="qz-card-title text-xl font-black">{quiz.titleEs}</h2>
          </div>
          <p className="qz-card-muted mt-2 leading-relaxed">{quiz.descriptionEs}</p>
          {quiz.subtitleEs && <p className="qz-card-muted mt-1 leading-relaxed text-sm font-medium">{quiz.subtitleEs}</p>}
        </div>
      )}

      {samples.length > 0 && (
        <div className="qz-card rounded-3xl border-2 border-purple-100 bg-white p-6">
          <h2 className="qz-card-title text-xl font-black">Sample questions</h2>
          <p className="qz-card-muted mt-2 text-sm">
            A taste of the {quiz.questions.length}-question bank. Tap to reveal the answer.
          </p>
          <ol className="mt-4 space-y-4">
            {samples.map((q, i) => {
              const answer = q.options.find((o) => o.id === q.correctAnswer);
              return (
                <li key={q.id}>
                  <p className="font-bold">
                    {i + 1}. {q.question}
                  </p>
                  {q.questionEs && (
                    <p className="text-xs text-slate-500 italic mt-0.5">
                      (ES: {q.questionEs})
                    </p>
                  )}
                  {q.level && <p className="qz-card-muted text-xs font-bold mt-1">{LEVEL_LABEL[q.level]}</p>}
                  <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
                    {q.options.map((o) => (
                      <li key={o.id}>
                        {o.id}. {o.text} {o.textEs ? <span className="text-xs text-slate-400 font-normal">({o.textEs})</span> : null}
                      </li>
                    ))}
                  </ul>
                  <details className="mt-2 text-sm">
                    <summary className="cursor-pointer font-bold" style={{ color: 'var(--qz-accent-text)' }}>Show answer</summary>
                    <p className="mt-1">
                      <strong>{answer?.text}</strong>: {q.explanation}
                    </p>
                    {q.explanationEs && (
                      <p className="mt-1 text-xs text-slate-500 italic">
                        {q.explanationEs}
                      </p>
                    )}
                  </details>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {results.length > 0 && (
        <div className="qz-card rounded-3xl border-2 border-purple-100 bg-white p-6">
          <h2 className="qz-card-title text-xl font-black">All possible results</h2>
          <ul className="mt-4 space-y-4">
            {results.map((r) => (
              <li key={r.id}>
                <h3 className="font-black">
                  {r.emoji} {r.name}: {r.title}
                </h3>
                {r.titleEs && (
                  <p className="text-xs font-bold text-pink-600 mt-0.5">
                    ES: {r.nameEs || r.name} - {r.titleEs}
                  </p>
                )}
                <p className="qz-card-muted text-xs font-bold mt-1">{r.subtitle}</p>
                <p className="mt-1 text-sm leading-relaxed">{r.description}</p>
                {r.descriptionEs && (
                  <p className="mt-1 text-xs text-slate-500 italic leading-relaxed">
                    {r.descriptionEs}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="qz-card rounded-3xl border-2 border-purple-100 bg-white p-6">
        <h2 className="qz-card-title text-xl font-black">Frequently Asked Questions (FAQ)</h2>
        <dl className="mt-4 space-y-4">
          {faq.map((item) => (
            <div key={item.question}>
              <dt className="font-bold text-slate-900">{item.question}</dt>
              <dd className="mt-1 text-sm text-slate-600 leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
