import React, { Suspense } from 'react';

import HistoryWrapper from '@/components/history-wrapper';
import LoaderComponent from '@/components/loader-component';

const Page = () => {
  return (
    <>
      <Suspense fallback={<LoaderComponent />}>
        <HistoryWrapper />
      </Suspense>
    </>
  );
};

export default Page;
