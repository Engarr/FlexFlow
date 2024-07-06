'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@clerk/nextjs';
import { redirect, useRouter } from 'next/navigation';

import { formSchema, formSchemaType } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { addNewPlan, editUserPlan } from '@/server/actions/actions';
import { useToast } from '@/components/ui/use-toast';
import { FormType } from '@/types/form-types';

import FormWrapper from './form-wrapper';

// import useBeforeUnload from '@/lib/use-before-unload';

const PlanForm = ({ planName, creator, exercisesArr, planId }: FormType) => {
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
        : addNewPlan(planDataWithUserId);

    const res = await onSubmitFunction;
    if (res?.success) {
      toast({
        title: 'Success!',
        description: res.success,
      });
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
    <>
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
