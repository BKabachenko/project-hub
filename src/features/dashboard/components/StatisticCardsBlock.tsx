import { getMemberActiveProjects, getOwnerProjects } from '../queries';

import StatisticCard from './StatisticCard';

const StatisticCardsBlock = async () => {
  const userOwnedProjects = await getOwnerProjects();

  const memberActiveProjects = await getMemberActiveProjects();

  const totalPending = userOwnedProjects.reduce((sum, p) => sum + p.pendingApplicants.length, 0);

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'>
      <StatisticCard value={userOwnedProjects.length} variant={'TOTAL'}>
        Projects Managed
      </StatisticCard>
      <StatisticCard value={memberActiveProjects.length} variant={'ACTIVE'}>
        Active Contributions
      </StatisticCard>
      <StatisticCard value={totalPending} variant={'PENDING'}>
        Pending Review
      </StatisticCard>
    </div>
  );
};

export default StatisticCardsBlock;
