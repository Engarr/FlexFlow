'use client';
import React, { useState } from 'react';
import SectionTitle from '@/components/section-title';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  handleAddNewExersise,
  handleAddSeries,
  handleRemoveExersise,
  handleRemoveSeries,
  onChangeExerciseName,
  onChangePlanName,
  onChangeSeriesWeight,
} from '@/utils/plan-functions';

const Page = ({ params }: { params: { slug: string } }) => {
  const [planData, setPlanData] = useState({
    planName: '',
    exercisesArr: [
      {
        exercisesName: '',
        id: 1,
        seriesData: [{ seriesId: 1, series: 1, weight: 0 }],
      },
    ],
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(planData);
  };

  return (
    <div>
      <SectionTitle>Add New Plan</SectionTitle>
      <form className='w-1/2 flex flex-col gap-3' onSubmit={onSubmit}>
        <Input
          placeholder='Plan Name:'
          type='text'
          className='mb-2'
          value={planData.planName}
          onChange={(e) => onChangePlanName(e.target.value, setPlanData)}
        />
        {planData.exercisesArr.map((plan, i) => (
          <div
            key={i}
            className='my-2 border-2 border-slate-100/10 p-4 rounded-md'>
            <div className='flex gap-2'>
              <Input
                placeholder='Exercise Name:'
                type='text'
                value={plan.exercisesName}
                onChange={(e) =>
                  onChangeExerciseName(e.target.value, plan.id, setPlanData)
                }
                className='mb-2'
              />
              <Button
                size='sm'
                onClick={() => handleRemoveExersise(plan.id, setPlanData)}>
                <div>
                  <Trash2 />
                </div>
              </Button>
            </div>
            <div className='flex flex-col gap-2  px-1  mb-3'>
              {planData.exercisesArr[i].seriesData.map(
                (exercisesSeries, index) => (
                  <div
                    className='flex gap-2 items-center justify-center'
                    key={index}>
                    <Input
                      placeholder='Series:'
                      className='disabled:cursor-default'
                      disabled
                      type='number'
                      value={exercisesSeries.series}
                    />
                    <Input
                      placeholder='Weight: ( kg )'
                      type='number'
                      value={
                        exercisesSeries.weight === 0
                          ? 'weight ( kg )'
                          : exercisesSeries.weight
                      }
                      onChange={(e) =>
                        onChangeSeriesWeight(
                          e.target.value,
                          plan.id,
                          exercisesSeries.seriesId,
                          setPlanData
                        )
                      }
                    />
                    <Button
                      size='sm'
                      variant='danger'
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
        <Button variant='primary' className='mt-2'>
          Save Plan
        </Button>
      </form>
    </div>
  );
};

export default Page;
