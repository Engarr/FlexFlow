'use client';
import MobileHeader from '@/components/mobile-header';
import Sidebar from '@/components/sidebar';
import { Toaster } from '@/components/ui/toaster';

type Props = {
  children: React.ReactNode;
};
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({});

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MobileHeader />
        <Sidebar className='hidden lg:flex pt-6 ' />
        <Toaster />
        <main className='lg:pl-[256px] h-full max-lg:pt-[60px]  '>
          <div className='h-full max-w-[1056px] mx-auto pt-12'>{children}</div>
        </main>
      </QueryClientProvider>
    </>
  );
};

export default MainLayout;
