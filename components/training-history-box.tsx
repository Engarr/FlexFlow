import React from 'react';
import { TrainingDataType } from '@/types/type';
import LoaderComponent from './loader-component';
import { PlanBar } from './plan-bar';
import Link from 'next/link';
import { Button } from './ui/button';
import { SquareMousePointer } from 'lucide-react';

type TrainingHistoryComponentPropsType = {
  isLoading: boolean;
  trainingsData: TrainingDataType[] | undefined;
};

const TrainingHistoryBox = ({
  isLoading,
  trainingsData,
}: TrainingHistoryComponentPropsType) => {
  
  const heightClass =
    trainingsData && trainingsData?.length > 3
      ? ' max-h-[250px] lg:max-h-[200px] overflow-y-scroll'
      : '';

  return (
    <>
      {isLoading ? (
        <LoaderComponent />
      ) : trainingsData && trainingsData?.length > 0 ? (
        <div className={`flex flex-col gap-2 ${heightClass} `}>
          {trainingsData &&
            trainingsData.map((t) => (
              <React.Fragment key={t._id}>
                <PlanBar
                  planName={t.planName}
                  userId={t.userId}
                  trainingId={t._id}
                />
              </React.Fragment>
            ))}
        </div>
      ) : trainingsData === undefined ? (
        <div className='max-xl:items-center flex flex-col justify-center'>
          <p className='lg:text-lg'>
            Select The Day From The{' '}
            <span className='text-text-secondary'>Calendar</span> To Display
            Training History
          </p>
          <SquareMousePointer className='lg:w-[40px] lg:h-[40px]' />
        </div>
      ) : (
        <div className='flex max-xl:flex-col items-center gap-2 justify-center xl:items-start bg-card px-6 py-4 rounded-md '>
          <p className='text-xl my-4 bg-card  max-xl:text-center w-full'>
            You Didn&lsquo;t Have Training That Day
          </p>
          <div className='items-center justify-center flex flex-col'>
            <Link href='/start-training'>
              <Button variant='primary' size='sm'>
                Start New Training To Day
              </Button>
            </Link>
            <Button variant='ghost' size='sm' disabled>
              Add Training To History
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default TrainingHistoryBox;
