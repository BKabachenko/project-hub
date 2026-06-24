import { Badge } from '@/components/ui/badge';
import { ProjectStatus } from '@/generated/prisma';
import { cn } from '@/lib/utils';

interface StatusConfig {
  label: string;
  className: string;
}
const projectStatusConfig: Record<ProjectStatus, StatusConfig> = {
  [ProjectStatus.ACTIVE]: {
    label: 'Active',
    className: 'text-primary-foreground bg-blue-600',
  },
  [ProjectStatus.FINISHED]: {
    label: 'Finished',
    className: 'text-primary-foreground bg-success',
  },
  [ProjectStatus.CLOSED]: {
    label: 'Closed',
    className: 'text-primary text-primary',
  },
};

interface projectStatusBadgeprops {
  status: ProjectStatus;
  className?: string;
}
const ProjectStatusBadge = ({ status, className }: projectStatusBadgeprops) => {
  if (!status) return null;

  const label = projectStatusConfig[status].label;
  const configStyles = projectStatusConfig[status].className;

  const styles = 'py-2.5 px-3 font-bold';

  return (
    <Badge variant={'secondary'} className={cn(configStyles, styles, className)}>
      {label.toUpperCase()}
    </Badge>
  );
};

export default ProjectStatusBadge;
