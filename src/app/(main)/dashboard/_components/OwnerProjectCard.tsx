'use client';

import { useState } from 'react';

import Link from 'next/link';

import { ChevronDown, FileUser } from 'lucide-react';

import type { ProjectWithDetails } from '../types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { timeAgo } from '@/lib/utils';

import OwnerProjectApplicantBlock from './OwnerProjectApplicantBlock';

interface OwnerProjectCardProps {
  project: ProjectWithDetails;
}

const OwnerProjectCard = ({ project }: OwnerProjectCardProps) => {
  const pendingApplicants = project.projectMembers.filter((member) => member.status === 'PENDING');
  const numberOfApplicants = pendingApplicants.length;
  const [isOpen, setIsOpen] = useState(numberOfApplicants === 1);

  const approvedApplicants = project.projectMembers.filter(
    (member) => member.status === 'APPROVED'
  );
  const projectPositions = project.projectPositions.reduce((sum, position) => {
    return sum + position.requiredCount;
  }, 0);

  return (
    <Card className={'shadow-md'} key={project.id}>
      <CardHeader>
        <CardTitle className={'text-lg font-bold'}>
          <Link href={`./projects/${project.id}`}>{project.title}</Link>
        </CardTitle>
        <CardDescription>Launched {timeAgo(project.createdAt)}.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
          <span className={'text-muted-foreground text-xs font-medium'}>
            {approvedApplicants.length}/{projectPositions} Hired
          </span>
          <Button
            variant={'ghost'}
            className={
              'flex h-6 flex-row items-center justify-between gap-1 bg-orange-200 px-3 py-1'
            }
            onClick={() => setIsOpen(!isOpen)}
            disabled={numberOfApplicants === 0}
          >
            <FileUser />
            {/* TODO: make pluralization */}
            {numberOfApplicants} PENDING APPLICANT
            <ChevronDown />
          </Button>
        </div>
        {isOpen && (
          <div className=''>
            <Separator className={'my-4'} />
            <div className='flex flex-col gap-2'>
              <h4 className={'text-muted-foreground text-[10px] font-bold'}>PENDING REVIEW</h4>
              {pendingApplicants.map((applicant) => (
                <OwnerProjectApplicantBlock key={applicant.userId} applicant={applicant} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OwnerProjectCard;
