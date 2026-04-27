import type { ProjectWithDetails } from '../types';

import { Card } from '@/components/ui/card';

import MemberProjectCard from './MemberProjectCard';

interface MemberProjectsBlockProps {
  projects: ProjectWithDetails[];
}

const MemberProjectsBlock = ({ projects }: MemberProjectsBlockProps) => {
  return (
    <div className={'flex flex-col gap-4'}>
      <h3 className={'text-2xl font-bold'}>Active Contributions</h3>
      {projects.length > 0 ? (
        <div className={'grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'}>
          {projects.map((project) => (
            <MemberProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <Card className={'text-muted-foreground flex items-center justify-center text-xl'}>
          {`You haven't joined any projects yet.`}
        </Card>
      )}
    </div>
  );
};

export default MemberProjectsBlock;
