import { auth } from '@/auth';
import { MemberProjectsBlock, OwnerProjectBlock, StatisticCardsBlock } from '@/features/dashboard';
import prisma from '@/lib/prisma';

const DashboardPage = async () => {
  const session = await auth();
  if (!session) return null;
  const userId = session.user?.id;

  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { authorId: session.user?.id },
        {
          projectMembers: {
            some: {
              userId: session.user?.id,
              status: {
                in: ['ACTIVE'],
              },
            },
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      authorId: true,
      requirements: {
        where: {
          project: {
            authorId: session.user?.id,
          },
        },
        select: {
          requiredCount: true,
          applications: {
            where: {
              status: 'PENDING',
            },
            include: {
              user: {
                select: { id: true, name: true, updatedAt: true, image: true },
              },
              requirement: {
                select: { role: true, projectId: true, id: true },
              },
            },
          },
        },
      },
      projectMembers: {
        where: {
          status: 'ACTIVE',
        },
        select: {
          userId: true,
          projectId: true,
          status: true,
          requirement: {
            select: { role: true },
          },
        },
      },
    },
  });

  const userOwnedProjects = projects.filter((project) => project.authorId === userId);
  const userParticipantProjects = projects.filter((project) =>
    project.projectMembers.some((user) => user.userId === userId)
  );

  const userName = session.user?.name?.split(' ')[0] ?? 'User';

  return (
    <div className={'flex flex-col gap-8 md:gap-12'}>
      <div className='flex flex-col gap-2'>
        <p className={'text-muted-foreground font-medium'}>DASHBOARD OVERVIEW</p>
        <h2 className={'text-4xl font-extrabold'}>Welcome back, {userName}!</h2>
      </div>
      <StatisticCardsBlock projects={projects} />
      <OwnerProjectBlock projects={userOwnedProjects} />
      <MemberProjectsBlock projects={userParticipantProjects} />
    </div>
  );
};

export default DashboardPage;
