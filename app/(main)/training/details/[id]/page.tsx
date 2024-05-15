'use client';
import React from 'react';
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { UseQueryResult, useQuery } from 'react-query';
import { TrainingDataType } from '@/types/type';
import { fetchTrainingDetails } from '@/db/plans-functions';
import DetailContainer from '@/components/detail-container';

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
  if (data) {
    console.log(data);
  }
  return (
    <DetailContainer
      data={data}
      isLoading={isLoading}
      title='Training Detail'
      isTraining={true}
    />
  );
};

export default TrainingDetails;
