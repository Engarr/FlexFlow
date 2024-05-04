import { Settings } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import ThemeSwitch from './theme-switch';

const AppOptions = () => {
  return (
    <div className='absolute right-0 p-5'>
      <Popover>
        <PopoverTrigger>
          <Button size='sm' asChild>
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
  );
};

export default AppOptions;
