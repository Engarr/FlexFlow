import React, { Suspense } from 'react';
import PlansContent from '@/components/plans-content';
import SectionTitle from '@/components/section-title';
import LoaderComponent from '@/components/loader-component';

const PlansPage = () => {
  const buttonsData = [
    {
      title: 'Choose Your Own Plan',
      info: 'Option allows you to select and manage your plans',
      href: 'plans/yours-training-plans',
    },
    {
      title: 'Choose A Training Plan',
      info: 'Choose a plan from the app plans examples',
      href: 'plans/app-plans',
    },
  ];
  return (
    <section>
      <SectionTitle>Choose Plan</SectionTitle>
      <div className='flex flex-col gap-3 mt-6'>
        <Suspense fallback={<LoaderComponent />}>
          {buttonsData.map((button, idx) => (
            <React.Fragment key={idx}>
              <PlansContent
                href={button.href}
                info={button.info}
                title={button.title}
              />
            </React.Fragment>
          ))}
        </Suspense>
      </div>
    </section>
  );
};

export default PlansPage;
