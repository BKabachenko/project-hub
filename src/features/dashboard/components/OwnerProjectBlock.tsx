import Link from 'next/link';

import { Card } from '@/shared/components/ui/card';

import { getOwnerProjects } from '../queries';

import OwnerProjectCard from './OwnerProjectCard';

const OwnerProjectBlock = async () => {
  const projects = await getOwnerProjects();

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row items-center justify-between'>
        <h3 className={'text-2xl font-bold'}>Projects I Manage</h3>
        <Link href={'#'} className={'text-muted-foreground font-bold'}>
          {/*TODO empty link!*/}
          VIEW All
        </Link>
      </div>
      {projects.length > 0 ? (
        <div className='flex flex-col gap-2'>
          {projects.map((project) => (
            <OwnerProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <Card className={'text-muted-foreground flex items-center justify-center text-xl'}>
          {`Oops, you don't have a project yet.`}
        </Card>
      )}
    </div>
  );
};

export default OwnerProjectBlock;
