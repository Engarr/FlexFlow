'use client';
import { Button } from '@/components/ui/button';
import { FilePenLine, Info, Play, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from './ui/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Dispatch, SetStateAction, useState } from 'react';
import ConfirmPopup from './confirm-popup';
import { deletePlan } from '@/server/actions/actions';

type UserPlanBar = {
  planName: string;
  planId?: string;
  trainingId?: string;
  userId?: string;
  isAppPlan?: string;
};

export const PlanBar = ({
  planName,
  planId,
  trainingId,
  userId,
  isAppPlan,
}: UserPlanBar) => {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const detailsLink = trainingId
    ? `/training/details/${trainingId}`
    : `/plans/details/${planId}`;

  const removePlan = async () => {
    if (planId && userId) {
      const res = await deletePlan(userId, planId);

      if (res?.success) {
        toast({
          title: 'Success!',
          description: res.success,
        });
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
    <>
      <div className='bg-card p-3 rounded-md flex lg:justify-between max-lg:flex-col items-center max-lg:gap-2 shadow-lg'>
        <div>
          <p className=' lg:text-xl'>{planName}</p>
        </div>
        <div className='flex gap-2'>
          <Link href={`/start-training/${planId}`}>
            <Button size='sm' variant='primary' tabIndex={-1}>
              <Play size='20px' />
            </Button>
          </Link>
          <Link href={detailsLink}>
            <Button size='sm' tabIndex={-1}>
              <Info size='20px' />
            </Button>
          </Link>
          {!isAppPlan && (
            <Link href={`/plans/yours-training-plans/edit/${planId}`}>
              <Button size='sm' tabIndex={-1}>
                <FilePenLine size='20px' />
              </Button>
            </Link>
          )}
          {userId && (
            <DeletBtn
              popoverIsOpen={popoverIsOpen}
              setPopoverIsOpen={setPopoverIsOpen}
              removePlan={removePlan}
            />
          )}
        </div>
      </div>
    </>
  );
};

type DeletBtnProps = {
  setPopoverIsOpen: Dispatch<SetStateAction<boolean>>;
  popoverIsOpen: boolean;
  removePlan: () => Promise<void>;
};

export const DeletBtn = ({
  setPopoverIsOpen,
  popoverIsOpen,
  removePlan,
}: DeletBtnProps) => {
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
