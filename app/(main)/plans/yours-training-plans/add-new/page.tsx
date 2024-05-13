'use client';
import { useState } from 'react';
import SectionTitle from '@/components/section-title';
import { useToast } from '@/components/ui/use-toast';
import PlanForm from '@/components/plan-form/plan-form';
import { useMutation } from 'react-query';
import { redirect, useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { addNewPlan } from '@/db/plans-functions';
import { useAuth } from '@clerk/nextjs';
import { ErrorsType, PlanDataType } from '@/types/type';
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

const AddNewPlan = () => {
  const router = useRouter();
  const { userId } = useAuth();
  if (!userId) {
    redirect('/');
  }
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    planName: '',
    exercisesArr: [
      {
        exercisesName: '',
        id: 1,
        seriesData: [{ seriesId: 1, series: 1, weight: 0, repetitions: 10 }],
      },
    ],
  });
  const [errors, setErrors] = useState({
    planName: '',
    exercisesArr: '',
    exercises: [{ exercisesName: '', series: '' }],
  });
  const { mutateAsync, isLoading } = useMutation((PlanData: PlanDataType) =>
    addNewPlan(PlanData)
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(formData, setErrors)) {
      toast({
        title: 'Form Validation Error',
        description: 'Correct Errors In The Form',
        variant: 'destructive',
      });
      return;
    }
    const planDataWithUserId = {
      ...formData,
      creator: userId,
    };
    try {
      await mutateAsync(planDataWithUserId);
      toast({
        title: 'Success!',
        description: 'Plan Data Submitted Successfully',
      });
      router.push('/plans/yours-training-plans');
    } catch (err) {
      toast({
        title: 'Error',
        description: `There was an error submitting plan data: ${err}`,
        variant: 'destructive',
      });
    }
  };
  const planNameHandler = (planName: string) => {
    onChangePlanName(planName, setFormData);
  };
  const exerciseSeriesWeightHandler = (
    value: string,
    planId: number,
    seriesId: number
  ) => {
    onChangeSeriesWeight(value, planId, seriesId, setFormData);
  };
  const exerciseNameHandler = (name: string, planId: number) => {
    onChangeExerciseName(name, planId, setFormData);
  };
  const addSeriesHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    handleAddSeries(e, index, setFormData);
  };
  const removeSeries = (exerciseId: number, seriesId: number) => {
    handleRemoveSeries(exerciseId, seriesId, setFormData);
  };
  const changeSeriesRepetitionsHandler = (
    value: string,
    planId: number,
    seriesId: number
  ) => {
    onChangeSeriesRepetitions(value, planId, seriesId, setFormData);
  };
  const addNewExerciseHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    handleAddNewExersise(e, index, setFormData);
  };
  const removeExerciseHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    exerciseId: number,
    setErrors: React.Dispatch<React.SetStateAction<ErrorsType>>
  ) => {
    handleRemoveExersise(e, exerciseId, setFormData, setErrors);
  };

  return (
    <div className='relative'>
      <SectionTitle>Add New Plan</SectionTitle>
      {isLoading ? (
        <div className=' flex items-center justify-center left-1/2 -translate-x-1/2 relative '>
          <Loader className='animate-spin w-[50px]' size='40px' />
        </div>
      ) : (
        <PlanForm
          errors={errors}
          onSubmit={onSubmit}
          data={formData}
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

export default AddNewPlan;
