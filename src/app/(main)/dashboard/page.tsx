import Link from 'next/link';

import { ChevronDown, FileUser, Users } from 'lucide-react';

import { auth } from '@/auth';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import prisma from '@/lib/prisma';
import OwnerProjectCard from './_components/OwnerProjectCard';
import OwnerProjectBlock from './_components/OwnerProjectBlock';

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
                in: ['APPROVED', 'PENDING']
              }
            },
          },
        },
      ],
    },
    include: {
      projectPositions: true,
      projectMembers: {
        where: {
          status: {
            in: ['APPROVED', 'PENDING']
          },
        },
        include: {
          user: {
            select: { id: true, name: true, updatedAt: true, image: true },
          },
        },
      },
    },
  });

  console.log(projects);

  const userOwnedProjects = projects.filter(project => project.authorId === userId) 
  console.log('userOwnedProjects', userOwnedProjects)

  const userParticipantProjects = projects.filter(project => project.projectMembers.some(user => user.userId === userId));
  console.log('userParticipantProjects', userParticipantProjects)


  const userName = session.user?.name?.split(' ')[0];

  const totalOpenProjects = projects.length;
  const totalOwnACtiveProjects = projects.reduce((sum, project) => {
    if (project.authorId === session.user?.id) return sum + 1;
    return sum;
  }, 0);
  const countPendingReviews = projects.reduce((sum, project) => {
    return sum + project.projectMembers.length;
  }, 0);

  return (
    <div className={'flex flex-col gap-8 md:gap-12'}>
      <div className='flex flex-col gap-2'>
        <p className={'text-muted-foreground font-medium'}>DASHBOARD OVERVIEW</p>
        <h2 className={'text-4xl font-extrabold'}>Welcome back, {userName}!</h2>
      </div>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'>
        <Card className={'relative shadow-md'}>
          <CardHeader>
            <CardTitle className={'text-muted-foreground'}>TOTAL PROJECTS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-extrabold'>{totalOpenProjects}</div>
          </CardContent>
          <div className='absolute top-7 right-5 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-200'>
            <Users />
          </div>
        </Card>
        <Card className={'relative shadow-md'}>
          <CardHeader>
            <CardTitle className={'text-muted-foreground'}>YOUR ACTIVE PROJECTS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-extrabold'>{totalOwnACtiveProjects}</div>
          </CardContent>
          <div className='absolute top-7 right-5 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-200'>
            <Users />
          </div>
        </Card>
        <Card className={'relative shadow-md'}>
          <CardHeader>
            <CardTitle className={'text-muted-foreground'}>PENDING APPLICATIONS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-extrabold'>{countPendingReviews}</div>
          </CardContent>
          <div className='absolute top-7 right-5 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-200'>
            <Users />
          </div>
        </Card>
      </div>
      <OwnerProjectBlock projects={userOwnedProjects}/>
      <div className={'flex flex-col gap-4'}>
        <div className={''}>
          <h3 className={'text-2xl font-bold'}>Active Contributions</h3>
        </div>
        <div className={'grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'}>
          <Card className={'max-w-120'}>
            <CardHeader>
              <CardTitle className={'text-lg font-bold'}>
                <Link href={'#'}>Summit Resort</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className={'grid grid-cols-[1fr_70px] items-center justify-between gap-4'}>
              <div className={'flex flex-row flex-wrap gap-2'}>
                <Badge variant={'role'} className={'col-start-1'}>
                  Designer
                </Badge>
              </div>
              <Link href={'#'} className={'col-start-2 flex items-end justify-center'}>
                Details...
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
