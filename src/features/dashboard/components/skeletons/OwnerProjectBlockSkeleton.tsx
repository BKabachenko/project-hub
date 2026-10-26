import OwnerProjectCardSkeleton from './OwnerProjectCardSkeleton';

export const OwnerProjectBlockSkeleton = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row items-center justify-between'>
        <h3 className='text-2xl font-bold'>Projects I Manage</h3>
        <span className='text-muted-foreground text-sm font-bold opacity-40'>
          Create new project
        </span>
      </div>
      <div className='flex flex-col gap-2'>
        <OwnerProjectCardSkeleton />
      </div>
    </div>
  );
};

export default OwnerProjectBlockSkeleton;
