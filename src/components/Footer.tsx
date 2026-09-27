'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 mt-auto py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                {t.siteTitle}
              </span>
              <span className="text-xs text-zinc-400">{t.footer.tagline}</span>
            </div>
            <p className="mt-1 text-xs text-zinc-500 max-w-md">
              {t.footer.desc}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-zinc-500">
            <Link href="/" className="hover:text-violet-600 transition-colors">
              {t.footer.home}
            </Link>
            <Link href="/#quizzes" className="hover:text-violet-600 transition-colors">
              {t.footer.allQuizzes}
            </Link>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-600 transition-colors"
            >
              X (Twitter)
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} K-Pulse. {t.footer.rights}</p>
          <p>{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
