'use client';
import React, { useEffect, useState } from 'react';
import PlanForm from '@/components/plan-form/plan-form';
import SectionTitle from '@/components/section-title';
import { useParams, useRouter } from 'next/navigation';
import { UseQueryResult, useMutation, useQuery } from 'react-query';
import { QUERY_KEY_PLANS, editUserPlan, fetchPlan } from '@/db/plans-functions';
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ErrorsType, PlanDataType, UserPlanType } from '@/types/type';
import LoaderComponent from '@/components/loader-component';
import ErrorComponent from '@/components/error-component';
import { useToast } from '@/components/ui/use-toast';
import {
  handleAddNewExersise,
  handleAddSeries,
  handleRemoveExersise,
  handleRemoveSeries,
  onChangeExerciseName,
  onChangePlanName,
  onChangeSeriesRepetitions,
  onChangeSeriesWeight,
  validateForm,
} from '@/utils/plan-functions';

const EdditPlan = () => {
  const { planId } = useParams();
  const { userId } = useAuth();
  if (!userId) {
    redirect('/');
  }
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = {
    planName: '',

    exercisesArr: [
      {
        exercisesName: '',
        id: 1,
        seriesData: [{ seriesId: 1, series: 1, weight: 0, repetitions: 10 }],
      },
    ],
  };
  const [newPlanData, setNewPlanData] = useState(defaultValues);

  const { data, isLoading, isError }: UseQueryResult<UserPlanType> = useQuery(
    QUERY_KEY_PLANS,
    () => fetchPlan({ planId: planId.toString() })
  );
  const { mutateAsync } = useMutation((newPlanData: PlanDataType) =>
    editUserPlan({
      userId: userId.toString(),
      planId: planId.toString(),
      newFormData: newPlanData,
    })
  );

  useEffect(() => {
    if (data) {
      setNewPlanData(data);
    }
  }, [data]);

  const [errors, setErrors] = useState({
    planName: '',
    exercisesArr: '',
    exercises: [{ exercisesName: '', series: '' }],
  });

  const isPlanDataChanged =
    JSON.stringify(newPlanData) !== JSON.stringify(defaultValues);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(newPlanData, setErrors)) {
      toast({
        title: 'Form Validation Error',
        description: 'Correct Errors In The Form',
        variant: 'destructive',
      });
      return;
    }
    const edditedPlanValues = {
      ...newPlanData,
      creator: userId,
    };
    try {
      await mutateAsync(edditedPlanValues);
      toast({
        title: 'Success!',
        description: 'The Plan Has Been Changed Successfully!',
      });
      router.push('/plans/yours-training-plans');
    } catch (error) {
      toast({
        title: 'Error',
        description: `There Was An Error Changing Plan Data: ${error}`,
        variant: 'destructive',
      });
    }
  };
  const planNameHandler = (planName: string) => {
    onChangePlanName(planName, setNewPlanData);
  };
  const exerciseSeriesWeightHandler = (
    value: string,
    planId: number,
    seriesId: number
  ) => {
    onChangeSeriesWeight(value, planId, seriesId, setNewPlanData);
  };
  const exerciseNameHandler = (name: string, planId: number) => {
    onChangeExerciseName(name, planId, setNewPlanData);
  };
  const addSeriesHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    handleAddSeries(e, index, setNewPlanData);
  };
  const removeSeries = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    exerciseId: number,
    seriesId: number
  ) => {
    handleRemoveSeries(e, exerciseId, seriesId, setNewPlanData);
  };
  const changeSeriesRepetitionsHandler = (
    value: string,
    planId: number,
    seriesId: number
  ) => {
    onChangeSeriesRepetitions(value, planId, seriesId, setNewPlanData);
  };
  const addNewExerciseHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    handleAddNewExersise(e, index, setNewPlanData);
  };
  const removeExerciseHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    exerciseId: number,
    setErrors: React.Dispatch<React.SetStateAction<ErrorsType>>
  ) => {
    handleRemoveExersise(e, exerciseId, setNewPlanData, setErrors);
  };

  return (
    <div>
      <SectionTitle>
        Edit Plan ID: <span className='text-lime-theme'>{data?._id}</span>
      </SectionTitle>
      {isLoading && isPlanDataChanged ? (
        <LoaderComponent />
      ) : isError ? (
        <ErrorComponent message='Fetching Data Error' />
      ) : (
        <PlanForm
          errors={errors}
          onSubmit={onSubmit}
          data={newPlanData}
          setErrors={setErrors}
          onChangePlanName={planNameHandler}
          onChangeExerciseSeriesWeight={exerciseSeriesWeightHandler}
          onChangeExerciseName={exerciseNameHandler}
          onAddSeries={addSeriesHandler}
          onRemoveSeries={removeSeries}
          onChangeSeriesRepetitions={changeSeriesRepetitionsHandler}
          addNewExersiseHandler={addNewExerciseHandler}
          removeExerciseHandler={removeExerciseHandler}
        />
      )}
    </div>
  );
};

export default EdditPlan;
