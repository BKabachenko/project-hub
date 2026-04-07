import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { memberRoleLabels, projectStatusLabels, projectTypeLabels } from '@/lib/constants';
import type { ProjectWithPositions } from '../types';

const ProjectCard = ({ project }: { project: ProjectWithPositions }) => {
  console.log(project);
  return (
    <Link href={`/projects/${project.id}`}>
      <Card>
        <CardHeader>
          <div className='flex flex-row flex-wrap gap-2'>
            {project.type.map((type) => (
              <Badge key={type} variant={'default'}>
                {projectTypeLabels[type]}
              </Badge>
            ))}
            <Badge variant={'secondary'}>{projectStatusLabels[project.status]}</Badge>
          </div>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {project.projectPositions.map((position) => (
            <Badge key={position.role} variant={'secondary'}>
              {memberRoleLabels[position.role]}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;
