'use client';

import { useTransition } from 'react';

import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';

import resolveApplicationAction, {
  type ResolveApplicationProps,
} from '../actions/resolveApplicationAction';

interface ApplicationActionButtonsProps {
  projectId: string;
  applicationUserId: string;
  requirementId: string;
  applicationId: string;
  isDisabled: boolean;
  className?: string;
}

export const ApplicationActionButtons = ({
  projectId,
  applicationUserId,
  requirementId,
  applicationId,
  isDisabled,
  className,
}: ApplicationActionButtonsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleResolveApplication = (action: ResolveApplicationProps['action']) => {
    if (!applicationId) return;

    startTransition(async () => {
      try {
        const result = await resolveApplicationAction({
          projectId,
          applicationUserId,
          requirementId,
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

  const isBlocked = isDisabled || isPending;

  return (
    <div className={className}>
      <Button
        variant={'default'}
        size={'sm'}
        onClick={() => handleResolveApplication('approve')}
        disabled={isBlocked}
      >
        APPROVE
      </Button>
      <Button
        variant={'outline'}
        size={'sm'}
        onClick={() => handleResolveApplication('decline')}
        disabled={isBlocked}
      >
        DECLINE
      </Button>
    </div>
  );
};

export default ApplicationActionButtons;
