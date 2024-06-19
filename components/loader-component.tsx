import React from 'react';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

type LoaderProps = {
  style?: string;
  size?: string;
};

const LoaderComponent = ({ style, size = '50px' }: LoaderProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center left-1/2 -translate-x-1/2 relative mb-10 ',
        style
      )}>
      <Loader className='animate-spin text-lime-500' size={size} />
    </div>
  );
};

export default LoaderComponent;
