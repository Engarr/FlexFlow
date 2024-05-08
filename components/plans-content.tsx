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
  title: string;
  info: string;
  href: string;
};

const PlansContent = ({ title, href, info }: PropsType) => {
  return (
    <div className='lg:w-1/2 flex items-center justify-between max-xl:px-3'>
      <Link href={href}>
        <Button>{title}</Button>
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
          <p>{info}</p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PlansContent;
