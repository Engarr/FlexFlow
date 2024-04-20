import SectionTitle from '@/components/section-title';
import { Button } from '@/components/ui/button';
import React from 'react';

const Page = () => {
  return (
    <div>
      <div className='flex w-full justify-between items-center'>
        <SectionTitle>Yours Training Plans</SectionTitle>
        <Button>Add New Plan</Button>
      </div>
    </div>
  );
};

export default Page;
