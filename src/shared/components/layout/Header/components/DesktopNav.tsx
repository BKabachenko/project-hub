'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import type { NAVLINKS } from '../constants';
import { isActiveLink } from '../utils';

interface DesktopNavProps {
  links: NAVLINKS[];
}

const DesktopNav = ({ links }: DesktopNavProps) => {
  const pathname = usePathname();

  return (
    <nav aria-label={'Primary'} className={'hidden justify-end pe-4 md:flex lg:pe-8'}>
      <ul className={'flex items-center gap-6'}>
        {links.map((link) => {
          const isActive = isActiveLink(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative inline-flex min-h-9 items-center rounded-sm py-1.5 text-sm font-medium whitespace-nowrap transition-colors',
                  'text-muted-foreground hover:text-foreground',
                  'focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-4',
                  'motion-reduce:transition-none',
                  'after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0.5 after:border-b-2 after:border-transparent after:transition-colors motion-reduce:after:transition-none',
                  'hover:after:border-muted-foreground/40',
                  'aria-[current=page]:text-foreground aria-[current=page]:font-semibold',
                  'aria-[current=page]:after:border-foreground forced-colors:aria-[current=page]:after:border-current'
                )}
              >
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DesktopNav;
