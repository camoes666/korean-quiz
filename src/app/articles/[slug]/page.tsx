import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Info,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react';
import {
  countArticleWords,
  estimateArticleReadingMinutes,
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from '@/lib/articles';
import {
  generateArticleJsonLd,
  getArticleMetadata,
} from '@/lib/pageSeo';
import { getQuizBySlug } from '@/data/quizzes';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: 'Article Not Found | K-Pulse' };
  }
  return getArticleMetadata(article);
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const wordCount = countArticleWords(article);
  const readingMinutes = estimateArticleReadingMinutes(wordCount);
  const schemas = generateArticleJsonLd(article, wordCount);
  const relatedArticles = getRelatedArticles(article.slug, 3);
  const relatedQuizzes = article.relatedQuizSlugs
    .map((qSlug) => getQuizBySlug(qSlug))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="min-h-screen bg-[#FAFAFA] pb-20">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs font-medium text-slate-500 flex-wrap"
            >
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/articles" className="hover:text-slate-900">
                Articles
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-700">{article.category}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-950 font-semibold truncate max-w-xs sm:max-w-md">
                {article.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <header className="bg-white border-b border-slate-200/80 py-10 sm:py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 text-white px-3 py-1 font-semibold">
                  <span>{article.coverEmoji}</span>
                  <span>{article.category}</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 px-3 py-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~{readingMinutes} min read</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 px-3 py-1 font-mono">
                  <span>{wordCount.toLocaleString()} words</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-950 leading-[1.18]">
                {article.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {article.subtitle}
              </p>

              {/* Editorial Byline & Dates */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs">
                    KP
                  </span>
                  <div>
                    <Link
                      href="/about"
                      className="font-semibold text-slate-900 hover:underline"
                    >
                      {article.author.name}
                    </Link>
                    <div className="text-[11px] text-slate-500">
                      {article.author.role}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 font-mono text-[11px]">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Published: {article.publishedAt}
                  </span>
                  <span>Updated: {article.updatedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main 2-Column Article Body + Sidebar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Semantic Article */}
            <article className="lg:col-span-8 space-y-8">
              {/* Key Takeaways Box */}
              <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5 sm:p-6">
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-stone-700 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Key Takeaways</span>
                </h2>
                <ul className="space-y-2 text-sm text-slate-800 leading-relaxed">
                  {article.keyTakeaways.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Intro Paragraphs */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-5 text-slate-700 text-base leading-[1.8]">
                {article.intro.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}

                {/* Article Sections */}
                {article.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="pt-6 border-t border-slate-100 scroll-mt-24 space-y-4"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
                      {section.heading}
                    </h2>

                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}

                    {section.subsections && (
                      <div className="space-y-4 pt-1">
                        {section.subsections.map((sub) => (
                          <div key={sub.heading} className="space-y-2.5">
                            <h3 className="text-base sm:text-lg font-bold text-slate-900">
                              {sub.heading}
                            </h3>
                            {sub.paragraphs.map((sp, spIdx) => (
                              <p key={spIdx}>{sp}</p>
                            ))}
                            {sub.bullets && (
                              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
                                {sub.bullets.map((b) => (
                                  <li key={b}>{b}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {section.bullets && (
                      <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}

                    {section.table && (
                      <div className="my-5 overflow-x-auto rounded-xl border border-slate-200">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                          {section.table.caption && (
                            <caption className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 bg-slate-50 border-b border-slate-200">
                              {section.table.caption}
                            </caption>
                          )}
                          <thead>
                            <tr className="bg-slate-100/80 text-slate-800 border-b border-slate-200">
                              {section.table.headers.map((header) => (
                                <th
                                  key={header}
                                  className="py-2.5 px-3.5 font-bold whitespace-nowrap"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {section.table.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className={rIdx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}
                              >
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`py-2.5 px-3.5 align-top leading-relaxed ${
                                      cIdx === 0
                                        ? 'font-semibold text-slate-900'
                                        : 'text-slate-700'
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {section.callout && (
                      <aside
                        className={`rounded-xl border p-4 sm:p-5 text-sm leading-relaxed ${
                          section.callout.tone === 'etiquette'
                            ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                            : section.callout.tone === 'tip'
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-2 mb-1">
                          {section.callout.tone === 'tip' ? (
                            <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0" />
                          ) : (
                            <Info className="w-4 h-4 text-slate-700 shrink-0" />
                          )}
                          <span>{section.callout.title}</span>
                        </div>
                        <p>{section.callout.body}</p>
                      </aside>
                    )}
                  </section>
                ))}
              </div>

              {/* Companion Interactive Tool / Quiz Card */}
              <div className="rounded-2xl bg-slate-950 text-white p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="space-y-1.5 max-w-xl">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-semibold">
                    {article.companionCta.eyebrow}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {article.companionCta.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {article.companionCta.description}
                  </p>
                </div>

                <Link
                  href={article.companionCta.href}
                  className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-100 text-slate-950 px-5 py-3 text-xs sm:text-sm font-bold transition-colors"
                >
                  <span>{article.companionCta.buttonLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* References & Editorial Verification */}
              <section className="rounded-2xl bg-white border border-slate-200/80 p-6 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <h2>References &amp; Editorial Verification</h2>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {article.sources.map((src) => (
                    <li key={src.label} className="leading-relaxed">
                      <span className="font-semibold text-slate-800">{src.label}:</span>{' '}
                      {src.detail}
                      {src.url && (
                        <>
                          {' '}
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-rose-700 underline font-medium"
                          >
                            Source
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                  Spot an outdated transit change, hour adjustment, or cultural detail?{' '}
                  <Link href="/contact" className="text-slate-900 underline font-semibold">
                    Report a correction to our editorial desk
                  </Link>
                  .
                </p>
              </section>
            </article>

            {/* Sticky Sidebar: Table of Contents + Related Quizzes */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <nav
                aria-label="Table of contents"
                className="rounded-2xl bg-white border border-slate-200/80 p-5 space-y-3"
              >
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>In This Guide</span>
                </div>
                <ol className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {article.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="hover:text-slate-950 hover:underline leading-snug block"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {relatedQuizzes.length > 0 && (
                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 space-y-3">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Related Quizzes</span>
                  </div>
                  <div className="space-y-2.5">
                    {relatedQuizzes.map((quiz) => (
                      <Link
                        key={quiz.slug}
                        href={`/quiz/${quiz.slug}`}
                        className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-slate-100 p-3 transition-colors"
                      >
                        <span className="text-xl shrink-0">{quiz.coverEmoji}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 leading-snug">
                            {quiz.title}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                            {quiz.subtitle}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* Bottom Related Articles Grid */}
          <section className="mt-14 pt-10 border-t border-slate-200/80">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
                  More K-Culture &amp; Travel Guides
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Continue exploring verified Korean travel, language, food, and fandom features.
                </p>
              </div>
              <Link
                href="/articles"
                className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-rose-700 inline-flex items-center gap-1 shrink-0"
              >
                <span>All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/articles/${rel.slug}`}
                  className="group rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 p-5 flex flex-col justify-between transition-all hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                      <span className="font-semibold text-slate-700">
                        {rel.coverEmoji} {rel.category}
                      </span>
                      <span className="font-mono text-[11px]">
                        {rel.readingTimeMinutes} min
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-950 group-hover:text-rose-700 transition-colors leading-snug line-clamp-2">
                      {rel.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {rel.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-900 inline-flex items-center gap-1">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
