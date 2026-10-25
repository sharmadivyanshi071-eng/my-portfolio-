import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Load clean geometric display, body, and monospace fonts
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-display',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Space Journey Portfolio | [Tumhara Naam]',
  description:
    'Interactive 3D developer portfolio — [Aspiring Full-Stack Developer] — [Building modern web apps with Next.js and PostgreSQL].',
  openGraph: {
    title: 'Space Journey Portfolio | [Tumhara Naam]',
    description:
      'Interactive 3D developer portfolio — [Aspiring Full-Stack Developer] — [Building modern web apps with Next.js and PostgreSQL].',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Space Journey Portfolio | [Tumhara Naam]',
    description:
      'Interactive 3D developer portfolio — [Aspiring Full-Stack Developer] — [Building modern web apps with Next.js and PostgreSQL].',
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
      className={`${outfit.variable} ${jakarta.variable} ${jetbrainsMono.variable} dark`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#050510] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
