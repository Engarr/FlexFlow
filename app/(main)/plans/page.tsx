'use client';
import React from 'react';
import PlansContent from '@/components/plans-content';

const PlansPage = () => {
  const plansData = [
    {
      title: 'Choose your own plan',
      info: 'Option allows you to select and manage your plans',
      href: '/yours-training-plans',
    },
    {
      title: 'Choose a training plan',
      info: 'Choose a plan from the examples',
      href: '',
    },
  ];
  return (
    <section>
      <PlansContent data={plansData} />
    </section>
  );
};

export default PlansPage;
