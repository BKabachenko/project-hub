import { ChartLine, Clock, LayoutList } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatisticCardProps {
  children: string;
  value: number;
  variant: 'TOTAl' | 'ACTIVE' | 'PENDING';
}

const variants: Record<StatisticCardProps['variant'], LucideIcon> = {
  TOTAl: LayoutList,
  ACTIVE: ChartLine,
  PENDING: Clock,
};

const StatisticCard = ({ children, value, variant }: StatisticCardProps) => {
  const Icon = variants[variant];

  return (
    <Card className={'relative shadow-md'}>
      <CardHeader>
        <CardTitle className={'text-muted-foreground'}>{children}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-3xl font-extrabold'>{value}</div>
      </CardContent>
      <div className='absolute top-7 right-5 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-200'>
        <Icon />
      </div>
    </Card>
  );
};

export default StatisticCard;
