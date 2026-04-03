import Image from 'next/image';
import { notFound } from 'next/navigation';

import prisma from '@/lib/prisma';
import ApplyToProjectForm from '@/features/projects/ApplyToProjectBtn';

const ProjectPage = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;

  const project = await prisma.project.findUnique({
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
      <ApplyToProjectForm projectId={projectId}/>
    </div>
  );
};

export default ProjectPage;
