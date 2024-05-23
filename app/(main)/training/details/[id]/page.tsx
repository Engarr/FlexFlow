'use client';
import React from 'react';
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { UseQueryResult, useQuery } from 'react-query';
import { TrainingDataType } from '@/types/type';
import { fetchTrainingDetails } from '@/db/plans-functions';
import DetailContainer from '@/components/detail-container';
import NotFound from '@/components/not-found';
import ErrorComponent from '@/components/error-component';

const TrainingDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { userId } = useAuth();
  if (!userId) {
    redirect('/');
  }
  const { data, isLoading, isError }: UseQueryResult<TrainingDataType> =
    useQuery([id, userId], () =>
      fetchTrainingDetails({ trainingId: id.toString(), userId: userId })
    );
  if (isError) {
    return <ErrorComponent message='Failed fetch data' />;
  }
  if (!data && !isLoading) {
    return <NotFound message='Plan Not Found' />;
  }
  return (
    <DetailContainer
      data={data}
      date={data?.date}
      isLoading={isLoading}
      title='Training Name'
      isTraining={true}
    />
  );
};

export default TrainingDetails;
