'use client';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
type PropsType = {
  message: string;
};

const NotFound = ({ message }: PropsType) => {
  return (
    <div className='items-center flex flex-col'>
      <p className='text-2xl mb-2'>{message}</p>
      <Button asChild>
        <Link href='/home'>Back Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
