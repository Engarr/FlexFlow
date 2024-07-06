'use client';

import { useState } from 'react';

import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '@/components/sidebar';

import AppOptions from './app-options';

const MobileSlidebar = () => {
  const [newOpen, setNewOpen] = useState(false);

  const onOpenHandler = (newOpen: boolean) => {
    setNewOpen(newOpen);
  };
  return (
    <Sheet open={newOpen} onOpenChange={(open) => onOpenHandler(open)}>
      <div className='flex '>
        <SheetTrigger>
          <Menu className='text-white w-[38px] h-[38px] ' />
        </SheetTrigger>
        <AppOptions style='lg:hidden' />
      </div>
      <SheetContent className=' p-0  ' side='left'>
        <Sidebar mobileNavHandler={onOpenHandler} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSlidebar;
