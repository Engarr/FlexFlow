import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Info } from 'lucide-react';
import Link from 'next/link';

type PropsType = {
  data: { title: string; info: string; href: string }[];
};

const PlansContent = ({ data }: PropsType) => {
  return (
    <div className='flex flex-col gap-3 mt-6'>
      {data.map((option, i) => (
        <div
          className='lg:w-1/2 flex items-center justify-between max-xl:px-3'
          key={i}>
          <Link href={option.href}>
            <Button>{option.title}</Button>
          </Link>
          <Popover>
            <PopoverTrigger>
              <Button size='sm' asChild className=' '>
                <div>
                  <Info className='w-[20px]' />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className=' border-slate-100/50 shadow-none'>
              <p>{option.info}</p>
            </PopoverContent>
          </Popover>
        </div>
      ))}
    </div>
  );
};

export default PlansContent;
