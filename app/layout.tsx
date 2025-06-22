import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlowIt - Privacy-First Evidence Platform",
  description: "Share evidence with optional human verification. Built with privacy and credibility in mind.",
  keywords: ["evidence", "privacy", "verification", "self protocol", "blockchain"],
  authors: [{ name: "BlowIt Team" }],
  creator: "BlowIt",
  publisher: "BlowIt",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://goblow.it'),
  openGraph: {
    title: "BlowIt - Privacy-First Evidence Platform",
    description: "Share evidence with optional human verification. Built with privacy and credibility in mind.",
    url: 'https://goblow.it',
    siteName: 'BlowIt',
    images: [
      {
        url: '/blow-it-logo.svg',
        width: 512,
        height: 512,
        alt: 'BlowIt Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "BlowIt - Privacy-First Evidence Platform",
    description: "Share evidence with optional human verification. Built with privacy and credibility in mind.",
    images: ['/blow-it-logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/blow-it-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/blow-it-logo.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
