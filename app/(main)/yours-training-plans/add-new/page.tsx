'use client';
import React, { useState } from 'react';
import SectionTitle from '@/components/section-title';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  handleAddNewExersise,
  handleAddSeries,
  handleRemoveExersise,
  handleRemoveSeries,
  onChangePlanName,
  onChangeSeriesRepetitions,
  onChangeSeriesWeight,
  validateForm,
} from '@/utils/plan-functions';

import InputItem from './input-item';
import ExerciseInput from './exercise-input';
import { useToast } from '@/components/ui/use-toast';
import ErrorMessage from '@/components/error-message';

const AddNewPlan = () => {
  const { toast } = useToast();
  const [planData, setPlanData] = useState({
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(planData, setErrors)) {
      toast({
        title: 'Form Validation Error',
        description: 'Correct Errors In The Form',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/add-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData),
      });

      if (!response.ok) {
        toast({
          title: 'Network Error',
          description: 'Network response was not ok',
          variant: 'destructive',
        });
        throw new Error('Network response was not ok');
      }
      toast({
        title: 'Success!',
        description: 'Plan Data Submitted Successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `There was an error submitting plan data:${error}`,
      });
    }
  };

  return (
    <div className=''>
      <SectionTitle>Add New Plan</SectionTitle>
      <form
        className='lg:w-3/4 flex flex-col gap-3 pb-10 px-2 lg:px-0 '
        onSubmit={onSubmit}>
        <InputItem
          id='planName'
          label='Plan Name:'
          type='text'
          value={planData.planName}
          onChange={(e) => onChangePlanName(e.target.value, setPlanData)}
          style='mb-1 lg:mb-2'
          error={errors.planName}
        />

        {errors.exercisesArr && (
          <ErrorMessage
            message={errors.exercisesArr}
            style='text-base lg:text-xl'
          />
        )}
        {planData.exercisesArr.map((plan, i) => (
          <div
            key={i}
            className='my-1 lg:my-2 border-2 border-slate-100/10 p-2 lg:p-4 rounded-md relative'>
            <p className='absolute top-[-20px] left-[5px] bg-[var(--main-background)] border border-slate-100/10 p-1 rounded-md text-base'>
              Exercise No.{' '}
              <span className='text-lime-400 font-bold'>{i + 1}</span>
            </p>
            <div className='flex items-start justify-between gap-2'>
              <div className='w-full my-2'>
                <ExerciseInput
                  error={errors.exercises[i]?.exercisesName}
                  planId={plan.id}
                  setPlanData={setPlanData}
                  value={planData.exercisesArr[i].exercisesName}
                  searchExercise={planData.exercisesArr[i].exercisesName}
                />
              </div>
              <Button
                size='sm'
                variant='ghost'
                className='mt-6'
                onClick={(e) =>
                  handleRemoveExersise(e, plan.id, setPlanData, setErrors)
                }>
                <div>
                  <Trash2 />
                </div>
              </Button>
            </div>
            <div className='flex flex-col gap-2  px-1  mb-3'>
              {errors.exercises[i]?.series && (
                <ErrorMessage message={errors.exercises[i].series} />
              )}
              {planData.exercisesArr[i].seriesData.map(
                (exercisesSeries, index) => (
                  <div
                    className='flex gap-2 items-start justify-center '
                    key={index}>
                    <div className='flex max-lg:flex-col w-full gap-2'>
                      <InputItem
                        id='series'
                        label='Series:'
                        value={exercisesSeries.series}
                        type='number'
                        style='disabled:cursor-default disabled:opacity-100'
                        disabled
                      />
                      <InputItem
                        id='weight'
                        label='Weight (kg):'
                        value={exercisesSeries.weight}
                        type='number'
                        onChange={(e) =>
                          onChangeSeriesWeight(
                            e.target.value,
                            plan.id,
                            exercisesSeries.seriesId,
                            setPlanData
                          )
                        }
                      />
                      <InputItem
                        id='repetitions'
                        label='Repetitions:'
                        value={exercisesSeries.repetitions}
                        type='number'
                        onChange={(e) =>
                          onChangeSeriesRepetitions(
                            e.target.value,
                            plan.id,
                            exercisesSeries.seriesId,
                            setPlanData
                          )
                        }
                      />
                    </div>

                    <Button
                      size='sm'
                      variant='danger'
                      className='mt-6 '
                      onClick={() =>
                        handleRemoveSeries(
                          plan.id,
                          exercisesSeries.seriesId,
                          setPlanData
                        )
                      }>
                      <div>X</div>
                    </Button>
                  </div>
                )
              )}

              <Button
                onClick={(e) => handleAddSeries(e, i, setPlanData)}
                className=''
                variant='primaryOutline'>
                Add Series
              </Button>
            </div>
          </div>
        ))}
        <Button
          onClick={(e) =>
            handleAddNewExersise(e, planData.exercisesArr.length, setPlanData)
          }
          className=''>
          Add New Exercise
        </Button>
        <Button variant='primary' className='mt-2' type='submit'>
          Save Plan
        </Button>
      </form>
    </div>
  );
};

export default AddNewPlan;
