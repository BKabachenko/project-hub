import UserApplicationCardSkeleton from './UserApplicationCardSkeleton';

export const UserApplicationsBlockSkeleton = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-2xl font-bold'>Your Applications</h3>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <UserApplicationCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default UserApplicationsBlockSkeleton;
