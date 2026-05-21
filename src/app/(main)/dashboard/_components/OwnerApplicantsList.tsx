'use client';

import { useTransition } from 'react';
import { useOptimistic } from 'react';

import { toast } from 'sonner';

import type { ProjectMemberWithUser } from '../types';

import resolveApplicationAction, {
  type ResolveApplicationProps,
} from '@/features/dashboard/resolveApplicationAction';

import OwnerProjectApplicantBlock from './OwnerProjectApplicantBlock';

interface OwnerApplicantsListProps {
  applicants: ProjectMemberWithUser[];
}

export type HandleResolveApplicationFn = (
  action: ResolveApplicationProps['action'],
  applicantId: ProjectMemberWithUser['id']
) => void;

const OwnerApplicantsList = ({ applicants }: OwnerApplicantsListProps) => {
  const [_, startTransition] = useTransition();

  const [optimisticApplicantsList, dispatchOptimisticUpdate] = useOptimistic(
    applicants,
    (prevApplicants, applicantId) => {
      return prevApplicants.filter((applicant) => applicant.id !== applicantId);
    }
  );

  const handleResolveApplication: HandleResolveApplicationFn = (action, applicantId) => {
    const applicant = applicants.find((applicant) => applicant.id === applicantId);
    if (!applicant) return;

    startTransition(async () => {
      dispatchOptimisticUpdate(applicantId);

      try {
        const result = await resolveApplicationAction({
          projectId: applicant.requirement.projectId,
          applicationUserId: applicant.userId,
          requirementId: applicant.requirement.id,
          action: action,
        });

        if (!result.success) {
          toast.error(result.message);
        }
        if (result.success) {
          toast.success(result.message);
        }
      } catch (_) {
        toast.error('Something went wrong');
      }
    });
  };

  return (
    <>
      {optimisticApplicantsList.map((applicant) => (
        <OwnerProjectApplicantBlock
          key={applicant.userId}
          applicant={applicant}
          handleResolveApplication={handleResolveApplication}
        />
      ))}
    </>
  );
};

export default OwnerApplicantsList;
