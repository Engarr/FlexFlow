'use client';
import React, {  useState } from 'react';
import { Button } from './ui/button';
import { useAuth } from '@clerk/nextjs';
import { toggleExerciseToFavorites } from '@/server/actions/actions';
import { Heart } from 'lucide-react';
import { redirect } from 'next/navigation';

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
  if (!userId) {
    redirect('/');
  }
  const revalidatePathName = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      await toggleExerciseToFavorites(id, userId, revalidatePathName);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {userId && (
        <Button size='sm' onClick={handleClick} disabled={isLoading}>
          {isAdded ? (
            <Heart className='text-red-400 stroke-[3px]' />
          ) : (
            <Heart className='stroke-[3px]' />
          )}
        </Button>
      )}
    </>
  );
};

export default ToggleFavoriteExerciseBtn;
