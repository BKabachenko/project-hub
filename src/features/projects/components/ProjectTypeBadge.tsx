import { Badge } from '@/components/ui/badge';
import { ProjectType } from '@/generated/prisma';
import { projectTypeLabels } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface BadgeConfig {
  label: string;
  className: string;
}
const projectTypeConfig: Record<ProjectType, BadgeConfig> = {
  [ProjectType.PET_PROJECT]: {
    label: 'Pet',
    className: 'bg-pet-project',
  },
  [ProjectType.COMMERCIAL]: {
    label: projectTypeLabels[ProjectType.COMMERCIAL],
    className: 'bg-commercial',
  },
  [ProjectType.OPEN_SOURCE]: {
    label: projectTypeLabels[ProjectType.OPEN_SOURCE],
    className: 'bg-open-source',
  },
  [ProjectType.CHARITY]: {
    label: projectTypeLabels[ProjectType.CHARITY],
    className: 'bg-charity',
  },
};

interface ProjectTypeBadgeProps {
  type: ProjectType;
  className?: string;
}
const ProjectTypeBadge = ({ type, className }: ProjectTypeBadgeProps) => {
  if (!type) return null;

  const label = projectTypeConfig[type].label;
  const styles = 'py-2.5 px-3 text-primary-foreground font-bold';

  return (
    <Badge
      variant={'secondary'}
      className={cn(projectTypeConfig[type].className, className, styles)}
    >
      {label.toUpperCase()}
    </Badge>
  );
};

export default ProjectTypeBadge;
