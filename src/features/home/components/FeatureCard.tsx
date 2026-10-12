import Link from 'next/link';

import { MoveRight } from 'lucide-react';

import { type FeatureCardType } from '../types';

import { type ProjectType } from '@/generated/prisma';
import { cn } from '@/lib/utils';
import ProjectTypeBadge from '@/shared/components/domain/ProjectTypeBadge';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';

interface FeatureCardProps {
  featureCard: FeatureCardType;
}

const LINK: Record<ProjectType, string> = {
  PET_PROJECT: '/feed?category=PET_PROJECT',
  OPEN_SOURCE: '/feed?category=OPEN_SOURCE',
  CHARITY: '/feed?category=CHARITY',
  COMMERCIAL: '/feed?category=COMMERCIAL',
};

const FeatureCard = ({ featureCard }: FeatureCardProps) => {
  const {
    name,
    title,
    description,
    badgeTitle,
    badgeBg,
    icon: Icon,
    iconColor,
    tags,
  } = featureCard;

  return (
    <Link href={LINK[name]}>
      <Card
        className={
          'group border-border/20 hover:border-border/60 border transition-all hover:shadow-md'
        }
      >
        <CardHeader className={'flex flex-col gap-2'}>
          <div className='flex w-full flex-row items-center justify-between'>
            <div className={cn('flex items-center justify-center rounded-lg p-2', badgeBg)}>
              <Icon className={iconColor} strokeWidth={2.2} />
            </div>
            <ProjectTypeBadge type={name}>{badgeTitle}</ProjectTypeBadge>
          </div>
          <h2
            className={
              'font-display text-base font-semibold transition-colors group-hover:text-blue-600'
            }
          >
            {title}
          </h2>
        </CardHeader>
        <CardContent className={'flex flex-col gap-3'}>
          <p className={'text-xs leading-relaxed'}>{description}</p>
          <Separator orientation={'horizontal'} />
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center gap-2'>
              {tags.map((tag) => (
                <Badge key={tag} variant={'role'} className={'p-2'}>
                  {tag}
                </Badge>
              ))}
            </div>
            <MoveRight
              className={'text-muted-foreground/80 transition-transform group-hover:translate-x-2'}
              aria-hidden='true'
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FeatureCard;
