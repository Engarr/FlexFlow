'use client';

import React from 'react';
import SectionTitle from '@/components/section-title';
import { categoryDescriptions, exercises } from '@/lib/app-data';
import { Loader } from 'lucide-react';
import { usePathname } from 'next/navigation';
import AccordionWrapper from '@/components/accordion-wrapper';
import ExercisesListItem from './exercises-list-item';

const ExerciseCategory = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const pathname = usePathname();

  const convertedSlug = slug
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
  const musclesData = categoryDescriptions.find((m) => m.category === slug);
  const musclesExercises = exercises.filter((e) => e.category === slug);

  return (
    <section>
      <SectionTitle>{convertedSlug} Muscles</SectionTitle>
      <AccordionWrapper title='Description'>
        {!musclesData ? (
          <div className='w-full justify-center items-center flex'>
            <Loader className='animate-spin' />
          </div>
        ) : musclesData === undefined ? (
          <p>No description available</p>
        ) : (
          <p className=''>{musclesData?.description}</p>
        )}
      </AccordionWrapper>

      <SectionTitle element='p' style='my-4'>
        Exercises List:
      </SectionTitle>
      <div className='flex flex-col gap-3 px-2 xl:px-0 '>
        {Array.isArray(musclesExercises) &&
          musclesExercises.map((e) => (
            <React.Fragment key={e.exerciseName}>
              <ExercisesListItem
                exerciseName={e.exerciseName}
                imageUrl={e.imageUrl}
                pathname={pathname}
                link={e.link}
              />
            </React.Fragment>
          ))}
      </div>
    </section>
  );
};

export default ExerciseCategory;
