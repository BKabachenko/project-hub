import Link from 'next/link';

import { auth, signIn, signOut } from '@/auth';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

const Header = async () => {
  const session = await auth();

  return (
    <header className='mb-10'>
      <div className='bg-background border-border mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center rounded-lg border px-8 py-5'>
        <Link href={'/'}>
          <div className=''>Project Hub</div>
        </Link>
        <nav className='flex justify-end gap-x-5 px-10'>
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
        <div className=''>
          {session ? (
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button type='submit' className={'translate-y-0.5'}>
                <Avatar>
                  <AvatarImage
                    src={session.user?.image ?? undefined}
                    alt={'User avatar'}
                    title={'Sign Out'}
                  />
                  <AvatarFallback>{session.user?.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
              </button>
            </form>
          ) : (
            <form
              action={async () => {
                'use server';
                await signIn();
              }}
            >
              <Button variant={'default'} type='submit'>
                Sign In
              </Button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
