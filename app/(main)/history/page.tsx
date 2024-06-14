import React, { Suspense } from 'react';

import HistoryWrapper from '@/components/history-wrapper';
import LoaderComponent from '@/components/loader-component';

const HistoryPage = () => {
  return (
    <Suspense fallback={<LoaderComponent />}>
      <HistoryWrapper />
    </Suspense>
  );
};

export default HistoryPage;
