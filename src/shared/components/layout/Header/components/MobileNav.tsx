'use client';

import { useEffect, useState } from 'react';

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

import { DESKTOP_NAV_MEDIA_QUERY, type NAVLINKS } from '../constants';
import { isActiveLink } from '../utils';

interface MobileNavProps {
  links: NAVLINKS[];
}
const MobileNav = ({ links }: MobileNavProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    const mediaQuery = window.matchMedia(DESKTOP_NAV_MEDIA_QUERY);

    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    mediaQuery.addEventListener('change', handleViewportChange);

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant={'ghost'} className='flex flex-row items-center gap-1'>
          <Menu size={18} />
          Menu
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

        <nav
          className={'flex flex-col items-center justify-center gap-2 py-6'}
          aria-label='Mobile navigation'
        >
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              onClick={() => setIsOpen(false)}
              className={isActiveLink(pathname, link.href) ? 'underline' : ''}
            >
              {link.title}
            </Link>
          ))}
        </nav>
        <SheetFooter>
          <SheetClose>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
