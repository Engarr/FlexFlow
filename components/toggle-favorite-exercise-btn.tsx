'use client';

import { Heart, Loader } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

import { useMutation } from '@tanstack/react-query';
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { UserInfoType } from '@/types/type';
import { fetchUserInfo } from '@/server/db/fetch-from-api-functions';
import { useFavoriteExerciseToggle } from '@/utils/toggle-to-favorites-exercise-handler';

import { Button } from './ui/button';

type ToggleFavoriteExerciseBtnType = {
  id: string;
};

const ToggleFavoriteExerciseBtn = ({ id }: ToggleFavoriteExerciseBtnType) => {
  const { userId } = useAuth();
  if (!userId) {
    redirect('/');
  }
  let isAdded = false;
  const { toggleToFavoritesHandler } = useFavoriteExerciseToggle();

  const queryOptions: UseQueryOptions<any, Error> = {
    queryKey: ['favorites'],
    queryFn: () => fetchUserInfo(userId),
  };

  const {
    data: userInfo,
    isError,
  }: UseQueryResult<UserInfoType> = useQuery(queryOptions);

  const { mutate, isPending } = useMutation({
    mutationFn: () => toggleToFavoritesHandler({ exerciseId: id, userId }),
  });
  if (userInfo) {
    isAdded = userInfo.favorites.some((f) => f === id);
  }

  if (isError) {
    return (
      <Button size='sm' disabled>
        <Heart className='stroke-[3px]' />
      </Button>
    );
  }
  const btnCtx = isPending ? (
    <Loader className='animate-spin ' />
  ) : isAdded ? (
    <Heart className='text-red-400 stroke-[3px]' />
  ) : (
    <Heart className='stroke-[3px]' />
  );

  return (
    <>
      {userId && (
        <Button size='sm' onClick={() => mutate()} disabled={isPending}>
          {btnCtx}
        </Button>
      )}
    </>
  );
};

export default ToggleFavoriteExerciseBtn;
