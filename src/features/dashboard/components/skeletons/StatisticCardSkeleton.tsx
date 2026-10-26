import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

export const StatisticCardSkeleton = () => {
  return (
    <Card className='relative shadow-md'>
      <CardHeader>
        <Skeleton className='h-4 w-32 rounded' />
      </CardHeader>
      <CardContent>
        <Skeleton className='h-9 w-14 rounded' />
      </CardContent>
      <Skeleton className='absolute top-7 right-5 h-12 w-12 rounded-lg' />
    </Card>
  );
};

export default StatisticCardSkeleton;
