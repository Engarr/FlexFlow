import React, { Suspense } from 'react';
import SectionTitle from '@/components/section-title';
import ExerciseCard from './exercise-card';
import { Metadata } from 'next';
import LoaderComponent from '@/components/loader-component';
import { getExerciseCategory } from '@/server/get-db-data-functions';
import ErrorComponent from '@/components/error-component';

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
      <SectionTitle>Exercise catalogue</SectionTitle>
      <div className='flex flex-wrap gap-2 max-xl:pl-2 lg:gap-5 max-w-[500px]'>
        <Suspense fallback={<LoaderComponent />}>
          <Categories />
        </Suspense>
      </div>
    </section>
  );
};

export default Exercise;
