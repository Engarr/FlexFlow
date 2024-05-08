'use client';
import { useState } from 'react';
import SectionTitle from '@/components/section-title';

import { useToast } from '@/components/ui/use-toast';
import PlanForm from '@/components/plan-form/plan-form';
import { useMutation } from 'react-query';
import { redirect, useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { addNewPlan } from '@/db/plans-functions';
import { useAuth } from '@clerk/nextjs';
import { PlanDataType } from '@/types/user-plan-type';
import { validateForm } from '@/utils/plan-functions';

const AddNewPlan = () => {
  const router = useRouter();
  const { userId } = useAuth();
  if (!userId) {
    redirect('/');
  }
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
    creator: userId,
  });
  const [errors, setErrors] = useState({
    planName: '',
    exercisesArr: '',
    exercises: [{ exercisesName: '', series: '' }],
  });
  const { mutateAsync, isLoading } = useMutation((formData: PlanDataType) =>
    addNewPlan(formData)
  );

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
      await mutateAsync(planData);
      toast({
        title: 'Success!',
        description: 'Plan Data Submitted Successfully',
      });
      router.push('/plans/yours-training-plans');
    } catch (err) {
      toast({
        title: 'Error',
        description: `There was an error submitting plan data: ${err}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='relative'>
      <SectionTitle>Add New Plan</SectionTitle>
      {isLoading ? (
        <div className=' flex items-center justify-center left-1/2 -translate-x-1/2 relative '>
          <Loader className='animate-spin w-[50px]' size='40px' />
        </div>
      ) : (
        <PlanForm
          errors={errors}
          onSubmit={onSubmit}
          planData={planData}
          setErrors={setErrors}
          setPlanData={setPlanData}
        />
      )}
    </div>
  );
};

export default AddNewPlan;
