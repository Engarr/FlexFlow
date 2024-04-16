import AccordionWrapper from '@/components/accordion-wrapper';
import SectionTitle from '@/components/section-title';
import { Button } from '@/components/ui/button';
import { exercises } from '@/lib/app-data';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Exercise = ({ params }: { params: { exercise: string } }) => {
  const exercise = params.exercise;
  const convertedExercise = exercise
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
  const musclesExercises = exercises.find((e) => e.link === exercise);

  return (
    <section>
      <div className='flex  gap-2 justify-start max-lg:px-2'>
        <SectionTitle>{convertedExercise} Exercise</SectionTitle>
        <Button size='sm' className=' '>
          <div>
            <Plus />
          </div>
        </Button>
      </div>
      <AccordionWrapper title='Photos' style='flex items-center justify-center'>
        {musclesExercises && (
          <div className='relative w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] rounded-md overflow-hidden  '>
            <Image
              src={musclesExercises?.imageUrl}
              alt={musclesExercises?.exerciseName}
              fill
              sizes='(max-width: 768px) 100vw, 33vw'
              placeholder='blur'
              blurDataURL='data:image/svg+xml;base64,...'
              className='rounded-md shadow-2xl object-cover'
            />
          </div>
        )}
      </AccordionWrapper>
      <AccordionWrapper title='Video'>
        {musclesExercises &&
          musclesExercises.videoUrl.map((v, i) => (
            <div
              key={i}
              className='w-full relative  shadow-xl h-[300px] overflow-hidden rounded-md mb-2'>
              <iframe
                width='100%'
                height='100%'
                src={v}
                allowFullScreen
                className='bg-black '
                loading='lazy'
              />
            </div>
          ))}
      </AccordionWrapper>
    </section>
  );
};

export default Exercise;
