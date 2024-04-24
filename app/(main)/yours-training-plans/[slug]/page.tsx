'use client';
import React, { useState } from 'react';
import SectionTitle from '@/components/section-title';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
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
import InputItem from './input-item';

const Page = ({ params }: { params: { slug: string } }) => {
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
    exercises: [{ exercisesName: '', series: '' }],
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(planData, setErrors)) {
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
        throw new Error('Network response was not ok');
      }

      console.log('Plan data submitted successfully');
    } catch (error) {
      console.error('There was an error submitting plan data:', error);
    }
  };

  return (
    <div className=''>
      <SectionTitle>Add New Plan</SectionTitle>
      <form
        className='lg:w-1/2 flex flex-col gap-3 pb-10 px-2 lg:px-0 '
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

        {planData.exercisesArr.map((plan, i) => (
          <div
            key={i}
            className='my-1 lg:my-2 border-2 border-slate-100/10 p-2 lg:p-4 rounded-md'>
            <div className='flex items-start justify-between gap-2'>
              <div className='w-full '>
                <InputItem
                  id='planName'
                  label='Exercise Name'
                  type='text'
                  value={plan.exercisesName}
                  onChange={(e) =>
                    onChangeExerciseName(e.target.value, plan.id, setPlanData)
                  }
                  style='mb-2'
                  error={errors.exercises[i]?.exercisesName}
                />
              </div>
              <Button
                size='sm'
                variant='ghost'
                className='mt-4'
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
                <p className='text-xs text-red-500 w-full text-center mt-5'>
                  {errors.exercises[i].series}
                </p>
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

export default Page;
