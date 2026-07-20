import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProjectOverview } from '@/features/projects';
import { getProjectData } from '@/features/projects/ProjectOverview/queries';
import { truncateTextByLengthSafe } from '@/lib/utils';

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export const generateMetadata = async ({ params }: ProjectPageProps): Promise<Metadata> => {
  const { projectId } = await params;
  const project = await getProjectData(projectId);

  if (!project) {
    return notFound();
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: truncateTextByLengthSafe(project.title, 80),
      description: truncateTextByLengthSafe(project.description, 110),
    },
  };
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { projectId } = await params;

  const project = await getProjectData(projectId);

  if (!project) {
    notFound();
  }

  return <ProjectOverview project={project} />;
};

export default ProjectPage;
