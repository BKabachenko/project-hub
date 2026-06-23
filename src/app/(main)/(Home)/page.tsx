import ProjectCard from '@/app/(main)/projects/_components/ProjectCard';
import SearchBar from '@/features/feed/SearchBar';
import { getProjects } from '@/features/feed/api/getProjects';
import type { resolvedParamsType } from '@/features/feed/types';

import FilterBadgeBlock from './_components/FilterBadgeBlock';
import FilterBlock from './_components/FilterBlock';
import FilterSheet from './_components/FilterSheet';

interface HomePageProps {
  searchParams: Promise<resolvedParamsType>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedParams = await searchParams;

  const projects = await getProjects(resolvedParams);

  return (
    <>
      <div className='flex flex-col justify-center gap-4 md:flex-row'>
        <div className='flex flex-1 flex-col gap-8'>
          <div className='flex flex-row justify-between gap-2'>
            <SearchBar />
            <div className='border-border bg-input w-16 rounded-lg border shadow-md md:hidden'>
              <FilterSheet />
            </div>
          </div>
          <div className='flex flex-row flex-wrap gap-2 items-center'>
            <FilterBadgeBlock searchParams={resolvedParams}/>
          </div>
          <div className='flex flex-col gap-y-10'>
            {projects.map((project) => (
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
