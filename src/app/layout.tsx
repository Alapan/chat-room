import type { Metadata } from 'next';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import './globals.css';
import { Header } from './components/Header';

export const metadata: Metadata = {
  title: 'ChatHub',
  description: 'A simple chat room application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Header />
        <main className='flex-grow'>{children}</main>
      </body>
    </html>
  );
}
