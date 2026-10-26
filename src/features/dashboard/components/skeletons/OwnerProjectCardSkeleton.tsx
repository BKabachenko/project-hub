import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

export const OwnerProjectCardSkeleton = () => {
  return (
    <Card className='shadow-md'>
      <CardHeader className='gap-2'>
        <Skeleton className='h-6 w-48 rounded' />
        <Skeleton className='h-4 w-32 rounded' />
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
          <Skeleton className='h-4 w-20 rounded' />
          <Skeleton className='h-7 w-44 rounded-md' />
        </div>
      </CardContent>
    </Card>
  );
};

export default OwnerProjectCardSkeleton;
