import Link from 'next/link';

import { getAuthSession } from '@/lib/session';

import { LINKS } from '../constants';

const DesktopNav = async () => {
  const session = await getAuthSession();

  const listOfLinks = LINKS.filter(({ visibility }) =>
    session ? visibility !== 'guest' : visibility !== 'private'
  );

  console.log(listOfLinks);

  return (
    <nav className='hidden justify-end gap-x-5 px-10 md:flex'>
      {listOfLinks.map((link) => (
        <Link href={link.href} key={link.title}>
          {link.title}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNav;
