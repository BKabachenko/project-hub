import { Suspense } from 'react';

import Link from 'next/link';

import ThemeSwitcher from '../../ui/ThemeSwitcher';

import DesktopNav from './components/DesktopNav';
import HeaderUserNav from './components/HeaderUserNav';
import MobileNav from './components/MobileNav';

export const Header = () => {
  return (
    <header className='mb-10'>
      <div className='bg-card border-border mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto_auto] items-center rounded-lg border px-8 py-5'>
        <Link href={'/'}>
          <div className=''>Project Hub</div>
        </Link>

        <Suspense fallback={null}>
          <DesktopNav />
        </Suspense>

        <Suspense fallback={null}>
          <MobileNav />
        </Suspense>

        <div className='mx-4'>
          <ThemeSwitcher />
        </div>
        
        <Suspense fallback={null}>
          <HeaderUserNav />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
