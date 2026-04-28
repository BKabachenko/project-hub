'use client';

import { useTransition } from 'react';

import Image from 'next/image';

import { FileUser } from 'lucide-react';

import type { ProjectMemberWithUser } from '../types';

import { Button } from '@/components/ui/button';
import approveUserAction from '@/features/dashboard/approveUserAction';
import { memberRoleLabels } from '@/lib/constants';
import { timeAgo } from '@/lib/utils';

interface OwnerProjectApplicantBlockProps {
  applicant: ProjectMemberWithUser;
}

const OwnerProjectApplicantBlock = ({ applicant }: OwnerProjectApplicantBlockProps) => {
  const [isPending, startTransition] = useTransition();

  const handleApprove = () => {
    startTransition(async () => {
      await approveUserAction({
        projectId: applicant.projectId,
        memberId: applicant.userId,
        role: applicant.role,
      });
    });
  };

  return (
    <div className='flex flex-row items-center justify-between gap-4 align-middle'>
      <div className={'flex flex-row items-center gap-2'}>
        <div className='relative flex h-10 w-10 items-center justify-center overflow-hidden'>
          {applicant.user.image ? (
            <Image
              fill
              src={applicant.user.image}
              alt='User avatar'
              className={'rounded-xl bg-transparent'}
            />
          ) : (
            <FileUser />
          )}
        </div>
        <div className='flex flex-col'>
          <p className={'text-sm font-bold'}>{applicant.user.name}</p>
          <p className={'flex flex-row flex-wrap gap-1 text-[10px] font-bold'}>
            {memberRoleLabels[applicant.role]}
            <span className={'text-muted-foreground text-[10px] font-normal'}>
              • {timeAgo(applicant.joinedAt)}
            </span>
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-2 sm:flex-row'>
        <Button variant={'outline'} size={'sm'}>
          DEATILS
        </Button>
        <Button variant={'default'} size={'sm'} onClick={handleApprove}>
          APPROVE
        </Button>
        <Button variant={'outline'} size={'sm'}>
          DECLINE
        </Button>
      </div>
    </div>
  );
};

export default OwnerProjectApplicantBlock;
