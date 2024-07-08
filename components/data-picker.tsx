'use client';

import { Dispatch, SetStateAction } from 'react';
import { format } from 'date-fns';
import { CalendarSearch } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type DataPickerPropsType = {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
};
export function DatePicker({ date, setDate }: DataPickerPropsType) {
  return (
    <Popover>
      <span className=''>Training Data:</span>
      <PopoverTrigger asChild>
        <Button
          variant='primaryOutline'
          className={cn(
            'pl-3 text-left font-normal',
            !date && 'text-muted-foreground'
          )}>
          {date ? format(date, 'P') : <span>Pick a date</span>}
          <CalendarSearch className='ml-3 h-4 w-4 opacity-80' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full ' align='center'>
        <Calendar
          selected={date}
          onDayClick={(selectedDate) => {
            const newDate = new Date(selectedDate);
            const currentTime = new Date();
            newDate.setHours(
              currentTime.getHours(),
              currentTime.getMinutes(),
              currentTime.getSeconds()
            );
            setDate(newDate);
          }}
          disabled={(date) =>
            date > new Date() || date < new Date('1900-01-01')
          }
        />
      </PopoverContent>
    </Popover>
  );
}
