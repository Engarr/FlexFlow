'use client';
import React from 'react';
import { Button } from './ui/button';
import { useAuth } from '@clerk/nextjs';
import { toggleExerciseToFavorites } from '@/server/actions/actions';
import { Heart } from 'lucide-react';

import { usePathname } from 'next/navigation';

type ToggleFavoriteExerciseBtnType = {
  id: string;
  isAdded: boolean;
};

const ToggleFavoriteExerciseBtn = ({
  id,
  isAdded,
}: ToggleFavoriteExerciseBtnType) => {
  const { userId } = useAuth();
  const revalidatePathName = usePathname();

  return (
    <>
      {userId && (
        <Button
          size='sm'
          onClick={async () =>
            await toggleExerciseToFavorites(id, userId, revalidatePathName)
          }>
          {isAdded ? <Heart className='text-red-500 ' /> : <Heart />}
        </Button>
      )}
    </>
  );
};

export default ToggleFavoriteExerciseBtn;
