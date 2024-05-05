import { LogoButton } from '@/app/(welcome)/header';
import { sidebarButtonsData } from '@/lib/sidebar-items-data';
import { cn } from '@/lib/utils';
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import React from 'react';
import { SidebarItem } from './sidebar-item';

type Props = {
  className?: string;
  mobileNavHandler?: (newOpen: boolean) => void;
};
const Sidebar = ({ className, mobileNavHandler }: Props) => {
  return (
    <div
      className={cn(
        'flex  h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col dark:border-neutral-500/50 border-neutral-200 lg:min-h-[660px] ',
        className
      )}>
      <div className='flex flex-col items-center justify-between h-full lg:pb-10 pb-2 '>
        <div className='max-lg:mt-20'>
          <LogoButton href='/home' style='lg:mb-10 hidden lg:flex' size='lg' />

          <div className='flex flex-col gap-2'>
            {sidebarButtonsData.map((data) => (
              <React.Fragment key={data.title}>
                <SidebarItem
                  href={data.href}
                  label={data.title}
                  iconSrc={data.iconSrc}
                  mobileNavHandler={mobileNavHandler}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div>
          <ClerkLoading>
            <Loader className='animate-spin' />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <div className='border-lime-400 border-2  rounded-full hover:border-lime-400/60 duration-300'>
                <UserButton afterSignOutUrl='/' />
              </div>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
