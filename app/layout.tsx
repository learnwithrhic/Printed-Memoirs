import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Printed Memoirs | Custom Pins, Magnets & Mirrors in UAE',
  description: 'Turn your favorite photos, artwork, and logos into personalized custom round and square pins, magnets, and mirrors. Handmade keepsakes & corporate bulk giveaways in UAE.',
  keywords: [
    'Printed Memoirs',
    'Custom Pins UAE',
    'Photo Magnets Dubai',
    'Custom Pocket Mirrors',
    'Wedding Favors UAE',
    'Corporate Giveaways Dubai',
    'Personalized Keepsakes',
    'Round Pins',
    'Square Magnets'
  ],
  authors: [{ name: 'Printed Memoirs' }],
  openGraph: {
    title: 'Printed Memoirs — Small Keepsakes. Big Memories.',
    description: 'Personalized pins, magnets, and mirrors made from your favorite photos, artwork, logos, and special moments in the UAE.',
    url: 'https://printedmemoirs.ae',
    siteName: 'Printed Memoirs',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Schema markup for SEO, GEO & Answer Engines
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Printed Memoirs',
    url: 'https://printedmemoirs.ae',
    logo: 'https://printedmemoirs.ae/logo.png',
    description: 'Boutique manufacturer of personalized pins, magnets, and pocket mirrors in the UAE.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AE',
      addressRegion: 'United Arab Emirates',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hello@printedmemoirs.ae',
      availableLanguage: ['English', 'Arabic'],
    },
    knowsAbout: [
      'Custom Pins Manufacturing',
      'Photo Magnet Printing',
      'Compact Mirror Customization',
      'Corporate Merchandise & Event Giveaways',
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="bg-[#FAF7F2] text-[#1C1917] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
