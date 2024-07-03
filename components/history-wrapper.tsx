'use client';

import useStore from '@/context/store';
import { Calendar } from '@/components/ui/calendar';
import { formattingToTheDisplayedDate } from '@/utils/date-transform';
import SectionTitle from '@/components/section-title';

import TrainingHistoryBox from '@/components/training-history-box';
import ErrorComponent from '@/components/error-component';

import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { TrainingDataType } from '@/types/type';
import { fetchTrainingsHistory } from '@/server/fetch-from-api-functions';



const HistoryWrapper = () => {
  const { selectedDate, actualDay, changeDay } = useStore();

  const queryOptions: UseQueryOptions<any, Error> = {
    queryKey: ['trainingsHistory', actualDay.date],
    queryFn: () => fetchTrainingsHistory(actualDay.date),
  };

  const {
    data: trainingsData,
    isLoading,
    isError,
  }: UseQueryResult<TrainingDataType[], Error> = useQuery(queryOptions);

  const displayData =
    selectedDate && formattingToTheDisplayedDate(selectedDate);


    
  if (isError) {
    return <ErrorComponent message='Failed to fetch data' />;
  }


  return (
    <div className='flex gap-10 flex-col sm:flex-row  rounded-md dark:border-gray-200/25 border-2 px-2 py-4  max-2xl:mx-2'>
      <Calendar
        onDayClick={(day) => changeDay(day)}
        mode='single'
        selected={selectedDate}
        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
      />

      <div className='w-full mb-6'>
        <SectionTitle>Training History:</SectionTitle>
        {selectedDate && (
          <p className='mb-2'>
            Selected Date:{' '}
            <span className='text-text-secondary'>{displayData}</span>
          </p>
        )}

        <TrainingHistoryBox
          isLoading={isLoading}
          trainingsData={trainingsData}
        />
      </div>
    </div>
  );
};

export default HistoryWrapper;


// export const fetchTrainingsHistory = async (day: string) => {
//   const response = await fetch(`/api/training-history?date=${day}`, {
//     cache: 'no-cache',
//   });
//   if (!response.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   return response.json();
// };