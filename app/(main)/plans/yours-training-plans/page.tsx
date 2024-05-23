import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import LoaderComponent from '@/components/loader-component';
import { auth } from '@clerk/nextjs/server';
import UserPlansList from './_components/user-plans-list';

const Page = () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  return (
    <Suspense fallback={<LoaderComponent />}>
      <div className='max-lg:px-2'>
        <UserPlansList userId={userId} />
      </div>
    </Suspense>
  );
};

export default Page;
