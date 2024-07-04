import React from 'react';

import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from './ui/button';
import {  Settings } from 'lucide-react';
import ThemeSwitch from './theme-switch';


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
     
    </>
  );
};

export default AppOptions;
