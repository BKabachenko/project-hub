import { type FeatureCardType } from '../types';

import FeatureCard from './FeatureCard';

interface CardListProps {
  featureCards: FeatureCardType[];
}

export const CardList = ({ featureCards }: CardListProps) => {
  return (
    <div className={'grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
      {featureCards.map((card) => (
        <FeatureCard key={card.name} featureCard={card} />
      ))}
    </div>
  );
};
