import { XIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  className?: string;
}

//TODO implement normal text
//TODO implement styled badges to each group

const FilterBadge = ({ label, className }: BadgeProps) => {
  const defaultStyles = `items-middle bg-blue-500/20 p-2 px-3 hover:bg-blue-500/30`;

  return (
    <Badge variant={'secondary'} className={cn(defaultStyles, className)}>
      <span className={`text-blue-700`}>{label}</span>
      <Button type={'button'} variant={'ghost'} className={'p-0 hover:bg-transparent'}>
        <XIcon className={'text-blue-700/80'} />
      </Button>
    </Badge>
  );
};

export default FilterBadge;
