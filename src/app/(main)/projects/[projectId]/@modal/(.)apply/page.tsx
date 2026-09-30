import { notFound, redirect } from 'next/navigation';

import { auth } from '@/auth';
import { ModalContent, getUserApplicationsForProject } from '@/features/applications';
import { getProjectData } from '@/features/projects/ProjectOverview';

interface ApplyToProjectPageProps {
  params: Promise<{ projectId: string }>;
}

const ApplyToProjectModalPage = async ({ params }: ApplyToProjectPageProps) => {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }
  const userId = session.user.id;
  if (!userId) {
    throw new Error('CorruptedSessionError: User authenticated but ID is missing');
  }

  const { projectId } = await params;
  const project = await getProjectData(projectId);

  if (!project) {
    return notFound();
  }

  const userRequirements = await getUserApplicationsForProject(userId, project.requirements);

  return <ModalContent requirements={project.requirements} applications={userRequirements} />;
};

export default ApplyToProjectModalPage;
