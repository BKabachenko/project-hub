import { CARDS, CardList, HeroBlock } from '@/features/home';

const HomePage = () => {
  return (
    <div className={'flex flex-col h-full justify-center gap-4'}>
      <HeroBlock />
      <CardList featureCards={CARDS} />
    </div>
  );
};

export default HomePage;
