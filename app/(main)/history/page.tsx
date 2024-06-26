import React, { Suspense } from 'react';

import HistoryWrapper from '@/components/history-wrapper';
import LoaderComponent from '@/components/loader-component';
import SectionTitle from '@/components/section-title';

const HistoryPage = () => {
  return (
    <>
      <SectionTitle>Your Training History Page</SectionTitle>
      <Suspense fallback={<LoaderComponent />}>
        <HistoryWrapper />
      </Suspense>
    </>
  );
};

export default HistoryPage;
