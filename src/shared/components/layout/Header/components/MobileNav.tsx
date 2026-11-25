'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu, X } from 'lucide-react';
import { VisuallyHidden } from 'radix-ui';

import { cn } from '@/lib/utils';
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
        <Button
          type={'button'}
          variant={'ghost'}
          size={'sm'}
          className={'text-muted-foreground hover:text-foreground min-h-9 gap-2'}
        >
          <Menu className={'size-4'} aria-hidden={true} />
          <span>Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side={'top'}
        className={'border-border gap-0 overflow-y-auto data-[side=top]:max-h-[75dvh]'}
        showCloseButton={false}
      >
        <SheetHeader
          className={'border-border flex-row items-center justify-between border-b px-6 py-4'}
        >
          <SheetTitle className={'text-foreground text-sm font-semibold'}>Navigation</SheetTitle>
          <VisuallyHidden.Root>
            <SheetDescription>Choose a page to navigate to</SheetDescription>
          </VisuallyHidden.Root>
          <SheetClose asChild>
            <Button
              type={'button'}
              variant={'ghost'}
              size={'icon-sm'}
              aria-label={'Close menu'}
              className={'text-muted-foreground hover:text-foreground'}
            >
              <X className={'size-4'} aria-hidden={true} />
            </Button>
          </SheetClose>
        </SheetHeader>

        <nav aria-label={'Mobile'} className={'px-6 py-4'}>
          <ul className={'flex flex-col gap-1'}>
            {links.map((link) => {
              const isActive = isActiveLink(pathname, link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'relative flex min-h-11 items-center rounded-sm py-2 ps-3 pe-2 text-base font-medium transition-colors',
                      'text-muted-foreground hover:text-foreground',
                      'focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2',
                      'motion-reduce:transition-none',
                      'before:pointer-events-none before:absolute before:inset-y-2.5 before:start-0 before:border-s-2 before:border-transparent before:transition-colors motion-reduce:before:transition-none',
                      'hover:before:border-muted-foreground/40',
                      'aria-[current=page]:text-foreground aria-[current=page]:font-semibold',
                      'aria-[current=page]:before:border-foreground forced-colors:aria-[current=page]:before:border-current'
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <SheetFooter className={'border-border border-t px-6 py-4'}>
          <SheetClose asChild>
            <Button type={'button'} variant={'outline'} className={'min-h-10 w-full'}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
