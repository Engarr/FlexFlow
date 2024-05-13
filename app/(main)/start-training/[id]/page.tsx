'use client';
import { useAuth } from '@clerk/nextjs';
import ErrorComponent from '@/components/error-component';
import LoaderComponent from '@/components/loader-component';
import PlanForm from '@/components/plan-form/plan-form';
import SectionTitle from '@/components/section-title';
import { addNewPlanToHostory, fetchPlan } from '@/db/plans-functions';
import { PlanDataType, TrainingDataType } from '@/types/type';
import { formatDateTime } from '@/utils/date-transform';
import { validateForm } from '@/utils/plan-functions';
import React, { useEffect, useState } from 'react';
import { UseQueryResult, useMutation, useQuery } from 'react-query';
import { redirect, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useStore } from '@/context/store';
import { defaultTemporaryTrainingValues } from './_lib';

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { userId } = useAuth();
  const router = useRouter();

  if (!userId) {
    redirect('/');
  }
  const { toast } = useToast();

  const { data, isLoading, isError }: UseQueryResult<PlanDataType> = useQuery(
    ['plan', id],
    () => fetchPlan({ planId: id.toString() })
  );

  const { mutateAsync } = useMutation((formData: TrainingDataType) =>
    addNewPlanToHostory(formData)
  );
  const trainingTime = formatDateTime(new Date());
  
  const {
    temporaryTrainingData,
    updateTemporaryTrainingData,
    onChangeExerciseName,
    onChangePlanName,
    onChangeSeriesRepetitions,
    onChangeSeriesWeight,
    handleAddSeries,
    handleRemoveExersise,
    handleRemoveSeries,
    handlerAddExercise,
    actualTrainingPlanId,
    changeActualTrainingPlanId,
  } = useStore();

  const isTemporaryTrainingDataChanged =
    JSON.stringify(temporaryTrainingData) !==
    JSON.stringify(defaultTemporaryTrainingValues);
  const [errors, setErrors] = useState({
    planName: '',
    exercisesArr: '',
    exercises: [{ exercisesName: '', series: '' }],
  });
  useEffect(() => {
    if (data && !isTemporaryTrainingDataChanged) {
      updateTemporaryTrainingData(data);
      changeActualTrainingPlanId(id);
    } else if (actualTrainingPlanId !== id && data) {
      console.log('inne');
      changeActualTrainingPlanId(id);
      updateTemporaryTrainingData(data);
    }
  }, [actualTrainingPlanId, changeActualTrainingPlanId, data, id, isTemporaryTrainingDataChanged, updateTemporaryTrainingData]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(temporaryTrainingData, setErrors)) {
      toast({
        title: 'Form Validation Error',
        description: 'Correct Errors In The Form',
        variant: 'destructive',
      });
      return;
    }
    const newTrainingData = {
      ...temporaryTrainingData,
      planName: temporaryTrainingData.planName,
      exercisesArr: temporaryTrainingData.exercisesArr,
      date: trainingTime,
      userId: userId,
    };
    try {
      await mutateAsync(newTrainingData);
      toast({
        title: 'Success!',
        description:
          'Training Has Been Completed Successfully, See You On The Next One',
      });
      router.push('/home');
    } catch (error) {
      toast({
        title: 'Error',
        description: `There Was An Error Changing Plan Data: ${error}`,
        variant: 'destructive',
      });
    }
  };

  if (isLoading && !data) {
    return <LoaderComponent />;
  }
  if (isError) {
    return <ErrorComponent message='Failed Fetching Data' />;
  }

  return (
    <div>
      <SectionTitle>
        Start Training:{' '}
        <span className='text-text-secondary'>{data?.planName}</span>
      </SectionTitle>
      {data && (
        <PlanForm
          trainingTime={trainingTime}
          errors={errors}
          onSubmit={onSubmit}
          data={temporaryTrainingData}
          setErrors={setErrors}
          onChangePlanName={onChangePlanName}
          onChangeExerciseSeriesWeight={onChangeSeriesWeight}
          onChangeExerciseName={onChangeExerciseName}
          removeExerciseHandler={handleRemoveExersise}
          onAddSeries={handleAddSeries}
          onRemoveSeries={handleRemoveSeries}
          onChangeSeriesRepetitions={onChangeSeriesRepetitions}
          addNewExersiseHandler={handlerAddExercise}
        />
      )}
    </div>
  );
};

export default Page;
