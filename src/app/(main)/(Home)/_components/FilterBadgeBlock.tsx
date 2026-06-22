import { FILTER_KEYS, FILTER_LABEL_MAP } from '@/features/feed/constants';
import type { resolvedParamsType } from '@/features/feed/types';
import { toArray } from '@/lib/utils';

import FilterBadge from '../_components/FilterBadge';

interface FilterBadgeBlockProps {
  searchParams: resolvedParamsType;
}

const FilterBadgeBlock = ({ searchParams }: FilterBadgeBlockProps) => {
  if (!searchParams) return null;

  const activeBadges = FILTER_KEYS.flatMap((key) =>
    toArray(searchParams[key])
      .filter((value) => FILTER_LABEL_MAP[key][value])
      .map((value) => ({
        id: key,
        value,
        label: FILTER_LABEL_MAP[key][value],
      }))
  );

  if (activeBadges.length === 0) return null;

  return (
    <>
      <span className={'text-sm font-light'}>Showing:</span>
      {activeBadges.map(({ id, value, label }) => (
        <FilterBadge key={value} id={id} value={value} label={label}/>
      ))}
    </>
  );
};

export default FilterBadgeBlock;
