'use client';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '@/components/sidebar';
import { Menu } from 'lucide-react';

const MobileSlidebar = () => {
  const [newOpen, setNewOpen] = useState(false);

  const onOpenHandler = (newOpen: boolean) => {
    setNewOpen(newOpen);
  };
  return (
    <Sheet open={newOpen} onOpenChange={(open) => onOpenHandler(open)}>
      <SheetTrigger>
        <Menu className='text-white w-[38px] h-[38px] ' />
      </SheetTrigger>
      <SheetContent className=' p-0 z-[100] ' side='left'>
        <Sidebar mobileNavHandler={onOpenHandler} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSlidebar;
