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
      <main className='min-h-[calc(100vh-150px)] left-1/2 relative -translate-x-1/2 w-full lg:w-[80%] text-text'>
        {children}
      </main>
      <Footer />
    </>
  );
}
