import { ProjectType } from '@/generated/prisma';
import { projectTypeLabels } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';

interface BadgeConfig {
  label: string;
  className: string;
}
const projectTypeConfig: Record<ProjectType, BadgeConfig> = {
  [ProjectType.PET_PROJECT]: {
    label: 'Pet',
    className: 'bg-pet-project/10 border-pet-project/40 text-pet-project/90',
  },
  [ProjectType.COMMERCIAL]: {
    label: projectTypeLabels[ProjectType.COMMERCIAL],
    className: 'bg-commercial/10 border-commercial/40 text-commercial/90',
  },
  [ProjectType.OPEN_SOURCE]: {
    label: projectTypeLabels[ProjectType.OPEN_SOURCE],
    className: 'bg-open-source/10 border-open-source/40 text-open-source',
  },
  [ProjectType.CHARITY]: {
    label: projectTypeLabels[ProjectType.CHARITY],
    className: 'bg-charity/10 border-charity/40 text-charity',
  },
};

interface ProjectTypeBadgeProps {
  type: ProjectType;
  className?: string;
  children?: string;
}
const ProjectTypeBadge = ({ type, className, children }: ProjectTypeBadgeProps) => {
  let label;

  const styles = 'px-2 py-0.5 rounded text-foreground font-semibold ';
  const typeStyles = projectTypeConfig[type].className;

  if (!children) {
    label = projectTypeConfig[type].label.toUpperCase();
  } else {
    label = children;
  }

  return (
    <Badge variant={'secondary'} className={cn(styles, typeStyles, className)}>
      {label}
    </Badge>
  );
};

export default ProjectTypeBadge;
