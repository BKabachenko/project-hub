'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu } from 'lucide-react';

import { getAuthSession } from '@/lib/session';
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

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  const session = true;

  const listOfLinks = LINKS.filter(({ visibility }) =>
    session ? visibility !== 'guest' : visibility !== 'private'
  );
  return (
    <nav className={'flex cursor-pointer justify-center md:hidden'}>
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(prev => !prev)}>
        <SheetTrigger>
          <div className='flex flex-row items-center gap-1'>
            <Menu size={18} />
            Menu
          </div>
        </SheetTrigger>

        <SheetContent
          side={'top'}
          className='data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]'
        >
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </SheetHeader>
          <div className={'flex flex-col items-center justify-center gap-3'}>
            {listOfLinks.map((link) => (
              <Link href={link.href} key={link.title} onClick={() => setIsOpen(false)}>
                {link.title}
              </Link>
            ))}
          </div>
          <SheetFooter>
            <SheetClose> Close </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
