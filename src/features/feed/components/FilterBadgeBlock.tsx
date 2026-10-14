import { FILTER_KEYS, FILTER_LABEL_MAP } from '@/features/feed/constants';
import type { resolvedParamsType } from '@/features/feed/types';
import { toArray } from '@/lib/utils';

import FilterBadge from './FilterBadge';

interface FilterBadgeBlockProps {
  searchParams: resolvedParamsType;
}

const FilterBadgeBlock = ({ searchParams }: FilterBadgeBlockProps) => {
  if (!searchParams) return null;

  const activeBadges = FILTER_KEYS.flatMap((key) => {
    const values = toArray(searchParams[key]);
    const labelValues = FILTER_LABEL_MAP[key];

    return values.flatMap((value) => {
      const label = labelValues[value];
      return label ? [{ id: key, value, label }] : [];
    });
  });

  if (activeBadges.length === 0) return null;

  return (
    <>
      <span className={'text-sm font-light'}>Showing:</span>
      {activeBadges.map(({ id, value, label }) => (
        <FilterBadge key={`${id}-${value}`} id={id} value={value} label={label} />
      ))}
    </>
  );
};

export default FilterBadgeBlock;
