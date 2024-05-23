import React from 'react';
import SectionTitle from '@/components/section-title';
import { categoryDescriptions } from '@/lib/app-data';
import { Loader } from 'lucide-react';
import AccordionWrapper from '@/components/accordion-wrapper';
import ExercisesWrapper from './exercises-wrapper';

const ExerciseCategory = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const convertedSlug = slug
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
  const musclesData = categoryDescriptions.find((m) => m.category === slug);

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
        <ExercisesWrapper slug={slug} />
      </div>
    </section>
  );
};

export default ExerciseCategory;
