'use client';

import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { formSchema, formSchemaType } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import {
  addNewTrainingToHistory,
  editTraining,
} from '@/server/actions/actions';
import { FormTrainingType } from '@/types/form-types';

import FormWrapper from '../form/form-wrapper';
import { DatePicker } from '../data-picker';
import { formatDateTime } from '@/utils/date-transform';
import { useQueryClient } from '@tanstack/react-query';
import useStore from '@/context/store';

const TrainingForm = ({
  planName,
  exercisesArr,
  userId,
  trainingId,
  initialDate,
}: FormTrainingType & { userId: string }) => {
  const { actualDay } = useStore();

  const [date, setDate] = useState<Date | undefined>(initialDate || new Date());

  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

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
    if (!date) {
      toast({
        title: 'Error',
        description: 'Date is not defined',
        variant: 'destructive',
      });
      return;
    }

    const trainingTime = formatDateTime(date);

    const newTrainingData = {
      ...values,
      planName: values.planName,
      exercisesArr: values.exercisesArr,
      date: trainingTime.date,
      dayOfTheWeek: trainingTime.dayOfTheWeek,
      time: trainingTime.time,
      userId: userId,
    };

    let action = null;
    if (trainingId && date) {
      action = editTraining(newTrainingData, userId, trainingId);
    } else {
      action = addNewTrainingToHistory(newTrainingData);
    }

    const res = await action;
    if (res?.success) {
      toast({
        title: 'Success!',
        description: res.success,
      });
      if (trainingId) {
        queryClient.invalidateQueries({
          queryKey: ['trainingsHistory', actualDay.date],
        });
      }
      form.reset();
      router.back();
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
    <div className='px-0 lg:px-2'>
      <DatePicker date={date} setDate={setDate} />
      <FormWrapper
        append={append}
        fields={fields}
        form={form}
        onSubmit={onSubmit}
        remove={remove}
        isTraining={true}
      />
    </div>
  );
};

export default TrainingForm;
