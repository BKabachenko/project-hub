import { type MemberRole } from '@/generated/prisma';
import { memberRoleLabels } from '@/lib/constants';

import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface RequirementCardProps {
  id: string;
  role: MemberRole;
  requiredCount: number;
  openPositionsCount: number;
  techStack: string[];
}

const RequirementCard = ({
  id,
  role,
  requiredCount,
  openPositionsCount,
  techStack,
}: RequirementCardProps) => {
  return (
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
  );
};

export default RequirementCard;
