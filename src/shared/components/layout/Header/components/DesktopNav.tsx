'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NAVLINKS } from '../constants';
import { isActiveLink } from '../utils';

interface DesktopNavProps {
  links: NAVLINKS[];
}

const DesktopNav = ({ links }: DesktopNavProps) => {
  const pathname = usePathname();

  return (
    <nav className='hidden justify-end gap-x-5 px-10 md:flex'>
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.title}
          className={isActiveLink(pathname, link.href) ? 'underline' : ''}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNav;
