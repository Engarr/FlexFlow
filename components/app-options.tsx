import React from 'react';

import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from './ui/button';
import { Loader, Settings } from 'lucide-react';
import ThemeSwitch from './theme-switch';
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from '@clerk/nextjs';

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
          <PopoverContent className='mx-4 gap-2 flex flex-col w-auto lg:items-end'>
            <div>
              <ClerkLoading>
                <Loader className='animate-spin' />
              </ClerkLoading>
              <ClerkLoaded>
                <SignedIn>
                  <div className=''>
                    <UserButton afterSignOutUrl='/' showName />
                  </div>
                </SignedIn>
              </ClerkLoaded>
            </div>
            <div>
              <ThemeSwitch />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default AppOptions;
