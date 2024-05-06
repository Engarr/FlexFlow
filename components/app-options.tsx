import { ChevronUp, Settings } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import ThemeSwitch from './theme-switch';
import { cn } from '@/lib/utils';
type PropsType = {
  style?: string;
};

const AppOptions = ({ style }: PropsType) => {
  return (
    <>
      <div className={cn(' right-0 p-5 max-lg:top-12', style)}>
        <Popover>
          <PopoverTrigger>
            <Button size='sm' asChild className=''>
              <div>
                <Settings size='20px' className='cursor-pointer' />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='mx-4'>
            <ThemeSwitch />
          </PopoverContent>
        </Popover>
      </div>
      {/* <Button className='fixed bottom-0 right-0 mr-5' size='sm'>
        <ChevronUp />
      </Button> */}
    </>
  );
};

export default AppOptions;
