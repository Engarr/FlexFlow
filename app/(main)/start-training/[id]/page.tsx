import React, { Suspense } from 'react';
import { auth } from '@clerk/nextjs/server';
import { fetchPlanById } from '@/server/get-db-data-functions';
import ErrorComponent from '@/components/error-component';
import { transformExercisesArr } from '../../plans/yours-training-plans/edit/[planId]/_utils';

import TrainingForm from '@/components/training-form/training-form';
import SectionTitle from '@/components/section-title';
import { formatDateTime } from '@/utils/date-transform';
import LoaderComponent from '@/components/loader-component';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { userId } = auth();

  const planValuses = await fetchPlanById(id);
  if (!planValuses) {
    return <ErrorComponent message='Failed To Fetch Plans Details' />;
  }
  if (!userId) {
    return <ErrorComponent message='Failed To Fetch Plans Details' />;
  }

  const newExercisesArr = await transformExercisesArr(planValuses.exercisesArr);
  const trainingTime = formatDateTime(new Date());

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
          trainingTime={trainingTime}
          userId={userId}
        />
      </Suspense>
    </>
  );
};

export default Page;
