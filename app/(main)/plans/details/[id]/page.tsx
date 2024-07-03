import  { Suspense } from 'react';

import { fetchPlanById } from '@/server/get-db-data-functions';
import DetailContainer from '@/components/detail-container';
import LoaderComponent from '@/components/loader-component';
import ErrorComponent from '@/components/error-component';

async function PlanDetails({ planId }: { planId: string }) {
  const details = await fetchPlanById(planId);

  if (!details) {
    return (
      <div>
        <ErrorComponent message='Failed To Fetch Plan Details' />
      </div>
    );
  }
  return <DetailContainer data={details} title='Plan Detail' />;
}

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <Suspense fallback={<LoaderComponent />}>
      <PlanDetails planId={id} />
    </Suspense>
  );
};

export default Page;
