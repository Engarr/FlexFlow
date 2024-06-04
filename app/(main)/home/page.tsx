'use client';

import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  formatDateTime,
  formattingToTheDisplayedDate,
} from '@/utils/date-transform';
import SectionTitle from '@/components/section-title';

import TrainingHistoryBox from '@/components/training-history-box';
import ErrorComponent from '@/components/error-component';
import { useTrainingsHistory } from '../../../lib/use-trainings-history';



const Page = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const displayData = date && formattingToTheDisplayedDate(date);
  const newDate = formatDateTime(date);
  const day = newDate.date;

  const { trainingsData, isLoading, error } = useTrainingsHistory(day);

  if (error) {
    return <ErrorComponent message='Failed to fetch data' />;
  }

  return (
    <div className=''>
      <div className='flex gap-10 flex-col sm:flex-row max-xl:px-2 rounded-md dark:border-gray-200/25 border-2 px-2 py-4 '>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          className=''
        />

        <div className='w-full mb-6'>
          <SectionTitle>Training History:</SectionTitle>
          {date && (
            <p className='mb-2'>
              Selected Date:{' '}
              <span className='text-text-secondary'>{displayData}</span>
            </p>
          )}

          <TrainingHistoryBox
            isLoading={isLoading}
            trainingsData={trainingsData}
            day={day}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
