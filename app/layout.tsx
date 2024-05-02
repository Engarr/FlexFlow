import type { Metadata } from 'next';
import { Baloo_2 } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

const baloo = Baloo_2({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlexFlow',
  description:
    'Achieve, track, and perfect your workout results with FlexFlow!',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' className='dark'>
        <body className={baloo.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
