'use client';
import { formSchema, formSchemaType } from '@/lib/form-schema';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@clerk/nextjs';
import { redirect, useRouter } from 'next/navigation';
import {
  addNewPlan,
  editTraining,
  editUserPlan,
} from '@/server/actions/actions';
import { useToast } from '@/components/ui/use-toast';
import FormWrapper from './form-wrapper';
import { FormType } from '@/types/form-types';
import { useState } from 'react';
import { DatePicker } from '../data-picker';
// import useBeforeUnload from '@/lib/use-before-unload';

const PlanForm = ({
  planName,
  creator,
  exercisesArr,
  planId,
  trainingId,
  initialDate,
}: FormType) => {
  const [date, setDate] = useState<Date | undefined>(initialDate);

  const router = useRouter();
  const { userId } = useAuth();
  if (!userId) {
    redirect('/');
  }
  const { toast } = useToast();
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

  // useBeforeUnload(form.formState.isDirty);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const planDataWithUserId = {
      ...values,
      creator: userId as string,
    };

    const onSubmitFunction =
      planId && creator
        ? editUserPlan(planDataWithUserId, creator, planId)
        : trainingId && userId && date
        ? editTraining(values, userId, trainingId, date)
        : addNewPlan(planDataWithUserId);

    const res = await onSubmitFunction;
    if (res?.success) {
      toast({
        title: 'Success!',
        description: res.success,
      });
      form.reset();
      router.push('/plans/yours-training-plans');
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
      {trainingId && <DatePicker date={date} setDate={setDate} />}

      <FormWrapper
        append={append}
        fields={fields}
        form={form}
        onSubmit={onSubmit}
        remove={remove}
      />
    </>
  );
};

export default PlanForm;
