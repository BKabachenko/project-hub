import Link from 'next/link';

import type { ProjectWithPositions } from '../types';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { memberRoleLabels } from '@/lib/constants';

import ProjectStatusBadge from './ProjectStatusBadge';
import ProjectTypeBadge from './ProjectTypeBadge';

const ProjectCard = ({ project }: { project: ProjectWithPositions }) => {
  return (
    <Card className={'max-w-175 p-2 py-6 shadow-md'}>
      <CardHeader className={'flex flex-col md:grid'}>
        <Link href={`/projects/${project.id}`}>
          <CardTitle className={'text-2xl font-bold'}>{project.title}</CardTitle>
        </Link>
        <CardDescription>
          {/*TODO: add real create time*/}
          <div className='text-muted-foreground text-sm'>Posted 2 hours ago</div>{' '}
        </CardDescription>
        <CardAction className={'order-first mb-4 flex gap-2 md:order-last'}>
          {project.type.map((type) => (
            <ProjectTypeBadge key={type} type={type} />
          ))}
          <ProjectStatusBadge status={project.status} />
        </CardAction>
      </CardHeader>
      <CardContent className={'flex flex-col gap-2'}>
        <p className={'line-clamp-3'}>{project.description}</p>
        <div className='flex flex-row flex-wrap items-center justify-between gap-4'>
          <div className={'flex flex-row flex-wrap gap-2'}>
            {project.projectPositions.map((position) => (
              <Badge key={position.role} variant={'role'}>
                {memberRoleLabels[position.role]}
              </Badge>
            ))}
          </div>
          <Link
            href={`/projects/${project.id}`}
            className={'ml-auto font-semibold underline md:no-underline md:hover:underline'}
          >
            Details...
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
