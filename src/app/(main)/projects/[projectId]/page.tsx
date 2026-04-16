import { cache } from 'react';

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Calendar, Link as LinkIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/prisma';

import ProjectStatusBadge from '../_components/ProjectStatusBadge';
import ProjectTypeBadge from '../_components/ProjectTypeBadge';

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
    <div className='grid gap-8 md:grid-cols-[1fr_336px]'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row justify-end gap-2'>
          <ProjectTypeBadge type={project.type[0]} />
          <ProjectStatusBadge status={project.status} />
        </div>
        <h2 className='text-2xl font-bold'>{project.title}</h2>
        <div className='flex flex-col gap-2 text-sm md:flex-row md:gap-8'>
          <div className='flex flex-row items-center gap-2 text-blue-800'>
            <LinkIcon size={18} />
            <Link href={'https://github.com/charity-projects/os-edu'}>Git Link</Link>
          </div>
          <div className='text-muted-foreground flex flex-row items-center gap-2'>
            <Calendar size={16} className={'-translate-y-0.5'} />
            Launched Jan 2024
          </div>
        </div>
      </div>
      <Separator className={'md:col-span-1'} />
      <div className=''>{project.description}</div>
      <div className='md:col-span-1 md:col-start-2 md:row-span-4 md:row-start-1 md:max-w-84'>
        <Card size={'default'}>
          <CardHeader>
            <CardTitle>Join the Team</CardTitle>
            <CardDescription>Some description</CardDescription>
          </CardHeader>
          <CardContent className={'flex flex-col gap-5'}>
            <div className='flex flex-col gap-2'>
              <Button variant={'default'}>Apply Now</Button>
              <Button variant={'secondary'}>Ask a question</Button>
            </div>
            <Separator />
            <div className='flex flex-row flex-wrap items-center gap-2'>
              <div className='relative h-10 w-10 overflow-hidden'>
                {project.authorUser.image && (
                  <Image
                    fill
                    src={project.authorUser.image}
                    alt='User avatar'
                    className={'rounded-xl bg-transparent'}
                  />
                )}
              </div>
              <div className='font-semibold'>{project.authorUser.name}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-row items-center justify-between'>
          <h3 className={'text-lg font-bold'}>Open Roles</h3>
          <span className={'text-muted-foreground'}>3 positions available</span>
        </div>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4'>
          <Card className={'justify-center'}>
            <CardHeader>
              <CardTitle className={'text-lg font-semibold'}>Frontend Developer</CardTitle>
              <CardDescription className={'text-muted-foreground'}>
                Capacity: 1/2 Filled
              </CardDescription>
            </CardHeader>
            <CardContent className={'flex gap-2'}>
              <Badge variant={'role'}>React</Badge>
              <Badge variant={'role'}>Tailwind</Badge>
              <Badge variant={'role'}>TS</Badge>
            </CardContent>
          </Card>
          <Card className={'justify-center'}>
            <CardHeader>
              <CardTitle className={'text-lg font-semibold'}>Frontend Developer </CardTitle>
              <CardDescription className={'text-muted-foreground'}>
                Capacity: 1/2 Filled
              </CardDescription>
            </CardHeader>
            <CardContent className={'flex gap-2'}>
              <Badge variant={'role'}>React</Badge>
              <Badge variant={'role'}>Tailwind</Badge>
              <Badge variant={'role'}>TS</Badge>
            </CardContent>
          </Card>
          <Card className={'justify-center'}>
            <CardHeader>
              <CardTitle className={'text-lg font-semibold'}>Frontend Developer</CardTitle>
              <CardDescription className={'text-muted-foreground'}>
                Capacity: 1/2 Filled
              </CardDescription>
            </CardHeader>
            <CardContent className={'flex gap-2'}>
              <Badge variant={'role'}>React</Badge>
              <Badge variant={'role'}>Tailwind</Badge>
              <Badge variant={'role'}>TS</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
