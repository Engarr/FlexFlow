import { deletePlan, deleteTrainingHistory } from '@/server/actions/actions';

import useStore from '@/context/store';
import { mutate } from 'swr';
import { toast } from '@/components/ui/use-toast';

type RemovePlanProps = {
  trainingId?: string;
  userId?: string;
  planId?: string;
};

export const removePlan = async ({
  trainingId,
  userId,
  planId,
}: RemovePlanProps) => {
  const { actualDay } = useStore.getState(); 

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
        mutate(actualDay.date);
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
