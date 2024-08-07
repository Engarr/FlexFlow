import React from 'react';

import { LogoButton } from '@/app/(welcome)/header';

import MobileSlidebar from './mobile-slidebar';

const MobileHeader = () => {
  return (
    <nav className='lg:hidden px-6 h-[60px] flex items-center justify-between  border-b-2 border-neutral-500/50 bg-zinc-800/90 fixed top-0 w-full z-50 '>
      <MobileSlidebar />
      <LogoButton
        href='/'
        style=' pt-3 pl-2 pb-2'
        size='sm'
        styleImage='left-[-25%] top-[10%]'
      />
    </nav>
  );
};

export default MobileHeader;
