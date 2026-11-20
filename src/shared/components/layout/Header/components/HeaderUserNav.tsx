import { signIn, signOut } from '@/auth';
import { getAuthSession } from '@/lib/session';

import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Button } from '../../../ui/button';

const HeaderUserNav = async () => {
  const session = await getAuthSession();

  return (
    <div 
        className={'flex flex-row justify-center items-center'}
    
    >
      {session ? (
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button type='submit'>
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
  );
};

export default HeaderUserNav;
