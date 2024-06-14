import React, { Suspense } from 'react';
import { Metadata } from 'next';

import AccordionWrapper from '@/components/accordion-wrapper';
import LoaderComponent from '@/components/loader-component';
import SectionTitle from '@/components/section-title';
import { Button } from '@/components/ui/button';
import { exercises } from '@/lib/app-data';
import { Plus } from 'lucide-react';
import Image from 'next/image';

type Props = {
  params: { exercise: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exercise = params.exercise;
  const decodedName = decodeURIComponent(exercise);
  const convertedExercise = decodedName;

  return {
    title: `Flex-Flow - ${convertedExercise}`,
    description: `Explore detailed information and resources for the ${convertedExercise} exercise, including photos and videos to help you master the technique.`,
  };
}

const Exercise = ({ params }: Props) => {
  const exercise = params.exercise;
  const decodedName = decodeURIComponent(exercise);
  const convertedExercise = decodedName
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
  const musclesExercises = exercises.find(
    (e) => e.link.toLowerCase() === decodedName.toLowerCase()
  );

  return (
    <section className='pb-10'>
      <Suspense fallback={<LoaderComponent />}>
        <div className='flex  gap-2 justify-start max-lg:px-2'>
          <SectionTitle>{convertedExercise} Exercise</SectionTitle>
          <Button size='sm' className=' '>
            <div>
              <Plus />
            </div>
          </Button>
        </div>
        <AccordionWrapper
          title='Photos'
          style='flex items-center justify-center'>
          {musclesExercises && (
            <div className='relative w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] rounded-md overflow-hidden  '>
              <Image
                src={musclesExercises?.imageUrl}
                alt={musclesExercises?.exerciseName}
                quality={50}
                fill
                placeholder='blur'
                blurDataURL='data:image/svg+xml;base64,...'
                className='rounded-md shadow-2xl object-cover'
              />
            </div>
          )}
        </AccordionWrapper>
        <AccordionWrapper title='Video'>
          <div className='flex gap-2 flex-col sm:flex-row lg:flex-col'>
            {musclesExercises &&
              musclesExercises.videoUrl.map((v, i) => (
                <React.Fragment key={i}>
                  <Suspense fallback={<LoaderComponent />}>
                    <div className='w-full relative  shadow-xl h-[300px] overflow-hidden rounded-md mb-2 '>
                      <iframe
                        width='100%'
                        height='100%'
                        src={v}
                        allowFullScreen
                        className='bg-black '
                        loading='lazy'
                      />
                    </div>
                  </Suspense>
                </React.Fragment>
              ))}
          </div>
        </AccordionWrapper>
      </Suspense>
    </section>
  );
};

export default Exercise;
