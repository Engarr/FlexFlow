import React from 'react';
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='h-20 w-full lg:max-w-[90%] border-b-2 border-neutral-600 px-4 lg:px-20 relative left-1/2 -translate-x-1/2'>
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
            <div className='border-lime-400 border-2  rounded-full hover:border-lime-400/60 duration-300'>
              <UserButton afterSignOutUrl='/' />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton mode='modal' afterSignInUrl='/' afterSignUpUrl='/'>
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

const LogoButton = ({ href }: { href: string }) => {
  return (
    <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3 relative'>
      <Link href={href}>
        <Image
          src='/fist-with-dumbbell-gym.svg'
          alt='fist'
          height={40}
          width={60}
          priority
          className='rotate-[-45deg] absolute left-[-5%] top-[20%] w-[50px] h-[30px] lg:w-[60px] lg:h-[40px]'
        />
        <Button size='lg' variant='primary' className='max-sm:h-9 max-sm:px-3'>
          FlexFlow
        </Button>
      </Link>
    </div>
  );
};
