import ErrorComponent from '@/components/error-component';
import FormComponent, { exerciseType } from '@/components/form/form-component';
import LoaderComponent from '@/components/loader-component';
import SectionTitle from '@/components/section-title';
import { fetchPlanById } from '@/server/get-db-data-functions';
import { PlanDataType } from '@/types/type';
import { auth } from '@clerk/nextjs/server';

import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

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
  const transformExercisesArr = async (arr: exerciseType[]) => {
    'use server';
    return arr.map((exercise) => {
      const transformedSeriesData = exercise.seriesData.map(
        (series, index) => ({
          seriesId: index + 1,
          series: series.series,
          weight: series.weight,
          repetitions: series.repetitions,
        })
      );

      return {
        exercisesName: exercise.exercisesName,
        id: exercise.id,
        seriesData: transformedSeriesData,
      };
    });
  };
  const newExercisesArr = await transformExercisesArr(planValuses.exercisesArr);

  return (
    <Suspense fallback={<LoaderComponent />}>
      <SectionTitle>
        Edit Plan ID: <span className='text-lime-theme'>{planId}</span>
      </SectionTitle>

      <FormComponent
        planName={planValuses.planName}
        creator={planValuses.creator}
        exercisesArr={newExercisesArr && newExercisesArr}
        planId={planId}
      />
    </Suspense>
  );
};

export default Page;
