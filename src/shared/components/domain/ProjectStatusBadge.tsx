import type { ReactNode } from 'react';

import { CheckCircle2, XCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { ProjectStatus } from '@/generated/prisma';
import { projectStatusLabels } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';

interface StatusStyle {
  label: string;
  badgeClass: string;
  icon: LucideIcon;
}

const statusConfig: Record<ProjectStatus, StatusStyle> = {
  [ProjectStatus.ACTIVE]: {
    label: projectStatusLabels[ProjectStatus.ACTIVE],
    badgeClass: 'bg-success/15 text-card-foreground border-success/40',
    icon: CheckCircle2,
  },
  [ProjectStatus.FINISHED]: {
    label: projectStatusLabels[ProjectStatus.FINISHED],
    badgeClass: 'bg-muted text-muted-foreground border-border',
    icon: CheckCircle2,
  },
  [ProjectStatus.CLOSED]: {
    label: projectStatusLabels[ProjectStatus.CLOSED],
    badgeClass: 'bg-failure/15 text-card-foreground border-failure/40',
    icon: XCircle,
  },
};

export const projectStatusBorderAccent: Record<ProjectStatus, string> = {
  [ProjectStatus.ACTIVE]: 'border-t-success',
  [ProjectStatus.FINISHED]: 'border-t-border',
  [ProjectStatus.CLOSED]: 'border-t-failure',
};

export interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  showIcon?: boolean;
  className?: string;
  children?: ReactNode;
}

const ProjectStatusBadge = ({
  status,
  showIcon = true,
  className,
  children,
}: ProjectStatusBadgeProps) => {
  if (!status) return null;

  const currentStatus = statusConfig[status] ?? statusConfig[ProjectStatus.ACTIVE];
  const StatusIcon = currentStatus.icon;
  const label = children ?? currentStatus.label.toUpperCase();

  return (
    <Badge
      variant='outline'
      className={cn(
        'shrink-0 border px-2 py-0.5 text-xs font-semibold uppercase tracking-wider',
        showIcon && 'gap-1.5',
        currentStatus.badgeClass,
        className
      )}
    >
      {showIcon && <StatusIcon className='size-3.5 shrink-0' aria-hidden />}
      <span>{label}</span>
    </Badge>
  );
};

export default ProjectStatusBadge;
