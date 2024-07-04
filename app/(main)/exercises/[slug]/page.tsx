import React, { Suspense } from 'react';
import { Metadata } from 'next';

import { auth } from '@clerk/nextjs/server';

import SectionTitle from '@/components/section-title';
import AccordionWrapper from '@/components/accordion-wrapper';
import LoaderComponent from '@/components/loader-component';
import ErrorComponent from '@/components/error-component';
import {
  getCategoryByName,
  getCategoryExerciseList,
} from '@/server/get-db-data-functions';

import ExercisesListItem from './exercises-list-item';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const convertedSlug = slug
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return {
    title: `Flex-Flow - ${convertedSlug}`,
    description: ``,
  };
}

const ExercisesList = async ({ slug }: { slug: string }) => {
  const { userId } = auth();
  
  if (!userId) {
    return;
  }
  const exercisesArr = await getCategoryExerciseList(slug);

  if (!exercisesArr) {
    return (
      <ErrorComponent
        message='Failed to fetch data'
        wrapperStyle='left-0 -translate-x-0 items-start'
      />
    );
  }
  return (
    <>
      {exercisesArr.map((e) => (
        <React.Fragment key={e.exerciseName}>
          <ExercisesListItem
            exerciseName={e.exerciseName}
            imageUrl={e.imageUrl}
            link={e.link}
            id={e.id}
          />
        </React.Fragment>
      ))}
    </>
  );
};
const ExercisesDescription = async ({ slug }: { slug: string }) => {
  const category = await getCategoryByName(slug);

  if (!category) {
    return (
      <ErrorComponent
        message='Failed to fetch data'
        wrapperStyle='left-0 -translate-x-0 items-start'
      />
    );
  }
  return (
    <>
      <AccordionWrapper title='Description'>
        {category.description === undefined ? (
          <p>No description available</p>
        ) : (
          <p className=''>{category?.description}</p>
        )}
      </AccordionWrapper>
    </>
  );
};

const ExerciseCategory = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const convertedSlug = slug
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <section>
      <Suspense fallback={<LoaderComponent />}>
        <SectionTitle>{convertedSlug} Muscles</SectionTitle>
        <ExercisesDescription slug={slug} />

        <SectionTitle element='p' style='my-4'>
          Exercises List:
        </SectionTitle>
        <div className='flex flex-col gap-3 px-2 xl:px-0 '>
          <ExercisesList slug={slug} />
        </div>
      </Suspense>
    </section>
  );
};

export default ExerciseCategory;
