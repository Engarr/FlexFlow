'use client';
import React from 'react';
import { formSchema, formSchemaType } from '@/lib/form-schema';
import {
  FieldArrayWithId,
  FormProvider,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from 'react-hook-form';

import FormElement from './form-element';
import { DeletBtn } from '../delete-btn';
import ExerciseNameInput from './exercise-name-input';
import SeriesFieldArray from './series-field-array';
import { z } from 'zod';
import { FormLabel } from '../ui/form';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';

type FormWrapperTye = {
  form: UseFormReturn<formSchemaType, any, undefined>;
  fields: FieldArrayWithId<formSchemaType, 'exercisesArr', 'id'>[];
  append: UseFieldArrayAppend<formSchemaType, 'exercisesArr'>;
  remove: UseFieldArrayRemove;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  isTraining?: boolean;
};

const FormWrapper = ({
  form,
  fields,
  onSubmit,
  append,
  remove,
  isTraining = false,
}: FormWrapperTye) => {
  return (
    <FormProvider {...form}>
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
                <DeletBtn
                  removeHandler={async () => remove(index)}
                  btnStyle='mt-6'>
                  <div>
                    <Trash size='20px' />
                  </div>
                </DeletBtn>
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
        <Button
          type='submit'
          className={`${form.formState.isSubmitting && 'animate-pulse'}`}
          variant='primary'
          disabled={
            form.formState.isSubmitting || form.formState.isSubmitSuccessful
          }>
          {form.formState.isSubmitting
            ? 'Saves Data...'
            : isTraining
            ? 'End Training'
            : 'Save Plan'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
