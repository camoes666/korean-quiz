'use client';

import Link from 'next/link';
import { BookOpen, ArrowRight, Sparkles, Heart, HelpCircle, Compass } from 'lucide-react';
import { Quiz, getLocalizedText, getLocalizedArray } from '@/types/quiz';
import { getQuizFaq, getSampleQuestions, getSamplePersonalityQuestions } from '@/lib/seo';
import { getAllQuizzes } from '@/data/quizzes';
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
  const personalitySamples = isPersonality ? getSamplePersonalityQuestions(quiz, 3) : [];
  const results = Object.values(quiz.personalityResults || {});
  const faq = getQuizFaq(quiz);
  const localizedTitle = getLocalizedText(quiz, 'title', lang);

  // Build topical cluster links (same-tag quizzes + matching trivia study guide)
  const allQuizzes = getAllQuizzes();
  const sameTagQuizzes = allQuizzes.filter(
    (q) => q.slug !== quiz.slug && quiz.tag && q.tag === quiz.tag
  );
  const matchingTriviaGuide = isPersonality
    ? allQuizzes.find(
        (q) => q.quizType !== 'personality' && quiz.tag && q.tag === quiz.tag && q.questions.length > 0
      )
    : quiz;

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

  const sampleSubtext = isPersonality
    ? lang === 'ko'
      ? `총 ${quiz.personalityQuestions?.length || 10}개의 성향 시나리오 질문 중 일부입니다.`
      : lang === 'es'
      ? `Un adelanto de las ${quiz.personalityQuestions?.length || 10} preguntas de personalidad del test.`
      : lang === 'pt'
      ? `Uma prévia das ${quiz.personalityQuestions?.length || 10} perguntas de personalidade do teste.`
      : `A sneak peek at the ${quiz.personalityQuestions?.length || 10} scenario questions in this personality test.`
    : lang === 'ko'
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

  const guideTargetHref = matchingTriviaGuide ? `/guide/${matchingTriviaGuide.slug}` : '/guide';

  const guideCtaLabel = isPersonality
    ? matchingTriviaGuide
      ? lang === 'ko'
        ? `${getLocalizedText(matchingTriviaGuide, 'title', lang)} 전체 ${matchingTriviaGuide.questions.length}문제 정답 & 팬 로어 가이드 보기`
        : lang === 'es'
        ? `Explorar la Guía de Lore de ${quiz.tag} (${matchingTriviaGuide.questions.length} Datos y Respuestas Verificadas)`
        : lang === 'pt'
        ? `Explorar o Guia de Lore de ${quiz.tag} (${matchingTriviaGuide.questions.length} Fatos e Respostas Verificadas)`
        : `Explore the ${quiz.tag} Fan Lore & Study Guide (${matchingTriviaGuide.questions.length} Verified Q&A Facts)`
      : lang === 'ko'
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
      ? `모든 결과 유형 및 멤버별 궁합 (${results.length}가지 아키타입)`
      : lang === 'es'
      ? `Todos los resultados posibles y compatibilidad (${results.length} arquetipos)`
      : lang === 'pt'
      ? `Todos os resultados possíveis e compatibilidade (${results.length} arquétipos)`
      : `All Possible Results & Soulmate Compatibility (${results.length} Archetypes)`;

  const twinLabel =
    quiz.tag === 'BTS'
      ? 'BT21 Twin'
      : quiz.tag === 'Stray Kids'
      ? 'SKZOO Twin'
      : lang === 'ko'
      ? '상징 캐릭터'
      : lang === 'es'
      ? 'Personaje Gemelo'
      : lang === 'pt'
      ? 'Personagem Gêmeo'
      : 'Character Twin';

  const bestMatchLabel =
    lang === 'ko'
      ? '환상의 케미 (Best Match)'
      : lang === 'es'
      ? 'Mejor Compatibilidad (Soulmate Match)'
      : lang === 'pt'
      ? 'Melhor Compatibilidade (Soulmate Match)'
      : 'Best Chemistry Match';

  const clusterHeading =
    lang === 'ko'
      ? `${quiz.tag || 'K-Pop'} 팬들을 위한 연관 테스트 & 퀴즈`
      : lang === 'es'
      ? `Más Tests y Quizzes de ${quiz.tag || 'K-Pop'}`
      : lang === 'pt'
      ? `Mais Testes e Quizzes de ${quiz.tag || 'K-Pop'}`
      : `More ${quiz.tag || 'K-Pop'} Quizzes & Soulmate Tests`;

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
            href={guideTargetHref}
            className="inline-flex items-center gap-2 text-sm font-extrabold text-purple-700 hover:text-purple-900 transition-colors"
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span className="underline underline-offset-4">{guideCtaLabel}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>
      </div>

      {/* Topical Internal Link Cluster for Same-Group Quizzes */}
      {sameTagQuizzes.length > 0 && (
        <div className="qz-card rounded-3xl border-2 border-purple-100 bg-white p-6">
          <h2 className="qz-card-title text-lg font-black flex items-center gap-2">
            <Compass className="w-5 h-5 text-purple-600 shrink-0" />
            <span>{clusterHeading}</span>
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {sameTagQuizzes.map((rel) => (
              <Link
                key={rel.slug}
                href={`/quiz/${rel.slug}`}
                className="group flex items-start gap-3 rounded-2xl border border-purple-100 bg-purple-50/40 hover:bg-purple-50 hover:border-purple-300 p-3.5 transition-all"
              >
                <span className="text-2xl shrink-0">{rel.coverEmoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
                    {getLocalizedText(rel, 'title', lang)}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                    {getLocalizedText(rel, 'subtitle', lang)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

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

      {personalitySamples.length > 0 && (
        <div className="qz-card rounded-3xl border-2 border-purple-100 bg-white p-6">
          <h2 className="qz-card-title text-xl font-black flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-600 shrink-0" />
            <span>{sampleHeading}</span>
          </h2>
          <p className="qz-card-muted mt-2 text-sm">{sampleSubtext}</p>
          <ol className="mt-4 space-y-4">
            {personalitySamples.map((q, i) => (
              <li key={q.id} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="font-bold text-slate-900">
                  {q.emoji ? `${q.emoji} ` : ''}Q{i + 1}. {getLocalizedText(q, 'question', lang)}
                </p>
                <ul className="mt-2 grid gap-1.5 text-xs sm:text-sm text-slate-700 sm:grid-cols-2">
                  {q.options.map((o) => (
                    <li key={o.id} className="rounded-lg bg-white px-2.5 py-1.5 border border-slate-200/70">
                      <span className="font-bold text-purple-700">{o.id}.</span>{' '}
                      {getLocalizedText(o, 'text', lang)}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      )}

      {results.length > 0 && (
        <div className="qz-card rounded-3xl border-2 border-purple-100 bg-white p-6">
          <h2 className="qz-card-title text-xl font-black">{resultsHeading}</h2>
          <ul className="mt-4 space-y-5">
            {results.map((r) => {
              const traits = getLocalizedArray(r, 'traits', lang);
              const skzoo = getLocalizedText(r, 'skzoo', lang);
              const bestMatchName = getLocalizedText(r, 'bestMatchName', lang);
              const bestMatchReason = getLocalizedText(r, 'bestMatchReason', lang);

              return (
                <li
                  key={r.id}
                  className="rounded-2xl border border-purple-100/90 bg-slate-50/50 p-4 sm:p-5"
                >
                  <h3 className="font-black text-base sm:text-lg text-slate-900">
                    {r.emoji} {getLocalizedText(r, 'name', lang)} —{' '}
                    {getLocalizedText(r, 'title', lang)}
                  </h3>
                  <p className="qz-card-muted text-xs font-bold mt-1">
                    {getLocalizedText(r, 'subtitle', lang)}
                  </p>

                  {traits.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {traits.map((trait) => (
                        <span
                          key={trait}
                          className="inline-flex items-center gap-1 rounded-full bg-purple-100/80 px-2.5 py-0.5 text-[11px] font-extrabold text-purple-800"
                        >
                          <Sparkles className="w-2.5 h-2.5 text-purple-600" />
                          {trait}
                        </span>
                      ))}
                      {skzoo && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/80 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-900">
                          {twinLabel}: {skzoo}
                        </span>
                      )}
                    </div>
                  )}

                  <p className="mt-2.5 text-sm text-slate-700 leading-relaxed">
                    {getLocalizedText(r, 'description', lang)}
                  </p>

                  {bestMatchName && (
                    <div className="mt-3 rounded-xl bg-white border border-pink-100 px-3.5 py-2.5 text-xs">
                      <span className="font-black text-pink-700 inline-flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                        {bestMatchLabel}: {bestMatchName}
                      </span>
                      {bestMatchReason && (
                        <p className="text-slate-600 mt-0.5 leading-relaxed">{bestMatchReason}</p>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
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
