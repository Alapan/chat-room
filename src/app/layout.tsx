import type { Metadata } from 'next';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import { Header } from './layout/Header';
import './globals.css';
import Providers from './Providers';

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
        <Providers>
          <Header />
          <main className='flex-grow'>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
