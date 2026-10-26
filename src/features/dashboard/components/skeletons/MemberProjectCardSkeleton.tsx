import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

export const MemberProjectCardSkeleton = () => {
  return (
    <Card className='border-border bg-card border-t-muted relative flex h-full flex-col gap-3.5 overflow-hidden border border-t-2 p-4 sm:p-5'>
      <CardHeader className='flex flex-col gap-2 p-0'>
        <div className='flex items-start justify-between gap-2'>
          <div className='flex items-center gap-1.5'>
            <Skeleton className='h-5 w-20 rounded-md' />
            <Skeleton className='h-5 w-16 rounded-md' />
          </div>

          <Skeleton className='h-4 w-24 rounded' />
        </div>

        <div className='flex flex-col gap-1.5 pt-0.5'>
          <Skeleton className='h-5 w-3/4 rounded' />
          <Skeleton className='h-3.5 w-1/3 rounded' />
        </div>
      </CardHeader>

      <CardContent className='flex flex-1 flex-col gap-2.5 p-0'>
        <div className='border-border/60 bg-muted/30 flex flex-col gap-1.5 rounded-lg border px-3 py-2.5'>
          <Skeleton className='h-2.5 w-16 rounded' />
          <div className='flex items-center gap-1.5 pt-0.5'>
            <Skeleton className='h-6 w-32 rounded-md' />
            <Skeleton className='h-6 w-24 rounded-md' />
          </div>
        </div>
      </CardContent>

      <div className='border-border/60 mt-auto flex items-center justify-between gap-2 border-t p-0 pt-3'>
        <div className='flex items-center gap-1.5'>
          <Skeleton className='size-2 shrink-0 rounded-full' />
          <Skeleton className='h-3.5 w-28 rounded' />
        </div>
        <Skeleton className='h-4 w-20 rounded' />
      </div>
    </Card>
  );
};

export default MemberProjectCardSkeleton;
