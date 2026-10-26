import MemberProjectCardSkeleton from './MemberProjectCardSkeleton';

export const MemberProjectsBlockSkeleton = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-2xl font-bold'>Active Contributions</h3>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'>
        {Array.from({ length: 1 }).map((_, index) => (
          <MemberProjectCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default MemberProjectsBlockSkeleton;
