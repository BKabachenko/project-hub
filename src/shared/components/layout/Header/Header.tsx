import { Suspense } from 'react';

import Link from 'next/link';

import ThemeSwitcher from '../../ui/ThemeSwitcher';

import HeaderNavigation from './components/HeaderNavigation';
import HeaderUserNav from './components/HeaderUserNav';
import HeaderNavigationSkeleton from './components/skeletons/HeaderNavigationSkeleton';

export const Header = () => {
  return (
    <header className='mb-10'>
      <div className='bg-card border-border mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto_auto] items-center rounded-lg border px-8 py-5'>
        <Link href={'/'}>
          <div className=''>Project Hub</div>
        </Link>

        <Suspense fallback={<HeaderNavigationSkeleton />}>
          <HeaderNavigation />
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
