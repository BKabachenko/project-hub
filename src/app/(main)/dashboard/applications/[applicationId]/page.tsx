import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import {
  ApplicantInfoCard,
  ApplicationActionButtons,
  ApplicationStatusCard,
  getApplicationForOwner,
} from '@/features/applications';
import RequirementCard from '@/shared/components/domain/RequirementCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface ApplicationDetailsPageProps {
  params: Promise<{ applicationId: string }>;
}

const ApplicationDetailsPage = async ({ params }: ApplicationDetailsPageProps) => {
  const session = await auth();
  if (!session?.user) {
    await signIn();
  }
  const userId = session?.user?.id;
  if (!userId) {
    redirect('/feed');
  }

  const { applicationId } = await params;
  const application = await getApplicationForOwner(applicationId, userId);
  if (!application) {
    return (
      <div>
        <p>Application not exist</p>
        <p>
          <Link href={'/'}>To main page</Link>
        </p>
      </div>
    );
  }

  const applicationIsFilled = application.requirement.openPositionsCount<=0;
  const buttonsIsDisabled = application.status !== 'PENDING' || applicationIsFilled;
  return (
    <div className={'flex flex-col gap-4 md:gap-6'}>
      <div className='flex flex-col gap-2'>
        <p className={'text-muted-foreground font-medium'}>APPLICATION OVERVIEW</p>
        <h2 className={'text-2xl font-extrabold'}>
          Application to {application?.requirement.project.title}
        </h2>
      </div>

      <ApplicationStatusCard status={application.status} isFilled={applicationIsFilled} />

      <RequirementCard key={application.requirementId} {...application.requirement} />

      <ApplicantInfoCard user={application.user} />

      <Card>
        <CardHeader className={'text-center sm:text-start'}>
          <CardTitle>Cover letter</CardTitle>
        </CardHeader>
        <CardContent className={'wrap-anywhere whitespace-pre-wrap'}>
          {application.coverLetter ?? <p className={'text-muted-foreground'}>Nothing there.</p>}
        </CardContent>
      </Card>

      <Card size={'sm'}>
        <CardContent>
          <ApplicationActionButtons
            applicationId={application.id}
            applicationUserId={application.userId}
            projectId={application.requirement.projectId}
            requirementId={application.requirementId}
            isDisabled={buttonsIsDisabled}
            className={'flex flex-row gap-x-3'}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationDetailsPage;
