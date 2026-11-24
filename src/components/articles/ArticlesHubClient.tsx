'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';
import type { ArticleCategory, ArticleSummary } from '@/types/article';

const CATEGORIES: Array<'All' | ArticleCategory> = [
  'All',
  'Korea Travel',
  'Names & Saju',
  'Food & Culture',
  'K-Pop & K-Drama',
];

interface ArticlesHubClientProps {
  articles: ArticleSummary[];
}

export default function ArticlesHubClient({ articles }: ArticlesHubClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ArticleCategory>('All');

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All') return articles;
    return articles.filter((article) => article.category === selectedCategory);
  }, [articles, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      {/* Masthead */}
      <section className="border-b border-slate-200/80 bg-white py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded border border-stone-200 bg-[#FAF8F5] px-2.5 py-1 text-[11px] font-mono font-medium text-stone-700 mb-4">
              <BookOpen className="w-3.5 h-3.5 text-rose-600" />
              <span>K-PULSE EDITORIAL · {articles.length} IN-DEPTH GUIDES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 leading-[1.15]">
              Korean Culture, Travel &amp; K-Pop Field Guides
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Practical, thoroughly researched guides covering Seoul &amp; Busan K-Pop transit routes, Korean naming and Saju Five Elements, dining etiquette, spicy food benchmarks, and fandom history—written to help you travel smarter and understand the culture behind the music.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              const count =
                category === 'All'
                  ? articles.length
                  : articles.filter((a) => a.category === category).length;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white border border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="group rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  className={`px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-2 ${article.accentBg}`}
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                    <span className="text-base">{article.coverEmoji}</span>
                    <span>{article.category}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-600">
                    <Clock className="w-3 h-3" />
                    <span>{article.readingTimeMinutes} min read</span>
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <Link href={`/articles/${article.slug}`} className="block">
                    <h2 className="text-lg font-bold text-slate-950 leading-snug group-hover:text-rose-700 transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                  </Link>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                  <Calendar className="w-3 h-3" />
                  <span>{article.publishedAt}</span>
                </span>
                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-slate-900 group-hover:text-rose-700 transition-colors"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
