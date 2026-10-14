import { notFound, redirect } from 'next/navigation';

import { auth, signIn } from '@/auth';
import { ApplyToProjectForm, getUserApplicationsForProject } from '@/features/applications';
import { getProjectData } from '@/features/projects';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

interface ApplyToProjectPageProps {
  params: Promise<{ projectId: string }>;
}

const ApplyToProjectPage = async ({ params }: ApplyToProjectPageProps) => {
  const session = await auth();
  if (!session?.user?.id) {
    await signIn();
  }

  const userId = session?.user?.id;
  if (!userId) {
    redirect('/');
  }

  const { projectId } = await params;
  const project = await getProjectData(projectId);

  if (!project) {
    return notFound();
  }

  const userRequirements = await getUserApplicationsForProject(userId, project.requirements);

  return (
    <Card>
      <CardHeader className={'flex flex-col items-center justify-center'}>
        <CardTitle className={'text-2xl'}>Apply for project role</CardTitle>
        <CardDescription className={'text-xl'}>
          Fill in the form to submit your application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ApplyToProjectForm requirements={project.requirements} applications={userRequirements} />
      </CardContent>
    </Card>
  );
};

export default ApplyToProjectPage;
