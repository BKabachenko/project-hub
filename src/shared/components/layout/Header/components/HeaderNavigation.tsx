import { getAuthSession } from '@/lib/session';

import DesktopNav from '../components/DesktopNav';
import MobileNav from '../components/MobileNav';
import { LINKS } from '../constants';

const HeaderNavigation = async () => {
  const session = await getAuthSession();

  const listOfLinks = LINKS.filter(({ visibility }) =>
    session ? visibility !== 'guest' : visibility !== 'private'
  );

  return (
    <div className={''}>
      <DesktopNav links={listOfLinks} />

      <div className={'flex justify-center md:hidden'}>
        <MobileNav links={listOfLinks} />
      </div>
    </div>
  );
};

export default HeaderNavigation;
