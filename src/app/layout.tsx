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
  metadataBase: new URL('https://kpulsequiz.com'),
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
  verification: {
    google: '5_kHZ_qOX7BeXe3ASq_I5sL5nEg7JBfryf-xdI-a6CI',
  },
  openGraph: {
    title: 'K-Pulse | Gamified K-Culture & Trivia Quiz Hub',
    description:
      'Play, compete, and level up your Korean culture IQ! Daily trivia challenges, global leaderboard, and iconic K-Pop lore.',
    url: 'https://kpulsequiz.com',
    siteName: 'K-Pulse',
    locale: 'en_US',
    alternateLocale: ['es_ES', 'ko_KR'],
    type: 'website',
    images: [
      {
        url: '/images/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'K-Pulse | Gamified K-Culture & Trivia Quiz Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K-Pulse | Gamified K-Culture & Trivia Quiz Hub',
    description:
      'Play, compete, and level up your Korean culture IQ! Daily trivia challenges, global leaderboard, and iconic K-Pop lore.',
    images: ['/images/og-banner.png'],
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
