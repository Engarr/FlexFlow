import { Button } from '@/components/ui/button';
import { FilePenLine, Info, Play } from 'lucide-react';
import Link from 'next/link';

import { DeletBtn } from './delete-btn';

type UserPlanBar = {
  planName: string;
  planId?: string;
  trainingId?: string;
  userId?: string;
  isAppPlan?: string;
  day?: string;
};

export const PlanBar = ({
  planName,
  planId,
  trainingId,
  userId,
  isAppPlan,
  day,
}: UserPlanBar) => {
  const detailsLink = trainingId
    ? `/training/details/${trainingId}`
    : `/plans/details/${planId}`;

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
              userId={userId}
              trainingId={trainingId}
              planId={planId}
              day={day}
            />
          )}
        </div>
      </div>
    </>
  );
};
