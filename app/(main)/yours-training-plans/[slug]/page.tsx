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
} from '@/utils/plan-functions';

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      <form className='w-1/2 flex flex-col gap-3 pb-10' onSubmit={onSubmit}>
        <InputItem
          id='planName'
          label='Plan Name:'
          type='text'
          value={planData.planName}
          onChange={(e) => onChangePlanName(e.target.value, setPlanData)}
          style='mb-2'
        />

        {planData.exercisesArr.map((plan, i) => (
          <div
            key={i}
            className='my-2 border-2 border-slate-100/10 p-4 rounded-md'>
            <div className='flex  items-start justify-between gap-2'>
              <div className='w-full '>
                <Label htmlFor='planName'>Exercise Name</Label>
                <Input
                  id='planName'
                  placeholder=''
                  type='text'
                  value={plan.exercisesName}
                  onChange={(e) =>
                    onChangeExerciseName(e.target.value, plan.id, setPlanData)
                  }
                  className='mb-2'
                />
              </div>
              <Button
                size='sm'
                variant='ghost'
                onClick={(e) => handleRemoveExersise(e, plan.id, setPlanData)}>
                <div>
                  <Trash2 />
                </div>
              </Button>
            </div>
            <div className='flex flex-col gap-2  px-1  mb-3'>
              {planData.exercisesArr[i].seriesData.map(
                (exercisesSeries, index) => (
                  <div
                    className='flex gap-2 items-end justify-center'
                    key={index}>
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
        <Button variant='primary' className='mt-2' type='submit'>
          Save Plan
        </Button>
      </form>
    </div>
  );
};

export default Page;

type inputItemType = {
  label: string;
  id: string;
  value: string | number;
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  style?: string;
  disabled?: boolean;
};

const InputItem = ({
  label,
  id,
  value,
  type,
  onChange,
  style,
  disabled,
}: inputItemType) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        className={style}
        type={type}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
