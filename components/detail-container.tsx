import React from 'react';
import Link from 'next/link';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { exercises } from '@/lib/app-data';
import { PlanDataType, TrainingDataType } from '@/types/type';

import { Button } from './ui/button';
import SectionTitle from './section-title';

type PropsType = {
 
  isTraining?: boolean;
  data: TrainingDataType | PlanDataType;
  title: string;
  date?: string;
};

const DetailContainer = ({
  data,
  date,
  title,
  isTraining = false,
}: PropsType) => {
  return (
    <div className='overflow-hidden px-1 '>
      <SectionTitle>
        {title}:{` `}
        <span className='text-text-secondary'>{data.planName}</span>
        {date && (
          <p className='text-base'>
            Date:{` `}
            <span className='text-text-secondary'>{date}</span>
          </p>
        )}
      </SectionTitle>

      <div className='left-1/2 relative -translate-x-1/2 max-lg:pb-20 '>
        <Carousel className='w-full max-w-md left-1/2 -translate-x-1/2 '>
          <CarouselContent className=''>
            {data.exercisesArr.map((exercise, index) => {
              const isExerciseOnTheAppBase = exercises.find(
                (e) => e.exerciseName === exercise.exercisesName
              );
              return (
                <CarouselItem key={index} className=''>
                  <div className='text-xl mx-3'>
                    <p>
                      Exercise No.{' '}
                      <span className='text-text-secondary font-semibold'>
                        {exercise.id}
                      </span>
                      /
                      <span className='font-bold'>
                        {data.exercisesArr.length}
                      </span>
                    </p>
                  </div>
                  <div className='p-3 border-gray-400 border rounded-md  shadow-md shadow-gray-500/50 dark:shadow-gray-200/40 m-3'>
                    {isExerciseOnTheAppBase ? (
                      <Link href={`/exercise/${exercise.exercisesName}`}>
                        <h3 className='text-2xl  hover:text-lime-700 transition-colors mb-2 '>
                          {exercise.exercisesName}
                        </h3>
                      </Link>
                    ) : (
                      <h3 className='text-2xl  mb-2 '>
                        {exercise.exercisesName}
                      </h3>
                    )}

                    {exercise.seriesData.map((series, seriesIndex) => (
                      <div key={seriesIndex} className='flex gap-4'>
                        <p>
                          <span className='font-semibold'>Series:</span>{' '}
                          {series.series}
                        </p>
                        <p>
                          <span className='font-semibold'> Weight: </span>{' '}
                          {series.weight === 0 ? ' ___' : series.weight}
                        </p>

                        <p>
                          <span className='font-semibold'>Repetitions:</span>{' '}
                          {series.repetitions}
                        </p>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious
            variant='default'
            className=' max-lg:left-4 max-lg:top-[115%]'
          />
          <CarouselNext
            variant='default'
            className='max-lg:right-4 max-lg:top-[115%]'
          />
        </Carousel>

        {isTraining && (
          <div className='w-full  items-center justify-center flex mt-6'>
            <Button asChild variant='primary'>
              <Link href='/'>Make Changes</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailContainer;
