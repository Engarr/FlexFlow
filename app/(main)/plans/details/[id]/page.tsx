'use client';
import React from 'react';
import { UseQueryResult, useQuery } from 'react-query';
import { fetchPlan } from '@/db/plans-functions';
import { PlanDataType } from '@/types/type';

import ErrorComponent from '@/components/error-component';
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import DetailContainer from '@/components/detail-container';

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { userId } = useAuth();
  if (!userId) {
    redirect('/');
  }

  const { data, isLoading, isError }: UseQueryResult<PlanDataType> = useQuery(
    ['plan', id],
    () => fetchPlan({ planId: id.toString() })
  );
  if (isError) {
    return <ErrorComponent message='Failed fetch data' />;
  }
  if (data) {
    console.log(data);
  }

  return (
    <DetailContainer
      data={data}
      isLoading={isLoading}
      title='Plan Detail'
      
    />
  );
};

export default Page;
