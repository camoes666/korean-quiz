'use client';

import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Quiz, getLocalizedText } from '@/types/quiz';
import { getQuizFaq, getSampleQuestions } from '@/lib/seo';
import { useLanguage } from '@/context/LanguageContext';
import { getLevelBadge } from '@/lib/guides';

/**
 * Pre-rendered SEO content below the quiz. Renders in the active user language on the client
 * while preserving full static HTML and FAQPage structured data parity for search engines.
 */
export default function QuizSeoContent({ quiz }: { quiz: Quiz }) {
  const { lang } = useLanguage();
  const isPersonality = quiz.quizType === 'personality';
  const samples = isPersonality ? [] : getSampleQuestions(quiz);
  const results = Object.values(quiz.personalityResults || {});
  const faq = getQuizFaq(quiz);
  const localizedTitle = getLocalizedText(quiz, 'title', lang);

  const aboutHeading =
    lang === 'ko'
      ? `이 ${isPersonality ? '테스트' : '퀴즈'}에 대하여`
      : lang === 'es'
      ? `Sobre este ${isPersonality ? 'test' : 'quiz'}`
      : lang === 'pt'
      ? `Sobre este ${isPersonality ? 'teste' : 'quiz'}`
      : `About this ${isPersonality ? 'test' : 'quiz'}`;

  const sampleHeading =
    lang === 'ko'
      ? '예시 문제 미리보기'
      : lang === 'es'
      ? 'Preguntas de muestra'
      : lang === 'pt'
      ? 'Perguntas de exemplo'
      : 'Sample questions';

  const sampleSubtext =
    lang === 'ko'
      ? `총 ${quiz.questions.length}문제 은행 중 일부입니다. 정답을 보려면 탭하세요.`
      : lang === 'es'
      ? `Un adelanto del banco de ${quiz.questions.length} preguntas. Toca para ver la respuesta.`
      : lang === 'pt'
      ? `Uma prévia do banco de ${quiz.questions.length} perguntas. Toque para ver a resposta.`
      : `A taste of the ${quiz.questions.length}-question bank. Tap to reveal the answer.`;

  const showAnswerLabel =
    lang === 'ko'
      ? '정답 및 해설 보기'
      : lang === 'es'
      ? 'Ver respuesta'
      : lang === 'pt'
      ? 'Ver resposta'
      : 'Show answer';

  const guideCtaLabel = isPersonality
    ? lang === 'ko'
      ? '전체 K-컬처 & K-Pop 팬 지식 가이드 백과 보기'
      : lang === 'es'
      ? 'Explorar todas las Guías de Lore y Conocimiento K-Pop'
      : lang === 'pt'
      ? 'Explorar todos os Guias de Lore e Conhecimento K-Pop'
      : 'Explore All K-Culture & K-Pop Knowledge Guides'
    : lang === 'ko'
    ? `${localizedTitle} 전체 ${quiz.questions.length}문제 정답 및 해설 가이드 보기`
    : lang === 'es'
    ? `Ver la Guía Completa de ${localizedTitle} (${quiz.questions.length} Preguntas y Respuestas)`
    : lang === 'pt'
    ? `Ver o Guia Completo de ${localizedTitle} (${quiz.questions.length} Perguntas e Respostas)`
    : `Read the Complete ${quiz.title} Study Guide (All ${quiz.questions.length} Verified Q&As)`;

  const resultsHeading =
    lang === 'ko'
      ? '모든 결과 유형 한눈에 보기'
      : lang === 'es'
      ? 'Todos los resultados posibles'
      : lang === 'pt'
      ? 'Todos os resultados possíveis'
      : 'All possible results';

  const faqHeading =
    lang === 'ko'
      ? '자주 묻는 질문 (FAQ)'
      : lang === 'es'
      ? 'Preguntas Frecuentes (FAQ)'
      : lang === 'pt'
      ? 'Perguntas Frequentes (FAQ)'
      : 'Frequently Asked Questions (FAQ)';

  return (
    <section data-seo-content className="max-w-3xl mx-auto px-4 mt-4 space-y-6">
      <div className="qz-card rounded-3xl border-2 border-purple-100 bg-white p-6">
        <h2 className="qz-card-title text-xl font-black">{aboutHeading}</h2>
        <p className="qz-card-muted mt-3 leading-relaxed">
          {getLocalizedText(quiz, 'description', lang)}
        </p>
        <p className="qz-card-muted mt-2 leading-relaxed">
          {getLocalizedText(quiz, 'subtitle', lang)}
        </p>

        <div className="mt-4 pt-4 border-t border-purple-100/80">
          <Link
            href={isPersonality ? '/guide' : `/guide/${quiz.slug}`}
            className="inline-flex items-center gap-2 text-sm font-extrabold text-purple-700 hover:text-purple-900 transition-colors"
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span className="underline underline-offset-4">{guideCtaLabel}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>
      </div>

      {samples.length > 0 && (
        <div className="qz-card rounded-3xl border-2 border-purple-100 bg-white p-6">
          <h2 className="qz-card-title text-xl font-black">{sampleHeading}</h2>
          <p className="qz-card-muted mt-2 text-sm">{sampleSubtext}</p>
          <ol className="mt-4 space-y-4">
            {samples.map((q, i) => {
              const answer = q.options.find((o) => o.id === q.correctAnswer);
              const qText = getLocalizedText(q, 'question', lang);
              const expText = getLocalizedText(q, 'explanation', lang);
              const ansText = answer ? getLocalizedText(answer, 'text', lang) : '';
              const levelBadge = q.level ? getLevelBadge(q.level, lang) : null;

              return (
                <li key={q.id}>
                  <p className="font-bold">
                    {i + 1}. {qText}
                  </p>
                  {levelBadge && (
                    <p className="qz-card-muted text-xs font-bold mt-1">{levelBadge.label}</p>
                  )}
                  <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
                    {q.options.map((o) => (
                      <li key={o.id}>
                        {o.id}. {getLocalizedText(o, 'text', lang)}
                      </li>
                    ))}
                  </ul>
                  <details className="mt-2 text-sm">
                    <summary
                      className="cursor-pointer font-bold"
                      style={{ color: 'var(--qz-accent-text)' }}
                    >
                      {showAnswerLabel}
                    </summary>
                    <p className="mt-1">
                      <strong>{ansText}</strong>: {expText}
                    </p>
                  </details>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {results.length > 0 && (
        <div className="qz-card rounded-3xl border-2 border-purple-100 bg-white p-6">
          <h2 className="qz-card-title text-xl font-black">{resultsHeading}</h2>
          <ul className="mt-4 space-y-4">
            {results.map((r) => (
              <li key={r.id}>
                <h3 className="font-black">
                  {r.emoji} {getLocalizedText(r, 'name', lang)}:{' '}
                  {getLocalizedText(r, 'title', lang)}
                </h3>
                <p className="qz-card-muted text-xs font-bold mt-1">
                  {getLocalizedText(r, 'subtitle', lang)}
                </p>
                <p className="mt-1 text-sm leading-relaxed">
                  {getLocalizedText(r, 'description', lang)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="qz-card rounded-3xl border-2 border-purple-100 bg-white p-6">
        <h2 className="qz-card-title text-xl font-black">{faqHeading}</h2>
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
