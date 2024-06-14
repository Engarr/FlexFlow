import Header from './header';
import Footer from './footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FlexFlow - Welcome',
  description:
    'Achieve, track, and perfect your workout results with FlexFlow!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className='pt-[80px] '>{children}</main>
      <Footer />
    </>
  );
}
