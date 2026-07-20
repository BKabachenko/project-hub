import type { ProjectRequirementsPayload } from '../types';

import { memberRoleLabels } from '@/lib/constants';
import { Badge } from '@/shared/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

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
        {requirements.map(({ id, openPositionsCount, requiredCount, role, techStack }) => (
          <Card className={'justify-start'} key={id}>
            <CardHeader>
              <CardTitle className={'text-lg font-semibold'}>{memberRoleLabels[role]}</CardTitle>
              <CardDescription className={'text-muted-foreground'}>
                {requiredCount - openPositionsCount} of {requiredCount} filled
              </CardDescription>
            </CardHeader>
            <CardContent className={'flex flex-row flex-wrap gap-2'}>
              {techStack.map((item) => (
                <Badge
                  key={item}
                  variant={'role'}
                  className={'h-auto p-1 px-3 wrap-anywhere whitespace-normal'}
                >
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectRequirementsBlock;
