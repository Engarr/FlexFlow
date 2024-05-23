'use client';
import { exercises } from '@/lib/app-data';
import { usePathname } from 'next/navigation';
import React from 'react';
import ExercisesListItem from './exercises-list-item';

type ExercisesWrapperType = {
  slug: string;
};

const ExercisesWrapper = ({ slug }: ExercisesWrapperType) => {
  const pathname = usePathname();

  const musclesExercises = exercises.filter((e) => e.category === slug);
  return (
    <>
      {Array.isArray(musclesExercises) &&
        musclesExercises.map((e) => (
          <React.Fragment key={e.exerciseName}>
            <ExercisesListItem
              exerciseName={e.exerciseName}
              imageUrl={e.imageUrl}
              pathname={pathname}
              link={e.link}
            />
          </React.Fragment>
        ))}
    </>
  );
};

export default ExercisesWrapper;
