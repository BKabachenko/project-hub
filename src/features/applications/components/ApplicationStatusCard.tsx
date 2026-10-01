import React from 'react';

import { Card, CardContent } from '@/shared/components/ui/card';

interface ApplicationStatusCardProps {
  status: string;
  isFilled: boolean;
}

export const ApplicationStatusCard = ({ status, isFilled }: ApplicationStatusCardProps) => {
  const STATUS_MESSAGE: Record<string, string> = {
    APPROVED: 'Application already approved',
    DECLINED: 'Application already declined',
    WITHDRAWN: 'Application already withdraw',
  };

  const applicationStatus = status === 'PENDING' ? null : status;
  const message =
    (applicationStatus && STATUS_MESSAGE[applicationStatus]) ||
    (isFilled ? 'Application does not have empty slots' : null);

  return (
    <>
      {message && (
        <Card className={'bg-muted'}>
          <CardContent className={'text-failure text-center text-2xl'}>{message}</CardContent>
        </Card>
      )}
    </>
  );
};
