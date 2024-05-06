'use client';
import React, { useEffect, useState } from 'react';
import PlanForm from '@/components/plan-form/plan-form';
import SectionTitle from '@/components/section-title';
import { useParams, useRouter } from 'next/navigation';
import { UseQueryResult, useMutation, useQuery } from 'react-query';
import {
  QUERY_KEY_PLANS,
  edditUserPlan,
  fetchPlan,
} from '@/db/plans-functions';
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { UserPlanType } from '@/types/user-plan-type';
import LoaderComponent from '@/components/loader-component';
import ErrorComponent from '@/components/error-component';
import { PlanDataType, validateForm } from '@/utils/plan-functions';
import { useToast } from '@/components/ui/use-toast';

const EdditPlan = () => {
  const { planId } = useParams();
  const { userId } = useAuth();
  if (!userId) {
    redirect('/');
  }
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = {
    planName: '',
    creator: '',
    exercisesArr: [
      {
        exercisesName: '',
        id: 1,
        seriesData: [{ seriesId: 1, series: 1, weight: 0, repetitions: 10 }],
      },
    ],
  };
  const [newPlanData, setNewPlanData] = useState(defaultValues);

  const {
    data,
    isLoading: fetchingPlan,
    isError,
  }: UseQueryResult<UserPlanType> = useQuery(QUERY_KEY_PLANS, () =>
    fetchPlan({ userId: userId, planId: planId.toString() })
  );
  const { mutateAsync, isLoading } = useMutation(
    (newPlanData: PlanDataType) =>
      edditUserPlan({
        userId: userId.toString(),
        planId: planId.toString(),
        newFormData: newPlanData,
      })
  );

  useEffect(() => {
    if (data) {
      setNewPlanData(data);
    }
  }, [data]);

  const [errors, setErrors] = useState({
    planName: '',
    exercisesArr: '',
    exercises: [{ exercisesName: '', series: '' }],
  });

  const isPlanDataChanged =
    JSON.stringify(newPlanData) !== JSON.stringify(defaultValues);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(newPlanData, setErrors)) {
      toast({
        title: 'Form Validation Error',
        description: 'Correct Errors In The Form',
        variant: 'destructive',
      });
      return;
    }
    try {
      await mutateAsync(newPlanData);
      toast({
        title: 'Success!',
        description: 'The Plan Has Been Changed Successfully!',
      });
      router.push('/yours-training-plans');
    } catch (error) {
      toast({
        title: 'Error',
        description: `There Was An Error Changing Plan Data: ${error}`,
        variant: 'destructive',
      });
    }
  };

 
  return (
    <div>
      <SectionTitle>Eddit Plan</SectionTitle>
      {fetchingPlan && !isPlanDataChanged ? (
        <LoaderComponent />
      ) : isError ? (
        <ErrorComponent message='Fetching Data Error' />
      ) : (
        <PlanForm
          errors={errors}
          onSubmit={onSubmit}
          planData={newPlanData}
          setErrors={setErrors}
          setPlanData={setNewPlanData}
        />
      )}
    </div>
  );
};

export default EdditPlan;
