import Link from 'next/link';

import { User } from 'lucide-react';

import type { ProjectAuthorUserPayload } from '../types';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';

interface ApplyToProjectBlockProps {
  projectId: string;
  authorUser: ProjectAuthorUserPayload;
}

const ApplyToProjectBlock = ({projectId, authorUser }: ApplyToProjectBlockProps) => {
  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle>Join the team</CardTitle>
      </CardHeader>
      <CardContent className={'flex flex-col gap-5'}>
        <div className='flex flex-col gap-2'>
          <Button variant={'default'} type={'button'} asChild>
            <Link href={`/projects/${projectId}/apply`}>Apply Now</Link>
          </Button>
          <Button variant={'secondary'} type={'button'}>
            <Link href={`/projects/${projectId}/question`}>Ask a question</Link>
          </Button>
        </div>
        <Separator />
        <div className='flex flex-row items-center gap-2'>
          <Avatar size={'lg'}>
            <AvatarImage src={authorUser.image || undefined} alt={`${authorUser.name}'s avatar.`} />
            <AvatarFallback className={'text-lg'}>
              {authorUser.name?.[0] || <User />}
            </AvatarFallback>
          </Avatar>
          <div className='font-semibold wrap-anywhere'>{authorUser.name}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplyToProjectBlock;
