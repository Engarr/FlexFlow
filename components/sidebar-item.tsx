'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  label: string;
  iconSrc: string;
  href: string;
  mobileNavHandler?: (newOpen: boolean) => void;
};
export const SidebarItem = ({
  label,
  iconSrc,
  href,
  mobileNavHandler,
}: Props) => {
  const pathname = usePathname();
  const pathnameElements = pathname.split('/');
  const active = '/' + pathnameElements[1].toString() === href;

  return (
    <Button
      variant={active ? 'sidebarActive' : 'default'}
      className='justify-start h-[52px] w-full '
      asChild
      onClick={() => mobileNavHandler && mobileNavHandler(false)}>
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          className='mr-5 '
          height={32}
          width={32}
        />
        {label}
      </Link>
    </Button>
  );
};
