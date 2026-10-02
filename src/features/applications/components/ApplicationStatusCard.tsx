import { type ApplicationStatus } from '@/generated/prisma';
import { Card, CardContent } from '@/shared/components/ui/card';

interface ApplicationStatusCardProps {
  status: ApplicationStatus;
  isFilled: boolean;
}

const STATUS_MESSAGE: Record<ApplicationStatus, string> = {
  PENDING: 'Application is pending',
  APPROVED: 'Application already approved',
  DECLINED: 'Application already declined',
  WITHDRAWN: 'Application was withdrawn',
};

export const ApplicationStatusCard = ({ status, isFilled }: ApplicationStatusCardProps) => {
  const applicationStatus = status === 'PENDING' ? null : status;
  const message =
    (applicationStatus && STATUS_MESSAGE[applicationStatus]) ||
    (isFilled ? 'No open positions remaining for this role' : null);

  if (!message) return null;

  return (
    <Card className={'bg-muted'}>
      <CardContent className={'text-failure text-center text-2xl'}>{message}</CardContent>
    </Card>
  );
};
