import { cache } from 'react';

import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import ApplyToProjectForm from '@/features/projects/ApplyToProjectBtn';
import prisma from '@/lib/prisma';

const getProject = cache(async (projectId: string) => {
  return await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      authorUser: true,
      _count: {
        select: {
          projectMembers: { where: { status: 'APPROVED' } },
        },
      },
    },
  });
});

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}): Promise<Metadata> => {
  const { projectId } = await params;
  const project = await getProject(projectId);

  if (!project) {
    notFound();
  }

  return {
    title: project.title,
    description: project.description,
  };
};

const ProjectPage = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;

  const project = await getProject(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <div className='relative h-10 w-10 overflow-hidden rounded-xl bg-gray-500'>
        {project.authorUser.image && (
          <Image fill src={project.authorUser.image} alt='User avatar' />
        )}
      </div>
      <div className=''>Author name - {project.authorUser.name}</div>
      <div className=''>Project title - {project.title}</div>
      <div className=''>Author description - {project.description}</div>
      <div className=''>Project approved members (count) - {project._count.projectMembers}</div>
      <ApplyToProjectForm projectId={projectId} />
    </div>
  );
};

export default ProjectPage;
