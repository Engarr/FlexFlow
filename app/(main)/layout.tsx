import AppOptions from '@/components/app-options';
import MobileHeader from '@/components/mobile-header';
import Sidebar from '@/components/sidebar';
import { Toaster } from '@/components/ui/toaster';
// import QueryProviders from '@/lib/query-provider';

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    // <QueryProviders>
    <>
      <AppOptions style='max-lg:hidden lg:fixed' />
      <MobileHeader />
      <Sidebar className='hidden lg:flex pt-6' />
      <Toaster />
      <main className='lg:pl-[256px] h-full max-lg:pt-[60px] lg:max-w-screen-2xl'>
        <div className='h-full max-w-[1056px] mx-auto pt-12 lg:pt-[7rem] '>
          {children}
        </div>
      </main>
    </>
    // </QueryProviders>
  );
};

export default MainLayout;
