'use client';

import useStore from '@/context/store';

import { Calendar } from '@/components/ui/calendar';
import { formattingToTheDisplayedDate } from '@/utils/date-transform';
import SectionTitle from '@/components/section-title';

import TrainingHistoryBox from '@/components/training-history-box';
import ErrorComponent from '@/components/error-component';

import { useTrainingsHistory } from '@/lib/use-trainings-history';

const HistoryWrapper = () => {
  const { selectedDate, actualDay, changeDay } = useStore();
  const { trainingsData, isLoading, error } = useTrainingsHistory(
    actualDay.date
  );

  const displayData =
    selectedDate && formattingToTheDisplayedDate(selectedDate);

  if (error) {
    return <ErrorComponent message='Failed to fetch data' />;
  }
  return (
    <div className='flex gap-10 flex-col sm:flex-row  rounded-md dark:border-gray-200/25 border-2 px-2 py-4  max-2xl:mx-2'>
      <Calendar
        onDayClick={(day) => changeDay(day)}
        mode='single'
        selected={selectedDate}
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
