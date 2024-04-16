import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Link from 'next/link';
import { ImageIcon, Plus, Info } from 'lucide-react';
import Image from 'next/image';

type Props = {
  exerciseName: string;
  pathname: string;
  link: string;
  imageUrl: string;
};

const ExercisesListItem = ({
  exerciseName,
  pathname,
  link,
  imageUrl,
}: Props) => {
  return (
    <div
      key={exerciseName}
      className='bg-zinc-700 px-2 py-3 flex justify-between items-start max-sm:gap-2 max-sm:flex-col'>
      <div>
        <Link href={pathname + '/' + link}>
          <Button size='lg' className='max-md:h-10 max-md:px-3'>
            <p>{exerciseName}</p>
          </Button>
        </Link>
      </div>
      <div className='flex gap-2'>
        <Popover>
          <PopoverTrigger>
            <Button size='sm' asChild className=' '>
              <div>
                <ImageIcon className='w-[20px]' />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='bg-transparent border-none shadow-none'>
            <div className='relative w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] rounded-md overflow-hidden'>
              <Image
                src={imageUrl}
                alt={exerciseName}
                fill
                sizes='(max-width: 768px) 100vw, 33vw'
                placeholder='blur'
                blurDataURL='data:image/svg+xml;base64,...'
                className='rounded-md shadow-2xl object-cover'
              />
            </div>
          </PopoverContent>
        </Popover>
        <Button size='sm' className=' '>
          <div>
            <Plus />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ExercisesListItem;
