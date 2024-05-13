import React, { Dispatch, SetStateAction } from 'react';

import { Button } from './ui/button';

type ConfirmPopupProps = {
  setPopoverIsOpen: Dispatch<SetStateAction<boolean>>;
  confirmFunction: () => Promise<void>;
  message: string;
};

const ConfirmPopup = ({
  setPopoverIsOpen,

  confirmFunction,
  message,
}: ConfirmPopupProps) => {
  return (
    <div className='flex items-center justify-center flex-col gap-2'>
      <p className='text-center'>{message}</p>
      <div className='flex gap-3'>
        <Button onClick={confirmFunction} variant='danger'>
          Yes
        </Button>
        <Button onClick={() => setPopoverIsOpen(false)}>No</Button>
      </div>
    </div>
  );
};
export default ConfirmPopup;
