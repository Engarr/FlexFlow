import MobileHeader from '@/components/mobile-header';
import Sidebar from '@/components/sidebar';

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className='hidden lg:flex pt-6 ' />
      <main className='lg:pl-[256px] h-full max-lg:pt-[60px]  '>
        <div className='h-full max-w-[1056px] mx-auto pt-12'>{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
