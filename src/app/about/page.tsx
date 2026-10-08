import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | K-Pulse',
  description:
    'Learn about K-Pulse, our mission to bridge global fans through interactive gamified Korean culture, K-Pop, and language trivia quizzes.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-purple-100">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-black rounded-full uppercase tracking-wider mb-3">
            About K-Pulse
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Connecting Global Fans Through K-Culture
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            K-Pulse is an interactive gamified trivia and learning hub designed for K-Pop fans, K-Drama enthusiasts, and Korean culture admirers around the world.
          </p>
        </div>

        {/* Story Section */}
        <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>🎯</span> Our Mission
            </h2>
            <p>
              Korean popular culture has inspired millions across every continent. From Billboard-topping K-Pop anthems to global sensation K-Dramas and vibrant food traditions, our mission is to make learning Korean history, cultural etiquette, and fandom lore engaging, educational, and fun.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>🐯</span> The Mascot Story: Hobi & Bomi
            </h2>
            <p>
              Our guides are <strong>Hobi (호비)</strong>, a charismatic white tiger cub who cheers on fans with his glowing ARMY Bomb and Nachimbong, and his fashionable younger sister <strong>Bomi (봄이)</strong>, an energetic idol-in-training representing BLINKs worldwide. In Korean mythology, the white tiger (백호) is a sacred guardian symbol of courage, friendship, and wisdom.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>📚</span> Editorial Accuracy & Fandom Care
            </h2>
            <p>
              Every quiz and question bank on K-Pulse is rigorously researched using official Billboard chart records, verified agency announcements, KOMCA copyright archives, and cultural history textbooks. We strive for 100% factual accuracy while keeping our content lighthearted and respectful of artists and creators.
            </p>
          </section>

          <section className="bg-purple-50/60 p-6 rounded-2xl border border-purple-100">
            <h2 className="text-lg font-bold text-purple-950 mb-2 flex items-center gap-2">
              <span>⚖️</span> Community Disclaimer
            </h2>
            <p className="text-xs sm:text-sm text-purple-900/80 leading-relaxed">
              K-Pulse is an independent cultural trivia and fan-appreciation educational platform. All band names, logos, music titles, and artist trademarks are the property of their respective entertainment agencies (BIGHIT MUSIC / HYBE, JYP Entertainment, YG Entertainment, etc.). K-Pulse is not affiliated with, endorsed by, or partnered with these agencies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>📬</span> Contact & Inquiries
            </h2>
            <p>
              Have a question, feedback on a trivia fact, or want to collaborate? Reach out to our team:
            </p>
            <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium">
              <p>Email: <a href="mailto:contact@kpulsequiz.com" className="text-purple-600 underline font-bold">contact@kpulsequiz.com</a></p>
              <p className="mt-1 text-slate-500 text-xs">Official Twitter (X): <a href="https://x.com/JIlmong" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">@JIlmong</a></p>
            </div>
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
