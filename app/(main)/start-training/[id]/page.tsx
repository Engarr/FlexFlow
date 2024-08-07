import React, { Suspense } from 'react';
import { auth } from '@clerk/nextjs/server';

import ErrorComponent from '@/components/error-component';
import TrainingForm from '@/components/training-form/training-form';
import SectionTitle from '@/components/section-title';
import LoaderComponent from '@/components/loader-component';
import { fetchPlanById } from '@/server/db/get-db-data-functions';
import { formatDateTime } from '@/utils/date-transform';

import { transformExercisesArr } from '../../plans/yours-training-plans/edit/[planId]/_utils';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { userId } = auth();

  const planValuses = await fetchPlanById(id);

  if (!planValuses || !userId) {
    return <ErrorComponent message='Failed To Fetch Plans Details' />;
  }
  const newExercisesArr = await transformExercisesArr(planValuses.exercisesArr);

  return (
    <>
      <Suspense fallback={<LoaderComponent />}>
        <SectionTitle>
          Start Training:{' '}
          <span className='text-text-secondary'>{planValuses.planName}</span>
        </SectionTitle>
      </Suspense>
      <Suspense fallback={<LoaderComponent />}>
        <TrainingForm
          exercisesArr={newExercisesArr}
          planName={planValuses.planName}
          userId={userId}
        />
      </Suspense>
    </>
  );
};

export default Page;
