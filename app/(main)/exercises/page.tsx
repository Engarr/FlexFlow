import React, { Suspense } from 'react';
import { Metadata } from 'next';

import SectionTitle from '@/components/section-title';
import LoaderComponent from '@/components/loader-component';
import ErrorComponent from '@/components/error-component';
import { getExerciseCategory } from '@/server/db/get-db-data-functions';

import ExerciseCard from './exercise-card';

export const metadata: Metadata = {
  title: 'Flex-Flow - exercises',
  description:
    'Explore a diverse range of exercises categorized for your fitness journey. Discover detailed exercise cards, each tailored to enhance your workout routines.',
};

const Categories = async () => {
  const categories = await getExerciseCategory();

  if (!categories) {
    return (
      <ErrorComponent
        message='Failed to fetch data'
        wrapperStyle='left-0 -translate-x-0 items-start'
      />
    );
  }

  return (
    <>
      {categories.map((categorie) => (
        <React.Fragment key={categorie.name}>
          <ExerciseCard link={categorie.link} name={categorie.name} />
        </React.Fragment>
      ))}
    </>
  );
};

const Exercise = () => {
  return (
    <section>
      <SectionTitle>App Exercise Catalog</SectionTitle>
      <Suspense fallback={<LoaderComponent />}>
        <div className='flex flex-wrap gap-2 max-xl:pl-2 lg:gap-5 max-w-[500px]'>
          <Categories />
        </div>
      </Suspense>
    </section>
  );
};

export default Exercise;
