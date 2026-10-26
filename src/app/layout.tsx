import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import { GameProvider } from '@/context/GameContext';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';

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
  title: 'K-Pop Quizzes & Personality Tests: Which Member Are You? | K-Pulse',
  description:
    'Free K-Pop quizzes & personality tests. Which BTS, BLACKPINK, Stray Kids, TWICE, ENHYPEN, aespa or LE SSERAFIM member are you? Plus K-Drama & Korean culture trivia.',
  keywords: [
    'Which Member Are You',
    'K-Pop Personality Test',
    'K-Pop Quiz',
    'BTS Trivia',
    'Korean Culture Test',
    'Squid Game Trivia',
    'K-Pulse',
  ],
  authors: [{ name: 'K-Pulse Team' }],
  alternates: {
    canonical: 'https://kpulsequiz.com',
  },
  verification: {
    google: '5_kHZ_qOX7BeXe3ASq_I5sL5nEg7JBfryf-xdI-a6CI',
    other: {
      'msvalidate.01': '2E8E822334A1673278BB491BB72FAF20',
    },
  },
  openGraph: {
    title: 'K-Pop Quizzes & Personality Tests: Which Member Are You? | K-Pulse',
    description:
      'Free K-Pop quizzes & personality tests. Which BTS, BLACKPINK, Stray Kids, TWICE, ENHYPEN, aespa or LE SSERAFIM member are you? Plus K-Drama & Korean culture trivia.',
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
        alt: 'K-Pop Quizzes & Personality Tests: Which Member Are You? | K-Pulse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K-Pop Quizzes & Personality Tests: Which Member Are You? | K-Pulse',
    description:
      'Free K-Pop quizzes & personality tests. Which BTS, BLACKPINK, Stray Kids, TWICE, ENHYPEN, aespa or LE SSERAFIM member are you? Plus K-Drama & Korean culture trivia.',
    images: ['/images/og-banner.png'],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'K-Pulse',
  alternateName: ['KPulse', 'K-Pulse Quiz'],
  url: 'https://kpulsequiz.com',
  description: 'Gamified K-Culture, K-Pop & Korean Language Trivia Quiz Hub',
  inLanguage: ['en', 'es', 'ko'],
  publisher: {
    '@type': 'Organization',
    name: 'K-Pulse',
    url: 'https://kpulsequiz.com',
    logo: 'https://kpulsequiz.com/images/og-banner.png',
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
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
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
