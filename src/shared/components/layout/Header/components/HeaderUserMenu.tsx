import Link from 'next/link';

import { signIn, signOut } from '@/auth';
import { getAuthSession } from '@/lib/session';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

const getUserFirstLetter = (name: string | null | undefined) => {
  const letter = name ? name[0]?.toUpperCase() : 'U';
  return <span className={'text-lg'}>{letter}</span>;
};

async function handleSignOut(): Promise<void> {
  'use server';
  await signOut({ redirectTo: '/' });
}

async function handleSignIn(): Promise<void> {
  'use server';
  await signIn();
}

const HeaderUserMenu = async () => {
  const session = await getAuthSession();

  if (!session) {
    return (
      <form action={handleSignIn}>
        <Button variant='default' type='submit'>
          Sign In
        </Button>
      </form>
    );
  }

  return (
    <div className={'flex flex-row items-center justify-center'}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='rounded-full focus-visible:ring-0'
            aria-label={'User menu'}
          >
            <Avatar className={'rounded-lg after:border-none'}>
              <AvatarImage
                src={session.user?.image ?? undefined}
                alt={'User avatar'}
                className={'rounded-lg'}
              />
              <AvatarFallback className={'rounded-lg'}>
                {getUserFirstLetter(session.user?.name)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={'/projects/create'} className={'cursor-pointer'}>
                Create project
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <form action={handleSignOut} className={'w-full'}>
            <DropdownMenuItem asChild>
              <button
                type={'submit'}
                className={
                  'text-destructive hover:text-destructive w-full cursor-pointer text-start'
                }
              >
                Sign Out
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderUserMenu;
