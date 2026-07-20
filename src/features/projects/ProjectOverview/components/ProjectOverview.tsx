import type { ProjectWithRequirementsAndMilestones } from '../types';

import { Separator } from '@/shared/components/ui/separator';

import ApplyToProjectBlock from './ApplyToProjectBlock';
import ProjectHeaderBlock from './ProjectHeaderBlock';
import ProjectMilestonesBlock from './ProjectMilestonesBlock';
import ProjectRequirementsBlock from './ProjectRequirementsBlock';

interface ProjectOverviewProps {
  project: ProjectWithRequirementsAndMilestones;
}

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  return (
    <div className='grid gap-8 lg:grid-cols-[1fr_296px]'>
      <ProjectHeaderBlock project={project} />

      <Separator className={'lg:col-span-1'} />

      <div className='wrap-anywhere whitespace-pre-line'>{project.description}</div>

      <div className='lg:col-span-1 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:max-w-74 '>
        <ApplyToProjectBlock projectId={project.id} authorUser={project.authorUser} />
      </div>

      {project.milestones.length > 0 && (
        <ProjectMilestonesBlock milestones={project.milestones} />
      )}

      {project.requirements.length > 0 && (
        <ProjectRequirementsBlock requirements={project.requirements} />
      )}
    </div>
  );
};

export default ProjectOverview;
