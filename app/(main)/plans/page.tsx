'use client';
import React from 'react';
import PlansContent from '@/components/plans-content';

const PlansPage = () => {
  const plansData = [
    {
      title: 'Choose Your Own Plan',
      info: 'Option allows you to select and manage your plans',
      href: '/yours-training-plans',
    },
    {
      title: 'Choose A Training Plan',
      info: 'Choose a plan from the app plans examples',
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
