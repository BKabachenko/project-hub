import { SearchIcon } from 'lucide-react';

import ProjectCard from '@/app/(main)/projects/_components/ProjectCard';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import prisma from '@/lib/prisma';

import FilterBadge from './_components/FilterBadge';
import FilterBlock from './_components/FilterBlock';
import FilterSheet from './_components/FilterSheet';

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
      <div className='flex flex-col justify-center gap-4 md:flex-row'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-row justify-between gap-2'>
            <InputGroup className={'bg-input border-border p-6 shadow-md'}>
              <InputGroupInput
                id='inline-start-input'
                placeholder='Search...'
                type={'search'}
                className={'rounded-md'}
              />
              <InputGroupAddon align='inline-start'>
                <SearchIcon className='text-muted-foreground' />
              </InputGroupAddon>
            </InputGroup>
            <div className='border-border bg-input w-16 rounded-lg border shadow-md md:hidden'>
              <FilterSheet />
            </div>
          </div>
          <div className='flex flex-row flex-wrap gap-2'>
            <span className={'text-sm font-light'}>Showing:</span>
            <FilterBadge label={'Lorem impum'} />
            <FilterBadge label={'Lorem'} />
            <FilterBadge label={'Lorem im'} />
          </div>
          <div className='flex flex-col gap-y-10'>
            {newTenProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
        <aside className={'hidden md:block'}>
          <FilterBlock />
        </aside>
      </div>
    </>
  );
}
