import type { Metadata } from 'next';
import Header from './components/nav-header';
import { inter } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'DIG',
  description: 'DIG',
  icons: {
    icon: '/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={`${inter.variable}`}>
      <body className="bg-black text-white font-sans">
        <main className="h-screen w-full px-4 sm:px-6 md:pb-[55px] md:px-12  pb-0 bg-black flex flex-col justify-between items-start ">
          <div className="w-full h-full flex flex-col">
            <Header />
            <div className="flex-1">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
