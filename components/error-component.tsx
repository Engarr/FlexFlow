'use client';

import React from 'react';

import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type PropsType = {
  message: string;
  style?: string;
  wrapperStyle?: string;
};

const ErrorComponent = ({ message, style, wrapperStyle }: PropsType) => {
  return (
    <div
      className={cn(
        'h-full w-full left-1/2 -translate-x-1/2 relative  flex items-center justify-center flex-col gap-3',
        wrapperStyle
      )}>
      <p className={cn('text-2xl', style)}>{message}</p>
      <Button onClick={() => window.location.reload()} variant='danger'>
        Try again!
      </Button>
    </div>
  );
};

export default ErrorComponent;
