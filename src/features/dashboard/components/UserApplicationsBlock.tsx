import { Card } from '@/shared/components/ui/card';

import { getUserSubmittedApplications } from '../queries';

import UserApplicationCard from './UserApplicationCard';

export const UserApplicationsBlock = async () => {
  const applications = await getUserSubmittedApplications();
  return (
    <div className={'flex flex-col gap-4'}>
      <h3 className={'text-2xl font-bold'}>Your Applications</h3>
      {applications.length > 0 ? (
        <div className={'grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'}>
          {applications.map((application) => (
            <UserApplicationCard key={application.id} application={application} />
          ))}
        </div>
      ) : (
        <Card className={'text-muted-foreground flex items-center justify-center text-xl'}>
          {`You haven't applicate any projects yet.`}
        </Card>
      )}
    </div>
  );
};
