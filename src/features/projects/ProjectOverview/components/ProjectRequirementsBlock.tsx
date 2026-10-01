import type { ProjectRequirementsPayload } from '../types';

import RequirementCard from '@/shared/components/domain/RequirementCard';
interface ProjectRequirementsBlockProps {
  requirements: ProjectRequirementsPayload;
}

const ProjectRequirementsBlock = ({ requirements }: ProjectRequirementsBlockProps) => {
  const totalOpenPositions = requirements.reduce((total, req) => total + req.openPositionsCount, 0);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row items-center justify-between'>
        <h2 className={'text-lg font-bold'}>Open Roles</h2>
        <span className={'text-muted-foreground'}>
          {totalOpenPositions} {totalOpenPositions === 1 ? 'position' : 'positions'} available
        </span>
      </div>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4'>
        {requirements.map((requirement) => (
          <RequirementCard key={requirement.id} {...requirement} />
        ))}
      </div>
    </div>
  );
};

export default ProjectRequirementsBlock;
