import { cn } from '@/lib/utils';
import React from 'react';

type ErrorMessageType = {
  message: string;
  style?: string;
};

const ErrorMessage = ({ message, style }: ErrorMessageType) => {
  return (
    <p className={cn('text-xs text-red-500 w-full text-center mt-5', style)}>
      {message}
    </p>
  );
};

export default ErrorMessage;
