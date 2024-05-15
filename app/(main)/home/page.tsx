'use client';
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { formatDateTime } from '@/utils/date-transform';
import SectionTitle from '@/components/section-title';
import { formattingToTheDisplayedDate } from './_utils';
import { UseQueryResult, useQuery } from 'react-query';
import { TrainingDataType } from '@/types/type';
import { fetchTrainingsHistoryByDate } from '@/db/plans-functions';
import TrainingHistoryBox from '@/components/training-history-box';

const Page = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const displayData = date && formattingToTheDisplayedDate(date);
  const newDate = formatDateTime(date);

  const {
    data: trainingsData,
    isLoading,
    isError,
  }: UseQueryResult<TrainingDataType[]> = useQuery(
    ['date', newDate],
    () => fetchTrainingsHistoryByDate({ date: newDate.date }),
    {
      refetchOnMount: true,
    }
  );

  return (
    <div className=''>
      <div className='flex gap-10 flex-col sm:flex-row max-xl:px-2'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          className='rounded-md dark:border-gray-200/25 border-2'
        />
        <div className='w-full mb-6'>
          <SectionTitle>Training History:</SectionTitle>
          <p className='mb-2'>
            Selected Date:{' '}
            <span className='text-text-secondary'>{displayData}</span>
          </p>
          <TrainingHistoryBox
            isLoading={isLoading}
            trainingsData={trainingsData}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
