
import React from 'react';
import { TrainingDataType } from '@/types/type';
import LoaderComponent from './loader-component';
import { PlanBar } from './plan-bar';
import Link from 'next/link';
import { Button } from './ui/button';

type TrainingHistoryComponentPropsType = {
  isLoading: boolean;
  trainingsData: TrainingDataType[] | undefined;
};

const TrainingHistoryBox = ({
  isLoading,
  trainingsData,
}: TrainingHistoryComponentPropsType) => {
  return (
    <>
      {isLoading ? (
        <LoaderComponent />
      ) : trainingsData && trainingsData?.length > 0 ? (
        <div className='flex flex-col gap-2'>
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
      ) : (
        <div className='flex  gap-2 justify-center items-start bg-card px-6 py-4 rounded-md'>
          <p className='text-xl my-4 bg-card   w-full'>
            You Didn&lsquo;t Have Training That Day
          </p>
          <div>
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
