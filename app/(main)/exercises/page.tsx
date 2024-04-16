import React from 'react';
import SectionTitle from '@/components/section-title';
import ExerciseCard from './exercise-card';
import { exerciseCategories } from '@/lib/app-data';

const Exercise = () => {

  return (
    <section>
      <SectionTitle>Exercise catalogue</SectionTitle>
      <div className='flex flex-wrap gap-2 max-xl:pl-2 lg:gap-5 max-w-[500px]'>
        {exerciseCategories.map((exercise) => (
          <React.Fragment key={exercise.name}>
            <ExerciseCard link={exercise.link} name={exercise.name} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Exercise;
