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

const Page = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  if (!userId) {
    redirect('/');
  }

  const { data, isLoading, isError, }: UseQueryResult<UserPlanType> =
    useQuery(QUERY_KEY_PLANS, () => fetchUserPlans({ userId: userId }), {
      refetchOnMount: true,
    });
 
  return (
    <div className='max-lg:px-2'>
      <div className='flex w-full justify-between lg:items-start max-lg:flex-col items-center'>
        <SectionTitle style='max-lg:mb-2'>Yours Training Plans</SectionTitle>
        <Button>
          <Link href={`${pathname}/add-new`}>Add New Plan</Link>
        </Button>
      </div>
      <div className='mt-10 flex flex-col gap-3'>
        {!isLoading && data ? (
          <>
            {data.map((data) => (
              <React.Fragment key={data._id}>
                <PlanBar
                  planName={data.planName}
                  planId={data._id}
                  userId={data.creator}
                />
              </React.Fragment>
            ))}
          </>
        ) : (
          <LoaderComponent />
        )}
      </div>
    </div>
  );
};

export default Page;
