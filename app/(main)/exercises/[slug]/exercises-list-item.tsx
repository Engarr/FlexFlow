import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Link from 'next/link';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Suspense } from 'react';
import LoaderComponent from '@/components/loader-component';
import ToggleFavoriteExerciseBtn from '@/components/toggle-favorite-exercise-btn';

type Props = {
  exerciseName: string;
  link: string;
  imageUrl: string;
  id: string;
};

const ExercisesListItem = ({ exerciseName, link, imageUrl, id }: Props) => {
  return (
    <div className='bg-card shadow-lg rounded-xl px-3 py-4 flex justify-between max-sm:gap-2 max-sm:flex-col items-center last-of-type:mb-6'>
      <div>
        <Link href={`/exercise/${link}`}>
          <Button size='lg' className='max-md:h-10 max-md:px-3'>
            <p>{exerciseName}</p>
          </Button>
        </Link>
      </div>
      <div className='flex gap-2'>
        <Popover>
          <PopoverTrigger>
            <Button size='sm' asChild>
              <div>
                <ImageIcon className='w-[20px]' />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className='bg-transparent border-none shadow-none '
            align='end'>
            <Suspense fallback={<LoaderComponent />}>
              <div className='relative w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] rounded-md overflow-hidden text-black'>
                <Image
                  src={imageUrl}
                  alt={exerciseName}
                  fill
                  placeholder='blur'
                  blurDataURL='data:image/svg+xml;base64,...'
                  className='rounded-md shadow-2xl object-cover bg-white'
                />
              </div>
            </Suspense>
          </PopoverContent>
        </Popover>
        <ToggleFavoriteExerciseBtn id={id} />
      </div>
    </div>
  );
};

export default ExercisesListItem;
