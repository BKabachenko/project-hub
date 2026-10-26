import Link from 'next/link';

import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  Clock,
  MinusCircle,
  Pencil,
  XCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { ApplicationStatus, type MemberRole, type ProjectCategory } from '@/generated/prisma';
import { applicationStatusLabels, memberRoleLabels, projectCategoryLabels } from '@/lib/constants';
import { cn, timeAgo } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

export interface UserApplicationCardProps {
  application: {
    id: string;
    status: ApplicationStatus;
    createdAt: Date | string;
    requirement: {
      role: MemberRole;
      techStack: string[];
      project: {
        id: string;
        title: string;
        category: ProjectCategory;
      };
    };
  };
}

interface StatusStyle {
  label: string;
  badgeClass: string;
  borderAccent: string;
  helperText: string;
  icon: LucideIcon;
}

const statusConfig: Record<ApplicationStatus, StatusStyle> = {
  [ApplicationStatus.PENDING]: {
    label: applicationStatusLabels[ApplicationStatus.PENDING],
    badgeClass: 'bg-pending/15 text-card-foreground border-pending/40',
    borderAccent: 'border-t-pending',
    helperText: 'Awaiting review from project owner',
    icon: Clock,
  },
  [ApplicationStatus.APPROVED]: {
    label: applicationStatusLabels[ApplicationStatus.APPROVED],
    badgeClass: 'bg-success/15 text-card-foreground border-success/40',
    borderAccent: 'border-t-success',
    helperText: 'Accepted into the team! Check project details',
    icon: CheckCircle2,
  },
  [ApplicationStatus.DECLINED]: {
    label: applicationStatusLabels[ApplicationStatus.DECLINED],
    badgeClass: 'bg-failure/15 text-card-foreground border-failure/40',
    borderAccent: 'border-t-failure',
    helperText: 'Position filled or application declined',
    icon: XCircle,
  },
  [ApplicationStatus.WITHDRAWN]: {
    label: applicationStatusLabels[ApplicationStatus.WITHDRAWN],
    badgeClass: 'bg-muted text-muted-foreground border-border',
    borderAccent: 'border-t-border',
    helperText: 'You withdrew this application',
    icon: MinusCircle,
  },
};

const UserApplicationCard = ({ application }: UserApplicationCardProps) => {
  const { status, createdAt, requirement } = application;
  const { role, project, techStack = [] } = requirement;

  const currentStatus = statusConfig[status] ?? statusConfig[ApplicationStatus.PENDING];
  const StatusIcon = currentStatus.icon;
  const roleLabel = (role && memberRoleLabels[role]) ?? 'Contributor';
  const projectCategory = projectCategoryLabels[project.category] ?? null;

  const relativeTime = timeAgo(new Date(createdAt)) ?? 'recently';

  return (
    <Card
      className={cn(
        'group/card border-border bg-card hover:border-ring/40 relative flex h-full flex-col gap-3.5 overflow-hidden border border-t-2 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5',
        currentStatus.borderAccent
      )}
    >
      <CardHeader className='flex flex-col gap-2 p-0'>
        <div className='flex items-center justify-between gap-2'>
          <Badge
            variant='outline'
            className={cn(
              'shrink-0 gap-1.5 border px-2 py-0.5 text-xs font-medium',
              currentStatus.badgeClass
            )}
          >
            <StatusIcon className='size-3.5 shrink-0' />
            <span>{currentStatus.label}</span>
          </Badge>

          <div className='text-muted-foreground flex shrink-0 items-center gap-1 text-xs'>
            <CalendarClock className='size-3 shrink-0' />
            <span>{relativeTime}</span>
          </div>
        </div>

        <div className='min-w-0'>
          <Link
            href={`/projects/${project.id}`}
            className='group/link text-card-foreground hover:text-primary inline-flex max-w-full items-center gap-1.5 text-base font-bold transition-colors sm:text-lg'
          >
            <span className='truncate'>{project.title}</span>
            <ArrowUpRight className='text-muted-foreground group-hover/link:text-primary size-4 shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5' />
          </Link>
          {project.category && (
            <p className='text-muted-foreground mt-0.5 text-xs font-medium'>{projectCategory}</p>
          )}
        </div>
      </CardHeader>

      <CardContent className='flex flex-1 flex-col gap-2.5 p-0'>
        <div className='border-border/60 bg-muted/40 flex flex-col gap-0.5 rounded-lg border px-3 py-2'>
          <span className='text-muted-foreground text-[10px] font-semibold tracking-wider uppercase'>
            Applied Position
          </span>
          <span className='text-card-foreground truncate text-sm font-semibold'>{roleLabel}</span>
        </div>

        {techStack.length > 0 && (
          <div className='flex flex-wrap items-center gap-1.5'>
            {techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className='bg-secondary text-secondary-foreground inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium'
              >
                {tech}
              </span>
            ))}
            {techStack.length > 3 && (
              <span className='text-muted-foreground text-[10px] font-medium'>
                +{techStack.length - 3} more
              </span>
            )}
          </div>
        )}
      </CardContent>

      <div className='border-border/60 mt-auto flex items-center justify-between gap-2 border-t p-0 pt-3'>
        <span className='text-muted-foreground min-w-0 flex-1 truncate text-[11px]'>
          {currentStatus.helperText}
        </span>
        <div className='flex shrink-0 items-center gap-2'>
          {status === ApplicationStatus.PENDING && (
            <Button variant='outline' size='xs' asChild aria-label={'Edit application'}>
              <Link href={`/projects/${project.id}/apply`}>
                <Pencil className='size-3' aria-hidden />
                Edit
              </Link>
            </Button>
          )}
          <Link
            href={`/projects/${project.id}`}
            className='text-primary hover:text-primary/80 inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:underline'
            aria-label={'View project details'}
          >
            View Project
            <ArrowRight className='size-3' aria-hidden />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default UserApplicationCard;
