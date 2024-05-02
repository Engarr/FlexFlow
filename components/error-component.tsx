import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type PropsType = {
  message: string;
  style?: string;
};

const ErrorComponent = ({ message, style }: PropsType) => {
  return (
    <div className='h-full w-full left-1/2 -translate-x-1/2 relative  flex items-center justify-center flex-col gap-3'>
      <p className={cn('text-2xl', style)}>{message}</p>
      <Button onClick={() => window.location.reload()}>Try again!</Button>
    </div>
  );
};

export default ErrorComponent;
