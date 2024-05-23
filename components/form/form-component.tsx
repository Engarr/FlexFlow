'use client';
import { formSchema, formSchemaType } from '@/lib/form-schema';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import FormElement from '@/components/form/form-element';
import SeriesFieldArray from '@/components/form/series-field-array';
import ExerciseNameInput from '@/components/form/exercise-name-input';
import { z } from 'zod';
import { useAuth } from '@clerk/nextjs';
import { redirect, useRouter } from 'next/navigation';
import { addNewPlan, editUserPlan } from '@/server/actions/actions';
import { useToast } from '@/components/ui/use-toast';
import { PlanDataType } from '@/types/type';

export type seriesDataType = {
  seriesId: number;
  series: number;
  weight: number;
  repetitions: number;
};

export type exerciseType = {
  exercisesName: string;
  id: number;
  seriesData: seriesDataType[];
};

type FormType = {
  planName?: string;
  creator?: string;
  exercisesArr?: exerciseType[];
  planId?: string;
};

const FormComponent = ({
  planName,
  creator,
  exercisesArr,
  planId,
}: FormType) => {
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
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const planDataWithUserId = {
      ...values,
      creator: userId as string,
    };
    const onSubmitFunction =
      planId && creator
        ? editUserPlan(planDataWithUserId, creator, planId)
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
    <Form {...form}>
      <form
        className='lg:w-3/4 flex flex-col gap-3 pb-10 px-2 lg:px-0'
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormElement form={form} name={`planName`} title='Plan Name:' />

        {fields.map((item, index) => {
          const errorSeriesMessage = form.formState.errors.exercisesArr ? (
            <FormLabel className='text-destructive'>
              {
                form.formState.errors.exercisesArr[index]?.seriesData?.root
                  ?.message
              }
            </FormLabel>
          ) : null;

          return (
            <div
              key={item.id}
              className='my-1 lg:my-2 border-2 dark:border-slate-100/10 p-2 lg:p-4 rounded-md relative'>
              <p className='absolute top-[-20px] left-[5px] bg-[var(--main-background)] border border-slate-100/10 p-1 rounded-md text-base'>
                Exercise No.{' '}
                <span className='dark:text-lime-400 text-lime-600 font-bold'>
                  {index + 1}
                </span>
              </p>
              <div className='flex items-center justify-between gap-2 '>
                <div className='w-full my-2'>
                  <ExerciseNameInput
                    form={form}
                    name={`exercisesArr.${index}.exercisesName`}
                    title='Exercise Name:'
                  />
                </div>
                <Button
                  type='button'
                  size='sm'
                  variant='ghost'
                  className='mt-6 w-[20px]'
                  onClick={() => remove(index)}>
                  <div>
                    <Trash2 />
                  </div>
                </Button>
              </div>
              {errorSeriesMessage}
              <SeriesFieldArray form={form} exerciseIndex={index} />
            </div>
          );
        })}
        <Button
          type='button'
          variant='default'
          onClick={() =>
            append({
              exercisesName: '',
              id: fields.length + 1,
              seriesData: [
                { seriesId: 1, series: 1, weight: 0, repetitions: 10 },
              ],
            })
          }>
          Add Exercise
        </Button>
        <Button type='submit' variant='primary'>
          Save Plan
        </Button>
      </form>
    </Form>
  );
};

export default FormComponent;
