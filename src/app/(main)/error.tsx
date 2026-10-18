'use client';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';

export default function Error({ retry }: { retry: () => void }) {
  return (
    <div className={'flex flex-col items-center justify-center gap-4'}>
      <h2>Something went wrong!</h2>
      <Button variant={'outline'} onClick={() => retry()}>
        Try again
      </Button>
      <p>or</p>
      <Button asChild variant={'link'}>
        <Link href={'/feed'}>Go to Feed</Link>
      </Button>
    </div>
  );
}
