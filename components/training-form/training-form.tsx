'use client';
import React from 'react';
import FormWrapper from '../form/form-wrapper';
import { useFieldArray, useForm } from 'react-hook-form';
import { formSchema, formSchemaType } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { addNewPlanToHistory } from '@/server/actions/actions';
import { FormTrainingType } from '@/types/form-types';

const TrainingForm = ({
  planName,
  exercisesArr,
  userId,
  trainingTime,
}: FormTrainingType & { userId: string }) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      planName: planName || '',
      exercisesArr: exercisesArr || [
        {
          exercisesName: '',
          id: 1,
          seriesData: [{ seriesId: 1, series: 1, weight: 0, repetitions: 10 }],
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'exercisesArr',
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newTrainingData = {
      ...values,
      planName: values.planName,
      exercisesArr: values.exercisesArr,
      date: trainingTime.date,
      dayOfTheWeek: trainingTime.dayOfTheWeek,
      time: trainingTime.time,
      userId: userId,
    };

    const res = await addNewPlanToHistory(newTrainingData);
    if (res?.success) {
      toast({
        title: 'Success!',
        description: res.success,
      });
      form.reset();
      router.push('/home');
    }
    if (res?.error) {
      toast({
        title: 'Error',
        description: res.error,
        variant: 'destructive',
      });
    }
  }
  return (
    <>
      <div className='flex gap-2 underline underline-offset-2 decoration-text-secondary decoration-2'>
        <p className='text-lg'>
          Training data:{' '}
          <span className='font-semibold'>{trainingTime.date}</span>
        </p>
      </div>

      <FormWrapper
        append={append}
        fields={fields}
        form={form}
        onSubmit={onSubmit}
        remove={remove}
        isTraining={true}
      />
    </>
  );
};

export default TrainingForm;
