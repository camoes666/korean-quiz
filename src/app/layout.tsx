import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import { GameProvider } from '@/context/GameContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'K-Pulse | Gamified K-Culture & Trivia Quiz Hub',
  description:
    'Play, compete, and level up your Korean culture IQ! Daily trivia challenges, global leaderboard, and iconic K-Pop lore.',
  keywords: [
    'Gamified Quiz App',
    'K-Pop Quiz',
    'BTS Trivia',
    'Korean Culture Test',
    'Squid Game Trivia',
    'K-Pulse',
  ],
  authors: [{ name: 'K-Pulse Team' }],
  openGraph: {
    title: 'K-Pulse | Gamified K-Culture & Trivia Quiz Hub',
    description:
      'Learn, compete, and win daily with Korean culture, K-Pop, and K-Drama quizzes!',
    url: 'https://kpulse-quiz.com',
    siteName: 'K-Pulse',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K-Pulse | Gamified K-Culture & Trivia Quiz Hub',
    description: 'Learn, compete, and win daily with Korean culture & K-Pop quizzes!',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#F9FAFB] text-slate-900 font-sans selection:bg-purple-500 selection:text-white antialiased">
        <LanguageProvider>
          <GameProvider>
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </GameProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
