import React, { Suspense } from 'react';
import Link from 'next/link';
import { fetchPlans } from '@/server/get-db-data-functions';
import ErrorComponent from '@/components/error-component';
import LoaderComponent from '@/components/loader-component';
import SectionTitle from '@/components/section-title';
import { PlanBar } from '@/components/plan-bar';
import { Button } from '@/components/ui/button';

async function AppPlans() {
  const appPlans = await fetchPlans();

  if (!appPlans) {
    return <ErrorComponent message='Failed To Fetch Plans' />;
  }
  return (
    <>
      {appPlans.map((planData) => (
        <React.Fragment key={planData._id}>
          <PlanBar
            planName={planData.planName}
            planId={planData._id && planData._id.toString()}
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
  );
}

const AppPlansPage = () => {
  return (
    <>
      <SectionTitle>
        <span className='text-text-secondary'>Select</span> A Plan From Those
        Available Below:
      </SectionTitle>
      <Suspense fallback={<LoaderComponent />}>
        <div className='mt-10 flex flex-col gap-3'>
          <AppPlans />
        </div>
      </Suspense>
    </>
  );
};

export default AppPlansPage;
