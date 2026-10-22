import Link from 'next/link';

import { ArrowRight, ArrowUpRight, CalendarClock } from 'lucide-react';

import type { MemberActiveProject } from '../types';

import { ProjectStatus } from '@/generated/prisma';
import { memberRoleLabels, projectCategoryLabels } from '@/lib/constants';
import { cn, timeAgo } from '@/lib/utils';
import ProjectStatusBadge, {
  projectStatusBorderAccent,
} from '@/shared/components/domain/ProjectStatusBadge';
import ProjectTypeBadge from '@/shared/components/domain/ProjectTypeBadge';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

export interface MemberProjectCardProps {
  project: MemberActiveProject;
}

const statusHelperText: Record<ProjectStatus, string> = {
  [ProjectStatus.ACTIVE]: 'Active contributor',
  [ProjectStatus.FINISHED]: 'Project completed',
  [ProjectStatus.CLOSED]: 'Project closed',
};

const MemberProjectCard = ({ project }: MemberProjectCardProps) => {
  const { title, status, category, type = [], projectMembers = [] } = project;

  const projectCategory = category ? (projectCategoryLabels[category] ?? null) : null;
  const borderAccent =
    projectStatusBorderAccent[status] ?? projectStatusBorderAccent[ProjectStatus.ACTIVE];
  const helperText = statusHelperText[status] ?? statusHelperText[ProjectStatus.ACTIVE];

  const firstMember = projectMembers[0];
  const relativeTime = firstMember?.updatedAt
    ? (timeAgo(new Date(firstMember.updatedAt)) ?? 'recently')
    : null;

  return (
    <Card
      className={cn(
        'group/card border-border bg-card hover:border-ring/40 relative flex h-full flex-col gap-3.5 overflow-hidden border border-t-2 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5',
        borderAccent
      )}
    >
      <CardHeader className='flex flex-col gap-2 p-0'>
        <div className='flex items-start justify-between gap-2'>
          <div className='flex flex-wrap items-center gap-1.5'>
            <ProjectStatusBadge status={status} />

            {type.map((t) => (
              <ProjectTypeBadge key={t} type={t} />
            ))}
          </div>

          {relativeTime && (
            <div className='text-muted-foreground flex shrink-0 items-center gap-1 pt-0.5 text-xs'>
              <CalendarClock className='size-3 shrink-0' aria-hidden />
              <span>Joined {relativeTime}</span>
            </div>
          )}
        </div>

        <div className='min-w-0'>
          <Link
            href={`/projects/${project.id}`}
            className='group/link text-card-foreground hover:text-primary inline-flex max-w-full items-center gap-1.5 text-base font-bold transition-colors sm:text-lg'
            aria-label={`View project ${title}`}
          >
            <span className='truncate'>{title}</span>
            <ArrowUpRight
              className='text-muted-foreground group-hover/link:text-primary size-4 shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'
              aria-hidden
            />
          </Link>
          {projectCategory && (
            <p className='text-muted-foreground mt-0.5 text-xs font-medium'>{projectCategory}</p>
          )}
        </div>
      </CardHeader>

      <CardContent className='flex flex-1 flex-col gap-2.5 p-0'>
        <div className='border-border/60 bg-muted/40 flex flex-col gap-1.5 rounded-lg border px-3 py-2.5'>
          <span className='text-muted-foreground text-[10px] font-semibold tracking-wider uppercase'>
            {projectMembers.length > 1 ? 'Your Roles' : 'Your Role'}
          </span>
          <div className='flex flex-wrap items-center gap-1.5 pt-0.5'>
            {projectMembers.length > 0 ? (
              projectMembers.map((member) => (
                <Badge
                  key={member.requirement.role}
                  variant='role'
                  className='h-auto border px-2.5 py-1 text-xs font-medium'
                >
                  {memberRoleLabels[member.requirement.role] ?? member.requirement.role}
                </Badge>
              ))
            ) : (
              <Badge variant='role' className='h-auto border px-2.5 py-1 text-xs font-medium'>
                Contributor
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <div className='border-border/60 mt-auto flex items-center justify-between gap-2 border-t p-0 pt-3'>
        <div className='flex min-w-0 items-center gap-1.5'>
          <span
            className={cn(
              'size-2 shrink-0 rounded-full',
              status === ProjectStatus.ACTIVE ? 'bg-success' : 'bg-muted-foreground'
            )}
            aria-hidden
          />
          <span className='text-muted-foreground min-w-0 flex-1 truncate text-[11px]'>
            {helperText}
          </span>
        </div>
        <Link
          href={`/projects/${project.id}`}
          className='text-primary hover:text-primary/80 inline-flex shrink-0 items-center gap-1 text-xs font-semibold transition-colors hover:underline'
          aria-label={`View project details for ${title}`}
        >
          View Project
          <ArrowRight className='size-3' aria-hidden />
        </Link>
      </div>
    </Card>
  );
};

export default MemberProjectCard;
