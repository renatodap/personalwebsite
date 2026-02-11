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
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
