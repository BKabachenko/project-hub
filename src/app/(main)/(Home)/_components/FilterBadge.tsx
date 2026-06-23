'use client';

import { useTransition } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { XIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { FILTER_LABEL_MAP } from '@/features/feed/constants';
import { getFiltersFromParams, replaceUrlFromParams } from '@/features/feed/utils/urlParams';
import { cn } from '@/lib/utils';

interface BadgeProps<K extends keyof typeof FILTER_LABEL_MAP> {
  id: K;
  value: keyof (typeof FILTER_LABEL_MAP)[K];
  label: string;
  className?: string;
}

const defaultStyles = `items-center p-3 bg-card rounded-xl`;
const transitionStyle = `animate-pulse pointer-events-none`;

const FilterBadge = <K extends keyof typeof FILTER_LABEL_MAP>({
  id,
  value,
  label,
  className,
}: BadgeProps<K>) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const handleOnClick = () => {
    const oldParams = getFiltersFromParams(params);
    const updatedCategory = oldParams[id].filter((i) => i !== value);
    const newParams = { ...oldParams, [id]: updatedCategory };

    startTransition(() => {
      replaceUrlFromParams(router, pathname, params, newParams);
    });
  };

  return (
    <Badge
      variant={'outline'}
      className={cn(defaultStyles, className, isPending ? transitionStyle : '')}
    >
      <span className={`text-secondary-foreground`}>{label}</span>
      <Button
        type={'button'}
        variant={'ghost'}
        className={'p-0 hover:bg-transparent'}
        onClick={handleOnClick}
      >
        <XIcon className={'text-secondary-foreground/80'} />
      </Button>
    </Badge>
  );
};

export default FilterBadge;
