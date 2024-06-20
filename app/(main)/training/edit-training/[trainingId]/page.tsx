import React, { Suspense } from 'react';
import { auth } from '@clerk/nextjs/server';
import { fetchTrainingDetails } from '@/server/get-db-data-functions';
import { redirect } from 'next/navigation';
import ErrorComponent from '@/components/error-component';
import SectionTitle from '@/components/section-title';
import PlanForm from '@/components/form/plan-form';
import LoaderComponent from '@/components/loader-component';
import { transformExercisesArr } from '@/app/(main)/plans/yours-training-plans/edit/[planId]/_utils';

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
      <Suspense fallback={<LoaderComponent />}>
        <SectionTitle>
          Edit Training history ID:
          <span className='text-text-secondary'>{trainingId}</span>
        </SectionTitle>
        <PlanForm
          planName={trainingDetails.planName}
          exercisesArr={newExercisesArr && newExercisesArr}
          trainingId={trainingId}
          initialDate={initialDate}
        />
      </Suspense>
    </div>
  );
};

export default Page;
