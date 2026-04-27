import Link from 'next/link';

import type { ProjectWithDetails } from '../types';

import { auth } from '@/auth';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memberRoleLabels } from '@/lib/constants';

interface MemberProjectCardProps {
  project: ProjectWithDetails;
}

const MemberProjectCard = async ({ project }: MemberProjectCardProps) => {
  const session = await auth();
  if (!session) return null;
  const userId = session.user?.id;

  const userRoles = project.projectMembers.filter((member) => member.userId === userId);

  return (
    <Card className={'flex justify-between'}>
      <CardHeader>
        <CardTitle className={'text-lg font-bold'}>
          <Link href={`./projects/${project.id}`}>{project.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className={'grid grid-cols-[1fr_70px] items-end justify-between gap-4'}>
        <div className={'flex flex-row flex-wrap gap-2'}>
          {userRoles.map((project) => (
            <Badge key={project.role} variant={'role'} className={'col-start-1'}>
              {memberRoleLabels[project.role]}
            </Badge>
          ))}
        </div>
        <Link
          href={`./projects/${project.id}`}
          className={'col-start-2 flex items-end justify-center'}
        >
          Details...
        </Link>
      </CardContent>
    </Card>
  );
};

export default MemberProjectCard;
