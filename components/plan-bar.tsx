'use client';
import { Button } from '@/components/ui/button';
import { FilePenLine, Info, Play, Trash } from 'lucide-react';
import Link from 'next/link';

import { DeletBtn } from './delete-btn';
import { removePlan } from '@/lib/remove-plan-handler';

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
  const detailsLink = trainingId
    ? `/training/details/${trainingId}`
    : `/plans/details/${planId}`;
  const editLink = trainingId
    ? `/training/edit-training/${trainingId}`
    : `/plans/yours-training-plans/edit/${planId}`;

  const handleRemovePlan = async () => {
    await removePlan({ trainingId, userId, planId });
  };

  return (
    <div className='bg-card p-3 rounded-md flex lg:justify-between max-lg:flex-col items-center max-lg:gap-2 shadow-lg'>
      <div>
        <p className=' lg:text-xl'>{planName}</p>
      </div>
      <div className='flex gap-2 '>
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
          <Link href={editLink}>
            <Button size='sm' tabIndex={-1}>
              <FilePenLine size='20px' />
            </Button>
          </Link>
        )}
        {userId && (
          <DeletBtn removeHandler={handleRemovePlan}>
            <div>
              <Trash size='20px' />
            </div>
          </DeletBtn>
        )}
      </div>
    </div>
  );
};
