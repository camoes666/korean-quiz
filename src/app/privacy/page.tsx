import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | K-Pulse',
  description:
    'Privacy Policy for K-Pulse. Learn how we handle your data, cookies, and privacy rights when you play Korean culture trivia quizzes.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-purple-100">
        <div className="mb-8 border-b border-slate-100 pb-6">
          <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-black rounded-full uppercase tracking-wider mb-2">
            Legal & Compliance
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-slate-400 mt-1">Last Updated: October 8, 2026</p>
        </div>

        <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. Overview</h2>
            <p>
              At K-Pulse (accessible at https://kpulsequiz.com), the privacy of our visitors is of paramount importance to us. This Privacy Policy document outlines the types of personal information that is received and collected by K-Pulse and how it is used.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">2. Information We Collect</h2>
            <p>
              K-Pulse is committed to data minimization. We do not require registration, login, or personal identifiers (such as passwords or phone numbers) to participate in trivia quizzes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Local Game Storage:</strong> We use your browser&apos;s local storage (<code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono">localStorage</code>) to record your quiz progress, XP level, language preference, and daily streak. This data stays entirely on your device and is not sold or shared.</li>
              <li><strong>Log Files & Analytics:</strong> Like most standard websites, we may collect anonymous server log data (such as IP address, browser type, referring pages, and timestamp) solely for site security, DDoS mitigation, and diagnostic purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. Cookies and Advertising Partners</h2>
            <p>
              K-Pulse may partner with third-party advertising networks, including Google AdSense. These third-party vendors use cookies and web beacons to serve ads based on a user&apos;s prior visits to this website or other websites on the Internet:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to K-Pulse and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">Google Ads Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">aboutads.info</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">4. Third-Party Links</h2>
            <p>
              Our website may contain links to external sites (such as streaming platforms, social media networks, or official merchandise partners). We do not control or assume responsibility for the content, privacy policies, or practices of any third-party websites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">5. Children&apos;s Online Privacy Protection (COPPA)</h2>
            <p>
              K-Pulse does not knowingly collect any personally identifiable information from children under the age of 13. If a parent or guardian believes that K-Pulse has collected such information, please contact us immediately, and we will promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">6. GDPR & CCPA Compliance</h2>
            <p>
              If you are a resident of the European Economic Area (EEA) or California, you are entitled to certain data protection rights, including the right to request access to or deletion of your personal data. Because we store game progress locally in your browser, you can clear this data at any time by clearing your browser cache and local storage.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">7. Contact Us</h2>
            <p>
              If you have any questions or require more information about our Privacy Policy, please contact us by email at{' '}
              <a href="mailto:privacy@kpulsequiz.com" className="text-purple-600 underline font-bold">
                privacy@kpulsequiz.com
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
