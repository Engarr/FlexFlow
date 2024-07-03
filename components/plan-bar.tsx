'use client';
import { Button } from '@/components/ui/button';
import { FilePenLine, Info, Play, Trash } from 'lucide-react';
import Link from 'next/link';

import { DeletBtn } from './delete-btn';
import { useRemove } from '@/utils/remove-plan-handler';


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
  const { removeHandler } = useRemove();
  const detailsLink = trainingId
    ? `/training/details/${trainingId}`
    : `/plans/details/${planId}`;
  const editLink = trainingId
    ? `/training/edit-training/${trainingId}`
    : `/plans/yours-training-plans/edit/${planId}`;
  const startButtonLink = trainingId ? '' : `/start-training/${planId}`;

  const handleRemove = async () => {
    await removeHandler({ trainingId, userId, planId });
  };
  const isDisabled = trainingId ? true : false;

  return (
    <div className='bg-card p-3 rounded-md flex lg:justify-between max-lg:flex-col items-center max-lg:gap-2 shadow-lg'>
      <div>
        <p className=' lg:text-xl'>{planName}</p>
      </div>
      <div className='flex gap-2 '>
        <Link href={startButtonLink}>
          <Button
            size='sm'
            variant='primary'
            tabIndex={-1}
            disabled={isDisabled}>
            <div>
              <Play size='20px' />
            </div>
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
          <DeletBtn removeHandler={handleRemove}>
            <div>
              <Trash size='20px' />
            </div>
          </DeletBtn>
        )}
      </div>
    </div>
  );
};
