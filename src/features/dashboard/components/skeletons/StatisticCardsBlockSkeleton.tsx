import StatisticCardSkeleton from './StatisticCardSkeleton';

export const StatisticCardsBlockSkeleton = () => {
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'>
      {Array.from({ length: 3 }).map((_, index) => (
        <StatisticCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default StatisticCardsBlockSkeleton;
