import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | K-Pulse',
  alternates: {
    canonical: 'https://kpulsequiz.com/contact',
  },
  description:
    'Contact the K-Pulse editorial team for trivia fact corrections, cultural review feedback, privacy requests, or photo attribution and copyright inquiries.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-purple-100">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-black rounded-full uppercase tracking-wider mb-3">
            Contact &amp; Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Get in Touch with K-Pulse
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Whether you spotted a trivia fact that needs updating, have feedback on our Korean culture guides, or want to reach our team about privacy or content rights, we welcome your message.
          </p>
        </div>

        {/* Contact Channels */}
        <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <section className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span>✉️</span> General &amp; Editorial Inquiries
            </h2>
            <p className="text-sm text-slate-600 mb-3">
              For quiz fact corrections, cultural review suggestions, or general collaboration inquiries:
            </p>
            <p className="text-sm font-medium">
              Email:{' '}
              <a
                href="mailto:contact@kpulsequiz.com"
                className="text-purple-600 underline font-bold"
              >
                contact@kpulsequiz.com
              </a>
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span>🔒</span> Privacy &amp; Data Requests
            </h2>
            <p className="text-sm text-slate-600 mb-3">
              For questions about cookies, advertising preferences, COPPA, GDPR, or CCPA data rights:
            </p>
            <p className="text-sm font-medium">
              Email:{' '}
              <a
                href="mailto:privacy@kpulsequiz.com"
                className="text-purple-600 underline font-bold"
              >
                privacy@kpulsequiz.com
              </a>
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span>⚖️</span> Legal, Copyright &amp; Attribution Requests
            </h2>
            <p className="text-sm text-slate-600 mb-3">
              For prompt photo credit updates, trademark questions, or content removal requests:
            </p>
            <p className="text-sm font-medium">
              Email:{' '}
              <a
                href="mailto:legal@kpulsequiz.com"
                className="text-purple-600 underline font-bold"
              >
                legal@kpulsequiz.com
              </a>
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-purple-50/60 border border-purple-100">
            <h2 className="text-lg font-bold text-purple-950 mb-2 flex items-center gap-2">
              <span>⏱️</span> Official Social &amp; Response Window
            </h2>
            <p className="text-sm text-purple-900/80 leading-relaxed">
              We typically respond to all email inquiries within <strong>2–3 business days</strong>. You can also connect with us via our official X (Twitter) account:{' '}
              <a
                href="https://x.com/JIlmong"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 underline font-bold"
              >
                @JIlmong
              </a>
              .
            </p>
          </section>

          <section className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold text-slate-600">
            <Link href="/about" className="hover:text-purple-600 underline">
              About K-Pulse
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/privacy" className="hover:text-purple-600 underline">
              Privacy Policy
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/terms" className="hover:text-purple-600 underline">
              Terms of Service
            </Link>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center">
          <Link
            href="/"
            className="px-6 py-2.5 bg-purple-600 text-white rounded-full font-bold text-sm hover:bg-purple-700 transition-colors shadow-sm"
          >
            ← Back to Quizzes
          </Link>
        </div>
      </div>
    </div>
  );
}
