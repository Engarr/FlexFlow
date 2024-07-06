import React from 'react';
import Link from 'next/link';

import ErrorComponent from '@/components/error-component';
import { PlanBar } from '@/components/plan-bar';
import SectionTitle from '@/components/section-title';
import { Button } from '@/components/ui/button';
import { fetchUserPlans } from '@/server/db/get-db-data-functions';

type UserPlanListType = {
  userId: string;
};
const UserPlansList = async ({ userId }: UserPlanListType) => {
  const userPlanList = await fetchUserPlans(userId);

  if (!userPlanList) {
    return (
      <div>
        <ErrorComponent message='Failed To Fetch Plans' />
      </div>
    );
  }

  return (
    <div className='max-lg:px-2'>
      <div className='flex w-full justify-between lg:items-start max-lg:flex-col items-center'>
        <SectionTitle style='max-lg:mb-2'>Yours Training Plans</SectionTitle>
        {userPlanList && userPlanList.length > 0 && (
          <Link href={`/plans/yours-training-plans/add-new`}>
            <Button tabIndex={-1} variant='primary'>
              Add New Plan
            </Button>
          </Link>
        )}
      </div>
      <div className='mt-10 flex flex-col gap-3'>
        {userPlanList?.length > 0 ? (
          <>
            {userPlanList.map((planData) => (
              <React.Fragment key={planData._id}>
                <PlanBar
                  planName={planData.planName}
                  planId={planData._id && planData._id.toString()}
                  userId={planData.creator}
                />
              </React.Fragment>
            ))}
          </>
        ) : (
          <div className='flex items-center justify-center flex-col gap-2'>
            <p className='text-xl'>You do not have plans yet</p>
            <Button variant='primary'>
              <Link href={`/plans/yours-training-plans/add-new`}>
                Add New Plan
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPlansList;
