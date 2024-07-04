import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import bgImg from '@/public/gym.svg';

export default function WelcomeSection() {
  return (
    <div className='max-w-[998px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2 lg:min-h-[calc(100vh-120px)]'>
      <Image
        alt='hero'
        src={bgImg}
        className='relative w-[240px] h-[200px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0'
      />

      <div className='flex flex-col items-center gap-y-8'>
        <h1 className='text-xl lg:text-3xl font-bold text-text max-w-[480px] text-center'>
          Achieve, track, and perfect your workout results with FlexFlow!{' '}
        </h1>
        <div className='flex flex-col items-center ga-y-3 max-w-[330px] w-full'>
          <ClerkLoading>
            <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode='modal'
                afterSignInUrl='/home'
                afterSignUpUrl='/home'>
                <Button size='lg' variant='primary' className='w-full'>
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton
                mode='modal'
                afterSignInUrl='/home'
                afterSignUpUrl='/home'>
                <Button
                  size='lg'
                  variant='primaryOutline'
                  className='w-full pt-2'>
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button
                size='lg'
                variant='primary'
                className='w-full text-base lg:text-xl'
                asChild>
                <Link href='/home'>Back To App</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
