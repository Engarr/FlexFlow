'use client';
import LoaderComponent from '@/components/loader-component';
import { PlanBar } from '@/components/plan-bar';
import SectionTitle from '@/components/section-title';
import { Button } from '@/components/ui/button';
import { fetchAppPlans } from '@/db/plans-functions';
import { PlanDataType } from '@/types/user-plan-type';
import Link from 'next/link';

import React from 'react';
import { UseQueryResult, useQuery } from 'react-query';

const Page = () => {
  const { data, isLoading }: UseQueryResult<PlanDataType[] | []> = useQuery(
    ['appPlans'],
    fetchAppPlans
  );
 
  return (
    <div>
      <SectionTitle>
        <span className='text-text-secondary'>Select</span> A Plan From Those
        Available Below:
      </SectionTitle>
      <div className='mt-10 flex flex-col gap-3'>
        {!isLoading && data?.length ? (
          <>
            {data.map((planData) => (
              <React.Fragment key={planData._id}>
                <PlanBar
                  planName={planData.planName}
                  planId={planData._id && planData._id}
                  userId={planData.creator}
                  isAppPlan={planData.isAppPlan}
                />
              </React.Fragment>
            ))}
            <div className='mt-5 left-1/2 items-center justify-center flex flex-col gap-2'>
              <Link href='/plans/yours-training-plans/add-new'>
                <Button variant='primary'>Create Your Own Plan</Button>
              </Link>

              <Link href='/plans/yours-training-plans'>
                <Button variant='primaryOutline'>Go to your plans</Button>
              </Link>
            </div>
          </>
        ) : (
          <LoaderComponent />
        )}
      </div>
    </div>
  );
};

export default Page;
