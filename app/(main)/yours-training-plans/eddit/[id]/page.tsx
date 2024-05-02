'use client';
import PlanForm from '@/components/plan-form/plan-form';
import SectionTitle from '@/components/section-title';
import React, { useState } from 'react';

const Page = () => {
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
  const [errors, setErrors] = useState({
    planName: '',
    exercisesArr: '',
    exercises: [{ exercisesName: '', series: '' }],
  });
  const onSubmit = async (e: React.FormEvent) => {};
  return (
    <div>
      <SectionTitle>Eddit Plan</SectionTitle>
      <PlanForm
        errors={errors}
        onSubmit={onSubmit}
        planData={planData}
        setErrors={setErrors}
        setPlanData={setPlanData}
      />
    </div>
  );
};

export default Page;
