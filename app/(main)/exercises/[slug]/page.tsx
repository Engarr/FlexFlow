import React, { Suspense } from 'react';
import SectionTitle from '@/components/section-title';
import AccordionWrapper from '@/components/accordion-wrapper';
import LoaderComponent from '@/components/loader-component';
import { Metadata } from 'next';
import {
  getCategoryByName,
  getCategoryExerciseList,
} from '@/server/get-db-data-functions';
import ErrorComponent from '@/components/error-component';
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
      <SectionTitle>{convertedSlug} Muscles</SectionTitle>
      <Suspense fallback={<LoaderComponent />}>
        <ExercisesDescription slug={slug} />
      </Suspense>

      <SectionTitle element='p' style='my-4'>
        Exercises List:
      </SectionTitle>
      <div className='flex flex-col gap-3 px-2 xl:px-0 '>
        <Suspense fallback={<LoaderComponent />}>
          <ExercisesList slug={slug} />
        </Suspense>
      </div>
    </section>
  );
};

export default ExerciseCategory;
