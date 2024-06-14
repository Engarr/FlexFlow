import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import UserPlansList from './_components/user-plans-list';
import LoaderComponent from '@/components/loader-component';

const Page = () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  return (
    <div className='max-lg:px-2'>
      <Suspense fallback={<LoaderComponent />}>
        <UserPlansList userId={userId} />
      </Suspense>
    </div>
  );
};

export default Page;
