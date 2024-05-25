import { exerciseType } from '@/types/form-types';

export const transformExercisesArr = async (arr: exerciseType[]) => {
  'use server';
  return arr.map((exercise) => {
    const transformedSeriesData = exercise.seriesData.map((series, index) => ({
      seriesId: index + 1,
      series: series.series,
      weight: series.weight,
      repetitions: series.repetitions,
    }));

    return {
      exercisesName: exercise.exercisesName,
      id: exercise.id,
      seriesData: transformedSeriesData,
    };
  });
};
