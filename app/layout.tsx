import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import Header from './components/header';
import Footer from './components/home/footer';
import SmoothScroll from './components/SmoothScroll';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata = {
  title: 'Renato Prado',
  description: 'CS senior at Rose-Hulman. Software developer, tennis captain, musician.',
  authors: [{ name: 'Renato Prado' }],
  openGraph: {
    title: 'Renato Prado',
    description: 'CS senior at Rose-Hulman. Software developer, tennis captain, musician.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
