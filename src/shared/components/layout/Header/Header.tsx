import { Suspense } from 'react';

import Link from 'next/link';

import { Menu } from 'lucide-react';

import { getAuthSession } from '@/lib/session';

import ThemeSwitcher from '../../ui/ThemeSwitcher';

import HeaderUserNav from './HeaderUserNav';

export const Header = async () => {
  const session = await getAuthSession();

  const mobileHeaderMenu = () => {
    return (
      <nav className={'flex cursor-pointer justify-center md:hidden'}>
        <div className='flex flex-row items-center'>
          <Menu size={18} />
          Menu
        </div>
      </nav>
    );
  };

  return (
    <header className='mb-10'>
      <div className='bg-card border-border mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto_auto] items-center rounded-lg border px-8 py-5'>
        <Link href={'/'}>
          <div className=''>Project Hub</div>
        </Link>

        <nav className='hidden justify-end gap-x-5 px-10 md:flex'>
          <Link href={'/'} className=''>
            Home
          </Link>
          <Link href={'/feed'} className=''>
            Feed
          </Link>
          <Link href={'/impact'} className=''>
            Impact
          </Link>
          {session ? (
            <Link href={'/dashboard'} className=''>
              Dashboard
            </Link>
          ) : (
            ''
          )}
        </nav>

        {mobileHeaderMenu()}

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
