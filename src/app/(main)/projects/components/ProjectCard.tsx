import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/generated/prisma';

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card>
        <CardHeader>
          <div className='flex flex-row flex-wrap gap-2'>
            <Badge variant={'default'}>LOREM IPSUM</Badge>
            <Badge variant={'secondary'}>{project.status}</Badge>
          </div>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant={'secondary'}>{project.requiredParticipants}</Badge>
          <Badge variant={'secondary'}>Lorem ip</Badge>
          <Badge variant={'secondary'}>Lorem ipsum</Badge>
          <Badge variant={'secondary'}>Lorem ipsum dol</Badge>
          <Badge variant={'secondary'}>Lorem ip</Badge>
          <Badge variant={'secondary'}>Lorem ipsum</Badge>
          <Badge variant={'secondary'}>Lorem ipsum dol</Badge>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;
