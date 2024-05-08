'use client';
import React from 'react';
import SectionTitle from '@/components/section-title';
import { UseQueryResult, useQuery } from 'react-query';
import { fetchPlan } from '@/db/plans-functions';
import { PlanDataType } from '@/types/user-plan-type';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';
import { exercises } from '@/lib/app-data';

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { data, isLoading, isError }: UseQueryResult<PlanDataType> = useQuery(
    ['plan', id],
    () => fetchPlan({ planId: id.toString() })
  );
  if (data) {
    console.log(data);
  }

  return (
    <div className='overflow-hidden px-1'>
      <SectionTitle>
        Plan Details: {}
        {isLoading ? (
          <span className='animate-pulse'> . . .</span>
        ) : (
          <span className='text-text-secondary'>{data?.planName}</span>
        )}
      </SectionTitle>
      {data && (
        <div className='left-1/2 relative -translate-x-1/2  pb-14 '>
          <Carousel className='w-full max-w-md left-1/2 -translate-x-1/2 '>
            <CarouselContent className=''>
              {data.exercisesArr.map((exercise, index) => {
                const isExerciseOnTheAppBase = exercises.find(
                  (e) => e.exerciseName === exercise.exercisesName
                );
                return (
                  <CarouselItem key={index}>
                    <div className='text-xl'>
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
                    <div className='p-3 border-gray-400 border rounded-md  '>
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
        </div>
      )}
    </div>
  );
};

export default Page;
