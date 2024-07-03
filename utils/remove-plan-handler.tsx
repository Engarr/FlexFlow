import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { deletePlan, deleteTrainingHistory } from '@/server/actions/actions';

type RemovePlanProps = {
  trainingId?: string;
  userId?: string;
  planId?: string;
};

export const useRemove = () => {
  const queryClient = useQueryClient();

  const removeHandler = async ({
    trainingId,
    userId,
    planId,
  }: RemovePlanProps) => {
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
          queryClient.invalidateQueries({
            queryKey: ['trainingsHistory'],
          });
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

  return { removeHandler };
};
