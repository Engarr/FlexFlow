import Header from './header';
import Footer from './footer';

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
