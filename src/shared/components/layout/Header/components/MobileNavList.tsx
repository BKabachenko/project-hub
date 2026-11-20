'use client';

import { useState } from 'react';

import type { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu } from 'lucide-react';
import { VisuallyHidden } from 'radix-ui';

import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';

import { LINKS } from '../constants';

interface MobileNavListProps {
  session: Session | null;
}

const MobileNavList = ({ session }: MobileNavListProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  const listOfLinks = LINKS.filter(({ visibility }) =>
    session ? visibility !== 'guest' : visibility !== 'private'
  );
  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <SheetTrigger>
        <Button asChild variant={'ghost'}>
          <div className='flex flex-row items-center gap-1'>
            <Menu size={18} />
            Menu
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent
        side={'top'}
        className='data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]'
        showCloseButton={false}
      >
        <VisuallyHidden.Root asChild>
          <SheetHeader>
            <SheetTitle>Navigation menu</SheetTitle>
            <SheetDescription>Chose link to page</SheetDescription>
          </SheetHeader>
        </VisuallyHidden.Root>
        <div className={'flex flex-col items-center justify-center gap-2 py-6'}>
          {listOfLinks.map((link) => (
            <Link href={link.href} key={link.title} onClick={() => setIsOpen(false)}>
              {link.title}
            </Link>
          ))}
        </div>
        <SheetFooter>
          <SheetClose>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavList;
