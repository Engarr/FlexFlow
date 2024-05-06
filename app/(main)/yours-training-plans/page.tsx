'use client';
import React from 'react';
import SectionTitle from '@/components/section-title';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { UseQueryResult, useQuery } from 'react-query';
import { QUERY_KEY_PLANS, fetchUserPlans } from '@/db/plans-functions';
import { useAuth } from '@clerk/nextjs';
import LoaderComponent from '@/components/loader-component';
import { UserPlanType } from '@/types/user-plan-type';
import { PlanBar } from '../../../components/plan-bar';
import ErrorComponent from '@/components/error-component';

const Page = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  if (!userId) {
    redirect('/');
  }

  const { data, isLoading, isError }: UseQueryResult<UserPlanType[] | []> =
    useQuery(QUERY_KEY_PLANS, () => fetchUserPlans({ userId: userId }), {
      refetchOnMount: true,
    });

  if (isError) {
    return <ErrorComponent message='Data Download Error' />;
  }

  return (
    <div className='max-lg:px-2'>
      <div className='flex w-full justify-between lg:items-start max-lg:flex-col items-center'>
        <SectionTitle style='max-lg:mb-2'>Yours Training Plans</SectionTitle>
        {data && data.length > 0 && (
          <Link href={`${pathname}/add-new`}>
            <Button tabIndex={-1}>Add New Plan</Button>
          </Link>
        )}
      </div>
      <div className='mt-10 flex flex-col gap-3'>
        {!isLoading && data?.length ? (
          <>
            {data.map((planData) => (
              <React.Fragment key={planData._id}>
                <PlanBar
                  planName={planData.planName}
                  planId={planData._id}
                  userId={planData.creator}
                />
              </React.Fragment>
            ))}
          </>
        ) : data && data.length === 0 ? (
          <div className='flex items-center justify-center flex-col gap-2'>
            <p className='text-xl'>You do not have plans yet</p>
            <Button variant='primary'>
              <Link href={`${pathname}/add-new`}>Add New Plan</Link>
            </Button>
          </div>
        ) : (
          <LoaderComponent />
        )}
      </div>
    </div>
  );
};

export default Page;
