'use client';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';

export default function GlobalError({ retry }: { retry: () => void }) {
  return (
    <html>
      <body>
        <div className={'flex flex-col items-center justify-center gap-4'}>
          <h2>Something went wrong!</h2>
          <Button variant={'outline'} onClick={() => retry()}>
            Try again
          </Button>
          <Link href={'/feed'}>Or go to Feed</Link>
        </div>
      </body>
    </html>
  );
}
