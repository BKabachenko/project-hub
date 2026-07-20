import { Calendar, Link as LinkIcon } from 'lucide-react';

import type { ProjectWithRequirementsAndMilestones } from '../types';

import { timeAgo } from '@/lib/utils';
import ProjectStatusBadge from '@/shared/components/domain/ProjectStatusBadge';
import ProjectTypeBadge from '@/shared/components/domain/ProjectTypeBadge';

interface ProjectHeaderBlockProps {
  project: ProjectWithRequirementsAndMilestones;
}

const ProjectHeaderBlock = ({ project }: ProjectHeaderBlockProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row justify-end gap-2'>
        {project.type.map((type) => (
          <ProjectTypeBadge key={type} type={type} />
        ))}
        <ProjectStatusBadge status={project.status} />
      </div>

      <h1 className='text-2xl font-bold wrap-anywhere'>{project.title}</h1>

      <div className='flex flex-col gap-2 text-sm md:flex-row md:gap-8'>
        {project.gitUrl && (
          <div className='flex flex-row items-center gap-2 text-blue-600'>
            <a
              href={project.gitUrl}
              target={'_blank'}
              rel={'noopener noreferrer'}
              className={'flex flex-row gap-2 hover:underline'}
            >
              <LinkIcon size={18} /> Git link
            </a>
          </div>
        )}

        <div className='text-muted-foreground flex flex-row items-center gap-2'>
          <Calendar size={16} className={'-translate-y-0.5'} />
          Launched {timeAgo(project.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeaderBlock;
