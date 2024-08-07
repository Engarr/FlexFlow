import React, { Suspense } from 'react';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import ErrorComponent from '@/components/error-component';
import PlanForm from '@/components/form/plan-form';
import LoaderComponent from '@/components/loader-component';
import SectionTitle from '@/components/section-title';
import { fetchPlanById } from '@/server/db/get-db-data-functions';

import { transformExercisesArr } from './_utils';

const Page = async ({ params }: { params: { planId: string } }) => {
  const { planId } = params;
  const { userId } = auth();

  const planValuses = await fetchPlanById(planId);

  if (!planValuses && planValuses === null) {
    return <ErrorComponent message='Failed To Fetch Plans Details' />;
  }

  if (!userId && planValuses?.creator !== userId) {
    redirect('/');
  }

  const newExercisesArr = await transformExercisesArr(planValuses.exercisesArr);

  return (
    <>
      <Suspense fallback={<LoaderComponent />}>
        <SectionTitle>
          Edit Plan ID: <span className='text-text-secondary'>{planId}</span>
        </SectionTitle>
        <PlanForm
          planName={planValuses.planName}
          creator={planValuses.creator}
          exercisesArr={newExercisesArr && newExercisesArr}
          planId={planId}
        />
      </Suspense>
    </>
  );
};

export default Page;
