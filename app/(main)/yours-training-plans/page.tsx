'use client';
import React from 'react';
import SectionTitle from '@/components/section-title';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Page = () => {
  const pathname = usePathname();
  return (
    <div>
      <div className='flex w-full justify-between items-center'>
        <SectionTitle>Yours Training Plans</SectionTitle>
        <Button>
          <Link href={`${pathname}/add-new`}>Add New Plan</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
