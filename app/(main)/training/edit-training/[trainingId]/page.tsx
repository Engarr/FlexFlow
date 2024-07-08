import React, { Suspense } from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import ErrorComponent from '@/components/error-component';
import SectionTitle from '@/components/section-title';
import LoaderComponent from '@/components/loader-component';
import { fetchTrainingDetails } from '@/server/db/get-db-data-functions';
import { transformExercisesArr } from '@/app/(main)/plans/yours-training-plans/edit/[planId]/_utils';
import TrainingForm from '@/components/training-form/training-form';

const Page = async ({ params }: { params: { trainingId: string } }) => {
  const { trainingId } = params;
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }
  const trainingDetails = await fetchTrainingDetails(trainingId, userId);

  if (!trainingDetails && trainingDetails === null) {
    return <ErrorComponent message='There is no such training in history' />;
  }
  const newExercisesArr = await transformExercisesArr(
    trainingDetails.exercisesArr
  );
  
  const dateStr = trainingDetails.date;
  const timeStr = trainingDetails.time;
  const initialDate = new Date(`${dateStr} ${timeStr}`);

  return (
    <div>
      <SectionTitle>
        Edit Training history ID:
        <span className='text-text-secondary pl-2'>{trainingId}</span>
      </SectionTitle>
      <Suspense key={trainingId} fallback={<LoaderComponent />}>
        <TrainingForm
          planName={trainingDetails.planName}
          exercisesArr={newExercisesArr}
          trainingId={trainingId}
          initialDate={initialDate}
          userId={userId}
        />
      </Suspense>
    </div>
  );
};

export default Page;
