'use client';
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { formatDateTime } from '@/utils/date-transform';

const Page = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const newDate = formatDateTime(date);
  console.log(newDate);

  return (
    <div className=''>
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        className='rounded-md border'
      />
    </div>
  );
};

export default Page;
