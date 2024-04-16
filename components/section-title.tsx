import { cn } from '@/lib/utils';
import React from 'react';

type PropsType = {
  children: React.ReactNode;
  style?: string;
  element?: keyof JSX.IntrinsicElements;
};

const SectionTitle = ({ children, style, element = 'h2' }: PropsType) => {
  const Element = element;
  return (
    <Element className={cn('text-3xl font-semibold mb-10 px-2 xl:px-0', style)}>
      {children}
    </Element>
  );
};

export default SectionTitle;