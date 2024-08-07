'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

const Header = () => {
  return (
    <header className='w-full max-w-[90%] lg:max-w-screen-2xl z-50 h-20 border-b-2 border-neutral-600 px-4 lg:px-20 fixed left-1/2 -translate-x-1/2'>
      <div className=' flex items-center justify-between h-full '>
        <SignedOut>
          <LogoButton href='/' />
        </SignedOut>
        <SignedIn>
          <LogoButton href='/home' />
        </SignedIn>
        <ClerkLoading>
          <Loader className='h-5 w-5 animate-spin' />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className=' hover:border-lime-400/60 duration-300'>
              <UserButton afterSignOutUrl='/' />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton
              mode='modal'
              afterSignInUrl='/home'
              afterSignUpUrl='/home'>
              <Button
                size='lg'
                variant='ghost'
                className='text-xl max-sm:h-9 max-sm:px-3'>
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};

export default Header;

export const LogoButton = ({
  href,
  style,
  size,
  styleImage,
}: {
  href: string;
  style?: string;
  styleImage?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'rounded' | null | undefined;
}) => {
  return (
    <div
      className={cn(
        ' pt-8 pl-4 pb-7 flex items-center gap-x-3 relative',
        style
      )}>
      <Link href={href}>
        <Image
          src='/fist-with-dumbbell-gym.svg'
          alt='fist'
          height={40}
          width={60}
          priority
          className={cn(
            'rotate-[-45deg] absolute left-[-15%] top-[20%] w-[50px] h-[30px] lg:w-[60px] lg:h-[40px]',
            styleImage
          )}
        />
        <Button
          size={size ? size : 'default'}
          variant='primary'
          className='max-sm:h-9 max-sm:px-3'>
          FlexFlow
        </Button>
      </Link>
    </div>
  );
};
