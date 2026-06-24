'use client';

import Image from 'next/image';

import { FileUser } from 'lucide-react';

import type { ProjectMemberWithUser } from '../types';

import { Button } from '@/shared/components/ui/button';
import { memberRoleLabels } from '@/lib/constants';
import { timeAgo } from '@/lib/utils';

import type { HandleResolveApplicationFn } from './OwnerApplicantsList';

interface OwnerProjectApplicantBlockProps {
  applicant: ProjectMemberWithUser;
  handleResolveApplication: HandleResolveApplicationFn;
}

const OwnerProjectApplicantBlock = ({
  applicant,
  handleResolveApplication,
}: OwnerProjectApplicantBlockProps) => {
  return (
    <div className='flex flex-row items-center justify-between gap-4 align-middle'>
      <div className={'flex flex-row items-center gap-2'}>
        <div className='relative flex h-10 w-10 items-center justify-center overflow-hidden'>
          {applicant.user.image ? (
            <Image
              width={40}
              height={40}
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
            {memberRoleLabels[applicant.requirement.role]}
            <span className={'text-muted-foreground text-[10px] font-normal'}>
              • {timeAgo(applicant.createdAt)}
            </span>
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-2 sm:flex-row'>
        <Button variant={'outline'} size={'sm'}>
          DETAILS
        </Button>
        <Button
          variant={'default'}
          size={'sm'}
          onClick={() => handleResolveApplication('approve', applicant.id)}
        >
          APPROVE
        </Button>
        <Button
          variant={'outline'}
          size={'sm'}
          onClick={() => handleResolveApplication('decline', applicant.id)}
        >
          DECLINE
        </Button>
      </div>
    </div>
  );
};

export default OwnerProjectApplicantBlock;
