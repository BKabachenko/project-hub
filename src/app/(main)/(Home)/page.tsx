import type { Metadata } from 'next';

import { CARDS, CardList, HeroBlock } from '@/features/home';

export const metadata: Metadata = {
  title: 'Project Hub — Find your missing piece. Build something that matters.',
  description:
    'Connect with developers, designers, and creators across every discipline. Discover pet projects, open-source initiatives, and collaborations.',
};

const HomePage = () => {
  return (
    <div className={'flex h-full flex-col justify-center gap-4 sm:gap-12'}>
      <HeroBlock />
      <CardList featureCards={CARDS} />
    </div>
  );
};

export default HomePage;
