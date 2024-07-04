import { Suspense } from 'react';

import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs';

import HistoryWrapper from '@/components/history-wrapper';
import LoaderComponent from '@/components/loader-component';
import SectionTitle from '@/components/section-title';

const WelcomeUser = async () => {
  const { userId } = auth();
  if (!userId) {
    return;
  }

  const response = await clerkClient.users.getUser(userId);

  const { firstName } = response;

  return (
    <div className='mb-10'>
      <SectionTitle style='mb-0 '>Hello, {firstName}!</SectionTitle>
      <div className='px-2 xl:px-0'>
        <p>
          Remember, every workout is a step towards a healthier and stronger
          you.
        </p>
        <p className='text-text-secondary '>Let&apos; s get moving!</p>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<LoaderComponent />}>
        <WelcomeUser />
      </Suspense>
      <Suspense fallback={<LoaderComponent />}>
        <HistoryWrapper />
      </Suspense>
    </div>
  );
};

export default HomePage;
