'use client';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import ConfirmPopup from './confirm-popup';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { deletePlan, deleteTrainingHistory } from '@/server/actions/actions';
import { useSWRConfig } from 'swr';
import { toast } from './ui/use-toast';

type DeletBtnProps = {
  trainingId?: string;
  userId?: string;
  planId?: string;
  day?: string;
};

export const DeletBtn = ({
  trainingId,
  userId,
  planId,
  day,
}: DeletBtnProps) => {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const removePlan = async () => {
    if (userId) {
      let action = null;

      if (trainingId) {
        action = deleteTrainingHistory(userId, trainingId);
      } else if (planId) {
        action = deletePlan(userId, planId);
      }

      const res = await action;

      if (res?.success) {
        toast({
          title: 'Success!',
          description: res.success,
        });
        if (trainingId) {
          mutate(day);
        }
      }
      if (res?.error) {
        toast({
          title: 'Error',
          description: res.error,
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <Popover onOpenChange={setPopoverIsOpen} open={popoverIsOpen}>
      <PopoverTrigger>
        <Button size='sm' variant='danger' asChild>
          <div>
            <Trash2 size='20px' />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className=' border-slate-100/50 shadow-none'>
        <ConfirmPopup
          message='Are you sure you want to delete the plan?'
          confirmFunction={removePlan}
          setPopoverIsOpen={setPopoverIsOpen}
        />
      </PopoverContent>
    </Popover>
  );
};
