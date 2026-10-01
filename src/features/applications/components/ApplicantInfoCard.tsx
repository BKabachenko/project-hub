import { User as UserIcon } from 'lucide-react';

import { type User } from '@/generated/prisma';
import { timeAgo } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface ApplicantInfoCardProps {
  user: Pick<User, 'name' | 'email' | 'createdAt' | 'image'>;
}

export const ApplicantInfoCard = ({ user }: ApplicantInfoCardProps) => {
  return (
    <Card>
      <CardHeader className={'text-center sm:text-start'}>
        <CardTitle>Applicant info</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={
            'flex flex-col flex-wrap items-center justify-start gap-8 align-middle sm:flex-row'
          }
        >
          <div className={'overflow-hidden rounded-2xl'}>
            <Avatar className={'h-30 w-30 overflow-hidden rounded-2xl after:border-none'}>
              <AvatarImage
                src={user.image || undefined}
                alt={`${user.name}'s avatar.`}
                className={'rounded-2xl'}
              />
              <AvatarFallback className={'rounded-2xl text-lg'}>
                {user.name?.[0] || <UserIcon />}
              </AvatarFallback>
            </Avatar>
          </div>
          <div
            className={
              'flex flex-col items-center justify-around gap-2 text-center text-lg font-normal wrap-anywhere sm:items-start sm:text-start'
            }
          >
            {user.name && (
              <p>
                <span className={'text-muted-foreground'}>Name:</span> {user.name}
              </p>
            )}
            {user.email && (
              <p>
                <span className={'text-muted-foreground'}>Email:</span> {user.email}
              </p>
            )}
            <p className={'text-muted-foreground text-sm font-normal'}>
              Account created: {timeAgo(user.createdAt)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
