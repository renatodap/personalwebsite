import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/header';
import Footer from './components/home/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Renato DAP | AI Engineer',
  description: 'AI Engineer building production systems. Multi-model pipelines, circuit breakers, and infrastructure that actually ships.',
  keywords: ['AI Engineer', 'Software Engineer', 'Go', 'Python', 'TypeScript', 'LLM', 'Machine Learning'],
  authors: [{ name: 'Renato Prado' }],
  openGraph: {
    title: 'Renato DAP | AI Engineer',
    description: 'AI Engineer building production systems that ship.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
