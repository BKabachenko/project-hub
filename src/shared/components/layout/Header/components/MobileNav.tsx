import { getAuthSession } from '@/lib/session';

import MobileNavList from './MobileNavList';

const MobileNav = async () => {
  const session = await getAuthSession();

  return (
    <nav className={'flex cursor-pointer justify-center md:hidden'}>
      <MobileNavList session={session} />
    </nav>
  );
};

export default MobileNav;
