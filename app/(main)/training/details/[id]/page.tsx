import React, { Suspense } from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import DetailContainer from '@/components/detail-container';
import ErrorComponent from '@/components/error-component';
import LoaderComponent from '@/components/loader-component';
import { fetchTrainingDetails } from '@/server/get-db-data-functions';

const DetailsTrainingBox = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const trainingDetails = await fetchTrainingDetails(id, userId);
  if (!trainingDetails) {
    return <ErrorComponent message='Failed To Fetch Plans' />;
  }

  return (
    <DetailContainer
      data={trainingDetails}
      date={trainingDetails?.date}
      title='Training Name'
      isTraining={true}
    />
  );
};

const TrainingDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { userId } = auth();
  if (!userId) {
    redirect('/');
  }

  return (
    <Suspense fallback={<LoaderComponent />}>
      <DetailsTrainingBox id={id} userId={userId} />
    </Suspense>
  );
};

export default TrainingDetails;
