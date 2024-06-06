import React from 'react';
import { exercises } from '@/lib/app-data';
import ExercisesListItem from './exercises-list-item';

type ExercisesWrapperType = {
  slug: string;
};

const ExercisesWrapper = ({ slug }: ExercisesWrapperType) => {
  const musclesExercises = exercises.filter((e) => e.category === slug);
  return (
    <>
      {Array.isArray(musclesExercises) &&
        musclesExercises.map((e) => (
          <React.Fragment key={e.exerciseName}>
            <ExercisesListItem
              exerciseName={e.exerciseName}
              imageUrl={e.imageUrl}
              link={e.link}
            />
          </React.Fragment>
        ))}
    </>
  );
};

export default ExercisesWrapper;
