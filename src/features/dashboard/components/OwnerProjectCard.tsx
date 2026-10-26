'use client';

import { useState } from 'react';

import Link from 'next/link';

import { ChevronDown, FileUser } from 'lucide-react';

import type { OwnerProjectViewModel } from '../types';

import { cn, timeAgo } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';

import OwnerApplicantsList from './OwnerApplicantsList';

interface OwnerProjectCardProps {
  project: OwnerProjectViewModel;
}

const OwnerProjectCard = ({ project }: OwnerProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(project.numberOfApplicants === 1);

  const hasPendingApplicants = project.numberOfApplicants > 0;
  const applicantLabel =
    project.numberOfApplicants === 1
      ? '1 PENDING APPLICANT'
      : `${project.numberOfApplicants} PENDING APPLICANTS`;

  return (
    <Card className={'shadow-md'} key={project.id}>
      <CardHeader>
        <CardTitle className={'text-lg font-bold'}>
          <Link href={`/projects/${project.id}`}>{project.title}</Link>
        </CardTitle>
        <CardDescription>Launched {timeAgo(project.createdAt)}.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
          <span className={'text-muted-foreground text-xs font-medium'}>
            {project.approvedApplicants}/{project.projectPositions} Hired
          </span>
          <Button
            variant={'ghost'}
            size={'sm'}
            className={cn(
              'h-7 rounded-md border px-2.5 text-xs font-semibold tracking-wide transition-colors',
              hasPendingApplicants
                ? 'border-pending/40 bg-pending/15 text-foreground hover:bg-pending/25 active:bg-pending/30 dark:border-pending/30 dark:bg-pending/20'
                : 'border-border/60 bg-muted/40 text-muted-foreground opacity-60'
            )}
            onClick={() => setIsOpen(!isOpen)}
            disabled={!hasPendingApplicants}
          >
            <FileUser className={cn('size-3.5 shrink-0', hasPendingApplicants && 'text-pending')} />
            <span>{applicantLabel}</span>
            {hasPendingApplicants && (
              <ChevronDown
                className={cn(
                  'size-3.5 shrink-0 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            )}
          </Button>
        </div>
        {isOpen && project.numberOfApplicants > 0 && (
          <div className=''>
            <Separator className={'my-4'} />
            <div className='flex flex-col gap-2'>
              <h4 className={'text-muted-foreground text-[10px] font-bold'}>PENDING REVIEW</h4>
              <OwnerApplicantsList applicants={project.pendingApplicants} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OwnerProjectCard;
