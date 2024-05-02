'use client';
import { Button } from '@/components/ui/button';
import { QUERY_KEY_PLANS, deletePlan } from '@/db/plans-functions';
import { Pencil, Play, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQueryClient, useMutation } from 'react-query';
import { toast } from './ui/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Dispatch, SetStateAction, useState } from 'react';

type UserPlanBar = {
  planName: string;
  planId?: string;
  userId?: string;
};

export const PlanBar = ({ planName, planId, userId }: UserPlanBar) => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  const { mutateAsync } = useMutation(
    ({ planId, userId }: { planId: string; userId: string }) =>
      deletePlan({ planId, userId }),
    {
      onSuccess: () => queryClient.invalidateQueries(QUERY_KEY_PLANS),
    }
  );

  const removePlan = async () => {
    if (planId && userId) {
      const res = await mutateAsync({ planId, userId });

      if (res.status === 200) {
        toast({
          title: `${res.title}`,
          description: `${res.message}`,
        });
      } else if (res.status !== 200) {
        toast({
          title: `${res.title}`,
          description: `${res.message}`,
          variant: 'destructive',
        });
      }
    }
  };
  return (
    <>
      <div className='bg-neutral-700 p-3 rounded-md flex lg:justify-between max-lg:flex-col items-center max-lg:gap-2'>
        <div>
          <p className=' lg:text-xl'>{planName}</p>
        </div>
        <div className='flex gap-2'>
          <Link href='/'>
            <Button size='sm' variant='primary' tabIndex={-1}>
              <Play size='20px' />
            </Button>
          </Link>
          {planId && (
            <Link href={`${pathname}/eddit/${planId}`}>
              <Button size='sm' tabIndex={-1}>
                <Pencil size='20px' />
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
        <div className='flex items-center justify-center flex-col gap-2'>
          <p className='text-center'>
            Are you sure you want to delete the plan?
          </p>
          <div className='flex gap-3'>
            <Button onClick={removePlan} variant='danger'>
              Yes
            </Button>
            <Button onClick={() => setPopoverIsOpen(false)}>No</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
