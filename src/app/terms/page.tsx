import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | K-Pulse',
  description:
    'Terms of Service for K-Pulse. Review the rules and guidelines for using our interactive Korean culture and trivia quiz website.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-purple-100">
        <div className="mb-8 border-b border-slate-100 pb-6">
          <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-black rounded-full uppercase tracking-wider mb-2">
            Legal & Terms
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Terms of Service</h1>
          <p className="text-xs text-slate-400 mt-1">Last Updated: October 8, 2026</p>
        </div>

        <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. Agreement to Terms</h2>
            <p>
              By accessing or using K-Pulse (&quot;the Service&quot;), accessible via https://kpulsequiz.com, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">2. Use License & Intellectual Property</h2>
            <p>
              K-Pulse grants you a personal, non-exclusive, non-transferable license to play interactive quizzes and share your game score cards on social media for personal, non-commercial entertainment purposes.
            </p>
            <p className="mt-2 text-sm">
              All website software, branding, mascot illustrations (Hobi &amp; Bomi), and original trivia quiz curation are the intellectual property of K-Pulse. All artist trademarks, band names, and song titles referenced in educational quiz questions belong to their respective copyright holders and entertainment agencies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. Prohibited Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Scrape, duplicate, or re-host K-Pulse quiz questions in bulk without express written permission.</li>
              <li>Attempt to disrupt, exploit, or launch Denial-of-Service (DDoS) attacks against the website infrastructure.</li>
              <li>Use the platform in any manner that violates applicable local or international laws.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">4. Disclaimer of Warranties</h2>
            <p>
              The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. While we strive for 100% factual accuracy in all cultural and fandom trivia, K-Pulse makes no representations or warranties of any kind regarding accuracy, completeness, or fitness for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">5. Limitation of Liability</h2>
            <p>
              In no event shall K-Pulse, its creators, or contributors be liable for any indirect, incidental, or consequential damages resulting from your use of or inability to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will indicate the date of the latest revision at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">7. Inquiries</h2>
            <p>
              For legal inquiries or questions regarding these Terms, please contact{' '}
              <a href="mailto:legal@kpulsequiz.com" className="text-purple-600 underline font-bold">
                legal@kpulsequiz.com
              </a>.
            </p>
          </section>
        </div>

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
