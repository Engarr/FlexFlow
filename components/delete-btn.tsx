'use client';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import ConfirmPopup from './confirm-popup';
import { Button } from './ui/button';

type DeletBtnProps = {
  children: React.ReactNode;
  removeHandler: () => Promise<void>;
  btnStyle?: string;
};

export const DeletBtn = ({
  removeHandler,
  children,
  btnStyle,
}: DeletBtnProps) => {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  return (
    <Popover onOpenChange={setPopoverIsOpen} open={popoverIsOpen}>
      <PopoverTrigger>
        <Button
          asChild
          size='sm'
          variant='danger'
          className={cn('', btnStyle)}
          type='button'>
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent className=' border-slate-100/50 shadow-none'>
        <ConfirmPopup
          message='Are you sure you want to delete the plan?'
          confirmFunction={removeHandler}
          setPopoverIsOpen={setPopoverIsOpen}
        />
      </PopoverContent>
    </Popover>
  );
};
