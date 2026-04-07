import ProjectCard from '@/app/(main)/projects/_components/ProjectCard';
import prisma from '@/lib/prisma';

export default async function Home() {
  const newTenProjects = await prisma.project.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      projectPositions: true,
    },
  });

  return (
    <>
      <p>Latest 10 projects</p>
      <div className='flex flex-col gap-y-10'>
        {newTenProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
