import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { toggleExerciseToFavorites } from '@/server/actions/actions';

export const useFavoriteExerciseToggle = () => {
  const queryClient = useQueryClient();

  const toggleToFavoritesHandler = async ({
    exerciseId,
    userId,
  }: {
    exerciseId: string;
    userId: string;
  }) => {
    if (userId) {
      const res = await toggleExerciseToFavorites(exerciseId, userId);

      if (res?.success) {
        toast({
          title: 'Success!',
          description: res.success,
        });

        queryClient.invalidateQueries({
          queryKey: ['favorites'],
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
  return { toggleToFavoritesHandler };
};
